# SituationMap

SituationMap to aplikacja zbudowana w Vue 3 + Vite do opisu sytuacji w różnych środowiskach i przygotowania zgłoszenia w dwóch wariantach:

- **formularz prosty** — szybkie zgłoszenie sytuacji przez e-mail,
- **formularz rozszerzony** — karta zdarzenia i mapa środowiska z możliwością generowania PDF.

## Dostępne środowiska

- Dom
- Ośrodek / placówka pobytowa
- Szkoła

## Najważniejsze funkcje

- wybór środowiska pracy,
- przełączanie między wersją **prostą** i **rozszerzoną** formularza,
- formularz prosty wysyłany przez domyślny program pocztowy,
- formularz rozszerzony obejmujący:
  - kartę zdarzenia,
  - mapę środowiska,
  - podgląd PDF,
  - pobieranie PDF,
- lokalne generowanie PDF przez `pdfmake`,
- automatyczny zapis danych formularza w `localStorage`,
- podstawowa walidacja przed wysyłką e-maila i generowaniem PDF,
- brak wysyłki danych na serwer aplikacji.

## Jak działa wysyłka

Przycisk **Wyślij** jest dostępny w **formularzu prostym**. Po kliknięciu aplikacja otwiera domyślny program pocztowy z przygotowaną wiadomością na adres:

```text
kontakt@autyzm.poznan.pl
```

Treść wiadomości jest budowana na podstawie danych wpisanych do formularza.

W **formularzu rozszerzonym** wysyłka e-mail nie jest używana — zamiast tego dostępne jest generowanie PDF.

## Stack

- Vue 3
- Vite
- pdfmake

## Uruchomienie lokalnie

Instalacja zależności:

```bash
npm install
```

Tryb developerski:

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem:

```text
http://localhost:5173/
```

## Build produkcyjny

Budowanie aplikacji:

```bash
npm run build
```

Podgląd buildu:

```bash
npm run preview
```

## Struktura projektu

```text
src/
  components/
    EnvironmentMapForm.vue
    IncidentForm.vue
    SimpleForm.vue
  data/
    environments.js
  lib/
    email.js
    pdf.js
  App.vue
  main.js
```

## Ważne informacje

- formularz prosty i formularz rozszerzony korzystają ze wspólnych danych podstawowych,
- `Mapa środowiska` jest osobnym formularzem w wersji rozszerzonej,
- w PDF wypisywane są zaznaczone odpowiedzi i dopiski użytkownika, zamiast pełnych list opcji,
- formularz rozszerzony korzysta wyłącznie z generowania PDF,
- dane zapisują się lokalnie w przeglądarce i wracają po odświeżeniu strony,
- lokalnie aplikacja działa z base `/`,
- build produkcyjny jest przygotowany pod ścieżkę `/situationmap/`.

## Repozytorium

```bash
git clone git@github.com:first-sunbeam/situationmap.git
```
