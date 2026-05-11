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
  labels,
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
          <span class="brand-subtitle">{{ labels.ui.brandSubtitle }}</span>
        </div>
        <nav class="environment-tabs" :aria-label="labels.ui.environmentNav">
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
            :title="isDarkTheme ? labels.ui.enableLightTheme : labels.ui.enableDarkTheme"
            :aria-label="isDarkTheme ? labels.ui.enableLightTheme : labels.ui.enableDarkTheme"
            @click="toggleTheme"
          >
            <SvgIcon class="button-icon" :name="isDarkTheme ? 'sun' : 'moon'" />
          </button>
          <button v-if="activeVariant === 'extended'" class="icon-button" :title="labels.ui.openPdfPreview" :aria-label="labels.ui.openPdfPreview" @click="buildPdf('open')"><SvgIcon class="button-icon" name="external" /></button>
          <button v-if="activeVariant === 'simple'" class="icon-button" :title="labels.ui.sendEmail" :aria-label="labels.ui.sendEmail" @click="sendEmail"><SvgIcon class="button-icon" name="email" /></button>
          <button v-if="activeVariant === 'simple'" class="icon-button" :title="labels.ui.downloadPdf" :aria-label="labels.ui.downloadPdf" @click="buildPdf('download')"><SvgIcon class="button-icon" name="download" /></button>
          <button class="icon-button" :title="labels.ui.resetForms" :aria-label="labels.ui.resetForms" @click="resetCurrent"><SvgIcon class="button-icon" name="reset" /></button>
        </div>
      </div>
    </header>

    <main>
      <section class="hero">
        <h1>{{ labels.ui.currentEnvironment }} {{ env.label }}</h1>
        <p>{{ labels.ui.heroText }}</p>
      </section>

      <div class="workspace">
        <aside class="sidebar">
          <div class="panel mode-card">
            <p class="mode-label">{{ labels.ui.formVersion }}</p>
            <div class="mode-switch">
              <button class="mode-button" :class="{ active: activeVariant === 'simple' }" @click="activeVariant = 'simple'">
                <span class="mode-indicator" aria-hidden="true"><SvgIcon v-if="activeVariant === 'simple'" name="check" /></span>
                <span>{{ labels.ui.simpleVariant }}</span>
              </button>
              <button class="mode-button" :class="{ active: activeVariant === 'extended' }" @click="activeVariant = 'extended'">
                <span class="mode-indicator" aria-hidden="true"><SvgIcon v-if="activeVariant === 'extended'" name="check" /></span>
                <span>{{ labels.ui.extendedVariant }}</span>
              </button>
            </div>

            <template v-if="activeVariant === 'extended'">
              <p class="mode-label" style="margin-top: 14px">{{ labels.ui.extendedScope }}</p>
              <div class="mode-switch">
                <button class="mode-button" :class="{ active: activeMode === 'incident' }" @click="activeMode = 'incident'">
                  <span class="mode-indicator" aria-hidden="true"><SvgIcon v-if="activeMode === 'incident'" name="check" /></span>
                  <span>{{ labels.ui.incidentMode }}</span>
                </button>
                <button class="mode-button" :class="{ active: activeMode === 'map' }" @click="activeMode = 'map'">
                  <span class="mode-indicator" aria-hidden="true"><SvgIcon v-if="activeMode === 'map'" name="check" /></span>
                  <span>{{ labels.ui.mapMode }}</span>
                </button>
              </div>
            </template>

            <div class="note">{{ labels.ui.localStorageNote }}</div>
          </div>
        </aside>

        <div class="forms-stack">
          <p v-if="status" class="status" aria-live="polite">{{ status }}</p>

          <section v-if="validationErrors.length" class="panel validation-panel" aria-live="polite" tabindex="-1">
            <strong>{{ labels.ui.validationHeading }}</strong>
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
      <p><a href="http://autyzm.poznan.pl/" target="_blank" rel="noreferrer">Małgorzata Mikołajczyk</a> · {{ labels.ui.footerBio }}</p>
    </footer>
  </div>
</template>
