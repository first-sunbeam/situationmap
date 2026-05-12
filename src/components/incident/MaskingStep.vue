<script setup lang="ts">
import { watch } from "vue";
import { useFormState } from "../../composables/useFormState";
import { hasOther, hasSelectedOther } from "../../lib/formUtils";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import FormSection from "../form/FormSection.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

const { labels, form, fieldErrors, maskingDurationOptions, maskingStrategyOptions, subjectNominative, yesNoUnknown } = useFormState();

watch(
  () => form.value.incident.maskingContinued,
  (maskingContinued) => {
    if (maskingContinued === "yes") return;

    form.value.incident.maskingStrategies = [];
    form.value.incident.maskingStrategiesOther = "";
    form.value.incident.maskingDuration = "";
  },
);
</script>

<template>
  <FormSection
    :title="labels.incident.maskingSection"
    :hint="labels.ui.maskingSectionHint"
    :error="fieldErrors['incident.maskingSection']"
  >
    <div class="field-grid">
      <SelectField v-model="form.incident.maskingContinued" :label="`${labels.ui.maskingContinuedFor} ${subjectNominative}`" :options="yesNoUnknown" />
      <fieldset v-if="form.incident.maskingContinued === 'yes'" class="field group-field full">
        <legend class="field-label">{{ labels.ui.maskingGroupLegend }}</legend>
        <ChoiceGroupField
          v-model="form.incident.maskingStrategies"
          :options="maskingStrategyOptions"
        />
        <InputField
          v-if="hasOther(form.incident.maskingStrategies, form.incident.maskingStrategiesOther)"
          v-model="form.incident.maskingStrategiesOther"
          :label="labels.incident.maskingStrategiesOther"
          :required="hasSelectedOther(form.incident.maskingStrategies)"
          :error="fieldErrors['incident.maskingStrategiesOther']"
          full
        />
        <SelectField v-model="form.incident.maskingDuration" :label="`${labels.ui.maskingDurationFor} ${subjectNominative}`" :options="maskingDurationOptions" />
      </fieldset>
    </div>
  </FormSection>
</template>
