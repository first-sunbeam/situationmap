import { describe, expect, it } from "vitest";
import { environments } from "../../src/data/environments";
import { buildEmail } from "../../src/lib/email";
import {
  createHomeForm,
  fillMapForm,
  fillRequiredMeta,
  fillSimpleForm,
} from "./helpers/formFixtures";

describe("budowanie wiadomości e-mail", () => {
  it("buduje temat i treść dla formularza prostego", () => {
    const form = createHomeForm();
    // Własna wartość `helped` — celowo różna od domyślnej w fillSimpleForm.
    fillRequiredMeta(form);
    form.simple.behavior = "Protest, płacz i odmowa przejścia do kolejnej aktywności.";
    form.simple.helped = "Przerwa i cisza.";

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
    expect(email.body).toContain("3. Przebieg sytuacji – co można było zaobserwować?: Protest, płacz i odmowa przejścia do kolejnej aktywności.");
    expect(email.body).toContain(
      "4. Co pomogło (lub nie pomogło) wyregulować sytuację?: Przerwa i cisza.",
    );
  });

  it("renderuje puste pola jako myślniki", () => {
    const email = buildEmail({
      env: environments.home,
      form: createHomeForm(),
      variant: "simple",
      mode: "incident",
      language: "pl",
    });

    expect(email.body).toContain("Data: -");
    expect(email.body).not.toContain("Krótki opis sytuacji: -");
    expect(email.body).toContain("3. Przebieg sytuacji – co można było zaobserwować?: -");
  });

  it("łączy tablice checkboxów przecinkami", () => {
    const form = createHomeForm();
    form.incident.antecedents = ["Zmiana aktywności", "Czekanie"];

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

  it("zawiera pola incydentu w trybie rozszerzonej karty zdarzenia", () => {
    const form = createHomeForm();
    form.incident.tension = "1 podwyższony";
    form.incident.behavior = "Protest słowny.";

    const email = buildEmail({
      env: environments.home,
      form,
      variant: "extended",
      mode: "incident",
      language: "pl",
    });

    expect(email.body).toContain("Karta zdarzenia");
    expect(email.body).toContain("Poziom napięcia przed zdarzeniem: 1 podwyższony");
    expect(email.body).toContain("Opis zachowania: Protest słowny.");
    expect(email.body).not.toContain("Mapa środowiska");
  });

  it("zawiera mapę w trybie mapy i pomija sekcję incydentu", () => {
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
    expect(email.body).toContain("W jakich miejscach dziecko/uczeń najchętniej przebywa?: Pokój dziecka");
    expect(email.body).not.toContain("Karta zdarzenia");
  });

  it("buduje angielską treść i tłumaczy wartości checkboxów", () => {
    const form = createHomeForm();
    fillMapForm(form);

    const email = buildEmail({
      env: environments.home,
      form,
      variant: "extended",
      mode: "map",
      language: "en",
    });

    expect(email.subject).toBe("Monitoring form - Dom - extended");
    expect(email.body).toContain("Environment: Dom");
    expect(email.body).toContain("Form version: extended");
    expect(email.body).toContain("Environment map");
    expect(email.body).toContain("Where does the child/student prefer staying?: Child's room");
    expect(email.body).toContain("What lowers tension?: Silence / reducing stimuli");
    expect(email.body).not.toContain("Mapa środowiska");
  });
});
