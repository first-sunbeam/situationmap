import { computed, ref, watch } from "vue";

export type LanguageCode = "pl" | "en";

const DEFAULT_LANGUAGE: LanguageCode = "pl";
const LANGUAGE_STORAGE_KEY = "situationmap-language";

function isLanguageCode(value: unknown): value is LanguageCode {
  return value === "pl" || value === "en";
}

function detectPreferredLanguage(): LanguageCode {
  if (typeof localStorage !== "undefined") {
    try {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isLanguageCode(savedLanguage)) return savedLanguage;
    } catch {
      // localStorage may be unavailable in private browsing or restricted contexts.
    }
  }

  return DEFAULT_LANGUAGE;
}

const language = ref<LanguageCode>(detectPreferredLanguage());

watch(
  language,
  (value) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = value;
    }

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
    } catch {
      // Ignore unavailable storage; language switching should still work for this session.
    }
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
