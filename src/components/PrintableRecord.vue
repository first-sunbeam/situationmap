<script setup lang="ts">
import { computed } from "vue";
import { useFormState } from "../composables/useFormState";
import { getIncidentExportSections, getMapExportSections, getMetaExportSection, getSimpleExportSection } from "../config/exportSections";
import { getLegacyExportSections } from "../config/legacyFields";
import { resolveRows } from "../lib/exportUtils";
import { useLanguage } from "../i18n/useLanguage";

const { form, env, envLabel, labels, revision, activeVariant, activeMode } = useFormState();
const { language } = useLanguage();
const title = computed(() => activeVariant.value === "simple" ? `${labels.value.ui.simpleVariant} — ${envLabel.value}` : activeMode.value === "map" ? labels.value.map.section : labels.value.ui.incidentMode);
const sourceNote = computed(() => activeVariant.value === "extended" && activeMode.value === "map" ? revision.value.mapSources : revision.value.sources);
const sections = computed(() => {
  const current = activeVariant.value === "simple"
    ? [getSimpleExportSection(labels.value, language.value)]
    : activeMode.value === "map" ? getMapExportSections(labels.value, language.value) : getIncidentExportSections(env.value, labels.value);
  return [getMetaExportSection(env.value, labels.value), ...current,
    ...getLegacyExportSections(form.value, activeVariant.value, activeMode.value, language.value).map((item) => ({ ...item, note: revision.value.legacyHint }))
  ].map((section) => ({ ...section, values: resolveRows(env.value, form.value, section.rows, (label, value, row) => ({ label, hint: row.hint, text: Array.isArray(value) ? value.join(", ") : value }), language.value) }));
});
</script>

<template>
  <article class="printable-record">
    <h1>{{ title }}</h1>
    <p>{{ sourceNote }}</p>
    <section v-for="(section, index) in sections" :key="index">
      <h2>{{ section.title }}</h2>
      <p v-if="section.note" class="print-note">{{ section.note }}</p>
      <dl>
        <div v-for="(row, rowIndex) in section.values" :key="rowIndex" class="print-row">
          <dt>{{ row.label }}</dt>
          <dd><span v-if="row.hint" class="print-note">{{ row.hint }}</span>{{ row.text || '........................................' }}</dd>
        </div>
      </dl>
    </section>
    <p>© Małgorzata Mikołajczyk · analiza.tools/map</p>
  </article>
</template>

<style scoped>
.printable-record { display: none; }
@media print {
  .printable-record { display: block; color: black; background: white; font: 11pt/1.4 Arial, sans-serif; }
  h1 { font-size: 17pt; }
  h2 { font-size: 13pt; break-after: avoid; }
  dl, dd { margin: 0; }
  .print-row { margin: 0 0 9pt; }
  dt { font-weight: 700; break-after: avoid; }
  dd { white-space: pre-wrap; overflow-wrap: anywhere; }
  .print-note { display: block; white-space: pre-line; font-size: 9pt; }
}
</style>
