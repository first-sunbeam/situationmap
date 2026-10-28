<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import FormSection from "../form/FormSection.vue";
import SelectField from "../form/SelectField.vue";

const { labels, revision, form, fieldErrors, interventionTypeOptions } = useFormState();
const supportOptions = ["yes", "no", "partially", "not_sure", "not_observed", "not_applicable"];
</script>

<template>
  <FormSection :title="labels.incident.actionsSection" :hint="revision.supportConditionsHint" :error="fieldErrors['incident.actionsSection']" required>
    <div class="field-grid">
      <ChoiceGroupWithOther v-model="form.incident.interventions" v-model:other="form.incident.interventionDetails" :label="labels.incident.interventions" :options="interventionTypeOptions" :other-label="labels.incident.interventionDetails" :other-error="fieldErrors['incident.interventionDetails']" />
      <SelectField v-model="form.incident.supportConditional" :label="revision.supportConditional" :options="supportOptions" :hint="revision.supportHint" />
      <SelectField v-model="form.incident.usedRegulator" :label="labels.incident.usedRegulator" :options="supportOptions" />
    </div>
  </FormSection>
</template>
