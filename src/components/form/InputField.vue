<script setup lang="ts">
import FieldShell from "./FieldShell.vue";

const { label, type = "text", required = false, full = false, hint, error } = defineProps<{
  label: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  hint?: string;
  error?: string;
}>();

const model = defineModel<string>({ required: true });
</script>

<template>
  <FieldShell
    :label="label"
    :required="required"
    :full="full"
    :hint="hint"
    :error="error"
    v-slot="{ controlId, describedBy, invalid }"
  >
    <input
      v-model="model"
      :id="controlId"
      class="text-input"
      :class="{ invalid }"
      :type="type"
      :required="required"
      :aria-describedby="describedBy"
      :aria-invalid="invalid ? 'true' : undefined"
    />
  </FieldShell>
</template>
