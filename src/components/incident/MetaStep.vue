<script setup>
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import MetaFields from "../form/MetaFields.vue";

const { env, form, fieldErrors } = useFormState();
</script>

<template>
  <section class="section">
    <h3>{{ formLabels.meta.section }} <span class="required-mark">*</span></h3>
    <MetaFields :env="env" :form="form" :field-errors="fieldErrors" />
  </section>
</template>
