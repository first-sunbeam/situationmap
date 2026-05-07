<script setup lang="ts">
import { computed } from "vue";
import { formLabels } from "../config/formLabels";
import { getSubjectInline } from "../lib/subject";
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

const subject = computed(() => getSubjectInline(form));
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
            :label="`1. Co wydarzyło się tuż przed i jaki był stan ${subject}?`"
            hint="Np. zmiana planu, polecenie, hałas, tłok, koniec aktywności, przejście. Stan: głód, zmęczenie, przegrzanie, ból, dużo bodźców, sytuacja nagła/nieprzewidywalna."
          />
          <TextAreaField
            v-model="form.simple.signals"
            :label="formLabels.simple.signals"
            hint="Sygnały: np. milczenie, napięcie ciała, szybsze mówienie, wycofanie, podniesiony głos. Reakcja dorosłego: co zrobiono/powiedziano? Czy obniżono wymagania, czy je podtrzymano? Czy był wybór?"
          />
          <TextAreaField
            v-model="form.simple.behavior"
            :label="formLabels.simple.behavior"
            hint="Opisz fakty: słowa, ruchy, odmowa, płacz, krzyk, wycofanie, ucieczka, rzucanie przedmiotami."
            required
            :error="fieldErrors['simple.behavior']"
          />
          <TextAreaField
            v-model="form.simple.helped"
            :label="formLabels.simple.helped"
            hint="Np. wycofanie wymagania, zmiana miejsca, cisza, czas bez oczekiwań, dostęp do osoby/przedmiotu, wybór. Jeśli nic nie pomogło – wpisz wprost."
            required
            :error="fieldErrors['simple.helped']"
          />
          <TextAreaField
            v-model="form.simple.notes"
            :label="`5. Wpływ i autonomia – zakres kontroli dla ${subject}`"
            hint="Czy była możliwość decyzji: kiedy, jak, z kim albo w jakiej kolejności? Czy sytuacja była narzucona, nagła albo bez wyboru?"
            required
            :error="fieldErrors['simple.notes']"
          />
          <TextAreaField
            v-model="form.simple.recoveryTime"
            :label="formLabels.simple.recoveryTime"
            hint="Od uspokojenia do gotowości na rozmowę/aktywność: 5 min / 30 min / kilka godzin. Uspokojenie emocjonalne ≠ gotowość poznawcza."
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
