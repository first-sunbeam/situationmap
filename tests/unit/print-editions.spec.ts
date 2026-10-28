import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getMonitoringRevision } from "../../src/config/monitoringRevision";
import { getAboutPageContent } from "../../src/config/aboutPage";

function source(name: string): string {
  return readFileSync(new URL(`../../public/pdf/${name}.typ`, import.meta.url), "utf8");
}
const forms = source("blank-monitoring-forms");
const guide = source("how-to-use-monitoring-forms");
const polishGuide = source("jak-korzystac-z-formularzy-monitorowania");

describe("updated printable editions", () => {
  it.each(["pl", "en"] as const)("uses the agreed three stage questions and source fields in both simple and extended print forms (%s)", (language) => {
    const text = source(language === "pl" ? "puste-formularze-monitorowania" : "blank-monitoring-forms");
    const revision = getMonitoringRevision(language);
    for (const stage of ["earlyResponse", "escalationCourse", "postEscalationNeeds"] as const) {
      expect(text.split(revision[stage])).toHaveLength(3); // one question in each variant
    }
    expect(text).toContain(revision.stageHint);
    expect(text).toContain(revision.stageSources);
    for (const label of Object.values(revision.sourceOptions)) expect(text).toContain(label);
    expect(text).toContain(revision.sourceDetails);
    expect(text).toContain('#v(0.65em, weak: false)');
    const stageField = text.split('#let stage-field(')[1].split('#let section(')[0];
    expect(stageField.indexOf(revision.stageSources)).toBeLessThan(stageField.indexOf(revision.sourceDetails));
    expect(stageField.indexOf(revision.sourceDetails)).toBeLessThan(stageField.indexOf('#area(question'));
    const simple = text.split(language === "pl" ? "= Formularz prosty" : "= Simple form")[1].split(language === "pl" ? "= Formularz rozszerzony" : "= Extended form")[0];
    expect(simple.match(/#(?:area|stage-field)\(/g)).toHaveLength(9);
    for (const removed of ["Co pomogło lub mogło pomóc zakończyć eskalację?", "Co pomogło lub mogło pomóc wrócić do gotowości?", "Podstawa oceny: co pomogło / przeszkodziło?", "What helped or may have helped end the escalation?", "What helped or may have helped regain readiness?", "Basis for judging what helped / hindered"]) expect(text).not.toContain(removed);
  });

  it.each(["pl", "en"] as const)("keeps page breaks only between independent forms and after the guide contents (%s)", (language) => {
    const printedForms = source(language === "pl" ? "puste-formularze-monitorowania" : "blank-monitoring-forms");
    const instruction = source(language === "pl" ? "jak-korzystac-z-formularzy-monitorowania" : "how-to-use-monitoring-forms");
    expect(printedForms.match(/#pagebreak\(\)/g)).toHaveLength(3);
    expect(instruction.match(/#pagebreak\(\)/g)).toHaveLength(1);
    expect(printedForms).toContain("stage-field(question, stage, height: 2cm) = block(breakable: false)");
    expect(printedForms).toContain("#block(sticky: true");
    expect(instruction).toContain("table.header(");
  });

  it("keeps the revised English observation, measurement and map questions", () => {
    for (const label of ["including AAC", "Individual signs supporting the tension rating", "Observed changes in body and movement", "Observed reduction in contact or activity", "Observed responses to surroundings", "Continuing activity, compensation and possible masking", "Was access to support conditional on following an instruction?", "Observed consequences / harm", "Duration of the described behavior", "Reduction in observed signs of tension", "Was there physical intervention during this event?", "Observation period covered by the map", "Map update date", "Do similar situations occur without the described escalation?"]) expect(forms).toContain(label);
    expect(forms).not.toContain("minuteses");
    expect(forms).not.toContain("physical intervention this week");
    expect(forms).not.toContain('"0 no aggression"');
  });

  it("explains source fields, separate time anchors, uncertainty and theoretical rather than validation evidence in English", () => {
    for (const text of ["= Recording and assessment", "= Environment map", "Each stage starts with O/P/R/H source checkboxes and optional details", "including AAC", "How many minutes after that behavior started", "How many minutes after that behavior ended", "8 minutes after the shouting started", "10 minutes after the shouting ended", "beginning to respond to communication", "Repeated association does not establish causality", "not validation of this form"]) expect(guide).toContain(text);
    expect(guide).not.toContain("Shows the cost of maintaining");
  });

  it.each(["polish", "english", "english-forms"])("uses clarified wording without the rejected training preface (%s)", (edition) => {
    const text = edition === "english" ? guide : edition === "polish" ? polishGuide : forms;
    expect(text).not.toContain("Wersja uporządkowana przed szkoleniem.");
    expect(text).not.toContain("Nie wymagamy eksperymentu przed udzieleniem wsparcia.");
    expect(text).not.toContain("An experiment is not required before offering support");
    expect(text).not.toContain("Brak krzyku ani kontakt nie oznaczają zgody na zadanie.");
    if (edition === "polish") {
      expect(text).toContain("Można udzielić wsparcia, zanim ustalimy przyczynę trudności.");
      expect(text).toContain("Po ilu minutach od rozpoczęcia tego zachowania");
      expect(text).toContain("Po ilu minutach od zakończenia tego zachowania");
      expect(text).toContain("zaczęła odpowiadać na komunikaty");
    }
  });

  it("omits the removed bibliography-verification note from the print and website editions", () => {
    const content = [forms, guide, polishGuide, source("puste-formularze-monitorowania"), JSON.stringify(getAboutPageContent("pl")), JSON.stringify(getAboutPageContent("en"))];
    for (const text of content) {
      expect(text).not.toContain("Dane bibliograficzne zachowano zgodnie z instrukcją; nie weryfikowano ich niezależnie.");
      expect(text).not.toContain("have not been independently verified");
    }
  });

  it("preserves all seven references from the current Polish guide in both English documents", () => {
    const references = polishGuide.split("Najważniejsze źródła:\n")[1].split("#v(2em)")[0].split("\n").filter((line) => line.startsWith("- ")).map((line) => line.slice(2));
    expect(references).toHaveLength(7);
    for (const reference of references) { expect(forms).toContain(reference); expect(guide).toContain(reference); }
    expect(guide).not.toContain("Allen et al.");
    expect(guide).not.toContain("Mathur,");
  });
});
