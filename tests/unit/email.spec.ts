import { describe, expect, it } from "vitest";
import { environments } from "../../src/data/environments";
import { buildEmail } from "../../src/lib/email";
import {
  createHomeForm,
  fillMapForm,
  fillRequiredMeta,
  fillSimpleForm,
} from "./helpers/formFixtures";

describe("email message building", () => {
  it("builds subject and body for the simple form", () => {
    const form = createHomeForm();
    // Własna wartość `helped` — celowo różna od domyślnej w fillSimpleForm.
    fillRequiredMeta(form);

    form.simple.escalationCourse =
      "Protest, płacz i odmowa przejścia do kolejnej aktywności.";
    form.simple.postEscalationNeeds = "Przerwa i cisza.";

    const email = buildEmail({
      env: environments.home,
      form,
      variant: "simple",
      mode: "incident",
      language: "pl",
    });

    expect(email.subject).toBe("Formularz monitorowania - Dom - prosty");

    expect(email.body).toContain("Środowisko: Dom");
    expect(email.body).toContain("Wersja formularza: prosta");
    expect(email.body).toContain("Data: 2026-05-02");

    expect(email.body).toContain(
      "Jak przebiegała eskalacja? Jakie działania lub zmiany towarzyszyły jej nasilaniu się i ustępowaniu?: Protest, płacz i odmowa przejścia do kolejnej aktywności.",
    );

    expect(email.body).toContain(
      "Czego osoba potrzebowała przed ponownym kontaktem lub aktywnością? Co jej zapewniono i po czym rozpoznano gotowość?: Przerwa i cisza.",
    );
  });

  it("renders empty fields as dashes", () => {
    const email = buildEmail({
      env: environments.home,
      form: createHomeForm(),
      variant: "simple",
      mode: "incident",
      language: "pl",
    });

    expect(email.body).toContain("Data: -");

    expect(email.body).not.toContain("Krótki opis sytuacji: -");

    expect(email.body).toContain(
      "Jak przebiegała eskalacja? Jakie działania lub zmiany towarzyszyły jej nasilaniu się i ustępowaniu?: -",
    );
  });

  it("joins checkbox arrays with commas", () => {
    const form = createHomeForm();

    form.incident.antecedents = ["zmiana_aktywnosci", "czekanie"];

    const email = buildEmail({
      env: environments.home,
      form,
      variant: "extended",
      mode: "incident",
      language: "pl",
    });

    expect(email.body).toContain(
      "Co działo się do 5 minut przed?: Zmiana aktywności, Czekanie",
    );
  });

  it("includes incident fields in extended incident-report mode", () => {
    const form = createHomeForm();

    form.incident.tension = "1_podwyzszony";
    form.incident.escalationCourse = "Protest słowny.";

    const email = buildEmail({
      env: environments.home,
      form,
      variant: "extended",
      mode: "incident",
      language: "pl",
    });

    expect(email.body).toContain("Karta zdarzenia");

    expect(email.body).toContain(
      "Poziom napięcia przed zdarzeniem: 1 podwyższony",
    );

    expect(email.body).toContain("Jak przebiegała eskalacja? Jakie działania lub zmiany towarzyszyły jej nasilaniu się i ustępowaniu?: Protest słowny.");

    expect(email.body).not.toContain("Mapa środowiska");
  });

  it("includes the map in map mode and omits the incident section", () => {
    const form = createHomeForm();

    fillMapForm(form);

    const email = buildEmail({
      env: environments.home,
      form,
      variant: "extended",
      mode: "map",
      language: "pl",
    });

    expect(email.body).toContain("Mapa środowiska");

    expect(email.body).toContain(
      "W jakich miejscach osoba najchętniej przebywa?: Pokój osoby",
    );

    expect(email.body).not.toContain("Karta zdarzenia");
  });

  it("builds English content and translates checkbox values", () => {
    const form = createHomeForm();

    fillMapForm(form);

    const email = buildEmail({
      env: environments.home,
      form,
      variant: "extended",
      mode: "map",
      language: "en",
    });

    expect(email.subject).toBe("Monitoring form - Home - extended");

    expect(email.body).toContain("Environment: Home");

    expect(email.body).toContain("Form version: extended");

    expect(email.body).toContain("Environment map");

    expect(email.body).toContain(
      "Where does the person prefer staying?: Person's room",
    );

    expect(email.body).toContain(
      "What helps reduce tension?: Silence / reducing stimuli",
    );

    expect(email.body).not.toContain("Mapa środowiska");
  });
});
