<script setup lang="ts">
import { computed } from "vue";
import { formLabels } from "../config/formLabels";
import { getSubjectInline } from "../lib/subject";
import type { EnvironmentConfig, FieldErrors, PdfAction, SituationForm } from "../types/form";
import LabelText from "./form/LabelText.vue";
import MetaFields from "./form/MetaFields.vue";
import SelectField from "./form/SelectField.vue";
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
const readinessOptions = ["5 minut", "10-30 minut", "1-2 godziny", "Kilka godzin lub następnego dnia"];
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
          <div class="simple-question-heading full">
            <h4 class="field-label"><LabelText :text="`1. Co wydarzyło się tuż przed i jaki był stan ${subject}?`" /></h4>
            <p class="field-hint">Osoby autystyczne mogą mieć trudność z rozpoznaniem sygnałów z ciała (interocepcja) i z integracją bodźców zewnętrznych – to wpływa na próg dysregulacji.</p>
          </div>
          <TextAreaField
            v-model="form.simple.stateBefore"
            :label="formLabels.simple.stateBefore"
            hint="Np. głód, zmęczenie, przegrzanie, ból, dużo bodźców, słaby sen, zmiana planu wcześniej w dniu."
          />
          <TextAreaField
            v-model="form.simple.antecedents"
            :label="formLabels.simple.beforeLastMinutes"
            hint="Np. polecenie, hałas, tłok, koniec aktywności, przejście, korekta zachowania."
          />
          <div class="simple-question-heading full">
            <h4 class="field-label">{{ formLabels.simple.signals }}</h4>
            <p class="field-hint">Rozróżnienie typu reakcji pomaga dobrać interwencję – shutdown wymaga innego wsparcia niż aktywacja.</p>
          </div>
          <TextAreaField
            v-model="form.simple.signals"
            :label="formLabels.simple.signalsObserved"
            hint="Np. milczenie, napięcie ciała, szybsze mówienie, wycofanie, podniesiony głos, zatykanie uszu, ucieczka z pomieszczenia."
          />
          <TextAreaField
            v-model="form.simple.interventions"
            :label="formLabels.simple.adultReaction"
            hint="Co zrobiono/powiedziano? Czy obniżono wymagania, czy je podtrzymano? Czy był wybór, czas bez wymagań lub możliwość wycofania się?"
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
          <div class="simple-question-heading full">
            <h4 class="field-label"><LabelText :text="`5. Wpływ i autonomia – zakres kontroli dla ${subject}`" /></h4>
            <p class="field-hint">W PDA brak autonomii i nieprzewidywalność aktywują reakcję zagrożenia w układzie nerwowym.</p>
          </div>
          <TextAreaField
            v-model="form.simple.notes"
            :label="`Możliwość decyzji dla ${subject}`"
            hint="Czy była możliwość decyzji: kiedy, jak, z kim albo w jakiej kolejności? Czy sytuacja była narzucona, nagła albo bez wyboru?"
            required
            :error="fieldErrors['simple.notes']"
          />
          <TextAreaField
            v-model="form.simple.predictability"
            :label="formLabels.simple.predictability"
          />
          <SelectField
            v-model="form.simple.recoveryTime"
            :label="formLabels.simple.recoveryTime"
            :options="readinessOptions"
            hint="Od uspokojenia do gotowości na rozmowę/aktywność. Uspokojenie emocjonalne ≠ gotowość poznawcza."
            full
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
