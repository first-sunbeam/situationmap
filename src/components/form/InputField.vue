<script setup lang="ts">
import LabelText from "./LabelText.vue";
import { useFieldIds } from "./useFieldIds";

const { label, type = "text", required = false, full = false, hint, error } = defineProps<{
  label: string;
  type?: string;
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

    <input
      v-model="model"
      class="text-input"
      :class="{ invalid: error }"
      :type="type"
      :required="required"
      :aria-describedby="describedBy"
      :aria-invalid="error ? 'true' : undefined"
    />

    <span v-if="error" :id="errorId" class="field-error">{{ error }}</span>
  </label>
</template>
