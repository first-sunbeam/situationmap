<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { env, form, fieldErrors, intensity } = useFormState();
</script>

<template>
  <section
    class="section"
    :class="{ invalidSection: fieldErrors['incident.behaviorSection'] }"
  >
    <h3>
      {{ formLabels.incident.behaviorSection }}
      <span class="required-mark">*</span>
    </h3>
    <p class="section-hint">
      Opis obserwowalnego zachowania pomaga odróżnić reakcję układu nerwowego od
      intencji lub „nieposłuszeństwa”.
    </p>
    <p v-if="fieldErrors['incident.behaviorSection']" class="field-error">
      {{ fieldErrors["incident.behaviorSection"] }}
    </p>
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
  </section>
</template>
