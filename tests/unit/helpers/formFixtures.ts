import { blankForm, environments } from "../../../src/data/environments";
import type { SituationForm } from "../../../src/types/form";

// ── Typ pomocniczy ────────────────────────────────────────────────────────────
// Używany zamiast powtarzającego się ReturnType<typeof createHomeForm> w testach.

export type HomeForm = SituationForm;

// ── Podstawowe fabryki ────────────────────────────────────────────────────────

export function createHomeForm(): HomeForm {
  return blankForm(environments.home);
}

export function fillRequiredMeta(form: HomeForm): void {
  form.meta.date = "2026-05-02";
  form.meta.time = "12:30";
  form.meta.place = "Dom";
  form.meta.lead = "Jan Kowalski";
}

// ── Builderzy sekcji ──────────────────────────────────────────────────────────
// Każda funkcja przyjmuje formularz i mutuje konkretną sekcję.
// Można je łączyć łańcuchowo przez kolejne wywołania.

/** Wypełnia wszystkie pola wymagane przez formularz prosty. */
export function fillSimpleForm(form: HomeForm): void {
  fillRequiredMeta(form);
  form.simple.behavior = "Protest, płacz i odmowa przejścia do kolejnej aktywności.";
  form.simple.helped = "Przerwa i spokojne miejsce.";
  form.simple.notes = "Mogła wybrać kolejność, ale zmiana planu była narzucona.";
}

/**
 * Wypełnia minimalny zestaw pól incydentu wymagany przez walidację (bez sygnałów).
 * Sygnały pominięte celowo — testy sygnałów ustawiają je samodzielnie.
 */
export function fillMinimalIncident(form: HomeForm): void {
  form.incident.tension = "1 podwyższony";
  form.incident.antecedents = ["Zmiana aktywności"];
  form.incident.expectations = ["Brak wymagań"];
  form.incident.influence = "Mogła wybrać kolejność, ale zmiana planu była narzucona.";
  form.incident.predictabilityWhat = "Nie";
  form.incident.predictabilityDuration = "Nie wiem";
  form.incident.predictabilityChoice = "Częściowo";
  form.incident.signalsAppeared = "Nie";
  form.incident.phase = "Żółta - narastające napięcie";
  form.incident.behavior = "Protest słowny.";
  form.incident.after = ["Przejście do spokojniejszego miejsca"];
  form.incident.endedBy = ["czas / przeczekanie"];
}

/** Wypełnia wiersz mapy środowiska i wymagane pola opisowe. */
export function fillMapForm(form: HomeForm): void {
  form.map.preferredPlaces = ["Pokój dziecka"];
  form.map.preferredReason = "Cisza i ulubione przedmioty.";
  form.map.avoidedPlaces = ["Kuchnia / jadalnia"];
  form.map.avoidedReason = "Hałas i zapachy.";
  form.map.likes = "Klocki";
  form.map.easiestWhen = ["Cisza / minimalne bodźce słuchowe"];
  form.map.cooperatesWith = "Rodzic";
  form.map.reducers = ["Cisza / wyciszenie bodźców"];
  form.map.escalationContexts = ["Oczekiwanie"];
}

// ── Gotowe kompozyty ──────────────────────────────────────────────────────────
// Zwracają w pełni wypełnione formularze gotowe do testów PDF / e-mail.

/** Formularz z danymi we wszystkich sekcjach (prosty + incydent + mapa). */
export function createFilledHomeForm(): HomeForm {
  const form = createHomeForm();
  fillSimpleForm(form);
  form.incident.antecedents = ["Zmiana aktywności"];
  form.incident.endedBy = ["Czas / przeczekanie bez interwencji"];
  form.incident.tension = "1 podwyższony";
  form.incident.influence = "Mogła wybrać kolejność, ale zmiana planu była narzucona.";
  form.incident.predictabilityWhat = "Nie";
  form.incident.predictabilityDuration = "Nie wiem";
  form.incident.predictabilityChoice = "Częściowo";
  form.incident.escalationDuration = "15 minut";
  form.incident.calmTime = "15-30 minut";
  form.incident.cognitiveRecoveryTime = "1-2 godziny po";
  form.incident.recoverySupports = ["Cisza i brak bodźców"];
  fillMapForm(form);
  return form;
}
