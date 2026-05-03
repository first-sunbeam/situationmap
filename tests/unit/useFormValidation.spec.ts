import { describe, expect, it } from "vitest";
import { validateForm } from "../../src/composables/useFormValidation";
import { incidentSections } from "../../src/config/incidentSections";
import { createHomeForm, fillRequiredMeta } from "./helpers/formFixtures";

describe("walidacja formularza", () => {
  it("zwraca błędy wymaganych pól dla pustego formularza prostego", () => {
    const result = validateForm({
      variant: "simple",
      mode: "incident",
      form: createHomeForm()
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
    const form = createHomeForm();
    fillRequiredMeta(form);
    form.simple.factDescription = "Krótki opis sytuacji.";
    form.simple.helped = "Przerwa i spokojne miejsce.";

    const result = validateForm({ variant: "simple", mode: "incident", form });

    expect(result.summary).toEqual([]);
    expect(result.fieldErrors).toEqual({});
  });

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

  it("wymaga szczegółów sygnałów i czasu przed eskalacją, gdy sygnały się pojawiły", () => {
    const form = createHomeForm();
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
    expect(result.fieldErrors["incident.timeToEscalation"]).toBe("Skoro pojawiły się sygnały, podaj ile czasu przed eskalacją.");
    expect(result.summary).toContain("Pierwsze oznaki narastającego napięcia: skoro sygnały się pojawiły, wskaż jakie.");
    expect(result.summary).toContain("3. Pierwsze oznaki narastającego napięcia: Skoro pojawiły się sygnały, podaj ile czasu przed eskalacją.");
  });

  it("wymaga szczegółów snu, gdy zaznaczono sen lub odpoczynek w ciągu dnia", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    form.incident.slept = "Tak";

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.sleepDetails"]).toBe("Skoro zaznaczono sen / odpoczynek w ciągu dnia, podaj o której i jak długo.");
    expect(result.summary).toContain("0. Poziom bazowy i kontekst dnia: Skoro zaznaczono sen / odpoczynek w ciągu dnia, podaj o której i jak długo.");
  });

  it.each([
    ["incident.burdensOther", (form: ReturnType<typeof createHomeForm>) => { form.incident.burdens = ["inne"]; }],
    ["incident.expectationOther", (form: ReturnType<typeof createHomeForm>) => { form.incident.expectations = ["inne"]; }],
    ["incident.signalsOther", (form: ReturnType<typeof createHomeForm>) => { form.incident.signals = ["inne"]; }],
    ["incident.interventionDetails", (form: ReturnType<typeof createHomeForm>) => { form.incident.interventions = ["Inne"]; }],
    ["incident.afterOther", (form: ReturnType<typeof createHomeForm>) => { form.incident.after = ["Inne"]; }],
    ["incident.endedByOther", (form: ReturnType<typeof createHomeForm>) => { form.incident.endedBy = ["inne"]; }]
  ])("wymaga opisu po zaznaczeniu opcji inne w incydencie: %s", (fieldKey, selectOther) => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    selectOther(form);

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors[fieldKey]).toBe("Jeśli zaznaczono „Inne”, opisz tę odpowiedź.");
  });

  it.each([
    ["baseline", (form: ReturnType<typeof createHomeForm>) => { form.incident.burdens = ["inne"]; }],
    ["baseline", (form: ReturnType<typeof createHomeForm>) => { form.incident.slept = "Tak"; }],
    ["signals", (form: ReturnType<typeof createHomeForm>) => { form.incident.signalsAppeared = "Tak"; form.incident.signals = ["zmiana tonu głosu"]; }],
    ["expectations", (form: ReturnType<typeof createHomeForm>) => { form.incident.expectations = ["inne"]; }],
    ["signals", (form: ReturnType<typeof createHomeForm>) => { form.incident.signals = ["inne"]; }],
    ["actions", (form: ReturnType<typeof createHomeForm>) => { form.incident.interventions = ["Inne"]; }],
    ["after", (form: ReturnType<typeof createHomeForm>) => { form.incident.after = ["Inne"]; }],
    ["regulation", (form: ReturnType<typeof createHomeForm>) => { form.incident.endedBy = ["inne"]; }]
  ])("nie oznacza sekcji incydentu jako ukończonej, gdy brakuje wymaganego pola warunkowego: %s", (sectionId, selectOther) => {
    const form = createHomeForm();
    selectOther(form);

    const section = incidentSections.find((item) => item.id === sectionId);

    expect(section?.isComplete(form)).toBe(false);
  });

  it("wymaga opisu mapy po zaznaczeniu innego kontekstu eskalacji", () => {
    const form = createHomeForm();
    form.map.escalationContexts = ["Inne"];

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.escalationOther"]).toBe("Jeśli zaznaczono „Inne”, opisz tę odpowiedź.");
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
