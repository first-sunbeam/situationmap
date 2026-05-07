<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { env, form, fieldErrors } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.beforeSection'] }">
    <h3>{{ formLabels.incident.beforeSection }} <span class="required-mark">*</span></h3>
    <p class="section-hint">To, co wydarzyło się bezpośrednio przed, pomaga odróżnić wyzwalacz sytuacyjny od późniejszej reakcji układu nerwowego.</p>
    <div class="field-grid">
      <ChoiceGroupField
        v-model="form.incident.antecedents"
        :label="formLabels.incident.antecedents"
        :options="env.antecedents"
        hint="Zaznacz opcje lub dopisz ważny szczegół."
        :error="fieldErrors['incident.beforeSection']"
      />
      <TextAreaField
        v-model="form.incident.factDescription"
        :label="formLabels.incident.factDescription"
        hint="Dopisz fakty, których nie da się jasno zaznaczyć na liście."
        :error="fieldErrors['incident.factDescription']"
      />

    </div>
  </section>
</template>
