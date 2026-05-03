<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import InputField from "../form/InputField.vue";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.expectationsSection'] }">
    <h3>{{ formLabels.incident.expectationsSection }} <span class="required-mark">*</span></h3>
    <p v-if="fieldErrors['incident.expectationsSection']" class="field-error">{{ fieldErrors['incident.expectationsSection'] }}</p>
    <ChoiceGroupField v-model="form.incident.expectations" :label="formLabels.incident.expectations" :options="env.expectations" />
    <InputField
      v-if="hasOther(form.incident.expectations, form.incident.expectationOther)"
      v-model="form.incident.expectationOther"
      :label="formLabels.incident.expectationOther"
      :required="form.incident.expectations.includes('inne')"
      :error="fieldErrors['incident.expectationOther']"
      full
    />
  </section>
</template>
