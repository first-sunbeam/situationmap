<script setup lang="ts">
import { computed } from "vue";
import { getFormLabels } from "../config/formLabels";
import { useLanguage } from "../i18n/useLanguage";
import { getEnvironmentLabel } from "../lib/environmentLabel";
import { getSubjectInline } from "../lib/subject";
import type { EnvironmentConfig, FieldErrors, PdfAction, SituationForm } from "../types/form";
import LabelText from "./form/LabelText.vue";
import MetaFields from "./form/MetaFields.vue";
import SelectField from "./form/SelectField.vue";
import TextAreaField from "./form/TextAreaField.vue";
import SvgIcon from "./ui/SvgIcon.vue";

const { env, form, sendEmail, buildPdf, resetSimple, fieldErrors } = defineProps<{
  env: EnvironmentConfig;
  form: SituationForm;
  sendEmail: () => void;
  buildPdf: (action: PdfAction) => void;
  resetSimple: () => void;
  fieldErrors: FieldErrors;
}>();

const { language } = useLanguage();
const labels = computed(() => getFormLabels(language.value));
const envLabel = computed(() => getEnvironmentLabel(env, language.value));
const envLead = computed(() => {
  if (env.label === "Dom") return labels.value.environments.home.lead;
  if (env.label === "Placówka całodobowa") return labels.value.environments.center.lead;
  return labels.value.environments.school.lead;
});
const subject = computed(() => getSubjectInline(form, labels.value.map.section === "Environment map" ? "the person" : "osoby"));
const readinessOptions = ["5_minut", "10_30_minut", "1_2_godziny", "kilka_godzin_lub_nastepnego_dnia"];
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
