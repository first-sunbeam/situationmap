import { hasSelectedOther, incidentSections, resolveIncidentSectionText } from "../config/incidentSections";
import { formLabels } from "../config/formLabels";
import type { ExtendedMode, FieldErrors, FormVariant, SituationForm, ValidationResult } from "../types/form";

function isBlank(value: string): boolean {
  return !String(value || "").trim();
}

function validateMapRequiredFields(form: SituationForm, fieldErrors: FieldErrors, summary: string[]) {
  const requiredTextFields: Array<[string, string, string]> = [
    ["map.preferred", formLabels.map.preferred, form.map.preferred],
    ["map.avoided", formLabels.map.avoided, form.map.avoided],
    ["map.likes", formLabels.map.likes, form.map.likes],
    ["map.easiestWhen", formLabels.map.easiestWhen, form.map.easiestWhen],
    ["map.cooperatesWith", formLabels.map.cooperatesWith, form.map.cooperatesWith],
    ["map.reducers", formLabels.map.reducers, form.map.reducers]
  ];

  if (!form.map.rows.some((row) => !isBlank(row.time) || !isBlank(row.activity))) {
    fieldErrors["map.rows"] = "Uzupełnij przynajmniej jeden wiersz miejsc i aktywności.";
    summary.push("Uzupełnij przynajmniej jeden wiersz miejsc i aktywności.");
  }

  for (const [key, label, value] of requiredTextFields) {
    if (isBlank(value)) {
      fieldErrors[key] = `Uzupełnij pole: ${label}.`;
      summary.push(`Uzupełnij pole „${label}”.`);
    }
  }

  if (!form.map.escalationContexts.length) {
    fieldErrors["map.escalationContexts"] = "Zaznacz przynajmniej jedną sytuację eskalacji.";
    summary.push("Zaznacz przynajmniej jedną sytuację eskalacji.");
  }
}

function requireOtherField({
  fieldErrors,
  summary,
  selected,
  value,
  fieldKey,
  sectionLabel
}: {
  fieldErrors: FieldErrors;
  summary: string[];
  selected: string[];
  value: string;
  fieldKey: string;
  sectionLabel: string;
}) {
  if (!hasSelectedOther(selected) || !isBlank(value)) return;

  const message = "Jeśli zaznaczono „Inne”, opisz tę odpowiedź.";
  fieldErrors[fieldKey] = message;
  summary.push(`${sectionLabel}: ${message}`);
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

  if (variant === "simple" && isBlank(form.simple.behavior)) {
    fieldErrors["simple.behavior"] = "Uzupełnij pole „Jaki był przebieg sytuacji i co można było zaobserwować?”.";
    summary.push("Formularz prosty: uzupełnij pole „Jaki był przebieg sytuacji i co można było zaobserwować?”.");
  }

  if (variant === "simple" && !String(form.simple.helped || "").trim()) {
    fieldErrors["simple.helped"] = "Uzupełnij pole „Co pomogło obniżyć napięcie lub wyregulować sytuację?” albo wpisz, że nic nie pomogło.";
    summary.push("Formularz prosty: uzupełnij pole „Co pomogło obniżyć napięcie lub wyregulować sytuację?”.");
  }

  if (variant === "simple" && isBlank(form.simple.notes)) {
    fieldErrors["simple.notes"] = "Uzupełnij pole „Na co dziecko/uczeń miało wpływ, a na co nie?”.";
    summary.push("Formularz prosty: uzupełnij pole „Na co dziecko/uczeń miało wpływ, a na co nie?”.");
  }

  if (variant === "extended" && mode !== "map") {
    for (const section of incidentSections) {
      if (!section.isComplete(form)) {
        fieldErrors[section.errorKey] = resolveIncidentSectionText(section.message, form);
        summary.push(resolveIncidentSectionText(section.summary, form));
      }
    }

    if (form.incident.slept === "Tak" && isBlank(form.incident.sleepDetails)) {
      const message = "Skoro zaznaczono sen / odpoczynek w ciągu dnia, podaj o której i jak długo.";
      fieldErrors["incident.sleepDetails"] = message;
      summary.push(`${formLabels.incident.baselineSection}: ${message}`);
    }

    requireOtherField({ fieldErrors, summary, selected: form.incident.burdens, value: form.incident.burdensOther, fieldKey: "incident.burdensOther", sectionLabel: formLabels.incident.baselineSection });
    requireOtherField({ fieldErrors, summary, selected: form.incident.expectations, value: form.incident.expectationOther, fieldKey: "incident.expectationOther", sectionLabel: formLabels.incident.expectationsSection });

    if (isBlank(form.incident.influence)) {
      const message = "Uzupełnij pole „Na co dziecko/uczeń miało wpływ, a na co nie?”.";
      fieldErrors["incident.influence"] = message;
      summary.push(`${formLabels.incident.expectationsSection}: ${message}`);
    }
    if (form.incident.signalsAppeared === "Tak" && isBlank(form.incident.timeToEscalation)) {
      const message = "Skoro pojawiły się sygnały, podaj ile czasu przed eskalacją.";
      fieldErrors["incident.timeToEscalation"] = message;
      summary.push(`${formLabels.incident.signalsSection}: ${message}`);
    }

    requireOtherField({ fieldErrors, summary, selected: form.incident.signals, value: form.incident.signalsOther, fieldKey: "incident.signalsOther", sectionLabel: formLabels.incident.signalsSection });
    requireOtherField({ fieldErrors, summary, selected: form.incident.interventions, value: form.incident.interventionDetails, fieldKey: "incident.interventionDetails", sectionLabel: formLabels.incident.actionsSection });

    if (form.incident.physicalThisWeek === "Tak" && isBlank(form.incident.physicalCount)) {
      const message = "Skoro zaznaczono interwencję fizyczną w tym tygodniu, podaj ile razy.";
      fieldErrors["incident.physicalCount"] = message;
      summary.push(`${formLabels.incident.afterSection}: ${message}`);
    }

    requireOtherField({ fieldErrors, summary, selected: form.incident.after, value: form.incident.afterOther, fieldKey: "incident.afterOther", sectionLabel: formLabels.incident.afterSection });
    requireOtherField({ fieldErrors, summary, selected: form.incident.endedBy, value: form.incident.endedByOther, fieldKey: "incident.endedByOther", sectionLabel: formLabels.incident.regulationSection });

    if (fieldErrors["incident.beforeSection"]) {
      fieldErrors["incident.factDescription"] = fieldErrors["incident.beforeSection"];
    }
  }

  if (variant === "extended" && mode !== "incident") {
    validateMapRequiredFields(form, fieldErrors, summary);

    if (form.map.dependsOn.length && isBlank(form.map.dependsDescription)) {
      const message = "Skoro zaznaczono zależności, opisz na czym polega zmiana zachowania.";
      fieldErrors["map.dependsDescription"] = message;
      summary.push(`${formLabels.map.dependsOn}: ${message}`);
    }

    requireOtherField({ fieldErrors, summary, selected: form.map.escalationContexts, value: form.map.escalationOther, fieldKey: "map.escalationOther", sectionLabel: formLabels.map.escalationContexts });

    if (form.map.noAggression === "Tak" && isBlank(form.map.noAggressionWhere)) {
      const message = "Skoro są sytuacje bez agresji, opisz jakie.";
      fieldErrors["map.noAggressionWhere"] = message;
      summary.push(`${formLabels.map.noAggression}: ${message}`);
    }
  }

  return { fieldErrors, summary };
}
