import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

function fieldLine(label, value) {
  return { text: [{ text: `${label}: `, bold: true }, value || "........................................"], margin: [0, 2, 0, 2] };
}

function selectedList(items, other) {
  const values = Array.isArray(items) ? [...items] : items ? [items] : [];
  if (other) values.push(other);
  return values.length ? values.join(", ") : "........................................";
}

function section(title, body) {
  return [{ text: title, style: "sectionHeader", margin: [0, 10, 0, 5] }, ...body];
}

export function makeDoc(env, data, mode) {
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
      { text: [{ text: "Zaznaczone: ", bold: true }, selectedList(incident.antecedents)] },
      fieldLine("Krótki opis sytuacji (fakty, bez interpretacji)", incident.factDescription)
    ]),
    ...section(`2. Co było oczekiwane od ${env.person} w tym momencie?`, [
      { text: selectedList(incident.expectations, incident.expectationOther) }
    ]),
    ...section("3. Pierwsze oznaki narastającego napięcia", [
      fieldLine("Czy pojawiły się sygnały", incident.signalsAppeared),
      { text: [{ text: "Zaznaczone sygnały: ", bold: true }, selectedList(incident.signals, incident.signalsOther)] },
      fieldLine("Czas od pierwszych sygnałów do eskalacji", incident.timeToEscalation),
      fieldLine("Co zwykle pojawia się najpierw", incident.firstSignal),
      fieldLine("Czy ten sygnał zwykle zapowiada trudniejsze zachowanie", incident.predicts)
    ]),
    ...section("3A. Faza napięcia i 4. Działania", [
      fieldLine("Faza regulacyjna", incident.phase),
      { text: [{ text: "Zaznaczone działania: ", bold: true }, selectedList(incident.interventions)] },
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
      { text: [{ text: "Zaznaczone po zdarzeniu: ", bold: true }, selectedList(incident.after, incident.afterOther)] },
      fieldLine("Czas trwania eskalacji", incident.escalationDuration),
      fieldLine("Czas do pełnego uspokojenia", incident.calmTime)
    ]),
    ...section("6A. Interwencja fizyczna (jeśli dotyczy)", [
      fieldLine("Czy była zastosowana w tym tygodniu wcześniej", incident.physicalThisWeek),
      fieldLine("Jeśli tak - ile razy", incident.physicalCount),
      fieldLine("Czy po wcześniejszych interwencjach próg eskalacji wydawał się niższy", incident.lowerThreshold),
      fieldLine("Krótka notatka", incident.physicalNote)
    ]),
    ...section("7-9. Regulacja i wpływ na napięcie", [
      { text: [{ text: "Co najbardziej pomogło w tej sytuacji: ", bold: true }, selectedList(incident.endedBy, incident.endedByOther)] },
      fieldLine("Co mogło nasilić napięcie", incident.worsened),
      fieldLine("Co pomogło obniżyć napięcie", incident.regulators),
      fieldLine("Co pomagało dokończyć aktywność mimo napięcia", incident.rewards)
    ])
  ];

  if (mode !== "incident") {
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
        { text: [{ text: "Zaznaczone zależności: ", bold: true }, selectedList(map.dependsOn)] },
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

export function buildPdf({ env, form, mode, modeLabel, action, setStatus }) {
  const doc = makeDoc(env, form, mode);
  const fileName = `monitorowanie-${env.label.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`;
  const pdf = pdfMake.createPdf(doc);

  if (action === "download") {
    pdf.download(fileName);
    setStatus(`Gotowe: wygenerowano PDF (${modeLabel}).`);
    return;
  }

  pdf.open();
  setStatus("PDF otwarty w nowej karcie.");
}
