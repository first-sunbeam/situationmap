<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import StageResponseField from "../form/StageResponseField.vue";
import FormSection from "../form/FormSection.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

const { labels, revision, form, fieldErrors, activationSignalOptions, sensorySignalOptions, shutdownSignalOptions, yesNoUnknown } = useFormState();
</script>

<template>
  <FormSection :title="labels.incident.signalsSection" :hint="labels.ui.signalsSectionHint" :error="fieldErrors['incident.signalsSection']" required>
    <div class="field-grid">
      <StageResponseField v-model="form.incident.earlyResponse" v-model:sources="form.incident.earlyResponseSources" v-model:source-types="form.incident.earlyResponseSourceTypes" stage="earlyResponse" :source-scope-hint="revision.earlyResponseSourceScopeHint">
        <template #observations>
          <SelectField v-model="form.incident.signalsAppeared" :label="labels.incident.signalsAppeared" :options="yesNoUnknown" />
          <InputField v-model="form.incident.timeToEscalation" :label="labels.incident.timeToEscalation" :required="form.incident.signalsAppeared === 'yes'" :error="fieldErrors['incident.timeToEscalation']" />
          <ChoiceGroupWithOther
            v-model="form.incident.activationSignals" v-model:other="form.incident.activationSignalsOther"
            :label="labels.incident.activationSignals" :options="activationSignalOptions"
            :other-label="labels.incident.activationSignalsOther" :other-error="fieldErrors['incident.activationSignalsOther']"
          />
          <ChoiceGroupWithOther
            v-model="form.incident.shutdownSignals" v-model:other="form.incident.shutdownSignalsOther"
            :label="labels.incident.shutdownSignals" :options="shutdownSignalOptions"
            :other-label="labels.incident.shutdownSignalsOther" :other-error="fieldErrors['incident.shutdownSignalsOther']"
          />
          <ChoiceGroupWithOther
            v-model="form.incident.sensorySignals" v-model:other="form.incident.sensorySignalsOther"
            :label="labels.incident.sensorySignals" :options="sensorySignalOptions"
            :other-label="labels.incident.sensorySignalsOther" :other-error="fieldErrors['incident.sensorySignalsOther']"
          />
        </template>
      </StageResponseField>
      <InputField v-model="form.incident.firstSignal" :label="labels.incident.firstSignal" />
      <SelectField v-model="form.incident.signalsInOtherRecords" :label="labels.incident.predicts" :options="yesNoUnknown" />
    </div>
  </FormSection>
</template>
