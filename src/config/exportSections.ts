import type { LanguageCode } from "../i18n/useLanguage";
import { getSubjectInline } from "../lib/subject";
import type { EnvironmentConfig, SituationForm } from "../types/form";
import { formLabels, type FormLabels } from "./formLabels";
import { getMonitoringRevision } from "./monitoringRevision";
import { formatInformationSources, stageSourceTypeFields } from "./sourceOptions";

export type ExportValue = string | string[];
export type ExportLabel = string | ((env: EnvironmentConfig, form: SituationForm) => string);
export interface ExportRow {
  label: ExportLabel;
  hint?: string;
  value: (env: EnvironmentConfig, form: SituationForm) => ExportValue;
  shouldInclude?: (env: EnvironmentConfig, form: SituationForm) => boolean;
}
export interface ExportSection { title: string; rows: ExportRow[]; note?: string }

function withOther(values: string[], other: string): string[] { return other ? [...values, other] : values; }
function incidentRow(label: string, key: keyof SituationForm["incident"], hint?: string): ExportRow {
  return { label, hint, value: (_env, form) => form.incident[key] };
}
function mapRow(label: ExportLabel, key: keyof SituationForm["map"], other?: keyof SituationForm["map"]): ExportRow {
  return { label, value: (_env, form) => {
    const value = form.map[key];
    return other && Array.isArray(value) ? withOther(value, String(form.map[other])) : value;
  } };
}
function subjectLabel(template: string, language: LanguageCode, grammaticalCase: "nominative" | "genitive" = "nominative"): ExportLabel {
  const fallback = language === "pl" ? grammaticalCase === "genitive" ? "osoby" : "osoba" : "the person";
  return (_env, form) => template.replaceAll("{subject}", getSubjectInline(form, fallback));
}
function stageRows(scope: "simple" | "incident", stage: "earlyResponse" | "escalationCourse" | "postEscalationNeeds", sourceKey: "earlyResponseSources" | "escalationSources" | "postEscalationSources", language: LanguageCode, observations: ExportRow[] = []): ExportRow[] {
  const revision = getMonitoringRevision(language);
  return [
    { label: `${revision.stageSources} — ${revision.stageNames[stage]}`, value: (_env, form) => formatInformationSources(form[scope][stageSourceTypeFields[stage]], language) },
    { label: `${revision.sourceDetails} — ${revision.stageNames[stage]}`, value: (_env, form) => form[scope][sourceKey] },
    ...observations,
    { label: revision[stage], hint: revision.stageHint, value: (_env, form) => form[scope][stage] },
  ];
}
function labelsLanguage(labels: FormLabels): LanguageCode { return labels.meta.section === "Basic information" ? "en" : "pl"; }
export function resolveExportLabel(label: ExportLabel, env: EnvironmentConfig, form: SituationForm): string {
  return typeof label === "function" ? label(env, form) : label;
}
export function getMetaExportSection(env: EnvironmentConfig, labels: FormLabels = formLabels): ExportSection {
  const revision = getMonitoringRevision(labelsLanguage(labels));
  const lead = env.label === "Dom" ? labels.environments.home.lead : env.label === "Placówka całodobowa" ? labels.environments.center.lead : labels.environments.school.lead;
  return { title: labels.meta.section, rows: [
    { label: labels.meta.date, value: (_env, form) => form.meta.date },
    { label: labels.meta.time, value: (_env, form) => form.meta.time },
    { label: labels.meta.place, value: (_env, form) => form.meta.place },
    { label: labels.meta.initials, value: (_env, form) => form.meta.initials },
    { label: lead, value: (_env, form) => form.meta.lead },
    { label: labels.meta.present, value: (_env, form) => form.meta.present },
    { label: revision.observationFrom, value: (_env, form) => form.meta.observationFrom },
  ] };
}
export function getSimpleExportSection(labels: FormLabels = formLabels, language: LanguageCode = "pl"): ExportSection {
  const revision = getMonitoringRevision(language);
  return { title: labels.simple.section, rows: [
    { label: labels.simple.stateBefore, value: (_env, form) => form.simple.stateBefore },
    { label: labels.simple.beforeLastMinutes, value: (_env, form) => form.simple.antecedents },
    { label: labels.simple.signalsObserved, value: (_env, form) => form.simple.signals },
    ...stageRows("simple", "earlyResponse", "earlyResponseSources", language),
    ...stageRows("simple", "escalationCourse", "escalationSources", language),
    ...stageRows("simple", "postEscalationNeeds", "postEscalationSources", language),
    { label: labels.simple.notes, value: (_env, form) => form.simple.notes },
    { label: subjectLabel(labels.export.simplePredictabilityFor, language, "genitive"), value: (_env, form) => form.simple.predictability },
    { label: revision.readinessTiming, hint: revision.readinessTimingHint, value: (_env, form) => form.simple.readinessDetails },
  ] };
}
export const simpleExportSection = getSimpleExportSection();

