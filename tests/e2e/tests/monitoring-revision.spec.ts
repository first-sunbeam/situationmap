import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { SituationMapPage } from "../pages/SituationMapPage";
import { SimpleFormPage } from "../pages/forms/SimpleFormPage";
import { getMonitoringRevision } from "../../../src/config/monitoringRevision";
import { getFormLabels } from "../../../src/config/formLabels";
const pl = getMonitoringRevision("pl");

async function downloadPdf(page: Page, info: TestInfo, name: string) {
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Pobierz PDF", exact: true }).first().click();
  const download = await downloadPromise;
  const path = info.outputPath(`${name}.pdf`);
  await download.saveAs(path);
  const bytes = await readFile(path);
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  expect(bytes.length).toBeGreaterThan(10000);
}
async function step(page: Page, name: RegExp) { await page.getByRole("button", { name }).click(); }
async function selectSources(page: Page, stageName: string, codes: Array<keyof typeof pl.sourceOptions>) {
  const group = page.getByRole("group", { name: `${pl.stageSources} — ${stageName}`, exact: true });
  for (const code of codes) await group.getByRole("checkbox", { name: pl.sourceOptions[code], exact: true }).check();
}

test("old answers remain unchanged without becoming answers to the new stage questions", async ({ page }) => {
  const old = JSON.stringify({ activeEnvKey: "home", activeVariant: "simple", activeMode: "incident", forms: {
    home: { meta: { date: "2026-10-01", time: "12:00", place: "Dom", lead: "Osoba obserwująca" },
      simple: { recoveryTime: "10_30_minut", behavior: "O — odsunęła krzesło.", helped: "Dawna ocena wsparcia" },
      incident: { physicalThisWeek: "yes", physicalCount: "7", unconditional: "yes", maskingContinued: "no", maskingStrategies: ["other"], maskingStrategiesOther: "Dawna hipoteza", intensity: "3_wysokie_ryzyko", endedBy: ["other"], assessmentBasis: "Dawne podsumowanie" },
      map: { cooperatesWith: "Dawny opis współpracy", noAggression: "yes" } },
    school: { simple: { behavior: "Dane szkolne zachowane" } },
  } });
  await page.addInitScript((raw) => { if (!localStorage.getItem("situationmap-state-v2")) localStorage.setItem("situationmap-state-v2", raw); }, old);
  await page.goto("/");
  await page.getByText("Zapis z poprzedniej wersji — bez przeliczania", { exact: true }).filter({ visible: true }).click();
  await expect(page.getByText("10-30 minut", { exact: true }).filter({ visible: true })).toBeVisible();
  await expect(page.getByLabel(pl.escalationCourse)).toBeEmpty();
  await expect(page.getByLabel(pl.postEscalationNeeds)).toBeEmpty();
  await expect(page.getByLabel(pl.readinessTiming)).toBeEmpty();
  await page.getByLabel("Stan przed zdarzeniem", { exact: true }).fill("O — piła wodę.");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("situationmap-state-before-monitoring-revision"))).toBe(old);
  const app = new SituationMapPage(page);
  await app.switchToExtendedVariant();
  await step(page, /7\. Po eskalacji/);
  await expect(page.getByLabel("Czy podczas tego zdarzenia była interwencja fizyczna?", { exact: true })).toHaveValue("");
  await expect(page.getByLabel("Jeśli tak — ile razy podczas tego zdarzenia?", { exact: true })).toBeEmpty();
  await page.getByLabel("Czy podczas tego zdarzenia była interwencja fizyczna?", { exact: true }).selectOption("no");
  await app.switchToMapMode();
  await expect(page.getByLabel(/wybiera kontakt z/)).toBeEmpty();
  await page.reload();
  const stored = await app.getStoredState() as { forms: { home: { simple: Record<string, unknown>; incident: Record<string, unknown>; map: Record<string, unknown> }; school: { simple: { behavior: string } } } };
  expect(stored.forms.home.simple).toMatchObject({ behavior: "O — odsunęła krzesło.", helped: "Dawna ocena wsparcia", escalationCourse: "", postEscalationNeeds: "" });
  expect(stored.forms.home.incident).toMatchObject({ physicalThisWeek: "yes", physicalCount: "7", physicalDuringEvent: "no", eventPhysicalCount: "", unconditional: "yes", supportConditional: "", maskingStrategies: ["other"], endedBy: ["other"], assessmentBasis: "Dawne podsumowanie" });
  expect(stored.forms.home.map).toMatchObject({ cooperatesWith: "Dawny opis współpracy", chosenContact: "", noAggression: "yes", similarWithoutEscalation: "" });
  expect(stored.forms.school.simple.behavior).toBe("Dane szkolne zachowane");
});

