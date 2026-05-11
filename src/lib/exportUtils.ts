import { resolveExportLabel, type ExportRow, type ExportValue } from "../config/exportSections";
import { translateOption } from "../i18n/options";
import type { LanguageCode } from "../i18n/useLanguage";
import type { EnvironmentConfig, SituationForm } from "../types/form";

function translateExportValue(value: ExportValue, language: LanguageCode): ExportValue {
  if (Array.isArray(value)) return value.map((item) => translateOption(item, language));
  return translateOption(value, language);
}

export function resolveRows<T>(
  env: EnvironmentConfig,
  form: SituationForm,
  rows: ExportRow[],
  mapper: (label: string, value: ExportValue) => T,
  language: LanguageCode = "pl"
): T[] {
  return rows.map((row) => mapper(resolveExportLabel(row.label, env, form), translateExportValue(row.value(env, form), language)));
}
