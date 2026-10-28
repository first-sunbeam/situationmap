<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import FormSection from "../form/FormSection.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { labels, revision, form, fieldErrors } = useFormState();
</script>

<template>
  <FormSection :title="labels.incident.maskingSection" :hint="revision.maskingHint" :error="fieldErrors['incident.maskingSection']">
    <div class="field-grid">
      <TextAreaField v-model="form.incident.continuedObservation" :label="revision.continuedObservation" :hint="revision.continuedHint" />
      <TextAreaField v-model="form.incident.personAccount" :label="revision.personAccount" :hint="revision.personAccountHint" />
      <TextAreaField v-model="form.incident.laterObservation" :label="revision.laterObservation" :hint="revision.laterHint" />
      <TextAreaField v-model="form.incident.maskingHypothesis" :label="revision.maskingHypothesis" :hint="revision.maskingHint" />
    </div>
  </FormSection>
</template>
