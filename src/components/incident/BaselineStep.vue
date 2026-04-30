<script setup>
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";

function hasOther(selected = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors, tensionLevels, yesNoUnknown, toggle } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.baselineSection'] }">
    <h3>{{ formLabels.incident.baselineSection }} <span class="required-mark">*</span></h3>
    <p v-if="fieldErrors['incident.baselineSection']" class="field-error">{{ fieldErrors['incident.baselineSection'] }}</p>
    <div class="field-grid">
      <label class="field"><span class="field-label">{{ formLabels.incident.tension }}</span><span class="field-hint">Jak wyglądał stan osoby przed zdarzeniem?</span><select class="text-input" v-model="form.incident.tension"><option value="">Wybierz</option><option v-for="item in tensionLevels" :key="item">{{ item }}</option></select></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.tired }}</span><select class="text-input" v-model="form.incident.tired"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="item">{{ item }}</option></select></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.slept }}</span><select class="text-input" v-model="form.incident.slept"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-slept`">{{ item }}</option></select></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.sleepDetails }}</span><input class="text-input" v-model="form.incident.sleepDetails" /></label>
      <template v-if="env.stayStages">
        <label class="field"><span class="field-label">{{ formLabels.incident.stayStage }}</span><select class="text-input" v-model="form.incident.stayStage"><option value="">Wybierz</option><option v-for="item in env.stayStages" :key="item">{{ item }}</option></select></label>
        <label class="field"><span class="field-label">{{ formLabels.incident.stayStageLoad }}</span><select class="text-input" v-model="form.incident.stayStageLoad"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-load`">{{ item }}</option></select></label>
      </template>
      <div class="field full">
        <span class="field-label">{{ formLabels.incident.burdens }}</span>
        <div class="choice-grid">
          <label class="choice" v-for="item in env.burdens" :key="item"><input type="checkbox" :checked="form.incident.burdens.includes(item)" @change="toggle(form.incident.burdens, item)" />{{ item }}</label>
        </div>
      </div>
      <label v-if="hasOther(form.incident.burdens, form.incident.burdensOther)" class="field full"><span class="field-label">{{ formLabels.incident.burdensOther }}</span><input class="text-input" v-model="form.incident.burdensOther" /></label>
    </div>
  </section>
</template>
