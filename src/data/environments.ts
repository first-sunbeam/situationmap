export const bodyStateOptions = ["glod", "pragnienie", "potrzeba_toalety", "bol_dyskomfort", "zmeczenie_fizyczne", "temperatura_ciala_zimno_goraco", "napiecie_miesniowe", "other"] as const;
export const sensoryIntensityOptions = ["halas_dzwieki", "swiatlo", "tlok_liczba_osob", "zapachy", "tekstury_dotyk", "temperatura_pomieszczenia", "other"] as const;
export const activationSignalOptions = ["przyspieszone_oddychanie", "napiecie_miesniowe", "pot", "drzenie", "rozszerzone_zrenice", "ucieczka_walka", "other"] as const;
export const shutdownSignalOptions = ["patrzenie_w_jeden_punkt_podloge", "brak_reakcji_na_glos", "spowolnienie_ruchow", "opadniecie_ciala", "wycofanie", "other"] as const;
export const sensorySignalOptions = ["zatykanie_uszu", "zaslanianie_oczu", "stereotypie", "unikanie_dotyku", "ucieczka_z_pomieszczenia", "other"] as const;
export const interventionTypeOptions = [
  "obnizenie_bodzcow_sensorycznych_wyciszenie_przyciemnienie_zmniejszenie_liczby_os",
  "zwiekszenie_autonomii_zaproponowanie_wyboru_mozliwosc_decyzji",
  "zapewnienie_przewidywalnosci_poinformowanie_ile_to_potrwa_pokazanie_planu",
  "wsparcie_interoceptywne_pomoc_w_nazwaniu_stanu_ciala_jestes_glodny_zimno_ci",
  "czas_bez_wymagan_pauza_od_oczekiwan_mozliwosc_wycofania_sie",
  "regulacja_sensoryczna_bodzce_uspokajajace_ciezar_ruch_ucisk",
  "other"
];
export const maskingStrategyOptions = [
  "maskowanie_ukrywanie_dyskomfortu_udawanie_ze_wszystko_ok",
  "strategia_kompensacyjna_wycofanie_w_fantazje_kontrolowanie_rozmowy_humor",
  "wsparcie_osoby_towarzyszacej_obecnosc_spokojny_komunikat_bez_presji",
  "jasny_koniec_aktywnosci_wiedza_ze_to_sie_skonczy_np_jeszcze_5_minut",
  "lek_przed_konsekwencjami_strach_przed_ocena_kara_rozczarowaniem",
  "silna_motywacja_wewnetrzna_bardzo_chcialo_dokonczyc",
  "other"
];
export const recoverySupportOptions = [
  "cisza_i_brak_bodzcow",
  "sen_drzemka",
  "jedzenie_picie",
  "aktywnosc_sensoryczna_hustawka_spacer_zimny_prysznic",
  "obecnosc_bliskiej_osoby_bez_wymagan",
  "samotnosc",
  "ulubiona_aktywnosc_bez_presji",
  "czas_po_prostu_przeczekanie",
  "other"
];
export const maskingDurationOptions = ["kilka_minut", "10_30_minut", "ponad_30_minut", "caly_dzien_eskalacja_wieczorem_w_domu"] as const;
export const cognitiveRecoveryOptions = ["od_razu_po_uspokojeniu", "10_30_minut_po", "1_2_godziny_po", "kilka_godzin_lub_nastepnego_dnia"] as const;
export const homePlaceOptions = ["pokoj_dziecka", "salon_wspolna_przestrzen", "kuchnia_jadalnia", "lazienka", "przedpokoj_przejscia", "na_zewnatrz_ogrod_balkon", "samochod", "other"] as const;
export const activityRoleOptions = ["prowadzacy_kontrolujacy_decyduje_o_zasadach_przebiegu", "uczestnik_wspolpracujacy_rowny_partner", "obserwator_towarzyszacy_obecnosc_bez_aktywnego_udzialu", "sam_bez_interakcji_z_innymi"] as const;
export const optimalConditionOptions = ["cisza_minimalne_bodzce_sluchowe", "przyciemnione_naturalne_swiatlo", "spokojne_otoczenie_mala_liczba_osob", "mozliwosc_kontrolowania_bodzcow", "samotnosc_czas_bez_wymagan_spolecznych", "obecnosc_bliskiej_osoby_bez_wymagan_2", "interakcja_1_1_nie_grupa", "kontakt_bez_bezposredniej_komunikacji_rownolegla_aktywnosc", "ma_wplyw_na_przebieg_aktywnosci_kiedy_jak_z_kim", "wie_co_sie_wydarzy_i_jak_dlugo_to_potrwa", "moze_negocjowac_lub_wybierac", "rutyny_powtarzalnosc", "najedzone_napite", "wypoczete_nie_zmeczone", "komfortowa_temperatura", "bez_bolu_dyskomfortu", "other"] as const;
export const reducerOptions = ["cisza_wyciszenie_bodzcow", "ruch_hustawka_trampolina_spacer", "ciezar_ucisk_koc_przytulenie_sciskanie", "chlod_lub_cieplo_zimny_prysznic_ciepla_kapiel", "stereotypie_bujanie_krecenie_podskakiwanie", "jedzenie_picie", "sen_drzemka", "toaleta", "obecnosc_bliskiej_osoby_bez_wymagan_2", "samotnosc_wycofanie_sie", "kontakt_fizyczny_przytulenie", "dystans_przestrzen_osobista", "wycofanie_wymagania", "dostep_do_ulubionej_aktywnosci", "wybor_mozliwosc_decyzji", "informacja_ile_to_potrwa", "other"] as const;
export const escalationReducerOptions = ["ostrzezenie_przygotowanie_za_5_minut_konczymy", "wizualizacja_timer_plan", "wybor_kiedy_jak_w_jakiej_kolejnosci", "negocjacja_mozliwosc_omowienia_co_sie_wydarzy", "jasny_koniec_konkretna_informacja_ile_potrwa", "brak_pospiechu_elastycznosc_czasowa", "obecnosc_bliskiej_osoby", "dostep_do_regulacji_sensorycznej_np_przedmiot_ruch", "other"] as const;

