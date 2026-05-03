import { beforeEach, describe, expect, it, vi } from "vitest";
import { environments } from "../../src/data/environments";
import { buildPdf, makeDoc } from "../../src/lib/pdf";
import type { SituationForm } from "../../src/types/form";
import { createHomeForm, fillRequiredMeta } from "./helpers/formFixtures";

const pdfMakeMock = vi.hoisted(() => {
  const downloadMock = vi.fn();
  const openMock = vi.fn();
  const createPdfMock = vi.fn(() => ({
    download: downloadMock,
    open: openMock
  }));

  return { createPdfMock, downloadMock, openMock };
});

vi.mock("pdfmake/build/pdfmake", () => ({
  default: {
    createPdf: pdfMakeMock.createPdfMock
  }
}));

vi.mock("pdfmake/build/vfs_fonts", () => ({
  default: {
    vfs: {}
  }
}));

function filledHomeForm(): SituationForm {
  const form = createHomeForm();
  fillRequiredMeta(form);
  form.simple.factDescription = "Krótki opis sytuacji.";
  form.simple.helped = "Przerwa i spokojne miejsce.";
  form.incident.tension = "1 podwyższony";
  form.incident.antecedents = ["Zmiana aktywności"];
  form.incident.endedBy = ["czas / przeczekanie"];
  form.map.rows[0].time = "2h";
  form.map.rows[0].activity = "Zabawa";
  return form;
}

function stringifyDoc(doc: Record<string, unknown>): string {
  return JSON.stringify(doc.content);
}

describe("generowanie PDF", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("buduje dokument PDF formularza prostego z danymi formularza", () => {
    const doc = makeDoc(environments.home, filledHomeForm(), "simple", "incident");
    const content = stringifyDoc(doc);

    expect(content).toContain("FORMULARZ PROSTY - DOM");
    expect(content).toContain("Krótki opis sytuacji.");
    expect(content).toContain("Przerwa i spokojne miejsce.");
    expect(content).not.toContain(environments.home.incidentTitle);
  });

  it("buduje dokument PDF karty zdarzenia z sekcjami incydentu", () => {
    const doc = makeDoc(environments.home, filledHomeForm(), "extended", "incident");
    const content = stringifyDoc(doc);

    expect(content).toContain(environments.home.incidentTitle);
    expect(content).toContain("0. Poziom bazowy i kontekst dnia");
    expect(content).toContain("1 podwyższony");
    expect(content).not.toContain(environments.home.mapTitle);
  });

  it("buduje dokument PDF samej mapy bez tytułu incydentu", () => {
    const doc = makeDoc(environments.home, filledHomeForm(), "extended", "map");
    const content = stringifyDoc(doc);

    expect(content).toContain(environments.home.mapTitle);
    expect(content).toContain("Miejsca i aktywności");
    expect(content).toContain("Zabawa");
    expect(content).not.toContain(environments.home.incidentTitle);
  });

  it("pobiera wygenerowany PDF", () => {
    const setStatus = vi.fn();

    buildPdf({
      env: environments.home,
      form: filledHomeForm(),
      variant: "simple",
      mode: "incident",
      modeLabel: "formularz prosty",
      action: "download",
      setStatus
    });

    expect(pdfMakeMock.createPdfMock).toHaveBeenCalledOnce();
    expect(pdfMakeMock.downloadMock).toHaveBeenCalledWith(expect.stringMatching(/^monitorowanie-dom-\d{4}-\d{2}-\d{2}\.pdf$/));
    expect(pdfMakeMock.openMock).not.toHaveBeenCalled();
    expect(setStatus).toHaveBeenCalledWith("PDF gotowy — został pobrany (formularz prosty).");
  });

  it("otwiera wygenerowany PDF", () => {
    const setStatus = vi.fn();

    buildPdf({
      env: environments.home,
      form: filledHomeForm(),
      variant: "extended",
      mode: "incident",
      modeLabel: "karta zdarzenia",
      action: "open",
      setStatus
    });

    expect(pdfMakeMock.createPdfMock).toHaveBeenCalledOnce();
    expect(pdfMakeMock.openMock).toHaveBeenCalledOnce();
    expect(pdfMakeMock.downloadMock).not.toHaveBeenCalled();
    expect(setStatus).toHaveBeenCalledWith("PDF gotowy — został otwarty w nowej karcie.");
  });
});
