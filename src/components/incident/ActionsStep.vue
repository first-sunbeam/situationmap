<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import FormSection from "../form/FormSection.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const {
  labels,
  form,
  fieldErrors,
  interventionTypeOptions,
  regulationPhase,
  yesNoPartial,
} = useFormState();
const unconditionalOptions = ["Tak", "Nie", "Częściowo", "Nie wiem"];
</script>

<template>
  <FormSection
    :title="labels.incident.actionsSection"
    :hint="labels.ui.actionsSectionHint"
    :error="fieldErrors['incident.actionsSection']"
    required
  >
    <div class="field-grid">
      <SelectField
        v-model="form.incident.phase"
        :label="labels.incident.phase"
        :options="regulationPhase"
        :hint="labels.ui.phaseHint"
        full
      />
      <ChoiceGroupWithOther
        v-model="form.incident.interventions"
        v-model:other="form.incident.interventionDetails"
        :label="labels.incident.interventions"
        :options="interventionTypeOptions"
        :other-label="labels.incident.interventionDetails"
        :other-error="fieldErrors['incident.interventionDetails']"
      />
      <SelectField
        v-model="form.incident.unconditional"
        :label="labels.incident.unconditional"
        :options="unconditionalOptions"
      />
      <SelectField
        v-model="form.incident.usedRegulator"
        :label="labels.incident.usedRegulator"
        :options="yesNoPartial"
      />
      <SelectField
        v-model="form.incident.reducedTension"
        :label="labels.incident.reducedTension"
        :options="yesNoPartial"
      />
      <TextAreaField
        v-model="form.incident.earlierWhat"
        :label="labels.incident.earlierWhat"
        :hint="labels.ui.futureCueHint"
      />
    </div>
  </FormSection>
</template>
