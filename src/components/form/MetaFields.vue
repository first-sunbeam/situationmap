<script setup lang="ts">
import { computed } from "vue";
import { getFormLabels } from "../../config/formLabels";
import { getMonitoringRevision } from "../../config/monitoringRevision";
import { useLanguage } from "../../i18n/useLanguage";
import type { EnvironmentConfig, FieldErrors, SituationForm } from "../../types/form";
import InputField from "./InputField.vue";

const { env, form, fieldErrors, leadLabel, requireEventDetails = true } = defineProps<{
  env: EnvironmentConfig;
  form: SituationForm;
  fieldErrors: FieldErrors;
  leadLabel?: string;
  requireEventDetails?: boolean;
}>();

const { language } = useLanguage();
const labels = computed(() => getFormLabels(language.value));
const revision = computed(() => getMonitoringRevision(language.value));

const fields = computed(() => [
  { key: "date"    as const, label: labels.value.meta.date,    type: "date", required: requireEventDetails },
  { key: "time"    as const, label: labels.value.meta.time,    type: "time", required: requireEventDetails },
  { key: "place"   as const, label: labels.value.meta.place,                 required: requireEventDetails },
  { key: "initials" as const, label: labels.value.meta.initials,             required: false },
  { key: "lead"    as const, label: leadLabel ?? env.lead,                 required: requireEventDetails },
  { key: "present" as const, label: labels.value.meta.present,               required: false },
  { key: "observationFrom" as const, label: revision.value.observationFrom, hint: revision.value.observationFromHint, required: false },
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
      :hint="'hint' in field ? field.hint : undefined"
      :error="fieldErrors[`meta.${field.key}`]"
    />
  </div>
</template>
