import { computed, ref, watch } from "vue";

const THEME_STORAGE_KEY = "situationmap-theme";
type Theme = "light" | "dark";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function getInitialTheme(): Theme {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(savedTheme)) return savedTheme;
  } catch {
    // Ignore storage errors, e.g. private mode restrictions.
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const theme = ref<Theme>(getInitialTheme());
  const isDarkTheme = computed(() => theme.value === "dark");

  watch(theme, (value) => {
    document.documentElement.dataset.theme = value;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
      // Ignore storage errors, e.g. private mode restrictions.
    }
  }, { immediate: true });

  function toggleTheme() {
    theme.value = isDarkTheme.value ? "light" : "dark";
  }

  return {
    theme,
    isDarkTheme,
    toggleTheme
  };
}
