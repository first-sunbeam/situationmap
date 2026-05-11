import type { ComputedRef, Ref } from "vue";
import { nextTick, ref } from "vue";
import type { FormLabels } from "../config/formLabels";
import type { ExtendedMode, FieldErrors, FormVariant, SituationForm } from "../types/form";
import { validateForm } from "./useFormValidation";

export function useValidationFlow({
  activeVariant,
  activeMode,
  form,
  labels
}: {
  activeVariant: Ref<FormVariant>;
  activeMode: Ref<ExtendedMode>;
  form: ComputedRef<SituationForm>;
  labels: ComputedRef<FormLabels>;
}) {
  const validationErrors = ref<string[]>([]);
  const fieldErrors = ref<FieldErrors>({});
  const validationRequestId = ref(0);

  function clearValidation() {
    validationErrors.value = [];
    fieldErrors.value = {};
  }

  function applyValidation() {
    const result = validateForm({ variant: activeVariant.value, mode: activeMode.value, form: form.value, labels: labels.value });
    validationErrors.value = result.summary;
    fieldErrors.value = result.fieldErrors;
    return result;
  }

  function requestValidationNavigation() {
    validationRequestId.value += 1;
  }

  async function scrollToValidationTarget() {
    await nextTick();
    const target = document.querySelector<HTMLElement>(".invalid, .invalidSection, .validation-panel");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (target.classList.contains("validation-panel")) target.focus();
  }

  return {
    validationErrors,
    fieldErrors,
    validationRequestId,
    clearValidation,
    applyValidation,
    requestValidationNavigation,
    scrollToValidationTarget
  };
}
