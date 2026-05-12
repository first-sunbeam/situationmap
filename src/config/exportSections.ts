import type { LanguageCode } from "../i18n/useLanguage";
import { getSubjectInline } from "../lib/subject";
import type { EnvironmentConfig, SituationForm } from "../types/form";
import { formLabels, type FormLabels } from "./formLabels";

export type ExportValue = string | string[];

export type ExportLabel =
  | string
  | ((env: EnvironmentConfig, form: SituationForm) => string);

export interface ExportRow {
  label: ExportLabel;
  value: (env: EnvironmentConfig, form: SituationForm) => ExportValue;
  shouldInclude?: (env: EnvironmentConfig, form: SituationForm) => boolean;
}

export interface ExportSection {
  title: string;
  rows: ExportRow[];
}

function withOther(values: string[], other: string): string[] {
  return other ? [...values, other] : values;
}

function incidentValue(
  field: keyof SituationForm["incident"],
): ExportRow["value"] {
  return (_env, form) => form.incident[field];
}

function interpolate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template,
  );
}

type SubjectCase = "genitive" | "lower" | "sentenceStart";

const subjectFallbacks: Record<SubjectCase, Record<LanguageCode, string>> = {
  genitive: {
    pl: "osoby",
    en: "the person",
  },
  lower: {
    pl: "osoba",
    en: "the person",
  },
  sentenceStart: {
    pl: "Osoba",
    en: "The person",
  },
};

function exportSubject(
  form: SituationForm,
  language: LanguageCode,
  subjectCase: SubjectCase = "genitive",
): string {
  return getSubjectInline(form, subjectFallbacks[subjectCase][language]);
}

function labelWithSubject(
  template: string,
  form: SituationForm,
  language: LanguageCode,
  subjectCase: SubjectCase = "genitive",
): string {
  return interpolate(template, {
    subject: exportSubject(form, language, subjectCase),
  });
}

export function resolveExportLabel(
  label: ExportLabel,
  env: EnvironmentConfig,
  form: SituationForm,
): string {
  return typeof label === "function" ? label(env, form) : label;
}

export function getMetaExportSection(
  env: EnvironmentConfig,
  labels: FormLabels = formLabels,
): ExportSection {
  return {
    title: labels.meta.section,
    rows: [
      { label: labels.meta.date, value: (_env, form) => form.meta.date },
      { label: labels.meta.time, value: (_env, form) => form.meta.time },
      { label: labels.meta.place, value: (_env, form) => form.meta.place },
      {
        label: labels.meta.initials,
        value: (_env, form) => form.meta.initials,
      },
      { label: env.lead, value: (_env, form) => form.meta.lead },
      { label: labels.meta.present, value: (_env, form) => form.meta.present },
    ],
  };
}

export function getSimpleExportSection(
  labels: FormLabels = formLabels,
  language: LanguageCode = "pl",
): ExportSection {
  return {
    title: labels.simple.section,
    rows: [
      {
        label: (_env, form) =>
          labelWithSubject(labels.export.simpleAntecedentsFor, form, language),
        value: (_env, form) => form.simple.stateBefore,
      },
      {
        label: labels.export.simpleBeforeLastMinutes,
        value: (_env, form) => form.simple.antecedents,
      },
      {
        label: labels.export.simpleSignalsObserved,
        value: (_env, form) => form.simple.signals,
      },
      {
        label: labels.export.simpleSupportResponse,
        value: (_env, form) => form.simple.interventions,
      },
      {
        label: labels.export.simpleBehavior,
        value: (_env, form) => form.simple.behavior,
      },
      {
        label: labels.export.simpleHelped,
        value: (_env, form) => form.simple.helped,
      },
      {
        label: (_env, form) =>
          labelWithSubject(labels.export.simpleNotesFor, form, language),
        value: (_env, form) => form.simple.notes,
      },
      {
        label: (_env, form) =>
          labelWithSubject(
            labels.export.simplePredictabilityFor,
            form,
            language,
          ),
        value: (_env, form) => form.simple.predictability,
      },
      {
        label: labels.export.simpleRecoveryTime,
        value: (_env, form) => form.simple.recoveryTime,
      },
    ],
  };
}

export const simpleExportSection = getSimpleExportSection();

