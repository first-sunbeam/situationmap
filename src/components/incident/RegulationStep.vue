<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors, toggle } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.regulationSection'] }">
    <h3>{{ formLabels.incident.regulationSection }} <span class="required-mark">*</span></h3>
    <p class="section-hint">Pole obowiązkowe: zaznacz, co najbardziej pomogło w tej sytuacji.</p>
    <p v-if="fieldErrors['incident.regulationSection']" class="field-error">{{ fieldErrors['incident.regulationSection'] }}</p>
    <div class="field-grid">
      <div class="field full"><span class="field-label">{{ formLabels.incident.endedBy }} <span class="required-mark">*</span></span><div class="choice-grid"><label class="choice" v-for="item in env.endedBy" :key="item"><input type="checkbox" :checked="form.incident.endedBy.includes(item)" @change="toggle(form.incident.endedBy, item)" />{{ item }}</label></div></div>
      <label v-if="hasOther(form.incident.endedBy, form.incident.endedByOther)" class="field full"><span class="field-label">{{ formLabels.incident.endedByOther }}</span><input class="text-input" v-model="form.incident.endedByOther" /></label>
      <label class="field full"><span class="field-label">{{ formLabels.incident.worsened }}</span><span class="field-hint">Np. nacisk, pośpiech, hałas, odmowa.</span><textarea class="text-area" v-model="form.incident.worsened"></textarea></label>
      <label class="field full"><span class="field-label">{{ formLabels.incident.regulators }}</span><span class="field-hint">Np. wyjście, cisza, czas, obecność znanej osoby.</span><textarea class="text-area" v-model="form.incident.regulators"></textarea></label>
      <label class="field full"><span class="field-label">{{ formLabels.incident.rewards }}</span><span class="field-hint">Np. zachęta, jasny cel, wsparcie dorosłego, chęć uniknięcia konsekwencji.</span><textarea class="text-area" v-model="form.incident.rewards"></textarea></label>
    </div>
  </section>
</template>
