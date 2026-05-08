export const bodyStateOptions = ["głód", "pragnienie", "potrzeba toalety", "ból/dyskomfort", "zmęczenie fizyczne", "temperatura ciała (zimno/gorąco)", "napięcie mięśniowe", "inne"];
export const sensoryIntensityOptions = ["hałas/dźwięki", "światło", "tłok/liczba osób", "zapachy", "tekstury/dotyk", "temperatura pomieszczenia", "inne"];
export const activationSignalOptions = ["przyspieszone oddychanie", "napięcie mięśniowe", "pot", "drżenie", "rozszerzone źrenice", "ucieczka/walka", "inne"];
export const shutdownSignalOptions = ["patrzenie w jeden punkt/podłogę", "brak reakcji na głos", "spowolnienie ruchów", "opadnięcie ciała", "wycofanie", "inne"];
export const sensorySignalOptions = ["zatykanie uszu", "zasłanianie oczu", "stereotypie", "unikanie dotyku", "ucieczka z pomieszczenia", "inne"];
export const interventionTypeOptions = [
  "Obniżenie bodźców sensorycznych (wyciszenie, przyciemnienie, zmniejszenie liczby osób)",
  "Zwiększenie autonomii (zaproponowanie wyboru, możliwość decyzji)",
  "Zapewnienie przewidywalności (poinformowanie, ile to potrwa; pokazanie planu)",
  "Wsparcie interoceptywne (pomoc w nazwaniu stanu ciała: „jesteś głodny?”, „zimno ci?”)",
  "Czas bez wymagań (pauza od oczekiwań, możliwość wycofania się)",
  "Regulacja sensoryczna (bodźce uspokajające: ciężar, ruch, ucisk)",
  "Inne"
];
export const maskingStrategyOptions = [
  "Maskowanie (ukrywanie dyskomfortu, udawanie że wszystko OK)",
  "Strategia kompensacyjna (wycofanie w fantazję, kontrolowanie rozmowy, humor)",
  "Wsparcie dorosłego (obecność, zachęta)",
  "Jasny koniec aktywności (wiedza, że to się skończy, np. „jeszcze 5 minut”)",
  "Lęk przed konsekwencjami (strach przed oceną, karą, rozczarowaniem)",
  "Silna motywacja wewnętrzna (bardzo chciało dokończyć)",
  "Inne"
];
export const recoverySupportOptions = [
  "Cisza i brak bodźców",
  "Sen / drzemka",
  "Jedzenie / picie",
  "Aktywność sensoryczna (huśtawka, spacer, zimny prysznic)",
  "Obecność bliskiej osoby bez wymagań",
  "Samotność",
  "Ulubiona aktywność bez presji",
  "Czas (po prostu przeczekanie)",
  "Inne"
];
export const maskingDurationOptions = ["Kilka minut", "10-30 minut", "Ponad 30 minut", "Cały dzień (eskalacja wieczorem/w domu)"];
export const cognitiveRecoveryOptions = ["Od razu po uspokojeniu", "10-30 minut po", "1-2 godziny po", "Kilka godzin lub następnego dnia"];
export const homePlaceOptions = ["Pokój dziecka", "Salon / wspólna przestrzeń", "Kuchnia / jadalnia", "Łazienka", "Przedpokój / przejścia", "Na zewnątrz (ogród, balkon)", "Samochód", "Inne"];
export const activityRoleOptions = ["Prowadzący / kontrolujący (decyduje o zasadach, przebiegu)", "Uczestnik / współpracujący (równy partner)", "Obserwator / towarzyszący (obecność bez aktywnego udziału)", "Sam / bez interakcji z innymi"];
export const optimalConditionOptions = ["Cisza / minimalne bodźce słuchowe", "Przyciemnione / naturalne światło", "Spokojne otoczenie / mała liczba osób", "Możliwość kontrolowania bodźców", "Samotność / czas bez wymagań społecznych", "Obecność bliskiej osoby (bez wymagań)", "Interakcja 1:1 (nie grupa)", "Kontakt bez bezpośredniej komunikacji (równoległa aktywność)", "Ma wpływ na przebieg aktywności (kiedy, jak, z kim)", "Wie, co się wydarzy i jak długo to potrwa", "Może negocjować lub wybierać", "Rutyny / powtarzalność", "Najedzone / napite", "Wypoczęte / nie zmęczone", "Komfortowa temperatura", "Bez bólu / dyskomfortu", "Inne"];
export const reducerOptions = ["Cisza / wyciszenie bodźców", "Ruch (huśtawka, trampolina, spacer)", "Ciężar / ucisk (koc, przytulenie, ściskanie)", "Chłód lub ciepło (zimny prysznic, ciepła kąpiel)", "Stereotypie (bujanie, kręcenie, podskakiwanie)", "Jedzenie / picie", "Sen / drzemka", "Toaleta", "Obecność bliskiej osoby (bez wymagań)", "Samotność / wycofanie się", "Kontakt fizyczny (przytulenie)", "Dystans / przestrzeń osobista", "Wycofanie wymagania", "Dostęp do ulubionej aktywności", "Wybór / możliwość decyzji", "Informacja, ile to potrwa", "Inne"];
export const escalationReducerOptions = ["Ostrzeżenie / przygotowanie („Za 5 minut kończymy”)", "Wizualizacja / timer / plan", "Wybór (kiedy, jak, w jakiej kolejności)", "Negocjacja (możliwość omówienia, co się wydarzy)", "Jasny koniec (konkretna informacja, ile potrwa)", "Brak pośpiechu / elastyczność czasowa", "Obecność bliskiej osoby", "Dostęp do regulacji sensorycznej (np. przedmiot, ruch)", "Inne"];

