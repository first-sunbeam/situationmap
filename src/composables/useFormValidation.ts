import { getIncidentSectionTexts, hasSelectedOther, incidentSections } from "../config/incidentSections";
import { formLabels, type FormLabels } from "../config/formLabels";
import { getSubjectInline } from "../lib/subject";
import type { ExtendedMode, FieldErrors, FormVariant, SituationForm, ValidationResult } from "../types/form";

function isBlank(value: string): boolean {
  return !String(value || "").trim();
}

function validateMapRequiredFields(form: SituationForm, fieldErrors: FieldErrors, summary: string[], labels: FormLabels) {
  const subject = getSubjectInline(form, labels.map.section === "Environment map" ? "the person" : "osoba");
  const subjectStart = getSubjectInline(form, labels.map.section === "Environment map" ? "The person" : "Osoba");
  const requiredTextFields: Array<[string, string, string]> = [
    ["map.preferredReason", labels.ui.preferredReason, form.map.preferredReason],
    ["map.avoidedReason", labels.ui.avoidedReason, form.map.avoidedReason],
    ["map.likes", `${labels.ui.likesFor} ${subject} ${labels.ui.likesSuffix}`, form.map.likes],
    ["map.cooperatesWith", `${subjectStart} ${labels.ui.cooperatesWithSuffix}`, form.map.cooperatesWith]
  ];

  const requiredChoiceFields: Array<[string, string, string[]]> = [
    ["map.preferredPlaces", `${labels.ui.preferredPlacesFor} ${subject} ${labels.ui.preferredPlacesSuffix}`, form.map.preferredPlaces],
    ["map.avoidedPlaces", `${labels.ui.avoidedPlacesFor} ${subject} ${labels.ui.avoidedPlacesSuffix}`, form.map.avoidedPlaces],
    ["map.easiestWhen", `${subjectStart} ${labels.ui.easiestWhenSuffix}`, form.map.easiestWhen],
    ["map.reducers", labels.ui.reducersLabel, form.map.reducers],
    ["map.escalationContexts", labels.map.escalationContexts, form.map.escalationContexts]
  ];

  for (const [key, label, value] of requiredTextFields) {
    if (isBlank(value)) {
      fieldErrors[key] = `${labels.validation.requiredField}: ${label}.`;
      summary.push(`${labels.validation.requiredField} „${label}”.`);
    }
  }

  for (const [key, label, selected] of requiredChoiceFields) {
    if (!selected.length) {
      fieldErrors[key] = `${labels.validation.chooseAtLeastOne}: ${label}.`;
      summary.push(`${labels.validation.chooseAtLeastOne} „${label}”.`);
    }
  }
}

function requireOtherField({
  fieldErrors,
  summary,
  selected,
  value,
  fieldKey,
  sectionLabel,
  labels
}: {
  fieldErrors: FieldErrors;
  summary: string[];
  selected: string[];
  value: string;
  fieldKey: string;
  sectionLabel: string;
  labels: FormLabels;
}) {
  if (!hasSelectedOther(selected) || !isBlank(value)) return;

  const message = labels.validation.otherRequired;
  fieldErrors[fieldKey] = message;
  summary.push(`${sectionLabel}: ${message}`);
}