test("source checkboxes support keyboard selection, multiple sources and language changes after reload", async ({ page }) => {
  await page.goto("/");
  await selectSources(page, "Pierwsze sygnały", ["O", "P"]);
  const hypothesis = page.getByRole("group", { name: `${pl.stageSources} — Pierwsze sygnały`, exact: true }).getByRole("checkbox", { name: pl.sourceOptions.H, exact: true });
  await hypothesis.focus();
  await hypothesis.press("Space");
  await expect(hypothesis).toBeChecked();
  await hypothesis.press("Space");
  await expect(hypothesis).not.toBeChecked();
  await page.getByLabel(`${pl.sourceDetails} — Pierwsze sygnały`, { exact: true }).fill("P — komunikator AAC; O — osoba obserwująca.");
  await page.getByRole("button", { name: /English|angielski|Switch to English/i }).click();
  await page.reload();
  const en = getMonitoringRevision("en");
  const group = page.getByRole("group", { name: `${en.stageSources} — ${en.stageNames.earlyResponse}`, exact: true });
  for (const code of ["O", "P"] as const) await expect(group.getByRole("checkbox", { name: en.sourceOptions[code], exact: true })).toBeChecked();
  for (const code of ["R", "H"] as const) await expect(group.getByRole("checkbox", { name: en.sourceOptions[code], exact: true })).not.toBeChecked();
  await expect(page.getByLabel(`${en.sourceDetails} — ${en.stageNames.earlyResponse}`, { exact: true })).toHaveValue("P — komunikator AAC; O — osoba obserwująca.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

for (const language of ["pl", "en"] as const) {
  test(`extended early-signs sources come first without changing saved answers (${language})`, async ({ page }) => {
    const original = {
      signalsAppeared: "yes", timeToEscalation: "4 min — earlier estimate", activationSignals: ["pot"],
      earlyResponse: "R — earlier response account", earlyResponseSources: "R — response account only; signs have a different source",
      earlyResponseSourceTypes: ["R", "future-code"],
    };
    const raw = JSON.stringify({ schemaVersion: 3, activeEnvKey: "home", activeVariant: "extended", activeMode: "incident", forms: { home: { incident: original } } });
    await page.addInitScript((value) => {
      if (!localStorage.getItem("situationmap-state-v2")) localStorage.setItem("situationmap-state-v2", value);
    }, raw);
    await page.goto("/incident");
    if (language === "en") await page.getByRole("button", { name: /English|angielski|Switch to English/i }).click();
    await step(page, /3\./);
    const revision = getMonitoringRevision(language);
    const labels = getFormLabels(language);
    const section = page.locator("section.section").filter({ has: page.getByRole("heading", { name: /^3\./ }) });
    const sourceLabel = `${revision.stageSources} — ${revision.stageNames.earlyResponse}`;
    const group = section.getByRole("group", { name: sourceLabel, exact: true });
    await expect(section.locator(".field-grid > *").first()).toHaveAccessibleName(sourceLabel);
    await expect(group).toContainText(revision.earlyResponseSourceScopeHint);
    await expect(group.getByRole("checkbox", { name: revision.sourceOptions.R, exact: true })).toBeChecked();
    for (const code of ["O", "P", "H"] as const) await expect(group.getByRole("checkbox", { name: revision.sourceOptions[code], exact: true })).not.toBeChecked();
    const details = section.getByLabel(`${revision.sourceDetails} — ${revision.stageNames.earlyResponse}`, { exact: true });
    const appeared = section.getByLabel(labels.incident.signalsAppeared, { exact: true });
    const time = section.getByLabel(labels.incident.timeToEscalation);
    const response = section.getByLabel(revision.earlyResponse, { exact: true });
    const controlIds = await section.locator("input, select, textarea").evaluateAll((controls) => controls.map((control) => control.id));
    const positions = await Promise.all([details, appeared, time, response].map(async (control) => controlIds.indexOf(await control.getAttribute("id") as string)));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    await expect(details).toHaveValue(original.earlyResponseSources);
    await expect(time).toHaveValue(original.timeToEscalation);
    await expect(response).toHaveValue(original.earlyResponse);
    const hypothesis = group.getByRole("checkbox", { name: revision.sourceOptions.H, exact: true });
    await hypothesis.focus();
    await hypothesis.press("Space");
    await expect(hypothesis).toBeChecked();
    await hypothesis.press("Space");
    await expect(hypothesis).not.toBeChecked();
    await hypothesis.press("Tab");
    await expect(details).toBeFocused();
    await details.press("Tab");
    await expect(appeared).toBeFocused();
    await response.fill("R — edited response account");
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("situationmap-state-v2") || "{}").forms?.home?.incident?.earlyResponse)).toBe("R — edited response account");
    await page.reload();
    await step(page, /3\./);
    await expect(page.getByLabel(revision.earlyResponse, { exact: true })).toHaveValue("R — edited response account");
    await expect(page.getByLabel(`${revision.sourceDetails} — ${revision.stageNames.earlyResponse}`, { exact: true })).toHaveValue(original.earlyResponseSources);
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("situationmap-state-v2") || "{}").forms.home.incident);
    expect(stored).toMatchObject({ ...original, earlyResponse: "R — edited response account", escalationSourceTypes: [], postEscalationSourceTypes: [] });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("records the three stages and their sources, validates this-event count, downloads and prints every step", async ({ page }, info) => {
  await page.goto("/incident");
  const app = new SituationMapPage(page);
  await app.fillMetaFields({ date: "2026-10-27", time: "12:00", place: "Dom — żółty pokój", guardian: "Osoba obserwująca" });
  await page.getByLabel("Od kiedy do kiedy prowadzono obserwację?", { exact: true }).fill("12:00–13:00");
  await step(page, /0\. Poziom bazowy/);
  await page.getByLabel("Poziom napięcia przed zdarzeniem", { exact: true }).selectOption("1_podwyzszony");
  await page.getByLabel("Oznaki będące podstawą oceny napięcia").fill("O — zaciskała dłonie, inaczej niż zwykle.");
  await page.getByLabel("Czy osoba spała wystarczająco?").selectOption("not_sure");
  await step(page, /1\. Bezpośrednio/);
  await page.getByLabel("Doprecyzowanie tego, co było bezpośrednio przed").fill("O — włączono radio.");
  await step(page, /2\. Czego oczekiwano/);
  await page.getByLabel(/Jaki był zakres wpływu/).fill("Mogła wybrać miejsce; nie zmieniono czasu zadania.");
  await page.getByLabel("Czy było wiadomo, co się wydarzy?").selectOption("yes");
  await step(page, /3\. Pierwsze oznaki/);
  await page.getByLabel("Czy pojawiły się sygnały?").selectOption("yes");
  await page.getByLabel("Ile czasu przed eskalacją?").fill("Około 4 minut — szacunek.");
  await page.getByRole("group", { name: "Obserwowane reakcje na otoczenie" }).getByRole("checkbox", { name: "zatykanie uszu", exact: true }).check();
  await page.getByLabel(pl.earlyResponse).fill("O — o 12:05 wyłączono radio. P — AAC: za głośno. O — nadal zasłaniała uszy.");
  await selectSources(page, "Pierwsze sygnały", ["O", "P"]);
  await page.getByLabel(`${pl.sourceDetails} — Pierwsze sygnały`, { exact: true }).fill("O — osoba obserwująca; P — AAC.");
  await step(page, /3B\. Kontynuowanie/);
  await page.getByLabel("Co obserwowano podczas kontynuowania aktywności?").fill("O — rysowała przez 4 minuty.");
  await page.getByLabel("Co osoba przekazała o wysiłku lub dyskomforcie?").fill("P — AAC: za głośno.");
  await page.getByLabel("Co zauważono później?").fill("R — opiekun o 13:00: osoba odpoczywała.");
  await page.getByLabel("Czy rozważamy kompensację lub maskowanie — na jakiej podstawie?").fill("H — brak podstaw do oceny maskowania.");
  await step(page, /4\. Udzielone wsparcie/);
  await page.getByLabel("Czy dostęp do wsparcia uzależniono od wykonania polecenia?").selectOption("no");
  await step(page, /5\. Opis zachowania/);
  await page.getByLabel(pl.escalationCourse).fill("O — trzy razy uderzyła dłonią w stół. Wyłączono radio; następnie opuściła dłonie, nadal mówiła głośno. Nie przypisujemy jednej przyczyny.");
  await selectSources(page, "Eskalacja", ["O"]);
  await page.getByLabel(`${pl.sourceDetails} — Eskalacja`, { exact: true }).fill("O — osoba obserwująca.");
  await page.getByLabel("Nasilenie opisanego zachowania — mierzalna cecha").fill("3 uderzenia w ciągu 1 minuty.");
  await page.getByRole("group", { name: "Skutki / szkody zaobserwowane" }).getByRole("checkbox", { name: "nie zaobserwowano szkód", exact: true }).check();
  await page.getByLabel("Potencjalne zagrożenie — oddzielnie od skutków").fill("Możliwe strącenie szklanki; do tego nie doszło.");
  await step(page, /6\. Czas i gotowość/);
  await page.getByLabel("Czas trwania opisanego zachowania", { exact: true }).fill("12:05–12:06; ok. 1 min, od pierwszego do ostatniego uderzenia.");
  await page.getByLabel("Zmniejszenie obserwowanych oznak napięcia", { exact: true }).fill("O — dłonie rozluźnione o 12:09, ok. 4 min od początku zachowania.");
  await page.getByLabel(pl.readinessTiming).fill("12:16 — ok. 10 min od końca zachowania.");
  await step(page, /7\. Po eskalacji/);
  await page.getByLabel(pl.postEscalationNeeds).fill("Zapewniono przerwę i spokojne miejsce. P — AAC: chcę czytać. O — o 12:16 wybrała książkę i zaczęła czytać.");
  await selectSources(page, "Po eskalacji", ["O", "P"]);
  await page.getByLabel(`${pl.sourceDetails} — Po eskalacji`, { exact: true }).fill("O — osoba obserwująca; P — AAC.");
  await expect(page.getByLabel("Podstawa oceny: co pomogło / przeszkodziło?")).toHaveCount(0);
  await page.getByLabel("Czy podczas tego zdarzenia była interwencja fizyczna?").selectOption("yes");
  await app.firstPdfButton.click();
  await expect(page.getByText("Podaj liczbę interwencji podczas tego zdarzenia, przybliżenie lub „brak danych”.", { exact: true })).toBeVisible();
  await page.getByLabel("Jeśli tak — ile razy podczas tego zdarzenia?").fill("1 — szacunek");
  await page.getByLabel("Działanie, kontekst i następstwa interwencji fizycznej / bezpieczeństwo").fill("R — zgłoszono jedną interwencję; szczegółów działania i skutków nie obserwowano.");
  await downloadPdf(page, info, "incident-revised");
  await expect(page.getByText("Popraw formularz przed wygenerowaniem PDF.")).not.toBeVisible();
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("heading", { name: "0. Poziom bazowy i kontekst dnia", exact: true })).toBeVisible();
  await expect(page.getByText("P — AAC: za głośno.", { exact: true })).toBeVisible();
  await page.pdf({ path: info.outputPath("incident-browser-print.pdf"), preferCSSPageSize: true });
});

