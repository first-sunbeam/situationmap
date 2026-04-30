<script setup>
import { computed, ref, watch } from "vue";
import { useFormState } from "../composables/useFormState";
import { incidentStepDefinitions } from "../config/incidentSteps";
import MetaStep from "./incident/MetaStep.vue";
import BaselineStep from "./incident/BaselineStep.vue";
import BeforeStep from "./incident/BeforeStep.vue";
import ExpectationsStep from "./incident/ExpectationsStep.vue";
import SignalsStep from "./incident/SignalsStep.vue";
import ActionsStep from "./incident/ActionsStep.vue";
import BehaviorStep from "./incident/BehaviorStep.vue";
import AfterStep from "./incident/AfterStep.vue";
import RegulationStep from "./incident/RegulationStep.vue";

const steps = incidentStepDefinitions;
const stepComponents = {
  meta: MetaStep,
  baseline: BaselineStep,
  before: BeforeStep,
  expectations: ExpectationsStep,
  signals: SignalsStep,
  actions: ActionsStep,
  behavior: BehaviorStep,
  after: AfterStep,
  regulation: RegulationStep
};

const activeStep = ref(steps[0].id);
const currentStepIndex = computed(() => Math.max(steps.findIndex((step) => step.id === activeStep.value), 0));
const currentStep = computed(() => steps[currentStepIndex.value] ?? steps[0]);
const currentStepComponent = computed(() => stepComponents[currentStep.value.id] ?? MetaStep);
const isFirstStep = computed(() => currentStepIndex.value === 0);
const isLastStep = computed(() => currentStepIndex.value === steps.length - 1);
const progressValue = computed(() => `${((currentStepIndex.value + 1) / steps.length) * 100}%`);

function goToStep(stepId) {
  if (steps.some((step) => step.id === stepId)) activeStep.value = stepId;
}

function nextStep() {
  if (!isLastStep.value) activeStep.value = steps[currentStepIndex.value + 1].id;
}

function previousStep() {
  if (!isFirstStep.value) activeStep.value = steps[currentStepIndex.value - 1].id;
}

function isStepErrored(step) {
  return Boolean(fieldErrors.value[step.errorKey]);
}

function isStepComplete(step) {
  return Boolean(step.isComplete?.(form.value));
}

const { env, form, buildPdf, resetIncident, fieldErrors, validationRequestId } = useFormState();

watch(validationRequestId, () => {
  const nextStepId = steps.find((step) => isStepErrored(step))?.id;
  if (nextStepId) activeStep.value = nextStepId;
});

watch(env, () => {
  activeStep.value = steps[0].id;
});

watch(activeStep, (stepId) => {
  if (!steps.some((step) => step.id === stepId)) activeStep.value = steps[0].id;
});
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>{{ env.incidentTitle }}</h2>
        <p>Przy opisie sytuacji warto zapisać fakty, oznaki przeciążenia, warunki środowiskowe i działania poprzedzające eskalację.</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetIncident">↺ Wyczyść formularz</button>
        <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
      </div>
    </div>

    <div class="stepper">
      <div class="stepper-head">
        <strong>Krok {{ currentStepIndex + 1 }} z {{ steps.length }}</strong>
        <span>{{ currentStep.label }}</span>
      </div>
      <div class="stepper-progress" aria-hidden="true">
        <span class="stepper-progress-bar" :style="{ width: progressValue }"></span>
      </div>
      <div class="stepper-list" aria-label="Postęp formularza rozszerzonego">
        <button
          v-for="(step, index) in steps"
          :key="step.id"
          type="button"
          class="stepper-button"
          :class="{
            active: activeStep === step.id,
            error: isStepErrored(step),
            complete: isStepComplete(step) && !isStepErrored(step)
          }"
          :aria-current="activeStep === step.id ? 'step' : undefined"
          @click="goToStep(step.id)"
        >
          <span>{{ isStepComplete(step) && !isStepErrored(step) ? '✓' : index + 1 }}</span>
          <small>{{ step.label }}</small>
        </button>
      </div>
      <label class="stepper-mobile">
        <span class="field-label">Przejdź do kroku</span>
        <select class="text-input" v-model="activeStep">
          <option v-for="(step, index) in steps" :key="step.id" :value="step.id">{{ index + 1 }}. {{ step.label }}</option>
        </select>
      </label>
    </div>

    <div class="sections">
      <component :is="currentStepComponent" />
    </div>

    <div class="section-nav" :class="{ single: isFirstStep || isLastStep }">
      <button v-if="!isFirstStep" class="secondary-button" type="button" @click="previousStep">← Poprzedni krok</button>
      <button v-if="!isLastStep" class="secondary-button" type="button" @click="nextStep">Następny krok →</button>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="buildPdf('open')">↗ Podgląd</button>
      <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
    </div>
  </section>
</template>
