export const commonSignals = [
  "milczenie",
  "sztywność ciała",
  "zmiana tonu głosu",
  "brak kontaktu wzrokowego",
  "powtarzanie fraz",
  "zastygnięcie w bezruchu",
  "brak reakcji na polecenia",
  "patrzenie w jeden punkt / w podłogę",
  "spowolnione ruchy",
  "wzrost pobudzenia / nakręcenie",
  "wyrywanie się / gotowość do ucieczki",
  "trudność w nawiązaniu kontaktu",
  "protest słowny / odmawianie",
  "podniesiony głos / głośniejsze mówienie",
  "powtarzanie pytań / domaganie się odpowiedzi",
  "chodzenie / kręcenie się / niepokój ruchowy",
  "płacz / marudzenie / drażliwość",
  "kłócenie się / negocjowanie",
  "napięcie przy zmianie / odmowie",
  "inne"
];

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
export const calmTime = ["< 5 min", "5-15 min", "> 15 min", "nie osiągnięto"];

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
      "wycofanie wymagania",
      "dostęp do przedmiotu / aktywności",
      "dostęp do osoby",
      "zmiana miejsca",
      "obniżenie bodźców",
      "czas / przeczekanie",
      "wyjście z sytuacji",
      "inne"
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
    endedBy: ["wycofanie wymagania", "dostęp do przedmiotu / aktywności", "dostęp do osoby", "zmiana miejsca", "obniżenie bodźców", "czas / przeczekanie", "wyjście z sytuacji grupowej", "kontakt z domem", "inne"],
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
    endedBy: ["wycofanie wymagania", "dostęp do przedmiotu / aktywności", "dostęp do osoby", "zmiana miejsca", "obniżenie bodźców", "czas / przeczekanie", "wyjście z sytuacji", "inne"],
    places: ["Sala lekcyjna", "Świetlica", "Sala SI", "Kuchnia", "Korytarz", "Toaleta", "Inne"],
    dependencies: ["miejsca", "osoby dorosłej", "pory dnia", "rodzaju zajęć", "liczby osób", "hałasu", "światła", "przejść między aktywnościami", "zmian planu / zastępstw", "nieobecności nauczyciela, z którym uczeń zwykle pracuje"],
    escalationContexts: ["Koniec zajęć", "Oczekiwanie", "Zmiana planu", "Polecenie", "Ograniczenie dostępu", "Przejście do innego pomieszczenia", "Przejście między zajęciami (zmiana nauczyciela)", "Inne"]
  }
} satisfies Record<string, EnvironmentConfig>;

export function blankForm(env: EnvironmentConfig): SituationForm {
  return {
    meta: { date: "", time: "", place: "", lead: "", present: "" },
    simple: {
      antecedents: "",
      signals: "",
      interventions: "",
      behavior: "",
      helped: "",
      notes: ""
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
      antecedents: [],
      factDescription: "",
      expectations: [],
      expectationOther: "",
      influence: "",
      signalsAppeared: "",
      signals: [],
      signalsOther: "",
      timeToEscalation: "",
      firstSignal: "",
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
      physicalThisWeek: "",
      physicalCount: "",
      lowerThreshold: "",
      physicalNote: "",
      helped: "",
      endedBy: [],
      endedByOther: "",
      worsened: "",
      regulators: "",
      rewards: ""
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
