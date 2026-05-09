<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

const { env, form, fieldErrors, subject, yesNoUnknown } = useFormState();
</script>

<template>
  <section
    class="section"
    :class="{ invalidSection: fieldErrors['incident.afterSection'] }"
  >
    <h3>
      {{ formLabels.incident.afterSection }}
      <span class="required-mark">*</span>
    </h3>
    <p class="section-hint">
      Ta sekcja opisuje, co wydarzyło się po opanowaniu sytuacji i po powrocie
      do względnej równowagi.
    </p>
    <p v-if="fieldErrors['incident.afterSection']" class="field-error">
      {{ fieldErrors["incident.afterSection"] }}
    </p>
    <div class="field-grid">
      <ChoiceGroupWithOther
        v-model="form.incident.after"
        v-model:other="form.incident.afterOther"
        :label="formLabels.incident.after"
        :options="env.after"
        :other-label="formLabels.incident.afterOther"
        :other-error="fieldErrors['incident.afterOther']"
      />
      <SelectField
        v-model="form.incident.physicalThisWeek"
        :label="formLabels.incident.physicalThisWeek"
        :options="yesNoUnknown"
        hint="Np. przytrzymanie dla bezpieczeństwa, fizyczne przeniesienie, blokowanie ruchów."
      />
      <InputField
        v-model="form.incident.physicalCount"
        :label="formLabels.incident.physicalCount"
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
        :label="formLabels.incident.physicalNote"
        full
      />
    </div>
  </section>
</template>
