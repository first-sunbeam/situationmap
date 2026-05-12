<script setup lang="ts">
import { computed, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: string | number;
  }>(),
  {
    size: 24,
  },
);

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
  "arrow-right",
  "pdf",
]);

const iconHref = computed(() =>
  knownIconNames.has(props.name) ? `#icon-${props.name}` : "#icon-unknown",
);

const iconSize = computed(() =>
  typeof props.size === "number" ? `${props.size}px` : props.size,
);

watchEffect(() => {
  if (import.meta.env.DEV && !knownIconNames.has(props.name)) {
    console.warn(`[SvgIcon] Unknown icon: ${props.name}`);
  }
});
</script>

<template>
  <svg
    class="svg-icon"
    :style="{ '--icon-size': iconSize }"
    aria-hidden="true"
    focusable="false"
  >
    <use :href="iconHref" />
  </svg>
</template>
