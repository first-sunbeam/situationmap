<script setup lang="ts">
import { useFormState } from "../composables/useFormState";
import { formLabels } from "../config/formLabels";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const {
  env,
  form,
  toggle,
  buildPdf,
  resetMap,
  fieldErrors
} = useFormState();
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
          <label class="field"><span class="field-label">{{ formLabels.map.preferred }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['map.preferred'] }" v-model="form.map.preferred" /><span v-if="fieldErrors['map.preferred']" class="field-error">{{ fieldErrors['map.preferred'] }}</span></label>
          <label class="field"><span class="field-label">{{ formLabels.map.avoided }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['map.avoided'] }" v-model="form.map.avoided" /><span v-if="fieldErrors['map.avoided']" class="field-error">{{ fieldErrors['map.avoided'] }}</span></label>
          <label class="field"><span class="field-label">{{ formLabels.map.likes }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['map.likes'] }" v-model="form.map.likes" /><span v-if="fieldErrors['map.likes']" class="field-error">{{ fieldErrors['map.likes'] }}</span></label>
          <label class="field"><span class="field-label">{{ formLabels.map.easiestWhen }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['map.easiestWhen'] }" v-model="form.map.easiestWhen" /><span v-if="fieldErrors['map.easiestWhen']" class="field-error">{{ fieldErrors['map.easiestWhen'] }}</span></label>
          <label class="field"><span class="field-label">{{ formLabels.map.cooperatesWith }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['map.cooperatesWith'] }" v-model="form.map.cooperatesWith" /><span v-if="fieldErrors['map.cooperatesWith']" class="field-error">{{ fieldErrors['map.cooperatesWith'] }}</span></label>
          <label class="field"><span class="field-label">{{ formLabels.map.reducers }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['map.reducers'] }" v-model="form.map.reducers" /><span v-if="fieldErrors['map.reducers']" class="field-error">{{ fieldErrors['map.reducers'] }}</span></label>
          <div class="field full">
            <span class="field-label">{{ formLabels.map.dependsOn }}</span>
            <div class="choice-grid">
              <label class="choice" v-for="item in env.dependencies" :key="item"><input type="checkbox" :checked="form.map.dependsOn.includes(item)" @change="toggle(form.map.dependsOn, item)" />{{ item }}</label>
            </div>
          </div>
          <label class="field full"><span class="field-label">{{ formLabels.map.dependsDescription }}</span><textarea class="text-area" v-model="form.map.dependsDescription"></textarea></label>
          <div class="field full">
            <span class="field-label">{{ formLabels.map.escalationContexts }} <span class="required-mark">*</span></span>
            <span v-if="fieldErrors['map.escalationContexts']" class="field-error">{{ fieldErrors['map.escalationContexts'] }}</span>
            <div class="choice-grid">
              <label class="choice" v-for="item in env.escalationContexts" :key="item"><input type="checkbox" :checked="form.map.escalationContexts.includes(item)" @change="toggle(form.map.escalationContexts, item)" />{{ item }}</label>
            </div>
          </div>
          <label v-if="hasOther(form.map.escalationContexts, form.map.escalationOther)" class="field full"><span class="field-label">{{ formLabels.map.escalationOther }} <span v-if="form.map.escalationContexts.includes('Inne')" class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['map.escalationOther'] }" v-model="form.map.escalationOther" /><span v-if="fieldErrors['map.escalationOther']" class="field-error">{{ fieldErrors['map.escalationOther'] }}</span></label>
          <label class="field"><span class="field-label">{{ formLabels.map.noAggression }}</span><select class="text-input" v-model="form.map.noAggression"><option value="">Wybierz</option><option>Tak</option><option>Nie</option></select></label>
          <label class="field"><span class="field-label">{{ formLabels.map.noAggressionWhere }}</span><input class="text-input" v-model="form.map.noAggressionWhere" /></label>
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="buildPdf('open')">↗ Podgląd</button>
      <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
    </div>
  </section>
</template>
