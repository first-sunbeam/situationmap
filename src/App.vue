<script setup lang="ts">
import SimpleForm from "./components/SimpleForm.vue";
import IncidentForm from "./components/IncidentForm.vue";
import EnvironmentMapForm from "./components/EnvironmentMapForm.vue";
import { useFormState } from "./composables/useFormState";
import { useTheme } from "./composables/useTheme";

const { isDarkTheme, toggleTheme } = useTheme();

const {
  activeEnvKey,
  activeVariant,
  activeMode,
  status,
  validationErrors,
  fieldErrors,
  environments,
  env,
  form,
  buildPdf,
  sendEmail,
  resetCurrent,
  resetSimple
} = useFormState();
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
          <button
            class="icon-button"
            :title="isDarkTheme ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'"
            :aria-label="isDarkTheme ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'"
            @click="toggleTheme"
          >
            <svg v-if="isDarkTheme" class="button-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else class="button-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button v-if="activeVariant === 'extended'" class="icon-button" title="Otwórz podgląd PDF" aria-label="Otwórz podgląd PDF" @click="buildPdf('open')">↗</button>
          <button v-if="activeVariant === 'simple'" class="icon-button" title="Wyślij e-mail" aria-label="Wyślij e-mail" @click="sendEmail">✉</button>
          <button v-if="activeVariant === 'simple'" class="icon-button" title="Pobierz PDF" aria-label="Pobierz PDF" @click="buildPdf('download')">↓</button>
          <button class="icon-button" title="Wyczyść formularze" aria-label="Wyczyść formularze" @click="resetCurrent">↺</button>
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

            <div class="note">Dane zapisują się lokalnie w tej przeglądarce. E-mail otwiera się w domyślnym programie pocztowym z gotową treścią odpowiedzi.</div>
          </div>
        </aside>

        <div class="forms-stack">
          <p v-if="status" class="status" aria-live="polite">{{ status }}</p>

          <section v-if="validationErrors.length" class="panel validation-panel" aria-live="polite" tabindex="-1">
            <strong>Popraw przed dalszą akcją:</strong>
            <ul>
              <li v-for="error in validationErrors" :key="error">{{ error }}</li>
            </ul>
          </section>

          <SimpleForm
            v-if="activeVariant === 'simple'"
            :env="env"
            :form="form"
            :send-email="sendEmail"
            :build-pdf="buildPdf"
            :reset-simple="resetSimple"
            :field-errors="fieldErrors"
          />

          <template v-else>
            <IncidentForm v-if="activeMode !== 'map'" />

            <EnvironmentMapForm v-if="activeMode !== 'incident'" />
          </template>
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <p><a href="http://autyzm.poznan.pl/" target="_blank" rel="noreferrer">Małgorzata Mikołajczyk</a> · Psycholog · Analityk zachowania (BCBA)</p>
    </footer>
  </div>
</template>
