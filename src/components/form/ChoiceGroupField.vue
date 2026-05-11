<script setup lang="ts">
import { useLanguage } from "../../i18n/useLanguage";
import { translateOption } from "../../i18n/options";
import LabelText from "./LabelText.vue";
import { useFieldIds } from "./useFieldIds";

const {
  label,
  options,
  required = false,
  full = true,
  grouped = false,
  hint,
  error,
} = defineProps<{
  label?: string;
  options: readonly string[];
  required?: boolean;
  full?: boolean;
  grouped?: boolean;
  hint?: string;
  error?: string;
}>();

const model = defineModel<string[]>({ required: true });
const { language } = useLanguage();

const { hintId, errorId, describedBy } = useFieldIds(
  () => hint,
  () => error,
);

function isSelected(option: string): boolean {
  return model.value.includes(option);
}

function toggleOption(option: string): void {
  model.value = isSelected(option)
    ? model.value.filter((item) => item !== option)
    : [...model.value, option];
}
</script>

<template>
  <fieldset class="field choice-field" :class="{ full, 'group-field': grouped }">
    <legend v-if="label" class="field-label">
      <LabelText :text="label" />
      <span v-if="required" class="required-mark">*</span>
    </legend>

    <span v-if="hint" :id="hintId" class="field-hint"><LabelText :text="hint" /></span>
    <span v-if="error" :id="errorId" class="field-error">{{ error }}</span>

    <div class="choice-grid">
      <label v-for="item in options" :key="item" class="choice">
        <input
          type="checkbox"
          :checked="isSelected(item)"
          :aria-describedby="describedBy"
          :aria-invalid="error ? 'true' : undefined"
          @change="toggleOption(item)"
        />
        {{ translateOption(item, language) }}
      </label>
    </div>

    <slot />
  </fieldset>
</template>