export function validateForm({ variant, mode, form, labels = formLabels }: { variant: FormVariant; mode: ExtendedMode; form: SituationForm; labels?: FormLabels }): ValidationResult {
  const fieldErrors: FieldErrors = {};
  const summary: string[] = [];
  const subject = getSubjectInline(form, labels.map.section === "Environment map" ? "the person" : "osoby");
  const meta: Array<[string, string, string]> = [
    ["meta.date", labels.meta.date, form.meta.date],
    ["meta.time", labels.meta.time, form.meta.time],
    ["meta.place", labels.meta.place, form.meta.place],
    ["meta.lead", labels.meta.lead, form.meta.lead]
  ];

  if (variant === "simple" || mode !== "map") {
    for (const [key, label, value] of meta) {
      if (!String(value || "").trim()) {
        const message = `${labels.validation.requiredField}: ${label}.`;
        fieldErrors[key] = message;
        summary.push(`${labels.validation.basicInfoRequired} ${label.toLowerCase()}.`);
      }
    }
  }

  if (variant === "simple" && isBlank(form.simple.behavior)) {
    fieldErrors["simple.behavior"] = `${labels.validation.requiredField} „${labels.simple.behavior}”.`;
    summary.push(`${labels.validation.simpleForm}: ${labels.validation.requiredField.toLowerCase()} „${labels.simple.behavior}”.`);
  }

  if (variant === "simple" && !String(form.simple.helped || "").trim()) {
    fieldErrors["simple.helped"] = `${labels.validation.requiredField} „${labels.simple.helped}” ${labels.validation.simpleHelpedRequiredSuffix}`;
    summary.push(`${labels.validation.simpleForm}: ${labels.validation.requiredField.toLowerCase()} „${labels.simple.helped}”.`);
  }

  if (variant === "simple" && isBlank(form.simple.notes)) {
    fieldErrors["simple.notes"] = `${labels.validation.requiredField} „${labels.ui.decisionPossibilityFor} ${subject}”.`;
    summary.push(`${labels.validation.simpleForm}: ${labels.validation.requiredField.toLowerCase()} „${labels.ui.decisionPossibilityFor} ${subject}”.`);
  }

  if (variant === "extended" && mode !== "map") {
    for (const section of incidentSections) {
      if (!section.isComplete(form)) {
        const texts = getIncidentSectionTexts(section, form, labels);
        fieldErrors[section.errorKey] = texts.message;
        summary.push(texts.summary);
      }
    }

    if (form.incident.slept === "yes" && isBlank(form.incident.sleepDetails)) {
      const message = labels.validation.sleepDetailsRequired;
      fieldErrors["incident.sleepDetails"] = message;
      summary.push(`${labels.incident.baselineSection}: ${message}`);
    }

    requireOtherField({ fieldErrors, summary, selected: form.incident.burdens, value: form.incident.burdensOther, fieldKey: "incident.burdensOther", sectionLabel: labels.incident.baselineSection, labels });
    requireOtherField({ fieldErrors, summary, selected: form.incident.bodyState, value: form.incident.bodyStateOther, fieldKey: "incident.bodyStateOther", sectionLabel: labels.incident.baselineSection, labels });
    requireOtherField({ fieldErrors, summary, selected: form.incident.sensoryIntensity, value: form.incident.sensoryIntensityOther, fieldKey: "incident.sensoryIntensityOther", sectionLabel: labels.incident.baselineSection, labels });
    requireOtherField({ fieldErrors, summary, selected: form.incident.expectations, value: form.incident.expectationOther, fieldKey: "incident.expectationOther", sectionLabel: labels.incident.expectationsSection, labels });

    if (isBlank(form.incident.influence)) {
      const message = `${labels.validation.requiredField} „${labels.ui.influenceFor} ${subject}?”.`;
      fieldErrors["incident.influence"] = message;
      summary.push(`${labels.incident.expectationsSection}: ${message}`);
    }
    if (form.incident.signalsAppeared === "yes" && isBlank(form.incident.timeToEscalation)) {
      const message = labels.validation.signalsTimeRequired;
      fieldErrors["incident.timeToEscalation"] = message;
      summary.push(`${labels.incident.signalsSection}: ${message}`);
    }

    requireOtherField({ fieldErrors, summary, selected: form.incident.activationSignals, value: form.incident.activationSignalsOther, fieldKey: "incident.activationSignalsOther", sectionLabel: labels.incident.signalsSection, labels });
    requireOtherField({ fieldErrors, summary, selected: form.incident.shutdownSignals, value: form.incident.shutdownSignalsOther, fieldKey: "incident.shutdownSignalsOther", sectionLabel: labels.incident.signalsSection, labels });
    requireOtherField({ fieldErrors, summary, selected: form.incident.sensorySignals, value: form.incident.sensorySignalsOther, fieldKey: "incident.sensorySignalsOther", sectionLabel: labels.incident.signalsSection, labels });
    requireOtherField({ fieldErrors, summary, selected: form.incident.maskingStrategies, value: form.incident.maskingStrategiesOther, fieldKey: "incident.maskingStrategiesOther", sectionLabel: labels.incident.maskingSection, labels });
    requireOtherField({ fieldErrors, summary, selected: form.incident.interventions, value: form.incident.interventionDetails, fieldKey: "incident.interventionDetails", sectionLabel: labels.incident.actionsSection, labels });

    if (form.incident.physicalThisWeek === "yes" && isBlank(form.incident.physicalCount)) {
      const message = labels.validation.physicalCountRequired;
      fieldErrors["incident.physicalCount"] = message;
      summary.push(`${labels.incident.afterSection}: ${message}`);
    }

    requireOtherField({ fieldErrors, summary, selected: form.incident.after, value: form.incident.afterOther, fieldKey: "incident.afterOther", sectionLabel: labels.incident.afterSection, labels });
    requireOtherField({ fieldErrors, summary, selected: form.incident.endedBy, value: form.incident.endedByOther, fieldKey: "incident.endedByOther", sectionLabel: labels.incident.regulationSection, labels });
    requireOtherField({ fieldErrors, summary, selected: form.incident.recoverySupports, value: form.incident.recoverySupportsOther, fieldKey: "incident.recoverySupportsOther", sectionLabel: labels.incident.regulationSection, labels });

    if (fieldErrors["incident.beforeSection"]) {
      fieldErrors["incident.factDescription"] = fieldErrors["incident.beforeSection"];
    }
  }

  if (variant === "extended" && mode !== "incident") {
    validateMapRequiredFields(form, fieldErrors, summary, labels);

    if (form.map.dependsOn.length && isBlank(form.map.dependsDescription)) {
      const message = labels.validation.dependenciesRequired;
      fieldErrors["map.dependsDescription"] = message;
      summary.push(`${labels.map.dependsOn}: ${message}`);
    }

    const subject = getSubjectInline(form, "osoba");
    requireOtherField({ fieldErrors, summary, selected: form.map.preferredPlaces, value: form.map.preferredPlacesOther, fieldKey: "map.preferredPlacesOther", sectionLabel: `${labels.ui.preferredPlacesFor} ${subject} ${labels.ui.preferredPlacesSuffix}`, labels });
    requireOtherField({ fieldErrors, summary, selected: form.map.avoidedPlaces, value: form.map.avoidedPlacesOther, fieldKey: "map.avoidedPlacesOther", sectionLabel: `${labels.ui.avoidedPlacesFor} ${subject} ${labels.ui.avoidedPlacesSuffix}`, labels });
    requireOtherField({ fieldErrors, summary, selected: form.map.escalationContexts, value: form.map.escalationOther, fieldKey: "map.escalationOther", sectionLabel: labels.map.escalationContexts, labels });
    requireOtherField({ fieldErrors, summary, selected: form.map.escalationReducers, value: form.map.escalationReducersOther, fieldKey: "map.escalationReducersOther", sectionLabel: labels.ui.escalationReducersLabel, labels });

    if (form.map.noAggression === "yes" && isBlank(form.map.noAggressionWhere)) {
      const message = labels.validation.noAggressionRequired;
      fieldErrors["map.noAggressionWhere"] = message;
      summary.push(`${labels.map.noAggression}: ${message}`);
    }
  }

  return { fieldErrors, summary };
}
