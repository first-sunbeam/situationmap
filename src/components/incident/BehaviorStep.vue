<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import FormSection from "../form/FormSection.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { labels, env, form, fieldErrors, intensity } = useFormState();
</script>

<template>
  <FormSection
    :title="labels.incident.behaviorSection"
    hint="Opis obserwowalnego zachowania pomaga odróżnić reakcję układu nerwowego od intencji lub „nieposłuszeństwa”."
    :error="fieldErrors['incident.behaviorSection']"
    required
  >
    <div class="field-grid">
      <TextAreaField
        v-model="form.incident.behavior"
        :label="labels.incident.behavior"
      />
      <SelectField
        v-model="form.incident.intensity"
        :label="labels.incident.intensity"
        :options="intensity"
      />
      <fieldset class="field group-field full">
        <legend class="field-label">
          {{ labels.incident.harms }}
        </legend>
        <ChoiceGroupField v-model="form.incident.harms" :options="env.harms" />
      </fieldset>
    </div>
  </FormSection>
</template>
