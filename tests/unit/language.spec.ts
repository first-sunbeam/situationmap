import { nextTick } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";

function mockLocalStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial));
  const storage = {
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
    clear: vi.fn(() => {
      store.clear();
    })
  };

  vi.stubGlobal("localStorage", storage);
  return storage;
}

describe("przełączanie języka", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  it("domyślnie używa języka polskiego", async () => {
    mockLocalStorage();
    const { useLanguage } = await import("../../src/i18n/useLanguage");

    const { language, languageLabel, toggleLanguageLabel } = useLanguage();

    expect(language.value).toBe("pl");
    expect(languageLabel.value).toBe("PL");
    expect(toggleLanguageLabel.value).toBe("Switch language to English");
  });

  it("odczytuje zapisany język i zapisuje zmianę w localStorage", async () => {
    const storage = mockLocalStorage({ "situationmap-language": "en" });
    const { useLanguage } = await import("../../src/i18n/useLanguage");

    const { language, languageLabel, toggleLanguageLabel, toggleLanguage } = useLanguage();

    expect(language.value).toBe("en");
    expect(languageLabel.value).toBe("EN");
    expect(toggleLanguageLabel.value).toBe("Przełącz język na polski");

    toggleLanguage();
    await nextTick();

    expect(language.value).toBe("pl");
    expect(storage.setItem).toHaveBeenCalledWith("situationmap-language", "pl");
  });
});