test("simple form exports long Polish text and unobserved readiness on a narrow screen", async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const simple = new SimpleFormPage(page);
  await simple.fillAllRequiredFields({ date: "2026-10-27", time: "12:00", place: "Dom", guardian: "Osoba obserwująca", behavior: "O — początek opisu. " + "Żółć, źródło, przerwa i obserwacja. ".repeat(180) + " KONIEC-DŁUGIEGO-OPISU.", helped: "Zapewniono przerwę i spokojne miejsce. Gotowości do rozmowy nie zaobserwowano.", influence: "P — AAC: chcę przerwę; była dostępna bez warunków." });
  await page.getByLabel(pl.earlyResponse).fill("O — zmniejszono głośność. P — AAC: za jasno.");
  await selectSources(page, "Pierwsze sygnały", ["O", "P"]);
  await page.getByLabel(`${pl.sourceDetails} — Pierwsze sygnały`, { exact: true }).fill("O — opiekun; P — AAC.");
  await page.getByLabel(pl.readinessTiming).fill("Nie zaobserwowano gotowości do rozmowy do końca obserwacji o 13:00. Brak dokładnego pomiaru.");
  await downloadPdf(page, info, "simple-long-polish");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath("simple-mobile.png"), fullPage: true });
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: info.outputPath("simple-browser-print.pdf"), preferCSSPageSize: true });
});

