import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { getIncidentExportSections, getMapExportSections, getMetaExportSection, getSimpleExportSection, resolveExportLabel, type ExportRow, type ExportSection, type ExportValue } from "../config/exportSections";
import { getFormLabels, type FormLabels } from "../config/formLabels";
import type { LanguageCode } from "../i18n/useLanguage";
import { resolveRows } from "./exportUtils";
import type { EnvironmentConfig, ExtendedMode, FormVariant, PdfAction, SituationForm } from "../types/form";

// Typy pdfmake nie obejmują poprawnie wariantu build/vfs_fonts używanego w bundlerze.
const pdfFontsBundle = pdfFonts as unknown as { pdfMake?: { vfs: Record<string, string> }; vfs: Record<string, string> };
(pdfMake as unknown as { vfs: Record<string, string> }).vfs = pdfFontsBundle.pdfMake ? pdfFontsBundle.pdfMake.vfs : pdfFontsBundle.vfs;

type PdfNode = Record<string, unknown>;
type PdfContent = PdfNode[];

function selectedList(value: ExportValue, _language: LanguageCode): string {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter(Boolean).length ? values.filter(Boolean).join(", ") : "........................................";
}

function formatLabel(label: string): PdfNode[] {
  const parts: PdfNode[] = [];
  const pattern = /_([^_]+)_/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(label)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: label.slice(lastIndex, match.index), bold: true });
    }
    parts.push({ text: match[1], bold: true, italics: true, decoration: "underline" });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < label.length) {
    parts.push({ text: label.slice(lastIndex), bold: true });
  }

  parts.push({ text: ": ", bold: true });
  return parts;
}

function fieldLine(label: string, value: ExportValue, language: LanguageCode): PdfNode {
  return { text: [...formatLabel(label), selectedList(value, language)], margin: [0, 2, 0, 2] };
}

function exportRows(env: EnvironmentConfig, form: SituationForm, rows: ExportRow[], language: LanguageCode): PdfContent {
  return resolveRows(env, form, rows, (label, value) => fieldLine(label, value, language), language);
}

function section(title: string, body: PdfContent): PdfContent {
  return [{ text: title, style: "sectionHeader", margin: [0, 10, 0, 5] }, ...body];
}

function sectionsFromExport(env: EnvironmentConfig, form: SituationForm, exportSections: ExportSection[], language: LanguageCode): PdfContent {
  return exportSections.flatMap((s) => section(s.title, exportRows(env, form, s.rows, language)));
}

function metaColumns(env: EnvironmentConfig, form: SituationForm, labels: FormLabels, language: LanguageCode): PdfNode {
  const [date, time, place, initials, lead, present] = getMetaExportSection(env, labels).rows;
  return {
    columns: [
      [date, time, place, initials].map((row) => fieldLine(resolveExportLabel(row.label, env, form), row.value(env, form), language)),
      [lead, present].map((row) => fieldLine(resolveExportLabel(row.label, env, form), row.value(env, form), language))
    ],
    columnGap: 18,
    margin: [0, 10, 0, 5]
  };
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

function makeSimpleDoc(env: EnvironmentConfig, data: SituationForm, labels: FormLabels, language: LanguageCode): Record<string, unknown> {
  const simpleSection = getSimpleExportSection(labels);
  return createDocument([
    { text: language === "en" ? `SIMPLE FORM - ${env.label.toUpperCase()}` : `FORMULARZ PROSTY - ${env.label.toUpperCase()}`, style: "title" },
    { text: language === "en" ? "Short situation report prepared for saving or manual email attachment." : "Krótka wersja zgłoszenia sytuacji przygotowana do zapisania lub ręcznego załączenia w wiadomości e-mail.", style: "hint" },
    metaColumns(env, data, labels, language),
    ...section(simpleSection.title, exportRows(env, data, simpleSection.rows, language))
  ], env);
}

export function makeDoc(env: EnvironmentConfig, data: SituationForm, variant: FormVariant, mode: ExtendedMode, language: LanguageCode = "pl"): Record<string, unknown> {
  const labels = getFormLabels(language);
  if (variant === "simple") return makeSimpleDoc(env, data, labels, language);

  const content: PdfContent = [
    { text: language === "en" ? "INCIDENT REPORT" : env.incidentTitle, style: "title" },
    { text: language === "en" ? "When describing the situation, note not only the behavior itself, but also signs of overload, tiredness, reduced availability, and environmental conditions." : "Przy opisie sytuacji warto zwracać uwagę nie tylko na samo zachowanie, ale też na oznaki przeciążenia, zmęczenia, spadku dostępności i warunki środowiskowe.", style: "hint" },
    metaColumns(env, data, labels, language),
    ...sectionsFromExport(env, data, getIncidentExportSections(env, labels), language)
  ];

  if (mode !== "incident") {
    content.push(
      { text: language === "en" ? "ENVIRONMENT MAP" : env.mapTitle, style: "title" },
      ...sectionsFromExport(env, data, getMapExportSections(labels), language)
    );
  }

  const filteredContent = mode === "map"
    ? content.slice(content.findIndex((item) => item.text === (language === "en" ? "ENVIRONMENT MAP" : env.mapTitle)))
    : content;

  return createDocument(filteredContent, env);
}

export function buildPdf({ env, form, variant, mode, modeLabel, language, action, setStatus }: { env: EnvironmentConfig; form: SituationForm; variant: FormVariant; mode: ExtendedMode; modeLabel: string; language: LanguageCode; action: PdfAction; setStatus: (message: string) => void }): void {
  const doc = makeDoc(env, form, variant, mode, language);
  const fileName = `monitorowanie-${env.label.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`;
  const pdf = pdfMake.createPdf(doc as never);

  if (action === "download") {
    pdf.download(fileName);
    setStatus(language === "en" ? `PDF ready — downloaded (${modeLabel}).` : `PDF gotowy — został pobrany (${modeLabel}).`);
    return;
  }

  pdf.open();
  setStatus(language === "en" ? "PDF ready — opened in a new tab." : "PDF gotowy — został otwarty w nowej karcie.");
}
