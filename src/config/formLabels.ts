import type { LanguageCode } from "../i18n/useLanguage";
import { monitoringRevision } from "./monitoringRevision";

export const formLabelsByLanguage = {
  pl: {
    meta: {
      section: "Dane podstawowe",
      date: "Data",
      time: "Godzina",
      place: "Miejsce",
      initials: "Inicjały osoby",
      lead: "Osoba prowadząca",
      present: "Inne osoby obecne",
    },
    environments: {
      home: {
        label: "Dom",
        incidentTitle: "KARTA MONITOROWANIA SYTUACJI - DOM",
        mapTitle: "MAPA ŚRODOWISKA DOMOWEGO",
        lead: "Rodzic / opiekun prowadzący",
      },
      center: {
        label: "Placówka całodobowa",
        incidentTitle: "KARTA MONITOROWANIA SYTUACJI - PLACÓWKA CAŁODOBOWA",
        mapTitle: "MAPA ŚRODOWISKA - PLACÓWKA CAŁODOBOWA",
        lead: "Wychowawca / osoba prowadząca",
      },
      school: {
        label: "Szkoła",
        incidentTitle: "KARTA MONITOROWANIA SYTUACJI - SZKOŁA",
        mapTitle: "MAPA ŚRODOWISKA SZKOLNEGO",
        lead: "Osoba prowadząca",
      },
    },
    simple: {
      section: "Opis sytuacji",
      antecedents: "1. Co wydarzyło się tuż przed i jaki był stan osoby?",
      stateBefore: "Stan przed zdarzeniem",
      beforeLastMinutes: "Co działo się tuż przed (ostatnie 5 minut)?",
      signals:
        "2. Jakie były pierwsze sygnały napięcia i jak na nie zareagowano?",
      signalsObserved: "Sygnały",
      adultReaction: "Reakcja osoby wspierającej / otoczenia",
      behavior: monitoringRevision.pl.escalationCourse,
      helped: monitoringRevision.pl.postEscalationNeeds,
      notes: "Wpływ, autonomia i przewidywalność",
      predictability: "Czy dla",
      recoveryTime: "6. Czas do odzyskania gotowości do współpracy",
    },
    incident: {
      baselineSection: "0. Poziom bazowy i kontekst dnia",
      beforeSection: "1. Bezpośrednio przed zdarzeniem",
      expectationsSection: "2. Czego oczekiwano w tym momencie?",
      signalsSection: "3. Pierwsze oznaki narastającego napięcia",
      maskingSection: "3B. Kontynuowanie aktywności, kompensacja i możliwe maskowanie",
      actionsSection: "4. Udzielone wsparcie i warunki jego udzielenia",
      behaviorSection: "5. Opis zachowania",
      afterSection: "7. Po eskalacji",
      physicalSection: "7A. Interwencja fizyczna",
      regulationSection: "6. Czas i gotowość",
      tension: "Poziom napięcia przed zdarzeniem",
      tired: "Zmęczenie / senność",
      slept: "Sen / odpoczynek w ciągu dnia",
      sleepDetails: "O której i jak długo?",
      stayStage: "Etap tygodnia / pobytu",
      stayStageLoad: "Czy etap był obciążający?",
      burdens: "Czynniki obciążające",
      burdensOther: "Jeśli inne, wpisz jakie",
      bodyState: "Stan ciała przed zdarzeniem",
      bodyStateOther: "Jeśli inne, wpisz jakie",
      sensoryIntensity: "Intensywność bodźców w środowisku",
      sensoryIntensityOther: "Jeśli inne, wpisz jakie",
      antecedents: "Co działo się do 5 minut przed?",
      factDescription: "Doprecyzowanie tego, co było bezpośrednio przed",
      expectations: "Oczekiwania",
      expectationOther: "Jeśli inne, wpisz jakie",
      influence:
        "Jaki był zakres wpływu, autonomii i przewidywalności w tym momencie dla osoby?",
      noInfluence: "Co było nieznane, narzucone albo poza wpływem osoby?",
      predictability: "Przewidywalność sytuacji",
      predictabilityWhat: "Czy było wiadomo, co się wydarzy?",
      predictabilityDuration: "Czy było wiadomo, jak długo to potrwa?",
      predictabilityChoice: "Czy była możliwość negocjacji lub wyboru?",
      signalsAppeared: "Czy pojawiły się sygnały?",
      activationSignals: "Obserwowane zmiany ciała i ruchu",
      activationSignalsOther: "Jeśli inne, wpisz jakie",
      shutdownSignals: "Obserwowane ograniczenie kontaktu lub aktywności",
      shutdownSignalsOther: "Jeśli inne, wpisz jakie",
      sensorySignals: "Obserwowane reakcje na otoczenie",
      sensorySignalsOther: "Jeśli inne, wpisz jakie",
      timeToEscalation: "Ile czasu przed eskalacją?",
      firstSignal: "Co zwykle pojawia się najpierw?",
      maskingContinued:
        "Czy osoba próbowała kontynuować aktywność mimo narastającego napięcia?",
      maskingStrategies:
        "Jeśli tak – co pozwoliło osobie „trzymać się razem” przed eskalacją?",
      maskingStrategiesOther: "Jeśli inne, wpisz jakie",
      maskingDuration: "Ile czasu osoba „trzymała się” przed eskalacją?",
      predicts: "Czy w innych zapisach te sygnały poprzedzały opisane zachowanie?",
      phase: "Faza napięcia w momencie podjęcia działań",
      interventions: "Podjęte działania",
      interventionDetails: "Jeśli inne, wpisz jakie",
      unconditional:
        "Czy pomoc/interwencja była dostępna od razu, bez wcześniejszego uspokojenia się, wykonania polecenia lub spełnienia wymagania?",
      usedRegulator: "Czy użyto regulatora / strategii regulacyjnej?",
      reducedTension: "Czy działanie pomogło na tym etapie?",
      earlierWhat: "Co ta sytuacja pokazuje jako wskazówkę na przyszłość?",
      behavior: "Opis zachowania",
      intensity: "Intensywność zachowania",
      escalationDuration: "Czas trwania eskalacji",
      harms: "Czy doszło do",
      after: "Co wydarzyło się po zdarzeniu?",
      afterOther: "Jeśli inne, wpisz jakie",
      calmTime: "Czas do pełnego uspokojenia emocjonalnego",
      cognitiveRecoveryTime: "Czas do odzyskania dostępności poznawczej",
      physicalThisWeek: "Interwencja fizyczna w tym tygodniu?",
      physicalCount: "Ile razy?",
      lowerThreshold: "Czy osoba reagowała szybciej lub mocniej niż zwykle?",
      physicalNote: "Notatka o interwencji fizycznej",
      endedBy: "Co pomogło lub mogło pomóc zakończyć eskalację?",
      endedByOther: "Jeśli inne, wpisz jakie",
      worsened: "Co mogło NASILIĆ napięcie podczas lub po eskalacji?",
      recoverySupports: "Co pomogło lub mogło pomóc wrócić do gotowości?",
      recoverySupportsOther: "Jeśli inne, wpisz jakie",
    },
    ui: {
      brandSubtitle: "Karta zdarzenia i mapa środowiska",
      environmentNav: "Wybór środowiska",
      enableLightTheme: "Włącz jasny motyw",
      enableDarkTheme: "Włącz ciemny motyw",
      openPdfPreview: "Otwórz podgląd PDF",
      sendEmail: "Wyślij e-mail",
      downloadPdf: "Pobierz PDF",
      resetForms: "Wyczyść formularze",
      resetForm: "Wyczyść formularz",
      send: "Wyślij",
      preview: "Podgląd",
      nextStep: "Następny krok",
      previousStep: "Poprzedni krok",
      currentEnvironment: "Wypełnij formularz dla środowiska:",
      heroText:
        "Masz do wyboru wersję prostą i rozszerzoną. W wersji prostej możesz wysłać formularz e-mailem, a w wersji rozszerzonej wygenerować PDF.",
      aboutHeroTitle: "Opis formularzy monitorowania",
      aboutHeroText:
        "Jak czytać formularze, do czego służą poszczególne sekcje i jak korzystać z danych bez oceniania czy szukania winy.",
      formVersion: "Wersja formularza",
      aboutFormsView: "Opis formularzy",
      blankFormsPdf: "Puste formularze PDF",
      simpleVariant: "Prosta",
      extendedVariant: "Rozszerzona",
      extendedScope: "Zakres formularza rozszerzonego",
      incidentMode: "Karta zdarzenia",
      mapMode: "Mapa środowiska",
      localStorageNote:
        "Dane zapisują się lokalnie w tej przeglądarce. E-mail otwiera się w domyślnym programie pocztowym z gotową treścią odpowiedzi.",
      savedLocally: "Formularz zapisano lokalnie.",
      saveFailed: "Nie udało się zapisać danych lokalnie. Nie zamykaj strony; zachowaj zapis przez PDF lub wydruk. Poprzednich danych nie nadpisano, jeśli nie można było utworzyć kopii.",
      validationHeading: "Popraw przed dalszą akcją:",
      simpleIntro:
        "Krótka wersja do szybkiego zgłoszenia sytuacji. Możesz otworzyć wiadomość e-mail albo pobrać PDF i załączyć go ręcznie.",
      simpleStateHint:
        "Oddziel obserwowane oznaki, przekaz osoby, relacje innych i przypuszczenia. Zaznacz źródło O/P/R/H przy wpisie.",
      simpleStateBeforeHint:
        "Np. głód, zmęczenie, przegrzanie, ból, dużo bodźców, słaby sen, zmiana planu wcześniej w dniu.",
      simpleBeforeHint:
        "Np. polecenie, hałas, tłok, koniec aktywności, przejście, korekta zachowania.",
      simpleSignalsHint:
        "Opisuj konkretne zmiany ciała, głosu, ruchu lub kontaktu. Milczenie i ograniczenie reakcji nie rozpoznają mechanizmu.",
      simpleSignalsObservedHint:
        "Np. milczenie, napięcie ciała, szybsze mówienie, wycofanie, podniesiony głos, zatykanie uszu, ucieczka z pomieszczenia.",
      simpleAdultReactionHint:
        "Co zrobiono/powiedziano? Czy obniżono wymagania, czy je podtrzymano? Czy był wybór, czas bez wymagań lub możliwość wycofania się?",
      simpleBehaviorHint:
        "Opisz fakty: słowa, ruchy, odmowa, płacz, krzyk, wycofanie, ucieczka, rzucanie przedmiotami.",
      simpleHelpedHint:
        "Co zrobiono i jaka zmiana nastąpiła? Po czym to poznajesz lub co przekazała osoba? Możliwe: więcej lub mniej oznak napięcia / brak zauważalnej zmiany / różny przebieg / trudno ocenić.",
      simpleAutonomyHint:
        "Opisz faktyczne możliwości wyboru, negocjacji, przerwy i odmowy. Nie wyprowadzaj intencji osoby z samego zachowania.",
      decisionPossibilityFor: "Możliwość decyzji dla",
      simpleNotesHint:
        "Czy była możliwość decyzji: kiedy, jak, z kim albo w jakiej kolejności? Czy sytuacja była narzucona, nagła albo bez wyboru?",
      simpleRecoveryHint: monitoringRevision.pl.readinessHint,
      predictabilitySuffix:
        "było wiadomo, co się wydarzy i jak długo to potrwa?",
      incidentIntro:
        "Przy opisie sytuacji warto zapisać fakty, oznaki przeciążenia, warunki środowiskowe i działania poprzedzające eskalację.",
      stepperProgress: "Postęp formularza rozszerzonego",
      currentSection: "Aktualna sekcja",
      goToStep: "Przejdź do kroku",
      mapIntro:
        "Mapa opisuje miejsca, aktywności, warunki regulacji i sytuacje zwiększające ryzyko eskalacji.",
      footerBio: "Psycholog · Analityk zachowania (BCBA)",
      simpleStateQuestion: "1. Co wydarzyło się tuż przed i jaki był stan",
      simpleAutonomyQuestion: "5. Wpływ, autonomia i przewidywalność dla",
      behaviorSectionHint:
        "Zapisz słowa, ruchy i działania, bez przypisywania intencji ani mechanizmu. Oddziel zachowanie, rzeczywiste skutki i potencjalne zagrożenie.",
      afterSectionHint:
        "Opisz dalszy przebieg tego zdarzenia. Nie zakładaj, że samo ustanie zachowania oznacza dobrostan lub gotowość do aktywności.",
      physicalInterventionHint: monitoringRevision.pl.physicalHint,
      lowerThresholdFor: "Szybsza lub silniejsza reakcja niż zwykle u",
      lowerThresholdHint:
        "Np. napięcie rosło szybciej, trudniej było wrócić do równowagi albo reakcja była silniejsza niż zwykle.",
      expectationsSectionHint:
        "Oddziel oczekiwania, dostępne wybory i negocjacje od presji i warunków otrzymania pomocy.",
      influenceFor:
        "Jaki był zakres wpływu, autonomii i przewidywalności w tym momencie dla",
      influenceHint:
        "Czy znała kolejny krok, czas trwania lub zakończenie aktywności? Co mogła wybrać, zmienić albo zakończyć?",
      noInfluenceFor: "Co było nieznane dla",
      noInfluenceSuffix: "narzucone albo poza wpływem?",
      noInfluenceHint:
        "Czego osoba nie wiedziała? Co było nagłe, narzucone, nieuniknione albo bez możliwości negocjacji?",
      maskingSectionHint: monitoringRevision.pl.maskingHint,
      maskingContinuedFor:
        "Kontynuowanie aktywności mimo narastającego napięcia przez",
      maskingGroupLegend: "Strategie maskowania i czas „trzymania się”",
      maskingDurationFor: "Czas „trzymania się” przed eskalacją przez",
      baselineSectionHint:
        "Zapisz kontekst dnia i źródła informacji. Napięcie jest oceną osoby obserwującej na podstawie indywidualnych oznak, nie wynikiem diagnostycznym.",
      baselineTensionHint: "Jak wyglądał stan osoby przed zdarzeniem?",
      actionsSectionHint:
        "W jednym miejscu opisz działania przed zachowaniem, w jego trakcie i po nim oraz to, co zaobserwowano później. Podaj źródła informacji. Kolejność w czasie sama nie potwierdza przyczyny.",
      phaseHint:
        "Np. możliwa współpraca, narastające napięcie, pełna eskalacja.",
      futureCueHint:
        "Np. co warto zauważyć wcześniej następnym razem albo jakie wsparcie mogłoby pomóc wcześniej.",
      beforeSectionHint:
        "Zdarzenie bezpośrednio poprzedzające opisuj oddzielnie od wcześniejszego tła. Samo następstwo czasowe nie oznacza ustalonej przyczyny.",
      beforeChoiceHint: "Zaznacz opcje lub dopisz ważny szczegół.",
      beforeDetailsHint:
        "Dopisz fakty, których nie da się jasno zaznaczyć na liście.",
      signalsSectionHint:
        "Kategorie pomagają opisać obserwowane zmiany, nie diagnozują aktywacji, shutdown ani zamrożenia. Doprecyzuj, co było widać lub słychać.",
      regulationSectionHint:
        "Oddziel trwanie zachowania, zmniejszenie obserwowanych oznak napięcia i gotowość do wskazanej aktywności. Brak protestu nie oznacza zgody.",
      escalationRecoveryLegend: "Czas eskalacji i powrotu do dostępności",
      cognitiveRecoveryHintFor:
        "Gotowość na rozmowę, rozumienie poleceń, kontakt wzrokowy lub powrót do aktywności u",
      endedByHint:
        "To praktyczna ocena. Opisz podstawę w sekcji po zdarzeniu; możliwe: brak zmiany / trudno ocenić. Zaznaczenie działania nie dowodzi jego skuteczności.",
      worsenedHint:
        "Np. nacisk, pośpiech, hałas, dotyk, obecność dodatkowych osób, próba rozmowy, odmowa, kontynuowanie wymagań.",
      recoverySupportsHintPrefix: monitoringRevision.pl.assessmentHint,
      preferredPlacesFor: "W jakich miejscach",
      preferredPlacesSuffix: "najchętniej przebywa?",
      otherPlace: "Inne miejsce",
      otherConditions: "Inne warunki",
      other: "Inne",
      easiestWhenSuffix: "najłatwiej funkcjonuje, gdy:",
      preferredReason: "Co obserwujesz w tych miejscach i co mówi o nich osoba?",
      preferredReasonHint:
        "Np. cisza, samotność, przewidywalność, ulubione przedmioty, dostęp do bliskiej osoby, możliwość regulowania bodźców (światło, dźwięk).",
      avoidedPlacesFor: "Z jakich miejsc",
      avoidedPlacesSuffix: "unika lub wychodzi z trudem?",
      avoidedReason: "Co obserwujesz w tych miejscach i co może utrudniać sytuację?",
      avoidedReasonHint:
        "Np. hałas, tłok, brak wpływu na bodźce, nieprzewidywalność, narzucone wymagania, obecność innych osób.",
      mapActivitiesTitle: "2. Preferowane aktywności i rola",
      likesFor: "W jakie aktywności",
      likesSuffix: "najchętniej się angażuje?",
      likesHint:
        "Co osoba wybiera lub o czym mówi, że lubi? Oznacz źródło. Preferencja nie jest tym samym co wykazana funkcja wzmacniająca.",
      activityRoleFor: "Jaką rolę",
      activityRoleSuffix: "najczęściej przyjmuje w tych aktywnościach?",
      activityRoleHint:
        "Zapisz zaobserwowaną rolę i preferencję osoby oddzielnie; nie zakładaj jednej preferowanej roli na podstawie rozpoznania.",
      mapSupportTitle: "4. Co wspiera i co obniża napięcie",
      cooperatesWithSuffix: "wybiera kontakt z — jak ten kontakt przebiega?",
      cooperatesWithHint:
        "Np. mama, tata, rodzeństwo, konkretna osoba — opisz, co wyróżnia tę osobę.",
      reducersLabel: "Co OBNIŻA napięcie (reguluje w momencie dyskomfortu)?",
      energySourcesLabel:
        "Co daje energię / pomaga odbudować zasoby?",
      energySourcesHint:
        "Oddziel przekaz osoby o odpoczynku od obserwowanej zmiany i hipotezy. Lubienie aktywności nie dowodzi jej funkcji wzmacniającej ani regeneracji.",
      mapDependsTitle: "5. Czynniki zmieniające zachowanie",
      behaviorChangeLabel: "Jak zmienia się zachowanie?",
      safeBaseHint:
        "Uwzględnij komunikowane potrzeby, możliwość odmowy i obserwowane oznaki gotowości. Współpraca nie jest dowodem bezpieczeństwa, a cisza — braku obciążenia.",
      safeBaseFor: "Gdzie/z kim",
      safeBaseSuffix: "może odpocząć bez dodatkowych wymagań?",
      mapEscalationTitle: "7. Najczęstsze sytuacje eskalacji",
      escalationReducersLabel:
        "Co ZMNIEJSZA ryzyko eskalacji w tych sytuacjach?",
      escalationReducersHint:
        "Hipotezy do dalszej obserwacji, nie potwierdzone przyczyny. Porównuj podobne sytuacje bez eskalacji i liczbę okazji.",
      noAggressionWhereLabel: "Jakie to sytuacje i co je wyróżnia?",
      noAggressionWhereHint:
        "Sytuacje bez eskalacji pokazują, jakie warunki wspierają regulację. To klucz do projektowania wsparcia.",
    },
    validation: {
      requiredField: "Uzupełnij pole",
      basicInfoRequired: "Dane podstawowe: uzupełnij pole",
      simpleForm: "Formularz prosty",
      chooseAtLeastOne: "Zaznacz przynajmniej jedną opcję",
      otherRequired: "Jeśli zaznaczono „Inne”, opisz tę odpowiedź.",
      sleepDetailsRequired:
        "Skoro zaznaczono sen / odpoczynek w ciągu dnia, podaj o której i jak długo.",
      signalsTimeRequired:
        "Skoro pojawiły się sygnały, podaj ile czasu przed eskalacją.",
      physicalCountRequired:
        "Skoro zaznaczono interwencję fizyczną w tym tygodniu, podaj ile razy.",
      dependenciesRequired:
        "Skoro zaznaczono zależności, opisz na czym polega zmiana zachowania.",
      noAggressionRequired: "Skoro są sytuacje bez agresji, opisz jakie.",
      simpleHelpedRequiredSuffix: "albo wpisz, że nic nie pomogło.",
      baselineSummary:
        "Poziom bazowy i kontekst dnia: uzupełnij przynajmniej jedno pole.",
      baselineMessage: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
      beforeSummary:
        "Bezpośrednio przed zdarzeniem: zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.",
      beforeMessage:
        "Zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.",
      expectationsSummary:
        "Czego oczekiwano w tym momencie: uzupełnij oczekiwania oraz pole wpływu osoby.",
      expectationsMessage:
        "Zaznacz przynajmniej jedną opcję albo wpisz własną odpowiedź oraz uzupełnij pole wpływu osoby.",
      signalsYesSummary:
        "Pierwsze oznaki narastającego napięcia: skoro sygnały się pojawiły, wskaż jakie.",
      signalsDefaultSummary:
        "Pierwsze oznaki narastającego napięcia: uzupełnij przynajmniej jedno pole.",
      signalsYesMessage: "Skoro sygnały się pojawiły, wskaż jakie.",
      maskingSummary:
        "Strategie kompensacyjne i maskowanie: uzupełnij przynajmniej jedno pole albo przejdź dalej, jeśli nie dotyczy.",
      maskingMessage:
        "Uzupełnij przynajmniej jedno pole w tej sekcji albo przejdź dalej, jeśli nie dotyczy.",
      actionsSummary: "Działania: uzupełnij przynajmniej jedno pole.",
      behaviorSummary: "Opis zachowania: uzupełnij przynajmniej jedno pole.",
      regulationSummary:
        "Czas i gotowość: opisz trwanie zachowania, zmniejszenie oznak napięcia lub oznaki gotowości; możliwy jest brak danych.",
      regulationMessage: "Uzupełnij przynajmniej jedno pole; dopuszczalny jest brak danych.",
      afterSummary: "Po zdarzeniu: uzupełnij przynajmniej jedno pole.",
    },
    export: {
      mapSectionPlaces: "1. Miejsca i preferowane przestrzenie",
      mapSectionActivities: "2. Preferowane aktywności i rola",
      mapSectionConditions: "3. Warunki optymalnego funkcjonowania",
      mapSectionSupport: "4. Co wspiera i co obniża napięcie",
      mapSectionDepends: "5. Czynniki zmieniające zachowanie",
      mapSectionSafe: "6. Bezpieczne przestrzenie i osoby",
      mapSectionEscalation: "7. Najczęstsze sytuacje eskalacji",
      simpleAntecedentsFor:
        "1. Co wydarzyło się tuż przed i jaki był stan {subject}?",
      simpleBeforeLastMinutes: "Co działo się tuż przed (ostatnie 5 minut)?",
      simpleSignalsObserved: "Sygnały",
      simpleSupportResponse: "Reakcja osoby wspierającej / otoczenia",
      simpleBehavior: "3. Przebieg sytuacji – co można było zaobserwować?",
      simpleHelped: "4. Co pomogło (lub nie pomogło) wyregulować sytuację?",
      simpleNotesFor: "5. Wpływ, autonomia i przewidywalność dla {subject}",
      simplePredictabilityFor:
        "Czy dla {subject} było wiadomo, co się wydarzy i jak długo to potrwa?",
      simpleRecoveryTime: "6. Czas do odzyskania gotowości do współpracy",
      mapPreferredPlacesFor:
        "W jakich miejscach {subject} najchętniej przebywa?",
      mapPreferredReason: "Dlaczego te miejsca? Co je wyróżnia?",
      mapAvoidedPlacesFor:
        "Z jakich miejsc {subject} unika lub wychodzi z trudem?",
      mapAvoidedReason: "Co w tych miejscach aktywuje napięcie?",
      mapLikesFor: "W jakie aktywności {subject} najchętniej się angażuje?",
      mapActivityRoleFor:
        "Jaką rolę {subject} najczęściej przyjmuje w tych aktywnościach?",
      mapEasiestWhenFor: "{subject} najłatwiej funkcjonuje, gdy",
      mapCooperatesWithFor: "{subject} najłatwiej współpracuje z",
      mapReducers: "Co obniża napięcie?",
      mapEnergySources:
        "Co DAJE energię / motywuje do funkcjonowania mimo przeciążenia?",
      mapDependsOn: "Zachowanie zmienia się w zależności od",
      mapDependsDescription: "Opis zależności",
      mapSafeBaseFor: "Gdzie/z kim {subject} czuje się najbezpieczniej?",
      mapEscalationContexts: "Najczęstsze sytuacje eskalacji",
      mapEscalationReducers: "Co ZMNIEJSZA ryzyko eskalacji w tych sytuacjach?",
      mapNoAggression: "Czy są sytuacje bez agresji?",
      mapNoAggressionWhere: "Jakie?",
    },
    map: {
      section: "Mapa środowiska",
      places: "Miejsca i aktywności",
      preferred: "Chętnie przebywa w",
      avoided: "Unika / wychodzi z trudem z",
      likes: "Najchętniej angażuje się w",
      easiestWhen: "Najłatwiej funkcjonuje, gdy",
      cooperatesWith: "Najłatwiej współpracuje z",
      reducers: "Co obniża napięcie?",
      dependsOn: "Zachowanie zmienia się w zależności od",
      dependsDescription: "Opis zależności",
      escalationContexts: "Najczęstsze sytuacje eskalacji",
      escalationOther: "Jeśli inne, wpisz jakie",
      noAggression: "Czy są sytuacje bez agresji?",
      noAggressionWhere: "Jakie?",
      placeColumn: "Miejsce",
      timeColumn: "Czas",
      activityColumn: "Rodzaj aktywności",
    },
  },
  en: {
    meta: {
      section: "Basic information",
      date: "Date",
      time: "Time",
      place: "Place",
      initials: "Person's initials",
      lead: "Person completing the form",
      present: "Other people present",
    },
    environments: {
      home: {
        label: "Home",
        incidentTitle: "SITUATION MONITORING REPORT - HOME",
        mapTitle: "HOME ENVIRONMENT MAP",
        lead: "Parent / primary caregiver",
      },
      center: {
        label: "Residential facility",
        incidentTitle: "SITUATION MONITORING REPORT - RESIDENTIAL FACILITY",
        mapTitle: "ENVIRONMENT MAP - RESIDENTIAL FACILITY",
        lead: "Educator / person completing the form",
      },
      school: {
        label: "School",
        incidentTitle: "SITUATION MONITORING REPORT - SCHOOL",
        mapTitle: "SCHOOL ENVIRONMENT MAP",
        lead: "Person completing the form",
      },
    },
    simple: {
      section: "Situation description",
      antecedents:
        "1. What happened immediately before, and what was the person's state?",
      stateBefore: "State before the incident",
      beforeLastMinutes: "What happened immediately before (last 5 minutes)?",
      signals:
        "2. What were the first signs of tension and how did support/the environment respond?",
      signalsObserved: "Signals",
      adultReaction: "Response from the supporting person / environment",
      behavior: monitoringRevision.en.escalationCourse,
      helped: monitoringRevision.en.postEscalationNeeds,
      notes: "Influence, autonomy, and predictability",
      predictability: "Was it clear for",
      recoveryTime: "6. Time to readiness for interaction/activity",
    },
    incident: {
      baselineSection: "0. Baseline and daily context",
      beforeSection: "1. Immediately before the incident",
      expectationsSection: "2. What was expected at that moment?",
      signalsSection: "3. First signs of rising tension",
      maskingSection: "3B. Continuing activity, compensation and possible masking",
      actionsSection: "4. Support provided and conditions of access",
      behaviorSection: "5. Behavior description",
      afterSection: "7. After escalation",
      physicalSection: "7A. Physical intervention",
      regulationSection: "6. Timing and readiness",
      tension: "Tension level before the incident",
      tired: "Tiredness / sleepiness",
      slept: "Sleep / rest during the day",
      sleepDetails: "At what time and for how long?",
      stayStage: "Week / stay stage",
      stayStageLoad: "Was this stage stressful?",
      burdens: "Contributing stressors",
      burdensOther: "If other, specify",
      bodyState: "Body state before the incident",
      bodyStateOther: "If other, specify",
      sensoryIntensity: "Sensory intensity in the environment",
      sensoryIntensityOther: "If other, specify",
      antecedents: "What happened up to 5 minutes before?",
      factDescription: "Details of what happened immediately before",
      expectations: "Expectations",
      expectationOther: "If other, specify",
      influence:
        "What influence, autonomy, and predictability did the person have at that moment?",
      noInfluence:
        "What was unknown, imposed, or outside the person's influence?",
      predictability: "Situation predictability",
      predictabilityWhat: "Was it clear what would happen?",
      predictabilityDuration: "Was it clear how long it would last?",
      predictabilityChoice: "Was there room for negotiation or choice?",
      signalsAppeared: "Did signals appear?",
      activationSignals: "Observed changes in body and movement",
      activationSignalsOther: "If other, specify",
      shutdownSignals: "Observed reduction in contact or activity",
      shutdownSignalsOther: "If other, specify",
      sensorySignals: "Observed responses to surroundings",
      sensorySignalsOther: "If other, specify",
      timeToEscalation: "How long before escalation?",
      firstSignal: "What usually appears first?",
      maskingContinued:
        "Did the person try to continue the activity despite rising tension?",
      maskingStrategies:
        "If yes – what helped the person continue the activity before escalation?",
      maskingStrategiesOther: "If other, specify",
      maskingDuration:
        "How long did the person continue the activity before escalation?",
      predicts: "Did these signs precede the described behavior in other records?",
      phase: "Tension phase when actions were taken",
      interventions: "Actions taken",
      interventionDetails: "If other, specify",
      unconditional:
        "Was help/intervention available immediately, without first calming down, following an instruction, or meeting a demand?",
      usedRegulator: "Did the person use this form of support?",
      reducedTension: "Did the action help at this stage?",
      earlierWhat: "What does this situation show as a cue for the future?",
      behavior: "Behavior description",
      intensity: "Behavior intensity",
      escalationDuration: "Escalation duration",
      harms: "Did any of the following occur",
      after: "What happened after the incident?",
      afterOther: "If other, specify",
      calmTime: "Time to full emotional calming",
      cognitiveRecoveryTime: "Time to regain cognitive readiness",
      physicalThisWeek: "Physical intervention this week?",
      physicalCount: "How many times?",
      lowerThreshold:
        "Did the person react faster or more strongly than usual?",
      physicalNote: "Note about physical intervention",
      endedBy: "What helped or may have helped end the escalation?",
      endedByOther: "If other, specify",
      worsened: "What may have increased tension during or after escalation?",
      recoverySupports:
        "What helped or may have helped regain readiness?",
      recoverySupportsOther: "If other, specify",
    },
    ui: {
      brandSubtitle: "Incident report and environment map",
      environmentNav: "Environment selection",
      enableLightTheme: "Enable light theme",
      enableDarkTheme: "Enable dark theme",
      openPdfPreview: "Open PDF preview",
      sendEmail: "Send email",
      downloadPdf: "Download PDF",
      resetForms: "Clear forms",
      resetForm: "Clear form",
      send: "Send",
      preview: "Preview",
      nextStep: "Next step",
      previousStep: "Previous step",
      currentEnvironment: "Complete the form for this environment:",
      heroText:
        "You can choose the simple or extended version. In the simple version you can send the form by email; in the extended version you can generate a PDF.",
      aboutHeroTitle: "Monitoring form description",
      aboutHeroText:
        "How to read the forms, what each section is for, and how to use the data without judging or looking for someone to blame.",
      formVersion: "Form version",
      aboutFormsView: "Form description",
      blankFormsPdf: "Blank forms PDF",
      simpleVariant: "Simple",
      extendedVariant: "Extended",
      extendedScope: "Extended form scope",
      incidentMode: "Incident report",
      mapMode: "Environment map",
      localStorageNote:
        "Data is stored locally in this browser. Email opens in your default email app with prepared response content.",
      savedLocally: "Form saved locally.",
      saveFailed: "Local saving failed. Keep this page open and save a PDF or print the record. Previous data was not overwritten if a backup could not be created.",
      validationHeading: "Please correct before continuing:",
      simpleIntro:
        "A short version for quickly reporting a situation. You can open an email or download a PDF and attach it manually.",
      simpleStateHint:
        "Separate observed signs, the person's communication, others' reports and hypotheses. Mark O/P/R/H next to each piece of information.",
      simpleStateBeforeHint:
        "E.g. hunger, tiredness, overheating, pain, many stimuli, poor sleep, earlier change of plan.",
      simpleBeforeHint:
        "E.g. instruction, noise, crowding, end of activity, transition, behavior correction.",
      simpleSignalsHint:
        "Describe concrete changes in body, voice, movement or contact. Silence or reduced response does not establish a mechanism.",
      simpleSignalsObservedHint:
        "E.g. silence, body tension, faster speech, withdrawal, raised voice, covering ears, leaving the room.",
      simpleAdultReactionHint:
        "What was done/said? Were demands reduced or maintained? Was there choice, time without demands, or an option to withdraw?",
      simpleBehaviorHint:
        "Describe facts: words, movements, refusal, crying, screaming, withdrawal, running away, throwing objects.",
      simpleHelpedHint:
        "What was done and what changed? Give observed signs or the person's communication. More or fewer signs, no noticeable change, mixed course and unable to assess are possible.",
      simpleAutonomyHint:
        "Describe actual opportunities for choice, negotiation, breaks and refusal. Behavior alone does not establish intention.",
      decisionPossibilityFor: "Choice available to",
      simpleNotesHint:
        "Was there a choice about when, how, with whom, or in what order? Was the situation imposed, sudden, or without choice?",
      simpleRecoveryHint: monitoringRevision.en.readinessHint,
      predictabilitySuffix: "what would happen and how long it would last?",
      incidentIntro:
        "When describing the situation, record facts, signs of overload, environmental conditions, and actions preceding escalation.",
      stepperProgress: "Extended form progress",
      currentSection: "Current section",
      goToStep: "Go to step",
      mapIntro:
        "The map describes places, activities, regulation conditions, and situations that increase escalation risk.",
      footerBio: "Psychologist · Behavior Analyst (BCBA)",
      simpleStateQuestion:
        "1. What happened immediately before, and what was the state of",
      simpleAutonomyQuestion: "5. Influence, autonomy, and predictability for",
      behaviorSectionHint:
        "Describe words, movements and actions without inferring intention or mechanism. Separate behavior, actual consequences and potential risk.",
      afterSectionHint:
        "Record what followed this event. Behavior stopping does not itself establish wellbeing or readiness for activity.",
      physicalInterventionHint: monitoringRevision.en.physicalHint,
      lowerThresholdFor: "Faster or stronger reaction than usual in",
      lowerThresholdHint:
        "E.g. tension rose faster, returning to balance was harder, or the reaction was stronger than usual.",
      expectationsSectionHint:
        "Separate expectations, available choice and negotiation from pressure and conditions for receiving support.",
      influenceFor:
        "What influence, autonomy, and predictability were available at that moment for",
      influenceHint:
        "Did they know the next step, duration, or end of the activity? What could they choose, change, or stop?",
      noInfluenceFor: "What was unknown to",
      noInfluenceSuffix: "imposed, or outside their influence?",
      noInfluenceHint:
        "What did they not know? What was sudden, imposed, unavoidable, or without an option to negotiate?",
      maskingSectionHint: monitoringRevision.en.maskingHint,
      maskingContinuedFor: "Continuing activity despite rising tension by",
      maskingGroupLegend: "Masking strategies and time continuing the activity",
      maskingDurationFor: "Time continuing the activity before escalation by",
      baselineSectionHint:
        "Record the day's context and information sources. Tension is observer judgement based on individual signs, not a diagnostic score.",
      baselineTensionHint: "What was the person’s state before the incident?",
      actionsSectionHint:
        "Use this one block for actions before, during and after the behavior and for subsequent observations. Identify the sources of information. Temporal sequence alone does not establish cause.",
      phaseHint: "E.g. interaction possible, rising tension, full escalation.",
      futureCueHint:
        "E.g. what is worth noticing earlier next time or what support could help earlier.",
      beforeSectionHint:
        "Separate the immediately preceding event from earlier context. Temporal sequence does not establish a cause.",
      beforeChoiceHint: "Select options or add an important detail.",
      beforeDetailsHint:
        "Add facts that cannot be clearly selected from the list.",
      signalsSectionHint:
        "These categories describe observed changes, not diagnoses of activation, shutdown or freezing. Specify what was seen or heard.",
      regulationSectionHint:
        "Separate behavior duration, reduction in observed signs of tension and readiness for a specified activity. No protest does not mean consent.",
      escalationRecoveryLegend: "Escalation time and return to readiness",
      cognitiveRecoveryHintFor:
        "Readiness for conversation, understanding instructions, eye contact, or return to activity in",
      endedByHint:
        "A practical judgement. Give its basis after the event; no change / uncertain are possible. Selecting an action does not prove efficacy.",
      worsenedHint:
        "E.g. pressure, hurry, noise, touch, additional people present, trying to talk, refusal, continuing demands.",
      recoverySupportsHintPrefix: monitoringRevision.en.assessmentHint,
      preferredPlacesFor: "In which places does",
      preferredPlacesSuffix: "prefer staying?",
      otherPlace: "Other place",
      otherConditions: "Other conditions",
      other: "Other",
      easiestWhenSuffix: "does best when:",
      preferredReason: "What do you observe in these places and what does the person say about them?",
      preferredReasonHint:
        "E.g. silence, being alone, predictability, favorite objects, access to a close person, ability to regulate stimuli (light, sound).",
      avoidedPlacesFor: "Which places does",
      avoidedPlacesSuffix: "avoid or have difficulty leaving?",
      avoidedReason: "What do you observe in these places and what might make them difficult?",
      avoidedReasonHint:
        "E.g. noise, crowding, lack of influence over stimuli, unpredictability, imposed demands, presence of other people.",
      mapActivitiesTitle: "2. Preferred activities and role",
      likesFor: "Which activities does",
      likesSuffix: "prefer to engage in?",
      likesHint:
        "What does the person choose or say they like? Mark the source. Preference is not the same as a demonstrated reinforcing function.",
      activityRoleFor: "What role does",
      activityRoleSuffix: "most often take in these activities?",
      activityRoleHint:
        "Record observed role and the person's preference separately; do not infer a preferred role from a diagnosis.",
      mapSupportTitle: "4. What supports and lowers tension",
      cooperatesWithSuffix: "chooses contact with — what happens during contact?",
      cooperatesWithHint:
        "E.g. parent, sibling, or a specific person — describe what makes that person supportive.",
      reducersLabel: "What helps reduce tension?",
      energySourcesLabel:
        "What gives energy / helps restore resources?",
      energySourcesHint:
        "Separate the person's account of rest, observed changes and hypotheses. Liking an activity does not demonstrate reinforcement or recovery.",
      mapDependsTitle: "5. Factors changing behavior",
      behaviorChangeLabel: "How does behavior change?",
      safeBaseHint:
        "Consider communicated needs, opportunities to refuse and observed readiness. Cooperation does not demonstrate safety; silence does not mean no burden.",
      safeBaseFor: "Where/with whom does",
      safeBaseSuffix: "rest without additional demands?",
      mapEscalationTitle: "7. Most common escalation situations",
      escalationReducersLabel:
        "What reduces escalation risk in these situations?",
      escalationReducersHint:
        "Hypotheses for further observation, not established causes. Compare similar situations without escalation and numbers of opportunities.",
      noAggressionWhereLabel:
        "Which situations are these and what makes them distinctive?",
      noAggressionWhereHint:
        "Situations without escalation show what conditions support regulation. This is key for designing support.",
    },
    validation: {
      requiredField: "Complete the field",
      basicInfoRequired: "Basic information: complete field",
      simpleForm: "Simple form",
      chooseAtLeastOne: "Select at least one option",
      otherRequired: "If “Other” is selected, describe this answer.",
      sleepDetailsRequired:
        "Since sleep / rest during the day was selected, provide the time and duration.",
      signalsTimeRequired:
        "Since signals appeared, provide how long before escalation.",
      physicalCountRequired:
        "Since physical intervention this week was selected, provide how many times.",
      dependenciesRequired:
        "Since dependencies were selected, describe how behavior changes.",
      noAggressionRequired:
        "Since there are situations without aggression, describe which ones.",
      simpleHelpedRequiredSuffix: "or state that nothing helped.",
      baselineSummary:
        "Baseline and daily context: complete at least one field.",
      baselineMessage: "Complete at least one field in this section.",
      beforeSummary:
        "Immediately before the incident: select at least one option or enter a situation description.",
      beforeMessage:
        "Select at least one option or enter a situation description.",
      expectationsSummary:
        "What was expected at that moment: complete expectations and the influence/predictability field.",
      expectationsMessage:
        "Select at least one option or enter your own answer and complete the influence/predictability field.",
      signalsYesSummary:
        "First signs of rising tension: since signals appeared, indicate which ones.",
      signalsDefaultSummary:
        "First signs of rising tension: complete at least one field.",
      signalsYesMessage: "Since signals appeared, indicate which ones.",
      maskingSummary:
        "Compensatory strategies and masking: complete at least one field or continue if not applicable.",
      maskingMessage:
        "Complete at least one field in this section or continue if not applicable.",
      actionsSummary: "Actions: complete at least one field.",
      behaviorSummary: "Behavior description: complete at least one field.",
      regulationSummary:
        "Timing and readiness: record behavior duration, reduced signs of tension or signs of readiness; missing data is possible.",
      regulationMessage: "Complete at least one field; missing data is a valid answer.",
      afterSummary: "After the incident: complete at least one field.",
    },
    export: {
      mapSectionPlaces: "1. Places and preferred spaces",
      mapSectionActivities: "2. Preferred activities and role",
      mapSectionConditions: "3. Conditions for doing well",
      mapSectionSupport: "4. What supports and helps reduce tension",
      mapSectionDepends: "5. Factors changing behavior",
      mapSectionSafe: "6. Safe spaces and people",
      mapSectionEscalation: "7. Most common escalation situations",
      simpleAntecedentsFor:
        "1. What happened immediately before, and what was the state of {subject}?",
      simpleBeforeLastMinutes:
        "What happened immediately before (last 5 minutes)?",
      simpleSignalsObserved: "Signals",
      simpleSupportResponse:
        "Response from the supporting person / environment",
      simpleBehavior: "3. What happened – what could be observed?",
      simpleHelped: "4. What helped (or did not help) regulate the situation?",
      simpleNotesFor:
        "5. Influence, autonomy, and predictability for {subject}",
      simplePredictabilityFor:
        "Was it clear for {subject} what would happen and how long it would last?",
      simpleRecoveryTime: "6. Time to readiness for interaction/activity",
      mapPreferredPlacesFor: "Where does {subject} prefer staying?",
      mapPreferredReason: "Why these places? What makes them distinctive?",
      mapAvoidedPlacesFor:
        "Which places does {subject} avoid or find hard to leave?",
      mapAvoidedReason: "What activates tension in these places?",
      mapLikesFor: "Which activities does {subject} prefer to engage in?",
      mapActivityRoleFor:
        "What role does {subject} most often take in these activities?",
      mapEasiestWhenFor: "{subject} does best when",
      mapCooperatesWithFor: "{subject} cooperates best with",
      mapReducers: "What helps reduce tension?",
      mapEnergySources:
        "What gives energy / supports activity despite overload?",
      mapDependsOn: "Behavior changes depending on",
      mapDependsDescription: "Description of what changes",
      mapSafeBaseFor: "Where/with whom does {subject} feel safest?",
      mapEscalationContexts: "Most common escalation situations",
      mapEscalationReducers:
        "What reduces escalation risk in these situations?",
      mapNoAggression: "Are there situations without aggression?",
      mapNoAggressionWhere: "Which ones?",
    },
    map: {
      section: "Environment map",
      places: "Places and activities",
      preferred: "Prefers staying in",
      avoided: "Avoids or finds it hard to leave",
      likes: "Most willingly engages in",
      easiestWhen: "Does best when",
      cooperatesWith: "Cooperates best with",
      reducers: "What helps reduce tension?",
      dependsOn: "Behavior changes depending on",
      dependsDescription: "Description of what changes",
      escalationContexts: "Most common escalation situations",
      escalationOther: "If other, specify",
      noAggression: "Are there situations without aggression?",
      noAggressionWhere: "Which ones?",
      placeColumn: "Place",
      timeColumn: "Time",
      activityColumn: "Activity type",
    },
  },
} as const;

export type FormLabels = (typeof formLabelsByLanguage)[LanguageCode];

export const formLabels: FormLabels = formLabelsByLanguage.pl;

export function getFormLabels(language: LanguageCode): FormLabels {
  return formLabelsByLanguage[language] ?? formLabelsByLanguage.pl;
}
