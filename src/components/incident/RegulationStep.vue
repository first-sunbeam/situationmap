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
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors, calmTime, cognitiveRecoveryOptions, recoverySupportOptions } = useFormState();
const subject = computed(() => getSubjectInline(form.value));
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.regulationSection'] }">
    <h3>{{ formLabels.incident.regulationSection }} <span class="required-mark">*</span></h3>
    <p class="section-hint">Uspokojenie emocjonalne ≠ gotowość poznawcza. Układ nerwowy potrzebuje czasu na powrót do trybu „zaangażowania społecznego” – to może trwać od kilku minut do kilku godzin.</p>
    <p v-if="fieldErrors['incident.regulationSection']" class="field-error">{{ fieldErrors['incident.regulationSection'] }}</p>
    <div class="field-grid">
      <fieldset class="field group-field full">
        <legend class="field-label">Czas eskalacji i powrotu do dostępności</legend>
        <InputField v-model="form.incident.escalationDuration" :label="formLabels.incident.escalationDuration" />
        <SelectField v-model="form.incident.calmTime" :label="formLabels.incident.calmTime" :options="calmTime" />
        <SelectField
          v-model="form.incident.cognitiveRecoveryTime"
          :label="formLabels.incident.cognitiveRecoveryTime"
          :options="cognitiveRecoveryOptions"
          :hint="`Gotowość na rozmowę, rozumienie poleceń, kontakt wzrokowy lub powrót do aktywności u ${subject}.`"
        />
      </fieldset>
      <ChoiceGroupField
        v-model="form.incident.endedBy"
        :label="formLabels.incident.endedBy"
        :options="env.endedBy"
        hint="To pytanie dotyczy momentu PO pełnej eskalacji – co w końcu zatrzymało kryzys?"
        required
      />
      <InputField
        v-if="hasOther(form.incident.endedBy, form.incident.endedByOther)"
        v-model="form.incident.endedByOther"
        :label="formLabels.incident.endedByOther"
        :required="form.incident.endedBy.includes('inne')"
        :error="fieldErrors['incident.endedByOther']"
        full
      />
      <TextAreaField v-model="form.incident.worsened" :label="formLabels.incident.worsened" hint="Np. nacisk, pośpiech, hałas, dotyk, obecność dodatkowych osób, próba rozmowy, odmowa, kontynuowanie wymagań." />
      <ChoiceGroupField
        v-model="form.incident.recoverySupports"
        :label="formLabels.incident.recoverySupports"
        :options="recoverySupportOptions"
        :hint="`Uspokojenie emocjonalne ≠ gotowość poznawcza. Układ nerwowy potrzebuje czasu na powrót do trybu „zaangażowania społecznego” – to może trwać od kilku minut do kilku godzin. Szybki „powrót do normy” na zewnątrz przy późniejszej eskalacji wieczorem/w domu może oznaczać kontynuowanie maskowania u ${subject}.`"
      />
      <InputField
        v-if="hasOther(form.incident.recoverySupports, form.incident.recoverySupportsOther)"
        v-model="form.incident.recoverySupportsOther"
        :label="formLabels.incident.recoverySupportsOther"
        :required="form.incident.recoverySupports.includes('Inne')"
        :error="fieldErrors['incident.recoverySupportsOther']"
        full
      />
    </div>
  </section>
</template>
