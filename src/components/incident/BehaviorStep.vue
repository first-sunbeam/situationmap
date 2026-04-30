<script setup>
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";

const { env, form, fieldErrors, intensity, toggle } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.behaviorSection'] }">
    <h3>{{ formLabels.incident.behaviorSection }} <span class="required-mark">*</span></h3>
    <p v-if="fieldErrors['incident.behaviorSection']" class="field-error">{{ fieldErrors['incident.behaviorSection'] }}</p>
    <div class="field-grid">
      <label class="field full"><span class="field-label">{{ formLabels.incident.behavior }}</span><textarea class="text-area" v-model="form.incident.behavior"></textarea></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.intensity }}</span><select class="text-input" v-model="form.incident.intensity"><option value="">Wybierz</option><option v-for="item in intensity" :key="item">{{ item }}</option></select></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.escalationDuration }}</span><input class="text-input" v-model="form.incident.escalationDuration" /></label>
      <div class="field full"><span class="field-label">{{ formLabels.incident.harms }}</span><div class="choice-grid"><label class="choice" v-for="item in env.harms" :key="item"><input type="checkbox" :checked="form.incident.harms.includes(item)" @change="toggle(form.incident.harms, item)" />{{ item }}</label></div></div>
    </div>
  </section>
</template>
