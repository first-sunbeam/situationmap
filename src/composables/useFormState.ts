import { computed, nextTick, reactive, ref, watch } from "vue";
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
} from "../data/environments";
import { buildEmail, openEmail } from "../lib/email";
import type { ExtendedMode, FieldErrors, FormVariant, PdfAction, SituationForm } from "../types/form";
import { validateForm } from "./useFormValidation";

type EnvironmentKey = keyof typeof environments;
type FormsByEnvironment = Record<EnvironmentKey, SituationForm>;
type PersistedForm = Partial<SituationForm> & { map?: Partial<SituationForm["map"]> };

interface PersistedState {
  activeEnvKey: EnvironmentKey;
  activeVariant: FormVariant;
  activeMode: ExtendedMode;
  forms: FormsByEnvironment;
}

const STORAGE_KEY = "situationmap-state";

function createForms(): FormsByEnvironment {
  return Object.fromEntries(Object.entries(environments).map(([key, env]) => [key, blankForm(env)])) as FormsByEnvironment;
}

function isEnvironmentKey(value: unknown): value is EnvironmentKey {
  return typeof value === "string" && value in environments;
}

function isFormVariant(value: unknown): value is FormVariant {
  return value === "simple" || value === "extended";
}

function isExtendedMode(value: unknown): value is ExtendedMode {
  return value === "incident" || value === "map";
}

function hydrateForm(envKey: EnvironmentKey, value: PersistedForm | undefined): SituationForm {
  const fallback = blankForm(environments[envKey]);
  if (!value || typeof value !== "object") return fallback;

  return {
    meta: { ...fallback.meta, ...(value.meta || {}) },
    simple: { ...fallback.simple, ...(value.simple || {}) },
    incident: { ...fallback.incident, ...(value.incident || {}) },
    map: {
      ...fallback.map,
      ...(value.map || {}),
      rows: Array.isArray(value.map?.rows) ? value.map.rows : fallback.map.rows,
      dependsOn: Array.isArray(value.map?.dependsOn) ? value.map.dependsOn : fallback.map.dependsOn,
      escalationContexts: Array.isArray(value.map?.escalationContexts) ? value.map.escalationContexts : fallback.map.escalationContexts
    }
  };
}

function loadState(): PersistedState {
  const fallback: PersistedState = {
    activeEnvKey: "home",
    activeVariant: "simple",
    activeMode: "incident",
    forms: createForms()
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      activeEnvKey: isEnvironmentKey(parsed.activeEnvKey) ? parsed.activeEnvKey : fallback.activeEnvKey,
      activeVariant: isFormVariant(parsed.activeVariant) ? parsed.activeVariant : fallback.activeVariant,
      activeMode: isExtendedMode(parsed.activeMode) ? parsed.activeMode : fallback.activeMode,
      forms: parsed.forms || fallback.forms
    };
  } catch {
    return fallback;
  }
}

let formState: ReturnType<typeof createFormState> | undefined;

