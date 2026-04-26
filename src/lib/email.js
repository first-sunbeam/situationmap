function line(label, value) {
  const text = Array.isArray(value) ? value.filter(Boolean).join(", ") : value;
  return `${label}: ${text && String(text).trim() ? text : "-"}`;
}

function section(title, rows) {
  return [title, ...rows, ""].join("\n");
}

function mapRows(rows) {
  const filled = rows.filter((row) => row.time || row.activity);
  if (!filled.length) return "-";
  return filled
    .map((row) => `- ${row.place}: czas ${row.time || "-"}, aktywność ${row.activity || "-"}`)
    .join("\n");
}

export function buildEmail({ env, form, variant, mode }) {
  const subject = `Formularz monitorowania - ${env.label} - ${variant === "simple" ? "prosty" : "rozszerzony"}`;
  const parts = [
    `Środowisko: ${env.label}`,
    `Wersja formularza: ${variant === "simple" ? "prosta" : "rozszerzona"}`,
    ""
  ];

  if (variant === "simple") {
    parts.push(
      section("Dane podstawowe", [
        line("Data", form.meta.date),
        line("Godzina", form.meta.time),
        line("Miejsce", form.meta.place),
        line(env.lead, form.meta.lead),
        line("Inne osoby obecne", form.meta.present)
      ]),
      section("Opis sytuacji", [
        line("Krótki opis sytuacji", form.simple.factDescription),
        line("Co wydarzyło się tuż przed", form.simple.antecedents),
        line("Jakie były pierwsze sygnały", form.simple.signals),
        line("Co zrobiono", form.simple.interventions),
        line("Opis zachowania", form.simple.behavior),
        line("Co pomogło", form.simple.helped),
        line("Dodatkowe uwagi", form.simple.notes)
      ])
    );
  } else {
    if (mode !== "map") {
      parts.push(
        section("Karta zdarzenia", [
          line("Data", form.meta.date),
          line("Godzina", form.meta.time),
          line("Miejsce", form.meta.place),
          line(env.lead, form.meta.lead),
          line("Inne osoby obecne", form.meta.present),
          line("Poziom napięcia", form.incident.tension),
          line("Zmęczenie / senność", form.incident.tired),
          line("Sen / odpoczynek", form.incident.slept),
          line("Szczegóły snu", form.incident.sleepDetails),
          line("Czynniki obciążające", form.incident.burdens),
          line("Inne czynniki obciążające", form.incident.burdensOther),
          line("Co działo się przed", form.incident.antecedents),
          line("Doprecyzowanie", form.incident.antecedentsDetails),
          line("Opis sytuacji", form.incident.factDescription),
          line("Oczekiwania", form.incident.expectations),
          line("Inne oczekiwania", form.incident.expectationOther),
          line("Czy były sygnały", form.incident.signalsAppeared),
          line("Sygnały", form.incident.signals),
          line("Inne sygnały", form.incident.signalsOther),
          line("Czas do eskalacji", form.incident.timeToEscalation),
          line("Pierwszy sygnał", form.incident.firstSignal),
          line("Czy zapowiada trudne zachowanie", form.incident.predicts),
          line("Faza regulacyjna", form.incident.phase),
          line("Działania przed eskalacją", form.incident.interventions),
          line("Doprecyzowanie działań", form.incident.interventionDetails),
          line("Dostępne bez warunku", form.incident.unconditional),
          line("Czy skorzystał(a)", form.incident.usedRegulator),
          line("Czy obniżyło napięcie", form.incident.reducedTension),
          line("Czy można było zareagować wcześniej", form.incident.earlierPossible),
          line("Co było możliwe wcześniej", form.incident.earlierWhat),
          line("Opis zachowania", form.incident.behavior),
          line("Intensywność", form.incident.intensity),
          line("Czas trwania eskalacji", form.incident.escalationDuration),
          line("Czy doszło do", form.incident.harms),
          line("Co wydarzyło się po zdarzeniu", form.incident.after),
          line("Inne po zdarzeniu", form.incident.afterOther),
          line("Czas do pełnego uspokojenia", form.incident.calmTime),
          line("Interwencja fizyczna w tym tygodniu", form.incident.physicalThisWeek),
          line("Ile razy", form.incident.physicalCount),
          line("Niższy próg / szybsza reakcja", form.incident.lowerThreshold),
          line("Notatka o interwencji fizycznej", form.incident.physicalNote),
          line("Co pomogło obniżyć napięcie", form.incident.helped),
          line("Co zakończyło / obniżyło zachowanie", form.incident.endedBy),
          line("Inne zakończenie", form.incident.endedByOther),
          line("Co mogło nasilić napięcie", form.incident.worsened),
          line("Co obniżało napięcie / regulatory", form.incident.regulators),
          line("Co było zachętą / nagrodą", form.incident.rewards)
        ])
      );
    }

    if (mode !== "incident") {
      parts.push(
        section("Mapa środowiska", [
          `Miejsca i aktywności:\n${mapRows(form.map.rows)}`,
          line("Chętnie przebywa w", form.map.preferred),
          line("Unika / wychodzi z trudem z", form.map.avoided),
          line("Najchętniej angażuje się w", form.map.likes),
          line("Najłatwiej funkcjonuje, gdy", form.map.easiestWhen),
          line("Najłatwiej współpracuje z", form.map.cooperatesWith),
          line("Co obniża napięcie", form.map.reducers),
          line("Zachowanie zależy od", form.map.dependsOn),
          line("Opis zależności", form.map.dependsDescription),
          line("Najczęstsze sytuacje eskalacji", form.map.escalationContexts),
          line("Inne sytuacje eskalacji", form.map.escalationOther),
          line("Czy są sytuacje bez agresji", form.map.noAggression),
          line("Jakie", form.map.noAggressionWhere)
        ])
      );
    }
  }

  return {
    subject,
    body: parts.join("\n")
  };
}

export function openEmail(email) {
  window.location.href = `mailto:kontakt@autyzm.poznan.pl?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
}
