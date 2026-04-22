<script setup>
import { computed, reactive, ref } from "vue";
import IncidentForm from "./components/IncidentForm.vue";
import EnvironmentMapForm from "./components/EnvironmentMapForm.vue";
import {
  blankForm,
  calmTime,
  commonSignals,
  environments,
  intensity,
  regulationPhase,
  tensionLevels,
  yesNoPartial,
  yesNoUnknown
} from "./data/environments";
import { buildPdf as generatePdf } from "./lib/pdf";

const activeEnvKey = ref("home");
const activeMode = ref("both");
const status = ref("");
const forms = reactive(Object.fromEntries(Object.entries(environments).map(([key, env]) => [key, blankForm(env)])));

const env = computed(() => environments[activeEnvKey.value]);
const form = computed(() => forms[activeEnvKey.value]);
const modeLabel = computed(() => ({ both: "oba formularze", incident: "karta zdarzenia", map: "mapa środowiska" }[activeMode.value]));

function toggle(list, option) {
  const index = list.indexOf(option);
  if (index >= 0) list.splice(index, 1);
  else list.push(option);
}

function buildPdf(action) {
  generatePdf({
    env: env.value,
    form: form.value,
    mode: activeMode.value,
    modeLabel: modeLabel.value,
    action,
    setStatus: (message) => {
      status.value = message;
    }
  });
}

function resetCurrent() {
  forms[activeEnvKey.value] = blankForm(env.value);
  status.value = "Wyczyszczono oba formularze dla bieżącego środowiska.";
}

function resetIncident() {
  forms[activeEnvKey.value].meta = blankForm(env.value).meta;
  forms[activeEnvKey.value].incident = blankForm(env.value).incident;
  status.value = "Wyczyszczono kartę zdarzenia.";
}

function resetMap() {
  forms[activeEnvKey.value].map = blankForm(env.value).map;
  status.value = "Wyczyszczono mapę środowiska.";
}
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <span class="brand-title">Monitoring sytuacji</span>
          <span class="brand-subtitle">Karta zdarzenia i mapa środowiska</span>
        </div>
        <nav class="environment-tabs" aria-label="Wybór środowiska">
          <button
            v-for="(item, key) in environments"
            :key="key"
            class="tab-button"
            :class="{ active: activeEnvKey === key }"
            @click="activeEnvKey = key"
          >
            <span aria-hidden="true">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </button>
        </nav>
        <div class="actions">
          <button class="icon-button" title="Otwórz podgląd PDF" @click="buildPdf('open')">↗</button>
          <button class="icon-button" title="Wyczyść oba formularze" @click="resetCurrent">↺</button>
        </div>
      </div>
    </header>

    <main>
      <section class="hero">
        <h1>Wypełnij formularze dla środowiska: {{ env.label }}</h1>
        <p>Uzupełnij kartę monitorowania sytuacji i mapę środowiska, a aplikacja wygeneruje uporządkowany plik PDF gotowy do pobrania albo wysłania.</p>
      </section>

      <div class="workspace">
        <aside class="sidebar">
          <div class="panel mode-card">
            <p class="mode-label">Zakres PDF</p>
            <div class="mode-switch">
              <button class="mode-button" :class="{ active: activeMode === 'both' }" @click="activeMode = 'both'">▣ Oba formularze</button>
              <button class="mode-button" :class="{ active: activeMode === 'incident' }" @click="activeMode = 'incident'">□ Karta zdarzenia</button>
              <button class="mode-button" :class="{ active: activeMode === 'map' }" @click="activeMode = 'map'">◇ Mapa środowiska</button>
            </div>
            <div class="note">Dane pozostają w tej przeglądarce do czasu odświeżenia strony. PDF powstaje lokalnie po kliknięciu przycisku.</div>
          </div>
        </aside>

        <div class="forms-stack">
          <IncidentForm
            v-if="activeMode !== 'map'"
            :env="env"
            :form="form"
            :tension-levels="tensionLevels"
            :yes-no-unknown="yesNoUnknown"
            :yes-no-partial="yesNoPartial"
            :regulation-phase="regulationPhase"
            :intensity="intensity"
            :calm-time="calmTime"
            :common-signals="commonSignals"
            :toggle="toggle"
            :build-pdf="buildPdf"
            :reset-incident="resetIncident"
          />

          <EnvironmentMapForm
            v-if="activeMode !== 'incident'"
            :env="env"
            :form="form"
            :toggle="toggle"
            :build-pdf="buildPdf"
            :reset-map="resetMap"
          />

          <p class="status" aria-live="polite">{{ status }}</p>
        </div>
      </div>
    </main>
  </div>
</template>
