<script setup>
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";

function hasOther(selected = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors, regulationPhase, yesNoPartial, yesNoUnknown, toggle } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.actionsSection'] }">
    <h3>{{ formLabels.incident.actionsSection }} <span class="required-mark">*</span></h3>
    <p v-if="fieldErrors['incident.actionsSection']" class="field-error">{{ fieldErrors['incident.actionsSection'] }}</p>
    <div class="field-grid">
      <label class="field full"><span class="field-label">{{ formLabels.incident.phase }}</span><span class="field-hint">Np. możliwa współpraca, narastające napięcie, pełna eskalacja.</span><select class="text-input" v-model="form.incident.phase"><option value="">Wybierz</option><option v-for="item in regulationPhase" :key="item">{{ item }}</option></select></label>
      <div class="field full">
        <span class="field-label">{{ formLabels.incident.interventions }}</span>
        <div class="choice-grid">
          <label class="choice" v-for="item in env.interventions" :key="item"><input type="checkbox" :checked="form.incident.interventions.includes(item)" @change="toggle(form.incident.interventions, item)" />{{ item }}</label>
        </div>
      </div>
      <label v-if="hasOther(form.incident.interventions, form.incident.interventionDetails)" class="field full"><span class="field-label">{{ formLabels.incident.interventionDetails }}</span><input class="text-input" v-model="form.incident.interventionDetails" /></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.unconditional }}</span><select class="text-input" v-model="form.incident.unconditional"><option value="">Wybierz</option><option>Tak</option><option>Nie</option><option>Częściowo</option><option>Nie wiem</option></select></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.usedRegulator }}</span><select class="text-input" v-model="form.incident.usedRegulator"><option value="">Wybierz</option><option v-for="item in yesNoPartial" :key="item">{{ item }}</option></select></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.reducedTension }}</span><select class="text-input" v-model="form.incident.reducedTension"><option value="">Wybierz</option><option v-for="item in yesNoPartial" :key="`${item}-reduced`">{{ item }}</option></select></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.earlierPossible }}</span><select class="text-input" v-model="form.incident.earlierPossible"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-earlier`">{{ item }}</option></select></label>
      <label class="field full"><span class="field-label">{{ formLabels.incident.earlierWhat }}</span><input class="text-input" v-model="form.incident.earlierWhat" /></label>
    </div>
  </section>
</template>
