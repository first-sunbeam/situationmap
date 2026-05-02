import { computed, reactive, ref, watch } from "vue";
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
import type { EnvironmentConfig, PdfAction } from "../types/form";
import { createForms, hydrateForm, loadState, useFormPersistence, type EnvironmentKey } from "./useFormPersistence";
import { useValidationFlow } from "./useValidationFlow";

let formState: ReturnType<typeof createFormState> | undefined;

function createFormState() {
  const initial = loadState();
  const activeEnvKey = ref(initial.activeEnvKey);
  const activeVariant = ref(initial.activeVariant);
  const activeMode = ref(initial.activeMode);
  const status = ref("");
  const forms = reactive(createForms());

  for (const key of Object.keys(forms) as EnvironmentKey[]) {
    forms[key] = hydrateForm(key, initial.forms[key]);
  }

  const env = computed<EnvironmentConfig>(() => environments[activeEnvKey.value]);
  const form = computed(() => forms[activeEnvKey.value]);
  const modeLabel = computed(() => activeVariant.value === "simple"
    ? "formularz prosty"
    : { incident: "karta zdarzenia", map: "mapa środowiska" }[activeMode.value]
  );
  const {
    validationErrors,
    fieldErrors,
    validationRequestId,
    clearValidation,
    applyValidation,
    requestValidationNavigation,
    scrollToValidationTarget
  } = useValidationFlow({ activeVariant, activeMode, form });

  useFormPersistence({ activeEnvKey, activeVariant, activeMode, forms, status });

  function toggle(list: string[], option: string) {
    const index = list.indexOf(option);
    if (index >= 0) list.splice(index, 1);
    else list.push(option);
    if (validationErrors.value.length) applyValidation();
  }

  async function buildPdf(action: PdfAction) {
    const result = applyValidation();
    if (result.summary.length) {
      requestValidationNavigation();
      status.value = "Popraw formularz przed wygenerowaniem PDF.";
      scrollToValidationTarget();
      return;
    }

    clearValidation();
    const { buildPdf: generatePdf } = await import("../lib/pdf");
    generatePdf({
      env: env.value,
      form: form.value,
      variant: activeVariant.value,
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
      requestValidationNavigation();
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
