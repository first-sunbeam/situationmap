<script setup lang="ts">
withDefaults(defineProps<{
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}>(), {
  type: "text",
  required: false,
  error: ""
});

const model = defineModel<string>({ required: true });
</script>

<template>
  <label class="field">
    <span class="field-label">
      {{ label }} <span v-if="required" class="required-mark">*</span>
    </span>
    <input
      v-model="model"
      class="text-input"
      :class="{ invalid: error }"
      :type="type"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
    />
    <span v-if="error" class="field-error">{{ error }}</span>
  </label>
</template>
