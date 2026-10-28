<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useFormState } from "../composables/useFormState";
import { getSubjectInline } from "../lib/subject";
import LegacyRecord from "../components/form/LegacyRecord.vue";
import MetaFields from "../components/form/MetaFields.vue";
import StageResponseField from "../components/form/StageResponseField.vue";
import TextAreaField from "../components/form/TextAreaField.vue";
import SvgIcon from "../components/ui/SvgIcon.vue";

const { env, envLabel, envLead, form, labels, revision, sendEmail, buildPdf, resetSimple, fieldErrors, activeVariant } = useFormState();
const subject = computed(() => getSubjectInline(form.value, labels.value.map.section === "Environment map" ? "the person" : "osoby"));
watchEffect(() => { activeVariant.value = "simple"; });
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
    <p class="section-hint">{{ revision.sources }}</p>
    <LegacyRecord scope="simple" />
    <div class="sections">
      <section class="section">
        <h3>{{ labels.meta.section }}</h3>
        <MetaFields :env="env" :form="form" :field-errors="fieldErrors" :lead-label="envLead" />
      </section>
      <section class="section">
        <h3>{{ labels.simple.section }}</h3>
        <div class="field-grid">
          <TextAreaField v-model="form.simple.stateBefore" :label="labels.simple.stateBefore" :hint="labels.ui.simpleStateBeforeHint" />
          <TextAreaField v-model="form.simple.antecedents" :label="labels.simple.beforeLastMinutes" :hint="labels.ui.simpleBeforeHint" />
          <TextAreaField v-model="form.simple.signals" :label="labels.simple.signalsObserved" :hint="labels.ui.simpleSignalsObservedHint" />
          <StageResponseField v-model="form.simple.earlyResponse" v-model:sources="form.simple.earlyResponseSources" stage="earlyResponse" />
          <StageResponseField v-model="form.simple.escalationCourse" v-model:sources="form.simple.escalationSources" stage="escalationCourse" required :error="fieldErrors['simple.escalationCourse']" />
          <StageResponseField v-model="form.simple.postEscalationNeeds" v-model:sources="form.simple.postEscalationSources" stage="postEscalationNeeds" required :error="fieldErrors['simple.postEscalationNeeds']" />
          <TextAreaField v-model="form.simple.notes" :label="`${labels.ui.decisionPossibilityFor} ${subject}`" :hint="labels.ui.simpleNotesHint" required :error="fieldErrors['simple.notes']" />
          <TextAreaField v-model="form.simple.predictability" :label="`${labels.simple.predictability} ${subject} ${labels.ui.predictabilitySuffix}`" />
          <TextAreaField v-model="form.simple.readinessDetails" :label="revision.readinessTiming" :hint="revision.readinessTimingHint" />
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
