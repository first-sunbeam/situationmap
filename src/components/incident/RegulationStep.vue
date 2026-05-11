<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import FormSection from "../form/FormSection.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const {
  labels,
  env,
  form,
  fieldErrors,
  subject,
  calmTime,
  cognitiveRecoveryOptions,
  recoverySupportOptions,
} = useFormState();
</script>

<template>
  <FormSection
    :title="labels.incident.regulationSection"
    :hint="labels.ui.regulationSectionHint"
    :error="fieldErrors['incident.regulationSection']"
    required
  >
    <div class="field-grid">
      <fieldset class="field group-field full">
        <legend class="field-label">
          {{ labels.ui.escalationRecoveryLegend }}
        </legend>
        <InputField
          v-model="form.incident.escalationDuration"
          :label="labels.incident.escalationDuration"
        />
        <SelectField
          v-model="form.incident.calmTime"
          :label="labels.incident.calmTime"
          :options="calmTime"
        />
        <SelectField
          v-model="form.incident.cognitiveRecoveryTime"
          :label="labels.incident.cognitiveRecoveryTime"
          :options="cognitiveRecoveryOptions"
          :hint="`${labels.ui.cognitiveRecoveryHintFor} ${subject}.`"
        />
      </fieldset>
      <ChoiceGroupWithOther
        v-model="form.incident.endedBy"
        v-model:other="form.incident.endedByOther"
        :label="labels.incident.endedBy"
        :options="env.endedBy"
        :other-label="labels.incident.endedByOther"
        :other-error="fieldErrors['incident.endedByOther']"
        :hint="labels.ui.endedByHint"
        required
      />
      <TextAreaField
        v-model="form.incident.worsened"
        :label="labels.incident.worsened"
        :hint="labels.ui.worsenedHint"
      />
      <ChoiceGroupWithOther
        v-model="form.incident.recoverySupports"
        v-model:other="form.incident.recoverySupportsOther"
        :label="labels.incident.recoverySupports"
        :options="recoverySupportOptions"
        :other-label="labels.incident.recoverySupportsOther"
        :other-error="fieldErrors['incident.recoverySupportsOther']"
        :hint="`${labels.ui.recoverySupportsHintPrefix} ${subject}.`"
      />
    </div>
  </FormSection>
</template>