function createFormState() {
  const initial = loadState();
  const activeEnvKey = ref(initial.activeEnvKey);
  const activeVariant = ref(initial.activeVariant);
  const activeMode = ref(initial.activeMode);
  const status = ref("");
  const validationErrors = ref<string[]>([]);
  const fieldErrors = ref<FieldErrors>({});
  const validationRequestId = ref(0);
  const forms = reactive(createForms());
  let saveStatusTimeout: ReturnType<typeof setTimeout> | undefined;

  for (const key of Object.keys(forms) as EnvironmentKey[]) {
    forms[key] = hydrateForm(key, initial.forms[key]);
  }

  const env = computed(() => environments[activeEnvKey.value]);
  const form = computed(() => forms[activeEnvKey.value]);
  const modeLabel = computed(() => ({ incident: "karta zdarzenia", map: "mapa środowiska" }[activeMode.value]));

  function clearValidation() {
    validationErrors.value = [];
    fieldErrors.value = {};
  }

  function applyValidation() {
    const result = validateForm({ variant: activeVariant.value, mode: activeMode.value, form: form.value });
    validationErrors.value = result.summary;
    fieldErrors.value = result.fieldErrors;
    return result;
  }

  async function scrollToValidationTarget() {
    await nextTick();
    const target = document.querySelector<HTMLElement>(".invalid, .invalidSection, .validation-panel");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (target.classList.contains("validation-panel")) target.focus();
  }

  function toggle(list: string[], option: string) {
    const index = list.indexOf(option);
    if (index >= 0) list.splice(index, 1);
    else list.push(option);
    if (validationErrors.value.length) applyValidation();
  }

  async function buildPdf(action: PdfAction) {
    const result = applyValidation();
    if (result.summary.length) {
      validationRequestId.value += 1;
      status.value = "Popraw formularz przed wygenerowaniem PDF.";
      scrollToValidationTarget();
      return;
    }

    clearValidation();
    const { buildPdf: generatePdf } = await import("../lib/pdf");
    generatePdf({
      env: env.value,
      form: form.value,
      mode: activeMode.value,
      modeLabel: modeLabel.value,
      action,
      setStatus: (message: string) => {
        status.value = message;
      }
    });
  }

  function sendEmail() {
    const result = applyValidation();
    if (result.summary.length) {
      validationRequestId.value += 1;
      status.value = "Popraw formularz przed wysłaniem e-maila.";
      scrollToValidationTarget();
      return;
    }

    clearValidation();
    const email = buildEmail({
      env: env.value,
      form: form.value,
      variant: activeVariant.value,
      mode: activeMode.value
    });
    openEmail(email);
    status.value = "E-mail został przygotowany w domyślnym programie pocztowym.";
  }

  function resetCurrent() {
    forms[activeEnvKey.value] = blankForm(env.value);
    clearValidation();
    status.value = "Wyczyszczono wszystkie formularze dla bieżącego środowiska.";
  }

  function resetSimple() {
    forms[activeEnvKey.value].meta = blankForm(env.value).meta;
    forms[activeEnvKey.value].simple = blankForm(env.value).simple;
    clearValidation();
    status.value = "Wyczyszczono tylko formularz prosty.";
  }

  function resetIncident() {
    forms[activeEnvKey.value].meta = blankForm(env.value).meta;
    forms[activeEnvKey.value].incident = blankForm(env.value).incident;
    clearValidation();
    status.value = "Wyczyszczono tylko kartę zdarzenia.";
  }

  function resetMap() {
    forms[activeEnvKey.value].map = blankForm(env.value).map;
    clearValidation();
    status.value = "Wyczyszczono tylko mapę środowiska.";
  }

  watch([activeEnvKey, activeVariant, activeMode, forms], () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      activeEnvKey: activeEnvKey.value,
      activeVariant: activeVariant.value,
      activeMode: activeMode.value,
      forms
    }));

    clearTimeout(saveStatusTimeout);
    status.value = "Formularz zapisano lokalnie.";
    saveStatusTimeout = setTimeout(() => {
      if (status.value === "Formularz zapisano lokalnie.") status.value = "";
    }, 1800);
  }, { deep: true });

  watch([activeEnvKey, activeVariant, activeMode], clearValidation);
  watch(forms, () => {
    if (validationErrors.value.length || Object.keys(fieldErrors.value).length) applyValidation();
  }, { deep: true });

  return {
    activeEnvKey,
    activeVariant,
    activeMode,
    status,
    validationErrors,
    fieldErrors,
    validationRequestId,
    environments,
    env,
    form,
    calmTime,
    commonSignals,
    intensity,
    regulationPhase,
    tensionLevels,
    yesNoPartial,
    yesNoUnknown,
    toggle,
    buildPdf,
    sendEmail,
    resetCurrent,
    resetSimple,
    resetIncident,
    resetMap
  };
}

export function useFormState() {
  if (!formState) formState = createFormState();
  return formState;
}
