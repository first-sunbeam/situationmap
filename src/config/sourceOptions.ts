import type { LanguageCode } from "../i18n/useLanguage";
import { getMonitoringRevision } from "./monitoringRevision";

export const informationSourceCodes = ["O", "P", "R", "H"] as const;
export type InformationSource = (typeof informationSourceCodes)[number];
export const stageSourceTypeFields = {
  earlyResponse: "earlyResponseSourceTypes",
  escalationCourse: "escalationSourceTypes",
  postEscalationNeeds: "postEscalationSourceTypes",
} as const;

export function getInformationSourceOptions(language: LanguageCode) {
  const labels = getMonitoringRevision(language).sourceOptions;
  return informationSourceCodes.map((code) => ({ code, label: labels[code] }));
}

export function formatInformationSources(codes: readonly string[], language: LanguageCode): string[] {
  const options = getInformationSourceOptions(language);
  // Preserve unfamiliar stored codes rather than silently dropping data.
  return codes.map((code) => options.find((option) => option.code === code)?.label ?? code);
}
