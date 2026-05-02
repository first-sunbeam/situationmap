<script setup lang="ts">
import { formLabels } from "../../config/formLabels";
import type { EnvironmentConfig, FieldErrors, SituationForm } from "../../types/form";
import InputField from "./InputField.vue";

defineProps<{
  env: EnvironmentConfig;
  form: SituationForm;
  fieldErrors: FieldErrors;
}>();
</script>

<template>
  <div class="field-grid">
    <InputField v-model="form.meta.date" :label="formLabels.meta.date" type="date" required :error="fieldErrors['meta.date']" />
    <InputField v-model="form.meta.time" :label="formLabels.meta.time" type="time" required :error="fieldErrors['meta.time']" />
    <InputField v-model="form.meta.place" :label="formLabels.meta.place" required :error="fieldErrors['meta.place']" />
    <InputField v-model="form.meta.lead" :label="env.lead" required :error="fieldErrors['meta.lead']" />
    <InputField v-model="form.meta.present" :label="formLabels.meta.present" />
  </div>
</template>
