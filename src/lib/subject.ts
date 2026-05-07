import type { SituationForm } from "../types/form";

export function getSubjectInitials(form: SituationForm): string {
  return String(form.meta.initials || "").trim();
}

export function getSubjectLabel(form: SituationForm): string {
  return getSubjectInitials(form) || "dziecko/uczeń";
}

export function getSubjectInline(form: SituationForm): string {
  const initials = getSubjectInitials(form);
  return initials ? `_${initials}_` : "dziecka/ucznia";
}

export function getSubjectSuffix(form: SituationForm): string {
  const initials = getSubjectInitials(form);
  return initials ? ` – _${initials}_` : "";
}
