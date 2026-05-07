<script setup lang="ts">
import LabelText from "./LabelText.vue";
import { useFieldIds } from "./useFieldIds";

const {
  label,
  options,
  placeholder = "Wybierz",
  required = false,
  full = false,
  hint,
  error,
} = defineProps<{
  label: string;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
  full?: boolean;
  hint?: string;
  error?: string;
}>();

const model = defineModel<string>({ required: true });

const { hintId, errorId, describedBy } = useFieldIds(() => hint, () => error);
</script>

<template>
  <label class="field" :class="{ full }">
    <span class="field-label">
      <LabelText :text="label" /> <span v-if="required" class="required-mark">*</span>
    </span>

    <span v-if="hint" :id="hintId" class="field-hint"><LabelText :text="hint" /></span>

    <select
      v-model="model"
      class="text-input"
      :class="{ invalid: error }"
      :required="required"
      :aria-describedby="describedBy"
      :aria-invalid="error ? 'true' : undefined"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="item in options" :key="item" :value="item">{{ item }}</option>
    </select>

    <span v-if="error" :id="errorId" class="field-error">{{ error }}</span>
  </label>
</template>
