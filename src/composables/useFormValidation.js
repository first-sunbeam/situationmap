function hasMapContent(map) {
  return map.rows.some((row) => row.time || row.activity)
    || [
      map.preferred,
      map.avoided,
      map.likes,
      map.easiestWhen,
      map.cooperatesWith,
      map.reducers,
      map.dependsDescription,
      map.escalationOther,
      map.noAggression,
      map.noAggressionWhere
    ].some((value) => String(value || "").trim())
    || map.dependsOn.length > 0
    || map.escalationContexts.length > 0;
}

function hasAnyValue(values) {
  return values.some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return String(value || "").trim() !== "";
  });
}

export function validateForm({ variant, mode, form }) {
  const fieldErrors = {};
  const summary = [];
  const meta = [
    ["meta.date", "Data", form.meta.date],
    ["meta.time", "Godzina", form.meta.time],
    ["meta.place", "Miejsce", form.meta.place],
    ["meta.lead", "Osoba prowadząca", form.meta.lead]
  ];

  if (variant === "simple" || mode !== "map") {
    for (const [key, label, value] of meta) {
      if (!String(value || "").trim()) {
        const message = `Uzupełnij pole: ${label}.`;
        fieldErrors[key] = message;
        summary.push(`Dane podstawowe: uzupełnij pole ${label.toLowerCase()}.`);
      }
    }
  }

  if (variant === "simple" && !String(form.simple.factDescription || "").trim()) {
    fieldErrors["simple.factDescription"] = "Uzupełnij krótki opis sytuacji.";
    summary.push("Formularz prosty: uzupełnij krótki opis sytuacji.");
  }

  if (variant === "simple" && !String(form.simple.helped || "").trim()) {
    fieldErrors["simple.helped"] = "Uzupełnij pole „Co pomogło obniżyć napięcie lub uspokoić sytuację?” albo wpisz, że nic nie pomogło.";
    summary.push("Formularz prosty: uzupełnij pole „Co pomogło obniżyć napięcie lub uspokoić sytuację?”.");
  }

  if (variant === "extended" && mode !== "map") {
    const sectionRules = [
      {
        key: "incident.baselineSection",
        summary: "Poziom bazowy i kontekst dnia: uzupełnij przynajmniej jedno pole.",
        message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
        valid: hasAnyValue([
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
        key: "incident.beforeSection",
        summary: "Bezpośrednio przed zdarzeniem: zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.",
        message: "Zaznacz przynajmniej jedną opcję albo wpisz opis sytuacji.",
        valid: hasAnyValue([form.incident.antecedents, form.incident.factDescription])
      },
      {
        key: "incident.expectationsSection",
        summary: "Czego oczekiwano w tym momencie: uzupełnij przynajmniej jedno pole.",
        message: "Zaznacz przynajmniej jedną opcję albo wpisz własną odpowiedź.",
        valid: hasAnyValue([form.incident.expectations, form.incident.expectationOther])
      },
      {
        key: "incident.signalsSection",
        summary: form.incident.signalsAppeared === "Tak"
          ? "Pierwsze oznaki narastającego napięcia: skoro sygnały się pojawiły, wskaż jakie."
          : "Pierwsze oznaki narastającego napięcia: uzupełnij przynajmniej jedno pole.",
        message: form.incident.signalsAppeared === "Tak"
          ? "Skoro sygnały się pojawiły, wskaż jakie."
          : "Uzupełnij przynajmniej jedno pole w tej sekcji.",
        valid: form.incident.signalsAppeared === "Tak"
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
        key: "incident.actionsSection",
        summary: "Działania: uzupełnij przynajmniej jedno pole.",
        message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
        valid: hasAnyValue([
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
        key: "incident.behaviorSection",
        summary: "Opis zachowania: uzupełnij przynajmniej jedno pole.",
        message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
        valid: hasAnyValue([
          form.incident.behavior,
          form.incident.intensity,
          form.incident.escalationDuration,
          form.incident.harms
        ])
      },
      {
        key: "incident.afterSection",
        summary: "Po zdarzeniu: uzupełnij przynajmniej jedno pole.",
        message: "Uzupełnij przynajmniej jedno pole w tej sekcji.",
        valid: hasAnyValue([
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
        key: "incident.regulationSection",
        summary: "Regulacja i wpływ: zaznacz, co najbardziej pomogło w tej sytuacji.",
        message: "Zaznacz, co najbardziej pomogło w tej sytuacji.",
        valid: hasAnyValue([form.incident.endedBy, form.incident.endedByOther])
      }
    ];

    for (const rule of sectionRules) {
      if (!rule.valid) {
        fieldErrors[rule.key] = rule.message;
        summary.push(rule.summary);
      }
    }

    if (fieldErrors["incident.beforeSection"]) {
      fieldErrors["incident.factDescription"] = fieldErrors["incident.beforeSection"];
    }
  }

  if (variant === "extended" && mode !== "incident" && !hasMapContent(form.map)) {
    fieldErrors.map = "Uzupełnij przynajmniej jedno pole w mapie środowiska.";
    summary.push("Uzupełnij przynajmniej jedno pole w mapie środowiska.");
  }

  return { fieldErrors, summary };
}
