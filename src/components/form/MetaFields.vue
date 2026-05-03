<script setup lang="ts">
import { computed } from "vue";
import { formLabels } from "../../config/formLabels";
import type { EnvironmentConfig, FieldErrors, SituationForm } from "../../types/form";
import InputField from "./InputField.vue";

const { env, form, fieldErrors } = defineProps<{
  env: EnvironmentConfig;
  form: SituationForm;
  fieldErrors: FieldErrors;
}>();

const fields = computed(() => [
  { key: "date"    as const, label: formLabels.meta.date,    type: "date", required: true  },
  { key: "time"    as const, label: formLabels.meta.time,    type: "time", required: true  },
  { key: "place"   as const, label: formLabels.meta.place,                 required: true  },
  { key: "lead"    as const, label: env.lead,                              required: true  },
  { key: "present" as const, label: formLabels.meta.present,               required: false },
]);
</script>

<template>
  <div class="field-grid">
    <InputField
      v-for="field in fields"
      :key="field.key"
      v-model="form.meta[field.key]"
      :label="field.label"
      :type="field.type"
      :required="field.required"
      :error="fieldErrors[`meta.${field.key}`]"
    />
  </div>
</template>
