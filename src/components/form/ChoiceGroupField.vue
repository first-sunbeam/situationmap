<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string;
  options: readonly string[];
  required?: boolean;
  full?: boolean;
  hint?: string;
  error?: string;
}>(), {
  required: false,
  full: true,
  hint: "",
  error: ""
});

const model = defineModel<string[]>({ required: true });

function toggleOption(option: string) {
  model.value = model.value.includes(option)
    ? model.value.filter((item) => item !== option)
    : [...model.value, option];
}
</script>

<template>
  <fieldset class="field choice-field" :class="{ full }">
    <legend class="field-label">
      {{ label }} <span v-if="required" class="required-mark">*</span>
    </legend>
    <span v-if="hint" class="field-hint">{{ hint }}</span>
    <span v-if="error" class="field-error">{{ error }}</span>
    <div class="choice-grid">
      <label class="choice" v-for="item in props.options" :key="item">
        <input
          type="checkbox"
          :checked="model.includes(item)"
          :aria-invalid="error ? 'true' : undefined"
          @change="toggleOption(item)"
        />
        {{ item }}
      </label>
    </div>
  </fieldset>
</template>
