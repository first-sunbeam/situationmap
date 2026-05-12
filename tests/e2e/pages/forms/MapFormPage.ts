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

  get preferredPlaceCheckbox(): Locator {
    return this.page
      .getByRole("group", { name: /W jakich miejscach osoba/ })
      .getByRole("checkbox", { name: "pokój osoby" });
  }

  get noiseCheckbox(): Locator {
    return this.page.getByRole("checkbox", { name: "hałas" });
  }

  get dependsDescriptionField(): Locator {
    return this.page.getByLabel("Jak zmienia się zachowanie?");
  }

  get noAggressionSelect(): Locator {
    return this.page.getByLabel("Czy są sytuacje bez agresji?");
  }

  // ── Compound actions ──────────────────────────────────────────────────────

  async fillMapFields(data: {
    preferredPlace?: string;
    noise?: boolean;
    dependsDescription: string;
    noAggression: string;
  }) {
    await this.preferredPlaceCheckbox.check();
    if (data.noise) await this.noiseCheckbox.check();
    await this.dependsDescriptionField.fill(data.dependsDescription);
    await this.noAggressionSelect.selectOption(data.noAggression);
  }
}
