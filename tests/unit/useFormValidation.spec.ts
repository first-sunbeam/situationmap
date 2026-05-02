import { describe, expect, it } from "vitest";
import { blankForm, environments } from "../../src/data/environments";
import { validateForm } from "../../src/composables/useFormValidation";
import { incidentSections } from "../../src/config/incidentSections";

function homeForm() {
  return blankForm(environments.home);
}

function fillRequiredMeta(form: ReturnType<typeof homeForm>) {
  form.meta.date = "2026-05-02";
  form.meta.time = "12:30";
  form.meta.place = "Dom";
  form.meta.lead = "Jan Kowalski";
}

describe("walidacja formularza", () => {
  it("zwraca błędy wymaganych pól dla pustego formularza prostego", () => {
    const result = validateForm({
      variant: "simple",
      mode: "incident",
      form: homeForm()
    });

    expect(result.fieldErrors["meta.date"]).toBe("Uzupełnij pole: Data.");
    expect(result.fieldErrors["meta.time"]).toBe("Uzupełnij pole: Godzina.");
    expect(result.fieldErrors["meta.place"]).toBe("Uzupełnij pole: Miejsce.");
    expect(result.fieldErrors["meta.lead"]).toBe("Uzupełnij pole: Osoba prowadząca.");
    expect(result.fieldErrors["simple.factDescription"]).toBe("Uzupełnij krótki opis sytuacji.");
    expect(result.fieldErrors["simple.helped"]).toContain("Uzupełnij pole");
    expect(result.summary).toContain("Formularz prosty: uzupełnij krótki opis sytuacji.");
  });

  it("akceptuje formularz prosty po uzupełnieniu wymaganych pól", () => {
    const form = homeForm();
    fillRequiredMeta(form);
    form.simple.factDescription = "Krótki opis sytuacji.";
    form.simple.helped = "Przerwa i spokojne miejsce.";

    const result = validateForm({ variant: "simple", mode: "incident", form });

    expect(result.summary).toEqual([]);
    expect(result.fieldErrors).toEqual({});
  });

  it("wymaga sekcji incydentu dla PDF formularza rozszerzonego", () => {
    const form = homeForm();
    fillRequiredMeta(form);

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.baselineSection"]).toBe("Uzupełnij przynajmniej jedno pole w tej sekcji.");
    expect(result.fieldErrors["incident.beforeSection"]).toBe("Zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.");
    expect(result.fieldErrors["incident.regulationSection"]).toBe("Zaznacz, co najbardziej pomogło w tej sytuacji.");
  });

  it("akceptuje alternatywną wartość w sekcji przed zdarzeniem", () => {
    const form = homeForm();
    fillRequiredMeta(form);
    form.incident.tension = "1 podwyższony";
    form.incident.antecedents = ["Zmiana aktywności"];
    form.incident.expectations = ["Brak wymagań"];
    form.incident.signalsAppeared = "Nie";
    form.incident.phase = "Żółta - narastające napięcie";
    form.incident.behavior = "Protest słowny.";
    form.incident.after = ["Przejście do spokojniejszego miejsca"];
    form.incident.endedBy = ["czas / przeczekanie"];

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.beforeSection"]).toBeUndefined();
    expect(result.fieldErrors["incident.factDescription"]).toBeUndefined();
  });

  it("wymaga szczegółów sygnałów, gdy sygnały się pojawiły", () => {
    const form = homeForm();
    fillRequiredMeta(form);
    form.incident.tension = "1 podwyższony";
    form.incident.antecedents = ["Zmiana aktywności"];
    form.incident.expectations = ["Brak wymagań"];
    form.incident.signalsAppeared = "Tak";
    form.incident.phase = "Żółta - narastające napięcie";
    form.incident.behavior = "Protest słowny.";
    form.incident.after = ["Przejście do spokojniejszego miejsca"];
    form.incident.endedBy = ["czas / przeczekanie"];

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.signalsSection"]).toBe("Skoro sygnały się pojawiły, wskaż jakie.");
    expect(result.summary).toContain("Pierwsze oznaki narastającego napięcia: skoro sygnały się pojawiły, wskaż jakie.");
  });

  it.each([
    ["incident.burdensOther", (form: ReturnType<typeof homeForm>) => { form.incident.burdens = ["inne"]; }],
    ["incident.expectationOther", (form: ReturnType<typeof homeForm>) => { form.incident.expectations = ["inne"]; }],
    ["incident.signalsOther", (form: ReturnType<typeof homeForm>) => { form.incident.signals = ["inne"]; }],
    ["incident.interventionDetails", (form: ReturnType<typeof homeForm>) => { form.incident.interventions = ["Inne"]; }],
    ["incident.afterOther", (form: ReturnType<typeof homeForm>) => { form.incident.after = ["Inne"]; }],
    ["incident.endedByOther", (form: ReturnType<typeof homeForm>) => { form.incident.endedBy = ["inne"]; }]
  ])("wymaga opisu po zaznaczeniu opcji inne w incydencie: %s", (fieldKey, selectOther) => {
    const form = homeForm();
    fillRequiredMeta(form);
    selectOther(form);

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors[fieldKey]).toBe("Jeśli zaznaczono „Inne”, opisz tę odpowiedź.");
  });

  it.each([
    ["baseline", (form: ReturnType<typeof homeForm>) => { form.incident.burdens = ["inne"]; }],
    ["expectations", (form: ReturnType<typeof homeForm>) => { form.incident.expectations = ["inne"]; }],
    ["signals", (form: ReturnType<typeof homeForm>) => { form.incident.signals = ["inne"]; }],
    ["actions", (form: ReturnType<typeof homeForm>) => { form.incident.interventions = ["Inne"]; }],
    ["after", (form: ReturnType<typeof homeForm>) => { form.incident.after = ["Inne"]; }],
    ["regulation", (form: ReturnType<typeof homeForm>) => { form.incident.endedBy = ["inne"]; }]
  ])("nie oznacza sekcji incydentu jako ukończonej, gdy brakuje opisu opcji inne: %s", (sectionId, selectOther) => {
    const form = homeForm();
    selectOther(form);

    const section = incidentSections.find((item) => item.id === sectionId);

    expect(section?.isComplete(form)).toBe(false);
  });

  it("wymaga opisu mapy po zaznaczeniu innego kontekstu eskalacji", () => {
    const form = homeForm();
    form.map.escalationContexts = ["Inne"];

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.escalationOther"]).toBe("Jeśli zaznaczono „Inne”, opisz tę odpowiedź.");
  });

  it("wymaga obowiązkowych pól mapy w trybie mapy", () => {
    const result = validateForm({ variant: "extended", mode: "map", form: homeForm() });

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
    const form = homeForm();
    form.map.rows[0].time = "2h";
    form.map.preferred = "Pokój";
    form.map.avoided = "Korytarz";
    form.map.likes = "Klocki";
    form.map.easiestWhen = "Jest cicho";
    form.map.cooperatesWith = "Rodzic";
    form.map.reducers = "Przerwa";
    form.map.escalationContexts = ["Oczekiwanie"];

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.rows"]).toBeUndefined();
    expect(result.fieldErrors["map.preferred"]).toBeUndefined();
    expect(result.fieldErrors["map.escalationContexts"]).toBeUndefined();
  });
});
