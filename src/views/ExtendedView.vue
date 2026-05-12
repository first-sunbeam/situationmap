<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useFormState } from "../composables/useFormState";
import IncidentForm from "../components/IncidentForm.vue";
import EnvironmentMapForm from "../components/EnvironmentMapForm.vue";

const route = useRoute();
const { activeVariant, activeMode } = useFormState();
const mode = computed(() => route.params.mode as "incident" | "map");

watchEffect(() => {
  activeVariant.value = "extended";
  activeMode.value = mode.value;
});
</script>

<template>
  <IncidentForm v-if="mode === 'incident'" />
  <EnvironmentMapForm v-else-if="mode === 'map'" />
</template>
