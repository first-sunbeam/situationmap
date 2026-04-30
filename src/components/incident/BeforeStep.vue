<script setup>
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";

const { env, form, fieldErrors, toggle } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.beforeSection'] }">
    <h3>{{ formLabels.incident.beforeSection }} <span class="required-mark">*</span></h3>
    <p class="section-hint">Pole obowiązkowe: zaznacz opcję albo wpisz opis.</p>
    <div class="field-grid">
      <div class="field full">
        <span class="field-label">{{ formLabels.incident.antecedents }}</span>
        <span class="field-hint">Zaznacz opcje lub krótko opisz sytuację.</span>
        <span v-if="fieldErrors['incident.beforeSection']" class="field-error">{{ fieldErrors['incident.beforeSection'] }}</span>
        <div class="choice-grid">
          <label class="choice" v-for="item in env.antecedents" :key="item"><input type="checkbox" :checked="form.incident.antecedents.includes(item)" @change="toggle(form.incident.antecedents, item)" />{{ item }}</label>
        </div>
      </div>
      <label class="field full"><span class="field-label">{{ formLabels.incident.factDescription }}</span><span class="field-hint">Krótko opisz, co się wydarzyło przed eskalacją.</span><textarea class="text-area" :class="{ invalid: fieldErrors['incident.factDescription'] }" v-model="form.incident.factDescription"></textarea><span v-if="fieldErrors['incident.factDescription']" class="field-error">{{ fieldErrors['incident.factDescription'] }}</span></label>
    </div>
  </section>
</template>
