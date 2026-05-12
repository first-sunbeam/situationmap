<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFormState } from "./composables/useFormState";
import { useTheme } from "./composables/useTheme";
import { useLanguage } from "./i18n/useLanguage";
import SvgIcon from "./components/ui/SvgIcon.vue";
import IconSprite from "./components/ui/IconSprite.vue";

const router = useRouter();
const route = useRoute();
const { isDarkTheme, toggleTheme } = useTheme();
const { languageLabel, toggleLanguageLabel, toggleLanguage } = useLanguage();

const {
  activeEnvKey,
  status,
  validationErrors,
  environments,
  env,
  labels,
  buildPdf,
  sendEmail,
  resetCurrent,
} = useFormState();

const currentMode = computed(() => route.meta.mode);
const isAbout = computed(() => route.name === "about");
const isSimple = computed(() => route.meta.variant === "simple");
const isExtended = computed(() => route.meta.variant === "extended");
const isIncident = computed(() => currentMode.value === "incident");
const isMap = computed(() => currentMode.value === "map");
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
            :title="
              isDarkTheme
                ? labels.ui.enableLightTheme
                : labels.ui.enableDarkTheme
            "
            :aria-label="
              isDarkTheme
                ? labels.ui.enableLightTheme
                : labels.ui.enableDarkTheme
            "
            @click="toggleTheme"
          >
            <SvgIcon class="button-icon" :name="isDarkTheme ? 'sun' : 'moon'" />
          </button>
          <button
            v-if="isExtended"
            class="icon-button"
            :title="labels.ui.openPdfPreview"
            :aria-label="labels.ui.openPdfPreview"
            @click="buildPdf('open')"
          >
            <SvgIcon class="button-icon" name="external" />
          </button>
          <button
            v-if="isSimple"
            class="icon-button"
            :title="labels.ui.sendEmail"
            :aria-label="labels.ui.sendEmail"
            @click="sendEmail"
          >
            <SvgIcon class="button-icon" name="email" />
          </button>
          <button
            v-if="isSimple"
            class="icon-button"
            :title="labels.ui.downloadPdf"
            :aria-label="labels.ui.downloadPdf"
            @click="buildPdf('download')"
          >
            <SvgIcon class="button-icon" name="download" />
          </button>
          <button
            class="icon-button"
            :title="labels.ui.resetForms"
            :aria-label="labels.ui.resetForms"
            @click="resetCurrent"
          >
            <SvgIcon class="button-icon" name="reset" />
          </button>
        </div>
      </div>
    </header>

    <main>
      <section class="hero">
        <template v-if="isAbout">
          <h1>{{ labels.ui.aboutHeroTitle }}</h1>
          <p>{{ labels.ui.aboutHeroText }}</p>
        </template>
        <template v-else>
          <h1>{{ labels.ui.currentEnvironment }} {{ env.label }}</h1>
          <p>{{ labels.ui.heroText }}</p>
        </template>
      </section>

      <div class="workspace">
        <aside class="sidebar">
          <div class="panel mode-card">
            <p class="mode-label">{{ labels.ui.formVersion }}</p>
            <div class="mode-switch">
              <button
                class="mode-button"
                :class="{ active: isSimple }"
                @click="router.push('/')"
              >
                <span class="mode-indicator" aria-hidden="true"
                  ><SvgIcon v-if="isSimple" name="check"
                /></span>
                <span>{{ labels.ui.simpleVariant }}</span>
              </button>
              <button
                class="mode-button"
                :class="{ active: isExtended }"
                @click="router.push('/incident')"
              >
                <span class="mode-indicator" aria-hidden="true"
                  ><SvgIcon v-if="isExtended" name="check"
                /></span>
                <span>{{ labels.ui.extendedVariant }}</span>
              </button>
            </div>

            <template v-if="isExtended">
              <p class="mode-label mode-label--spaced">
                {{ labels.ui.extendedScope }}
              </p>
              <div class="mode-switch">
                <button
                  class="mode-button"
                  :class="{ active: isIncident }"
                  @click="router.push('/incident')"
                >
                  <span class="mode-indicator" aria-hidden="true"
                    ><SvgIcon v-if="isIncident" name="check"
                  /></span>
                  <span>{{ labels.ui.incidentMode }}</span>
                </button>
                <button
                  class="mode-button"
                  :class="{ active: isMap }"
                  @click="router.push('/environment')"
                >
                  <span class="mode-indicator" aria-hidden="true"
                    ><SvgIcon v-if="isMap" name="check"
                  /></span>
                  <span>{{ labels.ui.mapMode }}</span>
                </button>
              </div>
            </template>

            <div class="note">{{ labels.ui.localStorageNote }}</div>

            <button
              class="mode-button sidebar-about-button"
              :class="{ active: isAbout }"
              @click="router.push('/about')"
            >
              <span class="mode-indicator" aria-hidden="true"
                ><SvgIcon v-if="isAbout" name="check"
              /></span>
              <span>{{ labels.ui.aboutFormsView }}</span>
            </button>
          </div>
        </aside>

        <div class="forms-stack">
          <p
            v-if="!isAbout && status"
            class="status"
            aria-live="polite"
          >
            {{ status }}
          </p>

          <section
            v-if="!isAbout && validationErrors.length"
            class="panel validation-panel"
            aria-live="polite"
            tabindex="-1"
          >
            <strong>{{ labels.ui.validationHeading }}</strong>
            <ul>
              <li v-for="error in validationErrors" :key="error">
                {{ error }}
              </li>
            </ul>
          </section>

          <RouterView />
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <p>
        <a href="https://autyzm.poznan.pl" target="_blank" rel="noreferrer">
          Małgorzata Mikołajczyk
        </a>
        · {{ labels.ui.footerBio }}
      </p>

      <p>
        <a href="https://analiza.tools/map" target="_blank" rel="noreferrer">
          analiza.tools/map
        </a>
      </p>
    </footer>
  </div>
</template>
