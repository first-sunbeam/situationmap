import { describe, expect, it } from "vitest";
import { blankForm, environments } from "../../src/data/environments";
import { validateForm } from "../../src/composables/useFormValidation";

function homeForm() {
  return blankForm(environments.home);
}

function fillRequiredMeta(form: ReturnType<typeof homeForm>) {
  form.meta.date = "2026-05-02";
  form.meta.time = "12:30";
  form.meta.place = "Dom";
  form.meta.lead = "Jan Kowalski";
}

describe("validateForm", () => {
  it("returns required errors for an empty simple form", () => {
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

  it("accepts a simple form with required fields filled", () => {
    const form = homeForm();
    fillRequiredMeta(form);
    form.simple.factDescription = "Krótki opis sytuacji.";
    form.simple.helped = "Przerwa i spokojne miejsce.";

    const result = validateForm({ variant: "simple", mode: "incident", form });

    expect(result.summary).toEqual([]);
    expect(result.fieldErrors).toEqual({});
  });

  it("requires incident sections for extended incident PDF", () => {
    const form = homeForm();
    fillRequiredMeta(form);

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors["incident.baselineSection"]).toBe("Uzupełnij przynajmniej jedno pole w tej sekcji.");
    expect(result.fieldErrors["incident.beforeSection"]).toBe("Zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.");
    expect(result.fieldErrors["incident.regulationSection"]).toBe("Zaznacz, co najbardziej pomogło w tej sytuacji.");
  });

  it("accepts an alternative value in the before section", () => {
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

  it("requires signal details when signals appeared", () => {
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
  ])("requires a description when an incident other option is selected: %s", (fieldKey, selectOther) => {
    const form = homeForm();
    fillRequiredMeta(form);
    selectOther(form);

    const result = validateForm({ variant: "extended", mode: "incident", form });

    expect(result.fieldErrors[fieldKey]).toBe("Jeśli zaznaczono „Inne”, opisz tę odpowiedź.");
  });

  it("requires a map description when an other escalation context is selected", () => {
    const form = homeForm();
    form.map.escalationContexts = ["Inne"];

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.escalationOther"]).toBe("Jeśli zaznaczono „Inne”, opisz tę odpowiedź.");
  });

  it("requires at least one map field in map mode", () => {
    const result = validateForm({ variant: "extended", mode: "map", form: homeForm() });

    expect(result.fieldErrors.map).toBe("Uzupełnij przynajmniej jedno pole w mapie środowiska.");
  });

  it("accepts map mode when one map row is filled", () => {
    const form = homeForm();
    form.map.rows[0].time = "2h";

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors.map).toBeUndefined();
  });
});
