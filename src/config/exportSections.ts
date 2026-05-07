import { getSubjectInline } from "../lib/subject";
import type { EnvironmentConfig, SituationForm } from "../types/form";
import { formLabels } from "./formLabels";

export type ExportValue = string | string[];

export type ExportLabel = string | ((env: EnvironmentConfig, form: SituationForm) => string);

export interface ExportRow {
  label: ExportLabel;
  value: (env: EnvironmentConfig, form: SituationForm) => ExportValue;
}

export interface ExportSection {
  title: string;
  rows: ExportRow[];
}

function withOther(values: string[], other: string): string[] {
  return other ? [...values, other] : values;
}

export function resolveExportLabel(label: ExportLabel, env: EnvironmentConfig, form: SituationForm): string {
  return typeof label === "function" ? label(env, form) : label;
}

export function getMetaExportSection(env: EnvironmentConfig): ExportSection {
  return {
    title: formLabels.meta.section,
    rows: [
      { label: formLabels.meta.date, value: (_env, form) => form.meta.date },
      { label: formLabels.meta.time, value: (_env, form) => form.meta.time },
      { label: formLabels.meta.place, value: (_env, form) => form.meta.place },
      { label: formLabels.meta.initials, value: (_env, form) => form.meta.initials },
      { label: env.lead, value: (_env, form) => form.meta.lead },
      { label: formLabels.meta.present, value: (_env, form) => form.meta.present }
    ]
  };
}

export const simpleExportSection: ExportSection = {
  title: formLabels.simple.section,
  rows: [
    { label: (_env, form) => `1. Co wydarzyło się tuż przed i jaki był stan ${getSubjectInline(form)}?`, value: (_env, form) => form.simple.antecedents },
    { label: formLabels.simple.signals, value: (_env, form) => form.simple.signals },
    { label: formLabels.simple.behavior, value: (_env, form) => form.simple.behavior },
    { label: formLabels.simple.helped, value: (_env, form) => form.simple.helped },
    { label: (_env, form) => `5. Wpływ i autonomia – zakres kontroli dla ${getSubjectInline(form)}`, value: (_env, form) => form.simple.notes },
    { label: formLabels.simple.recoveryTime, value: (_env, form) => form.simple.recoveryTime }
  ]
};

