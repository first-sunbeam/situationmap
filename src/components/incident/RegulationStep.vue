<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import InputField from "../form/InputField.vue";
import TextAreaField from "../form/TextAreaField.vue";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.regulationSection'] }">
    <h3>{{ formLabels.incident.regulationSection }} <span class="required-mark">*</span></h3>
    <p class="section-hint">Pole obowiązkowe: zaznacz, co najbardziej pomogło w tej sytuacji.</p>
    <p v-if="fieldErrors['incident.regulationSection']" class="field-error">{{ fieldErrors['incident.regulationSection'] }}</p>
    <div class="field-grid">
      <ChoiceGroupField v-model="form.incident.endedBy" :label="formLabels.incident.endedBy" :options="env.endedBy" required />
      <InputField
        v-if="hasOther(form.incident.endedBy, form.incident.endedByOther)"
        v-model="form.incident.endedByOther"
        :label="formLabels.incident.endedByOther"
        :required="form.incident.endedBy.includes('inne')"
        :error="fieldErrors['incident.endedByOther']"
        full
      />
      <TextAreaField v-model="form.incident.worsened" :label="formLabels.incident.worsened" hint="Np. nacisk, pośpiech, hałas, odmowa." />
      <TextAreaField v-model="form.incident.regulators" :label="formLabels.incident.regulators" hint="Np. wyjście, cisza, czas, obecność znanej osoby." />
      <TextAreaField v-model="form.incident.rewards" :label="formLabels.incident.rewards" hint="Np. zachęta, jasny cel, wsparcie dorosłego, chęć uniknięcia konsekwencji." />
    </div>
  </section>
</template>
