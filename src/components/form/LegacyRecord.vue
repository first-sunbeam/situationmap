<script setup lang="ts">
import { computed } from "vue";
import { getLegacyRows } from "../../config/legacyFields";
import { useFormState } from "../../composables/useFormState";
import { useLanguage } from "../../i18n/useLanguage";
import { translateOption } from "../../i18n/options";

const { scope } = defineProps<{ scope: "simple" | "incident" | "map" }>();
const { form, revision, env } = useFormState();
const { language } = useLanguage();
const rows = computed(() => getLegacyRows(scope, form.value, language.value).map((row) => {
  const raw = row.value(env.value, form.value);
  const values = Array.isArray(raw) ? raw : [raw];
  return { label: String(row.label), value: values.map((value) => translateOption(value, language.value)).join(", ") };
}));
</script>

<template>
  <details v-if="rows.length" class="section legacy-record">
    <summary>{{ revision.legacyTitle }}</summary>
    <p class="section-hint">{{ revision.legacyHint }}</p>
    <dl>
      <template v-for="row in rows" :key="row.label">
        <dt>{{ row.label }}</dt>
        <dd>{{ row.value }}</dd>
      </template>
    </dl>
  </details>
</template>

<style scoped>
summary { cursor: pointer; font-weight: 700; }
dt { font-weight: 600; margin-top: 1rem; }
dd { margin: 0.25rem 0 0; white-space: pre-wrap; overflow-wrap: anywhere; }
</style>
