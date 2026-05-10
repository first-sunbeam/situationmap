<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import FormSection from "../form/FormSection.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

const {
  labels,
  env,
  form,
  fieldErrors,
  bodyStateOptions,
  sensoryIntensityOptions,
  tensionLevels,
  yesNoUnknown,
} = useFormState();
</script>

<template>
  <FormSection
    :title="labels.incident.baselineSection"
    hint="Osoby autystyczne mogą mieć trudność z rozpoznaniem sygnałów z ciała (interocepcja) i z integracją bodźców zewnętrznych – obie grupy czynników wpływają na próg dysregulacji."
    :error="fieldErrors['incident.baselineSection']"
    required
  >
    <div class="field-grid">
      <SelectField
        v-model="form.incident.tension"
        :label="labels.incident.tension"
        :options="tensionLevels"
        hint="Jak wyglądał stan osoby przed zdarzeniem?"
      />
      <SelectField
        v-model="form.incident.tired"
        :label="labels.incident.tired"
        :options="yesNoUnknown"
      />
      <SelectField
        v-model="form.incident.slept"
        :label="labels.incident.slept"
        :options="yesNoUnknown"
      />
      <InputField
        v-model="form.incident.sleepDetails"
        :label="labels.incident.sleepDetails"
        :required="form.incident.slept === 'Tak'"
        :error="fieldErrors['incident.sleepDetails']"
      />
      <template v-if="env.stayStages">
        <SelectField
          v-model="form.incident.stayStage"
          :label="labels.incident.stayStage"
          :options="env.stayStages"
        />
        <SelectField
          v-model="form.incident.stayStageLoad"
          :label="labels.incident.stayStageLoad"
          :options="yesNoUnknown"
        />
      </template>
      <ChoiceGroupWithOther
        v-model="form.incident.burdens"
        v-model:other="form.incident.burdensOther"
        :label="labels.incident.burdens"
        :options="env.burdens"
        :other-label="labels.incident.burdensOther"
        :other-error="fieldErrors['incident.burdensOther']"
      />
      <ChoiceGroupWithOther
        v-model="form.incident.bodyState"
        v-model:other="form.incident.bodyStateOther"
        :label="labels.incident.bodyState"
        :options="bodyStateOptions"
        :other-label="labels.incident.bodyStateOther"
        :other-error="fieldErrors['incident.bodyStateOther']"
      />
      <ChoiceGroupWithOther
        v-model="form.incident.sensoryIntensity"
        v-model:other="form.incident.sensoryIntensityOther"
        :label="labels.incident.sensoryIntensity"
        :options="sensoryIntensityOptions"
        :other-label="labels.incident.sensoryIntensityOther"
        :other-error="fieldErrors['incident.sensoryIntensityOther']"
      />
    </div>
  </FormSection>
</template>
