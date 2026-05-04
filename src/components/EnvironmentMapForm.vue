<script setup lang="ts">
import { computed } from "vue";
import { useFormState } from "../composables/useFormState";
import { formLabels } from "../config/formLabels";
import ChoiceGroupField from "./form/ChoiceGroupField.vue";
import InputField from "./form/InputField.vue";
import SelectField from "./form/SelectField.vue";
import TextAreaField from "./form/TextAreaField.vue";

const { env, form, buildPdf, resetMap, fieldErrors } = useFormState();

const yesNoOptions = ["Tak", "Nie"];
const mapSectionErrorKeys = [
  "map.rows",
  "map.escalationContexts",
  "map.dependsDescription",
  "map.noAggressionWhere"
];

const hasMapSectionError = computed(() => mapSectionErrorKeys.some((key) => fieldErrors.value[key]));
const showsEscalationOther = computed(() => form.value.map.escalationContexts.some((item) => item.toLowerCase() === "inne"));
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>{{ env.mapTitle }}</h2>
        <p>
          To jest osobny formularz opisujący miejsca, warunki i sytuacje
          związane z funkcjonowaniem w danym środowisku.
        </p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetMap">
          ↺ Wyczyść formularz
        </button>
        <button class="primary-button" @click="buildPdf('download')">
          ↓ Pobierz PDF
        </button>
      </div>
    </div>

    <div class="sections">
      <section class="section" :class="{ invalidSection: hasMapSectionError }">
        <h3>{{ env.mapTitle }}</h3>
        <p v-if="fieldErrors['map.rows']" class="field-error">
          {{ fieldErrors["map.rows"] }}
        </p>
        <div class="matrix">
          <div class="matrix-row matrix-head">
            <span :class="{ 'field-error': fieldErrors['map.rows'] }">
              {{ formLabels.map.placeColumn }} <span class="required-mark">*</span>
            </span>
            <span>{{ formLabels.map.timeColumn }}</span>
            <span>{{ formLabels.map.activityColumn }}</span>
          </div>
          <div class="matrix-row" v-for="row in form.map.rows" :key="row.place">
            <span class="place-name">{{ row.place }}</span>
            <input
              v-model="row.time"
              class="text-input"
              :class="{ invalid: fieldErrors['map.rows'] }"
              placeholder="h/dzień"
            />
            <input
              v-model="row.activity"
              class="text-input"
              :class="{ invalid: fieldErrors['map.rows'] }"
            />
          </div>
        </div>
        <div class="field-grid map-field-grid">
          <InputField
            v-model="form.map.preferred"
            :label="formLabels.map.preferred"
            required
            :error="fieldErrors['map.preferred']"
          />
          <InputField
            v-model="form.map.avoided"
            :label="formLabels.map.avoided"
            required
            :error="fieldErrors['map.avoided']"
          />
          <InputField
            v-model="form.map.likes"
            :label="formLabels.map.likes"
            required
            :error="fieldErrors['map.likes']"
          />
          <InputField
            v-model="form.map.easiestWhen"
            :label="formLabels.map.easiestWhen"
            required
            :error="fieldErrors['map.easiestWhen']"
          />
          <InputField
            v-model="form.map.cooperatesWith"
            :label="formLabels.map.cooperatesWith"
            required
            :error="fieldErrors['map.cooperatesWith']"
          />
          <InputField
            v-model="form.map.reducers"
            :label="formLabels.map.reducers"
            required
            :error="fieldErrors['map.reducers']"
          />
          <ChoiceGroupField
            v-model="form.map.dependsOn"
            :label="formLabels.map.dependsOn"
            :options="env.dependencies"
          />
          <TextAreaField
            v-model="form.map.dependsDescription"
            :label="formLabels.map.dependsDescription"
            :required="Boolean(form.map.dependsOn.length)"
            :error="fieldErrors['map.dependsDescription']"
          />
          <ChoiceGroupField
            v-model="form.map.escalationContexts"
            :label="formLabels.map.escalationContexts"
            :options="env.escalationContexts"
            required
            :error="fieldErrors['map.escalationContexts']"
          />
          <InputField
            v-if="showsEscalationOther"
            v-model="form.map.escalationOther"
            :label="formLabels.map.escalationOther"
            required
            :error="fieldErrors['map.escalationOther']"
            full
          />
          <SelectField
            v-model="form.map.noAggression"
            :label="formLabels.map.noAggression"
            :options="yesNoOptions"
          />
          <InputField
            v-model="form.map.noAggressionWhere"
            :label="formLabels.map.noAggressionWhere"
            :required="form.map.noAggression === 'Tak'"
            :error="fieldErrors['map.noAggressionWhere']"
          />
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="buildPdf('open')">
        ↗ Podgląd
      </button>
      <button class="primary-button" @click="buildPdf('download')">
        ↓ Pobierz PDF
      </button>
    </div>
  </section>
</template>
