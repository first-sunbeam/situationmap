import { afterEach, describe, expect, it, vi } from "vitest";
import { computed, effectScope, nextTick, reactive, ref } from "vue";
import { createForms, hydrateForm, loadState, useFormPersistence, STORAGE_KEY, LEGACY_BACKUP_KEY } from "../../src/composables/useFormPersistence";
import { getFormLabels } from "../../src/config/formLabels";
import { getMonitoringRevision } from "../../src/config/monitoringRevision";
import { formatInformationSources, getInformationSourceOptions, stageSourceTypeFields } from "../../src/config/sourceOptions";
import { getIncidentExportSections, getMapExportSections, getSimpleExportSection } from "../../src/config/exportSections";
import { getLegacyExportSections } from "../../src/config/legacyFields";
import { resolveRows } from "../../src/lib/exportUtils";
import { buildEmail } from "../../src/lib/email";
import { blankForm, environments } from "../../src/data/environments";
import { validateForm } from "../../src/composables/useFormValidation";
import type { IncidentFormData } from "../../src/types/form";

afterEach(() => vi.unstubAllGlobals());
const newIncidentKeys: Array<keyof IncidentFormData> = [
  "tensionSigns", "signalsInOtherRecords", "sleepEnough", "continuedObservation", "personAccount", "laterObservation", "maskingHypothesis",
  "supportConditional", "earlyResponse", "earlyResponseSources", "escalationCourse", "escalationSources", "postEscalationNeeds", "postEscalationSources", "behaviorMeasure", "observedHarms",
  "consequencesDescription", "potentialRisk", "behaviorDuration", "tensionReductionDetails", "readinessDetails",
  "physicalDuringEvent", "eventPhysicalCount", "eventPhysicalNote",
  "earlyResponseSourceTypes", "escalationSourceTypes", "postEscalationSourceTypes",
];

