import { computed, reactive, ref, watch } from "vue";
import {
  activationSignalOptions,
  blankForm,
  activityRoleOptions,
  bodyStateOptions,
  calmTime,
  cognitiveRecoveryOptions,
  environments,
  escalationReducerOptions,
  intensity,
  interventionTypeOptions,
  maskingDurationOptions,
  maskingStrategyOptions,
  recoverySupportOptions,
  reducerOptions,
  regulationPhase,
  sensoryIntensityOptions,
  sensorySignalOptions,
  optimalConditionOptions,
  shutdownSignalOptions,
  tensionLevels,
  yesNoPartial,
  yesNoUnknown,
} from "../data/environments";
import { getFormLabels } from "../config/formLabels";
import { useLanguage } from "../i18n/useLanguage";
import { buildEmail, openEmail } from "../lib/email";
import { getSubjectInline } from "../lib/subject";
import type { EnvironmentConfig, PdfAction } from "../types/form";
import {
  createForms,
  hydrateForm,
  loadState,
  useFormPersistence,
  type EnvironmentKey,
} from "./useFormPersistence";
import { useValidationFlow } from "./useValidationFlow";

let formState: ReturnType<typeof createFormState> | undefined;

function createFormState() {
  const { language } = useLanguage();
  const initial = loadState();
  const activeEnvKey = ref(initial.activeEnvKey);
  const activeVariant = ref(initial.activeVariant);
  const activeMode = ref(initial.activeMode);
  const status = ref("");
  const forms = reactive(createForms());

  for (const key of Object.keys(forms) as EnvironmentKey[]) {
    forms[key] = hydrateForm(key, initial.forms[key]);
  }

  const env = computed<EnvironmentConfig>(
    () => environments[activeEnvKey.value],
  );
  const form = computed(() => forms[activeEnvKey.value]);
  const labels = computed(() => getFormLabels(language.value));
  const envLabel = computed(() => labels.value.environments[activeEnvKey.value].label);
  const envIncidentTitle = computed(() => labels.value.environments[activeEnvKey.value].incidentTitle);
  const envMapTitle = computed(() => labels.value.environments[activeEnvKey.value].mapTitle);
  const envLead = computed(() => labels.value.environments[activeEnvKey.value].lead);
  const subject = computed(() => getSubjectInline(form.value));
  const subjectNominative = computed(() =>
    getSubjectInline(form.value, "osoba"),
  );
  const modeLabel = computed(() => {
    if (language.value === "en") {
      return activeVariant.value === "simple"
        ? "simple form"
        : { incident: "incident report", map: "environment map" }[activeMode.value];
    }

    return activeVariant.value === "simple"
      ? "formularz prosty"
      : { incident: "karta zdarzenia", map: "mapa środowiska" }[
          activeMode.value
        ];
  });
  const {
    validationErrors,
    fieldErrors,
    validationRequestId,
    clearValidation,
    applyValidation,
    requestValidationNavigation,
    scrollToValidationTarget,
  } = useValidationFlow({ activeVariant, activeMode, form, labels });

  useFormPersistence({
    activeEnvKey,
    activeVariant,
    activeMode,
    forms,
    status,
  });

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
      status.value = language.value === "en" ? "Correct the form before generating the PDF." : "Popraw formularz przed wygenerowaniem PDF.";
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
      language: language.value,
      action,
      setStatus: (message: string) => {
        status.value = message;
      },
    });
  }

  function sendEmail() {
    const result = applyValidation();
    if (result.summary.length) {
      requestValidationNavigation();
      status.value = language.value === "en" ? "Correct the form before sending the email." : "Popraw formularz przed wysłaniem e-maila.";
      scrollToValidationTarget();
      return;
    }

    clearValidation();
    const email = buildEmail({
      env: env.value,
      form: form.value,
      variant: activeVariant.value,
      mode: activeMode.value,
      language: language.value,
    });
    openEmail(email);
    status.value = language.value === "en"
      ? "Email has been prepared in your default email app."
      : "E-mail został przygotowany w domyślnym programie pocztowym.";
  }

  function resetCurrent() {
    forms[activeEnvKey.value] = blankForm(env.value);
    clearValidation();
    status.value = language.value === "en"
      ? "Cleared all forms for the current environment."
      : "Wyczyszczono wszystkie formularze dla bieżącego środowiska.";
  }

  function resetSimple() {
    forms[activeEnvKey.value].meta = blankForm(env.value).meta;
    forms[activeEnvKey.value].simple = blankForm(env.value).simple;
    clearValidation();
    status.value = language.value === "en" ? "Cleared only the simple form." : "Wyczyszczono tylko formularz prosty.";
  }

  function resetIncident() {
    forms[activeEnvKey.value].meta = blankForm(env.value).meta;
    forms[activeEnvKey.value].incident = blankForm(env.value).incident;
    clearValidation();
    status.value = language.value === "en" ? "Cleared only the incident report." : "Wyczyszczono tylko kartę zdarzenia.";
  }

  function resetMap() {
    forms[activeEnvKey.value].map = blankForm(env.value).map;
    clearValidation();
    status.value = language.value === "en" ? "Cleared only the environment map." : "Wyczyszczono tylko mapę środowiska.";
  }

  watch([activeEnvKey, activeVariant, activeMode], clearValidation);
  watch(
    forms,
    () => {
      if (
        validationErrors.value.length ||
        Object.keys(fieldErrors.value).length
      )
        applyValidation();
    },
    { deep: true },
  );

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
    envLabel,
    envIncidentTitle,
    envMapTitle,
    envLead,
    form,
    labels,
    subject,
    subjectNominative,
    activationSignalOptions,
    activityRoleOptions,
    bodyStateOptions,
    calmTime,
    cognitiveRecoveryOptions,
    escalationReducerOptions,
    intensity,
    interventionTypeOptions,
    maskingDurationOptions,
    maskingStrategyOptions,
    recoverySupportOptions,
    reducerOptions,
    regulationPhase,
    sensoryIntensityOptions,
    sensorySignalOptions,
    optimalConditionOptions,
    shutdownSignalOptions,
    tensionLevels,
    yesNoPartial,
    yesNoUnknown,
    toggle,
    buildPdf,
    sendEmail,
    resetCurrent,
    resetSimple,
    resetIncident,
    resetMap,
  };
}

export function useFormState() {
  if (!formState) formState = createFormState();
  return formState;
}
