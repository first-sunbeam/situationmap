<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors, tensionLevels, yesNoUnknown } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.baselineSection'] }">
    <h3>{{ formLabels.incident.baselineSection }} <span class="required-mark">*</span></h3>
    <p v-if="fieldErrors['incident.baselineSection']" class="field-error">{{ fieldErrors['incident.baselineSection'] }}</p>
    <div class="field-grid">
      <SelectField
        v-model="form.incident.tension"
        :label="formLabels.incident.tension"
        :options="tensionLevels"
        hint="Jak wyglądał stan osoby przed zdarzeniem?"
      />
      <SelectField v-model="form.incident.tired" :label="formLabels.incident.tired" :options="yesNoUnknown" />
      <SelectField v-model="form.incident.slept" :label="formLabels.incident.slept" :options="yesNoUnknown" />
      <InputField v-model="form.incident.sleepDetails" :label="formLabels.incident.sleepDetails" />
      <template v-if="env.stayStages">
        <SelectField v-model="form.incident.stayStage" :label="formLabels.incident.stayStage" :options="env.stayStages" />
        <SelectField v-model="form.incident.stayStageLoad" :label="formLabels.incident.stayStageLoad" :options="yesNoUnknown" />
      </template>
      <ChoiceGroupField v-model="form.incident.burdens" :label="formLabels.incident.burdens" :options="env.burdens" />
      <InputField
        v-if="hasOther(form.incident.burdens, form.incident.burdensOther)"
        v-model="form.incident.burdensOther"
        :label="formLabels.incident.burdensOther"
        :required="form.incident.burdens.includes('inne')"
        :error="fieldErrors['incident.burdensOther']"
        full
      />
    </div>
  </section>
</template>