test("map accepts explicit missing observations and exports dates and a comparison without reusing cooperation as safety", async ({ page }, info) => {
  await page.goto("/environment");
  await page.getByLabel("Okres obserwacji uwzględniony w mapie").fill("01–07.10.2026");
  await page.getByLabel("Data aktualizacji mapy").fill("2026-10-08");
  for (const group of [/W jakich miejscach osoba/, /Z jakich miejsc osoba/, /Osoba najłatwiej funkcjonuje/, /Co OBNIŻA napięcie/, /Najczęstsze sytuacje eskalacji/]) await page.getByRole("group", { name: group }).getByRole("checkbox", { name: "nie wiem", exact: true }).check();
  await page.getByLabel("Co obserwujesz w tych miejscach i co mówi o nich osoba?").fill("P — AAC: lubię ogród. O — obserwacji w ogrodzie nie prowadzono.");
  await page.getByLabel("Co obserwujesz w tych miejscach i co może utrudniać sytuację?").fill("Brak danych.");
  await page.getByLabel(/W jakie aktywności osoba/).fill("P — wybiera czytanie; funkcji wzmacniającej nie oceniano.");
  await page.getByLabel(/Osoba wybiera kontakt z/).fill("P — wskazuje opiekunkę. Nie jest to dowód poczucia bezpieczeństwa.");
  await page.getByLabel("Czy podobne sytuacje zdarzają się bez opisywanej eskalacji?").selectOption("yes");
  await page.getByLabel("Co jest podobne, a co inne w sytuacjach bez eskalacji?").fill("R — 2 zdarzenia w 20 okazjach. H — do sprawdzenia udział liczby osób.");
  await downloadPdf(page, info, "map-revised");
  await page.reload();
  await expect(page.getByLabel("Data aktualizacji mapy")).toHaveValue("2026-10-08");
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: info.outputPath("map-browser-print.pdf"), preferCSSPageSize: true });
});

