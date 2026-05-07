<script setup lang="ts">
import { computed } from "vue";
import { useFormState } from "../../composables/useFormState";
import { getSubjectInline } from "../../lib/subject";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors, yesNoUnknown } = useFormState();
const subject = computed(() => getSubjectInline(form.value));
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.afterSection'] }">
    <h3>{{ formLabels.incident.afterSection }} <span class="required-mark">*</span></h3>
    <p class="section-hint">Ta sekcja opisuje, co wydarzyło się po opanowaniu sytuacji i po powrocie do względnej równowagi.</p>
    <p v-if="fieldErrors['incident.afterSection']" class="field-error">{{ fieldErrors['incident.afterSection'] }}</p>
    <div class="field-grid">
      <ChoiceGroupField v-model="form.incident.after" :label="formLabels.incident.after" :options="env.after" />
      <InputField
        v-if="hasOther(form.incident.after, form.incident.afterOther)"
        v-model="form.incident.afterOther"
        :label="formLabels.incident.afterOther"
        :required="form.incident.after.includes('Inne')"
        :error="fieldErrors['incident.afterOther']"
        full
      />
      <SelectField v-model="form.incident.physicalThisWeek" :label="formLabels.incident.physicalThisWeek" :options="yesNoUnknown" />
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
      <InputField v-model="form.incident.physicalNote" :label="formLabels.incident.physicalNote" full />
    </div>
  </section>
</template>
