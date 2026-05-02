import { describe, expect, it } from "vitest";
import { blankForm, environments } from "../../src/data/environments";
import { buildEmail } from "../../src/lib/email";
import type { SituationForm } from "../../src/types/form";

function homeForm(): SituationForm {
  return blankForm(environments.home);
}

describe("budowanie wiadomości e-mail", () => {
  it("buduje temat i treść dla formularza prostego", () => {
    const form = homeForm();
    form.meta.date = "2026-05-02";
    form.meta.time = "12:30";
    form.meta.place = "Dom";
    form.meta.lead = "Jan Kowalski";
    form.simple.factDescription = "Krótki opis sytuacji.";
    form.simple.helped = "Przerwa i cisza.";

    const email = buildEmail({ env: environments.home, form, variant: "simple", mode: "incident" });

    expect(email.subject).toBe("Formularz monitorowania - Dom - prosty");
    expect(email.body).toContain("Środowisko: Dom");
    expect(email.body).toContain("Wersja formularza: prosta");
    expect(email.body).toContain("Data: 2026-05-02");
    expect(email.body).toContain("Krótki opis sytuacji: Krótki opis sytuacji.");
    expect(email.body).toContain("Co pomogło obniżyć napięcie lub uspokoić sytuację?: Przerwa i cisza.");
  });

  it("renderuje puste pola jako myślniki", () => {
    const email = buildEmail({ env: environments.home, form: homeForm(), variant: "simple", mode: "incident" });

    expect(email.body).toContain("Data: -");
    expect(email.body).toContain("Krótki opis sytuacji: -");
  });

  it("łączy tablice checkboxów przecinkami", () => {
    const form = homeForm();
    form.incident.antecedents = ["Zmiana aktywności", "Czekanie"];

    const email = buildEmail({ env: environments.home, form, variant: "extended", mode: "incident" });

    expect(email.body).toContain("Co działo się do 5 minut przed?: Zmiana aktywności, Czekanie");
  });

  it("zawiera pola incydentu w trybie rozszerzonej karty zdarzenia", () => {
    const form = homeForm();
    form.incident.tension = "1 podwyższony";
    form.incident.behavior = "Protest słowny.";

    const email = buildEmail({ env: environments.home, form, variant: "extended", mode: "incident" });

    expect(email.body).toContain("Karta zdarzenia");
    expect(email.body).toContain("Poziom napięcia: 1 podwyższony");
    expect(email.body).toContain("Opis zachowania: Protest słowny.");
    expect(email.body).not.toContain("Mapa środowiska");
  });

  it("zawiera wiersze mapy w trybie mapy i pomija sekcję incydentu", () => {
    const form = homeForm();
    form.map.rows[0].time = "2h";
    form.map.rows[0].activity = "Zabawa";

    const email = buildEmail({ env: environments.home, form, variant: "extended", mode: "map" });

    expect(email.body).toContain("Mapa środowiska");
    expect(email.body).toContain("- Pokój: czas 2h, aktywność Zabawa");
    expect(email.body).not.toContain("Karta zdarzenia");
  });
});
