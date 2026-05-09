<script setup lang="ts">
import LabelText from "./LabelText.vue";

const { title, hint, error, required = false } = defineProps<{
  title: string;
  hint?: string;
  error?: string;
  required?: boolean;
}>();
</script>

<template>
  <section class="section" :class="{ invalidSection: error }">
    <h3>
      <LabelText :text="title" />
      <span v-if="required" class="required-mark">*</span>
    </h3>
    <p v-if="hint" class="section-hint">
      <LabelText :text="hint" />
    </p>
    <p v-if="error" class="field-error">{{ error }}</p>
    <slot />
  </section>
</template>
