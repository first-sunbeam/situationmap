# Narzędzie monitorowania sytuacji

Statyczna aplikacja Vue do wypełniania dwóch formularzy dla trzech środowisk:

- Dom
- Ośrodek / placówka pobytowa
- Szkoła

PDF generowany jest lokalnie w przeglądarce przez `pdfmake`. Dane nie są wysyłane na serwer.

## Uruchomienie

Najprościej otworzyć plik `index.html` w przeglądarce.

Wygodny wariant lokalny:

```bash
python3 -m http.server 5173
```

Potem otwórz:

```text
http://localhost:5173
```

Jeśli port 5173 jest zajęty, użyj innego, np.:

```bash
python3 -m http.server 8787
```

```text
http://localhost:8787
```

Do działania potrzebny jest dostęp przeglądarki do CDN z bibliotekami Vue i pdfmake.
