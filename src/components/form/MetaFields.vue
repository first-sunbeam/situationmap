<script setup lang="ts">
import { computed } from "vue";
import { getFormLabels } from "../../config/formLabels";
import { useLanguage } from "../../i18n/useLanguage";
import type { EnvironmentConfig, FieldErrors, SituationForm } from "../../types/form";
import InputField from "./InputField.vue";

const { env, form, fieldErrors, leadLabel } = defineProps<{
  env: EnvironmentConfig;
  form: SituationForm;
  fieldErrors: FieldErrors;
  leadLabel?: string;
}>();

const { language } = useLanguage();
const labels = computed(() => getFormLabels(language.value));

const fields = computed(() => [
  { key: "date"    as const, label: labels.value.meta.date,    type: "date", required: true  },
  { key: "time"    as const, label: labels.value.meta.time,    type: "time", required: true  },
  { key: "place"   as const, label: labels.value.meta.place,                 required: true  },
  { key: "initials" as const, label: labels.value.meta.initials,             required: false },
  { key: "lead"    as const, label: leadLabel ?? env.lead,                 required: true  },
  { key: "present" as const, label: labels.value.meta.present,               required: false },
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