export function getIncidentExportSections(
  env: EnvironmentConfig,
  labels: FormLabels = formLabels,
): ExportSection[] {
  return [
    {
      title: labels.incident.baselineSection,
      rows: [
        { label: labels.incident.tension, value: incidentValue("tension") },
        { label: labels.incident.tired, value: incidentValue("tired") },
        { label: labels.incident.slept, value: incidentValue("slept") },
        {
          label: labels.incident.sleepDetails,
          value: incidentValue("sleepDetails"),
        },
        ...(env.stayStages
          ? [
              {
                label: labels.incident.stayStage,
                value: incidentValue("stayStage"),
              },
              {
                label: labels.incident.stayStageLoad,
                value: incidentValue("stayStageLoad"),
              },
            ]
          : []),
        {
          label: labels.incident.burdens,
          value: (_env, form) =>
            withOther(form.incident.burdens, form.incident.burdensOther),
        },
        {
          label: labels.incident.bodyState,
          value: (_env, form) =>
            withOther(form.incident.bodyState, form.incident.bodyStateOther),
        },
        {
          label: labels.incident.sensoryIntensity,
          value: (_env, form) =>
            withOther(
              form.incident.sensoryIntensity,
              form.incident.sensoryIntensityOther,
            ),
        },
      ],
    },
    {
      title: labels.incident.beforeSection,
      rows: [
        {
          label: labels.incident.antecedents,
          value: incidentValue("antecedents"),
        },
        {
          label: labels.incident.factDescription,
          value: incidentValue("factDescription"),
        },
      ],
    },
    {
      title: labels.incident.expectationsSection,
      rows: [
        { label: labels.incident.influence, value: incidentValue("influence") },
        {
          label: labels.incident.noInfluence,
          value: incidentValue("noInfluence"),
        },
        {
          label: labels.incident.predictabilityWhat,
          value: incidentValue("predictabilityWhat"),
        },
        {
          label: labels.incident.predictabilityDuration,
          value: incidentValue("predictabilityDuration"),
        },
        {
          label: labels.incident.predictabilityChoice,
          value: incidentValue("predictabilityChoice"),
        },
        {
          label: labels.incident.expectations,
          value: (_env, form) =>
            withOther(
              form.incident.expectations,
              form.incident.expectationOther,
            ),
        },
      ],
    },
    {
      title: labels.incident.signalsSection,
      rows: [
        {
          label: labels.incident.signalsAppeared,
          value: incidentValue("signalsAppeared"),
        },
        {
          label: labels.incident.activationSignals,
          value: (_env, form) =>
            withOther(
              form.incident.activationSignals,
              form.incident.activationSignalsOther,
            ),
        },
        {
          label: labels.incident.shutdownSignals,
          value: (_env, form) =>
            withOther(
              form.incident.shutdownSignals,
              form.incident.shutdownSignalsOther,
            ),
        },
        {
          label: labels.incident.sensorySignals,
          value: (_env, form) =>
            withOther(
              form.incident.sensorySignals,
              form.incident.sensorySignalsOther,
            ),
        },
        {
          label: labels.incident.timeToEscalation,
          value: incidentValue("timeToEscalation"),
        },
        {
          label: labels.incident.firstSignal,
          value: incidentValue("firstSignal"),
        },
        { label: labels.incident.predicts, value: incidentValue("predicts") },
      ],
    },
    {
      title: labels.incident.maskingSection,
      rows: [
        {
          label: labels.incident.maskingContinued,
          value: incidentValue("maskingContinued"),
        },
        {
          label: labels.incident.maskingStrategies,
          value: (_env, form) =>
            withOther(
              form.incident.maskingStrategies,
              form.incident.maskingStrategiesOther,
            ),
          shouldInclude: (_env, form) => form.incident.maskingContinued === "yes",
        },
        {
          label: labels.incident.maskingDuration,
          value: incidentValue("maskingDuration"),
          shouldInclude: (_env, form) => form.incident.maskingContinued === "yes",
        },
      ],
    },
    {
      title: labels.incident.actionsSection,
      rows: [
        { label: labels.incident.phase, value: incidentValue("phase") },
        {
          label: labels.incident.interventions,
          value: incidentValue("interventions"),
        },
        {
          label: labels.incident.interventionDetails,
          value: incidentValue("interventionDetails"),
        },
        {
          label: labels.incident.unconditional,
          value: incidentValue("unconditional"),
        },
        {
          label: labels.incident.usedRegulator,
          value: incidentValue("usedRegulator"),
        },
        {
          label: labels.incident.reducedTension,
          value: incidentValue("reducedTension"),
        },
        {
          label: labels.incident.earlierWhat,
          value: incidentValue("earlierWhat"),
        },
      ],
    },
    {
      title: labels.incident.behaviorSection,
      rows: [
        { label: labels.incident.behavior, value: incidentValue("behavior") },
        { label: labels.incident.intensity, value: incidentValue("intensity") },
        { label: labels.incident.harms, value: incidentValue("harms") },
      ],
    },
    {
      title: labels.incident.regulationSection,
      rows: [
        {
          label: labels.incident.escalationDuration,
          value: incidentValue("escalationDuration"),
        },
        {
          label: labels.incident.endedBy,
          value: (_env, form) =>
            withOther(form.incident.endedBy, form.incident.endedByOther),
        },
        { label: labels.incident.worsened, value: incidentValue("worsened") },
        { label: labels.incident.calmTime, value: incidentValue("calmTime") },
        {
          label: labels.incident.cognitiveRecoveryTime,
          value: incidentValue("cognitiveRecoveryTime"),
        },
        {
          label: labels.incident.recoverySupports,
          value: (_env, form) =>
            withOther(
              form.incident.recoverySupports,
              form.incident.recoverySupportsOther,
            ),
        },
      ],
    },
    {
      title: labels.incident.afterSection,
      rows: [
        {
          label: labels.incident.after,
          value: (_env, form) =>
            withOther(form.incident.after, form.incident.afterOther),
        },
      ],
    },
    {
      title: labels.incident.physicalSection,
      rows: [
        {
          label: labels.incident.physicalThisWeek,
          value: incidentValue("physicalThisWeek"),
        },
        {
          label: labels.incident.physicalCount,
          value: incidentValue("physicalCount"),
        },
        {
          label: labels.incident.lowerThreshold,
          value: incidentValue("lowerThreshold"),
        },
        {
          label: labels.incident.physicalNote,
          value: incidentValue("physicalNote"),
        },
      ],
    },
  ];
}

