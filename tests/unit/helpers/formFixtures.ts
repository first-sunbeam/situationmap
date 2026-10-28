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
  form.simple.escalationCourse = "Protest, płacz i odmowa przejścia do kolejnej aktywności.";
  form.simple.postEscalationNeeds = "Przerwa i spokojne miejsce.";
  form.simple.notes = "Mogła wybrać kolejność, ale zmiana planu była narzucona.";
}

/**
 * Wypełnia minimalny zestaw pól incydentu wymagany przez walidację (bez sygnałów).
 * Sygnały pominięte celowo — testy sygnałów ustawiają je samodzielnie.
 */
export function fillMinimalIncident(form: HomeForm): void {
  form.incident.tension = "1_podwyzszony";
  form.incident.tensionSigns = "O — zaciska dłonie, inaczej niż zwykle.";
  form.incident.antecedents = ["zmiana_aktywnosci"];
  form.incident.expectations = ["brak_wymagan"];
  form.incident.influence = "Mogła wybrać kolejność, ale zmiana planu była narzucona.";
  form.incident.predictabilityWhat = "no";
  form.incident.predictabilityDuration = "not_sure";
  form.incident.predictabilityChoice = "partially";
  form.incident.signalsAppeared = "no";
  form.incident.supportConditional = "no";
  form.incident.escalationCourse = "Protest słowny.";
  form.incident.behaviorDuration = "Brak danych o czasie.";
  form.incident.after = ["przejscie_do_spokojniejszego_miejsca"];
  form.incident.endedBy = ["czas / przeczekanie"];
}

/** Wypełnia wiersz mapy środowiska i wymagane pola opisowe. */
export function fillMapForm(form: HomeForm): void {
  form.map.preferredPlaces = ["pokoj_dziecka"];
  form.map.preferredObservations = "Cisza i ulubione przedmioty.";
  form.map.avoidedPlaces = ["kuchnia_jadalnia"];
  form.map.avoidedObservations = "Hałas i zapachy.";
  form.map.likes = "Klocki";
  form.map.easiestWhen = ["cisza_minimalne_bodzce_sluchowe"];
  form.map.chosenContact = "Rodzic";
  form.map.reducers = ["cisza_wyciszenie_bodzcow"];
  form.map.escalationContexts = ["oczekiwanie_czekanie"];
}

// ── Gotowe kompozyty ──────────────────────────────────────────────────────────
// Zwracają w pełni wypełnione formularze gotowe do testów PDF / e-mail.

/** Formularz z danymi we wszystkich sekcjach (prosty + incydent + mapa). */
export function createFilledHomeForm(): HomeForm {
  const form = createHomeForm();
  fillSimpleForm(form);
  form.incident.antecedents = ["zmiana_aktywnosci"];
  form.incident.endedBy = ["czas_przeczekanie_bez_interwencji"];
  form.incident.tension = "1_podwyzszony";
  form.incident.influence = "Mogła wybrać kolejność, ale zmiana planu była narzucona.";
  form.incident.predictabilityWhat = "no";
  form.incident.predictabilityDuration = "not_sure";
  form.incident.predictabilityChoice = "partially";
  form.incident.escalationDuration = "15 minut";
  form.incident.calmTime = "15_30_minut";
  form.incident.cognitiveRecoveryTime = "1_2_godziny_po";
  form.incident.recoverySupports = ["cisza_i_brak_bodzcow"];
  fillMapForm(form);
  return form;
}
