import { computed, ref, watch } from "vue";

export type LanguageCode = "pl" | "en";

const DEFAULT_LANGUAGE: LanguageCode = "pl";

function isLanguageCode(value: unknown): value is LanguageCode {
  return value === "pl" || value === "en";
}

function detectPreferredLanguage(): LanguageCode {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const browserLanguage of browserLanguages) {
    const code = browserLanguage?.toLowerCase().split("-")[0];
    if (isLanguageCode(code)) return code;
  }

  return DEFAULT_LANGUAGE;
}

const language = ref<LanguageCode>(detectPreferredLanguage());

watch(
  language,
  (value) => {
    document.documentElement.lang = value;
  },
  { immediate: true },
);

export function useLanguage() {
  const isEnglish = computed(() => language.value === "en");
  const nextLanguage = computed<LanguageCode>(() => isEnglish.value ? "pl" : "en");
  const languageLabel = computed(() => nextLanguage.value.toUpperCase());
  const toggleLanguageLabel = computed(() => isEnglish.value ? "Przełącz język na polski" : "Switch language to English");

  function setLanguage(value: LanguageCode) {
    language.value = value;
  }

  function toggleLanguage() {
    setLanguage(nextLanguage.value);
  }

  return {
    language,
    isEnglish,
    languageLabel,
    nextLanguage,
    toggleLanguageLabel,
    setLanguage,
    toggleLanguage
  };
}
