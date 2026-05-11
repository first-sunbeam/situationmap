import type { SituationForm } from "../types/form";
import { formLabels, type FormLabels } from "./formLabels";
import { incidentSections } from "./incidentSections";

export interface IncidentStepDefinition {
  id: string;
  label: string;
  badge: string;
  errorKeys: string[];
  isComplete: (form: SituationForm) => boolean;
}

const incidentSectionLabelById: Record<string, keyof FormLabels["incident"]> = {
  baseline: "baselineSection",
  before: "beforeSection",
  expectations: "expectationsSection",
  signals: "signalsSection",
  masking: "maskingSection",
  actions: "actionsSection",
  behavior: "behaviorSection",
  regulation: "regulationSection",
  after: "afterSection"
};

export function getIncidentStepDefinitions(labels: FormLabels = formLabels): IncidentStepDefinition[] {
  return [
    {
      id: "meta",
      label: labels.meta.section,
      badge: "M",
      errorKeys: ["meta.date", "meta.time", "meta.place", "meta.lead"],
      isComplete: (form) => [
        form.meta.date,
        form.meta.time,
        form.meta.place,
        form.meta.lead
      ].every((value) => String(value || "").trim())
    },
    ...incidentSections.map((section) => ({
      id: section.id,
      label: labels.incident[incidentSectionLabelById[section.id]] || section.label,
      badge: section.badge,
      errorKeys: [section.errorKey, ...(section.extraErrorKeys || [])],
      isComplete: section.isComplete
    }))
  ];
}

export const incidentStepDefinitions: IncidentStepDefinition[] = getIncidentStepDefinitions();
