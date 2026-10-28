<script setup lang="ts">
import { computed, useId } from "vue";
import { getMonitoringRevision } from "../../config/monitoringRevision";
import { getInformationSourceOptions, type InformationSource } from "../../config/sourceOptions";
import { useLanguage } from "../../i18n/useLanguage";
import InputField from "./InputField.vue";
import TextAreaField from "./TextAreaField.vue";

const { stage, required = false, error, sourceScopeHint } = defineProps<{
  stage: "earlyResponse" | "escalationCourse" | "postEscalationNeeds";
  required?: boolean;
  error?: string;
  sourceScopeHint?: string;
}>();
const description = defineModel<string>({ required: true });
const sources = defineModel<string>("sources", { required: true });
const sourceTypes = defineModel<InformationSource[]>("sourceTypes", { required: true });
const { language } = useLanguage();
const revision = computed(() => getMonitoringRevision(language.value));
const sourceOptions = computed(() => getInformationSourceOptions(language.value));
const sourcesLabel = computed(() => `${revision.value.stageSources} — ${revision.value.stageNames[stage]}`);
const detailsLabel = computed(() => `${revision.value.sourceDetails} — ${revision.value.stageNames[stage]}`);
const sourceHintId = useId();
</script>

<template>
  <fieldset class="field group-field full" :aria-describedby="sourceHintId">
    <legend class="field-label">{{ sourcesLabel }}</legend>
    <span :id="sourceHintId" class="field-hint">{{ revision.sourceSelectionHint }} <span v-if="sourceScopeHint">{{ sourceScopeHint }}</span></span>
    <div class="choice-grid">
      <label v-for="option in sourceOptions" :key="option.code" class="choice">
        <input v-model="sourceTypes" type="checkbox" :value="option.code" />
        {{ option.label }}
      </label>
    </div>
  </fieldset>
  <InputField v-model="sources" :label="detailsLabel" :hint="revision.sourceDetailsHint" full />
  <slot name="observations" />
  <TextAreaField v-model="description" :label="revision[stage]" :hint="revision.stageHint" :required="required" :error="error" />
</template>
