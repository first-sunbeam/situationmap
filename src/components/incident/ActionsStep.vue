<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

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
      <ChoiceGroupWithOther
        v-model="form.incident.interventions"
        v-model:other="form.incident.interventionDetails"
        :label="formLabels.incident.interventions"
        :options="interventionTypeOptions"
        :other-label="formLabels.incident.interventionDetails"
        :other-error="fieldErrors['incident.interventionDetails']"
      />
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
