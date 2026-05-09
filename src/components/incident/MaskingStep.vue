<script setup lang="ts">
import { useFormState } from "../../composables/useFormState";
import { hasOther } from "../../lib/formUtils";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import InputField from "../form/InputField.vue";
import SelectField from "../form/SelectField.vue";

const { form, fieldErrors, maskingDurationOptions, maskingStrategyOptions, subjectNominative, yesNoUnknown } = useFormState();
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.maskingSection'] }">
    <h3>{{ formLabels.incident.maskingSection }}</h3>
    <p class="section-hint">U osób z PDA maskowanie to często nieświadoma strategia „przetrwania” – dziecko kontynuuje mimo przeciążenia, a potem następuje opóźniona eskalacja. Czas maskowania + intensywność późniejszego wybuchu pokazują koszt „trzymania się razem”.</p>
    <p v-if="fieldErrors['incident.maskingSection']" class="field-error">{{ fieldErrors['incident.maskingSection'] }}</p>
    <div class="field-grid">
      <SelectField v-model="form.incident.maskingContinued" :label="`Kontynuowanie aktywności mimo narastającego napięcia przez ${subjectNominative}`" :options="yesNoUnknown" />
      <fieldset v-if="form.incident.maskingContinued === 'Tak'" class="field group-field full">
        <legend class="field-label">Strategie maskowania i czas „trzymania się”</legend>
        <ChoiceGroupField
          v-model="form.incident.maskingStrategies"
          :options="maskingStrategyOptions"
        />
        <InputField
          v-if="hasOther(form.incident.maskingStrategies, form.incident.maskingStrategiesOther)"
          v-model="form.incident.maskingStrategiesOther"
          :label="formLabels.incident.maskingStrategiesOther"
          :required="form.incident.maskingStrategies.includes('Inne')"
          :error="fieldErrors['incident.maskingStrategiesOther']"
          full
        />
        <SelectField v-model="form.incident.maskingDuration" :label="`Czas „trzymania się” przed eskalacją przez ${subjectNominative}`" :options="maskingDurationOptions" />
      </fieldset>
    </div>
  </section>
</template>
