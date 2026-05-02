<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors, toggle } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.expectationsSection'] }">
    <h3>{{ formLabels.incident.expectationsSection }} <span class="required-mark">*</span></h3>
    <p v-if="fieldErrors['incident.expectationsSection']" class="field-error">{{ fieldErrors['incident.expectationsSection'] }}</p>
    <div class="choice-grid">
      <label class="choice" v-for="item in env.expectations" :key="item"><input type="checkbox" :checked="form.incident.expectations.includes(item)" @change="toggle(form.incident.expectations, item)" />{{ item }}</label>
    </div>
    <label v-if="hasOther(form.incident.expectations, form.incident.expectationOther)" class="field full"><span class="field-label">{{ formLabels.incident.expectationOther }} <span v-if="form.incident.expectations.includes('inne')" class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['incident.expectationOther'] }" v-model="form.incident.expectationOther" /><span v-if="fieldErrors['incident.expectationOther']" class="field-error">{{ fieldErrors['incident.expectationOther'] }}</span></label>
  </section>
</template>
