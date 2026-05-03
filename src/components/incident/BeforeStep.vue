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
    <p class="section-hint">Pole obowiązkowe: zaznacz opcję albo wpisz opis.</p>
    <div class="field-grid">
      <ChoiceGroupField
        v-model="form.incident.antecedents"
        :label="formLabels.incident.antecedents"
        :options="env.antecedents"
        hint="Zaznacz opcje lub krótko opisz sytuację."
        :error="fieldErrors['incident.beforeSection']"
      />
      <TextAreaField
        v-model="form.incident.factDescription"
        :label="formLabels.incident.factDescription"
        hint="Krótko opisz, co się wydarzyło przed eskalacją."
        :error="fieldErrors['incident.factDescription']"
      />
    </div>
  </section>
</template>
