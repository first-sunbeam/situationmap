<script setup lang="ts">
import { computed } from "vue";
import { useLanguage } from "../../i18n/useLanguage";
import { translateOption } from "../../i18n/options";
import FieldShell from "./FieldShell.vue";

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
const { language } = useLanguage();
const resolvedPlaceholder = computed(() => placeholder === "Wybierz" && language.value === "en" ? "Select" : placeholder);
</script>

<template>
  <FieldShell
    :label="label"
    :required="required"
    :full="full"
    :hint="hint"
    :error="error"
    v-slot="{ describedBy, invalid }"
  >
    <select
      v-model="model"
      class="text-input"
      :class="{ invalid }"
      :required="required"
      :aria-describedby="describedBy"
      :aria-invalid="invalid ? 'true' : undefined"
    >
      <option value="">{{ resolvedPlaceholder }}</option>
      <option v-for="item in options" :key="item" :value="item">{{ translateOption(item, language) }}</option>
    </select>
  </FieldShell>
</template>