export function getMapExportSections(
  labels: FormLabels = formLabels,
  language: LanguageCode = "pl",
): ExportSection[] {
  return [
    {
      title: labels.export.mapSectionPlaces,
      rows: [
        {
          label: (_env, form) =>
            labelWithSubject(
              labels.export.mapPreferredPlacesFor,
              form,
              language,
              "lower",
            ),
          value: (_env, form) =>
            withOther(form.map.preferredPlaces, form.map.preferredPlacesOther),
        },
        {
          label: labels.export.mapPreferredReason,
          value: (_env, form) => form.map.preferredReason,
        },
        {
          label: (_env, form) =>
            labelWithSubject(
              labels.export.mapAvoidedPlacesFor,
              form,
              language,
              "lower",
            ),
          value: (_env, form) =>
            withOther(form.map.avoidedPlaces, form.map.avoidedPlacesOther),
        },
        {
          label: labels.export.mapAvoidedReason,
          value: (_env, form) => form.map.avoidedReason,
        },
      ],
    },
    {
      title: labels.export.mapSectionActivities,
      rows: [
        {
          label: (_env, form) =>
            labelWithSubject(
              labels.export.mapLikesFor,
              form,
              language,
              "lower",
            ),
          value: (_env, form) => form.map.likes,
        },
        {
          label: (_env, form) =>
            labelWithSubject(
              labels.export.mapActivityRoleFor,
              form,
              language,
              "lower",
            ),
          value: (_env, form) => form.map.activityRoles,
        },
      ],
    },
    {
      title: labels.export.mapSectionConditions,
      rows: [
        {
          label: (_env, form) =>
            labelWithSubject(
              labels.export.mapEasiestWhenFor,
              form,
              language,
              "sentenceStart",
            ),
          value: (_env, form) =>
            withOther(form.map.easiestWhen, form.map.easiestWhenOther),
        },
      ],
    },
    {
      title: labels.export.mapSectionSupport,
      rows: [
        {
          label: (_env, form) =>
            labelWithSubject(
              labels.export.mapCooperatesWithFor,
              form,
              language,
              "sentenceStart",
            ),
          value: (_env, form) => form.map.cooperatesWith,
        },
        {
          label: labels.export.mapReducers,
          value: (_env, form) =>
            withOther(form.map.reducers, form.map.reducersOther),
        },
        {
          label: labels.export.mapEnergySources,
          value: (_env, form) => form.map.energySources,
        },
      ],
    },
    {
      title: labels.export.mapSectionDepends,
      rows: [
        {
          label: labels.export.mapDependsOn,
          value: (_env, form) => form.map.dependsOn,
        },
        {
          label: labels.export.mapDependsDescription,
          value: (_env, form) => form.map.dependsDescription,
        },
      ],
    },
    {
      title: labels.export.mapSectionSafe,
      rows: [
        {
          label: (_env, form) =>
            labelWithSubject(
              labels.export.mapSafeBaseFor,
              form,
              language,
              "lower",
            ),
          value: (_env, form) => form.map.safeBase,
        },
      ],
    },
    {
      title: labels.export.mapSectionEscalation,
      rows: [
        {
          label: labels.export.mapEscalationContexts,
          value: (_env, form) =>
            withOther(form.map.escalationContexts, form.map.escalationOther),
        },
        {
          label: labels.export.mapEscalationReducers,
          value: (_env, form) =>
            withOther(
              form.map.escalationReducers,
              form.map.escalationReducersOther,
            ),
        },
        {
          label: labels.export.mapNoAggression,
          value: (_env, form) => form.map.noAggression,
        },
        {
          label: labels.export.mapNoAggressionWhere,
          value: (_env, form) => form.map.noAggressionWhere,
        },
      ],
    },
  ];
}

export const mapExportSections = getMapExportSections();
