import { type Page, type Locator } from "@playwright/test";

// ── Step names ────────────────────────────────────────────────────────────────
// Single source of truth for stepper button labels used both in navigation
// and in assertions. Update here if the UI copy changes.

export const EXTENDED_STEPS = {
  meta: "Dane podstawowe",
  baseline: "0. Poziom bazowy i kontekst dnia",
  before: "1. Bezpośrednio przed zdarzeniem",
  expectations: "2. Czego oczekiwano w tym momencie?",
} as const;

type StepKey = keyof typeof EXTENDED_STEPS;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export class ExtendedFormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Stepper buttons ───────────────────────────────────────────────────────

  stepperButton(step: StepKey): Locator {
    return this.page.getByRole("button", {
      name: new RegExp(escapeRegExp(EXTENDED_STEPS[step])),
    });
  }

  async goToStep(step: StepKey) {
    await this.stepperButton(step).click();
  }

  // ── Navigation buttons ────────────────────────────────────────────────────

  get nextStepButton(): Locator {
    return this.page.getByRole("button", { name: "Następny krok →" });
  }

  get prevStepButton(): Locator {
    return this.page.getByRole("button", { name: "← Poprzedni krok" });
  }

  async goToNextStep() {
    await this.nextStepButton.click();
  }

  async goToPrevStep() {
    await this.prevStepButton.click();
  }

  // ── Current section indicator ─────────────────────────────────────────────

  currentSectionLabel(sectionId: string): Locator {
    return this.page.getByText(`Aktualna sekcja: ${sectionId}`);
  }

  // ── Section headings ──────────────────────────────────────────────────────

  sectionHeading(step: StepKey): Locator {
    return this.page.getByRole("heading", {
      name: new RegExp(escapeRegExp(EXTENDED_STEPS[step])),
    });
  }

  // ── Section containers ────────────────────────────────────────────────────
  // Scoping locators to a section prevents cross-section selector collisions.

  sectionContainer(step: StepKey): Locator {
    return this.page
      .locator("section.section")
      .filter({ has: this.sectionHeading(step) });
  }

  // ── Baseline section (step 0) ─────────────────────────────────────────────

  get baselineOtherCheckbox(): Locator {
    return this.sectionContainer("baseline").getByRole("checkbox", {
      name: "other",
    });
  }

  get baselineOtherDescriptionField(): Locator {
    return this.sectionContainer("baseline").getByLabel(
      "Jeśli inne, wpisz jakie *"
    );
  }

  baselineOtherValidationMessage(scoped = true): Locator {
    const text = "Jeśli zaznaczono „Inne”, opisz tę odpowiedź.";
    return scoped
      ? this.sectionContainer("baseline").getByText(text, { exact: true })
      : this.page.getByText(
          `0. Poziom bazowy i kontekst dnia: ${text}`
        );
  }

  // ── Before-event section (step 1) ─────────────────────────────────────────

  get beforeActivityChangeCheckbox(): Locator {
    return this.sectionContainer("before").getByRole("checkbox", {
      name: "zmiana aktywności",
    });
  }

  get beforeDescriptionField(): Locator {
    return this.sectionContainer("before").getByLabel(
      "Doprecyzowanie tego, co było bezpośrednio przed"
    );
  }

  get beforeValidationMessage(): Locator {
    return this.page.getByText(
      "Bezpośrednio przed zdarzeniem: zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji."
    );
  }

  // ── Meta / basic-data section ─────────────────────────────────────────────

  get metaStepperButton(): Locator {
    return this.stepperButton("meta");
  }
}