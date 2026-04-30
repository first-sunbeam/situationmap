import { formLabels } from "./formLabels";

function hasAnyValue(values) {
  return values.some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return String(value || "").trim() !== "";
  });
}

export const incidentStepDefinitions = [
  {
    id: "meta",
    label: formLabels.meta.section,
    errorKey: "meta.date",
    isComplete: (form) => hasAnyValue([
      form.meta.date,
      form.meta.time,
      form.meta.place,
      form.meta.lead,
      form.meta.present
    ])
  },
  {
    id: "baseline",
    label: formLabels.incident.baselineSection,
    errorKey: "incident.baselineSection",
    isComplete: (form) => hasAnyValue([
      form.incident.tension,
      form.incident.tired,
      form.incident.slept,
      form.incident.sleepDetails,
      form.incident.stayStage,
      form.incident.stayStageLoad,
      form.incident.burdens,
      form.incident.burdensOther
    ])
  },
  {
    id: "before",
    label: formLabels.incident.beforeSection,
    errorKey: "incident.beforeSection",
    isComplete: (form) => hasAnyValue([
      form.incident.antecedents,
      form.incident.factDescription
    ])
  },
  {
    id: "expectations",
    label: formLabels.incident.expectationsSection,
    errorKey: "incident.expectationsSection",
    isComplete: (form) => hasAnyValue([
      form.incident.expectations,
      form.incident.expectationOther
    ])
  },
  {
    id: "signals",
    label: formLabels.incident.signalsSection,
    errorKey: "incident.signalsSection",
    isComplete: (form) => form.incident.signalsAppeared === "Tak"
      ? hasAnyValue([form.incident.signals, form.incident.signalsOther])
      : hasAnyValue([
        form.incident.signalsAppeared,
        form.incident.signals,
        form.incident.signalsOther,
        form.incident.timeToEscalation,
        form.incident.firstSignal,
        form.incident.predicts
      ])
  },
  {
    id: "actions",
    label: formLabels.incident.actionsSection,
    errorKey: "incident.actionsSection",
    isComplete: (form) => hasAnyValue([
      form.incident.phase,
      form.incident.interventions,
      form.incident.interventionDetails,
      form.incident.unconditional,
      form.incident.usedRegulator,
      form.incident.reducedTension,
      form.incident.earlierPossible,
      form.incident.earlierWhat
    ])
  },
  {
    id: "behavior",
    label: formLabels.incident.behaviorSection,
    errorKey: "incident.behaviorSection",
    isComplete: (form) => hasAnyValue([
      form.incident.behavior,
      form.incident.intensity,
      form.incident.escalationDuration,
      form.incident.harms
    ])
  },
  {
    id: "after",
    label: formLabels.incident.afterSection,
    errorKey: "incident.afterSection",
    isComplete: (form) => hasAnyValue([
      form.incident.after,
      form.incident.afterOther,
      form.incident.calmTime,
      form.incident.physicalThisWeek,
      form.incident.physicalCount,
      form.incident.lowerThreshold,
      form.incident.physicalNote
    ])
  },
  {
    id: "regulation",
    label: formLabels.incident.regulationSection,
    errorKey: "incident.regulationSection",
    isComplete: (form) => hasAnyValue([
      form.incident.endedBy,
      form.incident.endedByOther,
      form.incident.worsened,
      form.incident.regulators,
      form.incident.rewards
    ])
  }
];
