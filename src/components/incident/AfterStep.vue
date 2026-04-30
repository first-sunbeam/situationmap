<script setup>
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";

function hasOther(selected = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors, calmTime, yesNoUnknown, toggle } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.afterSection'] }">
    <h3>{{ formLabels.incident.afterSection }} <span class="required-mark">*</span></h3>
    <p v-if="fieldErrors['incident.afterSection']" class="field-error">{{ fieldErrors['incident.afterSection'] }}</p>
    <div class="field-grid">
      <div class="field full"><span class="field-label">{{ formLabels.incident.after }}</span><div class="choice-grid"><label class="choice" v-for="item in env.after" :key="item"><input type="checkbox" :checked="form.incident.after.includes(item)" @change="toggle(form.incident.after, item)" />{{ item }}</label></div></div>
      <label v-if="hasOther(form.incident.after, form.incident.afterOther)" class="field full"><span class="field-label">{{ formLabels.incident.afterOther }}</span><input class="text-input" v-model="form.incident.afterOther" /></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.calmTime }}</span><select class="text-input" v-model="form.incident.calmTime"><option value="">Wybierz</option><option v-for="item in calmTime" :key="item">{{ item }}</option></select></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.physicalThisWeek }}</span><select class="text-input" v-model="form.incident.physicalThisWeek"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-physical`">{{ item }}</option></select></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.physicalCount }}</span><input class="text-input" v-model="form.incident.physicalCount" /></label>
      <label class="field"><span class="field-label">{{ formLabels.incident.lowerThreshold }}</span><select class="text-input" v-model="form.incident.lowerThreshold"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-threshold`">{{ item }}</option></select></label>
      <label class="field full"><span class="field-label">{{ formLabels.incident.physicalNote }}</span><input class="text-input" v-model="form.incident.physicalNote" /></label>
    </div>
  </section>
</template>