export const yesNoUnknown = ["Tak", "Nie", "Nie wiem"];
export const yesNoPartial = ["Tak", "Nie", "Częściowo"];
export const tensionLevels = ["0 niski / stabilny", "1 podwyższony", "2 wysoki", "3 bardzo wysoki"];
export const regulationPhase = [
  "Zielona - możliwa rozmowa i współpraca",
  "Żółta - narastające napięcie",
  "Czerwona - pełna eskalacja / brak kontaktu",
  "Trudno określić"
];
export const intensity = ["0 brak agresji", "1 lekkie", "2 umiarkowane", "3 wysokie ryzyko"];
export const calmTime = ["Do 5 minut", "5-15 minut", "15-30 minut", "30-60 minut", "Ponad godzinę"];

import type { EnvironmentConfig, SituationForm } from "../types/form";

export const environments = {
  home: {
    icon: "⌂",
    label: "Dom",
    header: "Narzędzie monitorowania sytuacji domowych",
    footer: "© 2026 Małgorzata Mikołajczyk | Powielanie do użytku rodziny i specjalistów wyłącznie w pełnej, niezmienionej wersji",
    incidentTitle: "KARTA MONITOROWANIA SYTUACJI - DOM",
    mapTitle: "MAPA ŚRODOWISKA DOMOWEGO",
    lead: "Rodzic / opiekun prowadzący",
    burdens: [
      "słaby sen / pobudka w nocy",
      "zmiana planu",
      "wyjście / powrót / podróż",
      "wizyta gości / większa liczba osób",
      "konflikt z rodzeństwem / dorosłym",
      "ból / dyskomfort / dolegliwości somatyczne",
      "nowe wymagania",
      "inne"
    ],
    antecedents: [
      "Zmiana aktywności",
      "Kończenie aktywności / sprzątanie",
      "Rozpoczęcie nowego zadania / obowiązku",
      "Posiłek / oczekiwanie na posiłek",
      "Higiena / ubieranie / toaleta",
      "Odrabianie lekcji / ćwiczenie / obowiązek domowy",
      "Czekanie",
      "Ograniczenie dostępu",
      "Korekta zachowania / przypomnienie zasad",
      "Wyjście z domu / powrót do domu",
      "Sam spacer / zmiana trasy / zakończenie spaceru",
      "Wyjście do lekarza / na terapię / na zakupy / na plac zabaw",
      "Zakończenie ekranu / ulubionej aktywności",
      "Kontakt z rodzeństwem / konflikt z bliską osobą"
    ],
    expectations: [
      "Brak wymagań",
      "Nowe zadanie / obowiązek",
      "Kontynuacja zadania",
      "Wymaganie czasowe",
      "Wymaganie dotyczące przejścia / tempa / zatrzymania",
      "Współpraca z domownikami / respektowanie ustaleń",
      "inne"
    ],
    harms: [
      "uraz osoby",
      "autoagresja",
      "zniszczenie przedmiotów",
      "wybiegnięcie / oddalenie się",
      "zakłócenie funkcjonowania domu",
      "brak szkód"
    ],
    after: [
      "Przejście do spokojniejszego miejsca",
      "Interwencja fizyczna",
      "Powrót do aktywności / planu dnia",
      "Kontakt z drugim rodzicem / opiekunem",
      "Kontakt ze specjalistą / szkołą",
      "Inne"
    ],
    endedBy: [
      "Wycofanie wymagania",
      "Dostęp do przedmiotu / aktywności",
      "Dostęp do osoby",
      "Zmiana miejsca",
      "Obniżenie bodźców (cisza, przyciemnienie, mniej osób)",
      "Czas / przeczekanie bez interwencji",
      "Wyjście z sytuacji",
      "Wsparcie sensoryczne (ciężar, ucisk, ruch, chłód/ciepło)",
      "Wsparcie interoceptywne (pomoc w nazwaniu stanu: „jesteś głodny?”, „bolą cię nogi?”)",
      "Inne"
    ],
    places: ["Pokój dziecka", "Salon / wspólna przestrzeń", "Kuchnia / jadalnia", "Łazienka", "Przedpokój / przejścia", "Na zewnątrz (ogród, balkon)", "Samochód", "Inne"],
    dependencies: ["Miejsce", "Osoba dorosła", "Pora dnia", "Rodzaj aktywności", "Liczba osób", "Hałas", "Światło", "Przejścia między aktywnościami", "Zmiany planu", "Obecność rodzeństwa / gości"],
    escalationContexts: ["Koniec aktywności", "Oczekiwanie / czekanie", "Zmiana planu", "Polecenie / nowe wymaganie", "Ograniczenie dostępu (do przedmiotu, osoby, aktywności)", "Przejście do innego miejsca", "Posiłek / higiena / wyjście z domu", "Spacer / zmiana trasy / powrót ze spaceru", "Wyjście do lekarza / terapii / sklepu / na plac zabaw", "Kontakt z rodzeństwem / sytuacja wspólna", "Inne"],
    mapOptimalConditions: optimalConditionOptions,
    mapReducers: reducerOptions,
    mapEscalationReducers: escalationReducerOptions
  },
  center: {
    icon: "⌾",
    label: "Placówka całodobowa",
    header: "Narzędzie monitorowania sytuacji w placówce całodobowej",
    footer: "© 2026 Małgorzata Mikołajczyk | Powielanie do użytku placówki i rodziny wyłącznie w pełnej, niezmienionej wersji",
    incidentTitle: "KARTA MONITOROWANIA SYTUACJI - PLACÓWKA CAŁODOBOWA",
    mapTitle: "MAPA ŚRODOWISKA - PLACÓWKA CAŁODOBOWA",
    lead: "Wychowawca / osoba prowadząca",
    stayStages: ["początek pobytu po weekendzie", "środek tygodnia", "koniec tygodnia przed wyjazdem", "dzień wyjazdu do domu", "dzień powrotu z domu do ośrodka", "po dłuższej przerwie / świętach / feriach", "inne"],
    burdens: ["zmiana planu dnia", "kontakt telefoniczny / wideorozmowa z domem", "konflikt z rówieśnikami", "konflikt z dorosłym", "hałas / tłok / zwiększona liczba osób", "słaby sen / nocna pobudka", "nowe wymagania", "inne"],
    antecedents: ["Zmiana aktywności", "Kończenie aktywności / sprzątanie", "Rozpoczęcie nowego zadania / obowiązku", "Odrabianie lekcji / nauka własna", "Czynność samoobsługowa", "Wspólny posiłek / oczekiwanie na posiłek", "Czekanie", "Ograniczenie dostępu", "Korekta zachowania / przypomnienie zasad", "Powrót do pokoju / opuszczenie pokoju", "Wejście we wspólną przestrzeń / wyjście ze wspólnej przestrzeni", "Inny wychowawca niż zwykle / dyżur zastępczy", "Zmiana planu bez uprzedzenia", "Kontakt telefoniczny / wideorozmowa z domem", "Konflikt o przestrzeń, hałas, rzeczy wspólne lub zasady pokoju", "Wieczorna rutyna / cisza nocna / przygotowanie do snu"],
    expectations: ["Brak wymagań", "Nowe zadanie / obowiązek", "Kontynuacja zadania", "Wymaganie czasowe", "Wymaganie dotyczące przejścia / tempa / zatrzymania", "Współpraca z grupą / respektowanie zasad wspólnych", "inne"],
    harms: ["uraz osoby", "autoagresja", "zniszczenie przedmiotów", "opuszczenie wyznaczonego miejsca / oddalenie się", "zakłócenie funkcjonowania grupy", "brak szkód"],
    after: ["Przejście do spokojniejszego miejsca", "Interwencja fizyczna", "Powrót do aktywności / planu dnia", "Kontakt z rodzicem / opiekunem", "Kontakt z pedagogiem / psychologiem / kierownikiem", "Inne"],
    endedBy: ["Wycofanie wymagania", "Dostęp do przedmiotu / aktywności", "Dostęp do osoby", "Zmiana miejsca", "Obniżenie bodźców (cisza, przyciemnienie, mniej osób)", "Czas / przeczekanie bez interwencji", "Wyjście z sytuacji grupowej", "Kontakt z domem", "Wsparcie sensoryczne (ciężar, ucisk, ruch, chłód/ciepło)", "Wsparcie interoceptywne (pomoc w nazwaniu stanu: „jesteś głodny?”, „bolą cię nogi?”)", "Inne"],
    places: ["Pokój / przestrzeń prywatna", "Świetlica / pokój dzienny", "Stołówka / jadalnia", "Łazienka", "Korytarz / przejścia", "Miejsce nauki", "Sala terapii / gabinet", "Na zewnątrz / boisko", "Inne"],
    dependencies: ["Miejsce", "Osoba dyżurująca / wychowawca", "Pora dnia", "Rodzaj aktywności", "Liczba osób", "Hałas", "Światło", "Przejścia między aktywnościami", "Zmiany planu / dyżurów / zastępstw", "Kontakt z domem / powrót z domu", "Skład grupy / współlokator / współdzielenie pokoju"],
    escalationContexts: ["Koniec aktywności", "Oczekiwanie / czekanie", "Zmiana planu", "Polecenie / nowe wymaganie", "Ograniczenie dostępu", "Przejście do innego miejsca", "Sytuacja grupowa / współdzielenie przestrzeni", "Konflikt o rzeczy wspólne / granice / miejsce w pokoju", "Wieczorna rutyna / przygotowanie do snu / cisza nocna", "Rozmowa z domem / po powrocie z domu / po weekendzie", "Inne"],
    mapOptimalConditions: ["Cisza / minimalne bodźce słuchowe", "Mniejsza grupa lub czas poza grupą", "Stały wychowawca / znana osoba dyżurująca", "Jasny plan dnia i uprzedzenie o zmianach", "Możliwość wycofania się do bezpiecznego miejsca", "Możliwość decydowania o kolejności czynności", "Przewidywalne zasady współdzielenia przestrzeni", "Kontakt z domem w ustalonej, przewidywalnej formie", "Najedzone / napite", "Wypoczęte / po spokojnym śnie", "Komfortowa temperatura", "Bez bólu / dyskomfortu", "Inne"],
    mapReducers: ["Cisza / wyciszenie bodźców", "Wyjście z grupy do spokojniejszego miejsca", "Obecność znanego wychowawcy bez nacisku", "Kontakt z domem według ustaleń", "Ruch (spacer, boisko, sala ruchowa)", "Ciężar / ucisk / przedmiot sensoryczny", "Jedzenie / picie", "Sen / odpoczynek", "Toaleta", "Wycofanie wymagania", "Wybór / możliwość decyzji", "Informacja, ile to potrwa", "Inne"],
    mapEscalationReducers: ["Uprzedzenie o zmianie dyżuru / planu", "Plan wizualny / timer", "Wybór kolejności czynności", "Negocjacja i czas na odpowiedź", "Jasny koniec aktywności", "Brak pośpiechu / elastyczność czasowa", "Możliwość przejścia do bezpiecznego miejsca", "Obecność znanego wychowawcy", "Ustalenie zasad kontaktu z domem", "Dostęp do regulacji sensorycznej", "Inne"]
  },
  school: {
    icon: "✎",
    label: "Szkoła",
    header: "Narzędzie monitorowania sytuacji szkolnych",
    footer: "© 2026 Małgorzata Mikołajczyk | Powielanie do użytku szkolnego wyłącznie w pełnej, niezmienionej wersji",
    incidentTitle: "KARTA MONITOROWANIA SYTUACJI - SZKOŁA",
    mapTitle: "MAPA ŚRODOWISKA SZKOLNEGO",
    lead: "Osoba prowadząca",
    burdens: ["zmiana planu (zastępstwa / odwołania)", "nietypowe wydarzenie", "nowe wymagania", "inne"],
    antecedents: ["Zmiana aktywności", "Kończenie aktywności / sprzątanie", "Rozpoczęcie nowego zadania", "Zadanie wymagające wysiłku poznawczego", "Zadanie wymagające współpracy z innymi", "Czekanie", "Ograniczenie dostępu", "Korekta zachowania / przypomnienie zasad", "Przejście do innego pomieszczenia", "Zastępstwo / inny nauczyciel niż zwykle", "Zmiana planu bez uprzedzenia"],
    expectations: ["Brak wymagań", "Nowe zadanie", "Kontynuacja zadania", "Wymaganie czasowe", "Wymaganie dotyczące przejścia / tempa / zatrzymania", "inne"],
    harms: ["uraz osoby", "autoagresja", "zniszczenie przedmiotów", "brak szkód"],
    after: ["Sala wyciszeń (izolacja)", "Interwencja fizyczna", "Powrót do zajęć", "Kontakt z rodzicem / opiekunem", "Inne"],
    endedBy: ["Wycofanie wymagania", "Dostęp do przedmiotu / aktywności", "Dostęp do osoby", "Zmiana miejsca", "Obniżenie bodźców (cisza, przyciemnienie, mniej osób)", "Czas / przeczekanie bez interwencji", "Wyjście z sytuacji", "Wsparcie sensoryczne (ciężar, ucisk, ruch, chłód/ciepło)", "Wsparcie interoceptywne (pomoc w nazwaniu stanu: „jesteś głodny?”, „bolą cię nogi?”)", "Inne"],
    places: ["Sala lekcyjna", "Korytarz", "Szatnia", "Stołówka / jadalnia", "Toaleta", "Świetlica", "Sala gimnastyczna", "Plac zabaw / boisko", "Gabinet pedagoga/psychologa", "Autobus / droga do szkoły", "Inne"],
    dependencies: ["Miejsce", "Nauczyciel / osoba dorosła", "Pora dnia", "Rodzaj zajęć", "Liczba osób", "Hałas", "Światło", "Przejścia między aktywnościami / lekcjami", "Zmiany planu / zastępstwa", "Nieobecność osoby, z którą uczeń zwykle pracuje", "Sytuacja grupowa / rówieśnicy"],
    escalationContexts: ["Koniec zajęć / aktywności", "Oczekiwanie / czekanie", "Zmiana planu / zastępstwo", "Polecenie / nowe zadanie", "Ograniczenie dostępu", "Przejście do innego pomieszczenia", "Przejście między zajęciami (zmiana nauczyciela)", "Praca w grupie / kontakt z rówieśnikami", "Przerwa / korytarz / tłok", "Stołówka / posiłek", "W-F / aktywność ruchowa / przebieranie", "Sprawdzian / odpowiedź / ocena", "Wyjście ze szkoły / powrót do domu", "Inne"],
    mapOptimalConditions: ["Cisza / minimalne bodźce słuchowe", "Mniejsza grupa lub praca 1:1", "Stała, znana osoba dorosła", "Miejsce z mniejszym ruchem osób", "Jasny plan lekcji i uprzedzenie o zmianach", "Wie, ile potrwa zadanie i kiedy będzie koniec", "Może wybrać kolejność / sposób wykonania", "Może poprosić o przerwę bez zwracania uwagi grupy", "Rutyny / powtarzalność", "Najedzone / napite", "Wypoczęte / nie zmęczone", "Komfortowa temperatura", "Bez bólu / dyskomfortu", "Inne"],
    mapReducers: ["Cisza / wyciszenie bodźców", "Wyjście do spokojniejszego miejsca", "Krótka przerwa od wymagań", "Obecność zaufanej osoby dorosłej bez nacisku", "Kontakt 1:1 zamiast komunikatu przy grupie", "Ruch (spacer, sala ruchowa, boisko)", "Przedmiot sensoryczny / słuchawki / kaptur", "Jedzenie / picie", "Toaleta", "Wycofanie lub zmniejszenie wymagania", "Wybór / możliwość decyzji", "Informacja, ile to potrwa", "Inne"],
    mapEscalationReducers: ["Uprzedzenie / przygotowanie przed zmianą", "Plan wizualny / timer / lista kroków", "Wybór (kiedy, jak, w jakiej kolejności)", "Negocjacja i czas na odpowiedź", "Jasny koniec zadania lub aktywności", "Brak pośpiechu / elastyczność czasowa", "Możliwość przerwy poza grupą", "Obecność zaufanej osoby dorosłej", "Dostęp do regulacji sensorycznej", "Komunikat prywatny zamiast przy klasie", "Inne"]
  }
} satisfies Record<string, EnvironmentConfig>;

