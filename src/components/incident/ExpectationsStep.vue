<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import FormSection from "../form/FormSection.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { labels, env, form, fieldErrors, subject, yesNoUnknown } = useFormState();
</script>

<template>
  <FormSection
    :title="labels.incident.expectationsSection"
    :hint="labels.ui.expectationsSectionHint"
    :error="fieldErrors['incident.expectationsSection']"
    required
  >
    <div class="field-grid">
      <TextAreaField
        v-model="form.incident.influence"
        :label="`${labels.ui.influenceFor} ${subject}?`"
        :hint="labels.ui.influenceHint"
        required
        :error="fieldErrors['incident.influence']"
      />
      <TextAreaField
        v-model="form.incident.noInfluence"
        :label="`${labels.ui.noInfluenceFor} ${subject}, ${labels.ui.noInfluenceSuffix}`"
        :hint="labels.ui.noInfluenceHint"
      />
      <fieldset class="field group-field full">
        <legend class="field-label">
          {{ labels.incident.predictability }}
        </legend>
        <div class="field-grid">
          <SelectField
            v-model="form.incident.predictabilityWhat"
            :label="labels.incident.predictabilityWhat"
            :options="yesNoUnknown"
          />
          <SelectField
            v-model="form.incident.predictabilityDuration"
            :label="labels.incident.predictabilityDuration"
            :options="yesNoUnknown"
          />
          <SelectField
            v-model="form.incident.predictabilityChoice"
            :label="labels.incident.predictabilityChoice"
            :options="yesNoUnknown"
          />
        </div>
      </fieldset>
      <ChoiceGroupWithOther
        v-model="form.incident.expectations"
        v-model:other="form.incident.expectationOther"
        :label="labels.incident.expectations"
        :options="env.expectations"
        :other-label="labels.incident.expectationOther"
        :other-error="fieldErrors['incident.expectationOther']"
      />
    </div>
  </FormSection>
</template>
