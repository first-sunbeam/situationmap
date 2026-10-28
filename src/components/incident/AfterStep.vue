<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import StageResponseField from "../form/StageResponseField.vue";
import FormSection from "../form/FormSection.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const { labels, revision, env, form, fieldErrors, subject, yesNoUnknown } = useFormState();
</script>

<template>
  <FormSection
    :title="labels.incident.afterSection"
    :hint="labels.ui.afterSectionHint"
    :error="fieldErrors['incident.afterSection']"
    required
  >
    <div class="field-grid">
      <StageResponseField v-model="form.incident.postEscalationNeeds" v-model:sources="form.incident.postEscalationSources" stage="postEscalationNeeds" />
      <ChoiceGroupWithOther
        v-model="form.incident.after"
        v-model:other="form.incident.afterOther"
        :label="labels.incident.after"
        :options="env.after"
        :other-label="labels.incident.afterOther"
        :other-error="fieldErrors['incident.afterOther']"
      />
      <SelectField
        v-model="form.incident.physicalDuringEvent"
        :label="revision.physicalDuringEvent"
        :options="yesNoUnknown"
        :hint="revision.physicalHint"
      />
      <InputField
        v-model="form.incident.eventPhysicalCount"
        :label="revision.eventPhysicalCount"
        :required="form.incident.physicalDuringEvent === 'yes'"
        :error="fieldErrors['incident.eventPhysicalCount']"
      />
      <SelectField
        v-model="form.incident.lowerThreshold"
        :label="`${labels.ui.lowerThresholdFor} ${subject}`"
        :options="yesNoUnknown"
        :hint="labels.ui.lowerThresholdHint"
      />
      <TextAreaField
        v-model="form.incident.eventPhysicalNote"
        :label="revision.eventPhysicalNote"
        :hint="revision.physicalHint"
      />
    </div>
  </FormSection>
</template>
