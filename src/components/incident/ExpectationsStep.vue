<script setup lang="ts">
import { computed } from "vue";
import { useFormState } from "../../composables/useFormState";
import { getSubjectInline } from "../../lib/subject";
import { formLabels } from "../../config/formLabels";
import ChoiceGroupField from "../form/ChoiceGroupField.vue";
import InputField from "../form/InputField.vue";
import TextAreaField from "../form/TextAreaField.vue";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const { env, form, fieldErrors } = useFormState();
const subject = computed(() => getSubjectInline(form.value));
</script>

<template>
  <section class="section" :class="{ invalidSection: fieldErrors['incident.expectationsSection'] }">
    <h3>{{ formLabels.incident.expectationsSection }} <span class="required-mark">*</span></h3>
    <p class="section-hint">W PDA brak autonomii i nieprzewidywalność mogą aktywować reakcję zagrożenia, dlatego warto sprawdzić jednocześnie oczekiwania, przewidywalność i wpływ.</p>
    <p v-if="fieldErrors['incident.expectationsSection']" class="field-error">{{ fieldErrors['incident.expectationsSection'] }}</p>
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
    <ChoiceGroupField v-model="form.incident.expectations" :label="formLabels.incident.expectations" :options="env.expectations" />
    <InputField
      v-if="hasOther(form.incident.expectations, form.incident.expectationOther)"
      v-model="form.incident.expectationOther"
      :label="formLabels.incident.expectationOther"
      :required="form.incident.expectations.includes('inne')"
      :error="fieldErrors['incident.expectationOther']"
      full
    />

  </section>
</template>
