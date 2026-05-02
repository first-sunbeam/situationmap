import { incidentSections, resolveIncidentSectionText } from "../config/incidentSections";
import type { EnvironmentMapFormData, ExtendedMode, FieldErrors, FormVariant, SituationForm, ValidationResult } from "../types/form";

function hasMapContent(map: EnvironmentMapFormData): boolean {
  return map.rows.some((row) => row.time || row.activity)
    || [
      map.preferred,
      map.avoided,
      map.likes,
      map.easiestWhen,
      map.cooperatesWith,
      map.reducers,
      map.dependsDescription,
      map.escalationOther,
      map.noAggression,
      map.noAggressionWhere
    ].some((value) => String(value || "").trim())
    || map.dependsOn.length > 0
    || map.escalationContexts.length > 0;
}

export function validateForm({ variant, mode, form }: { variant: FormVariant; mode: ExtendedMode; form: SituationForm }): ValidationResult {
  const fieldErrors: FieldErrors = {};
  const summary: string[] = [];
  const meta: Array<[string, string, string]> = [
    ["meta.date", "Data", form.meta.date],
    ["meta.time", "Godzina", form.meta.time],
    ["meta.place", "Miejsce", form.meta.place],
    ["meta.lead", "Osoba prowadząca", form.meta.lead]
  ];

  if (variant === "simple" || mode !== "map") {
    for (const [key, label, value] of meta) {
      if (!String(value || "").trim()) {
        const message = `Uzupełnij pole: ${label}.`;
        fieldErrors[key] = message;
        summary.push(`Dane podstawowe: uzupełnij pole ${label.toLowerCase()}.`);
      }
    }
  }

  if (variant === "simple" && !String(form.simple.factDescription || "").trim()) {
    fieldErrors["simple.factDescription"] = "Uzupełnij krótki opis sytuacji.";
    summary.push("Formularz prosty: uzupełnij krótki opis sytuacji.");
  }

  if (variant === "simple" && !String(form.simple.helped || "").trim()) {
    fieldErrors["simple.helped"] = "Uzupełnij pole „Co pomogło obniżyć napięcie lub uspokoić sytuację?” albo wpisz, że nic nie pomogło.";
    summary.push("Formularz prosty: uzupełnij pole „Co pomogło obniżyć napięcie lub uspokoić sytuację?”.");
  }

  if (variant === "extended" && mode !== "map") {
    for (const section of incidentSections) {
      if (!section.isComplete(form)) {
        fieldErrors[section.errorKey] = resolveIncidentSectionText(section.message, form);
        summary.push(resolveIncidentSectionText(section.summary, form));
      }
    }

    if (fieldErrors["incident.beforeSection"]) {
      fieldErrors["incident.factDescription"] = fieldErrors["incident.beforeSection"];
    }
  }

  if (variant === "extended" && mode !== "incident" && !hasMapContent(form.map)) {
    fieldErrors.map = "Uzupełnij przynajmniej jedno pole w mapie środowiska.";
    summary.push("Uzupełnij przynajmniej jedno pole w mapie środowiska.");
  }

  return { fieldErrors, summary };
}
