<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { observedHarmOptions } from "../../data/environments";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import StageResponseField from "../form/StageResponseField.vue";
import FormSection from "../form/FormSection.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { labels, revision, form, fieldErrors } = useFormState();
</script>

<template>
  <FormSection :title="labels.incident.behaviorSection" :hint="labels.ui.behaviorSectionHint" :error="fieldErrors['incident.behaviorSection']" required>
    <div class="field-grid">
      <StageResponseField v-model="form.incident.escalationCourse" v-model:sources="form.incident.escalationSources" stage="escalationCourse" />
      <TextAreaField v-model="form.incident.behaviorMeasure" :label="revision.behaviorMeasure" :hint="revision.measureHint" />
      <ChoiceGroupField v-model="form.incident.observedHarms" :label="revision.observedHarms" :options="observedHarmOptions" grouped />
      <TextAreaField v-model="form.incident.consequencesDescription" :label="revision.consequencesDescription" />
      <TextAreaField v-model="form.incident.potentialRisk" :label="revision.potentialRisk" :hint="revision.riskHint" />
    </div>
  </FormSection>
</template>
