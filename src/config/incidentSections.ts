import type { SituationForm } from "../types/form";
import { formLabels } from "./formLabels";

type FormValue = string | string[];

export interface IncidentSectionDefinition {
  id: string;
  label: string;
  badge: string;
  errorKey: string;
  extraErrorKeys?: string[];
  summary: string | ((form: SituationForm) => string);
  message: string | ((form: SituationForm) => string);
  isComplete: (form: SituationForm) => boolean;
}

export function hasAnyValue(values: FormValue[]): boolean {
  return values.some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return String(value || "").trim() !== "";
  });
}

export function resolveIncidentSectionText(value: string | ((form: SituationForm) => string), form: SituationForm): string {
  return typeof value === "function" ? value(form) : value;
}

export function hasSelectedOther(values: string[]): boolean {
  return values.some((value) => value.toLowerCase() === "inne");
}

export function hasRequiredOtherValue(selected: string[], value: string): boolean {
  return !hasSelectedOther(selected) || hasRequiredText(value);
}

export function hasRequiredOtherValues(...requirements: Array<[selected: string[], value: string]>): boolean {
  return requirements.every(([selected, value]) => hasRequiredOtherValue(selected, value));
}

function hasRequiredText(value: string): boolean {
  return String(value || "").trim() !== "";
}

export function hasRequiredSleepDetails(slept: string, sleepDetails: string): boolean {
  return slept !== "Tak" || hasRequiredText(sleepDetails);
}

export function hasRequiredTimeToEscalation(signalsAppeared: string, timeToEscalation: string): boolean {
  return signalsAppeared !== "Tak" || hasRequiredText(timeToEscalation);
}

export function hasRequiredPhysicalCount(physicalThisWeek: string, physicalCount: string): boolean {
  return physicalThisWeek !== "Tak" || hasRequiredText(physicalCount);
}

function hasRequiredBaselineOtherValues(form: SituationForm): boolean {
  return hasRequiredOtherValues(
    [form.incident.burdens, form.incident.burdensOther],
    [form.incident.bodyState, form.incident.bodyStateOther],
    [form.incident.sensoryIntensity, form.incident.sensoryIntensityOther]
  );
}

function hasSignalTypeValue(form: SituationForm): boolean {
  return hasAnyValue([
    form.incident.activationSignals,
    form.incident.activationSignalsOther,
    form.incident.shutdownSignals,
    form.incident.shutdownSignalsOther,
    form.incident.sensorySignals,
    form.incident.sensorySignalsOther
  ]);
}

function hasAnySignalsSectionValue(form: SituationForm): boolean {
  return hasAnyValue([
    form.incident.signalsAppeared,
    form.incident.activationSignals,
    form.incident.activationSignalsOther,
    form.incident.shutdownSignals,
    form.incident.shutdownSignalsOther,
    form.incident.sensorySignals,
    form.incident.sensorySignalsOther,
    form.incident.timeToEscalation,
    form.incident.firstSignal,
    form.incident.predicts
  ]);
}

function hasRequiredSignalOtherValues(form: SituationForm): boolean {
  return hasRequiredOtherValues(
    [form.incident.activationSignals, form.incident.activationSignalsOther],
    [form.incident.shutdownSignals, form.incident.shutdownSignalsOther],
    [form.incident.sensorySignals, form.incident.sensorySignalsOther]
  );
}

function isSignalsSectionComplete(form: SituationForm): boolean {
  const hasRequiredSignalDetails = form.incident.signalsAppeared !== "Tak"
    ? hasAnySignalsSectionValue(form)
    : hasSignalTypeValue(form) && hasRequiredTimeToEscalation(form.incident.signalsAppeared, form.incident.timeToEscalation);

  return hasRequiredSignalDetails && hasRequiredSignalOtherValues(form);
}

function isMaskingSectionComplete(form: SituationForm): boolean {
  if (form.incident.maskingContinued !== "Tak") return true;

  return hasAnyValue([
    form.incident.maskingStrategies,
    form.incident.maskingStrategiesOther,
    form.incident.maskingDuration
  ]) && hasRequiredOtherValue(form.incident.maskingStrategies, form.incident.maskingStrategiesOther);
}