describe("revised monitoring records", () => {
  it.each(["pl", "en"] as const)("exports selected sources with localized labels and keeps free-text details (%s)", (language) => {
    const revision = getMonitoringRevision(language);
    expect(getInformationSourceOptions(language).map((option) => option.code)).toEqual(["O", "P", "R", "H"]);
    expect(formatInformationSources(["future-code"], language)).toEqual(["future-code"]);
    for (const scope of ["simple", "incident"] as const) {
      const form = blankForm(environments.home);
      for (const field of Object.values(stageSourceTypeFields)) form[scope][field] = ["O", "P", "R", "H"];
      form[scope].earlyResponseSources = "Szczegóły źródeł — bez zmiany treści.";
      const rows = scope === "simple" ? getSimpleExportSection(getFormLabels(language), language).rows : getIncidentExportSections(environments.home, getFormLabels(language)).flatMap((section) => section.rows);
      const resolved = resolveRows(environments.home, form, rows, (label, value) => ({ label, value }), language);
      for (const stage of Object.keys(stageSourceTypeFields) as Array<keyof typeof stageSourceTypeFields>) {
        expect(resolved.find((row) => row.label === `${revision.stageSources} — ${revision.stageNames[stage]}`)?.value).toEqual(Object.values(revision.sourceOptions));
      }
      expect(JSON.stringify(resolved)).toContain(form[scope].earlyResponseSources);
      const email = buildEmail({ env: environments.home, form, variant: scope === "simple" ? "simple" : "extended", mode: "incident", language });
      for (const label of Object.values(revision.sourceOptions)) expect(email.body).toContain(label);
    }
  });

  it("clones source selections on hydration without sharing arrays between stages or forms", () => {
    const saved = blankForm(environments.home);
    saved.simple.earlyResponseSourceTypes = ["O"];
    saved.incident.escalationSources = "R — dawna relacja";
    const restored = hydrateForm("home", saved);
    restored.simple.earlyResponseSourceTypes.push("P");
    expect(saved.simple.earlyResponseSourceTypes).toEqual(["O"]);
    expect(restored.simple.escalationSourceTypes).toEqual([]);
    expect(restored.incident.earlyResponseSourceTypes).toEqual([]);
    expect(restored.incident.escalationSourceTypes).toEqual([]);
    expect(restored.incident.escalationSources).toBe(saved.incident.escalationSources);
  });
  it.each(["home", "center", "school"] as const)("keeps old answers unchanged without guessing new answers (%s)", (key) => {
    const saved = { simple: { recoveryTime: "10_30_minut", earlyResponseSources: "O — dawny opis źródeł" }, incident: {
      slept: "yes", physicalThisWeek: "yes", physicalCount: "5", unconditional: "yes", reducedTension: "yes",
      intensity: "3_wysokie_ryzyko", calmTime: "5_15_minut", cognitiveRecoveryTime: "1_2_godziny_po",
      maskingStrategies: ["lek_przed_konsekwencjami_strach_przed_ocena_kara_rozczarowaniem"],
    }, map: { noAggression: "yes", noAggressionWhere: "Dawny opis.", preferredReason: "Dawna hipoteza", avoidedReason: "Dawne wyjaśnienie", cooperatesWith: "Dawna współpraca", energySources: "Dawna interpretacja motywacji", safeBase: "Dawne poczucie bezpieczeństwa" } };
    const form = hydrateForm(key, saved);
    expect(form.simple.recoveryTime).toBe(saved.simple.recoveryTime);
    expect(form.incident).toMatchObject(saved.incident);
    expect(form.map).toMatchObject(saved.map);
    expect(form.simple.readinessDetails).toBe("");
    const defaults = blankForm(environments[key]);
    for (const field of newIncidentKeys) expect(form.incident[field]).toEqual(defaults.incident[field]);
    expect(form.simple.earlyResponseSources).toBe(saved.simple.earlyResponseSources);
    expect(form.simple.earlyResponseSourceTypes).toEqual([]);
    expect(form.incident.escalationSourceTypes).toEqual([]);
    expect(form.map.similarWithoutEscalation).toBe("");
    expect(form.map.comparisonDetails).toBe("");
    for (const field of ["preferredObservations", "avoidedObservations", "chosenContact", "restorationSources", "restConditions"] as const) expect(form.map[field]).toBe("");
    const validation = validateForm({ variant: "extended", mode: "incident", form });
    expect(validation.fieldErrors["incident.eventPhysicalCount"]).toBeUndefined();
    expect(validation.fieldErrors["incident.sleepDetails"]).toBeUndefined();
    const legacy = getLegacyExportSections(form, "extended", "incident", "pl");
    const text = JSON.stringify(resolveRows(environments[key], form, legacy[0].rows, (label, value) => ({ label, value })));
    expect(text).toContain("w tym tygodniu");
    expect(text).toContain("3 wysokie ryzyko");
  });

  it("backs up the exact old payload before saving, and restores new fields on the next load", async () => {
    const storage = new Map<string, string>();
    vi.stubGlobal("localStorage", { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => storage.set(key, value) });
    vi.stubGlobal("window", { setTimeout, clearTimeout });
    const forms = createForms();
    forms.home.incident.physicalThisWeek = "yes";
    forms.home.incident.physicalCount = "7";
    forms.school.simple.behavior = "O — dane szkolne bez zmian.";
    const original = JSON.stringify({ activeEnvKey: "home", activeVariant: "simple", activeMode: "incident", forms });
    storage.set(STORAGE_KEY, original);
    const restored = loadState();
    const live = reactive(restored.forms);
    const scope = effectScope();
    scope.run(() => useFormPersistence({ activeEnvKey: ref("home"), activeVariant: ref("simple"), activeMode: ref("incident"), forms: live, status: ref(""), labels: computed(() => getFormLabels("pl")) }));
    live.home.incident.physicalDuringEvent = "no";
    live.home.simple.earlyResponseSourceTypes = ["O", "P"];
    live.home.incident.escalationSourceTypes = ["R", "H"];
    live.home.simple.readinessDetails = "Nie zaobserwowano do końca obserwacji o 13:00.";
    await nextTick();
    expect(storage.get(LEGACY_BACKUP_KEY)).toBe(original);
    expect(loadState().forms.home.simple.earlyResponseSourceTypes).toEqual(["O", "P"]);
    expect(loadState().forms.home.incident.escalationSourceTypes).toEqual(["R", "H"]);
    expect(loadState().forms.home.incident.physicalCount).toBe("7");
    expect(loadState().forms.home.incident.physicalThisWeek).toBe("yes");
    expect(loadState().forms.home.incident.physicalDuringEvent).toBe("no");
    expect(loadState().forms.school.simple.behavior).toBe(forms.school.simple.behavior);
    expect(loadState().forms.home.simple.readinessDetails).toContain("13:00");
    live.home.simple.notes = "Nowy wpis";
    await nextTick();
    expect(storage.get(LEGACY_BACKUP_KEY)).toBe(original);
    scope.stop();
  });

  it("does not overwrite previous data when the backup cannot be saved", async () => {
    const original = JSON.stringify({ forms: { home: { incident: { physicalCount: "8" } } } });
    const storage = new Map([[STORAGE_KEY, original]]);
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        if (key === LEGACY_BACKUP_KEY) throw new Error("quota");
        storage.set(key, value);
      },
    });
    vi.stubGlobal("window", { setTimeout, clearTimeout });
    const forms = reactive(loadState().forms);
    const status = ref("");
    const scope = effectScope();
    scope.run(() => useFormPersistence({ activeEnvKey: ref("home"), activeVariant: ref("simple"), activeMode: ref("incident"), forms, status, labels: computed(() => getFormLabels("pl")) }));
    forms.home.simple.behavior = "Nowy opis";
    await nextTick();
    expect(storage.get(STORAGE_KEY)).toBe(original);
    expect(status.value).toContain("Nie udało się zapisać");
    scope.stop();
  });

  it.each(["null", "not valid JSON"])("preserves even malformed old payloads before replacing them (%s)", async (original) => {
    const storage = new Map([[STORAGE_KEY, original]]);
    vi.stubGlobal("localStorage", { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => storage.set(key, value) });
    vi.stubGlobal("window", { setTimeout, clearTimeout });
    const forms = reactive(loadState().forms);
    const scope = effectScope();
    scope.run(() => useFormPersistence({ activeEnvKey: ref("home"), activeVariant: ref("simple"), activeMode: ref("incident"), forms, status: ref(""), labels: computed(() => getFormLabels("pl")) }));
    forms.home.simple.behavior = "Nowy opis";
    await nextTick();
    expect(storage.get(LEGACY_BACKUP_KEY)).toBe(original);
    expect(loadState().forms.home.simple.behavior).toBe("Nowy opis");
    scope.stop();
  });

  it.each(["pl", "en"] as const)("exports every new incident field without merging the three time measures (%s)", (language) => {
    const form = blankForm(environments.home);
    for (const field of newIncidentKeys) {
      Object.assign(form.incident, { [field]: Array.isArray(form.incident[field]) ? [`Żółć-${field}`] : `Żółć-${field}` });
    }
    const sections = getIncidentExportSections(environments.home, getFormLabels(language));
    const rows = resolveRows(environments.home, form, sections.flatMap((section) => section.rows), (label, value) => ({ label, value }), language);
    const email = buildEmail({ env: environments.home, form, variant: "extended", mode: "incident", language });
    for (const field of newIncidentKeys) {
      expect(JSON.stringify(rows)).toContain(`Żółć-${field}`);
      expect(email.body).toContain(`Żółć-${field}`);
    }
    expect(sections.flatMap((section) => section.rows).find((row) => row.value(environments.home, form) === "Żółć-readinessDetails")?.hint).toContain(language === "pl" ? "od zakończenia" : "after the described behavior ended");
  });

  it.each(["pl", "en"] as const)("keeps previous help summaries in the archive, separate from current stage fields (%s)", (language) => {
    const form = blankForm(environments.home);
    form.incident.endedBy = ["other"];
    form.incident.endedByOther = "OLD-ENDED";
    form.incident.recoverySupports = ["other"];
    form.incident.recoverySupportsOther = "OLD-RECOVERY";
    form.incident.assessmentBasis = "OLD-SUMMARY";
    form.incident.actionSequence = "OLD-ACTIONS";
    form.incident.earlyResponse = "NEW-EARLY";
    form.incident.escalationCourse = "NEW-ESCALATION";
    form.incident.postEscalationNeeds = "NEW-AFTER";
    const rows = getIncidentExportSections(environments.home, getFormLabels(language)).flatMap((section) => section.rows);
    const current = JSON.stringify(resolveRows(environments.home, form, rows, (label, value) => ({ label, value }), language));
    for (const marker of ["NEW-EARLY", "NEW-ESCALATION", "NEW-AFTER"]) expect(current).toContain(marker);
    for (const marker of ["OLD-ENDED", "OLD-RECOVERY", "OLD-SUMMARY", "OLD-ACTIONS"]) expect(current).not.toContain(marker);
    const archive = JSON.stringify(getLegacyExportSections(form, "extended", "incident", language).flatMap((section) => resolveRows(environments.home, form, section.rows, (label, value) => ({ label, value }), language)));
    for (const marker of ["OLD-ENDED", "OLD-RECOVERY", "OLD-SUMMARY", "OLD-ACTIONS"]) expect(archive).toContain(marker);
    expect(form.incident.earlyResponse).toBe("NEW-EARLY");
  });

  it("exports simple readiness and map dates/comparisons, not old no-aggression answers under new labels", () => {
    const form = blankForm(environments.home);
    form.simple.readinessDetails = "P — chce czytać; ok. 8 min od końca zachowania.";
    form.map.observationPeriod = "01–07.10.2026";
    form.map.updatedAt = "2026-10-08";
    form.map.similarWithoutEscalation = "not_sure";
    form.map.comparisonDetails = "Brak danych o liczbie okazji.";
    form.map.noAggression = "yes";
    const simple = JSON.stringify(resolveRows(environments.home, form, getSimpleExportSection().rows, (label, value) => ({ label, value })));
    const map = JSON.stringify(resolveRows(environments.home, form, getMapExportSections().flatMap((section) => section.rows), (label, value) => ({ label, value })));
    expect(simple).toContain(form.simple.readinessDetails);
    expect(map).toContain("01–07.10.2026");
    expect(map).toContain("2026-10-08");
    expect(map).toContain("Nie wiem");
    expect(form.map.noAggression).toBe("yes");
    expect(map).not.toContain("bez agresji");
    expect(map).toContain(form.map.comparisonDetails);
  });
});
