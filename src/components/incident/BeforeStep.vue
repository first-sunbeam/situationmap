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
    <p class="section-hint">Przewidywalność zmniejsza obciążenie układu nerwowego, a nagła zmiana lub brak informacji może podnieść napięcie.</p>
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
      <TextAreaField
        v-model="form.incident.predictability"
        :label="formLabels.incident.predictability"
        hint="Czy było wiadomo, co się wydarzy? Czy było wiadomo, jak długo to potrwa? Czy była możliwość negocjacji lub wyboru?"
      />
    </div>
  </section>
</template>
