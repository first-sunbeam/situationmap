<script setup lang="ts">
import FieldShell from "./FieldShell.vue";

const { label, hint, required = false, error } = defineProps<{
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
}>();

const model = defineModel<string>({ required: true });
</script>

<template>
  <FieldShell
    :label="label"
    :required="required"
    full
    :hint="hint"
    :error="error"
    v-slot="{ controlId, describedBy, invalid }"
  >
    <textarea
      v-model="model"
      :id="controlId"
      class="text-area"
      :class="{ invalid }"
      :required="required"
      :aria-describedby="describedBy"
      :aria-invalid="invalid ? 'true' : undefined"
    ></textarea>
  </FieldShell>
</template>
