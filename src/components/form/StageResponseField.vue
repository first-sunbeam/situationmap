<script setup lang="ts">
import { computed } from "vue";
import { getMonitoringRevision } from "../../config/monitoringRevision";
import { useLanguage } from "../../i18n/useLanguage";
import InputField from "./InputField.vue";
import TextAreaField from "./TextAreaField.vue";

const { stage, required = false, error } = defineProps<{
  stage: "earlyResponse" | "escalationCourse" | "postEscalationNeeds";
  required?: boolean;
  error?: string;
}>();
const description = defineModel<string>({ required: true });
const sources = defineModel<string>("sources", { required: true });
const { language } = useLanguage();
const revision = computed(() => getMonitoringRevision(language.value));
const sourcesLabel = computed(() => `${revision.value.stageSources} — ${revision.value.stageNames[stage]}`);
</script>

<template>
  <TextAreaField v-model="description" :label="revision[stage]" :hint="revision.stageHint" :required="required" :error="error" />
  <InputField v-model="sources" :label="sourcesLabel" full />
</template>
