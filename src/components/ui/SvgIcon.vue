<script setup lang="ts">
import { computed, watchEffect } from "vue";

const props = defineProps<{
  name: string;
}>();

const knownIconNames = new Set([
  "sun",
  "moon",
  "home",
  "center",
  "school",
  "external",
  "email",
  "download",
  "reset",
  "check",
  "arrow-left",
  "arrow-right"
]);

const iconHref = computed(() => knownIconNames.has(props.name) ? `#icon-${props.name}` : "#icon-unknown");

watchEffect(() => {
  if (import.meta.env.DEV && !knownIconNames.has(props.name)) {
    console.warn(`[SvgIcon] Unknown icon: ${props.name}`);
  }
});
</script>

<template>
  <svg class="svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <use :href="iconHref" />
  </svg>
</template>
