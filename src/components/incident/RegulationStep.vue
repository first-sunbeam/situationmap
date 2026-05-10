<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import ChoiceGroupWithOther from "../form/ChoiceGroupWithOther.vue";
import FormSection from "../form/FormSection.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";
import TextAreaField from "../form/TextAreaField.vue";

const {
  labels,
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
  <FormSection
    :title="labels.incident.regulationSection"
    hint="Uspokojenie emocjonalne ≠ gotowość poznawcza. Układ nerwowy potrzebuje czasu na powrót do trybu „zaangażowania społecznego” – to może trwać od kilku minut do kilku godzin."
    :error="fieldErrors['incident.regulationSection']"
    required
  >
    <div class="field-grid">
      <fieldset class="field group-field full">
        <legend class="field-label">
          Czas eskalacji i powrotu do dostępności
        </legend>
        <InputField
          v-model="form.incident.escalationDuration"
          :label="labels.incident.escalationDuration"
        />
        <SelectField
          v-model="form.incident.calmTime"
          :label="labels.incident.calmTime"
          :options="calmTime"
        />
        <SelectField
          v-model="form.incident.cognitiveRecoveryTime"
          :label="labels.incident.cognitiveRecoveryTime"
          :options="cognitiveRecoveryOptions"
          :hint="`Gotowość na rozmowę, rozumienie poleceń, kontakt wzrokowy lub powrót do aktywności u ${subject}.`"
        />
      </fieldset>
      <ChoiceGroupWithOther
        v-model="form.incident.endedBy"
        v-model:other="form.incident.endedByOther"
        :label="labels.incident.endedBy"
        :options="env.endedBy"
        :other-label="labels.incident.endedByOther"
        :other-error="fieldErrors['incident.endedByOther']"
        hint="To pytanie dotyczy momentu PO pełnej eskalacji – co w końcu zatrzymało kryzys?"
        required
      />
      <TextAreaField
        v-model="form.incident.worsened"
        :label="labels.incident.worsened"
        hint="Np. nacisk, pośpiech, hałas, dotyk, obecność dodatkowych osób, próba rozmowy, odmowa, kontynuowanie wymagań."
      />
      <ChoiceGroupWithOther
        v-model="form.incident.recoverySupports"
        v-model:other="form.incident.recoverySupportsOther"
        :label="labels.incident.recoverySupports"
        :options="recoverySupportOptions"
        :other-label="labels.incident.recoverySupportsOther"
        :other-error="fieldErrors['incident.recoverySupportsOther']"
        :hint="`Uspokojenie emocjonalne ≠ gotowość poznawcza. Układ nerwowy potrzebuje czasu na powrót do trybu „zaangażowania społecznego” – to może trwać od kilku minut do kilku godzin. Szybki „powrót do normy” na zewnątrz przy późniejszej eskalacji wieczorem/w domu może oznaczać kontynuowanie maskowania u ${subject}.`"
      />
    </div>
  </FormSection>
</template>
