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

const STORAGE_KEY = "situationmap-state";

function createForms() {
  return Object.fromEntries(Object.entries(environments).map(([key, env]) => [key, blankForm(env)]));
}

function hasMapContent(map) {
  return map.rows.some((row) => row.time || row.activity)
    || [
      map.preferred,
      map.avoided,
      map.likes,
      map.easiestWhen,
      map.cooperatesWith,
      map.reducers,
      map.dependsDescription,
      map.escalationOther,
      map.noAggression,
      map.noAggressionWhere
    ].some((value) => String(value || "").trim())
    || map.dependsOn.length > 0
    || map.escalationContexts.length > 0;
}

function hasAnyValue(values) {
  return values.some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return String(value || "").trim() !== "";
  });
}

function validate({ variant, mode, form }) {
  const fieldErrors = {};
  const summary = [];
  const meta = [
    ["meta.date", "Data", form.meta.date],
    ["meta.time", "Godzina", form.meta.time],
    ["meta.place", "Miejsce", form.meta.place],
    ["meta.lead", "Osoba prowadząca", form.meta.lead]
  ];

  if (variant === "simple" || mode !== "map") {
    for (const [key, label, value] of meta) {
      if (!String(value || "").trim()) {
        const message = `Uzupełnij pole: ${label}.`;
        fieldErrors[key] = message;
        summary.push(`Dane podstawowe: uzupełnij pole ${label.toLowerCase()}.`);
      }
    }
  }

  if (variant === "simple" && !String(form.simple.factDescription || "").trim()) {
    fieldErrors["simple.factDescription"] = "Uzupełnij krótki opis sytuacji.";
    summary.push("Formularz prosty: uzupełnij krótki opis sytuacji.");
  }

  if (variant === "simple" && !String(form.simple.helped || "").trim()) {
    fieldErrors["simple.helped"] = "Uzupełnij pole „Co pomogło?” albo wpisz, że nic nie pomogło.";
    summary.push("Formularz prosty: uzupełnij pole „Co pomogło?”.");
  }

  if (variant === "extended" && mode !== "map") {
    const sectionRules = [
      {
        key: "incident.baselineSection",
        summary: "Poziom bazowy i kontekst dnia: uzupełnij przynajmniej jedno pole.",
        message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
        valid: hasAnyValue([
          form.incident.tension,
          form.incident.tired,
          form.incident.slept,
          form.incident.sleepDetails,
          form.incident.stayStage,
          form.incident.stayStageLoad,
          form.incident.burdens,
          form.incident.burdensOther
        ])
      },
      {
        key: "incident.beforeSection",
        summary: "Bezpośrednio przed zdarzeniem: zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.",
        message: "Zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.",
        valid: hasAnyValue([form.incident.antecedents, form.incident.factDescription])
      },
      {
        key: "incident.expectationsSection",
        summary: "Oczekiwania w tym momencie: uzupełnij przynajmniej jedno pole.",
        message: "Zaznacz przynajmniej jedną opcję albo wpisz własną odpowiedź.",
        valid: hasAnyValue([form.incident.expectations, form.incident.expectationOther])
      },
      {
        key: "incident.signalsSection",
        summary: form.incident.signalsAppeared === "Tak"
          ? "Pierwsze oznaki narastającego napięcia: skoro sygnały się pojawiły, wskaż jakie."
          : "Pierwsze oznaki narastającego napięcia: uzupełnij przynajmniej jedno pole.",
        message: form.incident.signalsAppeared === "Tak"
          ? "Skoro sygnały się pojawiły, wskaż jakie."
          : "Uzupełnij przynajmniej jedno pole w tej sekcji.",
        valid: form.incident.signalsAppeared === "Tak"
          ? hasAnyValue([
            form.incident.signals,
            form.incident.signalsOther,
            form.incident.firstSignal,
            form.incident.timeToEscalation,
            form.incident.predicts
          ])
          : hasAnyValue([
            form.incident.signalsAppeared,
            form.incident.signals,
            form.incident.signalsOther,
            form.incident.timeToEscalation,
            form.incident.firstSignal,
            form.incident.predicts
          ])
      },
      {
        key: "incident.actionsSection",
        summary: "Działania: uzupełnij przynajmniej jedno pole.",
        message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
        valid: hasAnyValue([
          form.incident.phase,
          form.incident.interventions,
          form.incident.interventionDetails,
          form.incident.unconditional,
          form.incident.usedRegulator,
          form.incident.reducedTension,
          form.incident.earlierPossible,
          form.incident.earlierWhat
        ])
      },
      {
        key: "incident.behaviorSection",
        summary: "Opis zachowania: uzupełnij przynajmniej jedno pole.",
        message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
        valid: hasAnyValue([
          form.incident.behavior,
          form.incident.intensity,
          form.incident.escalationDuration,
          form.incident.harms
        ])
      },
      {
        key: "incident.afterSection",
        summary: "Po zdarzeniu: uzupełnij przynajmniej jedno pole.",
        message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
        valid: hasAnyValue([
          form.incident.after,
          form.incident.afterOther,
          form.incident.calmTime,
          form.incident.physicalThisWeek,
          form.incident.physicalCount,
          form.incident.lowerThreshold,
          form.incident.physicalNote
        ])
      },
      {
        key: "incident.regulationSection",
        summary: "Regulacja i wpływ: zaznacz, co najbardziej pomogło w tej sytuacji.",
        message: "Zaznacz, co najbardziej pomogło w tej sytuacji.",
        valid: hasAnyValue([
          form.incident.endedBy,
          form.incident.endedByOther
        ])
      }
    ];

    for (const rule of sectionRules) {
      if (!rule.valid) {
        fieldErrors[rule.key] = rule.message;
        summary.push(rule.summary);
      }
    }

    if (fieldErrors["incident.beforeSection"]) {
      fieldErrors["incident.factDescription"] = fieldErrors["incident.beforeSection"];
    }
  }

  if (variant === "extended" && mode !== "incident" && !hasMapContent(form.map)) {
    fieldErrors.map = "Uzupełnij przynajmniej jedno pole w mapie środowiska.";
    summary.push("Uzupełnij przynajmniej jedno pole w mapie środowiska.");
  }

  return { fieldErrors, summary };
}

