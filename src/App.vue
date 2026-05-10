<script setup lang="ts">
import SimpleForm from "./components/SimpleForm.vue";
import IncidentForm from "./components/IncidentForm.vue";
import EnvironmentMapForm from "./components/EnvironmentMapForm.vue";
import { useFormState } from "./composables/useFormState";
import { useTheme } from "./composables/useTheme";
import { useLanguage } from "./i18n/useLanguage";
import SvgIcon from "./components/ui/SvgIcon.vue";
import IconSprite from "./components/ui/IconSprite.vue";

const { isDarkTheme, toggleTheme } = useTheme();
const { languageLabel, toggleLanguageLabel, toggleLanguage } = useLanguage();

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
  <IconSprite />
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
            <SvgIcon :name="item.icon" />
            <span>{{ item.label }}</span>
          </button>
        </nav>
        <div class="actions">
          <button
            class="language-button"
            type="button"
            :title="toggleLanguageLabel"
            :aria-label="toggleLanguageLabel"
            @click="toggleLanguage"
          >
            {{ languageLabel }}
          </button>
          <button
            class="icon-button"
            :title="isDarkTheme ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'"
            :aria-label="isDarkTheme ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'"
            @click="toggleTheme"
          >
            <SvgIcon class="button-icon" :name="isDarkTheme ? 'sun' : 'moon'" />
          </button>
          <button v-if="activeVariant === 'extended'" class="icon-button" title="Otwórz podgląd PDF" aria-label="Otwórz podgląd PDF" @click="buildPdf('open')"><SvgIcon class="button-icon" name="external" /></button>
          <button v-if="activeVariant === 'simple'" class="icon-button" title="Wyślij e-mail" aria-label="Wyślij e-mail" @click="sendEmail"><SvgIcon class="button-icon" name="email" /></button>
          <button v-if="activeVariant === 'simple'" class="icon-button" title="Pobierz PDF" aria-label="Pobierz PDF" @click="buildPdf('download')"><SvgIcon class="button-icon" name="download" /></button>
          <button class="icon-button" title="Wyczyść formularze" aria-label="Wyczyść formularze" @click="resetCurrent"><SvgIcon class="button-icon" name="reset" /></button>
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
                <span class="mode-indicator" aria-hidden="true"><SvgIcon v-if="activeVariant === 'simple'" name="check" /></span>
                <span>Prosta</span>
              </button>
              <button class="mode-button" :class="{ active: activeVariant === 'extended' }" @click="activeVariant = 'extended'">
                <span class="mode-indicator" aria-hidden="true"><SvgIcon v-if="activeVariant === 'extended'" name="check" /></span>
                <span>Rozszerzona</span>
              </button>
            </div>

            <template v-if="activeVariant === 'extended'">
              <p class="mode-label" style="margin-top: 14px">Zakres formularza rozszerzonego</p>
              <div class="mode-switch">
                <button class="mode-button" :class="{ active: activeMode === 'incident' }" @click="activeMode = 'incident'">
                  <span class="mode-indicator" aria-hidden="true"><SvgIcon v-if="activeMode === 'incident'" name="check" /></span>
                  <span>Karta zdarzenia</span>
                </button>
                <button class="mode-button" :class="{ active: activeMode === 'map' }" @click="activeMode = 'map'">
                  <span class="mode-indicator" aria-hidden="true"><SvgIcon v-if="activeMode === 'map'" name="check" /></span>
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
            <IncidentForm v-show="activeMode !== 'map'" />

            <EnvironmentMapForm v-show="activeMode !== 'incident'" />
          </template>
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <p><a href="http://autyzm.poznan.pl/" target="_blank" rel="noreferrer">Małgorzata Mikołajczyk</a> · Psycholog · Analityk zachowania (BCBA)</p>
    </footer>
  </div>
</template>
