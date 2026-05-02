<script setup lang="ts">
import { formLabels } from "../config/formLabels";
import type { EnvironmentConfig, FieldErrors, PdfAction, SituationForm } from "../types/form";
import MetaFields from "./form/MetaFields.vue";
import TextAreaField from "./form/TextAreaField.vue";

defineProps<{
  env: EnvironmentConfig;
  form: SituationForm;
  sendEmail: () => void;
  buildPdf: (action: PdfAction) => void;
  resetSimple: () => void;
  fieldErrors: FieldErrors;
}>();
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>Formularz prosty - {{ env.label }}</h2>
        <p>Krótka wersja do szybkiego zgłoszenia sytuacji. Możesz otworzyć wiadomość e-mail albo pobrać PDF i załączyć go ręcznie.</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetSimple">↺ Wyczyść formularz</button>
        <button class="secondary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
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
          <TextAreaField v-model="form.simple.factDescription" :label="formLabels.simple.factDescription" hint="Krótko, fakty bez interpretacji." required :error="fieldErrors['simple.factDescription']" />
          <TextAreaField v-model="form.simple.antecedents" :label="formLabels.simple.antecedents" hint="Np. zmiana planu, hałas, oczekiwanie." />
          <TextAreaField v-model="form.simple.signals" :label="formLabels.simple.signals" hint="Np. milczenie, napięcie ciała, protest." />
          <TextAreaField v-model="form.simple.interventions" :label="formLabels.simple.interventions" />
          <TextAreaField v-model="form.simple.behavior" :label="formLabels.simple.behavior" />
          <TextAreaField v-model="form.simple.helped" :label="formLabels.simple.helped" hint="Jeśli nic nie pomogło, wpisz to wprost." required :error="fieldErrors['simple.helped']" />
          <TextAreaField v-model="form.simple.notes" :label="formLabels.simple.notes" />
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="resetSimple">↺ Wyczyść</button>
      <button class="secondary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
      <button class="primary-button" @click="sendEmail">✉ Wyślij na kontakt@autyzm.poznan.pl</button>
    </div>
  </section>
</template>
