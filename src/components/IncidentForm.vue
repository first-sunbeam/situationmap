<script setup lang="ts">
import { computed, ref, watch, type Component } from "vue";
import { useFormState } from "../composables/useFormState";
import { incidentStepDefinitions, type IncidentStepDefinition } from "../config/incidentSteps";
import MetaStep from "./incident/MetaStep.vue";
import BaselineStep from "./incident/BaselineStep.vue";
import BeforeStep from "./incident/BeforeStep.vue";
import ExpectationsStep from "./incident/ExpectationsStep.vue";
import SignalsStep from "./incident/SignalsStep.vue";
import ActionsStep from "./incident/ActionsStep.vue";
import BehaviorStep from "./incident/BehaviorStep.vue";
import AfterStep from "./incident/AfterStep.vue";
import RegulationStep from "./incident/RegulationStep.vue";
import IncidentStepper from "./incident/IncidentStepper.vue";

const steps = [
  { ...incidentStepDefinitions[0], component: MetaStep },
  { ...incidentStepDefinitions[1], component: BaselineStep },
  { ...incidentStepDefinitions[2], component: BeforeStep },
  { ...incidentStepDefinitions[3], component: ExpectationsStep },
  { ...incidentStepDefinitions[4], component: SignalsStep },
  { ...incidentStepDefinitions[5], component: ActionsStep },
  { ...incidentStepDefinitions[6], component: BehaviorStep },
  { ...incidentStepDefinitions[7], component: AfterStep },
  { ...incidentStepDefinitions[8], component: RegulationStep }
] satisfies Array<IncidentStepDefinition & { component: Component }>;

const { env, form, buildPdf, resetIncident, fieldErrors, validationRequestId } = useFormState();

const activeStep = ref(steps[0].id);
const currentStepIndex = computed(() => steps.findIndex((step) => step.id === activeStep.value));
const currentStep = computed(() => steps[currentStepIndex.value]);
const isFirstStep = computed(() => currentStepIndex.value === 0);
const isLastStep = computed(() => currentStepIndex.value === steps.length - 1);
const progressValue = computed(() => `${((currentStepIndex.value + 1) / steps.length) * 100}%`);

function nextStep() {
  if (!isLastStep.value) activeStep.value = steps[currentStepIndex.value + 1].id;
}

function previousStep() {
  if (!isFirstStep.value) activeStep.value = steps[currentStepIndex.value - 1].id;
}

function isStepErrored(step: IncidentStepDefinition) {
  return step.errorKeys.some((key) => Boolean(fieldErrors.value[key]));
}

function isStepComplete(step: IncidentStepDefinition) {
  return step.isComplete(form.value);
}

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

    <IncidentStepper
      v-model="activeStep"
      :steps="steps"
      :current-step="currentStep"
      :progress-value="progressValue"
      :is-step-errored="isStepErrored"
      :is-step-complete="isStepComplete"
    />

    <div class="sections">
      <component :is="currentStep.component" />
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
