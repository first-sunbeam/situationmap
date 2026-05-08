import type { Reactive, Ref } from "vue";
import { watch } from "vue";
import { blankForm, environments } from "../data/environments";
import type { ExtendedMode, FormVariant, SituationForm } from "../types/form";

const STORAGE_KEY = "situationmap-state";
const SAVE_STATUS_MESSAGE = "Formularz zapisano lokalnie.";

export type EnvironmentKey = keyof typeof environments;
export type FormsByEnvironment = Record<EnvironmentKey, SituationForm>;

type PersistedForm = Partial<SituationForm> & { map?: Partial<SituationForm["map"]> };

export interface PersistedState {
  activeEnvKey: EnvironmentKey;
  activeVariant: FormVariant;
  activeMode: ExtendedMode;
  forms: FormsByEnvironment;
}

export function createForms(): FormsByEnvironment {
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

export function hydrateForm(envKey: EnvironmentKey, value: PersistedForm | undefined): SituationForm {
  const fallback = blankForm(environments[envKey]);
  if (!value || typeof value !== "object") return fallback;

  return {
    meta: { ...fallback.meta, ...(value.meta || {}) },
    simple: { ...fallback.simple, ...(value.simple || {}) },
    incident: { ...fallback.incident, ...(value.incident || {}) },
    map: {
      ...fallback.map,
      ...(value.map || {}),
      preferredPlaces: Array.isArray(value.map?.preferredPlaces) ? value.map.preferredPlaces : fallback.map.preferredPlaces,
      avoidedPlaces: Array.isArray(value.map?.avoidedPlaces) ? value.map.avoidedPlaces : fallback.map.avoidedPlaces,
      activityRoles: Array.isArray(value.map?.activityRoles) ? value.map.activityRoles : fallback.map.activityRoles,
      easiestWhen: Array.isArray(value.map?.easiestWhen) ? value.map.easiestWhen : fallback.map.easiestWhen,
      reducers: Array.isArray(value.map?.reducers) ? value.map.reducers : fallback.map.reducers,
      dependsOn: Array.isArray(value.map?.dependsOn) ? value.map.dependsOn : fallback.map.dependsOn,
      escalationContexts: Array.isArray(value.map?.escalationContexts) ? value.map.escalationContexts : fallback.map.escalationContexts,
      escalationReducers: Array.isArray(value.map?.escalationReducers) ? value.map.escalationReducers : fallback.map.escalationReducers
    }
  };
}

function hydrateForms(forms: Partial<Record<EnvironmentKey, PersistedForm>> | undefined): FormsByEnvironment {
  return Object.fromEntries(
    Object.keys(environments).map((key) => {
      const envKey = key as EnvironmentKey;
      return [envKey, hydrateForm(envKey, forms?.[envKey])];
    })
  ) as FormsByEnvironment;
}

export function loadState(): PersistedState {
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
      forms: hydrateForms(parsed.forms)
    };
  } catch {
    return fallback;
  }
}

export function useFormPersistence({
  activeEnvKey,
  activeVariant,
  activeMode,
  forms,
  status
}: {
  activeEnvKey: Ref<EnvironmentKey>;
  activeVariant: Ref<FormVariant>;
  activeMode: Ref<ExtendedMode>;
  forms: Reactive<FormsByEnvironment>;
  status: Ref<string>;
}) {
  let saveStatusTimeout: number | undefined;

  watch([activeEnvKey, activeVariant, activeMode, forms], () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      activeEnvKey: activeEnvKey.value,
      activeVariant: activeVariant.value,
      activeMode: activeMode.value,
      forms
    }));

    clearTimeout(saveStatusTimeout);
    status.value = SAVE_STATUS_MESSAGE;
    saveStatusTimeout = window.setTimeout(() => {
      if (status.value === SAVE_STATUS_MESSAGE) status.value = "";
    }, 1800);
  }, { deep: true });
}
