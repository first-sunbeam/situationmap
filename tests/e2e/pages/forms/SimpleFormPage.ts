import { type Page, type Locator } from "@playwright/test";

export const SIMPLE_VALIDATION_MESSAGES = {
  date: "Dane podstawowe: uzupełnij pole data.",
  time: "Dane podstawowe: uzupełnij pole godzina.",
  place: "Dane podstawowe: uzupełnij pole miejsce.",
  description: "Formularz prosty: uzupełnij krótki opis sytuacji.",
  helped:
    "Formularz prosty: uzupełnij pole „Co pomogło obniżyć napięcie lub uspokoić sytuację?”.",
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

  get descriptionField(): Locator {
    return this.page.getByLabel("Krótki opis sytuacji");
  }

  get helpedField(): Locator {
    return this.page.getByLabel(
      "Co pomogło obniżyć napięcie lub uspokoić sytuację?"
    );
  }

  get otherPeopleField(): Locator {
    return this.page.getByLabel("Inne osoby obecne");
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
    description: string;
    helped: string;
  }) {
    await this.page.getByLabel("Data").fill(data.date);
    await this.page.getByLabel("Godzina").fill(data.time);
    await this.page.getByLabel("Miejsce").fill(data.place);
    await this.page.getByLabel("Rodzic / opiekun prowadzący").fill(data.guardian);
    await this.descriptionField.fill(data.description);
    await this.helpedField.fill(data.helped);
  }
}