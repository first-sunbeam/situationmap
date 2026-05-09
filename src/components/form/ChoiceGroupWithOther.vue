<script setup lang="ts">
import { computed } from "vue";
import { hasOther, hasSelectedOther } from "../../lib/formUtils";
import ChoiceGroupField from "./ChoiceGroupField.vue";
import InputField from "./InputField.vue";

const {
  label,
  options,
  otherLabel,
  required = false,
  error,
  otherError,
  hint,
} = defineProps<{
  label: string;
  options: readonly string[];
  otherLabel: string;
  required?: boolean;
  error?: string;
  otherError?: string;
  hint?: string;
}>();

const model = defineModel<string[]>({ required: true });
const other = defineModel<string>("other", { required: true });

const showOther = computed(() => hasOther(model.value, other.value));
const requiresOther = computed(() => hasSelectedOther(model.value));
</script>

<template>
  <ChoiceGroupField
    v-model="model"
    :label="label"
    :options="options"
    :hint="hint"
    :required="required"
    :error="error"
    grouped
  >
    <InputField
      v-if="showOther"
      v-model="other"
      :label="otherLabel"
      :required="requiresOther"
      :error="otherError"
      full
    />
  </ChoiceGroupField>
</template>
