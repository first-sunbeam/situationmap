import { expect, test } from "@playwright/test";
import { SituationMapPage } from "../pages/SituationMapPage";
import {
  SimpleFormPage,
  SIMPLE_VALIDATION_MESSAGES,
} from "../pages/forms/SimpleFormPage";
import { ExtendedFormPage } from "../pages/forms/ExtendedFormPage";
import { MapFormPage } from "../pages/forms/MapFormPage";

// ── Shared fixtures ───────────────────────────────────────────────────────────

const DEFAULT_META = {
  date: "2026-05-02",
  time: "12:30",
  place: "Dom",
  guardian: "Jan Kowalski",
};

const DEFAULT_SIMPLE_FIELDS = {
  ...DEFAULT_META,
  behavior: "Dziecko zaprotestowało po zakończeniu ulubionej aktywności.",
  helped: "Cisza, krótszy komunikat i kilka minut przerwy.",
  influence: "Mogło wybrać kolejność, ale zakończenie aktywności było narzucone.",
};

// ── Hooks ─────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  const app = new SituationMapPage(page);
  await app.goto();
  await app.clearStorage();
  await app.goto();
});

// ── Theme ─────────────────────────────────────────────────────────────────────

test("switches to dark theme and remembers it", async ({ page }) => {
  const app = new SituationMapPage(page);
  await app.goto();

  await app.switchToDarkTheme();

  await expect(app.htmlElement).toHaveAttribute("data-theme", "dark");
  await expect(app.enableLightThemeButton).toBeVisible();

  await page.reload();

  await expect(app.htmlElement).toHaveAttribute("data-theme", "dark");
  await expect(app.enableLightThemeButton).toBeVisible();
});

// ── Simple form – validation ──────────────────────────────────────────────────

test("simple form blocks email without required data and clears errors after fixing them", async ({
  page,
}) => {
  const app = new SituationMapPage(page);
  const form = new SimpleFormPage(page);

  await expect(page).toHaveTitle("SituationMap");
  await expect(form.mainHeading).toBeVisible();
  await expect(form.formHeading).toBeVisible();

  await app.sendEmailButton.click();

  await expect(app.emailFormErrorBanner).toBeVisible();
  for (const msg of form.allValidationMessages) {
    await expect(msg).toBeVisible();
  }

  await form.fillAllRequiredFields(DEFAULT_SIMPLE_FIELDS);

  await expect(app.emailFormErrorBanner).not.toBeVisible();
  for (const msg of form.allValidationMessages) {
    await expect(msg).not.toBeVisible();
  }
});

test("simple form blocks PDF download without required data", async ({
  page,
}) => {
  const app = new SituationMapPage(page);
  const form = new SimpleFormPage(page);

  await app.firstPdfButton.click();

  await expect(app.pdfFormErrorBanner).toBeVisible();
  for (const msg of form.allValidationMessages) {
    await expect(msg).toBeVisible();
  }
});

// ── Simple form – local storage ───────────────────────────────────────────────

test("local storage restores simple-form data after page reload", async ({
  page,
}) => {
  const app = new SituationMapPage(page);
  const form = new SimpleFormPage(page);

  await app.fillMetaFields(DEFAULT_META);
  await form.otherPeopleField.fill("Mama, tata");
  await form.behaviorField.fill("Protest i odmowa przejścia do kolejnej aktywności.");
  await form.helpedField.fill("Przerwa i spokojne miejsce.");
  await form.influenceField.fill("Mogło wybrać kolejność, ale zakończenie aktywności było narzucone.");

  await expect(app.savedLocallyToast).toBeVisible();
  await page.reload();

  await expect(form.formHeading).toBeVisible();
  await expect(app.dateField).toHaveValue(DEFAULT_META.date);
  await expect(app.timeField).toHaveValue(DEFAULT_META.time);
  await expect(app.placeField).toHaveValue(DEFAULT_META.place);
  await expect(app.guardianField).toHaveValue(DEFAULT_META.guardian);
  await expect(form.otherPeopleField).toHaveValue("Mama, tata");
  await expect(form.behaviorField).toHaveValue(
    "Protest i odmowa przejścia do kolejnej aktywności.",
  );
});

// ── Simple form – reset ─────────────────────────────────────────────────────

