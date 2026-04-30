<script setup>
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";

function hasOther(selected = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { form, fieldErrors, commonSignals, yesNoUnknown, toggle } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.signalsSection'] }">
    <h3>{{ formLabels.incident.signalsSection }} <span class="required-mark">*</span></h3>
    <p v-if="fieldErrors['incident.signalsSection']" class="field-error">{{ fieldErrors['incident.signalsSection'] }}</p>
    <div class="field-grid">
      <label class="field"><span class="field-label">{{ formLabels.incident.signalsAppeared }}</span><select class="text-input" v-model="form.incident.signalsAppeared"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-signals`">{{ item }}</option></select></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.timeToEscalation }}</span><input class="text-input" v-model="form.incident.timeToEscalation" /></label>
      <div class="field full">
        <span class="field-label">{{ formLabels.incident.signals }} <span v-if="form.incident.signalsAppeared === 'Tak'" class="required-mark">*</span></span>
        <div class="choice-grid">
          <label class="choice" v-for="item in commonSignals" :key="item"><input type="checkbox" :checked="form.incident.signals.includes(item)" @change="toggle(form.incident.signals, item)" />{{ item }}</label>
        </div>
      </div>
      <label class="field"><span class="field-label">{{ formLabels.incident.firstSignal }}</span><input class="text-input" v-model="form.incident.firstSignal" /></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.predicts }}</span><select class="text-input" v-model="form.incident.predicts"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-predicts`">{{ item }}</option></select></label>
      <label v-if="hasOther(form.incident.signals, form.incident.signalsOther)" class="field full"><span class="field-label">{{ formLabels.incident.signalsOther }}</span><input class="text-input" v-model="form.incident.signalsOther" /></label>
    </div>
  </section>
</template>
