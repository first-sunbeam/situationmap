import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { getIncidentExportSections, getMetaExportSection, mapExportSections, simpleExportSection, type ExportRow, type ExportValue } from "../config/exportSections";
import { formLabels } from "../config/formLabels";
import type { EnvironmentConfig, ExtendedMode, FormVariant, PdfAction, SituationForm } from "../types/form";

// Typy pdfmake nie obejmują poprawnie wariantu build/vfs_fonts używanego w bundlerze.
const pdfFontsBundle = pdfFonts as unknown as { pdfMake?: { vfs: Record<string, string> }; vfs: Record<string, string> };
(pdfMake as unknown as { vfs: Record<string, string> }).vfs = pdfFontsBundle.pdfMake ? pdfFontsBundle.pdfMake.vfs : pdfFontsBundle.vfs;

type PdfNode = Record<string, unknown>;
type PdfContent = PdfNode[];

function selectedList(value: ExportValue): string {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter(Boolean).length ? values.filter(Boolean).join(", ") : "........................................";
}

function fieldLine(label: string, value: ExportValue): PdfNode {
  return { text: [{ text: `${label}: `, bold: true }, selectedList(value)], margin: [0, 2, 0, 2] };
}

function exportRows(env: EnvironmentConfig, form: SituationForm, rows: ExportRow[]): PdfContent {
  return rows.map((row) => fieldLine(row.label, row.value(env, form)));
}

function section(title: string, body: PdfContent): PdfContent {
  return [{ text: title, style: "sectionHeader", margin: [0, 10, 0, 5] }, ...body];
}

function metaColumns(env: EnvironmentConfig, form: SituationForm): PdfNode {
  const [date, time, place, lead, present] = getMetaExportSection(env).rows;
  return {
    columns: [
      [date, time, place].map((row) => fieldLine(row.label, row.value(env, form))),
      [lead, present].map((row) => fieldLine(row.label, row.value(env, form)))
    ],
    columnGap: 18,
    margin: [0, 10, 0, 5]
  };
}

function mapPlacesSection(form: SituationForm): PdfContent {
  return section(formLabels.map.places, [
    {
      table: {
        headerRows: 1,
        widths: ["30%", "20%", "50%"],
        body: [
          [{ text: formLabels.map.placeColumn, bold: true }, { text: `${formLabels.map.timeColumn} (h/dzień)`, bold: true }, { text: formLabels.map.activityColumn, bold: true }],
          ...form.map.rows.map((row) => [row.place, row.time || "........", row.activity || "........................................"])
        ]
      },
      layout: "lightHorizontalLines"
    }
  ]);
}

function createDocument(content: PdfContent, env: EnvironmentConfig): Record<string, unknown> {
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
    content
  };
}

function makeSimpleDoc(env: EnvironmentConfig, data: SituationForm): Record<string, unknown> {
  return createDocument([
    { text: `FORMULARZ PROSTY - ${env.label.toUpperCase()}`, style: "title" },
    { text: "Krótka wersja zgłoszenia sytuacji przygotowana do zapisania lub ręcznego załączenia w wiadomości e-mail.", style: "hint" },
    metaColumns(env, data),
    ...section(simpleExportSection.title, exportRows(env, data, simpleExportSection.rows))
  ], env);
}

export function makeDoc(env: EnvironmentConfig, data: SituationForm, variant: FormVariant, mode: ExtendedMode): Record<string, unknown> {
  if (variant === "simple") return makeSimpleDoc(env, data);

  const content: PdfContent = [
    { text: env.incidentTitle, style: "title" },
    { text: "Przy opisie sytuacji warto zwracać uwagę nie tylko na samo zachowanie, ale też na oznaki przeciążenia, zmęczenia, spadku dostępności i warunki środowiskowe.", style: "hint" },
    metaColumns(env, data),
    ...getIncidentExportSections(env).flatMap((exportSection) => section(
      exportSection.title,
      exportRows(env, data, exportSection.rows)
    ))
  ];

  if (mode !== "incident") {
    content.push(
      { text: env.mapTitle, style: "title" },
      ...mapPlacesSection(data),
      ...mapExportSections.flatMap((exportSection) => section(
        exportSection.title,
        exportRows(env, data, exportSection.rows)
      ))
    );
  }

  const filteredContent = mode === "map"
    ? content.slice(content.findIndex((item) => item.text === env.mapTitle))
    : content;

  return createDocument(filteredContent, env);
}

export function buildPdf({ env, form, variant, mode, modeLabel, action, setStatus }: { env: EnvironmentConfig; form: SituationForm; variant: FormVariant; mode: ExtendedMode; modeLabel: string; action: PdfAction; setStatus: (message: string) => void }): void {
  const doc = makeDoc(env, form, variant, mode);
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
