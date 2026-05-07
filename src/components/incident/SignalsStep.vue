<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { form, fieldErrors, activationSignalOptions, sensorySignalOptions, shutdownSignalOptions, yesNoUnknown } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.signalsSection'] }">
    <h3>{{ formLabels.incident.signalsSection }} <span class="required-mark">*</span></h3>
    <p class="section-hint">Rozróżnienie typu reakcji pomaga dobrać interwencję – shutdown wymaga innego wsparcia niż aktywacja.</p>
    <p v-if="fieldErrors['incident.signalsSection']" class="field-error">{{ fieldErrors['incident.signalsSection'] }}</p>
    <div class="field-grid">
      <SelectField v-model="form.incident.signalsAppeared" :label="formLabels.incident.signalsAppeared" :options="yesNoUnknown" />
      <InputField
        v-model="form.incident.timeToEscalation"
        :label="formLabels.incident.timeToEscalation"
        :required="form.incident.signalsAppeared === 'Tak'"
        :error="fieldErrors['incident.timeToEscalation']"
      />
      <fieldset class="field group-field full">
        <legend class="field-label">{{ formLabels.incident.activationSignals }}</legend>
        <ChoiceGroupField
          v-model="form.incident.activationSignals"
          :options="activationSignalOptions"
        />
        <InputField
          v-if="hasOther(form.incident.activationSignals, form.incident.activationSignalsOther)"
          v-model="form.incident.activationSignalsOther"
          :label="formLabels.incident.activationSignalsOther"
          :required="form.incident.activationSignals.includes('inne')"
          :error="fieldErrors['incident.activationSignalsOther']"
          full
        />
        <h4 class="field-label">{{ formLabels.incident.shutdownSignals }}</h4>
        <ChoiceGroupField
          v-model="form.incident.shutdownSignals"
          :options="shutdownSignalOptions"
        />
        <InputField
          v-if="hasOther(form.incident.shutdownSignals, form.incident.shutdownSignalsOther)"
          v-model="form.incident.shutdownSignalsOther"
          :label="formLabels.incident.shutdownSignalsOther"
          :required="form.incident.shutdownSignals.includes('inne')"
          :error="fieldErrors['incident.shutdownSignalsOther']"
          full
        />
        <h4 class="field-label">{{ formLabels.incident.sensorySignals }}</h4>
        <ChoiceGroupField
          v-model="form.incident.sensorySignals"
          :options="sensorySignalOptions"
        />
        <InputField
          v-if="hasOther(form.incident.sensorySignals, form.incident.sensorySignalsOther)"
          v-model="form.incident.sensorySignalsOther"
          :label="formLabels.incident.sensorySignalsOther"
          :required="form.incident.sensorySignals.includes('inne')"
          :error="fieldErrors['incident.sensorySignalsOther']"
          full
        />
      </fieldset>
      <InputField v-model="form.incident.firstSignal" :label="formLabels.incident.firstSignal" />
      <SelectField v-model="form.incident.predicts" :label="formLabels.incident.predicts" :options="yesNoUnknown" />
    </div>
  </section>
</template>
