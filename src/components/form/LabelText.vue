<script setup lang="ts">
import { computed } from "vue";

const { text } = defineProps<{ text: string }>();

const parts = computed(() => {
  const result: Array<{ text: string; emphasized: boolean }> = [];
  const pattern = /_([^_]+)_/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push({ text: text.slice(lastIndex, match.index), emphasized: false });
    }
    result.push({ text: match[1], emphasized: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), emphasized: false });
  }

  return result;
});
</script>

<template>
  <template v-for="(part, index) in parts" :key="`${part.text}-${index}`">
    <em v-if="part.emphasized" class="underlined-initials">{{ part.text }}</em>
    <template v-else>{{ part.text }}</template>
  </template>
</template>

<style scoped>
.underlined-initials {
  text-decoration: underline;
  text-underline-offset: 0.12em;
}
</style>