export const incidentSections: IncidentSectionDefinition[] = [
  {
    id: "baseline",
    label: formLabels.incident.baselineSection,
    badge: "0",
    errorKey: "incident.baselineSection",
    extraErrorKeys: ["incident.sleepDetails", "incident.burdensOther", "incident.bodyStateOther", "incident.sensoryIntensityOther"],
    summary: "Poziom bazowy i kontekst dnia: uzupełnij przynajmniej jedno pole.",
    message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
    isComplete: (form) => hasAnyValue([
      form.incident.tension,
      form.incident.tired,
      form.incident.slept,
      form.incident.sleepDetails,
      form.incident.stayStage,
      form.incident.stayStageLoad,
      form.incident.burdens,
      form.incident.burdensOther,
      form.incident.bodyState,
      form.incident.bodyStateOther,
      form.incident.sensoryIntensity,
      form.incident.sensoryIntensityOther
    ]) && hasRequiredSleepDetails(form.incident.slept, form.incident.sleepDetails) && hasRequiredBaselineOtherValues(form)
  },
  {
    id: "before",
    label: formLabels.incident.beforeSection,
    badge: "1",
    errorKey: "incident.beforeSection",
    summary: "Bezpośrednio przed zdarzeniem: zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.",
    message: "Zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.",
    isComplete: (form) => hasAnyValue([
      form.incident.antecedents,
      form.incident.factDescription
    ])
  },
  {
    id: "expectations",
    label: formLabels.incident.expectationsSection,
    badge: "2",
    errorKey: "incident.expectationsSection",
    extraErrorKeys: ["incident.expectationOther", "incident.influence"],
    summary: "Czego oczekiwano w tym momencie: uzupełnij oczekiwania oraz pole wpływu osoby.",
    message: "Zaznacz przynajmniej jedną opcję albo wpisz własną odpowiedź oraz uzupełnij pole wpływu osoby.",
    isComplete: (form) => hasAnyValue([
      form.incident.expectations,
      form.incident.expectationOther,
      form.incident.predictabilityWhat,
      form.incident.predictabilityDuration,
      form.incident.predictabilityChoice
    ]) && hasRequiredText(form.incident.influence) && hasRequiredOtherValue(form.incident.expectations, form.incident.expectationOther)
  },
  {
    id: "signals",
    label: formLabels.incident.signalsSection,
    badge: "3",
    errorKey: "incident.signalsSection",
    extraErrorKeys: ["incident.activationSignalsOther", "incident.shutdownSignalsOther", "incident.sensorySignalsOther", "incident.timeToEscalation"],
    summary: (form) => form.incident.signalsAppeared === "Tak"
      ? "Pierwsze oznaki narastającego napięcia: skoro sygnały się pojawiły, wskaż jakie."
      : "Pierwsze oznaki narastającego napięcia: uzupełnij przynajmniej jedno pole.",
    message: (form) => form.incident.signalsAppeared === "Tak"
      ? "Skoro sygnały się pojawiły, wskaż jakie."
      : "Uzupełnij przynajmniej jedno pole w tej sekcji.",
    isComplete: isSignalsSectionComplete
  },
  {
    id: "masking",
    label: formLabels.incident.maskingSection,
    badge: "3B",
    errorKey: "incident.maskingSection",
    extraErrorKeys: ["incident.maskingStrategiesOther"],
    summary: "Strategie kompensacyjne i maskowanie: uzupełnij przynajmniej jedno pole albo przejdź dalej, jeśli nie dotyczy.",
    message: "Uzupełnij przynajmniej jedno pole w tej sekcji albo przejdź dalej, jeśli nie dotyczy.",
    isComplete: isMaskingSectionComplete
  },
  {
    id: "actions",
    label: formLabels.incident.actionsSection,
    badge: "4",
    errorKey: "incident.actionsSection",
    extraErrorKeys: ["incident.interventionDetails"],
    summary: "Działania: uzupełnij przynajmniej jedno pole.",
    message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
    isComplete: (form) => hasAnyValue([
      form.incident.phase,
      form.incident.interventions,
      form.incident.interventionDetails,
      form.incident.unconditional,
      form.incident.usedRegulator,
      form.incident.reducedTension,
      form.incident.earlierWhat
    ]) && hasRequiredOtherValue(form.incident.interventions, form.incident.interventionDetails)
  },
  {
    id: "behavior",
    label: formLabels.incident.behaviorSection,
    badge: "5",
    errorKey: "incident.behaviorSection",
    summary: "Opis zachowania: uzupełnij przynajmniej jedno pole.",
    message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
    isComplete: (form) => hasAnyValue([
      form.incident.behavior,
      form.incident.intensity,
      form.incident.harms
    ])
  },
  {
    id: "regulation",
    label: formLabels.incident.regulationSection,
    badge: "6",
    errorKey: "incident.regulationSection",
    extraErrorKeys: ["incident.endedByOther", "incident.recoverySupportsOther"],
    summary: "Regulacja i wpływ: zaznacz, co najbardziej pomogło zakończyć eskalację.",
    message: "Zaznacz, co najbardziej pomogło zakończyć eskalację.",
    isComplete: (form) => hasAnyValue([
      form.incident.escalationDuration,
      form.incident.endedBy,
      form.incident.endedByOther,
      form.incident.calmTime,
      form.incident.cognitiveRecoveryTime,
      form.incident.recoverySupports,
      form.incident.recoverySupportsOther
    ]) && hasRequiredOtherValues(
      [form.incident.endedBy, form.incident.endedByOther],
      [form.incident.recoverySupports, form.incident.recoverySupportsOther]
    )
  },
  {
    id: "after",
    label: formLabels.incident.afterSection,
    badge: "7",
    errorKey: "incident.afterSection",
    extraErrorKeys: ["incident.afterOther", "incident.physicalCount"],
    summary: "Po zdarzeniu: uzupełnij przynajmniej jedno pole.",
    message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
    isComplete: (form) => hasAnyValue([
      form.incident.after,
      form.incident.afterOther,
      form.incident.physicalThisWeek,
      form.incident.physicalCount,
      form.incident.lowerThreshold,
      form.incident.physicalNote
    ]) && hasRequiredPhysicalCount(form.incident.physicalThisWeek, form.incident.physicalCount) && hasRequiredOtherValue(form.incident.after, form.incident.afterOther)
  }
];
