import { beforeEach, describe, expect, it, vi } from "vitest";
import { blankForm, environments } from "../../src/data/environments";
import { buildPdf, makeDoc } from "../../src/lib/pdf";
import type { SituationForm } from "../../src/types/form";

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

function homeForm(): SituationForm {
  const form = blankForm(environments.home);
  form.meta.date = "2026-05-02";
  form.meta.time = "12:30";
  form.meta.place = "Dom";
  form.meta.lead = "Jan Kowalski";
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

describe("pdf", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("builds a simple PDF document with simple form data", () => {
    const doc = makeDoc(environments.home, homeForm(), "simple", "incident");
    const content = stringifyDoc(doc);

    expect(content).toContain("FORMULARZ PROSTY - DOM");
    expect(content).toContain("Krótki opis sytuacji.");
    expect(content).toContain("Przerwa i spokojne miejsce.");
    expect(content).not.toContain(environments.home.incidentTitle);
  });

  it("builds an incident PDF document with incident sections", () => {
    const doc = makeDoc(environments.home, homeForm(), "extended", "incident");
    const content = stringifyDoc(doc);

    expect(content).toContain(environments.home.incidentTitle);
    expect(content).toContain("0. Poziom bazowy i kontekst dnia");
    expect(content).toContain("1 podwyższony");
    expect(content).not.toContain(environments.home.mapTitle);
  });

  it("builds a map-only PDF document without incident title", () => {
    const doc = makeDoc(environments.home, homeForm(), "extended", "map");
    const content = stringifyDoc(doc);

    expect(content).toContain(environments.home.mapTitle);
    expect(content).toContain("Miejsca i aktywności");
    expect(content).toContain("Zabawa");
    expect(content).not.toContain(environments.home.incidentTitle);
  });

  it("downloads a generated PDF", () => {
    const setStatus = vi.fn();

    buildPdf({
      env: environments.home,
      form: homeForm(),
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

  it("opens a generated PDF", () => {
    const setStatus = vi.fn();

    buildPdf({
      env: environments.home,
      form: homeForm(),
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
