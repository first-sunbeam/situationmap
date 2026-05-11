<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import type { IncidentStepDefinition } from "../../config/incidentSteps";
import SvgIcon from "../ui/SvgIcon.vue";

const activeStep = defineModel<string>({ required: true });

const { labels } = useFormState();

const props = defineProps<{
  steps: IncidentStepDefinition[];
  currentStep: IncidentStepDefinition;
  progressValue: string;
  isStepErrored: (step: IncidentStepDefinition) => boolean;
  isStepComplete: (step: IncidentStepDefinition) => boolean;
}>();

type StepStatus = "active" | "error" | "complete" | "default";

function stepStatus(step: IncidentStepDefinition): StepStatus {
  if (activeStep.value === step.id) return "active";
  if (props.isStepErrored(step)) return "error";
  if (props.isStepComplete(step)) return "complete";
  return "default";
}

function goToStep(stepId: string) {
  activeStep.value = stepId;
}
</script>

<template>
  <div class="stepper">
    <div class="stepper-head">
      <strong>{{ labels.ui.currentSection }}: {{ currentStep.badge }}</strong>
      <span>{{ currentStep.label }}</span>
    </div>
    <div class="stepper-progress" aria-hidden="true">
      <span class="stepper-progress-bar" :style="{ width: progressValue }"></span>
    </div>
    <div class="stepper-list" :aria-label="labels.ui.stepperProgress">
      <button
        v-for="step in steps"
        :key="step.id"
        type="button"
        class="stepper-button"
        :class="stepStatus(step)"
        :aria-current="activeStep === step.id ? 'step' : undefined"
        @click="goToStep(step.id)"
      >
        <span>
          <SvgIcon v-if="stepStatus(step) === 'complete'" name="check" />
          <template v-else>{{ step.badge }}</template>
        </span>
        <small>{{ step.label }}</small>
      </button>
    </div>
    <label class="stepper-mobile">
      <span class="field-label">{{ labels.ui.goToStep }}</span>
      <select class="text-input" v-model="activeStep">
        <option v-for="step in steps" :key="step.id" :value="step.id">{{ step.badge }}. {{ step.label }}</option>
      </select>
    </label>
  </div>
</template>
