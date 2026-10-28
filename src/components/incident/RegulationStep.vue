<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import FormSection from "../form/FormSection.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { labels, revision, form, fieldErrors } = useFormState();
</script>

<template>
  <FormSection
    :title="labels.incident.regulationSection"
    :hint="labels.ui.regulationSectionHint"
    :error="fieldErrors['incident.regulationSection']"
    required
  >
    <div class="field-grid">
      <TextAreaField v-model="form.incident.behaviorDuration" :label="revision.behaviorDuration" :hint="revision.durationHint" />
      <TextAreaField v-model="form.incident.tensionReductionDetails" :label="revision.tensionReductionDetails" :hint="revision.reductionHint" />
      <TextAreaField v-model="form.incident.readinessDetails" :label="revision.readinessTiming" :hint="revision.readinessTimingHint" />
    </div>
  </FormSection>
</template>
