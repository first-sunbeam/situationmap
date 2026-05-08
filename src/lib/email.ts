import { formLabels } from "../config/formLabels";
import { getIncidentExportSections, getMetaExportSection, mapExportSections, simpleExportSection, type ExportRow } from "../config/exportSections";
import { resolveRows } from "./exportUtils";
import type { EnvironmentConfig, ExtendedMode, FormVariant, SituationForm } from "../types/form";

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

function rowsToLines(env: EnvironmentConfig, form: SituationForm, rows: ExportRow[]): string[] {
  return resolveRows(env, form, rows, line);
}

export function buildEmail({ env, form, variant, mode }: { env: EnvironmentConfig; form: SituationForm; variant: FormVariant; mode: ExtendedMode }): EmailContent {
  const subject = `Formularz monitorowania - ${env.label} - ${variant === "simple" ? "prosty" : "rozszerzony"}`;
  const parts = [
    `Środowisko: ${env.label}`,
    `Wersja formularza: ${variant === "simple" ? "prosta" : "rozszerzona"}`,
    ""
  ];

  if (variant === "simple") {
    const metaSection = getMetaExportSection(env);
    parts.push(
      section(metaSection.title, rowsToLines(env, form, metaSection.rows)),
      section(simpleExportSection.title, rowsToLines(env, form, simpleExportSection.rows))
    );
  } else {
    if (mode !== "map") {
      const incidentRows = [
        ...getMetaExportSection(env).rows,
        ...getIncidentExportSections(env).flatMap((s) => s.rows)
      ];
      parts.push(section("Karta zdarzenia", rowsToLines(env, form, incidentRows)));
    }

    if (mode !== "incident") {
      const mapRowsText = mapExportSections.flatMap((s) => rowsToLines(env, form, s.rows));
      parts.push(section(formLabels.map.section, mapRowsText));
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
