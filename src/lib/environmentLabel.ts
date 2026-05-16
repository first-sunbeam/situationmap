import type { LanguageCode } from "../i18n/useLanguage";
import type { EnvironmentConfig } from "../types/form";

const englishEnvironmentLabels: Record<string, string> = {
  Dom: "Home",
  "Placówka całodobowa": "Residential facility",
  Szkoła: "School",
};

const englishEnvironmentMapTitles: Record<string, string> = {
  "MAPA ŚRODOWISKA DOMOWEGO": "HOME ENVIRONMENT MAP",
  "MAPA ŚRODOWISKA - PLACÓWKA CAŁODOBOWA": "ENVIRONMENT MAP - RESIDENTIAL FACILITY",
  "MAPA ŚRODOWISKA SZKOLNEGO": "SCHOOL ENVIRONMENT MAP",
};

export function getEnvironmentLabel(
  env: EnvironmentConfig,
  language: LanguageCode,
): string {
  if (language !== "en") return env.label;
  return englishEnvironmentLabels[env.label] ?? env.label;
}

export function getEnvironmentMapTitle(
  env: EnvironmentConfig,
  language: LanguageCode,
): string {
  if (language !== "en") return env.mapTitle;
  return englishEnvironmentMapTitles[env.mapTitle] ?? env.mapTitle;
}
