import { getLegacyExportSections } from "../config/legacyFields";
import { getMonitoringRevision } from "../config/monitoringRevision";
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
    "",
    mode === "map" && variant === "extended" ? getMonitoringRevision(language).mapSources : getMonitoringRevision(language).sources,
    ""
  ];

  if (variant === "simple") {
    const metaSection = getMetaExportSection(env, labels);
    const simpleSection = getSimpleExportSection(labels, language);
    parts.push(
      section(metaSection.title, rowsToLines(env, form, metaSection.rows, language)),
      section(simpleSection.title, [simpleSection.note || "", ...rowsToLines(env, form, simpleSection.rows, language)])
    );
  } else {
    if (mode !== "map") {
      parts.push(language === "en" ? "Incident report" : "Karta zdarzenia");
      parts.push(section(labels.meta.section, rowsToLines(env, form, getMetaExportSection(env, labels).rows, language)));
      for (const item of getIncidentExportSections(env, labels)) {
        parts.push(section(item.title, [item.note || "", ...rowsToLines(env, form, item.rows, language)]));
      }
    }

    if (mode !== "incident") {
      parts.push(section(labels.meta.section, rowsToLines(env, form, getMetaExportSection(env, labels).rows, language)));
      for (const item of getMapExportSections(labels, language)) {
        parts.push(section(item.title, [item.note || "", ...rowsToLines(env, form, item.rows, language)]));
      }
    }
  }

  for (const item of getLegacyExportSections(form, variant, mode, language)) {
    parts.push(section(item.title, [getMonitoringRevision(language).legacyHint, ...rowsToLines(env, form, item.rows, language)]));
  }

  return {
    subject,
    body: parts.join("\n")
  };
}

export function openEmail(email: EmailContent): void {
  window.location.href = `mailto:kontakt@autyzm.poznan.pl?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
}
