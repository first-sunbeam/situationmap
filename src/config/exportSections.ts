import { getSubjectInline } from "../lib/subject";
import type { EnvironmentConfig, SituationForm } from "../types/form";
import { formLabels, type FormLabels } from "./formLabels";

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

function incidentValue(field: keyof SituationForm["incident"]): ExportRow["value"] {
  return (_env, form) => form.incident[field];
}

function subjectForLanguage(form: SituationForm, labels: FormLabels): string {
  return getSubjectInline(form, labels.map.section === "Environment map" ? "the child/student" : "dziecka/ucznia");
}

export function resolveExportLabel(label: ExportLabel, env: EnvironmentConfig, form: SituationForm): string {
  return typeof label === "function" ? label(env, form) : label;
}

export function getMetaExportSection(env: EnvironmentConfig, labels: FormLabels = formLabels): ExportSection {
  return {
    title: labels.meta.section,
    rows: [
      { label: labels.meta.date, value: (_env, form) => form.meta.date },
      { label: labels.meta.time, value: (_env, form) => form.meta.time },
      { label: labels.meta.place, value: (_env, form) => form.meta.place },
      { label: labels.meta.initials, value: (_env, form) => form.meta.initials },
      { label: env.lead, value: (_env, form) => form.meta.lead },
      { label: labels.meta.present, value: (_env, form) => form.meta.present }
    ]
  };
}

export function getSimpleExportSection(labels: FormLabels = formLabels): ExportSection {
  return {
    title: labels.simple.section,
    rows: [
      { label: (_env, form) => labels.simple.antecedents.replace("dziecka/ucznia", subjectForLanguage(form, labels)).replace("the child/student", subjectForLanguage(form, labels)), value: (_env, form) => form.simple.stateBefore },
      { label: labels.simple.beforeLastMinutes, value: (_env, form) => form.simple.antecedents },
      { label: labels.simple.signalsObserved, value: (_env, form) => form.simple.signals },
      { label: labels.simple.adultReaction, value: (_env, form) => form.simple.interventions },
      { label: labels.simple.behavior, value: (_env, form) => form.simple.behavior },
      { label: labels.simple.helped, value: (_env, form) => form.simple.helped },
      { label: (_env, form) => labels.simple.notes.replace("zakres kontroli", `zakres kontroli dla ${subjectForLanguage(form, labels)}`).replace("scope of control", `scope of control for ${subjectForLanguage(form, labels)}`), value: (_env, form) => form.simple.notes },
      { label: (_env, form) => `${labels.simple.predictability} ${subjectForLanguage(form, labels)} ${labels.ui.predictabilitySuffix}`, value: (_env, form) => form.simple.predictability },
      { label: labels.simple.recoveryTime, value: (_env, form) => form.simple.recoveryTime }
    ]
  };
}

export const simpleExportSection = getSimpleExportSection();

