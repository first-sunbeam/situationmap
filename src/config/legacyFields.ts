import type { LanguageCode } from "../i18n/useLanguage";
import type { ExtendedMode, FormVariant, SituationForm } from "../types/form";
import type { ExportRow, ExportSection } from "./exportSections";
import { getMonitoringRevision } from "./monitoringRevision";

type LegacyScope = "simple" | "incident" | "map";
const legacyFields = {
  simple: [
    ["interventions", "Reakcja osoby wspierającej / otoczenia (dawny zapis)", "Supporting person / environmental response (previous record)"],
    ["behavior", "Przebieg sytuacji — co można było zaobserwować? (dawny zapis)", "What happened — what could be observed? (previous record)"],
    ["helped", "Co pomogło (lub nie pomogło) wyregulować sytuację?", "What helped (or did not help) regulate the situation?"],
    ["recoveryTime", "Czas do odzyskania gotowości do współpracy (dawne przedziały)", "Time to regain readiness to cooperate (old bands)"],
  ],
  incident: [
    ["phaseObservation", "Co obserwowano w momencie podjęcia działań? (dawny zapis)", "What was observed when action was taken? (previous record)"],
    ["actionSequence", "Przebieg działań i zmian w otoczeniu (dawny zapis)", "Sequence of actions and environmental changes (previous record)"],
    ["actionSources", "Źródła informacji o działaniach (dawny zapis)", "Sources for actions (previous record)"],
    ["observedChange", "Co obserwowano po działaniu? (dawny zapis)", "What was observed after the action? (previous record)"],
    ["changeEvidence", "Konkretne oznaki zmiany (dawny zapis)", "Specific signs of change (previous record)"],
    ["earlierWhat", "Co ta sytuacja pokazuje jako wskazówkę na przyszłość?", "What does this situation show as a cue for the future?"],
    ["behavior", "Opis zachowania (dawny zapis)", "Behavior description (previous record)"],
    ["predicts", "Czy sygnał zapowiada trudniejsze zachowanie?", "Does this sign predict more difficult behavior?"],
    ["slept", "Sen / odpoczynek w ciągu dnia", "Sleep / rest during the day"],
    ["maskingContinued", "Czy osoba próbowała kontynuować aktywność mimo narastającego napięcia?", "Did the person try to continue the activity despite rising tension?"],
    ["maskingStrategies", "Co pozwoliło osobie „trzymać się razem” przed eskalacją?", "What helped the person continue before escalation?"],
    ["maskingStrategiesOther", "Inne strategie (dawny zapis)", "Other strategies (previous record)"],
    ["maskingDuration", "Czas „trzymania się” przed eskalacją", "Time continuing before escalation"],
    ["phase", "Faza napięcia w momencie podjęcia działań", "Tension phase when action was taken"],
    ["unconditional", "Czy pomoc/interwencja była dostępna od razu, bez wcześniejszego uspokojenia się, wykonania polecenia lub spełnienia wymagania?", "Was help/intervention available immediately, without first calming down, following an instruction, or meeting a demand?"],
    ["reducedTension", "Czy działanie pomogło na tym etapie?", "Did the action help at this stage?"],
    ["intensity", "Intensywność zachowania (dawna skala)", "Behavior intensity (old scale)"],
    ["harms", "Czy doszło do (dawna lista zachowań i skutków)", "Did it involve (old list of behavior and consequences)"],
    ["escalationDuration", "Czas trwania eskalacji", "Escalation duration"],
    ["calmTime", "Czas do pełnego uspokojenia emocjonalnego", "Time to full emotional calming"],
    ["cognitiveRecoveryTime", "Czas do odzyskania dostępności poznawczej", "Time to regain cognitive availability"],
    ["physicalThisWeek", "Interwencja fizyczna w tym tygodniu?", "Physical intervention this week?"],
    ["physicalCount", "Ile razy w tym tygodniu?", "How many times this week?"],
    ["physicalNote", "Notatka o interwencji fizycznej (dawny zapis)", "Physical intervention note (previous record)"],
    ["helped", "Co pomogło (dawny zapis)", "What helped (previous record)"],
    ["endedBy", "Co pomogło lub mogło pomóc zakończyć eskalację?", "What helped or may have helped end the escalation?"],
    ["endedByOther", "Inne — zakończenie eskalacji (dawny zapis)", "Other — ending escalation (previous record)"],
    ["worsened", "Co mogło nasilić napięcie podczas lub po eskalacji?", "What may have increased tension during or after escalation?"],
    ["recoverySupports", "Co pomogło lub mogło pomóc wrócić do gotowości?", "What helped or may have helped regain readiness?"],
    ["recoverySupportsOther", "Inne — powrót do gotowości (dawny zapis)", "Other — return to readiness (previous record)"],
    ["assessmentBasis", "Podstawa oceny: co pomogło / przeszkodziło?", "Basis for judging what helped / hindered"],
  ],
  map: [
    ["preferredReason", "Dlaczego te miejsca? Co je wyróżnia?", "Why these places? What makes them distinctive?"],
    ["avoidedReason", "Co w tych miejscach aktywuje napięcie?", "What activates tension in these places?"],
    ["cooperatesWith", "Osoba najłatwiej współpracuje z", "The person cooperates best with"],
    ["energySources", "Co daje energię / motywuje do funkcjonowania mimo przeciążenia?", "What gives energy / supports activity despite overload?"],
    ["safeBase", "Gdzie / z kim osoba czuje się najbezpieczniej?", "Where / with whom does the person feel safest?"],
    ["noAggression", "Czy są sytuacje bez agresji?", "Are there situations without aggression?"],
    ["noAggressionWhere", "Jakie sytuacje bez agresji?", "Which situations without aggression?"],
  ],
} as const satisfies Record<LegacyScope, ReadonlyArray<readonly [string, string, string]>>;

export function getLegacyRows(scope: LegacyScope, form: SituationForm, language: LanguageCode): ExportRow[] {
  const data = form[scope] as unknown as Record<string, string | string[]>;
  return legacyFields[scope].filter(([key]) => {
    const value = data[key];
    return Array.isArray(value) ? value.length > 0 : Boolean(value?.trim());
  }).map(([key, pl, en]) => ({
    label: language === "pl" ? pl : en,
    value: () => data[key] ?? "",
  }));
}

export function getLegacyExportSections(form: SituationForm, variant: FormVariant, mode: ExtendedMode, language: LanguageCode): ExportSection[] {
  const scopes: LegacyScope[] = variant === "simple" ? ["simple"] : mode === "map" ? ["map"] : ["incident"];
  const rows = scopes.flatMap((scope) => getLegacyRows(scope, form, language));
  return rows.length ? [{ title: getMonitoringRevision(language).legacyTitle, rows }] : [];
}
