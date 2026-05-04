# SituationMap

SituationMap to aplikacja webowa do uporządkowanego opisu sytuacji trudnych lub wymagających analizy w różnych środowiskach: w domu, szkole oraz placówce całodobowej.

Aplikacja jest dostępna publicznie pod adresem:

<https://autyzm.poznan.pl/situationmap/>

## Dla kogo jest aplikacja?

Narzędzie może wspierać rodziców, opiekunów, specjalistów, nauczycieli i zespoły pracujące z osobami w spektrum autyzmu przy zbieraniu informacji o sytuacji, zachowaniu, kontekście środowiskowym oraz możliwych czynnikach wpływających na zdarzenie.

## Dostępne środowiska

- Dom
- Placówka całodobowa
- Szkoła

## Warianty formularza

### Formularz prosty

Krótka wersja zgłoszenia, którą można wysłać przez domyślny program pocztowy użytkownika.

### Formularz rozszerzony

Rozbudowana karta zdarzenia i mapa środowiska z możliwością wygenerowania lub pobrania PDF.

## Najważniejsze funkcje

- wybór środowiska pracy,
- przełączanie między wersją prostą i rozszerzoną,
- lokalny zapis danych formularza w `localStorage`,
- walidacja wymaganych pól przed wysyłką e-maila lub generowaniem PDF,
- generowanie PDF po stronie przeglądarki z użyciem `pdfmake`,
- tryb jasny i ciemny,
- PWA / możliwość działania jako aplikacja instalowana w przeglądarce,
- brak wysyłki danych na serwer aplikacji.

## Prywatność danych

Aplikacja nie zapisuje danych na zewnętrznym serwerze. Dane wpisane w formularzu są przechowywane lokalnie w przeglądarce użytkownika (`localStorage`), aby można było wrócić do pracy po odświeżeniu strony.

W formularzu prostym przycisk **Wyślij** otwiera domyślny program pocztowy z przygotowaną wiadomością. Sama wysyłka odbywa się poza aplikacją, przez program pocztowy użytkownika.

## Stack technologiczny

- Vue 3
- TypeScript
- Vite
- pdfmake
- vite-plugin-pwa
- Vitest
- Playwright

## Uruchomienie lokalne

Wymagania:

- Node.js
- npm

Instalacja zależności:

```bash
npm install
```

Tryb developerski:

```bash
npm run dev
```

Domyślnie aplikacja będzie dostępna pod adresem:

```text
http://localhost:5173/
```

## Testy i jakość kodu

Sprawdzenie typów:

```bash
npm run typecheck
```

Testy jednostkowe:

```bash
npm run test:unit
```

Testy end-to-end:

```bash
npm run test:e2e
```

Pokrycie testami jednostkowymi:

```bash
npm run test:unit:coverage
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

Lokalnie aplikacja działa z bazową ścieżką `/`, a build produkcyjny jest przygotowany pod ścieżkę `/situationmap/`.

## Struktura projektu

```text
src/
  components/          Komponenty formularzy i pól
  composables/         Logika stanu, walidacji, zapisu lokalnego i motywu
  config/              Konfiguracja etykiet, sekcji i kroków formularza
  data/                Definicje środowisk
  lib/                 Generowanie e-maila i PDF
  types/               Typy TypeScript
  App.vue
  main.ts

tests/
  unit/                Testy jednostkowe
  e2e/                 Testy Playwright
```

## Deployment

Repozytorium zawiera workflow GitHub Actions, który po wypchnięciu zmian na gałąź `main` buduje aplikację i publikuje zawartość katalogu `dist/` przez `rsync`.

Deployment wymaga skonfigurowania sekretów repozytorium:

- `SITE_REMOTE_PATH`
- `SITE_REMOTE_HOST`
- `SITE_REMOTE_USER`
- `SITE_REMOTE_PORT`
- `SITE_DEPLOYMENT_KEY`

## Planowane usprawnienia

- dodanie angielskiej wersji językowej,
- przygotowanie mechanizmu przełączania języka,
- dalsze rozwijanie treści formularzy i eksportów PDF.

## Status repozytorium

Repozytorium jest publiczne jako prezentacja projektu. Kod można przeglądać, ale projekt nie jest obecnie udostępniany jako biblioteka ani gotowy szablon do ponownego wykorzystania.