export function getIncidentExportSections(env: EnvironmentConfig): ExportSection[] {
  return [
    {
      title: formLabels.incident.baselineSection,
      rows: [
        { label: formLabels.incident.tension, value: (_env, form) => form.incident.tension },
        { label: formLabels.incident.tired, value: (_env, form) => form.incident.tired },
        { label: formLabels.incident.slept, value: (_env, form) => form.incident.slept },
        { label: formLabels.incident.sleepDetails, value: (_env, form) => form.incident.sleepDetails },
        ...(env.stayStages ? [
          { label: formLabels.incident.stayStage, value: (_env: EnvironmentConfig, form: SituationForm) => form.incident.stayStage },
          { label: formLabels.incident.stayStageLoad, value: (_env: EnvironmentConfig, form: SituationForm) => form.incident.stayStageLoad }
        ] : []),
        { label: formLabels.incident.burdens, value: (_env, form) => withOther(form.incident.burdens, form.incident.burdensOther) },
        { label: formLabels.incident.bodyState, value: (_env, form) => withOther(form.incident.bodyState, form.incident.bodyStateOther) },
        { label: formLabels.incident.sensoryIntensity, value: (_env, form) => withOther(form.incident.sensoryIntensity, form.incident.sensoryIntensityOther) }
      ]
    },
    {
      title: formLabels.incident.beforeSection,
      rows: [
        { label: formLabels.incident.antecedents, value: (_env, form) => form.incident.antecedents },
        { label: formLabels.incident.factDescription, value: (_env, form) => form.incident.factDescription }
      ]
    },
    {
      title: formLabels.incident.expectationsSection,
      rows: [
        { label: (_env, form) => `Co było jasne dla ${getSubjectInline(form)} i na co był wpływ w tym momencie?`, value: (_env, form) => form.incident.influence },
        { label: (_env, form) => `Co było nieznane dla ${getSubjectInline(form)}, narzucone albo poza wpływem?`, value: (_env, form) => form.incident.noInfluence },
        { label: formLabels.incident.expectations, value: (_env, form) => withOther(form.incident.expectations, form.incident.expectationOther) }
      ]
    },
    {
      title: formLabels.incident.signalsSection,
      rows: [
        { label: formLabels.incident.signalsAppeared, value: (_env, form) => form.incident.signalsAppeared },
        { label: formLabels.incident.activationSignals, value: (_env, form) => withOther(form.incident.activationSignals, form.incident.activationSignalsOther) },
        { label: formLabels.incident.shutdownSignals, value: (_env, form) => withOther(form.incident.shutdownSignals, form.incident.shutdownSignalsOther) },
        { label: formLabels.incident.sensorySignals, value: (_env, form) => withOther(form.incident.sensorySignals, form.incident.sensorySignalsOther) },
        { label: formLabels.incident.timeToEscalation, value: (_env, form) => form.incident.timeToEscalation },
        { label: formLabels.incident.firstSignal, value: (_env, form) => form.incident.firstSignal },
        { label: formLabels.incident.predicts, value: (_env, form) => form.incident.predicts }
      ]
    },
    {
      title: formLabels.incident.maskingSection,
      rows: [
        { label: (_env, form) => `Kontynuowanie aktywności mimo narastającego napięcia przez ${getSubjectInline(form)}`, value: (_env, form) => form.incident.maskingContinued },
        { label: formLabels.incident.maskingStrategies, value: (_env, form) => withOther(form.incident.maskingStrategies, form.incident.maskingStrategiesOther) },
        { label: (_env, form) => `Czas „trzymania się” przed eskalacją przez ${getSubjectInline(form)}`, value: (_env, form) => form.incident.maskingDuration }
      ]
    },
    {
      title: formLabels.incident.actionsSection,
      rows: [
        { label: formLabels.incident.phase, value: (_env, form) => form.incident.phase },
        { label: formLabels.incident.interventions, value: (_env, form) => form.incident.interventions },
        { label: formLabels.incident.interventionDetails, value: (_env, form) => form.incident.interventionDetails },
        { label: formLabels.incident.unconditional, value: (_env, form) => form.incident.unconditional },
        { label: formLabels.incident.usedRegulator, value: (_env, form) => form.incident.usedRegulator },
        { label: formLabels.incident.reducedTension, value: (_env, form) => form.incident.reducedTension },
        { label: formLabels.incident.earlierWhat, value: (_env, form) => form.incident.earlierWhat }
      ]
    },
    {
      title: formLabels.incident.behaviorSection,
      rows: [
        { label: formLabels.incident.behavior, value: (_env, form) => form.incident.behavior },
        { label: formLabels.incident.intensity, value: (_env, form) => form.incident.intensity },
        { label: formLabels.incident.harms, value: (_env, form) => form.incident.harms }
      ]
    },
    {
      title: formLabels.incident.regulationSection,
      rows: [
        { label: formLabels.incident.endedBy, value: (_env, form) => withOther(form.incident.endedBy, form.incident.endedByOther) },
        { label: formLabels.incident.worsened, value: (_env, form) => form.incident.worsened },
        { label: formLabels.incident.calmTime, value: (_env, form) => form.incident.calmTime },
        { label: formLabels.incident.cognitiveRecoveryTime, value: (_env, form) => form.incident.cognitiveRecoveryTime },
        { label: formLabels.incident.recoverySupports, value: (_env, form) => withOther(form.incident.recoverySupports, form.incident.recoverySupportsOther) }
      ]
    },
    {
      title: formLabels.incident.afterSection,
      rows: [
        { label: formLabels.incident.after, value: (_env, form) => withOther(form.incident.after, form.incident.afterOther) },
        { label: formLabels.incident.escalationDuration, value: (_env, form) => form.incident.escalationDuration }
      ]
    },
    {
      title: formLabels.incident.physicalSection,
      rows: [
        { label: formLabels.incident.physicalThisWeek, value: (_env, form) => form.incident.physicalThisWeek },
        { label: formLabels.incident.physicalCount, value: (_env, form) => form.incident.physicalCount },
        { label: (_env, form) => `Szybsza lub silniejsza reakcja niż zwykle u ${getSubjectInline(form)}`, value: (_env, form) => form.incident.lowerThreshold },
        { label: formLabels.incident.physicalNote, value: (_env, form) => form.incident.physicalNote }
      ]
    }
  ];
}

export const mapExportSections: ExportSection[] = [
  {
    title: "2. Miejsca regulacyjne",
    rows: [
      { label: formLabels.map.preferred, value: (_env, form) => form.map.preferred },
      { label: formLabels.map.avoided, value: (_env, form) => form.map.avoided }
    ]
  },
  {
    title: "2A. Warunki dobrego funkcjonowania",
    rows: [
      { label: formLabels.map.likes, value: (_env, form) => form.map.likes },
      { label: formLabels.map.easiestWhen, value: (_env, form) => form.map.easiestWhen },
      { label: formLabels.map.cooperatesWith, value: (_env, form) => form.map.cooperatesWith },
      { label: formLabels.map.reducers, value: (_env, form) => form.map.reducers }
    ]
  },
  {
    title: "3. Zależności",
    rows: [
      { label: formLabels.map.dependsOn, value: (_env, form) => form.map.dependsOn },
      { label: formLabels.map.dependsDescription, value: (_env, form) => form.map.dependsDescription }
    ]
  },
  {
    title: "4. Eskalacja",
    rows: [
      { label: formLabels.map.escalationContexts, value: (_env, form) => withOther(form.map.escalationContexts, form.map.escalationOther) }
    ]
  },
  {
    title: "5. Sytuacje bez agresji",
    rows: [
      { label: formLabels.map.noAggression, value: (_env, form) => form.map.noAggression },
      { label: formLabels.map.noAggressionWhere, value: (_env, form) => form.map.noAggressionWhere }
    ]
  }
];
