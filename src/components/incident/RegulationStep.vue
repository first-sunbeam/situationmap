<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const {
  env,
  form,
  fieldErrors,
  subject,
  calmTime,
  cognitiveRecoveryOptions,
  recoverySupportOptions,
} = useFormState();
</script>

<template>
  <section
    class="section"
    :class="{ invalidSection: fieldErrors['incident.regulationSection'] }"
  >
    <h3>
      {{ formLabels.incident.regulationSection }}
      <span class="required-mark">*</span>
    </h3>
    <p class="section-hint">
      Uspokojenie emocjonalne ≠ gotowość poznawcza. Układ nerwowy potrzebuje
      czasu na powrót do trybu „zaangażowania społecznego” – to może trwać od
      kilku minut do kilku godzin.
    </p>
    <p v-if="fieldErrors['incident.regulationSection']" class="field-error">
      {{ fieldErrors["incident.regulationSection"] }}
    </p>
    <div class="field-grid">
      <fieldset class="field group-field full">
        <legend class="field-label">
          Czas eskalacji i powrotu do dostępności
        </legend>
        <InputField
          v-model="form.incident.escalationDuration"
          :label="formLabels.incident.escalationDuration"
        />
        <SelectField
          v-model="form.incident.calmTime"
          :label="formLabels.incident.calmTime"
          :options="calmTime"
        />
        <SelectField
          v-model="form.incident.cognitiveRecoveryTime"
          :label="formLabels.incident.cognitiveRecoveryTime"
          :options="cognitiveRecoveryOptions"
          :hint="`Gotowość na rozmowę, rozumienie poleceń, kontakt wzrokowy lub powrót do aktywności u ${subject}.`"
        />
      </fieldset>
      <ChoiceGroupWithOther
        v-model="form.incident.endedBy"
        v-model:other="form.incident.endedByOther"
        :label="formLabels.incident.endedBy"
        :options="env.endedBy"
        :other-label="formLabels.incident.endedByOther"
        :other-error="fieldErrors['incident.endedByOther']"
        hint="To pytanie dotyczy momentu PO pełnej eskalacji – co w końcu zatrzymało kryzys?"
        required
      />
      <TextAreaField
        v-model="form.incident.worsened"
        :label="formLabels.incident.worsened"
        hint="Np. nacisk, pośpiech, hałas, dotyk, obecność dodatkowych osób, próba rozmowy, odmowa, kontynuowanie wymagań."
      />
      <ChoiceGroupWithOther
        v-model="form.incident.recoverySupports"
        v-model:other="form.incident.recoverySupportsOther"
        :label="formLabels.incident.recoverySupports"
        :options="recoverySupportOptions"
        :other-label="formLabels.incident.recoverySupportsOther"
        :other-error="fieldErrors['incident.recoverySupportsOther']"
        :hint="`Uspokojenie emocjonalne ≠ gotowość poznawcza. Układ nerwowy potrzebuje czasu na powrót do trybu „zaangażowania społecznego” – to może trwać od kilku minut do kilku godzin. Szybki „powrót do normy” na zewnątrz przy późniejszej eskalacji wieczorem/w domu może oznaczać kontynuowanie maskowania u ${subject}.`"
      />
    </div>
  </section>
</template>
