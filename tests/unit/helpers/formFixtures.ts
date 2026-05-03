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
  form.simple.factDescription = "Krótki opis sytuacji.";
  form.simple.helped = "Przerwa i spokojne miejsce.";
}

/**
 * Wypełnia minimalny zestaw pól incydentu wymagany przez walidację (bez sygnałów).
 * Sygnały pominięte celowo — testy sygnałów ustawiają je samodzielnie.
 */
export function fillMinimalIncident(form: HomeForm): void {
  form.incident.tension = "1 podwyższony";
  form.incident.antecedents = ["Zmiana aktywności"];
  form.incident.expectations = ["Brak wymagań"];
  form.incident.signalsAppeared = "Nie";
  form.incident.phase = "Żółta - narastające napięcie";
  form.incident.behavior = "Protest słowny.";
  form.incident.after = ["Przejście do spokojniejszego miejsca"];
  form.incident.endedBy = ["czas / przeczekanie"];
}

/** Wypełnia wiersz mapy środowiska i wymagane pola opisowe. */
export function fillMapForm(form: HomeForm): void {
  form.map.rows[0].time = "2h";
  form.map.rows[0].activity = "Zabawa";
  form.map.preferred = "Pokój";
  form.map.avoided = "Korytarz";
  form.map.likes = "Klocki";
  form.map.easiestWhen = "Jest cicho";
  form.map.cooperatesWith = "Rodzic";
  form.map.reducers = "Przerwa";
  form.map.escalationContexts = ["Oczekiwanie"];
}

// ── Gotowe kompozyty ──────────────────────────────────────────────────────────
// Zwracają w pełni wypełnione formularze gotowe do testów PDF / e-mail.

/** Formularz z danymi we wszystkich sekcjach (prosty + incydent + mapa). */
export function createFilledHomeForm(): HomeForm {
  const form = createHomeForm();
  fillSimpleForm(form);
  form.incident.antecedents = ["Zmiana aktywności"];
  form.incident.endedBy = ["czas / przeczekanie"];
  form.incident.tension = "1 podwyższony";
  form.map.rows[0].time = "2h";
  form.map.rows[0].activity = "Zabawa";
  return form;
}
