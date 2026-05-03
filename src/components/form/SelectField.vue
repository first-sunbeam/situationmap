<script setup lang="ts">
withDefaults(defineProps<{
  label: string;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
  full?: boolean;
  hint?: string;
  error?: string;
}>(), {
  placeholder: "Wybierz",
  required: false,
  full: false,
  hint: "",
  error: ""
});

const model = defineModel<string>({ required: true });
</script>

<template>
  <label class="field" :class="{ full }">
    <span class="field-label">
      {{ label }} <span v-if="required" class="required-mark">*</span>
    </span>
    <span v-if="hint" class="field-hint">{{ hint }}</span>
    <select
      v-model="model"
      class="text-input"
      :class="{ invalid: error }"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="item in options" :key="item" :value="item">{{ item }}</option>
    </select>
    <span v-if="error" class="field-error">{{ error }}</span>
  </label>
</template>
