import { getFormLabels } from "../config/formLabels";
import { getIncidentExportSections, getMapExportSections, getMetaExportSection, getSimpleExportSection, type ExportRow } from "../config/exportSections";
import { resolveRows } from "./exportUtils";
import { getEnvironmentLabel } from "./environmentLabel";
import type { LanguageCode } from "../i18n/useLanguage";
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

function rowsToLines(env: EnvironmentConfig, form: SituationForm, rows: ExportRow[], language: LanguageCode): string[] {
  return resolveRows(env, form, rows, line, language);
}

export function buildEmail({ env, form, variant, mode, language }: { env: EnvironmentConfig; form: SituationForm; variant: FormVariant; mode: ExtendedMode; language: LanguageCode }): EmailContent {
  const labels = getFormLabels(language);
  const simpleVariant = language === "en" ? "simple" : "prosty";
  const extendedVariant = language === "en" ? "extended" : "rozszerzony";
  const envLabel = getEnvironmentLabel(env, language);
  const subject = language === "en"
    ? `Monitoring form - ${envLabel} - ${variant === "simple" ? simpleVariant : extendedVariant}`
    : `Formularz monitorowania - ${envLabel} - ${variant === "simple" ? simpleVariant : extendedVariant}`;
  const parts = [
    language === "en" ? `Environment: ${envLabel}` : `Środowisko: ${envLabel}`,
    language === "en" ? `Form version: ${variant === "simple" ? simpleVariant : extendedVariant}` : `Wersja formularza: ${variant === "simple" ? "prosta" : "rozszerzona"}`,
    ""
  ];

  if (variant === "simple") {
    const metaSection = getMetaExportSection(env, labels);
    const simpleSection = getSimpleExportSection(labels, language);
    parts.push(
      section(metaSection.title, rowsToLines(env, form, metaSection.rows, language)),
      section(simpleSection.title, rowsToLines(env, form, simpleSection.rows, language))
    );
  } else {
    if (mode !== "map") {
      const incidentRows = [
        ...getMetaExportSection(env, labels).rows,
        ...getIncidentExportSections(env, labels).flatMap((s) => s.rows)
      ];
      parts.push(section(language === "en" ? "Incident report" : "Karta zdarzenia", rowsToLines(env, form, incidentRows, language)));
    }

    if (mode !== "incident") {
      const mapRowsText = getMapExportSections(labels, language).flatMap((s) => rowsToLines(env, form, s.rows, language));
      parts.push(section(labels.map.section, mapRowsText));
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
