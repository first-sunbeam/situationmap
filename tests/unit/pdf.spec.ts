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

describe("PDF generation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("builds a simple-form PDF document with form data", () => {
    const content = stringifyDoc(makeDoc(environments.home, createFilledHomeForm(), "simple", "incident"));

    expect(content).toContain("FORMULARZ PROSTY - DOM");
    expect(content).toContain("Protest, płacz i odmowa przejścia do kolejnej aktywności.");
    expect(content).toContain("Przerwa i spokojne miejsce.");
    expect(content).not.toContain(environments.home.incidentTitle);
  });

  it("builds an incident-report PDF document with incident sections", () => {
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

  it("omits dependent masking fields in the PDF when No is selected", () => {
    const form = createFilledHomeForm();
    form.incident.maskingContinued = "no";
    form.incident.maskingStrategies = ["maskowanie_ukrywanie_dyskomfortu_udawanie_ze_wszystko_ok"];
    form.incident.maskingDuration = "10_30_minut";

    const content = stringifyDoc(makeDoc(environments.home, form, "extended", "incident"));

    expect(content).toContain("Czy osoba próbowała kontynuować aktywność mimo narastającego napięcia?");
    expect(content).toContain("Nie");
    expect(content).not.toContain("Jeśli tak – co pozwoliło osobie");
    expect(content).not.toContain("Ile czasu osoba „trzymała się” przed eskalacją?");
    expect(content).not.toContain("10-30 minut");
  });

  it("builds a map-only PDF document without the incident title", () => {
    const content = stringifyDoc(makeDoc(environments.home, createFilledHomeForm(), "extended", "map"));

    expect(content).toContain(environments.home.mapTitle);
    expect(content).toContain("1. Miejsca i preferowane przestrzenie");
    expect(content).toContain("Pokój osoby");
    expect(content).not.toContain(environments.home.incidentTitle);
  });

  it("builds an English PDF document and translates option values", () => {
    const content = stringifyDoc(makeDoc(environments.home, createFilledHomeForm(), "extended", "incident", "en"));

    expect(content).toContain("SITUATION MONITORING REPORT - HOME");
    expect(content).toContain("Baseline and daily context");
    expect(content).toContain("Was it clear what would happen?");
    expect(content).toContain("1 elevated");
    expect(content).toContain("Silence and no stimuli");
    expect(content).not.toContain("KARTA MONITOROWANIA");
  });

  it("downloads the generated PDF", () => {
    const setStatus = vi.fn();

    buildPdf({
      env: environments.home,
      form: createFilledHomeForm(),
      variant: "simple",
      mode: "incident",
      modeLabel: "formularz prosty",
      language: "pl",
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

  it("sets the English status after downloading the PDF", () => {
    const setStatus = vi.fn();

    buildPdf({
      env: environments.home,
      form: createFilledHomeForm(),
      variant: "simple",
      mode: "incident",
      modeLabel: "simple form",
      language: "en",
      action: "download",
      setStatus,
    });

    expect(setStatus).toHaveBeenCalledWith("PDF ready — downloaded (simple form).");
  });

  it("opens the generated PDF", () => {
    const setStatus = vi.fn();

    buildPdf({
      env: environments.home,
      form: createFilledHomeForm(),
      variant: "extended",
      mode: "incident",
      modeLabel: "karta zdarzenia",
      language: "pl",
      action: "open",
      setStatus,
    });

    expect(pdfMakeMock.createPdfMock).toHaveBeenCalledOnce();
    expect(pdfMakeMock.openMock).toHaveBeenCalledOnce();
    expect(pdfMakeMock.downloadMock).not.toHaveBeenCalled();
    expect(setStatus).toHaveBeenCalledWith("PDF gotowy — został otwarty w nowej karcie.");
  });
});