export function getIncidentExportSections(env: EnvironmentConfig, labels: FormLabels = formLabels): ExportSection[] {
  return [
    {
      title: labels.incident.baselineSection,
      rows: [
        { label: labels.incident.tension, value: incidentValue("tension") },
        { label: labels.incident.tired, value: incidentValue("tired") },
        { label: labels.incident.slept, value: incidentValue("slept") },
        { label: labels.incident.sleepDetails, value: incidentValue("sleepDetails") },
        ...(env.stayStages ? [
          { label: labels.incident.stayStage, value: incidentValue("stayStage") },
          { label: labels.incident.stayStageLoad, value: incidentValue("stayStageLoad") }
        ] : []),
        { label: labels.incident.burdens, value: (_env, form) => withOther(form.incident.burdens, form.incident.burdensOther) },
        { label: labels.incident.bodyState, value: (_env, form) => withOther(form.incident.bodyState, form.incident.bodyStateOther) },
        { label: labels.incident.sensoryIntensity, value: (_env, form) => withOther(form.incident.sensoryIntensity, form.incident.sensoryIntensityOther) }
      ]
    },
    {
      title: labels.incident.beforeSection,
      rows: [
        { label: labels.incident.antecedents, value: incidentValue("antecedents") },
        { label: labels.incident.factDescription, value: incidentValue("factDescription") }
      ]
    },
    {
      title: labels.incident.expectationsSection,
      rows: [
        { label: labels.incident.influence, value: incidentValue("influence") },
        { label: labels.incident.noInfluence, value: incidentValue("noInfluence") },
        { label: labels.incident.predictabilityWhat, value: incidentValue("predictabilityWhat") },
        { label: labels.incident.predictabilityDuration, value: incidentValue("predictabilityDuration") },
        { label: labels.incident.predictabilityChoice, value: incidentValue("predictabilityChoice") },
        { label: labels.incident.expectations, value: (_env, form) => withOther(form.incident.expectations, form.incident.expectationOther) }
      ]
    },
    {
      title: labels.incident.signalsSection,
      rows: [
        { label: labels.incident.signalsAppeared, value: incidentValue("signalsAppeared") },
        { label: labels.incident.activationSignals, value: (_env, form) => withOther(form.incident.activationSignals, form.incident.activationSignalsOther) },
        { label: labels.incident.shutdownSignals, value: (_env, form) => withOther(form.incident.shutdownSignals, form.incident.shutdownSignalsOther) },
        { label: labels.incident.sensorySignals, value: (_env, form) => withOther(form.incident.sensorySignals, form.incident.sensorySignalsOther) },
        { label: labels.incident.timeToEscalation, value: incidentValue("timeToEscalation") },
        { label: labels.incident.firstSignal, value: incidentValue("firstSignal") },
        { label: labels.incident.predicts, value: incidentValue("predicts") }
      ]
    },
    {
      title: labels.incident.maskingSection,
      rows: [
        { label: labels.incident.maskingContinued, value: incidentValue("maskingContinued") },
        { label: labels.incident.maskingStrategies, value: (_env, form) => withOther(form.incident.maskingStrategies, form.incident.maskingStrategiesOther) },
        { label: labels.incident.maskingDuration, value: incidentValue("maskingDuration") }
      ]
    },
    {
      title: labels.incident.actionsSection,
      rows: [
        { label: labels.incident.phase, value: incidentValue("phase") },
        { label: labels.incident.interventions, value: incidentValue("interventions") },
        { label: labels.incident.interventionDetails, value: incidentValue("interventionDetails") },
        { label: labels.incident.unconditional, value: incidentValue("unconditional") },
        { label: labels.incident.usedRegulator, value: incidentValue("usedRegulator") },
        { label: labels.incident.reducedTension, value: incidentValue("reducedTension") },
        { label: labels.incident.earlierWhat, value: incidentValue("earlierWhat") }
      ]
    },
    {
      title: labels.incident.behaviorSection,
      rows: [
        { label: labels.incident.behavior, value: incidentValue("behavior") },
        { label: labels.incident.intensity, value: incidentValue("intensity") },
        { label: labels.incident.harms, value: incidentValue("harms") }
      ]
    },
    {
      title: labels.incident.regulationSection,
      rows: [
        { label: labels.incident.escalationDuration, value: incidentValue("escalationDuration") },
        { label: labels.incident.endedBy, value: (_env, form) => withOther(form.incident.endedBy, form.incident.endedByOther) },
        { label: labels.incident.worsened, value: incidentValue("worsened") },
        { label: labels.incident.calmTime, value: incidentValue("calmTime") },
        { label: labels.incident.cognitiveRecoveryTime, value: incidentValue("cognitiveRecoveryTime") },
        { label: labels.incident.recoverySupports, value: (_env, form) => withOther(form.incident.recoverySupports, form.incident.recoverySupportsOther) }
      ]
    },
    {
      title: labels.incident.afterSection,
      rows: [
        { label: labels.incident.after, value: (_env, form) => withOther(form.incident.after, form.incident.afterOther) }
      ]
    },
    {
      title: labels.incident.physicalSection,
      rows: [
        { label: labels.incident.physicalThisWeek, value: incidentValue("physicalThisWeek") },
        { label: labels.incident.physicalCount, value: incidentValue("physicalCount") },
        { label: labels.incident.lowerThreshold, value: incidentValue("lowerThreshold") },
        { label: labels.incident.physicalNote, value: incidentValue("physicalNote") }
      ]
    }
  ];
}

