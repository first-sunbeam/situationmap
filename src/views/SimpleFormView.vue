<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useFormState } from "../composables/useFormState";
import { getSubjectInline } from "../lib/subject";
import LabelText from "../components/form/LabelText.vue";
import MetaFields from "../components/form/MetaFields.vue";
import SelectField from "../components/form/SelectField.vue";
import TextAreaField from "../components/form/TextAreaField.vue";
import SvgIcon from "../components/ui/SvgIcon.vue";

const { env, envLabel, envLead, form, labels, sendEmail, buildPdf, resetSimple, fieldErrors, activeVariant } = useFormState();
const subject = computed(() =>
  getSubjectInline(
    form.value,
    labels.value.map.section === "Environment map" ? "the person" : "osoby",
  ),
);
const readinessOptions = [
  "5_minut",
  "10_30_minut",
  "1_2_godziny",
  "kilka_godzin_lub_nastepnego_dnia",
];

watchEffect(() => {
  activeVariant.value = "simple";
});
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>{{ labels.ui.simpleVariant }} - {{ envLabel }}</h2>
        <p>{{ labels.ui.simpleIntro }}</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetSimple"><SvgIcon name="reset" /> {{ labels.ui.resetForm }}</button>
        <button class="secondary-button" @click="buildPdf('download')"><SvgIcon name="download" /> {{ labels.ui.downloadPdf }}</button>
        <button class="primary-button" @click="sendEmail"><SvgIcon name="email" /> {{ labels.ui.send }}</button>
      </div>
    </div>

    <div class="sections">
      <section class="section">
        <h3>{{ labels.meta.section }}</h3>
        <MetaFields :env="env" :form="form" :field-errors="fieldErrors" :lead-label="envLead" />
      </section>

      <section class="section">
        <h3>{{ labels.simple.section }}</h3>
        <div class="field-grid">
          <div class="simple-question-heading full">
            <h4 class="field-label"><LabelText :text="`${labels.ui.simpleStateQuestion} ${subject}?`" /></h4>
            <p class="field-hint">{{ labels.ui.simpleStateHint }}</p>
          </div>
          <TextAreaField
            v-model="form.simple.stateBefore"
            :label="labels.simple.stateBefore"
            :hint="labels.ui.simpleStateBeforeHint"
          />
          <TextAreaField
            v-model="form.simple.antecedents"
            :label="labels.simple.beforeLastMinutes"
            :hint="labels.ui.simpleBeforeHint"
          />
          <div class="simple-question-heading full">
            <h4 class="field-label">{{ labels.simple.signals }}</h4>
            <p class="field-hint">{{ labels.ui.simpleSignalsHint }}</p>
          </div>
          <TextAreaField
            v-model="form.simple.signals"
            :label="labels.simple.signalsObserved"
            :hint="labels.ui.simpleSignalsObservedHint"
          />
          <TextAreaField
            v-model="form.simple.interventions"
            :label="labels.simple.adultReaction"
            :hint="labels.ui.simpleAdultReactionHint"
          />
          <TextAreaField
            v-model="form.simple.behavior"
            :label="labels.simple.behavior"
            :hint="labels.ui.simpleBehaviorHint"
            required
            :error="fieldErrors['simple.behavior']"
          />
          <TextAreaField
            v-model="form.simple.helped"
            :label="labels.simple.helped"
            :hint="labels.ui.simpleHelpedHint"
            required
            :error="fieldErrors['simple.helped']"
          />
          <div class="simple-question-heading full">
            <h4 class="field-label"><LabelText :text="`${labels.ui.simpleAutonomyQuestion} ${subject}`" /></h4>
            <p class="field-hint">{{ labels.ui.simpleAutonomyHint }}</p>
          </div>
          <TextAreaField
            v-model="form.simple.notes"
            :label="`${labels.ui.decisionPossibilityFor} ${subject}`"
            :hint="labels.ui.simpleNotesHint"
            required
            :error="fieldErrors['simple.notes']"
          />
          <TextAreaField
            v-model="form.simple.predictability"
            :label="`${labels.simple.predictability} ${subject} ${labels.ui.predictabilitySuffix}`"
          />
          <SelectField
            v-model="form.simple.recoveryTime"
            :label="labels.simple.recoveryTime"
            :options="readinessOptions"
            :hint="labels.ui.simpleRecoveryHint"
            full
          />
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="resetSimple"><SvgIcon name="reset" /> {{ labels.ui.resetForm }}</button>
      <button class="secondary-button" @click="buildPdf('download')"><SvgIcon name="download" /> {{ labels.ui.downloadPdf }}</button>
      <button class="primary-button" @click="sendEmail"><SvgIcon name="email" /> {{ labels.ui.send }}</button>
    </div>
  </section>
</template>
