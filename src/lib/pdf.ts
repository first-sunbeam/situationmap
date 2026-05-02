import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { formLabels } from "../config/formLabels";
import type { EnvironmentConfig, ExtendedMode, PdfAction, SituationForm } from "../types/form";

// Typy pdfmake nie obejmują poprawnie wariantu build/vfs_fonts używanego w bundlerze.
const pdfFontsBundle = pdfFonts as unknown as { pdfMake?: { vfs: Record<string, string> }; vfs: Record<string, string> };
(pdfMake as unknown as { vfs: Record<string, string> }).vfs = pdfFontsBundle.pdfMake ? pdfFontsBundle.pdfMake.vfs : pdfFontsBundle.vfs;

type PdfNode = Record<string, unknown>;
type PdfContent = PdfNode[];

function fieldLine(label: string, value?: string): PdfNode {
  return { text: [{ text: `${label}: `, bold: true }, value || "........................................"], margin: [0, 2, 0, 2] };
}

function selectedList(items: string | string[], other = ""): string {
  const values = Array.isArray(items) ? [...items] : items ? [items] : [];
  if (other) values.push(other);
  return values.length ? values.join(", ") : "........................................";
}

function section(title: string, body: PdfContent): PdfContent {
  return [{ text: title, style: "sectionHeader", margin: [0, 10, 0, 5] }, ...body];
}

