# Narzędzie monitorowania sytuacji

Aplikacja zbudowana w Vue 3 + Vite do wypełniania dwóch formularzy:

- Karta zdarzenia
- Mapa środowiska

Dostępne środowiska:

- Dom
- Ośrodek / placówka pobytowa
- Szkoła

PDF generowany jest lokalnie w przeglądarce przez `pdfmake`. Dane nie są wysyłane na serwer.

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
  data/
    environments.js
  lib/
    pdf.js
  App.vue
  main.js
```

## Ważne informacje

- `Mapa środowiska` jest osobnym formularzem w interfejsie.
- W PDF wypisywane są zaznaczone odpowiedzi i dopiski użytkownika, zamiast pełnych list opcji.
- Lokalnie aplikacja działa z base `/`.
- Build produkcyjny jest przygotowany pod ścieżkę `/ongoing-monitoring/`.

## Repozytorium

```bash
git clone git@github.com:first-sunbeam/ongoing-monitoring.git
```
