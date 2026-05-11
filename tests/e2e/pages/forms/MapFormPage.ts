import { type Page, type Locator } from "@playwright/test";

export class MapFormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Heading ───────────────────────────────────────────────────────────────

  get mapHeading(): Locator {
    return this.page.getByRole("heading", {
      level: 2,
      name: "MAPA ŚRODOWISKA DOMOWEGO",
    });
  }

  // ── Fields ────────────────────────────────────────────────────────────────

  get preferredPlaceField(): Locator {
    return this.page.getByLabel("Chętnie przebywa w *");
  }

  get noiseCheckbox(): Locator {
    return this.page.getByRole("checkbox", { name: "hałas" });
  }

  get dependsDescriptionField(): Locator {
    return this.page.getByLabel("Opis zależności");
  }

  get noAggressionSelect(): Locator {
    return this.page.getByLabel("Czy są sytuacje bez agresji?");
  }

  // ── Compound actions ──────────────────────────────────────────────────────

  async fillMapFields(data: {
    preferredPlace: string;
    noise?: boolean;
    dependsDescription: string;
    noAggression: string;
  }) {
    await this.preferredPlaceField.fill(data.preferredPlace);
    if (data.noise) await this.noiseCheckbox.check();
    await this.dependsDescriptionField.fill(data.dependsDescription);
    await this.noAggressionSelect.selectOption(data.noAggression);
  }
}
