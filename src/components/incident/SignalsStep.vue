<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { hasOther } from "../../lib/formUtils";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import FormSection from "../form/FormSection.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

const { labels, form, fieldErrors, activationSignalOptions, sensorySignalOptions, shutdownSignalOptions, yesNoUnknown } = useFormState();
</script>

<template>
  <FormSection
    :title="labels.incident.signalsSection"
    hint="Rozróżnienie typu reakcji pomaga dobrać interwencję – shutdown wymaga innego wsparcia niż aktywacja."
    :error="fieldErrors['incident.signalsSection']"
    required
  >
    <div class="field-grid">
      <SelectField v-model="form.incident.signalsAppeared" :label="labels.incident.signalsAppeared" :options="yesNoUnknown" />
      <InputField
        v-model="form.incident.timeToEscalation"
        :label="labels.incident.timeToEscalation"
        :required="form.incident.signalsAppeared === 'Tak'"
        :error="fieldErrors['incident.timeToEscalation']"
      />
      <fieldset class="field group-field full">
        <legend class="field-label">{{ labels.incident.activationSignals }}</legend>
        <ChoiceGroupField
          v-model="form.incident.activationSignals"
          :options="activationSignalOptions"
        />
        <InputField
          v-if="hasOther(form.incident.activationSignals, form.incident.activationSignalsOther)"
          v-model="form.incident.activationSignalsOther"
          :label="labels.incident.activationSignalsOther"
          :required="form.incident.activationSignals.includes('inne')"
          :error="fieldErrors['incident.activationSignalsOther']"
          full
        />
        <h4 class="field-label">{{ labels.incident.shutdownSignals }}</h4>
        <ChoiceGroupField
          v-model="form.incident.shutdownSignals"
          :options="shutdownSignalOptions"
        />
        <InputField
          v-if="hasOther(form.incident.shutdownSignals, form.incident.shutdownSignalsOther)"
          v-model="form.incident.shutdownSignalsOther"
          :label="labels.incident.shutdownSignalsOther"
          :required="form.incident.shutdownSignals.includes('inne')"
          :error="fieldErrors['incident.shutdownSignalsOther']"
          full
        />
        <h4 class="field-label">{{ labels.incident.sensorySignals }}</h4>
        <ChoiceGroupField
          v-model="form.incident.sensorySignals"
          :options="sensorySignalOptions"
        />
        <InputField
          v-if="hasOther(form.incident.sensorySignals, form.incident.sensorySignalsOther)"
          v-model="form.incident.sensorySignalsOther"
          :label="labels.incident.sensorySignalsOther"
          :required="form.incident.sensorySignals.includes('inne')"
          :error="fieldErrors['incident.sensorySignalsOther']"
          full
        />
      </fieldset>
      <InputField v-model="form.incident.firstSignal" :label="labels.incident.firstSignal" />
      <SelectField v-model="form.incident.predicts" :label="labels.incident.predicts" :options="yesNoUnknown" />
    </div>
  </FormSection>
</template>