function hydrateForm(envKey, value) {
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

function loadState() {
  const fallback = {
    activeEnvKey: "home",
    activeVariant: "simple",
    activeMode: "incident",
    forms: createForms()
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      activeEnvKey: environments[parsed.activeEnvKey] ? parsed.activeEnvKey : fallback.activeEnvKey,
      activeVariant: ["simple", "extended"].includes(parsed.activeVariant) ? parsed.activeVariant : fallback.activeVariant,
      activeMode: ["incident", "map"].includes(parsed.activeMode) ? parsed.activeMode : fallback.activeMode,
      forms: parsed.forms || fallback.forms
    };
  } catch {
    return fallback;
  }
}

let formState;

function createFormState() {
  const initial = loadState();
  const activeEnvKey = ref(initial.activeEnvKey);
  const activeVariant = ref(initial.activeVariant);
  const activeMode = ref(initial.activeMode);
  const status = ref("");
  const validationErrors = ref([]);
  const fieldErrors = ref({});
  const validationRequestId = ref(0);
  const forms = reactive(createForms());

  for (const key of Object.keys(forms)) {
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
    const result = validate({ variant: activeVariant.value, mode: activeMode.value, form: form.value });
    validationErrors.value = result.summary;
    fieldErrors.value = result.fieldErrors;
    return result;
  }

  async function scrollToValidationTarget() {
    await nextTick();
    const target = document.querySelector(".invalid, .invalidSection, .validation-panel");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (target.classList.contains("validation-panel")) target.focus();
  }

  function toggle(list, option) {
    const index = list.indexOf(option);
    if (index >= 0) list.splice(index, 1);
    else list.push(option);
    if (validationErrors.value.length) applyValidation();
  }

  async function buildPdf(action) {
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
      setStatus: (message) => {
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
    status.value = "Otworzono wiadomość e-mail do kontakt@autyzm.poznan.pl z uzupełnioną treścią formularza.";
  }

  function resetCurrent() {
    forms[activeEnvKey.value] = blankForm(env.value);
    clearValidation();
    status.value = "Wyczyszczono formularze dla bieżącego środowiska.";
  }

  function resetSimple() {
    forms[activeEnvKey.value].meta = blankForm(env.value).meta;
    forms[activeEnvKey.value].simple = blankForm(env.value).simple;
    clearValidation();
    status.value = "Wyczyszczono formularz prosty.";
  }

  function resetIncident() {
    forms[activeEnvKey.value].meta = blankForm(env.value).meta;
    forms[activeEnvKey.value].incident = blankForm(env.value).incident;
    clearValidation();
    status.value = "Wyczyszczono kartę zdarzenia.";
  }

  function resetMap() {
    forms[activeEnvKey.value].map = blankForm(env.value).map;
    clearValidation();
    status.value = "Wyczyszczono mapę środowiska.";
  }

  watch([activeEnvKey, activeVariant, activeMode, forms], () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      activeEnvKey: activeEnvKey.value,
      activeVariant: activeVariant.value,
      activeMode: activeMode.value,
      forms
    }));
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