export function makeDoc(env: EnvironmentConfig, data: SituationForm, mode: ExtendedMode): Record<string, unknown> {
  const incident = data.incident;
  const map = data.map;
  const content: PdfContent = [
    { text: env.incidentTitle, style: "title" },
    { text: "Przy opisie sytuacji warto zwracać uwagę nie tylko na samo zachowanie, ale też na oznaki przeciążenia, zmęczenia, spadku dostępności i warunki środowiskowe.", style: "hint" },
    {
      columns: [
        [fieldLine(formLabels.meta.date, data.meta.date), fieldLine(formLabels.meta.time, data.meta.time), fieldLine(formLabels.meta.place, data.meta.place)],
        [fieldLine(env.lead, data.meta.lead), fieldLine(formLabels.meta.present, data.meta.present)]
      ],
      columnGap: 18,
      margin: [0, 10, 0, 5]
    },
    ...section(formLabels.incident.baselineSection, [
      fieldLine(formLabels.incident.tension, incident.tension),
      fieldLine(formLabels.incident.tired, incident.tired),
      fieldLine(formLabels.incident.slept, incident.slept),
      fieldLine(formLabels.incident.sleepDetails, incident.sleepDetails),
      ...(env.stayStages ? [fieldLine(formLabels.incident.stayStage, incident.stayStage), fieldLine(formLabels.incident.stayStageLoad, incident.stayStageLoad)] : []),
      { text: [{ text: `${formLabels.incident.burdens}: `, bold: true }, selectedList(incident.burdens, incident.burdensOther)] }
    ]),
    ...section(formLabels.incident.beforeSection, [
      { text: [{ text: `${formLabels.incident.antecedents} `, bold: true }, selectedList(incident.antecedents)] },
      fieldLine(formLabels.incident.factDescription, incident.factDescription)
    ]),
    ...section(formLabels.incident.expectationsSection, [
      { text: [{ text: `${formLabels.incident.expectations}: `, bold: true }, selectedList(incident.expectations, incident.expectationOther)] }
    ]),
    ...section(formLabels.incident.signalsSection, [
      fieldLine(formLabels.incident.signalsAppeared, incident.signalsAppeared),
      { text: [{ text: `${formLabels.incident.signals} `, bold: true }, selectedList(incident.signals, incident.signalsOther)] },
      fieldLine(formLabels.incident.timeToEscalation, incident.timeToEscalation),
      fieldLine(formLabels.incident.firstSignal, incident.firstSignal),
      fieldLine(formLabels.incident.predicts, incident.predicts)
    ]),
    ...section(formLabels.incident.actionsSection, [
      fieldLine(formLabels.incident.phase, incident.phase),
      { text: [{ text: `${formLabels.incident.interventions}: `, bold: true }, selectedList(incident.interventions)] },
      fieldLine(formLabels.incident.interventionDetails, incident.interventionDetails),
      fieldLine(formLabels.incident.unconditional, incident.unconditional),
      fieldLine(formLabels.incident.usedRegulator, incident.usedRegulator),
      fieldLine(formLabels.incident.reducedTension, incident.reducedTension),
      fieldLine(formLabels.incident.earlierPossible, incident.earlierPossible),
      fieldLine(formLabels.incident.earlierWhat, incident.earlierWhat)
    ]),
    ...section(formLabels.incident.behaviorSection, [
      fieldLine(formLabels.incident.behavior, incident.behavior),
      fieldLine(formLabels.incident.intensity, incident.intensity),
      { text: [{ text: `${formLabels.incident.harms}: `, bold: true }, selectedList(incident.harms)] }
    ]),
    ...section(formLabels.incident.afterSection, [
      { text: [{ text: `${formLabels.incident.after} `, bold: true }, selectedList(incident.after, incident.afterOther)] },
      fieldLine(formLabels.incident.escalationDuration, incident.escalationDuration),
      fieldLine(formLabels.incident.calmTime, incident.calmTime)
    ]),
    ...section(formLabels.incident.physicalSection, [
      fieldLine(formLabels.incident.physicalThisWeek, incident.physicalThisWeek),
      fieldLine(formLabels.incident.physicalCount, incident.physicalCount),
      fieldLine(formLabels.incident.lowerThreshold, incident.lowerThreshold),
      fieldLine(formLabels.incident.physicalNote, incident.physicalNote)
    ]),
    ...section(formLabels.incident.regulationSection, [
      { text: [{ text: `${formLabels.incident.endedBy} `, bold: true }, selectedList(incident.endedBy, incident.endedByOther)] },
      fieldLine(formLabels.incident.worsened, incident.worsened),
      fieldLine(formLabels.incident.regulators, incident.regulators),
      fieldLine(formLabels.incident.rewards, incident.rewards)
    ])
  ];

  if (mode !== "incident") {
    content.push(
      { text: env.mapTitle, style: "title" },
      ...section(formLabels.map.places, [
        {
          table: {
            headerRows: 1,
            widths: ["30%", "20%", "50%"],
            body: [
              [{ text: formLabels.map.placeColumn, bold: true }, { text: `${formLabels.map.timeColumn} (h/dzień)`, bold: true }, { text: formLabels.map.activityColumn, bold: true }],
              ...map.rows.map((row) => [row.place, row.time || "........", row.activity || "........................................"])
            ]
          },
          layout: "lightHorizontalLines"
        }
      ]),
      ...section("2. Miejsca regulacyjne", [
        fieldLine(formLabels.map.preferred, map.preferred),
        fieldLine(formLabels.map.avoided, map.avoided)
      ]),
      ...section("2A. Warunki dobrego funkcjonowania", [
        fieldLine(formLabels.map.likes, map.likes),
        fieldLine(formLabels.map.easiestWhen, map.easiestWhen),
        fieldLine(formLabels.map.cooperatesWith, map.cooperatesWith),
        fieldLine(formLabels.map.reducers, map.reducers)
      ]),
      ...section("3. Zależności", [
        { text: [{ text: `${formLabels.map.dependsOn}: `, bold: true }, selectedList(map.dependsOn)] },
        fieldLine(formLabels.map.dependsDescription, map.dependsDescription)
      ]),
      ...section("4. Eskalacja", [
        { text: [{ text: `${formLabels.map.escalationContexts}: `, bold: true }, selectedList(map.escalationContexts, map.escalationOther)] }
      ]),
      ...section("5. Sytuacje bez agresji", [
        fieldLine(formLabels.map.noAggression, map.noAggression),
        fieldLine(formLabels.map.noAggressionWhere, map.noAggressionWhere)
      ])
    );
  }

  const filteredContent = mode === "map"
    ? content.slice(content.findIndex((item) => item.text === env.mapTitle))
    : content;

  return {
    pageSize: "A4",
    pageMargins: [74, 62, 74, 62],
    header: () => ({ text: env.header, alignment: "right", fontSize: 8, margin: [0, 24, 74, 0], color: "#555555" }),
    footer: (currentPage: number, pageCount: number) => ({
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

export function buildPdf({ env, form, mode, modeLabel, action, setStatus }: { env: EnvironmentConfig; form: SituationForm; mode: ExtendedMode; modeLabel: string; action: PdfAction; setStatus: (message: string) => void }): void {
  const doc = makeDoc(env, form, mode);
  const fileName = `monitorowanie-${env.label.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`;
  const pdf = pdfMake.createPdf(doc as never);

  if (action === "download") {
    pdf.download(fileName);
    setStatus(`PDF gotowy — został pobrany (${modeLabel}).`);
    return;
  }

  pdf.open();
  setStatus("PDF gotowy — został otwarty w nowej karcie.");
}
