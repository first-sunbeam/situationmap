<script setup lang="ts">
import type { IncidentStepDefinition } from "../../config/incidentSteps";

const activeStep = defineModel<string>({ required: true });

defineProps<{
  steps: IncidentStepDefinition[];
  currentStep: IncidentStepDefinition;
  progressValue: string;
  isStepErrored: (step: IncidentStepDefinition) => boolean;
  isStepComplete: (step: IncidentStepDefinition) => boolean;
}>();

function goToStep(stepId: string) {
  activeStep.value = stepId;
}
</script>

<template>
  <div class="stepper">
    <div class="stepper-head">
      <strong>Aktualna sekcja: {{ currentStep.badge }}</strong>
      <span>{{ currentStep.label }}</span>
    </div>
    <div class="stepper-progress" aria-hidden="true">
      <span class="stepper-progress-bar" :style="{ width: progressValue }"></span>
    </div>
    <div class="stepper-list" aria-label="Postęp formularza rozszerzonego">
      <button
        v-for="step in steps"
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
        <span>{{ isStepComplete(step) && !isStepErrored(step) ? '✓' : step.badge }}</span>
        <small>{{ step.label }}</small>
      </button>
    </div>
    <label class="stepper-mobile">
      <span class="field-label">Przejdź do kroku</span>
      <select class="text-input" v-model="activeStep">
        <option v-for="step in steps" :key="step.id" :value="step.id">{{ step.badge }}. {{ step.label }}</option>
      </select>
    </label>
  </div>
</template>