export function getMapExportSections(labels: FormLabels = formLabels): ExportSection[] {
  return [
    {
      title: labels.map.section === "Environment map" ? "1. Places and preferred spaces" : "1. Miejsca i preferowane przestrzenie",
      rows: [
        { label: (_env, form) => labels.map.preferred.replace("Prefers staying in", `Where does ${getSubjectInline(form, "the child/student")} prefer staying?`).replace("Chętnie przebywa w", `W jakich miejscach ${getSubjectInline(form, "dziecko/uczeń")} najchętniej przebywa?`), value: (_env, form) => withOther(form.map.preferredPlaces, form.map.preferredPlacesOther) },
        { label: labels.map.preferred === "Prefers staying in" ? "Why these places? What makes them distinctive?" : "Dlaczego te miejsca? Co je wyróżnia?", value: (_env, form) => form.map.preferredReason },
        { label: (_env, form) => labels.map.avoided === "Avoids / has difficulty leaving" ? `Which places does ${getSubjectInline(form, "the child/student")} avoid or have difficulty leaving?` : `Z jakich miejsc ${getSubjectInline(form, "dziecko/uczeń")} unika lub wychodzi z trudem?`, value: (_env, form) => withOther(form.map.avoidedPlaces, form.map.avoidedPlacesOther) },
        { label: labels.map.avoided === "Avoids / has difficulty leaving" ? "What activates tension in these places?" : "Co w tych miejscach aktywuje napięcie?", value: (_env, form) => form.map.avoidedReason }
      ]
    },
    {
      title: labels.map.section === "Environment map" ? "2. Preferred activities and role" : "2. Preferowane aktywności i rola",
      rows: [
        { label: (_env, form) => labels.map.likes === "Most willingly engages in" ? `Which activities does ${getSubjectInline(form, "the child/student")} most willingly engage in?` : `W jakie aktywności ${getSubjectInline(form, "dziecko/uczeń")} najchętniej się angażuje?`, value: (_env, form) => form.map.likes },
        { label: (_env, form) => labels.map.likes === "Most willingly engages in" ? `What role does ${getSubjectInline(form, "the child/student")} most often take in these activities?` : `Jaką rolę ${getSubjectInline(form, "dziecko/uczeń")} najczęściej przyjmuje w tych aktywnościach?`, value: (_env, form) => form.map.activityRoles }
      ]
    },
    {
      title: labels.map.section === "Environment map" ? "3. Conditions for optimal functioning" : "3. Warunki optymalnego funkcjonowania",
      rows: [
        { label: (_env, form) => labels.map.easiestWhen === "Functions most easily when" ? `${getSubjectInline(form, "The child/student")} functions most easily when` : `${getSubjectInline(form, "Dziecko/uczeń")} najłatwiej funkcjonuje, gdy`, value: (_env, form) => withOther(form.map.easiestWhen, form.map.easiestWhenOther) }
      ]
    },
    {
      title: labels.map.section === "Environment map" ? "4. What supports and lowers tension" : "4. Co wspiera i co obniża napięcie",
      rows: [
        { label: (_env, form) => labels.map.cooperatesWith === "Cooperates most easily with" ? `${getSubjectInline(form, "The child/student")} cooperates most easily with` : `${getSubjectInline(form, "Dziecko/uczeń")} najłatwiej współpracuje z`, value: (_env, form) => form.map.cooperatesWith },
        { label: labels.map.reducers, value: (_env, form) => withOther(form.map.reducers, form.map.reducersOther) },
        { label: labels.map.reducers === "What lowers tension?" ? "What gives energy / motivates functioning despite overload?" : "Co DAJE energię / motywuje do funkcjonowania mimo przeciążenia?", value: (_env, form) => form.map.energySources }
      ]
    },
    {
      title: labels.map.section === "Environment map" ? "5. Factors changing behavior" : "5. Czynniki zmieniające zachowanie",
      rows: [
        { label: labels.map.dependsOn, value: (_env, form) => form.map.dependsOn },
        { label: labels.map.dependsDescription, value: (_env, form) => form.map.dependsDescription }
      ]
    },
    {
      title: labels.map.section === "Environment map" ? "6. Safe spaces and people" : "6. Bezpieczne przestrzenie i osoby",
      rows: [
        { label: (_env, form) => labels.map.section === "Environment map" ? `Where/with whom does ${getSubjectInline(form, "the child/student")} feel safest?` : `Gdzie/z kim ${getSubjectInline(form, "dziecko/uczeń")} czuje się najbezpieczniej?`, value: (_env, form) => form.map.safeBase }
      ]
    },
    {
      title: labels.map.section === "Environment map" ? "7. Most common escalation situations" : "7. Najczęstsze sytuacje eskalacji",
      rows: [
        { label: labels.map.escalationContexts, value: (_env, form) => withOther(form.map.escalationContexts, form.map.escalationOther) },
        { label: labels.map.escalationContexts === "Most common escalation situations" ? "What REDUCES escalation risk in these situations?" : "Co ZMNIEJSZA ryzyko eskalacji w tych sytuacjach?", value: (_env, form) => withOther(form.map.escalationReducers, form.map.escalationReducersOther) },
        { label: labels.map.noAggression, value: (_env, form) => form.map.noAggression },
        { label: labels.map.noAggressionWhere, value: (_env, form) => form.map.noAggressionWhere }
      ]
    }
  ];
}

export const mapExportSections = getMapExportSections();
