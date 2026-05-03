<script setup lang="ts">
import { useFormState } from "../composables/useFormState";
import { formLabels } from "../config/formLabels";
import ChoiceGroupField from "./form/ChoiceGroupField.vue";
import InputField from "./form/InputField.vue";
import SelectField from "./form/SelectField.vue";
import TextAreaField from "./form/TextAreaField.vue";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const {
  env,
  form,
  buildPdf,
  resetMap,
  fieldErrors
} = useFormState();

const yesNoOptions = ["Tak", "Nie"];
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>{{ env.mapTitle }}</h2>
        <p>To jest osobny formularz opisujący miejsca, warunki i sytuacje związane z funkcjonowaniem w danym środowisku.</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetMap">↺ Wyczyść formularz</button>
        <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
      </div>
    </div>

    <div class="sections">
      <section class="section" :class="{ invalidSection: fieldErrors['map.rows'] || fieldErrors['map.escalationContexts'] }">
        <h3>{{ env.mapTitle }}</h3>
        <p v-if="fieldErrors['map.rows']" class="field-error">{{ fieldErrors['map.rows'] }}</p>
        <div class="matrix">
          <div class="matrix-row matrix-head"><span :class="{ 'field-error': fieldErrors['map.rows'] }">{{ formLabels.map.placeColumn }} <span class="required-mark">*</span></span><span>{{ formLabels.map.timeColumn }}</span><span>{{ formLabels.map.activityColumn }}</span></div>
          <div class="matrix-row" v-for="row in form.map.rows" :key="row.place">
            <span class="place-name">{{ row.place }}</span>
            <input class="text-input" :class="{ invalid: fieldErrors['map.rows'] }" v-model="row.time" placeholder="h/dzień" />
            <input class="text-input" :class="{ invalid: fieldErrors['map.rows'] }" v-model="row.activity" />
          </div>
        </div>
        <div class="field-grid" style="margin-top: 16px">
          <InputField v-model="form.map.preferred" :label="formLabels.map.preferred" required :error="fieldErrors['map.preferred']" />
          <InputField v-model="form.map.avoided" :label="formLabels.map.avoided" required :error="fieldErrors['map.avoided']" />
          <InputField v-model="form.map.likes" :label="formLabels.map.likes" required :error="fieldErrors['map.likes']" />
          <InputField v-model="form.map.easiestWhen" :label="formLabels.map.easiestWhen" required :error="fieldErrors['map.easiestWhen']" />
          <InputField v-model="form.map.cooperatesWith" :label="formLabels.map.cooperatesWith" required :error="fieldErrors['map.cooperatesWith']" />
          <InputField v-model="form.map.reducers" :label="formLabels.map.reducers" required :error="fieldErrors['map.reducers']" />
          <ChoiceGroupField v-model="form.map.dependsOn" :label="formLabels.map.dependsOn" :options="env.dependencies" />
          <TextAreaField v-model="form.map.dependsDescription" :label="formLabels.map.dependsDescription" />
          <ChoiceGroupField
            v-model="form.map.escalationContexts"
            :label="formLabels.map.escalationContexts"
            :options="env.escalationContexts"
            required
            :error="fieldErrors['map.escalationContexts']"
          />
          <InputField
            v-if="hasOther(form.map.escalationContexts, form.map.escalationOther)"
            v-model="form.map.escalationOther"
            :label="formLabels.map.escalationOther"
            :required="form.map.escalationContexts.includes('Inne')"
            :error="fieldErrors['map.escalationOther']"
            full
          />
          <SelectField v-model="form.map.noAggression" :label="formLabels.map.noAggression" :options="yesNoOptions" />
          <InputField v-model="form.map.noAggressionWhere" :label="formLabels.map.noAggressionWhere" />
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="buildPdf('open')">↗ Podgląd</button>
      <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
    </div>
  </section>
</template>
