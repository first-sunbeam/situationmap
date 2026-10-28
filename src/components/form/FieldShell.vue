<script setup lang="ts">
import { useId } from "vue";
import LabelText from "./LabelText.vue";
import { useFieldIds } from "./useFieldIds";

const { label, required = false, full = false, hint, error } = defineProps<{
  label: string;
  required?: boolean;
  full?: boolean;
  hint?: string;
  error?: string;
}>();

const controlId = useId();
const { hintId, errorId, describedBy } = useFieldIds(() => hint, () => error);
</script>

<template>
  <div class="field" :class="{ full }">
    <label :for="controlId" class="field-label">
      <LabelText :text="label" /> <span v-if="required" class="required-mark">*</span>
    </label>

    <span v-if="hint" :id="hintId" class="field-hint"><LabelText :text="hint" /></span>

    <slot :control-id="controlId" :described-by="describedBy" :invalid="Boolean(error)" />

    <span v-if="error" :id="errorId" class="field-error">{{ error }}</span>
  </div>
</template>
