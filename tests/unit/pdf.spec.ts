import { beforeEach, describe, expect, it, vi } from "vitest";
import { environments } from "../../src/data/environments";
import { buildPdf, makeDoc } from "../../src/lib/pdf";
import { createFilledHomeForm } from "./helpers/formFixtures";

// ── Mock pdfmake ──────────────────────────────────────────────────────────────

const pdfMakeMock = vi.hoisted(() => {
  const downloadMock = vi.fn();
  const openMock = vi.fn();
  const createPdfMock = vi.fn(() => ({ download: downloadMock, open: openMock }));
  return { createPdfMock, downloadMock, openMock };
});

vi.mock("pdfmake/build/pdfmake", () => ({
  default: { createPdf: pdfMakeMock.createPdfMock },
}));

vi.mock("pdfmake/build/vfs_fonts", () => ({
  default: { vfs: {} },
}));

// ── Helper ────────────────────────────────────────────────────────────────────

function stringifyDoc(doc: Record<string, unknown>): string {
  return JSON.stringify(doc.content);
}

// ── Testy ─────────────────────────────────────────────────────────────────────

describe("generowanie PDF", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("buduje dokument PDF formularza prostego z danymi formularza", () => {
    const content = stringifyDoc(makeDoc(environments.home, createFilledHomeForm(), "simple", "incident"));

    expect(content).toContain("FORMULARZ PROSTY - DOM");
    expect(content).toContain("Protest, płacz i odmowa przejścia do kolejnej aktywności.");
    expect(content).toContain("Przerwa i spokojne miejsce.");
    expect(content).not.toContain(environments.home.incidentTitle);
  });

  it("buduje dokument PDF karty zdarzenia z sekcjami incydentu", () => {
    const content = stringifyDoc(makeDoc(environments.home, createFilledHomeForm(), "extended", "incident"));

    expect(content).toContain(environments.home.incidentTitle);
    expect(content).toContain("0. Poziom bazowy i kontekst dnia");
    expect(content).toContain("Czy było wiadomo, co się wydarzy?");
    expect(content).toContain("Czas trwania eskalacji");
    expect(content).toContain("15 minut");
    expect(content).toContain("Czas do pełnego uspokojenia emocjonalnego");
    expect(content).toContain("1 podwyższony");
    expect(content).not.toContain(environments.home.mapTitle);
  });

  it("buduje dokument PDF samej mapy bez tytułu incydentu", () => {
    const content = stringifyDoc(makeDoc(environments.home, createFilledHomeForm(), "extended", "map"));

    expect(content).toContain(environments.home.mapTitle);
    expect(content).toContain("1. Miejsca i preferowane przestrzenie");
    expect(content).toContain("Pokój dziecka");
    expect(content).not.toContain(environments.home.incidentTitle);
  });

  it("pobiera wygenerowany PDF", () => {
    const setStatus = vi.fn();

    buildPdf({
      env: environments.home,
      form: createFilledHomeForm(),
      variant: "simple",
      mode: "incident",
      modeLabel: "formularz prosty",
      action: "download",
      setStatus,
    });

    expect(pdfMakeMock.createPdfMock).toHaveBeenCalledOnce();
    expect(pdfMakeMock.downloadMock).toHaveBeenCalledWith(
      expect.stringMatching(/^monitorowanie-dom-\d{4}-\d{2}-\d{2}\.pdf$/)
    );
    expect(pdfMakeMock.openMock).not.toHaveBeenCalled();
    expect(setStatus).toHaveBeenCalledWith("PDF gotowy — został pobrany (formularz prosty).");
  });

  it("otwiera wygenerowany PDF", () => {
    const setStatus = vi.fn();

    buildPdf({
      env: environments.home,
      form: createFilledHomeForm(),
      variant: "extended",
      mode: "incident",
      modeLabel: "karta zdarzenia",
      action: "open",
      setStatus,
    });

    expect(pdfMakeMock.createPdfMock).toHaveBeenCalledOnce();
    expect(pdfMakeMock.openMock).toHaveBeenCalledOnce();
    expect(pdfMakeMock.downloadMock).not.toHaveBeenCalled();
    expect(setStatus).toHaveBeenCalledWith("PDF gotowy — został otwarty w nowej karcie.");
  });
});
