import { type Page, type Locator } from "@playwright/test";

export class SituationMapPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async goto() {
    await this.page.goto("/");
  }

  async clearStorage() {
    await this.page.evaluate(() => window.localStorage.clear());
  }

  // ── Theme ─────────────────────────────────────────────────────────────────

  get enableDarkThemeButton(): Locator {
    return this.page.getByRole("button", { name: "Włącz ciemny motyw" });
  }

  get enableLightThemeButton(): Locator {
    return this.page.getByRole("button", { name: "Włącz jasny motyw" });
  }

  get htmlElement(): Locator {
    return this.page.locator("html");
  }

  async switchToDarkTheme() {
    await this.enableDarkThemeButton.click();
  }

  // ── Variant switcher ──────────────────────────────────────────────────────

  async switchToExtendedVariant() {
    await this.page.getByRole("button", { name: "Rozszerzona" }).click();
  }

  async switchToMapMode() {
    await this.page.getByRole("button", { name: "Mapa środowiska" }).click();
  }

  // ── Shared meta fields (used by both Simple and Extended) ─────────────────

  get dateField(): Locator {
    return this.page.getByLabel("Data");
  }

  get timeField(): Locator {
    return this.page.getByLabel("Godzina");
  }

  get placeField(): Locator {
    return this.page.getByLabel("Miejsce");
  }

  get guardianField(): Locator {
    return this.page.getByLabel("Rodzic / opiekun prowadzący");
  }

  async fillMetaFields(data: {
    date?: string;
    time?: string;
    place?: string;
    guardian?: string;
  }) {
    if (data.date) await this.dateField.fill(data.date);
    if (data.time) await this.timeField.fill(data.time);
    if (data.place) await this.placeField.fill(data.place);
    if (data.guardian) await this.guardianField.fill(data.guardian);
  }

  // ── Common action buttons ─────────────────────────────────────────────────

  get firstPdfButton(): Locator {
    return this.page.getByRole("button", { name: "Pobierz PDF" }).first();
  }

  get sendEmailButton(): Locator {
    return this.page.getByRole("button", { name: "Wyślij" }).first();
  }

  // ── Toast / status messages ───────────────────────────────────────────────

  get savedLocallyToast(): Locator {
    return this.page.getByText("Formularz zapisano lokalnie.");
  }

  get emailFormErrorBanner(): Locator {
    return this.page.getByText("Popraw formularz przed wysłaniem e-maila.");
  }

  get pdfFormErrorBanner(): Locator {
    return this.page.getByText("Popraw formularz przed wygenerowaniem PDF.");
  }

  // ── localStorage helpers ──────────────────────────────────────────────────

  async getStoredState(): Promise<Record<string, unknown>> {
    return this.page.evaluate(() =>
      JSON.parse(window.localStorage.getItem("situationmap-state-v2") ?? "{}"),
    );
  }
}