<script setup lang="ts">
import { computed } from "vue";
import { useFormState } from "../../composables/useFormState";
import { getSubjectInline } from "../../lib/subject";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

function hasOther(selected: string[] = [], value = "") {
  return (
    selected.includes("Inne") ||
    selected.includes("inne") ||
    String(value || "").trim() !== ""
  );
}

const { env, form, fieldErrors, yesNoUnknown } = useFormState();
const subject = computed(() => getSubjectInline(form.value));
</script>

<template>
  <section
    class="section"
    :class="{ invalidSection: fieldErrors['incident.expectationsSection'] }"
  >
    <h3>
      {{ formLabels.incident.expectationsSection }}
      <span class="required-mark">*</span>
    </h3>
    <p class="section-hint">
      W PDA brak autonomii i nieprzewidywalność aktywują reakcję zagrożenia w
      układzie nerwowym.
    </p>
    <p v-if="fieldErrors['incident.expectationsSection']" class="field-error">
      {{ fieldErrors["incident.expectationsSection"] }}
    </p>
    <div class="field-grid">
      <TextAreaField
        v-model="form.incident.influence"
        :label="`Co było jasne dla ${subject} i na co był wpływ w tym momencie?`"
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
      <fieldset class="field group-field full">
        <legend class="field-label">
          {{ formLabels.incident.expectations }}
        </legend>
        <ChoiceGroupField
          v-model="form.incident.expectations"
          :options="env.expectations"
        />
        <InputField
          v-if="
            hasOther(form.incident.expectations, form.incident.expectationOther)
          "
          v-model="form.incident.expectationOther"
          :label="formLabels.incident.expectationOther"
          :required="form.incident.expectations.includes('inne')"
          :error="fieldErrors['incident.expectationOther']"
          full
        />
      </fieldset>
    </div>
  </section>
</template>