export const yesNoUnknown = ["yes", "no", "not_sure"] as const;
export const yesNoPartial = ["yes", "no", "partially"] as const;
export const tensionLevels = ["0_niski_stabilny", "1_podwyzszony", "2_wysoki", "3_bardzo_wysoki"] as const;
export const regulationPhase = [
  "zielona_mozliwa_rozmowa_i_wspolpraca",
  "zolta_narastajace_napiecie",
  "czerwona_pelna_eskalacja_brak_kontaktu",
  "trudno_okreslic"
];
export const intensity = ["0_brak_agresji", "1_lekkie", "2_umiarkowane", "3_wysokie_ryzyko"] as const;
export const calmTime = ["do_5_minut", "5_15_minut", "15_30_minut", "30_60_minut", "ponad_godzine"] as const;
import type { EnvironmentConfig, SituationForm } from "../types/form";

export const environments = {
  home: {
    icon: "home",
    label: "Dom",
    header: "Narzędzie monitorowania sytuacji domowych",
    footer: "© 2026 Małgorzata Mikołajczyk | Powielanie do użytku rodziny i specjalistów wyłącznie w pełnej, niezmienionej wersji",
    incidentTitle: "KARTA MONITOROWANIA SYTUACJI - DOM",
    mapTitle: "MAPA ŚRODOWISKA DOMOWEGO",
    lead: "Rodzic / opiekun prowadzący",
    burdens: [
      "slaby_sen_pobudka_w_nocy",
      "zmiana_planu",
      "wyjscie_powrot_podroz",
      "wizyta_gosci_wieksza_liczba_osob",
      "konflikt_z_rodzenstwem_doroslym",
      "bol_dyskomfort_dolegliwosci_somatyczne",
      "nowe_wymagania",
      "other"
    ],
    antecedents: [
      "zmiana_aktywnosci",
      "konczenie_aktywnosci_sprzatanie",
      "rozpoczecie_nowego_zadania_obowiazku",
      "posilek_oczekiwanie_na_posilek",
      "higiena_ubieranie_toaleta",
      "odrabianie_lekcji_cwiczenie_obowiazek_domowy",
      "czekanie",
      "ograniczenie_dostepu",
      "korekta_zachowania_przypomnienie_zasad",
      "wyjscie_z_domu_powrot_do_domu",
      "sam_spacer_zmiana_trasy_zakonczenie_spaceru",
      "wyjscie_do_lekarza_na_terapie_na_zakupy_na_plac_zabaw",
      "zakonczenie_ekranu_ulubionej_aktywnosci",
      "kontakt_z_rodzenstwem_konflikt_z_bliska_osoba"
    ],
    expectations: [
      "brak_wymagan",
      "nowe_zadanie_obowiazek",
      "kontynuacja_zadania",
      "wymaganie_czasowe",
      "wymaganie_dotyczace_przejscia_tempa_zatrzymania",
      "wspolpraca_z_domownikami_respektowanie_ustalen",
      "other"
    ],
    harms: [
      "uraz_osoby",
      "autoagresja",
      "zniszczenie_przedmiotow",
      "wybiegniecie_oddalenie_sie",
      "zaklocenie_funkcjonowania_domu",
      "brak_szkod"
    ],
    after: [
      "przejscie_do_spokojniejszego_miejsca",
      "interwencja_fizyczna",
      "powrot_do_aktywnosci_planu_dnia",
      "kontakt_z_drugim_rodzicem_opiekunem",
      "kontakt_ze_specjalista_szkola",
      "other"
    ],
    endedBy: [
      "wycofanie_wymagania",
      "dostep_do_przedmiotu_aktywnosci",
      "dostep_do_osoby",
      "zmiana_miejsca",
      "obnizenie_bodzcow_cisza_przyciemnienie_mniej_osob",
      "czas_przeczekanie_bez_interwencji",
      "wyjscie_z_sytuacji",
      "wsparcie_sensoryczne_ciezar_ucisk_ruch_chlod_cieplo",
      "wsparcie_interoceptywne_pomoc_w_nazwaniu_stanu_jestes_glodny_bola_cie_nogi",
      "other"
    ],
    places: homePlaceOptions,
    dependencies: ["miejsce", "osoba_dorosla", "pora_dnia", "rodzaj_aktywnosci", "liczba_osob", "halas", "swiatlo_2", "przejscia_miedzy_aktywnosciami", "zmiany_planu", "obecnosc_rodzenstwa_gosci"],
    escalationContexts: ["koniec_aktywnosci", "oczekiwanie_czekanie", "zmiana_planu_2", "polecenie_nowe_wymaganie", "ograniczenie_dostepu_do_przedmiotu_osoby_aktywnosci", "przejscie_do_innego_miejsca", "posilek_higiena_wyjscie_z_domu", "spacer_zmiana_trasy_powrot_ze_spaceru", "wyjscie_do_lekarza_terapii_sklepu_na_plac_zabaw", "kontakt_z_rodzenstwem_sytuacja_wspolna", "other"],
    mapOptimalConditions: optimalConditionOptions,
    mapReducers: reducerOptions,
    mapEscalationReducers: escalationReducerOptions
  },
  center: {
    icon: "center",
    label: "Placówka całodobowa",
    header: "Narzędzie monitorowania sytuacji w placówce całodobowej",
    footer: "© 2026 Małgorzata Mikołajczyk | Powielanie do użytku placówki i rodziny wyłącznie w pełnej, niezmienionej wersji",
    incidentTitle: "KARTA MONITOROWANIA SYTUACJI - PLACÓWKA CAŁODOBOWA",
    mapTitle: "MAPA ŚRODOWISKA - PLACÓWKA CAŁODOBOWA",
    lead: "Wychowawca / osoba prowadząca",
    stayStages: ["poczatek_pobytu_po_weekendzie", "srodek_tygodnia", "koniec_tygodnia_przed_wyjazdem", "dzien_wyjazdu_do_domu", "dzien_powrotu_z_domu_do_osrodka", "po_dluzszej_przerwie_swietach_feriach", "other"],
    burdens: ["zmiana_planu_dnia", "kontakt_telefoniczny_wideorozmowa_z_domem", "konflikt_z_rowiesnikami", "konflikt_z_doroslym", "halas_tlok_zwiekszona_liczba_osob", "slaby_sen_nocna_pobudka", "nowe_wymagania", "other"],
    antecedents: ["zmiana_aktywnosci", "konczenie_aktywnosci_sprzatanie", "rozpoczecie_nowego_zadania_obowiazku", "odrabianie_lekcji_nauka_wlasna", "czynnosc_samoobslugowa", "wspolny_posilek_oczekiwanie_na_posilek", "czekanie", "ograniczenie_dostepu", "korekta_zachowania_przypomnienie_zasad", "powrot_do_pokoju_opuszczenie_pokoju", "wejscie_we_wspolna_przestrzen_wyjscie_ze_wspolnej_przestrzeni", "inny_wychowawca_niz_zwykle_dyzur_zastepczy", "zmiana_planu_bez_uprzedzenia", "kontakt_telefoniczny_wideorozmowa_z_domem_2", "konflikt_o_przestrzen_halas_rzeczy_wspolne_lub_zasady_pokoju", "wieczorna_rutyna_cisza_nocna_przygotowanie_do_snu"],
    expectations: ["brak_wymagan", "nowe_zadanie_obowiazek", "kontynuacja_zadania", "wymaganie_czasowe", "wymaganie_dotyczace_przejscia_tempa_zatrzymania", "wspolpraca_z_grupa_respektowanie_zasad_wspolnych", "other"],
    harms: ["uraz_osoby", "autoagresja", "zniszczenie_przedmiotow", "opuszczenie_wyznaczonego_miejsca_oddalenie_sie", "zaklocenie_funkcjonowania_grupy", "brak_szkod"],
    after: ["przejscie_do_spokojniejszego_miejsca", "interwencja_fizyczna", "powrot_do_aktywnosci_planu_dnia", "kontakt_z_rodzicem_opiekunem", "kontakt_z_pedagogiem_psychologiem_kierownikiem", "other"],
    endedBy: ["wycofanie_wymagania", "dostep_do_przedmiotu_aktywnosci", "dostep_do_osoby", "zmiana_miejsca", "obnizenie_bodzcow_cisza_przyciemnienie_mniej_osob", "czas_przeczekanie_bez_interwencji", "wyjscie_z_sytuacji_grupowej", "kontakt_z_domem", "wsparcie_sensoryczne_ciezar_ucisk_ruch_chlod_cieplo", "wsparcie_interoceptywne_pomoc_w_nazwaniu_stanu_jestes_glodny_bola_cie_nogi", "other"],
    places: ["pokoj_przestrzen_prywatna", "swietlica_pokoj_dzienny", "stolowka_jadalnia", "lazienka", "korytarz_przejscia", "miejsce_nauki", "sala_terapii_gabinet", "na_zewnatrz_boisko", "other"],
    dependencies: ["miejsce", "osoba_dyzurujaca_wychowawca", "pora_dnia", "rodzaj_aktywnosci", "liczba_osob", "halas", "swiatlo_2", "przejscia_miedzy_aktywnosciami", "zmiany_planu_dyzurow_zastepstw", "kontakt_z_domem_powrot_z_domu", "sklad_grupy_wspollokator_wspoldzielenie_pokoju"],
    escalationContexts: ["koniec_aktywnosci", "oczekiwanie_czekanie", "zmiana_planu_2", "polecenie_nowe_wymaganie", "ograniczenie_dostepu", "przejscie_do_innego_miejsca", "sytuacja_grupowa_wspoldzielenie_przestrzeni", "konflikt_o_rzeczy_wspolne_granice_miejsce_w_pokoju", "wieczorna_rutyna_przygotowanie_do_snu_cisza_nocna", "rozmowa_z_domem_po_powrocie_z_domu_po_weekendzie", "other"],
    mapOptimalConditions: ["cisza_minimalne_bodzce_sluchowe", "mniejsza_grupa_lub_czas_poza_grupa", "staly_wychowawca_znana_osoba_dyzurujaca", "jasny_plan_dnia_i_uprzedzenie_o_zmianach", "mozliwosc_wycofania_sie_do_bezpiecznego_miejsca", "mozliwosc_decydowania_o_kolejnosci_czynnosci", "przewidywalne_zasady_wspoldzielenia_przestrzeni", "kontakt_z_domem_w_ustalonej_przewidywalnej_formie", "najedzone_napite", "wypoczete_po_spokojnym_snie", "komfortowa_temperatura", "bez_bolu_dyskomfortu", "other"],
    mapReducers: ["cisza_wyciszenie_bodzcow", "wyjscie_z_grupy_do_spokojniejszego_miejsca", "obecnosc_znanego_wychowawcy_bez_nacisku", "kontakt_z_domem_wedlug_ustalen", "ruch_spacer_boisko_sala_ruchowa", "ciezar_ucisk_przedmiot_sensoryczny", "jedzenie_picie", "sen_odpoczynek", "toaleta", "wycofanie_wymagania", "wybor_mozliwosc_decyzji", "informacja_ile_to_potrwa", "other"],
    mapEscalationReducers: ["uprzedzenie_o_zmianie_dyzuru_planu", "plan_wizualny_timer", "wybor_kolejnosci_czynnosci", "negocjacja_i_czas_na_odpowiedz", "jasny_koniec_aktywnosci", "brak_pospiechu_elastycznosc_czasowa", "mozliwosc_przejscia_do_bezpiecznego_miejsca", "obecnosc_znanego_wychowawcy", "ustalenie_zasad_kontaktu_z_domem", "dostep_do_regulacji_sensorycznej", "other"]
  },
  school: {
    icon: "school",
    label: "Szkoła",
    header: "Narzędzie monitorowania sytuacji szkolnych",
    footer: "© 2026 Małgorzata Mikołajczyk | Powielanie do użytku szkolnego wyłącznie w pełnej, niezmienionej wersji",
    incidentTitle: "KARTA MONITOROWANIA SYTUACJI - SZKOŁA",
    mapTitle: "MAPA ŚRODOWISKA SZKOLNEGO",
    lead: "Osoba prowadząca",
    burdens: ["zmiana_planu_zastepstwa_odwolania", "nietypowe_wydarzenie", "nowe_wymagania", "other"],
    antecedents: ["zmiana_aktywnosci", "konczenie_aktywnosci_sprzatanie", "rozpoczecie_nowego_zadania", "zadanie_wymagajace_wysilku_poznawczego", "zadanie_wymagajace_wspolpracy_z_innymi", "czekanie", "ograniczenie_dostepu", "korekta_zachowania_przypomnienie_zasad", "przejscie_do_innego_pomieszczenia", "zastepstwo_inny_nauczyciel_niz_zwykle", "zmiana_planu_bez_uprzedzenia"],
    expectations: ["brak_wymagan", "nowe_zadanie", "kontynuacja_zadania", "wymaganie_czasowe", "wymaganie_dotyczace_przejscia_tempa_zatrzymania", "other"],
    harms: ["uraz_osoby", "autoagresja", "zniszczenie_przedmiotow", "brak_szkod"],
    after: ["sala_wyciszen_izolacja", "interwencja_fizyczna", "powrot_do_zajec", "kontakt_z_rodzicem_opiekunem", "other"],
    endedBy: ["wycofanie_wymagania", "dostep_do_przedmiotu_aktywnosci", "dostep_do_osoby", "zmiana_miejsca", "obnizenie_bodzcow_cisza_przyciemnienie_mniej_osob", "czas_przeczekanie_bez_interwencji", "wyjscie_z_sytuacji", "wsparcie_sensoryczne_ciezar_ucisk_ruch_chlod_cieplo", "wsparcie_interoceptywne_pomoc_w_nazwaniu_stanu_jestes_glodny_bola_cie_nogi", "other"],
    places: ["sala_lekcyjna", "korytarz", "szatnia", "stolowka_jadalnia", "toaleta", "swietlica", "sala_gimnastyczna", "plac_zabaw_boisko", "gabinet_pedagoga_psychologa", "autobus_droga_do_szkoly", "other"],
    dependencies: ["miejsce", "nauczyciel_osoba_dorosla", "pora_dnia", "rodzaj_zajec", "liczba_osob", "halas", "swiatlo_2", "przejscia_miedzy_aktywnosciami_lekcjami", "zmiany_planu_zastepstwa", "nieobecnosc_osoby_z_ktora_uczen_zwykle_pracuje", "sytuacja_grupowa_rowiesnicy"],
    escalationContexts: ["koniec_zajec_aktywnosci", "oczekiwanie_czekanie", "zmiana_planu_zastepstwo", "polecenie_nowe_zadanie", "ograniczenie_dostepu", "przejscie_do_innego_pomieszczenia", "przejscie_miedzy_zajeciami_zmiana_nauczyciela", "praca_w_grupie_kontakt_z_rowiesnikami", "przerwa_korytarz_tlok", "stolowka_posilek", "wf_aktywnosc_ruchowa_przebieranie", "sprawdzian_odpowiedz_ocena", "wyjscie_ze_szkoly_powrot_do_domu", "other"],
    mapOptimalConditions: ["cisza_minimalne_bodzce_sluchowe", "mniejsza_grupa_lub_praca_1_1", "stala_znana_osoba_dorosla", "miejsce_z_mniejszym_ruchem_osob", "jasny_plan_lekcji_i_uprzedzenie_o_zmianach", "wie_ile_potrwa_zadanie_i_kiedy_bedzie_koniec", "moze_wybrac_kolejnosc_sposob_wykonania", "moze_poprosic_o_przerwe_bez_zwracania_uwagi_grupy", "rutyny_powtarzalnosc", "najedzone_napite", "wypoczete_nie_zmeczone", "komfortowa_temperatura", "bez_bolu_dyskomfortu", "other"],
    mapReducers: ["cisza_wyciszenie_bodzcow", "wyjscie_do_spokojniejszego_miejsca", "krotka_przerwa_od_wymagan", "obecnosc_zaufanej_osoby_doroslej_bez_nacisku", "kontakt_1_1_zamiast_komunikatu_przy_grupie", "ruch_spacer_sala_ruchowa_boisko", "przedmiot_sensoryczny_sluchawki_kaptur", "jedzenie_picie", "toaleta", "wycofanie_lub_zmniejszenie_wymagania", "wybor_mozliwosc_decyzji", "informacja_ile_to_potrwa", "other"],
    mapEscalationReducers: ["uprzedzenie_przygotowanie_przed_zmiana", "plan_wizualny_timer_lista_krokow", "wybor_kiedy_jak_w_jakiej_kolejnosci", "negocjacja_i_czas_na_odpowiedz", "jasny_koniec_zadania_lub_aktywnosci", "brak_pospiechu_elastycznosc_czasowa", "mozliwosc_przerwy_poza_grupa", "obecnosc_zaufanej_osoby_doroslej", "dostep_do_regulacji_sensorycznej", "komunikat_prywatny_zamiast_przy_klasie", "other"]
  }
} as const satisfies Record<string, EnvironmentConfig>;

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
