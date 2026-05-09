<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import FormSection from "../form/FormSection.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { env, form, fieldErrors, intensity } = useFormState();
</script>

<template>
  <FormSection
    :title="formLabels.incident.behaviorSection"
    hint="Opis obserwowalnego zachowania pomaga odróżnić reakcję układu nerwowego od intencji lub „nieposłuszeństwa”."
    :error="fieldErrors['incident.behaviorSection']"
    required
  >
    <div class="field-grid">
      <TextAreaField
        v-model="form.incident.behavior"
        :label="formLabels.incident.behavior"
      />
      <SelectField
        v-model="form.incident.intensity"
        :label="formLabels.incident.intensity"
        :options="intensity"
      />
      <fieldset class="field group-field full">
        <legend class="field-label">
          {{ formLabels.incident.harms }}
        </legend>
        <ChoiceGroupField v-model="form.incident.harms" :options="env.harms" />
      </fieldset>
    </div>
  </FormSection>
</template>
