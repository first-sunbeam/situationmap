import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { getFormLabels } from "../../../src/config/formLabels";
import { getMonitoringRevision } from "../../../src/config/monitoringRevision";

for (const language of ["pl", "en"] as const) {
  test(`mobile ${language}: validate, complete all stages, restore the record and download the filled PDF`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    if (language === "en") await page.getByRole("button", { name: "Switch language to English", exact: true }).click();
    const labels = getFormLabels(language);
    const revision = getMonitoringRevision(language);
    expect(page.viewportSize()?.width).toBeLessThan(500);
    await page.getByRole("button", { name: labels.ui.downloadPdf, exact: true }).first().tap();
    await expect(page.getByText(language === "pl" ? "Popraw formularz przed wygenerowaniem PDF." : "Correct the form before generating the PDF.", { exact: true })).toBeVisible();
    await page.locator('input[type="date"]').fill("2026-10-28");
    await page.locator('input[type="time"]').fill("12:00");
    await page.getByLabel(labels.meta.place).fill("Dom / Home — Żółć");
    await page.getByLabel(labels.environments.home.lead).fill("Osoba obserwująca / Observer");
    await page.getByLabel(labels.ui.decisionPossibilityFor).fill(language === "pl" ? "Przerwa była dostępna bez warunków." : "A break was available without conditions.");
    const values = language === "pl" ? {
      earlyResponse: "O — wyłączono radio. P — AAC: za jasno.",
      escalationCourse: "O — odsunęła krzesło, zasłoniła oczy. Przyciemniono światło; po 3 minutach opuściła dłonie.",
      postEscalationNeeds: "P — poprosiła o przerwę; zapewniono spokojne miejsce. O — o 12:15 wybrała książkę i zaczęła czytać.",
    } : {
      earlyResponse: "O — the radio was turned off. P — AAC: too bright.",
      escalationCourse: "O — pushed the chair back and covered their eyes. The light was dimmed; 3 minutes later they lowered their hands.",
      postEscalationNeeds: "P — requested a break; a quiet place was provided. O — at 12:15 they chose a book and started reading.",
    };
    for (const stage of ["earlyResponse", "escalationCourse", "postEscalationNeeds"] as const) {
      await page.getByLabel(revision[stage]).fill(values[stage]);
      const group = page.getByRole("group", { name: `${revision.stageSources} — ${revision.stageNames[stage]}`, exact: true });
      for (const code of ["O", "P"] as const) await group.getByText(revision.sourceOptions[code], { exact: true }).tap();
      await page.getByLabel(`${revision.sourceDetails} — ${revision.stageNames[stage]}`, { exact: true }).fill("O — Observer; P — AAC");
    }
    await page.getByLabel(revision.readinessTiming).fill("12:15 — estimate / szacunek");
    await page.reload();
    for (const stage of ["earlyResponse", "escalationCourse", "postEscalationNeeds"] as const) {
      await expect(page.getByLabel(revision[stage])).toHaveValue(values[stage]);
      const group = page.getByRole("group", { name: `${revision.stageSources} — ${revision.stageNames[stage]}`, exact: true });
      for (const code of ["O", "P"] as const) await expect(group.getByRole("checkbox", { name: revision.sourceOptions[code], exact: true })).toBeChecked();
      for (const code of ["R", "H"] as const) await expect(group.getByRole("checkbox", { name: revision.sourceOptions[code], exact: true })).not.toBeChecked();
    }
    await expect(page.getByText(language === "pl" ? "Popraw formularz przed wygenerowaniem PDF." : "Correct the form before generating the PDF.", { exact: true })).not.toBeVisible();
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: labels.ui.downloadPdf, exact: true }).first().tap();
    const download = await downloadPromise;
    const output = info.outputPath(`filled-${language}-mobile.pdf`);
    await download.saveAs(output);
    const bytes = await readFile(output);
    expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
    expect(bytes.length).toBeGreaterThan(10000);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    await page.screenshot({ path: info.outputPath(`mobile-${language}.png`), fullPage: true });
  });
}
