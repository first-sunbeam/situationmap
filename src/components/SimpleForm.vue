<script setup lang="ts">
import { formLabels } from "../config/formLabels";
import type { EnvironmentConfig, FieldErrors, PdfAction, SituationForm } from "../types/form";
import MetaFields from "./form/MetaFields.vue";
import TextAreaField from "./form/TextAreaField.vue";

const { env, form, sendEmail, buildPdf, resetSimple, fieldErrors } = defineProps<{
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
        <button class="primary-button" @click="sendEmail"><span aria-hidden="true">✉</span> Wyślij</button>
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
          <TextAreaField
            v-model="form.simple.antecedents"
            :label="formLabels.simple.antecedents"
            hint="Np. zmiana planu, hałas, oczekiwanie, polecenie, odmowa, koniec aktywności, przejście do innej aktywności."
          />
          <TextAreaField
            v-model="form.simple.signals"
            :label="formLabels.simple.signals"
            hint="Np. milczenie, napięcie ciała, protest, szybsze mówienie, wycofanie, jęczenie, podniesiony głos, powtarzanie słów."
          />
          <TextAreaField
            v-model="form.simple.interventions"
            :label="formLabels.simple.interventions"
            hint="Co zrobiła lub powiedziała osoba dorosła / otoczenie?"
          />
          <TextAreaField
            v-model="form.simple.behavior"
            :label="formLabels.simple.behavior"
            hint="Opisz fakty i obserwacje: słowa, ruchy, działania, odmowę, płacz, krzyk, wycofanie, ucieczkę, rzucanie przedmiotami itd."
            required
            :error="fieldErrors['simple.behavior']"
          />
          <TextAreaField
            v-model="form.simple.helped"
            :label="formLabels.simple.helped"
            hint="Jeśli nic nie pomogło, wpisz to wprost."
            required
            :error="fieldErrors['simple.helped']"
          />
          <TextAreaField
            v-model="form.simple.notes"
            :label="formLabels.simple.notes"
            hint="Czy mogło o czymś decydować (np. kiedy, jak, z kim, w jakiej kolejności), czy raczej sytuacja była narzucona, nagła albo poza jego kontrolą?"
            required
            :error="fieldErrors['simple.notes']"
          />
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="resetSimple">↺ Wyczyść formularz</button>
      <button class="secondary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
      <button class="primary-button" @click="sendEmail"><span aria-hidden="true">✉</span> Wyślij</button>
    </div>
  </section>
</template>