test("simple-form reset clears filled data and local storage", async ({
  page,
}) => {
  const app = new SituationMapPage(page);
  const form = new SimpleFormPage(page);

  await form.fillAllRequiredFields(DEFAULT_SIMPLE_FIELDS);
  await form.otherPeopleField.fill("Mama, tata");
  await expect(app.savedLocallyToast).toBeVisible();

  await app.firstResetButton.click();

  await expect(app.dateField).toHaveValue("");
  await expect(app.timeField).toHaveValue("");
  await expect(app.placeField).toHaveValue("");
  await expect(app.guardianField).toHaveValue("");
  await expect(form.otherPeopleField).toHaveValue("");
  await expect(form.behaviorField).toHaveValue("");
  await expect(form.helpedField).toHaveValue("");
  await expect(form.influenceField).toHaveValue("");

  await page.reload();

  await expect(form.formHeading).toBeVisible();
  await expect(app.dateField).toHaveValue("");
  await expect(form.behaviorField).toHaveValue("");
});

// ── Extended form – local storage ────────────────────────────────────────────

test("local storage restores extended mode and environment-map data after page reload", async ({
  page,
}) => {
  const app = new SituationMapPage(page);
  const mapForm = new MapFormPage(page);

  await app.switchToExtendedVariant();
  await app.switchToMapMode();
  await mapForm.fillMapFields({
    preferredPlace: "Pokój wyciszenia",
    noise: true,
    dependsDescription: "Przy większym hałasie szybciej narasta napięcie.",
    noAggression: "yes",
  });

  await expect(app.savedLocallyToast).toBeVisible();

  const stored = await app.getStoredState();
  const homeMap = (stored as any).forms?.home?.map;
  expect((stored as any).activeVariant).toBe("extended");
  expect((stored as any).activeMode).toBe("map");
  expect(homeMap?.preferredPlaces).toContain("pokoj_dziecka");
  expect(homeMap?.dependsOn).toContain("halas");
  expect(homeMap?.dependsDescription).toBe(
    "Przy większym hałasie szybciej narasta napięcie.",
  );
  expect(homeMap?.noAggression).toBe("yes");

  await page.reload();

  await expect(mapForm.mapHeading).toBeVisible();
  await expect(mapForm.preferredPlaceCheckbox).toBeChecked();
  await expect(mapForm.noiseCheckbox).toBeChecked();
  await expect(mapForm.dependsDescriptionField).toHaveValue(
    "Przy większym hałasie szybciej narasta napięcie.",
  );
  await expect(mapForm.noAggressionSelect).toHaveValue("yes");
});

// ── Extended form – stepper ───────────────────────────────────────────────────

test("basic-data section is complete only after all required fields are filled", async ({
  page,
}) => {
  const app = new SituationMapPage(page);
  const extended = new ExtendedFormPage(page);

  await app.switchToExtendedVariant();

  await expect(extended.metaStepperButton).toBeVisible();

  await app.dateField.fill(DEFAULT_META.date);
  await expect(extended.metaStepperButton).toHaveText(/M/);
  await expect(extended.metaStepperButton).not.toHaveText(/✓/);

  await app.timeField.fill(DEFAULT_META.time);
  await app.placeField.fill(DEFAULT_META.place);
  await app.guardianField.fill(DEFAULT_META.guardian);
  await extended.goToNextStep();

  await expect(extended.metaStepperButton).toHaveClass(/complete/);
});

test("allows switching extended-form steps with navigation buttons and the stepper", async ({
  page,
}) => {
  const app = new SituationMapPage(page);
  const extended = new ExtendedFormPage(page);

  await app.switchToExtendedVariant();

  await expect(extended.currentSectionLabel("M")).toBeVisible();
  await expect(extended.sectionHeading("meta")).toBeVisible();
  await expect(extended.nextStepButton).toBeVisible();
  await expect(extended.prevStepButton).not.toBeVisible();

  await extended.goToNextStep();

  await expect(extended.currentSectionLabel("0")).toBeVisible();
  await expect(extended.sectionHeading("baseline")).toBeVisible();
  await expect(extended.prevStepButton).toBeVisible();

  await extended.goToPrevStep();

  await expect(extended.currentSectionLabel("M")).toBeVisible();
  await expect(extended.sectionHeading("meta")).toBeVisible();

  await extended.goToStep("expectations");

  await expect(extended.currentSectionLabel("2")).toBeVisible();
  await expect(extended.sectionHeading("expectations")).toBeVisible();
});

