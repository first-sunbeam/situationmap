export const bodyStateOptions = ["głód", "pragnienie", "ból/dyskomfort", "zmęczenie fizyczne", "temperatura ciała (zimno/gorąco)", "napięcie mięśniowe", "inne"];
export const sensoryIntensityOptions = ["hałas/dźwięki", "światło", "tłok/liczba osób", "zapachy", "tekstury/dotyk", "inne"];
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
    person: "dziecka / nastolatka",
    personShort: "dziecko / nastolatek",
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
    interventions: [
      "Rozmowa",
      "Przypomnienie zasad",
      "Przesunięcie w czasie",
      "Zmiana aktywności",
      "Obniżenie wymagań / wycofanie wymagania",
      "Zaangażowanie innego dorosłego",
      "Zaproponowanie czegoś pomagającego się uspokoić",
      "Dziecko samo poprosiło o coś pomagającego się uspokoić",
      "Wyjście do spokojniejszego miejsca",
      "Brak interwencji",
      "Inne"
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
    places: ["Pokój", "Salon / wspólna przestrzeń", "Kuchnia / jadalnia", "Łazienka", "Przedpokój / przejścia", "Na zewnątrz", "Samochód", "Inne"],
    dependencies: ["miejsca", "osoby dorosłej", "pory dnia", "rodzaju aktywności", "liczby osób", "hałasu", "światła", "przejść między aktywnościami", "zmian planu", "obecności rodzeństwa / gości"],
    escalationContexts: ["Koniec aktywności", "Oczekiwanie", "Zmiana planu", "Polecenie", "Ograniczenie dostępu", "Przejście do innego miejsca", "Posiłek / higiena / wyjście z domu", "Spacer / zmiana trasy / powrót ze spaceru", "Wyjście do lekarza / terapii / sklepu / na plac zabaw", "Kontakt z rodzeństwem / sytuacja wspólna", "Inne"]
  },
  center: {
    icon: "⌾",
    label: "Placówka całodobowa",
    header: "Narzędzie monitorowania sytuacji w placówce całodobowej",
    footer: "© 2026 Małgorzata Mikołajczyk | Powielanie do użytku placówki i rodziny wyłącznie w pełnej, niezmienionej wersji",
    incidentTitle: "KARTA MONITOROWANIA SYTUACJI - PLACÓWKA CAŁODOBOWA",
    mapTitle: "MAPA ŚRODOWISKA - PLACÓWKA CAŁODOBOWA",
    person: "wychowanka",
    personShort: "wychowanek",
    lead: "Wychowawca / osoba prowadząca",
    stayStages: ["początek pobytu po weekendzie", "środek tygodnia", "koniec tygodnia przed wyjazdem", "dzień wyjazdu do domu", "dzień powrotu z domu do ośrodka", "po dłuższej przerwie / świętach / feriach", "inne"],
    burdens: ["zmiana planu dnia", "kontakt telefoniczny / wideorozmowa z domem", "konflikt z rówieśnikami", "konflikt z dorosłym", "hałas / tłok / zwiększona liczba osób", "słaby sen / nocna pobudka", "nowe wymagania", "inne"],
    antecedents: ["Zmiana aktywności", "Kończenie aktywności / sprzątanie", "Rozpoczęcie nowego zadania / obowiązku", "Odrabianie lekcji / nauka własna", "Czynność samoobsługowa", "Wspólny posiłek / oczekiwanie na posiłek", "Czekanie", "Ograniczenie dostępu", "Korekta zachowania / przypomnienie zasad", "Powrót do pokoju / opuszczenie pokoju", "Wejście we wspólną przestrzeń / wyjście ze wspólnej przestrzeni", "Inny wychowawca niż zwykle / dyżur zastępczy", "Zmiana planu bez uprzedzenia", "Kontakt telefoniczny / wideorozmowa z domem", "Konflikt o przestrzeń, hałas, rzeczy wspólne lub zasady pokoju", "Wieczorna rutyna / cisza nocna / przygotowanie do snu"],
    expectations: ["Brak wymagań", "Nowe zadanie / obowiązek", "Kontynuacja zadania", "Wymaganie czasowe", "Wymaganie dotyczące przejścia / tempa / zatrzymania", "Współpraca z grupą / respektowanie zasad wspólnych", "inne"],
    interventions: ["Rozmowa", "Przypomnienie zasad", "Przesunięcie w czasie", "Zmiana aktywności", "Obniżenie wymagań / wycofanie wymagania", "Zaangażowanie innego wychowawcy / pedagoga", "Zaproponowanie czegoś pomagającego się uspokoić", "Wychowanek sam poprosił o coś pomagającego się uspokoić", "Wyjście do spokojniejszego miejsca", "Brak interwencji", "Inne"],
    harms: ["uraz osoby", "autoagresja", "zniszczenie przedmiotów", "opuszczenie wyznaczonego miejsca / oddalenie się", "zakłócenie funkcjonowania grupy", "brak szkód"],
    after: ["Przejście do spokojniejszego miejsca", "Interwencja fizyczna", "Powrót do aktywności / planu dnia", "Kontakt z rodzicem / opiekunem", "Kontakt z pedagogiem / psychologiem / kierownikiem", "Inne"],
    endedBy: ["Wycofanie wymagania", "Dostęp do przedmiotu / aktywności", "Dostęp do osoby", "Zmiana miejsca", "Obniżenie bodźców (cisza, przyciemnienie, mniej osób)", "Czas / przeczekanie bez interwencji", "Wyjście z sytuacji grupowej", "Kontakt z domem", "Wsparcie sensoryczne (ciężar, ucisk, ruch, chłód/ciepło)", "Wsparcie interoceptywne (pomoc w nazwaniu stanu: „jesteś głodny?”, „bolą cię nogi?”)", "Inne"],
    places: ["Pokój", "Świetlica / pokój dzienny", "Stołówka / jadalnia", "Łazienka", "Korytarz", "Miejsce nauki", "Na zewnątrz / boisko", "Inne"],
    dependencies: ["miejsca", "osoby dorosłej", "pory dnia", "rodzaju aktywności", "liczby osób", "hałasu", "światła", "przejść między aktywnościami", "zmian planu / dyżurów / zastępstw", "kontaktu z domem / powrotu z domu", "składu grupy / współlokatora / współdzielenia pokoju"],
    escalationContexts: ["Koniec aktywności", "Oczekiwanie", "Zmiana planu", "Polecenie", "Ograniczenie dostępu", "Przejście do innego miejsca", "Sytuacja grupowa / współdzielenie przestrzeni", "Konflikt o rzeczy wspólne / granice / miejsce w pokoju", "Wieczorna rutyna / przygotowanie do snu / cisza nocna", "Rozmowa z domem / po powrocie z domu / po weekendzie", "Inne"]
  },
  school: {
    icon: "✎",
    label: "Szkoła",
    header: "Narzędzie monitorowania sytuacji szkolnych",
    footer: "© 2026 Małgorzata Mikołajczyk | Powielanie do użytku szkolnego wyłącznie w pełnej, niezmienionej wersji",
    incidentTitle: "KARTA MONITOROWANIA SYTUACJI - SZKOŁA",
    mapTitle: "MAPA ŚRODOWISKA SZKOLNEGO",
    person: "ucznia",
    personShort: "uczeń",
    lead: "Osoba prowadząca",
    burdens: ["zmiana planu (zastępstwa / odwołania)", "nietypowe wydarzenie", "nowe wymagania", "inne"],
    antecedents: ["Zmiana aktywności", "Kończenie aktywności / sprzątanie", "Rozpoczęcie nowego zadania", "Zadanie wymagające wysiłku poznawczego", "Zadanie wymagające współpracy z innymi", "Czekanie", "Ograniczenie dostępu", "Korekta zachowania / przypomnienie zasad", "Przejście do innego pomieszczenia", "Zastępstwo / inny nauczyciel niż zwykle", "Zmiana planu bez uprzedzenia"],
    expectations: ["Brak wymagań", "Nowe zadanie", "Kontynuacja zadania", "Wymaganie czasowe", "Wymaganie dotyczące przejścia / tempa / zatrzymania", "inne"],
    interventions: ["Rozmowa", "Przypomnienie zasad", "Przesunięcie w czasie", "Zmiana aktywności", "Obniżenie wymagań / wycofanie wymagania", "Zaangażowanie innego nauczyciela / pedagoga", "Zaproponowanie czegoś pomagającego się uspokoić", "Uczeń sam poprosił o coś pomagającego się uspokoić", "Brak interwencji", "Inne"],
    harms: ["uraz osoby", "autoagresja", "zniszczenie przedmiotów", "brak szkód"],
    after: ["Sala wyciszeń (izolacja)", "Interwencja fizyczna", "Powrót do zajęć", "Kontakt z rodzicem / opiekunem", "Inne"],
    endedBy: ["Wycofanie wymagania", "Dostęp do przedmiotu / aktywności", "Dostęp do osoby", "Zmiana miejsca", "Obniżenie bodźców (cisza, przyciemnienie, mniej osób)", "Czas / przeczekanie bez interwencji", "Wyjście z sytuacji", "Wsparcie sensoryczne (ciężar, ucisk, ruch, chłód/ciepło)", "Wsparcie interoceptywne (pomoc w nazwaniu stanu: „jesteś głodny?”, „bolą cię nogi?”)", "Inne"],
    places: ["Sala lekcyjna", "Świetlica", "Sala SI", "Kuchnia", "Korytarz", "Toaleta", "Inne"],
    dependencies: ["miejsca", "osoby dorosłej", "pory dnia", "rodzaju zajęć", "liczby osób", "hałasu", "światła", "przejść między aktywnościami", "zmian planu / zastępstw", "nieobecności nauczyciela, z którym uczeń zwykle pracuje"],
    escalationContexts: ["Koniec zajęć", "Oczekiwanie", "Zmiana planu", "Polecenie", "Ograniczenie dostępu", "Przejście do innego pomieszczenia", "Przejście między zajęciami (zmiana nauczyciela)", "Inne"]
  }
} satisfies Record<string, EnvironmentConfig>;

export function blankForm(env: EnvironmentConfig): SituationForm {
  return {
    meta: { date: "", time: "", place: "", initials: "", lead: "", present: "" },
    simple: {
      antecedents: "",
      signals: "",
      behavior: "",
      helped: "",
      notes: "",
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
      rows: env.places.map((place) => ({ place, time: "", activity: "" })),
      preferred: "",
      avoided: "",
      likes: "",
      easiestWhen: "",
      cooperatesWith: "",
      reducers: "",
      dependsOn: [],
      dependsDescription: "",
      escalationContexts: [],
      escalationOther: "",
      noAggression: "",
      noAggressionWhere: ""
    }
  };
}
