import { resolveExportLabel, type ExportRow, type ExportValue } from "../config/exportSections";
import type { EnvironmentConfig, SituationForm } from "../types/form";

export function resolveRows<T>(
  env: EnvironmentConfig,
  form: SituationForm,
  rows: ExportRow[],
  mapper: (label: string, value: ExportValue) => T
): T[] {
  return rows.map((row) => mapper(resolveExportLabel(row.label, env, form), row.value(env, form)));
}
