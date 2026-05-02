import { formLabels } from "../config/formLabels";
import type { EnvironmentConfig, ExtendedMode, FormVariant, MapRow, SituationForm } from "../types/form";

type EmailValue = string | string[];

export interface EmailContent {
  subject: string;
  body: string;
}

function line(label: string, value: EmailValue): string {
  const text = Array.isArray(value) ? value.filter(Boolean).join(", ") : value;
  return `${label}: ${text && String(text).trim() ? text : "-"}`;
}

function section(title: string, rows: string[]): string {
  return [title, ...rows, ""].join("\n");
}

function mapRows(rows: MapRow[]): string {
  const filled = rows.filter((row) => row.time || row.activity);
  if (!filled.length) return "-";
  return filled
    .map((row) => `- ${row.place}: czas ${row.time || "-"}, aktywność ${row.activity || "-"}`)
    .join("\n");
}

export function buildEmail({ env, form, variant, mode }: { env: EnvironmentConfig; form: SituationForm; variant: FormVariant; mode: ExtendedMode }): EmailContent {
  const subject = `Formularz monitorowania - ${env.label} - ${variant === "simple" ? "prosty" : "rozszerzony"}`;
  const parts = [
    `Środowisko: ${env.label}`,
    `Wersja formularza: ${variant === "simple" ? "prosta" : "rozszerzona"}`,
    ""
  ];

  if (variant === "simple") {
    parts.push(
      section(formLabels.meta.section, [
        line(formLabels.meta.date, form.meta.date),
        line(formLabels.meta.time, form.meta.time),
        line(formLabels.meta.place, form.meta.place),
        line(env.lead, form.meta.lead),
        line(formLabels.meta.present, form.meta.present)
      ]),
      section(formLabels.simple.section, [
        line(formLabels.simple.factDescription, form.simple.factDescription),
        line(formLabels.simple.antecedents, form.simple.antecedents),
        line(formLabels.simple.signals, form.simple.signals),
        line(formLabels.simple.interventions, form.simple.interventions),
        line(formLabels.simple.behavior, form.simple.behavior),
        line(formLabels.simple.helped, form.simple.helped),
        line(formLabels.simple.notes, form.simple.notes)
      ])
    );
  } else {
    if (mode !== "map") {
      parts.push(
        section("Karta zdarzenia", [
          line(formLabels.meta.date, form.meta.date),
          line(formLabels.meta.time, form.meta.time),
          line(formLabels.meta.place, form.meta.place),
          line(env.lead, form.meta.lead),
          line(formLabels.meta.present, form.meta.present),
          line(formLabels.incident.tension, form.incident.tension),
          line(formLabels.incident.tired, form.incident.tired),
          line(formLabels.incident.slept, form.incident.slept),
          line(formLabels.incident.sleepDetails, form.incident.sleepDetails),
          line(formLabels.incident.stayStage, form.incident.stayStage),
          line(formLabels.incident.stayStageLoad, form.incident.stayStageLoad),
          line(formLabels.incident.burdens, form.incident.burdens),
          line(formLabels.incident.burdensOther, form.incident.burdensOther),
          line(formLabels.incident.antecedents, form.incident.antecedents),
          line(formLabels.incident.factDescription, form.incident.factDescription),
          line(formLabels.incident.expectations, form.incident.expectations),
          line(formLabels.incident.expectationOther, form.incident.expectationOther),
          line(formLabels.incident.signalsAppeared, form.incident.signalsAppeared),
          line(formLabels.incident.signals, form.incident.signals),
          line(formLabels.incident.signalsOther, form.incident.signalsOther),
          line(formLabels.incident.timeToEscalation, form.incident.timeToEscalation),
          line(formLabels.incident.firstSignal, form.incident.firstSignal),
          line(formLabels.incident.predicts, form.incident.predicts),
          line(formLabels.incident.phase, form.incident.phase),
          line(formLabels.incident.interventions, form.incident.interventions),
          line(formLabels.incident.interventionDetails, form.incident.interventionDetails),
          line(formLabels.incident.unconditional, form.incident.unconditional),
          line(formLabels.incident.usedRegulator, form.incident.usedRegulator),
          line(formLabels.incident.reducedTension, form.incident.reducedTension),
          line(formLabels.incident.earlierPossible, form.incident.earlierPossible),
          line(formLabels.incident.earlierWhat, form.incident.earlierWhat),
          line(formLabels.incident.behavior, form.incident.behavior),
          line(formLabels.incident.intensity, form.incident.intensity),
          line(formLabels.incident.escalationDuration, form.incident.escalationDuration),
          line(formLabels.incident.harms, form.incident.harms),
          line(formLabels.incident.after, form.incident.after),
          line(formLabels.incident.afterOther, form.incident.afterOther),
          line(formLabels.incident.calmTime, form.incident.calmTime),
          line(formLabels.incident.physicalThisWeek, form.incident.physicalThisWeek),
          line(formLabels.incident.physicalCount, form.incident.physicalCount),
          line(formLabels.incident.lowerThreshold, form.incident.lowerThreshold),
          line(formLabels.incident.physicalNote, form.incident.physicalNote),
          line(formLabels.incident.endedBy, form.incident.endedBy),
          line(formLabels.incident.endedByOther, form.incident.endedByOther),
          line(formLabels.incident.worsened, form.incident.worsened),
          line(formLabels.incident.regulators, form.incident.regulators),
          line(formLabels.incident.rewards, form.incident.rewards)
        ])
      );
    }

    if (mode !== "incident") {
      parts.push(
        section(formLabels.map.section, [
          `${formLabels.map.places}:\n${mapRows(form.map.rows)}`,
          line(formLabels.map.preferred, form.map.preferred),
          line(formLabels.map.avoided, form.map.avoided),
          line(formLabels.map.likes, form.map.likes),
          line(formLabels.map.easiestWhen, form.map.easiestWhen),
          line(formLabels.map.cooperatesWith, form.map.cooperatesWith),
          line(formLabels.map.reducers, form.map.reducers),
          line(formLabels.map.dependsOn, form.map.dependsOn),
          line(formLabels.map.dependsDescription, form.map.dependsDescription),
          line(formLabels.map.escalationContexts, form.map.escalationContexts),
          line(formLabels.map.escalationOther, form.map.escalationOther),
          line(formLabels.map.noAggression, form.map.noAggression),
          line(formLabels.map.noAggressionWhere, form.map.noAggressionWhere)
        ])
      );
    }
  }

  return {
    subject,
    body: parts.join("\n")
  };
}

export function openEmail(email: EmailContent): void {
  window.location.href = `mailto:kontakt@autyzm.poznan.pl?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
}
