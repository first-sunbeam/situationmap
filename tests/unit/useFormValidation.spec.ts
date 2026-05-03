import { describe, expect, it } from "vitest";
import { validateForm } from "../../src/composables/useFormValidation";
import { incidentSections } from "../../src/config/incidentSections";
import {
  type HomeForm,
  createHomeForm,
  fillRequiredMeta,
  fillMinimalIncident,
  fillMapForm,
} from "./helpers/formFixtures";

// ── Stałe komunikatów walidacji ───────────────────────────────────────────────
// Wyciągnięte tu, żeby zmiany copy trafiały w jedno miejsce.

const MSG_OTHER = "Jeśli zaznaczono „Inne”, opisz tę odpowiedź.";

// ── Testy ─────────────────────────────────────────────────────────────────────

describe("walidacja formularza", () => {
  // ── Formularz prosty ────────────────────────────────────────────────────────

  it("zwraca błędy wymaganych pól dla pustego formularza prostego", () => {
    const result = validateForm({ variant: "simple", mode: "incident", form: createHomeForm() });

    expect(result.fieldErrors["meta.date"]).toBe("Uzupełnij pole: Data.");
    expect(result.fieldErrors["meta.time"]).toBe("Uzupełnij pole: Godzina.");
    expect(result.fieldErrors["meta.place"]).toBe("Uzupełnij pole: Miejsce.");
    expect(result.fieldErrors["meta.lead"]).toBe("Uzupełnij pole: Osoba prowadząca.");
    expect(result.fieldErrors["simple.factDescription"]).toBe("Uzupełnij krótki opis sytuacji.");
    expect(result.fieldErrors["simple.helped"]).toContain("Uzupełnij pole");
    expect(result.summary).toContain("Formularz prosty: uzupełnij krótki opis sytuacji.");
  });

  it("akceptuje formularz prosty po uzupełnieniu wymaganych pól", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    form.simple.factDescription = "Krótki opis sytuacji.";
    form.simple.helped = "Przerwa i spokojne miejsce.";

    const result = validateForm({ variant: "simple", mode: "incident", form });

    expect(result.summary).toEqual([]);
    expect(result.fieldErrors).toEqual({});
  });

  // ── Formularz rozszerzony – incydent ────────────────────────────────────────

  it("wymaga sekcji incydentu dla PDF formularza rozszerzonego", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.baselineSection"]).toBe("Uzupełnij przynajmniej jedno pole w tej sekcji.");
    expect(result.fieldErrors["incident.beforeSection"]).toBe("Zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.");
    expect(result.fieldErrors["incident.regulationSection"]).toBe("Zaznacz, co najbardziej pomogło w tej sytuacji.");
  });

  it("akceptuje alternatywną wartość w sekcji przed zdarzeniem", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    fillMinimalIncident(form);

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.beforeSection"]).toBeUndefined();
    expect(result.fieldErrors["incident.factDescription"]).toBeUndefined();
  });

  it("wymaga szczegółów sygnałów i czasu przed eskalacją, gdy sygnały się pojawiły", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    fillMinimalIncident(form);
    form.incident.signalsAppeared = "Tak"; // nadpisuje "Nie" z fillMinimalIncident

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.signalsSection"]).toBe("Skoro sygnały się pojawiły, wskaż jakie.");
    expect(result.fieldErrors["incident.timeToEscalation"]).toBe("Skoro pojawiły się sygnały, podaj ile czasu przed eskalacją.");
    expect(result.summary).toContain("Pierwsze oznaki narastającego napięcia: skoro sygnały się pojawiły, wskaż jakie.");
    expect(result.summary).toContain("3. Pierwsze oznaki narastającego napięcia: Skoro pojawiły się sygnały, podaj ile czasu przed eskalacją.");
  });

  it("wymaga szczegółów snu, gdy zaznaczono sen lub odpoczynek w ciągu dnia", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    form.incident.slept = "Tak";

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.sleepDetails"]).toBe(
      "Skoro zaznaczono sen / odpoczynek w ciągu dnia, podaj o której i jak długo."
    );
    expect(result.summary).toContain(
      "0. Poziom bazowy i kontekst dnia: Skoro zaznaczono sen / odpoczynek w ciągu dnia, podaj o której i jak długo."
    );
  });

  it("wymaga liczby interwencji, gdy zaznaczono interwencję fizyczną w tym tygodniu", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    form.incident.physicalThisWeek = "Tak";

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.physicalCount"]).toBe(
      "Skoro zaznaczono interwencję fizyczną w tym tygodniu, podaj ile razy."
    );
    expect(result.summary).toContain(
      "6. Co wydarzyło się po zdarzeniu?: Skoro zaznaczono interwencję fizyczną w tym tygodniu, podaj ile razy."
    );
  });

  it("wymaga opisu wcześniejszej reakcji, gdy zaznaczono że była możliwa", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    form.incident.earlierPossible = "Tak";

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.earlierWhat"]).toBe(
      "Skoro można było zareagować wcześniej, opisz co było możliwe."
    );
    expect(result.summary).toContain(
      "3A. Faza napięcia i 4. Działania: Skoro można było zareagować wcześniej, opisz co było możliwe."
    );
  });

  // ── Opcja "inne" – pola warunkowe ───────────────────────────────────────────

  it.each<[string, (form: HomeForm) => void]>([
    ["incident.burdensOther",       (f) => { f.incident.burdens       = ["inne"]; }],
    ["incident.expectationOther",   (f) => { f.incident.expectations  = ["inne"]; }],
    ["incident.signalsOther",       (f) => { f.incident.signals       = ["inne"]; }],
    ["incident.interventionDetails",(f) => { f.incident.interventions = ["Inne"]; }],
    ["incident.afterOther",         (f) => { f.incident.after         = ["Inne"]; }],
    ["incident.endedByOther",       (f) => { f.incident.endedBy       = ["inne"]; }],
  ])("wymaga opisu po zaznaczeniu opcji inne w incydencie: %s", (fieldKey, selectOther) => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    selectOther(form);

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors[fieldKey]).toBe(MSG_OTHER);
  });

  it.each<[string, (form: HomeForm) => void]>([
    ["baseline",     (f) => { f.incident.burdens       = ["inne"]; }],
    ["baseline",     (f) => { f.incident.slept          = "Tak"; }],
    ["signals",      (f) => { f.incident.signalsAppeared = "Tak"; f.incident.signals = ["zmiana tonu głosu"]; }],
    ["expectations", (f) => { f.incident.expectations  = ["inne"]; }],
    ["signals",      (f) => { f.incident.signals       = ["inne"]; }],
    ["actions",      (f) => { f.incident.interventions = ["Inne"]; }],
    ["actions",      (f) => { f.incident.earlierPossible = "Tak"; }],
    ["after",        (f) => { f.incident.after         = ["Inne"]; }],
    ["after",        (f) => { f.incident.physicalThisWeek = "Tak"; }],
    ["regulation",   (f) => { f.incident.endedBy       = ["inne"]; }],
  ])("nie oznacza sekcji incydentu jako ukończonej, gdy brakuje wymaganego pola warunkowego: %s", (sectionId, selectOther) => {
    const form = createHomeForm();
    selectOther(form);

    const section = incidentSections.find((item) => item.id === sectionId);

    expect(section?.isComplete(form)).toBe(false);
  });

  // ── Mapa środowiska ─────────────────────────────────────────────────────────

  it("wymaga opisu mapy po zaznaczeniu innego kontekstu eskalacji", () => {
    const form = createHomeForm();
    form.map.escalationContexts = ["Inne"];

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.escalationOther"]).toBe(MSG_OTHER);
  });

  it("wymaga opisu zależności, gdy zaznaczono od czego zmienia się zachowanie", () => {
    const form = createHomeForm();
    form.map.dependsOn = ["hałasu"];

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.dependsDescription"]).toBe(
      "Skoro zaznaczono zależności, opisz na czym polega zmiana zachowania."
    );
    expect(result.summary).toContain(
      "Zachowanie zmienia się w zależności od: Skoro zaznaczono zależności, opisz na czym polega zmiana zachowania."
    );
  });

  it("wymaga opisu sytuacji bez agresji, gdy zaznaczono że takie sytuacje są", () => {
    const form = createHomeForm();
    form.map.noAggression = "Tak";

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.noAggressionWhere"]).toBe(
      "Skoro są sytuacje bez agresji, opisz jakie."
    );
    expect(result.summary).toContain(
      "Czy są sytuacje bez agresji?: Skoro są sytuacje bez agresji, opisz jakie."
    );
  });

  it("wymaga obowiązkowych pól mapy w trybie mapy", () => {
    const result = validateForm({ variant: "extended", mode: "map", form: createHomeForm() });

    expect(result.fieldErrors["map.rows"]).toBe("Uzupełnij przynajmniej jeden wiersz miejsc i aktywności.");
    expect(result.fieldErrors["map.preferred"]).toBe("Uzupełnij pole: Chętnie przebywa w.");
    expect(result.fieldErrors["map.avoided"]).toBe("Uzupełnij pole: Unika / wychodzi z trudem z.");
    expect(result.fieldErrors["map.likes"]).toBe("Uzupełnij pole: Najchętniej angażuje się w.");
    expect(result.fieldErrors["map.easiestWhen"]).toBe("Uzupełnij pole: Najłatwiej funkcjonuje, gdy.");
    expect(result.fieldErrors["map.cooperatesWith"]).toBe("Uzupełnij pole: Najłatwiej współpracuje z.");
    expect(result.fieldErrors["map.reducers"]).toBe("Uzupełnij pole: Co obniża napięcie?.");
    expect(result.fieldErrors["map.escalationContexts"]).toBe("Zaznacz przynajmniej jedną sytuację eskalacji.");
  });

  it("akceptuje tryb mapy, gdy obowiązkowe pola mapy są wypełnione", () => {
    const form = createHomeForm();
    fillMapForm(form);

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.rows"]).toBeUndefined();
    expect(result.fieldErrors["map.preferred"]).toBeUndefined();
    expect(result.fieldErrors["map.escalationContexts"]).toBeUndefined();
  });
});
