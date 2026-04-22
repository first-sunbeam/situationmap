<script setup>
import { computed, reactive, ref } from "vue";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import IncidentForm from "./components/IncidentForm.vue";
import EnvironmentMapForm from "./components/EnvironmentMapForm.vue";

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

const commonSignals = [
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

const yesNoUnknown = ["Tak", "Nie", "Nie wiem"];
const yesNoPartial = ["Tak", "Nie", "Częściowo"];
const tensionLevels = ["0 niski / stabilny", "1 podwyższony", "2 wysoki", "3 bardzo wysoki"];
const regulationPhase = [
  "Zielona - możliwa rozmowa i współpraca",
  "Żółta - narastające napięcie",
  "Czerwona - pełna eskalacja / brak kontaktu",
  "Trudno określić"
];
const intensity = ["0 brak agresji", "1 lekkie", "2 umiarkowane", "3 wysokie ryzyko"];
const calmTime = ["< 5 min", "5-15 min", "> 15 min", "nie osiągnięto"];

const environments = {
  home: {
    icon: "⌂",
    label: "Dom",
    header: "Autorskie narzędzie monitorowania sytuacji domowych",
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
      "Kontakt z rodzeństwem / konflikt z bliską osobą",
      "Inne"
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
    label: "Ośrodek",
    header: "Autorskie narzędzie monitorowania sytuacji w ośrodku / placówce pobytowej",
    footer: "© 2026 Małgorzata Mikołajczyk | Powielanie do użytku placówki i rodziny wyłącznie w pełnej, niezmienionej wersji",
    incidentTitle: "KARTA MONITOROWANIA SYTUACJI - OŚRODEK / PLACÓWKA POBYTOWA",
    mapTitle: "MAPA ŚRODOWISKA - OŚRODEK / PLACÓWKA POBYTOWA",
    person: "wychowanka",
    personShort: "wychowanek",
    lead: "Wychowawca / osoba prowadząca",
    stayStages: ["początek pobytu po weekendzie", "środek tygodnia", "koniec tygodnia przed wyjazdem", "dzień wyjazdu do domu", "dzień powrotu z domu do ośrodka", "po dłuższej przerwie / świętach / feriach", "inne"],
    burdens: ["zmiana planu dnia", "kontakt telefoniczny / wideorozmowa z domem", "konflikt z rówieśnikami", "konflikt z dorosłym", "hałas / tłok / zwiększona liczba osób", "słaby sen / nocna pobudka", "nowe wymagania", "inne"],
    antecedents: ["Zmiana aktywności", "Kończenie aktywności / sprzątanie", "Rozpoczęcie nowego zadania / obowiązku", "Odrabianie lekcji / nauka własna", "Czynność samoobsługowa", "Wspólny posiłek / oczekiwanie na posiłek", "Czekanie", "Ograniczenie dostępu", "Korekta zachowania / przypomnienie zasad", "Powrót do pokoju / opuszczenie pokoju", "Wejście we wspólną przestrzeń / wyjście ze wspólnej przestrzeni", "Inny wychowawca niż zwykle / dyżur zastępczy", "Zmiana planu bez uprzedzenia", "Kontakt telefoniczny / wideorozmowa z domem", "Konflikt o przestrzeń, hałas, rzeczy wspólne lub zasady pokoju", "Wieczorna rutyna / cisza nocna / przygotowanie do snu", "Inne"],
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
    header: "Autorskie narzędzie monitorowania sytuacji szkolnych",
    footer: "© 2026 Małgorzata Mikołajczyk | Powielanie do użytku szkolnego wyłącznie w pełnej, niezmienionej wersji",
    incidentTitle: "KARTA MONITOROWANIA SYTUACJI - SZKOŁA",
    mapTitle: "MAPA ŚRODOWISKA SZKOLNEGO",
    person: "ucznia",
    personShort: "uczeń",
    lead: "Osoba prowadząca",
    burdens: ["zmiana planu (zastępstwa / odwołania)", "nietypowe wydarzenie", "nowe wymagania", "inne"],
    antecedents: ["Zmiana aktywności", "Kończenie aktywności / sprzątanie", "Rozpoczęcie nowego zadania", "Zadanie wymagające wysiłku poznawczego", "Zadanie wymagające współpracy z innymi", "Czekanie", "Ograniczenie dostępu", "Korekta zachowania / przypomnienie zasad", "Przejście do innego pomieszczenia", "Zastępstwo / inny nauczyciel niż zwykle", "Zmiana planu bez uprzedzenia", "Inne"],
    expectations: ["Brak wymagań", "Nowe zadanie", "Kontynuacja zadania", "Wymaganie czasowe", "Wymaganie dotyczące przejścia / tempa / zatrzymania", "inne"],
    interventions: ["Rozmowa", "Przypomnienie zasad", "Przesunięcie w czasie", "Zmiana aktywności", "Obniżenie wymagań / wycofanie wymagania", "Zaangażowanie innego nauczyciela / pedagoga", "Zaproponowanie czegoś pomagającego się uspokoić", "Uczeń sam poprosił o coś pomagającego się uspokoić", "Brak interwencji", "Inne"],
    harms: ["uraz osoby", "autoagresja", "zniszczenie przedmiotów", "brak szkód"],
    after: ["Sala wyciszeń (izolacja)", "Interwencja fizyczna", "Powrót do zajęć", "Kontakt z rodzicem / opiekunem", "Inne"],
    endedBy: ["wycofanie wymagania", "dostęp do przedmiotu / aktywności", "dostęp do osoby", "zmiana miejsca", "obniżenie bodźców", "czas / przeczekanie", "wyjście z sytuacji", "inne"],
    places: ["Sala lekcyjna", "Świetlica", "Sala SI", "Kuchnia", "Korytarz", "Toaleta", "Inne"],
    dependencies: ["miejsca", "osoby dorosłej", "pory dnia", "rodzaju zajęć", "liczby osób", "hałasu", "światła", "przejść między aktywnościami", "zmian planu / zastępstw", "nieobecności nauczyciela, z którym uczeń zwykle pracuje"],
    escalationContexts: ["Koniec zajęć", "Oczekiwanie", "Zmiana planu", "Polecenie", "Ograniczenie dostępu", "Przejście do innego pomieszczenia", "Przejście między zajęciami (zmiana nauczyciela)", "Inne"]
  }
};

function blankForm(env) {
  return {
    meta: { date: "", time: "", place: "", lead: "", present: "" },
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
      antecedentsDetails: "",
      factDescription: "",
      expectations: [],
      expectationOther: "",
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
      earlierPossible: "",
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

function fieldLine(label, value) {
  return { text: [{ text: `${label}: `, bold: true }, value || "........................................"], margin: [0, 2, 0, 2] };
}

function selectedList(items, other) {
  const values = Array.isArray(items) ? [...items] : items ? [items] : [];
  if (other) values.push(other);
  return values.length ? values.join(", ") : "........................................";
}

function checkboxText(options, selected) {
  return options.map((option) => `${selected.includes(option) ? "[x]" : "[ ]"} ${option}`).join("\n");
}

function section(title, body) {
  return [{ text: title, style: "sectionHeader", margin: [0, 10, 0, 5] }, ...body];
}

function makeDoc(env, data, mode) {
  const incident = data.incident;
  const map = data.map;
  const content = [
    { text: env.incidentTitle, style: "title" },
    { text: "Przy opisie sytuacji warto zwracać uwagę nie tylko na samo zachowanie, ale też na oznaki przeciążenia, zmęczenia, spadku dostępności i warunki środowiskowe.", style: "hint" },
    {
      columns: [
        [fieldLine("Data", data.meta.date), fieldLine("Godzina", data.meta.time), fieldLine("Miejsce", data.meta.place)],
        [fieldLine(env.lead, data.meta.lead), fieldLine("Inne osoby obecne", data.meta.present)]
      ],
      columnGap: 18,
      margin: [0, 10, 0, 5]
    },
    ...section("0. Poziom bazowy i kontekst dnia (przed zdarzeniem)", [
      fieldLine(`Poziom napięcia ${env.person}`, incident.tension),
      fieldLine(`Czy ${env.personShort} był tego dnia zmęczony / senny`, incident.tired),
      fieldLine(`Czy ${env.personShort} spał / odpoczywał w ciągu dnia`, incident.slept),
      fieldLine("Jeśli tak: o której i jak długo", incident.sleepDetails),
      ...(env.stayStages ? [fieldLine("Etap tygodnia / pobytu", incident.stayStage), fieldLine("Czy ten etap wydawał się obciążający", incident.stayStageLoad)] : []),
      { text: [{ text: "Czynniki obciążające: ", bold: true }, selectedList(incident.burdens, incident.burdensOther)] }
    ]),
    ...section("1. Co działo się bezpośrednio przed zdarzeniem (do 5 minut przed)?", [
      { text: checkboxText(env.antecedents, incident.antecedents) },
      fieldLine("Doprecyzowanie", incident.antecedentsDetails),
      fieldLine("Krótki opis sytuacji (fakty, bez interpretacji)", incident.factDescription)
    ]),
    ...section(`2. Co było oczekiwane od ${env.person} w tym momencie?`, [
      { text: selectedList(incident.expectations, incident.expectationOther) }
    ]),
    ...section("3. Czy wcześniej pojawiły się sygnały zmiany stanu?", [
      fieldLine("Czy pojawiły się sygnały", incident.signalsAppeared),
      { text: checkboxText(commonSignals, incident.signals) },
      fieldLine("Inne sygnały", incident.signalsOther),
      fieldLine("Czas od pierwszych sygnałów do eskalacji", incident.timeToEscalation),
      fieldLine("Co zwykle pojawia się najpierw", incident.firstSignal),
      fieldLine("Czy ten sygnał zwykle zapowiada trudniejsze zachowanie", incident.predicts)
    ]),
    ...section("3A. Faza regulacyjna w momencie interwencji", [fieldLine("Faza", incident.phase)]),
    ...section("4. Jakie działania podjęto przed eskalacją?", [
      { text: checkboxText(env.interventions, incident.interventions) },
      fieldLine("Doprecyzowanie", incident.interventionDetails),
      fieldLine("Czy to było dostępne bez warunku", incident.unconditional),
      fieldLine(`Czy ${env.personShort} z tego skorzystał`, incident.usedRegulator),
      fieldLine("Czy obniżył napięcie", incident.reducedTension),
      fieldLine("Czy była możliwość zareagowania wcześniej w fazie żółtej", incident.earlierPossible),
      fieldLine("Jeśli tak - co było możliwe", incident.earlierWhat)
    ]),
    ...section(`5. Opis zachowania (konkretnie - co zrobił ${env.personShort})`, [
      fieldLine("Opis", incident.behavior),
      fieldLine("Intensywność", incident.intensity),
      { text: [{ text: "Czy doszło do: ", bold: true }, selectedList(incident.harms)] }
    ]),
    ...section("6. Co wydarzyło się po zdarzeniu?", [
      { text: checkboxText(env.after, incident.after) },
      fieldLine("Inne", incident.afterOther),
      fieldLine("Czas trwania eskalacji", incident.escalationDuration),
      fieldLine("Czas do pełnego uspokojenia", incident.calmTime)
    ]),
    ...section("6A. Interwencja fizyczna (jeśli dotyczy)", [
      fieldLine("Czy była zastosowana w tym tygodniu wcześniej", incident.physicalThisWeek),
      fieldLine("Jeśli tak - ile razy", incident.physicalCount),
      fieldLine("Czy po wcześniejszych interwencjach próg eskalacji wydawał się niższy", incident.lowerThreshold),
      fieldLine("Krótka notatka", incident.physicalNote)
    ]),
    ...section("7. Co pomogło obniżyć napięcie?", [
      fieldLine("Opis", incident.helped),
      { text: [{ text: "Co najprawdopodobniej zakończyło lub wyraźnie obniżyło zachowanie: ", bold: true }, selectedList(incident.endedBy, incident.endedByOther)] }
    ]),
    ...section("8. Co mogło nasilić napięcie?", [fieldLine("Opis", incident.worsened)]),
    ...section("9. Regulatory vs nagrody (krótka obserwacja)", [
      fieldLine("Co obniżało napięcie / pomagało się uspokoić", incident.regulators),
      fieldLine("Co było zachętą / nagrodą", incident.rewards)
    ])
  ];

  if (mode !== "incident") {
    if (mode === "both") content.push({ text: "", pageBreak: "after" });
    content.push(
      { text: env.mapTitle, style: "title" },
      ...section(`1. W jakich miejscach ${env.personShort} spędza najwięcej czasu?`, [
        {
          table: {
            headerRows: 1,
            widths: ["30%", "20%", "50%"],
            body: [
              [{ text: "Miejsce", bold: true }, { text: "Czas (h/dzień)", bold: true }, { text: "Rodzaj aktywności", bold: true }],
              ...map.rows.map((row) => [row.place, row.time || "........", row.activity || "........................................"])
            ]
          },
          layout: "lightHorizontalLines"
        }
      ]),
      ...section("2. Miejsca regulacyjne", [
        fieldLine(`${env.personShort[0].toUpperCase()}${env.personShort.slice(1)} chętnie przebywa w`, map.preferred),
        fieldLine(`${env.personShort[0].toUpperCase()}${env.personShort.slice(1)} unika / wychodzi z trudem z`, map.avoided)
      ]),
      ...section(`2A. Co ${env.personShort} lubi / warunki dobrego funkcjonowania`, [
        fieldLine(`${env.personShort[0].toUpperCase()}${env.personShort.slice(1)} najchętniej angażuje się w`, map.likes),
        fieldLine("Najłatwiej funkcjonuje, gdy", map.easiestWhen),
        fieldLine("Najłatwiej współpracuje z", map.cooperatesWith),
        fieldLine("Co najczęściej obniża napięcie lub pomaga wrócić do równowagi", map.reducers)
      ]),
      ...section("3. Czy zachowanie zmienia się w zależności od:", [
        { text: checkboxText(env.dependencies, map.dependsOn) },
        fieldLine("Opis", map.dependsDescription)
      ]),
      ...section("4. W których sytuacjach najczęściej dochodzi do eskalacji?", [
        { text: selectedList(map.escalationContexts, map.escalationOther) }
      ]),
      ...section("5. Czy są miejsca lub sytuacje, w których zachowania agresywne nie występują?", [
        fieldLine("Odpowiedź", map.noAggression),
        fieldLine("Jakie", map.noAggressionWhere)
      ])
    );
  }

  const filteredContent = mode === "map" ? content.slice(content.findIndex((item) => item.text === env.mapTitle)) : content;

  return {
    pageSize: "A4",
    pageMargins: [74, 62, 74, 62],
    header: () => ({ text: env.header, alignment: "right", fontSize: 8, margin: [0, 24, 74, 0], color: "#555555" }),
    footer: (currentPage, pageCount) => ({
      text: `${env.footer} | ${currentPage}/${pageCount}`,
      alignment: "center",
      fontSize: 7,
      margin: [74, 0, 74, 18],
      color: "#555555"
    }),
    defaultStyle: { font: "Roboto", fontSize: 10.5, lineHeight: 1.18 },
    styles: {
      title: { fontSize: 14, bold: true, alignment: "center", margin: [0, 0, 0, 9] },
      hint: { italics: true, alignment: "center", fontSize: 9, color: "#555555", margin: [0, 0, 0, 8] },
      sectionHeader: { fontSize: 11.5, bold: true, color: "#173b37" }
    },
    content: filteredContent
  };
}

const activeEnvKey = ref("home");
const activeMode = ref("both");
const status = ref("");
const forms = reactive(Object.fromEntries(Object.entries(environments).map(([key, env]) => [key, blankForm(env)])));

const env = computed(() => environments[activeEnvKey.value]);
const form = computed(() => forms[activeEnvKey.value]);
const modeLabel = computed(() => ({ both: "oba formularze", incident: "karta zdarzenia", map: "mapa środowiska" }[activeMode.value]));

function toggle(list, option) {
  const index = list.indexOf(option);
  if (index >= 0) list.splice(index, 1);
  else list.push(option);
}

function buildPdf(action) {
  const doc = makeDoc(env.value, form.value, activeMode.value);
  const fileName = `monitorowanie-${env.value.label.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`;
  const pdf = pdfMake.createPdf(doc);

  if (action === "download") {
    pdf.download(fileName);
    status.value = `Gotowe: wygenerowano PDF (${modeLabel.value}).`;
  } else if (action === "open") {
    pdf.open();
    status.value = "PDF otwarty w nowej karcie.";
  } else {
    pdf.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      window.location.href = `mailto:?subject=${encodeURIComponent("Formularz monitorowania - " + env.value.label)}&body=${encodeURIComponent("PDF został wygenerowany w aplikacji. Dołącz pobrany plik do wiadomości.")}`;
      status.value = "Otworzono PDF i przygotowano wiadomość e-mail. Załącz plik PDF w programie pocztowym.";
    });
  }
}

function resetCurrent() {
  forms[activeEnvKey.value] = blankForm(env.value);
  status.value = "Wyczyszczono oba formularze dla bieżącego środowiska.";
}

function resetIncident() {
  forms[activeEnvKey.value].meta = blankForm(env.value).meta;
  forms[activeEnvKey.value].incident = blankForm(env.value).incident;
  status.value = "Wyczyszczono kartę zdarzenia.";
}

function resetMap() {
  forms[activeEnvKey.value].map = blankForm(env.value).map;
  status.value = "Wyczyszczono mapę środowiska.";
}
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <span class="brand-title">Monitoring sytuacji</span>
          <span class="brand-subtitle">Karta zdarzenia i mapa środowiska</span>
        </div>
        <nav class="environment-tabs" aria-label="Wybór środowiska">
          <button
            v-for="(item, key) in environments"
            :key="key"
            class="tab-button"
            :class="{ active: activeEnvKey === key }"
            @click="activeEnvKey = key"
          >
            <span aria-hidden="true">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </button>
        </nav>
        <div class="actions">
          <button class="icon-button" title="Otwórz podgląd PDF" @click="buildPdf('open')">↗</button>
          <button class="icon-button" title="Wyczyść oba formularze" @click="resetCurrent">↺</button>
        </div>
      </div>
    </header>

    <main>
      <section class="hero">
        <h1>Wypełnij formularze dla środowiska: {{ env.label }}</h1>
        <p>Uzupełnij kartę monitorowania sytuacji i mapę środowiska, a aplikacja wygeneruje uporządkowany plik PDF gotowy do pobrania albo wysłania.</p>
      </section>

      <div class="workspace">
        <aside class="sidebar">
          <div class="panel mode-card">
            <p class="mode-label">Zakres PDF</p>
            <div class="mode-switch">
              <button class="mode-button" :class="{ active: activeMode === 'both' }" @click="activeMode = 'both'">▣ Oba formularze</button>
              <button class="mode-button" :class="{ active: activeMode === 'incident' }" @click="activeMode = 'incident'">□ Karta zdarzenia</button>
              <button class="mode-button" :class="{ active: activeMode === 'map' }" @click="activeMode = 'map'">◇ Mapa środowiska</button>
            </div>
            <div class="note">Dane pozostają w tej przeglądarce do czasu odświeżenia strony. PDF powstaje lokalnie po kliknięciu przycisku.</div>
          </div>
        </aside>

        <div class="forms-stack">
          <IncidentForm
            v-if="activeMode !== 'map'"
            :env="env"
            :form="form"
            :tension-levels="tensionLevels"
            :yes-no-unknown="yesNoUnknown"
            :yes-no-partial="yesNoPartial"
            :regulation-phase="regulationPhase"
            :intensity="intensity"
            :calm-time="calmTime"
            :common-signals="commonSignals"
            :toggle="toggle"
            :build-pdf="buildPdf"
            :reset-incident="resetIncident"
          />

          <EnvironmentMapForm
            v-if="activeMode !== 'incident'"
            :env="env"
            :form="form"
            :toggle="toggle"
            :build-pdf="buildPdf"
            :reset-map="resetMap"
          />

          <p class="status" aria-live="polite">{{ status }}</p>
        </div>
      </div>
    </main>
  </div>
</template>
