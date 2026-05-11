<script setup lang="ts">
import { computed, ref, watch, type Component } from "vue";
import { useFormState } from "../composables/useFormState";
import { getIncidentStepDefinitions, type IncidentStepDefinition } from "../config/incidentSteps";
import MetaStep from "./incident/MetaStep.vue";
import BaselineStep from "./incident/BaselineStep.vue";
import BeforeStep from "./incident/BeforeStep.vue";
import ExpectationsStep from "./incident/ExpectationsStep.vue";
import SignalsStep from "./incident/SignalsStep.vue";
import MaskingStep from "./incident/MaskingStep.vue";
import ActionsStep from "./incident/ActionsStep.vue";
import BehaviorStep from "./incident/BehaviorStep.vue";
import AfterStep from "./incident/AfterStep.vue";
import RegulationStep from "./incident/RegulationStep.vue";
import IncidentStepper from "./incident/IncidentStepper.vue";
import SvgIcon from "./ui/SvgIcon.vue";

const stepComponents = [MetaStep, BaselineStep, BeforeStep, ExpectationsStep, SignalsStep, MaskingStep, ActionsStep, BehaviorStep, RegulationStep, AfterStep] satisfies Component[];

const { env, labels, form, buildPdf, resetIncident, fieldErrors, validationRequestId } = useFormState();

const steps = computed(() => getIncidentStepDefinitions(labels.value).map((step, index) => ({
  ...step,
  component: stepComponents[index]
})) satisfies Array<IncidentStepDefinition & { component: Component }>);

const activeStep = ref("meta");
const currentStepIndex = computed(() => steps.value.findIndex((step) => step.id === activeStep.value));
const currentStep = computed(() => steps.value[currentStepIndex.value]);
const isFirstStep = computed(() => currentStepIndex.value === 0);
const isLastStep = computed(() => currentStepIndex.value === steps.value.length - 1);
const progressValue = computed(() => `${((currentStepIndex.value + 1) / steps.value.length) * 100}%`);

function nextStep() {
  if (!isLastStep.value) activeStep.value = steps.value[currentStepIndex.value + 1].id;
}

function previousStep() {
  if (!isFirstStep.value) activeStep.value = steps.value[currentStepIndex.value - 1].id;
}

function isStepErrored(step: IncidentStepDefinition) {
  return step.errorKeys.some((key) => Boolean(fieldErrors.value[key]));
}

function isStepComplete(step: IncidentStepDefinition) {
  return step.isComplete(form.value);
}

watch(validationRequestId, () => {
  const nextStepId = steps.value.find((step) => isStepErrored(step))?.id;
  if (nextStepId) activeStep.value = nextStepId;
});

watch(env, () => {
  activeStep.value = steps.value[0].id;
});

watch(activeStep, (stepId) => {
  if (!steps.value.some((step) => step.id === stepId)) activeStep.value = steps.value[0].id;
});
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>{{ env.incidentTitle }}</h2>
        <p>{{ labels.ui.incidentIntro }}</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetIncident"><SvgIcon name="reset" /> {{ labels.ui.resetForm }}</button>
        <button class="primary-button" @click="buildPdf('download')"><SvgIcon name="download" /> {{ labels.ui.downloadPdf }}</button>
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
      <button v-if="!isFirstStep" class="secondary-button" type="button" @click="previousStep"><SvgIcon name="arrow-left" /> {{ labels.ui.previousStep }}</button>
      <button v-if="!isLastStep" class="secondary-button" type="button" @click="nextStep">{{ labels.ui.nextStep }} <SvgIcon name="arrow-right" /></button>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="buildPdf('open')"><SvgIcon name="external" /> {{ labels.ui.preview }}</button>
      <button class="primary-button" @click="buildPdf('download')"><SvgIcon name="download" /> {{ labels.ui.downloadPdf }}</button>
    </div>
  </section>
</template>
