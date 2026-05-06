import { type Page, type Locator } from "@playwright/test";

export const SIMPLE_VALIDATION_MESSAGES = {
  date: "Dane podstawowe: uzupełnij pole data.",
  time: "Dane podstawowe: uzupełnij pole godzina.",
  place: "Dane podstawowe: uzupełnij pole miejsce.",
  behavior:
    "Formularz prosty: uzupełnij pole „Jaki był przebieg sytuacji i co można było zaobserwować?”.",
  helped:
    "Formularz prosty: uzupełnij pole „Co pomogło obniżyć napięcie lub wyregulować sytuację?”.",
  notes:
    "Formularz prosty: uzupełnij pole „Na co dziecko/uczeń miało wpływ, a na co nie?”.",
} as const;

export class SimpleFormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Headings ──────────────────────────────────────────────────────────────

  get mainHeading(): Locator {
    return this.page.getByRole("heading", {
      name: /Wypełnij formularz dla środowiska: Dom/,
    });
  }

  get formHeading(): Locator {
    return this.page.getByRole("heading", { name: "Formularz prosty - Dom" });
  }

  // ── Fields ────────────────────────────────────────────────────────────────

  get behaviorField(): Locator {
    return this.page.getByLabel(
      "Jaki był przebieg sytuacji i co można było zaobserwować?"
    );
  }

  get helpedField(): Locator {
    return this.page.getByLabel(
      "Co pomogło obniżyć napięcie lub wyregulować sytuację?"
    );
  }

  get otherPeopleField(): Locator {
    return this.page.getByLabel("Inne osoby obecne");
  }

  get influenceField(): Locator {
    return this.page.getByLabel("Na co dziecko/uczeń miało wpływ, a na co nie?");
  }

  // ── Validation messages ───────────────────────────────────────────────────

  validationMessage(key: keyof typeof SIMPLE_VALIDATION_MESSAGES): Locator {
    return this.page.getByText(SIMPLE_VALIDATION_MESSAGES[key]);
  }

  get allValidationMessages(): Locator[] {
    return (
      Object.keys(SIMPLE_VALIDATION_MESSAGES) as Array<
        keyof typeof SIMPLE_VALIDATION_MESSAGES
      >
    ).map((key) => this.validationMessage(key));
  }

  // ── Compound actions ──────────────────────────────────────────────────────

  async fillAllRequiredFields(data: {
    date: string;
    time: string;
    place: string;
    guardian: string;
    behavior: string;
    helped: string;
    influence: string;
  }) {
    await this.page.getByLabel("Data").fill(data.date);
    await this.page.getByLabel("Godzina").fill(data.time);
    await this.page.getByLabel("Miejsce").fill(data.place);
    await this.page.getByLabel("Rodzic / opiekun prowadzący").fill(data.guardian);
    await this.behaviorField.fill(data.behavior);
    await this.helpedField.fill(data.helped);
    await this.influenceField.fill(data.influence);
  }
}