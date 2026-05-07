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
  return !hasSelectedOther(selected) || String(value || "").trim() !== "";
}

export function hasRequiredSleepDetails(slept: string, sleepDetails: string): boolean {
  return slept !== "Tak" || String(sleepDetails || "").trim() !== "";
}

export function hasRequiredTimeToEscalation(signalsAppeared: string, timeToEscalation: string): boolean {
  return signalsAppeared !== "Tak" || String(timeToEscalation || "").trim() !== "";
}

export function hasRequiredPhysicalCount(physicalThisWeek: string, physicalCount: string): boolean {
  return physicalThisWeek !== "Tak" || String(physicalCount || "").trim() !== "";
}

function hasRequiredText(value: string): boolean {
  return String(value || "").trim() !== "";
}

export const incidentSections: IncidentSectionDefinition[] = [
  {
    id: "baseline",
    label: formLabels.incident.baselineSection,
    badge: "0",
    errorKey: "incident.baselineSection",
    extraErrorKeys: ["incident.sleepDetails", "incident.burdensOther"],
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
      form.incident.burdensOther
    ]) && hasRequiredSleepDetails(form.incident.slept, form.incident.sleepDetails) && hasRequiredOtherValue(form.incident.burdens, form.incident.burdensOther)
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
      form.incident.expectationOther
    ]) && hasRequiredText(form.incident.influence) && hasRequiredOtherValue(form.incident.expectations, form.incident.expectationOther)
  },
  {
    id: "signals",
    label: formLabels.incident.signalsSection,
    badge: "3",
    errorKey: "incident.signalsSection",
    extraErrorKeys: ["incident.signalsOther", "incident.timeToEscalation"],
    summary: (form) => form.incident.signalsAppeared === "Tak"
      ? "Pierwsze oznaki narastającego napięcia: skoro sygnały się pojawiły, wskaż jakie."
      : "Pierwsze oznaki narastającego napięcia: uzupełnij przynajmniej jedno pole.",
    message: (form) => form.incident.signalsAppeared === "Tak"
      ? "Skoro sygnały się pojawiły, wskaż jakie."
      : "Uzupełnij przynajmniej jedno pole w tej sekcji.",
    isComplete: (form) => (form.incident.signalsAppeared === "Tak"
      ? hasAnyValue([form.incident.signals, form.incident.signalsOther]) && hasRequiredTimeToEscalation(form.incident.signalsAppeared, form.incident.timeToEscalation)
      : hasAnyValue([
        form.incident.signalsAppeared,
        form.incident.signals,
        form.incident.signalsOther,
        form.incident.timeToEscalation,
        form.incident.firstSignal,
        form.incident.predicts
      ])) && hasRequiredOtherValue(form.incident.signals, form.incident.signalsOther)
  },
  {
    id: "actions",
    label: formLabels.incident.actionsSection,
    badge: "3A",
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
      form.incident.escalationDuration,
      form.incident.harms
    ])
  },
  {
    id: "after",
    label: formLabels.incident.afterSection,
    badge: "6",
    errorKey: "incident.afterSection",
    extraErrorKeys: ["incident.afterOther", "incident.physicalCount"],
    summary: "Po zdarzeniu: uzupełnij przynajmniej jedno pole.",
    message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
    isComplete: (form) => hasAnyValue([
      form.incident.after,
      form.incident.afterOther,
      form.incident.calmTime,
      form.incident.physicalThisWeek,
      form.incident.physicalCount,
      form.incident.lowerThreshold,
      form.incident.physicalNote
    ]) && hasRequiredPhysicalCount(form.incident.physicalThisWeek, form.incident.physicalCount) && hasRequiredOtherValue(form.incident.after, form.incident.afterOther)
  },
  {
    id: "regulation",
    label: formLabels.incident.regulationSection,
    badge: "7-9",
    errorKey: "incident.regulationSection",
    extraErrorKeys: ["incident.endedByOther"],
    summary: "Regulacja i wpływ: zaznacz, co najbardziej pomogło zakończyć eskalację.",
    message: "Zaznacz, co najbardziej pomogło zakończyć eskalację.",
    isComplete: (form) => hasAnyValue([
      form.incident.endedBy,
      form.incident.endedByOther
    ]) && hasRequiredOtherValue(form.incident.endedBy, form.incident.endedByOther)
  }
];
