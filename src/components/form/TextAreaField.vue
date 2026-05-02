<script setup lang="ts">
withDefaults(defineProps<{
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
}>(), {
  hint: "",
  required: false,
  error: ""
});

const model = defineModel<string>({ required: true });
</script>

<template>
  <label class="field full">
    <span class="field-label">
      {{ label }} <span v-if="required" class="required-mark">*</span>
    </span>
    <span v-if="hint" class="field-hint">{{ hint }}</span>
    <textarea
      v-model="model"
      class="text-area"
      :class="{ invalid: error }"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
    ></textarea>
    <span v-if="error" class="field-error">{{ error }}</span>
  </label>
</template>
