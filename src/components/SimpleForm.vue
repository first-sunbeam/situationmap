<script setup>
import { formLabels } from "../config/formLabels";
import MetaFields from "./form/MetaFields.vue";

defineProps({
  env: { type: Object, required: true },
  form: { type: Object, required: true },
  sendEmail: { type: Function, required: true },
  resetSimple: { type: Function, required: true },
  fieldErrors: { type: Object, required: true }
});
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>Formularz prosty - {{ env.label }}</h2>
        <p>Krótka wersja do szybkiego zgłoszenia sytuacji. Po kliknięciu „Wyślij” otworzy się wiadomość e-mail z wpisanymi odpowiedziami.</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetSimple">↺ Wyczyść formularz</button>
        <button class="primary-button" @click="sendEmail">✉ Wyślij</button>
      </div>
    </div>

    <div class="sections">
      <section class="section">
        <h3>{{ formLabels.meta.section }}</h3>
        <MetaFields :env="env" :form="form" :field-errors="fieldErrors" />
      </section>

      <section class="section">
        <h3>{{ formLabels.simple.section }}</h3>
        <div class="field-grid">
          <label class="field full"><span class="field-label">{{ formLabels.simple.factDescription }} <span class="required-mark">*</span></span><span class="field-hint">Krótko, fakty bez interpretacji.</span><textarea class="text-area" :class="{ invalid: fieldErrors['simple.factDescription'] }" v-model="form.simple.factDescription"></textarea><span v-if="fieldErrors['simple.factDescription']" class="field-error">{{ fieldErrors['simple.factDescription'] }}</span></label>
          <label class="field full"><span class="field-label">{{ formLabels.simple.antecedents }}</span><span class="field-hint">Np. zmiana planu, hałas, oczekiwanie.</span><textarea class="text-area" v-model="form.simple.antecedents"></textarea></label>
          <label class="field full"><span class="field-label">{{ formLabels.simple.signals }}</span><span class="field-hint">Np. milczenie, napięcie ciała, protest.</span><textarea class="text-area" v-model="form.simple.signals"></textarea></label>
          <label class="field full"><span class="field-label">{{ formLabels.simple.interventions }}</span><textarea class="text-area" v-model="form.simple.interventions"></textarea></label>
          <label class="field full"><span class="field-label">{{ formLabels.simple.behavior }}</span><textarea class="text-area" v-model="form.simple.behavior"></textarea></label>
          <label class="field full"><span class="field-label">{{ formLabels.simple.helped }} <span class="required-mark">*</span></span><span class="field-hint">Jeśli nic nie pomogło, wpisz to wprost.</span><textarea class="text-area" :class="{ invalid: fieldErrors['simple.helped'] }" v-model="form.simple.helped"></textarea><span v-if="fieldErrors['simple.helped']" class="field-error">{{ fieldErrors['simple.helped'] }}</span></label>
          <label class="field full"><span class="field-label">{{ formLabels.simple.notes }}</span><textarea class="text-area" v-model="form.simple.notes"></textarea></label>
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="resetSimple">↺ Wyczyść</button>
      <button class="primary-button" @click="sendEmail">✉ Wyślij na kontakt@autyzm.poznan.pl</button>
    </div>
  </section>
</template>