export function getIncidentExportSections(env: EnvironmentConfig, labels: FormLabels = formLabels): ExportSection[] {
  const revision = getMonitoringRevision(labelsLanguage(labels));
  const otherRow = (label: string, key: keyof SituationForm["incident"], other: keyof SituationForm["incident"]): ExportRow => ({
    label, value: (_env, form) => withOther(form.incident[key] as string[], form.incident[other] as string),
  });
  return [
    { title: labels.incident.baselineSection, note: revision.tensionHint, rows: [
      incidentRow(labels.incident.tension, "tension"), incidentRow(revision.tensionSigns, "tensionSigns"),
      incidentRow(labels.incident.tired, "tired"), incidentRow(revision.sleepEnough, "sleepEnough"),
      incidentRow(revision.sleepDetails, "sleepDetails"),
      ...(env.stayStages ? [incidentRow(labels.incident.stayStage, "stayStage"), incidentRow(labels.incident.stayStageLoad, "stayStageLoad")] : []),
      otherRow(labels.incident.burdens, "burdens", "burdensOther"),
      otherRow(labels.incident.bodyState, "bodyState", "bodyStateOther"),
      otherRow(labels.incident.sensoryIntensity, "sensoryIntensity", "sensoryIntensityOther"),
    ] },
    { title: labels.incident.beforeSection, rows: [incidentRow(labels.incident.antecedents, "antecedents"), incidentRow(labels.incident.factDescription, "factDescription")] },
    { title: labels.incident.expectationsSection, rows: [
      incidentRow(labels.incident.influence, "influence"), incidentRow(labels.incident.noInfluence, "noInfluence"),
      incidentRow(labels.incident.predictabilityWhat, "predictabilityWhat"), incidentRow(labels.incident.predictabilityDuration, "predictabilityDuration"),
      incidentRow(labels.incident.predictabilityChoice, "predictabilityChoice"), otherRow(labels.incident.expectations, "expectations", "expectationOther"),
    ] },
    { title: labels.incident.signalsSection, note: `${labels.ui.signalsSectionHint} ${revision.earlyResponseSourceScopeHint}`, rows: [
      ...stageRows("incident", "earlyResponse", "earlyResponseSources", labelsLanguage(labels), [
        incidentRow(labels.incident.signalsAppeared, "signalsAppeared"),
        incidentRow(labels.incident.timeToEscalation, "timeToEscalation"),
        otherRow(labels.incident.activationSignals, "activationSignals", "activationSignalsOther"),
        otherRow(labels.incident.shutdownSignals, "shutdownSignals", "shutdownSignalsOther"),
        otherRow(labels.incident.sensorySignals, "sensorySignals", "sensorySignalsOther"),
      ]),
      incidentRow(labels.incident.firstSignal, "firstSignal"), incidentRow(labels.incident.predicts, "signalsInOtherRecords"),
    ] },
    { title: labels.incident.maskingSection, note: revision.maskingHint, rows: [
      incidentRow(revision.continuedObservation, "continuedObservation"), incidentRow(revision.personAccount, "personAccount"),
      incidentRow(revision.laterObservation, "laterObservation"), incidentRow(revision.maskingHypothesis, "maskingHypothesis"),
    ] },
    { title: labels.incident.actionsSection, note: revision.supportConditionsHint, rows: [
      otherRow(labels.incident.interventions, "interventions", "interventionDetails"),
      incidentRow(revision.supportConditional, "supportConditional"), incidentRow(labels.incident.usedRegulator, "usedRegulator"),
    ] },
    { title: labels.incident.behaviorSection, rows: [
      ...stageRows("incident", "escalationCourse", "escalationSources", labelsLanguage(labels)), incidentRow(revision.behaviorMeasure, "behaviorMeasure"),
      incidentRow(revision.observedHarms, "observedHarms"), incidentRow(revision.consequencesDescription, "consequencesDescription"), incidentRow(revision.potentialRisk, "potentialRisk"),
    ] },
    { title: labels.incident.regulationSection, rows: [
      incidentRow(revision.behaviorDuration, "behaviorDuration", revision.durationHint), incidentRow(revision.tensionReductionDetails, "tensionReductionDetails", revision.reductionHint), incidentRow(revision.readinessTiming, "readinessDetails", revision.readinessTimingHint),
    ] },
    { title: labels.incident.afterSection, rows: [
      ...stageRows("incident", "postEscalationNeeds", "postEscalationSources", labelsLanguage(labels)),
      otherRow(labels.incident.after, "after", "afterOther"),
    ] },
    { title: labels.incident.physicalSection, note: revision.physicalHint, rows: [
      incidentRow(revision.physicalDuringEvent, "physicalDuringEvent"), incidentRow(revision.eventPhysicalCount, "eventPhysicalCount"),
      incidentRow(labels.incident.lowerThreshold, "lowerThreshold"), incidentRow(revision.eventPhysicalNote, "eventPhysicalNote"),
    ] },
  ];
}
export function getMapExportSections(labels: FormLabels = formLabels, language: LanguageCode = "pl"): ExportSection[] {
  const revision = getMonitoringRevision(language);
  return [
    { title: labels.map.section, note: revision.mapSources, rows: [mapRow(revision.observationPeriod, "observationPeriod"), mapRow(revision.updatedAt, "updatedAt")] },
    { title: labels.export.mapSectionPlaces, rows: [
      mapRow(subjectLabel(labels.export.mapPreferredPlacesFor, language), "preferredPlaces", "preferredPlacesOther"), mapRow(labels.ui.preferredReason, "preferredObservations"),
      mapRow(subjectLabel(labels.export.mapAvoidedPlacesFor, language), "avoidedPlaces", "avoidedPlacesOther"), mapRow(labels.ui.avoidedReason, "avoidedObservations"),
    ] },
    { title: labels.export.mapSectionActivities, note: labels.ui.likesHint, rows: [mapRow(subjectLabel(labels.export.mapLikesFor, language), "likes"), mapRow(subjectLabel(labels.export.mapActivityRoleFor, language), "activityRoles")] },
    { title: labels.export.mapSectionConditions, rows: [mapRow(subjectLabel(labels.export.mapEasiestWhenFor, language), "easiestWhen", "easiestWhenOther")] },
    { title: labels.export.mapSectionSupport, rows: [
      mapRow(language === "pl" ? "Z kim osoba wybiera kontakt? Jak ten kontakt przebiega?" : "Whom does the person choose to contact? What happens during contact?", "chosenContact"),
      mapRow(labels.ui.reducersLabel, "reducers", "reducersOther"), mapRow(labels.ui.energySourcesLabel, "restorationSources"),
    ] },
    { title: labels.export.mapSectionDepends, rows: [mapRow(labels.map.dependsOn, "dependsOn"), mapRow(labels.ui.behaviorChangeLabel, "dependsDescription")] },
    { title: labels.export.mapSectionSafe, note: labels.ui.safeBaseHint, rows: [mapRow(language === "pl" ? "Gdzie / przy kim osoba może odpocząć bez dodatkowych wymagań?" : "Where / with whom can the person rest without additional demands?", "restConditions")] },
    { title: labels.export.mapSectionEscalation, note: revision.comparisonHint, rows: [
      mapRow(labels.map.escalationContexts, "escalationContexts", "escalationOther"), mapRow(labels.ui.escalationReducersLabel, "escalationReducers", "escalationReducersOther"),
      mapRow(revision.similarWithoutEscalation, "similarWithoutEscalation"), mapRow(revision.comparisonDetails, "comparisonDetails"),
    ] },
  ];
}
export const mapExportSections = getMapExportSections();
