<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import FormSection from "../form/FormSection.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { env, form, fieldErrors, subject, yesNoUnknown } = useFormState();
</script>

<template>
  <FormSection
    :title="formLabels.incident.expectationsSection"
    hint="W PDA brak autonomii i nieprzewidywalność aktywują reakcję zagrożenia w układzie nerwowym."
    :error="fieldErrors['incident.expectationsSection']"
    required
  >
    <div class="field-grid">
      <TextAreaField
        v-model="form.incident.influence"
        :label="`Jaki był zakres wpływu i przewidywalności w tym momencie dla ${subject}?`"
        hint="Czy znało kolejny krok, czas trwania lub zakończenie aktywności? Co mogło wybrać, zmienić albo zakończyć?"
        required
        :error="fieldErrors['incident.influence']"
      />
      <TextAreaField
        v-model="form.incident.noInfluence"
        :label="`Co było nieznane dla ${subject}, narzucone albo poza wpływem?`"
        hint="Czego nie wiedziało? Co było nagłe, narzucone, nieuniknione albo bez możliwości negocjacji?"
      />
      <fieldset class="field group-field full">
        <legend class="field-label">
          {{ formLabels.incident.predictability }}
        </legend>
        <div class="field-grid">
          <SelectField
            v-model="form.incident.predictabilityWhat"
            :label="formLabels.incident.predictabilityWhat"
            :options="yesNoUnknown"
          />
          <SelectField
            v-model="form.incident.predictabilityDuration"
            :label="formLabels.incident.predictabilityDuration"
            :options="yesNoUnknown"
          />
          <SelectField
            v-model="form.incident.predictabilityChoice"
            :label="formLabels.incident.predictabilityChoice"
            :options="yesNoUnknown"
          />
        </div>
      </fieldset>
      <ChoiceGroupWithOther
        v-model="form.incident.expectations"
        v-model:other="form.incident.expectationOther"
        :label="formLabels.incident.expectations"
        :options="env.expectations"
        :other-label="formLabels.incident.expectationOther"
        :other-error="fieldErrors['incident.expectationOther']"
      />
    </div>
  </FormSection>
</template>
