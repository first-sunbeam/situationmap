<script setup lang="ts">
import LabelText from "./LabelText.vue";
import { useFieldIds } from "./useFieldIds";

const { label, hint, required = false, error } = defineProps<{
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
}>();

const model = defineModel<string>({ required: true });

const { hintId, errorId, describedBy } = useFieldIds(() => hint, () => error);
</script>

<template>
  <label class="field full">
    <span class="field-label">
      <LabelText :text="label" /> <span v-if="required" class="required-mark">*</span>
    </span>

    <span v-if="hint" :id="hintId" class="field-hint"><LabelText :text="hint" /></span>

    <textarea
      v-model="model"
      class="text-area"
      :class="{ invalid: error }"
      :required="required"
      :aria-describedby="describedBy"
      :aria-invalid="error ? 'true' : undefined"
    ></textarea>

    <span v-if="error" :id="errorId" class="field-error">{{ error }}</span>
  </label>
</template>
