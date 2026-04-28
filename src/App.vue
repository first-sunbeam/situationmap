<script setup>
import { computed, reactive, ref } from "vue";
import SimpleForm from "./components/SimpleForm.vue";
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
import { buildEmail, openEmail } from "./lib/email";

const activeEnvKey = ref("home");
const activeVariant = ref("simple");
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

async function buildPdf(action) {
  const { buildPdf: generatePdf } = await import("./lib/pdf");
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

function sendEmail() {
  const email = buildEmail({
    env: env.value,
    form: form.value,
    variant: activeVariant.value,
    mode: activeMode.value
  });
  openEmail(email);
  status.value = "Otworzono wiadomość e-mail do kontakt@autyzm.poznan.pl z uzupełnioną treścią formularza.";
}

function resetCurrent() {
  forms[activeEnvKey.value] = blankForm(env.value);
  status.value = "Wyczyszczono formularze dla bieżącego środowiska.";
}

function resetSimple() {
  forms[activeEnvKey.value].meta = blankForm(env.value).meta;
  forms[activeEnvKey.value].simple = blankForm(env.value).simple;
  status.value = "Wyczyszczono formularz prosty.";
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
          <span class="brand-title">SituationMap</span>
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
          <button v-if="activeVariant === 'extended'" class="icon-button" title="Otwórz podgląd PDF" @click="buildPdf('open')">↗</button>
          <button v-if="activeVariant === 'simple'" class="icon-button" title="Wyślij e-mail" @click="sendEmail">✉</button>
          <button class="icon-button" title="Wyczyść formularze" @click="resetCurrent">↺</button>
        </div>
      </div>
    </header>

    <main>
      <section class="hero">
        <h1>Wypełnij formularz dla środowiska: {{ env.label }}</h1>
        <p>Masz do wyboru wersję prostą i rozszerzoną. W wersji prostej możesz wysłać formularz e-mailem, a w wersji rozszerzonej wygenerować PDF.</p>
      </section>

      <div class="workspace">
        <aside class="sidebar">
          <div class="panel mode-card">
            <p class="mode-label">Wersja formularza</p>
            <div class="mode-switch">
              <button class="mode-button" :class="{ active: activeVariant === 'simple' }" @click="activeVariant = 'simple'">
                <span class="mode-indicator" aria-hidden="true">{{ activeVariant === 'simple' ? '✓' : '' }}</span>
                <span>Prosta</span>
              </button>
              <button class="mode-button" :class="{ active: activeVariant === 'extended' }" @click="activeVariant = 'extended'">
                <span class="mode-indicator" aria-hidden="true">{{ activeVariant === 'extended' ? '✓' : '' }}</span>
                <span>Rozszerzona</span>
              </button>
            </div>

            <template v-if="activeVariant === 'extended'">
              <p class="mode-label" style="margin-top: 14px">Zakres formularza rozszerzonego</p>
              <div class="mode-switch">
                <button class="mode-button" :class="{ active: activeMode === 'both' }" @click="activeMode = 'both'">
                  <span class="mode-indicator" aria-hidden="true">{{ activeMode === 'both' ? '✓' : '' }}</span>
                  <span>Oba formularze</span>
                </button>
                <button class="mode-button" :class="{ active: activeMode === 'incident' }" @click="activeMode = 'incident'">
                  <span class="mode-indicator" aria-hidden="true">{{ activeMode === 'incident' ? '✓' : '' }}</span>
                  <span>Karta zdarzenia</span>
                </button>
                <button class="mode-button" :class="{ active: activeMode === 'map' }" @click="activeMode = 'map'">
                  <span class="mode-indicator" aria-hidden="true">{{ activeMode === 'map' ? '✓' : '' }}</span>
                  <span>Mapa środowiska</span>
                </button>
              </div>
            </template>

            <div class="note">Dane pozostają w tej przeglądarce do czasu odświeżenia strony. E-mail otwiera się w domyślnym programie pocztowym z gotową treścią odpowiedzi.</div>
          </div>
        </aside>

        <div class="forms-stack">
          <SimpleForm
            v-if="activeVariant === 'simple'"
            :env="env"
            :form="form"
            :send-email="sendEmail"
            :reset-simple="resetSimple"
          />

          <template v-else>
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
          </template>

          <p class="status" aria-live="polite">{{ status }}</p>
        </div>
      </div>
    </main>
  </div>
</template>