export function blankForm(env: EnvironmentConfig): SituationForm {
  return {
    meta: { date: "", time: "", place: "", initials: "", lead: "", present: "" },
    simple: {
      stateBefore: "",
      antecedents: "",
      signals: "",
      interventions: "",
      behavior: "",
      helped: "",
      notes: "",
      predictability: "",
      recoveryTime: ""
    },
    incident: {
      tension: "",
      tired: "",
      slept: "",
      sleepDetails: "",
      stayStage: "",
      stayStageLoad: "",
      burdens: [],
      burdensOther: "",
      bodyState: [],
      bodyStateOther: "",
      sensoryIntensity: [],
      sensoryIntensityOther: "",
      antecedents: [],
      factDescription: "",
      expectations: [],
      expectationOther: "",
      influence: "",
      noInfluence: "",
      predictabilityWhat: "",
      predictabilityDuration: "",
      predictabilityChoice: "",
      signalsAppeared: "",
      activationSignals: [],
      activationSignalsOther: "",
      shutdownSignals: [],
      shutdownSignalsOther: "",
      sensorySignals: [],
      sensorySignalsOther: "",
      timeToEscalation: "",
      firstSignal: "",
      maskingContinued: "",
      maskingStrategies: [],
      maskingStrategiesOther: "",
      maskingDuration: "",
      predicts: "",
      phase: "",
      interventions: [],
      interventionDetails: "",
      unconditional: "",
      usedRegulator: "",
      reducedTension: "",
      earlierWhat: "",
      behavior: "",
      intensity: "",
      harms: [],
      after: [],
      afterOther: "",
      escalationDuration: "",
      calmTime: "",
      cognitiveRecoveryTime: "",
      physicalThisWeek: "",
      physicalCount: "",
      lowerThreshold: "",
      physicalNote: "",
      helped: "",
      endedBy: [],
      endedByOther: "",
      worsened: "",
      recoverySupports: [],
      recoverySupportsOther: ""
    },
    map: {
      preferredPlaces: [],
      preferredPlacesOther: "",
      preferredReason: "",
      avoidedPlaces: [],
      avoidedPlacesOther: "",
      avoidedReason: "",
      likes: "",
      activityRoles: [],
      easiestWhen: [],
      easiestWhenOther: "",
      cooperatesWith: "",
      reducers: [],
      reducersOther: "",
      energySources: "",
      dependsOn: [],
      dependsDescription: "",
      safeBase: "",
      escalationContexts: [],
      escalationOther: "",
      escalationReducers: [],
      escalationReducersOther: "",
      noAggression: "",
      noAggressionWhere: ""
    }
  };
}
