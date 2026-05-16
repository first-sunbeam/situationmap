<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import MetaFields from "../form/MetaFields.vue";

const { labels, env, envLead, form, fieldErrors } = useFormState();
</script>

<template>
  <section class="section">
    <h3>{{ labels.meta.section }} <span class="required-mark">*</span></h3>
    <MetaFields :env="env" :form="form" :field-errors="fieldErrors" :lead-label="envLead" />
  </section>
</template>
