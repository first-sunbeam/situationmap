import { expect, test } from "@playwright/test";

const simpleValidationMessages = {
  date: "Dane podstawowe: uzupełnij pole data.",
  time: "Dane podstawowe: uzupełnij pole godzina.",
  place: "Dane podstawowe: uzupełnij pole miejsce.",
  description: "Formularz prosty: uzupełnij krótki opis sytuacji.",
  helped: "Formularz prosty: uzupełnij pole „Co pomogło obniżyć napięcie lub uspokoić sytuację?”."
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
});

test("formularz prosty blokuje wysyłkę bez wymaganych danych i usuwa błędy po poprawieniu", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("SituationMap");
  await expect(page.getByRole("heading", { name: /Wypełnij formularz dla środowiska: Dom/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Formularz prosty - Dom" })).toBeVisible();

  await page.getByRole("button", { name: /Wyślij na kontakt@autyzm\.poznan\.pl/ }).click();

  await expect(page.getByText("Popraw formularz przed wysłaniem e-maila.")).toBeVisible();
  await expect(page.getByText(simpleValidationMessages.date)).toBeVisible();
  await expect(page.getByText(simpleValidationMessages.time)).toBeVisible();
  await expect(page.getByText(simpleValidationMessages.place)).toBeVisible();
  await expect(page.getByText(simpleValidationMessages.description)).toBeVisible();
  await expect(page.getByText(simpleValidationMessages.helped)).toBeVisible();

  await page.getByLabel("Data").fill("2026-05-02");
  await page.getByLabel("Godzina").fill("12:30");
  await page.getByLabel("Miejsce").fill("Dom");
  await page.getByLabel("Rodzic / opiekun prowadzący").fill("Jan Kowalski");
  await page.getByLabel("Krótki opis sytuacji").fill("Dziecko zaprotestowało po zakończeniu ulubionej aktywności.");
  await page.getByLabel("Co pomogło obniżyć napięcie lub uspokoić sytuację?").fill("Cisza, krótszy komunikat i kilka minut przerwy.");

  await expect(page.getByText(simpleValidationMessages.date)).not.toBeVisible();
  await expect(page.getByText(simpleValidationMessages.time)).not.toBeVisible();
  await expect(page.getByText(simpleValidationMessages.place)).not.toBeVisible();
  await expect(page.getByText(simpleValidationMessages.description)).not.toBeVisible();
  await expect(page.getByText(simpleValidationMessages.helped)).not.toBeVisible();
  await expect(page.getByText("Popraw przed dalszą akcją:")).not.toBeVisible();
});

test("zapis lokalny odtwarza dane formularza prostego po przeładowaniu strony", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Data").fill("2026-05-02");
  await page.getByLabel("Godzina").fill("12:30");
  await page.getByLabel("Miejsce").fill("Dom");
  await page.getByLabel("Rodzic / opiekun prowadzący").fill("Jan Kowalski");
  await page.getByLabel("Inne osoby obecne").fill("Mama, tata");
  await page.getByLabel("Krótki opis sytuacji").fill("Krótki opis zdarzenia zapisany lokalnie.");
  await page.getByLabel("Co pomogło obniżyć napięcie lub uspokoić sytuację?").fill("Przerwa i spokojne miejsce.");

  await expect(page.getByText("Formularz zapisano lokalnie.")).toBeVisible();
  await page.reload();

  await expect(page.getByRole("heading", { name: "Formularz prosty - Dom" })).toBeVisible();
  await expect(page.getByLabel("Data")).toHaveValue("2026-05-02");
  await expect(page.getByLabel("Godzina")).toHaveValue("12:30");
  await expect(page.getByLabel("Miejsce")).toHaveValue("Dom");
  await expect(page.getByLabel("Rodzic / opiekun prowadzący")).toHaveValue("Jan Kowalski");
  await expect(page.getByLabel("Inne osoby obecne")).toHaveValue("Mama, tata");
  await expect(page.getByLabel("Krótki opis sytuacji")).toHaveValue("Krótki opis zdarzenia zapisany lokalnie.");
});

test("formularz rozszerzony po nieudanym PDF prowadzi do pierwszej błędnej sekcji danych podstawowych", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Rozszerzona" }).click();
  await page.getByRole("button", { name: "1. Bezpośrednio przed zdarzeniem" }).click();
  await expect(page.getByRole("heading", { name: /1\. Bezpośrednio przed zdarzeniem/ })).toBeVisible();

  await page.getByRole("button", { name: /Pobierz PDF/ }).first().click();

  await expect(page.getByText("Popraw formularz przed wygenerowaniem PDF.")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Dane podstawowe/ })).toBeVisible();
  await expect(page.getByText("Dane podstawowe: uzupełnij pole data.")).toBeVisible();
  await expect(page.getByText("Dane podstawowe: uzupełnij pole godzina.")).toBeVisible();
  await expect(page.getByText("Dane podstawowe: uzupełnij pole miejsce.")).toBeVisible();
});

test("sekcja przed zdarzeniem usuwa błąd po uzupełnieniu alternatywnych danych i zachowuje stan między krokami", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Rozszerzona" }).click();

  await page.getByLabel("Data").fill("2026-05-02");
  await page.getByLabel("Godzina").fill("12:30");
  await page.getByLabel("Miejsce").fill("Dom");
  await page.getByLabel("Rodzic / opiekun prowadzący").fill("Jan Kowalski");
  await page.getByRole("button", { name: "1. Bezpośrednio przed zdarzeniem" }).click();

  await page.getByRole("button", { name: /Pobierz PDF/ }).first().click();
  await expect(
    page.getByText("Bezpośrednio przed zdarzeniem: zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.")
  ).toBeVisible();

  await page.getByRole("button", { name: "1. Bezpośrednio przed zdarzeniem" }).click();

  const beforeStep = page
    .locator("section.section")
    .filter({ has: page.getByRole("heading", { name: /1\. Bezpośrednio przed zdarzeniem/ }) });
  const antecedent = beforeStep.getByRole("checkbox", { name: "Zmiana aktywności" });
  const description = beforeStep.getByLabel("Krótki opis sytuacji (fakty, bez interpretacji)");

  await antecedent.check();
  await description.fill("Odmówiono zakończenia aktywności i przejścia do kolejnego zadania.");

  await expect(
    page.getByText("Bezpośrednio przed zdarzeniem: zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.")
  ).not.toBeVisible();
  await expect(antecedent).toBeChecked();
  await expect(description).toHaveValue("Odmówiono zakończenia aktywności i przejścia do kolejnego zadania.");

  await page.getByRole("button", { name: "2. Czego oczekiwano w tym momencie?" }).click();
  await page.getByRole("button", { name: "1. Bezpośrednio przed zdarzeniem" }).click();

  await expect(antecedent).toBeChecked();
  await expect(description).toHaveValue("Odmówiono zakończenia aktywności i przejścia do kolejnego zadania.");
});
