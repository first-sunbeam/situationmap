<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { form, fieldErrors, commonSignals, yesNoUnknown } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.signalsSection'] }">
    <h3>{{ formLabels.incident.signalsSection }} <span class="required-mark">*</span></h3>
    <p v-if="fieldErrors['incident.signalsSection']" class="field-error">{{ fieldErrors['incident.signalsSection'] }}</p>
    <div class="field-grid">
      <SelectField v-model="form.incident.signalsAppeared" :label="formLabels.incident.signalsAppeared" :options="yesNoUnknown" />
      <InputField v-model="form.incident.timeToEscalation" :label="formLabels.incident.timeToEscalation" />
      <ChoiceGroupField
        v-model="form.incident.signals"
        :label="formLabels.incident.signals"
        :options="commonSignals"
        :required="form.incident.signalsAppeared === 'Tak'"
      />
      <InputField
        v-if="hasOther(form.incident.signals, form.incident.signalsOther)"
        v-model="form.incident.signalsOther"
        :label="formLabels.incident.signalsOther"
        :required="form.incident.signals.includes('inne')"
        :error="fieldErrors['incident.signalsOther']"
        full
      />
      <InputField v-model="form.incident.firstSignal" :label="formLabels.incident.firstSignal" />
      <SelectField v-model="form.incident.predicts" :label="formLabels.incident.predicts" :options="yesNoUnknown" />
    </div>
  </section>
</template>
