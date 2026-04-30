<script setup>
import { computed, ref, watch } from "vue";
import { useFormState } from "../composables/useFormState";
import MetaStep from "./incident/MetaStep.vue";
import BaselineStep from "./incident/BaselineStep.vue";
import BeforeStep from "./incident/BeforeStep.vue";
import ExpectationsStep from "./incident/ExpectationsStep.vue";
import SignalsStep from "./incident/SignalsStep.vue";
import ActionsStep from "./incident/ActionsStep.vue";
import BehaviorStep from "./incident/BehaviorStep.vue";
import AfterStep from "./incident/AfterStep.vue";
import RegulationStep from "./incident/RegulationStep.vue";

const steps = [
  { id: "meta", label: "Dane podstawowe" },
  { id: "baseline", label: "Kontekst dnia" },
  { id: "before", label: "Przed zdarzeniem" },
  { id: "expectations", label: "Czego oczekiwano" },
  { id: "signals", label: "Sygnały" },
  { id: "actions", label: "Działania" },
  { id: "behavior", label: "Opis zachowania" },
  { id: "after", label: "Po zdarzeniu" },
  { id: "regulation", label: "Regulacja i wpływ" }
];

const activeStep = ref(steps[0].id);
const currentStepIndex = computed(() => steps.findIndex((step) => step.id === activeStep.value));
const currentStep = computed(() => steps[currentStepIndex.value]);
const isFirstStep = computed(() => currentStepIndex.value === 0);
const isLastStep = computed(() => currentStepIndex.value === steps.length - 1);

function goToStep(stepId) {
  activeStep.value = stepId;
}

function nextStep() {
  if (!isLastStep.value) activeStep.value = steps[currentStepIndex.value + 1].id;
}

function previousStep() {
  if (!isFirstStep.value) activeStep.value = steps[currentStepIndex.value - 1].id;
}

const { env, buildPdf, resetIncident, fieldErrors, validationRequestId } = useFormState();

const stepErrorMap = {
  meta: "meta.date",
  baseline: "incident.baselineSection",
  before: "incident.beforeSection",
  expectations: "incident.expectationsSection",
  signals: "incident.signalsSection",
  actions: "incident.actionsSection",
  behavior: "incident.behaviorSection",
  after: "incident.afterSection",
  regulation: "incident.regulationSection"
};

watch(validationRequestId, () => {
  const nextStepId = steps.find((step) => fieldErrors.value[stepErrorMap[step.id]])?.id;
  if (nextStepId) activeStep.value = nextStepId;
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
      <div class="stepper-list" aria-label="Postęp formularza rozszerzonego">
        <button
          v-for="(step, index) in steps"
          :key="step.id"
          type="button"
          class="stepper-button"
          :class="{ active: activeStep === step.id }"
          @click="goToStep(step.id)"
        >
          <span>{{ index + 1 }}</span>
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
      <MetaStep v-show="activeStep === 'meta'" />
      <BaselineStep v-show="activeStep === 'baseline'" />
      <BeforeStep v-show="activeStep === 'before'" />
      <ExpectationsStep v-show="activeStep === 'expectations'" />
      <SignalsStep v-show="activeStep === 'signals'" />
      <ActionsStep v-show="activeStep === 'actions'" />
      <BehaviorStep v-show="activeStep === 'behavior'" />
      <AfterStep v-show="activeStep === 'after'" />
      <RegulationStep v-show="activeStep === 'regulation'" />
    </div>

    <div class="section-nav">
      <button v-if="!isFirstStep" class="secondary-button" type="button" @click="previousStep">← Poprzedni krok</button>
      <button v-if="!isLastStep" class="secondary-button" type="button" @click="nextStep">Następny krok →</button>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="buildPdf('open')">↗ Podgląd</button>
      <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
    </div>
  </section>
</template>