test("extended form navigates to the first invalid basic-data section after failed PDF generation", async ({
  page,
}) => {
  const app = new SituationMapPage(page);
  const extended = new ExtendedFormPage(page);

  await app.switchToExtendedVariant();
  await extended.goToStep("before");
  await expect(extended.sectionHeading("before")).toBeVisible();

  await app.firstPdfButton.click();

  await expect(app.pdfFormErrorBanner).toBeVisible();
  await expect(extended.sectionHeading("meta")).toBeVisible();
  await expect(page.getByText(SIMPLE_VALIDATION_MESSAGES.date)).toBeVisible();
  await expect(page.getByText(SIMPLE_VALIDATION_MESSAGES.time)).toBeVisible();
  await expect(page.getByText(SIMPLE_VALIDATION_MESSAGES.place)).toBeVisible();
});

// ── Extended form – "other" option ─────────────────────────────────────────────

test("other option requires a description and marks the step as invalid", async ({ page }) => {
  const app = new SituationMapPage(page);
  const extended = new ExtendedFormPage(page);

  await app.switchToExtendedVariant();
  await app.fillMetaFields(DEFAULT_META);
  await extended.goToStep("baseline");

  await extended.baselineOtherCheckbox.check();
  await expect(extended.stepperButton("baseline")).not.toHaveText(/✓/);

  await app.firstPdfButton.click();

  await expect(extended.baselineOtherValidationMessage(true)).toBeVisible();
  await extended.goToStep("before");
  await expect(extended.stepperButton("baseline")).toHaveClass(/error/);
  await extended.goToStep("baseline");

  await extended.baselineOtherDescriptionField.fill(
    "Inny czynnik obciążający.",
  );

  await expect(
    extended.baselineOtherValidationMessage(false),
  ).not.toBeVisible();
  await expect(extended.baselineOtherValidationMessage(true)).not.toBeVisible();
  await expect(extended.stepperButton("baseline")).not.toHaveClass(/error/);
});

// ── Extended form – masking section ──────────────────────────────────────────

test("section 3B shows an additional duration select after choosing Yes", async ({
  page,
}) => {
  const app = new SituationMapPage(page);
  const extended = new ExtendedFormPage(page);

  await app.switchToExtendedVariant();
  await extended.goToStep("masking");

  await expect(extended.sectionHeading("masking")).toBeVisible();
  await expect(extended.maskingDurationSelect).not.toBeVisible();

  await extended.maskingContinuedSelect.selectOption("yes");

  await expect(extended.maskingDurationSelect).toBeVisible();
});

// ── Extended form – before-event section ─────────────────────────────────────

test("before-event section clears the error after alternative data is filled and preserves state between steps", async ({
  page,
}) => {
  const app = new SituationMapPage(page);
  const extended = new ExtendedFormPage(page);

  await app.switchToExtendedVariant();
  await app.fillMetaFields(DEFAULT_META);
  await extended.goToStep("before");

  await app.firstPdfButton.click();
  await expect(extended.beforeValidationMessage).toBeVisible();

  await extended.goToStep("before");

  await extended.beforeActivityChangeCheckbox.check();
  await extended.beforeDescriptionField.fill(
    "Odmówiono zakończenia aktywności i przejścia do kolejnego zadania.",
  );

  await expect(extended.beforeValidationMessage).not.toBeVisible();
  await expect(extended.beforeActivityChangeCheckbox).toBeChecked();
  await expect(extended.beforeDescriptionField).toHaveValue(
    "Odmówiono zakończenia aktywności i przejścia do kolejnego zadania.",
  );

  // Verify state persists after navigating away and back
  await extended.goToStep("expectations");
  await extended.goToStep("before");

  await expect(extended.beforeActivityChangeCheckbox).toBeChecked();
  await expect(extended.beforeDescriptionField).toHaveValue(
    "Odmówiono zakończenia aktywności i przejścia do kolejnego zadania.",
  );
});