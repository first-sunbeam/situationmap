<script setup lang="ts">
import { computed } from "vue";
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
const nonFindingOptions = ["not_sure", "not_observed", "not_applicable", "missing_data", "no_harm_observed"];
const availableOptions = computed(() => [...new Set([...options, "not_sure", "not_observed", "not_applicable"])]);

const { hintId, errorId, describedBy } = useFieldIds(
  () => hint,
  () => error,
);

function isSelected(option: string): boolean {
  return model.value.includes(option);
}

function toggleOption(option: string): void {
  if (isSelected(option)) {
    model.value = model.value.filter((item) => item !== option);
  } else if (nonFindingOptions.includes(option)) {
    model.value = [option];
  } else {
    // Only an explicit user choice changes an existing selection; hydration never does.
    model.value = [...model.value.filter((item) => !nonFindingOptions.includes(item)), option];
  }
}

function formatChoiceLabel(value: string): string {
  const label = translateOption(value, language.value);
  return label.replace(/^([A-ZĄĆĘŁŃÓŚŹŻ])(?=[a-ząćęłńóśźż])/, (letter) => letter.toLowerCase());
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
      <label v-for="item in availableOptions" :key="item" class="choice">
        <input
          type="checkbox"
          :checked="isSelected(item)"
          :aria-describedby="describedBy"
          :aria-invalid="error ? 'true' : undefined"
          @change="toggleOption(item)"
        />
        {{ formatChoiceLabel(item) }}
      </label>
    </div>

    <slot />
  </fieldset>
</template>
