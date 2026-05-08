<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
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

const {
  form,
  fieldErrors,
  interventionTypeOptions,
  regulationPhase,
  yesNoPartial,
} = useFormState();
const unconditionalOptions = ["Tak", "Nie", "Częściowo", "Nie wiem"];
</script>

<template>
  <section
    class="section"
    :class="{ invalidSection: fieldErrors['incident.actionsSection'] }"
  >
    <h3>
      {{ formLabels.incident.actionsSection }}
      <span class="required-mark">*</span>
    </h3>
    <p class="section-hint">
      Interwencja jest skuteczniejsza, gdy odpowiada na typ obciążenia:
      sensoryczny, interoceptywny, autonomii albo przewidywalności.
    </p>
    <p v-if="fieldErrors['incident.actionsSection']" class="field-error">
      {{ fieldErrors["incident.actionsSection"] }}
    </p>
    <div class="field-grid">
      <SelectField
        v-model="form.incident.phase"
        :label="formLabels.incident.phase"
        :options="regulationPhase"
        hint="Np. możliwa współpraca, narastające napięcie, pełna eskalacja."
        full
      />
      <fieldset class="field group-field full">
        <legend class="field-label">
          {{ formLabels.incident.interventions }}
        </legend>
        <ChoiceGroupField
          v-model="form.incident.interventions"
          :options="interventionTypeOptions"
        />
        <InputField
          v-if="
            hasOther(
              form.incident.interventions,
              form.incident.interventionDetails,
            )
          "
          v-model="form.incident.interventionDetails"
          :label="formLabels.incident.interventionDetails"
          :required="form.incident.interventions.includes('Inne')"
          :error="fieldErrors['incident.interventionDetails']"
          full
        />
      </fieldset>
      <SelectField
        v-model="form.incident.unconditional"
        :label="formLabels.incident.unconditional"
        :options="unconditionalOptions"
      />
      <SelectField
        v-model="form.incident.usedRegulator"
        :label="formLabels.incident.usedRegulator"
        :options="yesNoPartial"
      />
      <SelectField
        v-model="form.incident.reducedTension"
        :label="formLabels.incident.reducedTension"
        :options="yesNoPartial"
      />
      <TextAreaField
        v-model="form.incident.earlierWhat"
        :label="formLabels.incident.earlierWhat"
        hint="Np. co warto zauważyć wcześniej następnym razem albo jakie wsparcie mogłoby pomóc wcześniej."
      />
    </div>
  </section>
</template>