test("current instructions and print downloads are consistent in both interface languages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.getByRole("heading", { name: "Zasady zapisu i oceny", exact: true })).toBeVisible();
  for (const label of [pl.earlyResponse, pl.escalationCourse, pl.postEscalationNeeds]) await expect(page.getByText(label, { exact: true })).toBeVisible();
  const guide = page.getByRole("link", { name: "Pobierz instrukcję PDF" });
  const response = await page.request.get(await guide.getAttribute("href") as string);
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.getByRole("button", { name: /English|angielski|Switch to English/i }).click();
  await expect(page.getByRole("heading", { name: "Recording and assessment", exact: true })).toBeVisible();
  const englishGuide = page.getByRole("link", { name: "Download PDF guide", exact: true });
  const englishForms = page.getByRole("link", { name: "Blank forms PDF", exact: true });
  await expect(englishGuide).toHaveAttribute("href", /how-to-use-monitoring-forms.pdf$/);
  await expect(englishForms).toHaveAttribute("href", /blank-monitoring-forms.pdf$/);
  for (const link of [englishGuide, englishForms]) {
    const response = await page.request.get(await link.getAttribute("href") as string);
    expect(response.ok()).toBe(true);
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  }
  await expect(page.getByText(/Example of calculating the times:/)).toBeVisible();
  await page.getByRole("button", { name: "Przełącz język na polski", exact: true }).click();
  await expect(page.getByRole("link", { name: "Puste formularze PDF", exact: true })).toHaveAttribute("href", /puste-formularze-monitorowania.pdf$/);
});
