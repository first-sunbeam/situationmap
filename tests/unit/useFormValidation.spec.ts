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

describe("form validation", () => {
  // ── Formularz prosty ────────────────────────────────────────────────────────

  it("returns required-field errors for an empty simple form", () => {
    const result = validateForm({
      variant: "simple",
      mode: "incident",
      form: createHomeForm(),
    });

    expect(result.fieldErrors["meta.date"]).toBe("Uzupełnij pole: Data.");
    expect(result.fieldErrors["meta.time"]).toBe("Uzupełnij pole: Godzina.");
    expect(result.fieldErrors["meta.place"]).toBe("Uzupełnij pole: Miejsce.");
    expect(result.fieldErrors["meta.lead"]).toBe(
      "Uzupełnij pole: Osoba prowadząca.",
    );
    expect(result.fieldErrors["simple.escalationCourse"]).toBe(
      "Uzupełnij pole „Jak przebiegała eskalacja? Jakie działania lub zmiany towarzyszyły jej nasilaniu się i ustępowaniu?”.",
    );
    expect(result.fieldErrors["simple.postEscalationNeeds"]).toContain("Uzupełnij pole");
    expect(result.fieldErrors["simple.notes"]).toBe(
      "Uzupełnij pole „Możliwość decyzji dla osoby”.",
    );
    expect(result.summary).toContain(
      "Formularz prosty: uzupełnij pole „Jak przebiegała eskalacja? Jakie działania lub zmiany towarzyszyły jej nasilaniu się i ustępowaniu?”.",
    );
  });

  it("accepts the simple form after required fields are filled", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    form.simple.escalationCourse =
      "Protest, płacz i odmowa przejścia do kolejnej aktywności.";
    form.simple.postEscalationNeeds = "Przerwa i spokojne miejsce.";
    form.simple.notes =
      "Mogła wybrać kolejność, ale zmiana planu była narzucona.";

    const result = validateForm({ variant: "simple", mode: "incident", form });

    expect(result.summary).toEqual([]);
    expect(result.fieldErrors).toEqual({});
  });

  // ── Formularz rozszerzony – incydent ────────────────────────────────────────

  it("requires incident sections for an extended-form PDF", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);

    const result = validateForm({
      variant: "extended",
      mode: "incident",
      form,
    });

    expect(result.fieldErrors["incident.baselineSection"]).toBe(
      "Uzupełnij przynajmniej jedno pole w tej sekcji.",
    );
    expect(result.fieldErrors["incident.beforeSection"]).toBe(
      "Zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.",
    );
    expect(result.fieldErrors["incident.regulationSection"]).toBe(
      "Uzupełnij przynajmniej jedno pole; dopuszczalny jest brak danych.",
    );
    expect(result.fieldErrors["incident.influence"]).toBe(
      "Uzupełnij pole „Jaki był zakres wpływu, autonomii i przewidywalności w tym momencie dla osoby?”.",
    );
  });

  it("accepts an alternative value in the before-event section", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    fillMinimalIncident(form);

    const result = validateForm({
      variant: "extended",
      mode: "incident",
      form,
    });

    expect(result.fieldErrors["incident.beforeSection"]).toBeUndefined();
    expect(result.fieldErrors["incident.factDescription"]).toBeUndefined();
  });

  it("requires a description of the person’s influence in the expectations section", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    form.incident.expectations = ["brak_wymagan"];

    const result = validateForm({
      variant: "extended",
      mode: "incident",
      form,
    });

    expect(result.fieldErrors["incident.influence"]).toBe(
      "Uzupełnij pole „Jaki był zakres wpływu, autonomii i przewidywalności w tym momencie dla osoby?”.",
    );
    expect(result.summary).toContain(
      "2. Czego oczekiwano w tym momencie?: Uzupełnij pole „Jaki był zakres wpływu, autonomii i przewidywalności w tym momencie dla osoby?”.",
    );
  });

  it("requires signal details and time before escalation when signals appeared", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    fillMinimalIncident(form);
    form.incident.signalsAppeared = "yes"; // nadpisuje "no" z fillMinimalIncident

    const result = validateForm({
      variant: "extended",
      mode: "incident",
      form,
    });

    expect(result.fieldErrors["incident.signalsSection"]).toBe(
      "Skoro sygnały się pojawiły, wskaż jakie.",
    );
    expect(result.fieldErrors["incident.timeToEscalation"]).toBe(
      "Skoro pojawiły się sygnały, podaj ile czasu przed eskalacją.",
    );
    expect(result.summary).toContain(
      "Pierwsze oznaki narastającego napięcia: skoro sygnały się pojawiły, wskaż jakie.",
    );
    expect(result.summary).toContain(
      "3. Pierwsze oznaki narastającego napięcia: Skoro pojawiły się sygnały, podaj ile czasu przed eskalacją.",
    );
  });

  it("requires individual signs when a tension level is selected", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    form.incident.tension = "1_podwyzszony";

    const result = validateForm({
      variant: "extended",
      mode: "incident",
      form,
    });

    expect(result.fieldErrors["incident.tensionSigns"]).toContain("indywidualne oznaki");
    form.incident.tensionSigns = "O — zaciska dłonie, inaczej niż przed aktywnością.";
    expect(validateForm({ variant: "extended", mode: "incident", form }).fieldErrors["incident.tensionSigns"]).toBeUndefined();
  });

  it("requires a count for physical intervention during this event", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    form.incident.physicalDuringEvent = "yes";

    const result = validateForm({
      variant: "extended",
      mode: "incident",
      form,
    });

    expect(result.fieldErrors["incident.eventPhysicalCount"]).toContain("podczas tego zdarzenia");
    expect(result.fieldErrors["incident.physicalCount"]).toBeUndefined();
  });

  // ── Opcja "other" – pola warunkowe ───────────────────────────────────────────

  it.each<[string, (form: HomeForm) => void]>([
    [
      "incident.burdensOther",
      (f) => {
        f.incident.burdens = ["other"];
      },
    ],
    [
      "incident.expectationOther",
      (f) => {
        f.incident.expectations = ["other"];
      },
    ],
    [
      "incident.activationSignalsOther",
      (f) => {
        f.incident.activationSignals = ["other"];
      },
    ],
    [
      "incident.interventionDetails",
      (f) => {
        f.incident.interventions = ["other"];
      },
    ],
    [
      "incident.afterOther",
      (f) => {
        f.incident.after = ["other"];
      },
    ],
  ])(
    "wymaga opisu po zaznaczeniu opcji inne w incydencie: %s",
    (fieldKey, selectOther) => {
      const form = createHomeForm();
      fillRequiredMeta(form);
      selectOther(form);

      const result = validateForm({
        variant: "extended",
        mode: "incident",
        form,
      });

      expect(result.fieldErrors[fieldKey]).toBe(MSG_OTHER);
    },
  );

  it.each<[string, (form: HomeForm) => void]>([
    [
      "baseline",
      (f) => {
        f.incident.burdens = ["other"];
      },
    ],
    [
      "baseline",
      (f) => {
        f.incident.tension = "1_podwyzszony";
      },
    ],
    [
      "signals",
      (f) => {
        f.incident.signalsAppeared = "yes";
        f.incident.activationSignals = ["napiecie_miesniowe"];
      },
    ],
    [
      "expectations",
      (f) => {
        f.incident.expectations = ["other"];
      },
    ],
    [
      "expectations",
      (f) => {
        f.incident.expectations = ["brak_wymagan"];
      },
    ],
    [
      "signals",
      (f) => {
        f.incident.activationSignals = ["other"];
      },
    ],
    [
      "actions",
      (f) => {
        f.incident.interventions = ["other"];
      },
    ],
    [
      "after",
      (f) => {
        f.incident.after = ["other"];
      },
    ],
    [
      "after",
      (f) => {
        f.incident.physicalDuringEvent = "yes";
      },
    ],
    [
      "regulation",
      (f) => {
        f.incident.endedBy = ["other"];
      },
    ],
  ])(
    "nie oznacza sekcji incydentu jako ukończonej, gdy brakuje wymaganego pola warunkowego: %s",
    (sectionId, selectOther) => {
      const form = createHomeForm();
      selectOther(form);

      const section = incidentSections.find((item) => item.id === sectionId);

    expect(section?.isComplete(form)).toBe(false);
  });

  it("does not validate removed summary fields or use them as the new stage descriptions", () => {
    const form = createHomeForm();
    fillRequiredMeta(form);
    fillMinimalIncident(form);
    form.incident.endedBy = ["other"];
    form.incident.recoverySupports = ["other"];
    form.incident.assessmentBasis = "Dawna ocena";
    form.incident.earlierWhat = "Dawny wniosek";
    expect(validateForm({ variant: "extended", mode: "incident", form }).fieldErrors).toEqual({});
    expect(form.incident.postEscalationNeeds).toBe("");
    expect(form.incident.earlyResponse).toBe("");
    expect(form.incident.assessmentBasis).toBe("Dawna ocena");
  });

  // ── Mapa środowiska ─────────────────────────────────────────────────────────

  it("requires map details after selecting another escalation context", () => {
    const form = createHomeForm();
    form.map.escalationContexts = ["other"];

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.escalationOther"]).toBe(MSG_OTHER);
  });

  it("requires dependency details when behavior-changing factors are selected", () => {
    const form = createHomeForm();
    form.map.dependsOn = ["halas"];

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.dependsDescription"]).toBe(
      "Skoro zaznaczono zależności, opisz na czym polega zmiana zachowania.",
    );
    expect(result.summary).toContain(
      "Zachowanie zmienia się w zależności od: Skoro zaznaczono zależności, opisz na czym polega zmiana zachowania.",
    );
  });

  it("requires a comparison when similar situations without escalation are reported", () => {
    const form = createHomeForm();
    form.map.similarWithoutEscalation = "yes";

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.comparisonDetails"]).toContain("bez eskalacji");
    expect(result.fieldErrors["map.noAggressionWhere"]).toBeUndefined();
  });

  it("requires map mandatory fields in map mode", () => {
    const result = validateForm({
      variant: "extended",
      mode: "map",
      form: createHomeForm(),
    });

    expect(result.fieldErrors["map.preferredPlaces"]).toBe(
      "Zaznacz przynajmniej jedną opcję: W jakich miejscach osoba najchętniej przebywa?.",
    );
    expect(result.fieldErrors["map.preferredObservations"]).toBe(
      "Uzupełnij pole: Co obserwujesz w tych miejscach i co mówi o nich osoba?.",
    );
    expect(result.fieldErrors["map.avoidedPlaces"]).toBe(
      "Zaznacz przynajmniej jedną opcję: Z jakich miejsc osoba unika lub wychodzi z trudem?.",
    );
    expect(result.fieldErrors["map.avoidedObservations"]).toBe(
      "Uzupełnij pole: Co obserwujesz w tych miejscach i co może utrudniać sytuację?.",
    );
    expect(result.fieldErrors["map.likes"]).toBe(
      "Uzupełnij pole: W jakie aktywności osoba najchętniej się angażuje?.",
    );
    expect(result.fieldErrors["map.easiestWhen"]).toBe(
      "Zaznacz przynajmniej jedną opcję: Osoba najłatwiej funkcjonuje, gdy:.",
    );
    expect(result.fieldErrors["map.chosenContact"]).toBe(
      "Uzupełnij pole: Osoba wybiera kontakt z — jak ten kontakt przebiega?.",
    );
    expect(result.fieldErrors["map.reducers"]).toBe(
      "Zaznacz przynajmniej jedną opcję: Co OBNIŻA napięcie (reguluje w momencie dyskomfortu)?.",
    );
    expect(result.fieldErrors["map.escalationContexts"]).toBe(
      "Zaznacz przynajmniej jedną opcję: Najczęstsze sytuacje eskalacji.",
    );
  });

  it("accepts map mode when mandatory map fields are filled", () => {
    const form = createHomeForm();
    fillMapForm(form);

    const result = validateForm({ variant: "extended", mode: "map", form });

    expect(result.fieldErrors["map.preferredPlaces"]).toBeUndefined();
    expect(result.fieldErrors["map.preferredObservations"]).toBeUndefined();
    expect(result.fieldErrors["map.escalationContexts"]).toBeUndefined();
  });
});
