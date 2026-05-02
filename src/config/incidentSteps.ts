import type { SituationForm } from "../types/form";
import { formLabels } from "./formLabels";
import { incidentSections } from "./incidentSections";

export interface IncidentStepDefinition {
  id: string;
  label: string;
  badge: string;
  errorKeys: string[];
  isComplete: (form: SituationForm) => boolean;
}

export const incidentStepDefinitions: IncidentStepDefinition[] = [
  {
    id: "meta",
    label: formLabels.meta.section,
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
    label: section.label,
    badge: section.badge,
    errorKeys: [section.errorKey],
    isComplete: section.isComplete
  }))
];
