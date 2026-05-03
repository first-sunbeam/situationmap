import { blankForm, environments } from "../../../src/data/environments";
import type { SituationForm } from "../../../src/types/form";

export function createHomeForm(): SituationForm {
  return blankForm(environments.home);
}

export function fillRequiredMeta(form: SituationForm) {
  form.meta.date = "2026-05-02";
  form.meta.time = "12:30";
  form.meta.place = "Dom";
  form.meta.lead = "Jan Kowalski";
}
