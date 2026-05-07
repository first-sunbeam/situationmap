import type { SituationForm } from "../types/form";

export function getSubjectInitials(form: SituationForm): string {
  return String(form.meta.initials || "").trim();
}

export function getSubjectInline(form: SituationForm, fallback = "dziecka/ucznia"): string {
  const initials = getSubjectInitials(form);
  return initials ? `_${initials}_` : fallback;
}
