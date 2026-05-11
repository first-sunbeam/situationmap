<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import FormSection from "../form/FormSection.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { labels, env, form, fieldErrors } = useFormState();
</script>

<template>
  <FormSection
    :title="labels.incident.beforeSection"
    :hint="labels.ui.beforeSectionHint"
    :error="fieldErrors['incident.beforeSection']"
    required
  >
    <div class="field-grid">
      <fieldset class="field group-field full">
        <legend class="field-label">
          {{ labels.incident.antecedents }}
        </legend>
        <ChoiceGroupField
          v-model="form.incident.antecedents"
          :options="env.antecedents"
          :hint="labels.ui.beforeChoiceHint"
          :error="fieldErrors['incident.beforeSection']"
        />
        <TextAreaField
          v-model="form.incident.factDescription"
          :label="labels.incident.factDescription"
          :hint="labels.ui.beforeDetailsHint"
          :error="fieldErrors['incident.factDescription']"
        />
      </fieldset>
    </div>
  </FormSection>
</template>
