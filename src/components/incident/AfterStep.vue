<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import FormSection from "../form/FormSection.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

const { labels, env, form, fieldErrors, subject, yesNoUnknown } = useFormState();
</script>

<template>
  <FormSection
    :title="labels.incident.afterSection"
    hint="Ta sekcja opisuje, co wydarzyło się po opanowaniu sytuacji i po powrocie do względnej równowagi."
    :error="fieldErrors['incident.afterSection']"
    required
  >
    <div class="field-grid">
      <ChoiceGroupWithOther
        v-model="form.incident.after"
        v-model:other="form.incident.afterOther"
        :label="labels.incident.after"
        :options="env.after"
        :other-label="labels.incident.afterOther"
        :other-error="fieldErrors['incident.afterOther']"
      />
      <SelectField
        v-model="form.incident.physicalThisWeek"
        :label="labels.incident.physicalThisWeek"
        :options="yesNoUnknown"
        hint="Np. przytrzymanie dla bezpieczeństwa, fizyczne przeniesienie, blokowanie ruchów."
      />
      <InputField
        v-model="form.incident.physicalCount"
        :label="labels.incident.physicalCount"
        :required="form.incident.physicalThisWeek === 'Tak'"
        :error="fieldErrors['incident.physicalCount']"
      />
      <SelectField
        v-model="form.incident.lowerThreshold"
        :label="`Szybsza lub silniejsza reakcja niż zwykle u ${subject}`"
        :options="yesNoUnknown"
        hint="Np. napięcie rosło szybciej, trudniej było wrócić do równowagi albo reakcja była silniejsza niż zwykle."
      />
      <InputField
        v-model="form.incident.physicalNote"
        :label="labels.incident.physicalNote"
        full
      />
    </div>
  </FormSection>
</template>
