# Formularze WWW i PDF — aktualizacja 28.10.2026

## Aktualna treść

W wersji prostej i rozszerzonej zastosowano trzy uzgodnione pytania:

1. **Pierwsze sygnały:** „Jak zareagowało otoczenie na pierwsze sygnały trudności? Co osoba zrobiła lub zakomunikowała po tej reakcji?”
2. **Eskalacja:** „Jak przebiegała eskalacja? Jakie działania lub zmiany towarzyszyły jej nasilaniu się i ustępowaniu?”
3. **Po eskalacji:** „Czego osoba potrzebowała przed ponownym kontaktem lub aktywnością? Co jej zapewniono i po czym rozpoznano gotowość?”

Pod każdym jest dokładnie ta podpowiedź: „Uwzględnij obserwacje i informacje przekazane przez osobę. Jeśli trudno ocenić — zaznacz to”. Na początku każdego etapu są checkboxy wielokrotnego wyboru O/P/R/H oraz opcjonalne doprecyzowanie, kto przekazał informację i których fragmentów dotyczą źródła. Następnie pojawiają się uzgodnione pytanie, podpowiedź i miejsce na opis. Ta kolejność obowiązuje w WWW, pustych PDF-ach PL/EN, eksporcie wypełnionego PDF-a, wydruku i e-mailu. Brak zaznaczenia nie oznacza braku informacji od osoby. Źródła nie są przypisywane automatycznie.

Wybrane kody zapisuje się w nowych tablicach `earlyResponseSourceTypes`, `escalationSourceTypes` i `postEscalationSourceTypes`. Dotychczasowe teksty w `earlyResponseSources`, `escalationSources` i `postEscalationSources` pozostają bez zmian jako doprecyzowanie; nie wyprowadza się z nich zaznaczeń. Eksport PDF, e-mail i wydruk pokazują pełne etykiety wybranych źródeł w języku interfejsu, oddzielnie od tekstu doprecyzowania.

Usunięto z bieżących formularzy pytania o to, co pomogło zakończyć eskalację, co pomogło wrócić do gotowości, co pogorszyło sytuację oraz odrębne podsumowanie i wniosek na przyszłość. Działania i ich następstwa opisuje się przy odpowiednim etapie. Nie dodano dodatkowego, zbiorczego bloku powtarzającego te opisy.

Pozostawiono osobno:
- rodzaj wsparcia i warunki dostępu do niego;
- mierzalne nasilenie zachowania, rzeczywiste skutki i potencjalne zagrożenie;
- trzy informacje czasowe: trwanie zachowania, zmniejszenie oznak napięcia oraz czas do zaobserwowania gotowości;
- przekaz osoby i późniejsze obserwacje w części o możliwym maskowaniu, bez przypisywania mechanizmu;
- informacje o dalszych zdarzeniach i bezpieczeństwie.

Czas gotowości nie wymaga ponownego opisywania potrzeb i oznak — ich miejsce jest w części „Po eskalacji”. Wyjaśniono liczenie czasu na przykładzie 12:00–12:05, 12:08 i 12:15. „Kontakt” w zdaniu o zgodzie zastąpiono konkretnym przykładem odpowiadania na komunikaty słowem, gestem lub przez AAC. Usunięto dopisek „Wersja uporządkowana przed szkoleniem” i techniczne zdanie o eksperymencie.

## Pliki

W `public/pdf/` są aktualne źródła i skompilowane dokumenty:

- `puste-formularze-monitorowania.typ/.pdf` — formularze PL;
- `blank-monitoring-forms.typ/.pdf` — formularze EN;
- `jak-korzystac-z-formularzy-monitorowania.typ/.pdf` — instrukcja PL;
- `how-to-use-monitoring-forms.typ/.pdf` — instrukcja EN.

Angielski interfejs ponownie prowadzi do aktualnych angielskich PDF-ów; polski — do polskich. `npm run build` kopiuje je do `dist/pdf/`. Aktualne polskie formularze i instrukcję zsynchronizowano także z plikami `../SzkolenieTZ/formularze-monitorowania-TZ.*` i `../SzkolenieTZ/jak-korzystac-z-formularzy-monitorowania.*`. Zeszyt dnia 1 wczytuje teraz wspólny plik formularzy zamiast przechowywać starszą kopię; przebudowano jego PDF i sprawdzono zgodność wszystkich 11 stron dodatku. Dawne wersje pozostają wyłącznie w kopiach zapasowych.

**PDF generowany z wypełnionej strony** korzysta ze wspólnego opisu pól używanego również przez e-mail i wydruk. Obejmuje bieżące odpowiedzi i źródła. **Puste PDF-y do ręcznego wypełniania** mają te same trzy uzgodnione opisy etapów i pola źródeł. Są uniwersalne dla środowisk; listy wyboru w aplikacji są natomiast dostosowane do domu, szkoły lub placówki. Nie należy mylić zgodności eksportu z deklaracją identyczności każdego podpisu i wariantu listy w uniwersalnym papierowym formularzu.

Zachowano autorstwo Małgorzaty Mikołajczyk i styl materiałów. Angielskie źródła wskazują wprost Libertinus Serif — krój osadzony w dostarczonych polskich PDF-ach. Polskie źródła nadal wskazują Linux Libertine; lokalny Typst stosuje Libertinus Serif jako zastępstwo i zgłasza ostrzeżenie o nieobecnej rodzinie.

## Uporządkowanie składu PDF

Usunięto ręczne podziały pomiędzy sekcjami tego samego formularza oraz prawie wszystkimi rozdziałami instrukcji. Formularz prosty rozpoczyna się bezpośrednio pod tytułem pakietu — nie ma już prawie pustej strony tytułowej. Nowe strony zachowano tylko między niezależnymi formularzami, przed bibliografią formularzy i po spisie treści instrukcji.

Zmniejszono odstępy między blokami; nie zmieniono pytań, podpowiedzi, wielkości pisma ani wysokości miejsc na ręczne odpowiedzi. Źródła etapu, opcjonalne doprecyzowanie, pytanie, podpowiedź i miejsce na odpowiedź pozostają razem, w tej kolejności. Nagłówki są wiązane z następnym blokiem, a nagłówki tabel powtarzają się po przejściu na następną stronę. Checkboxy są rysowane jako puste kwadraty, bez zależności od brakującego glifu fontu. Po dodaniu checkboxów źródeł zwiększono odstęp nad nagłówkiem „Źródła tego opisu” do `0.65em` w obu językach, bez zmiany wysokości pól; formularze nadal mają po 11 stron.

| Dokument | Przed | Po |
| --- | ---: | ---: |
| Formularze PL | 15 | 11 |
| Formularze EN | 16 | 11 |
| Instrukcja PL | 10 | 6 |
| Instrukcja EN | 11 | 7 |

Kontrola `docs/qa-pdf-layout.json` porównuje treść przed i po zmianie (z pominięciem numeracji, powtórzonych nagłówków tabel, ikon checkboxów oraz usuniętej na prośbę użytkownika uwagi bibliograficznej), wszystkie teksty pytań oraz wysokości pól. Nie wykryto utraty treści ani kotwic tekstowych poza stroną. Przykładowe strony obejrzano po rasteryzacji. Kopia przed zmianą: `../_backups/situationmap-przed-uporzadkowaniem-skladu-20261028-021010/`.

## Wcześniejsze dane

Dawnych wartości nie kasuje się ani nie przepisuje do nowych opisów etapów. Pozostają w przechowywanym formularzu oraz w osobnej części „Zapis z poprzedniej wersji — bez przeliczania”, także w eksporcie. Archiwalne pytania nie są nowymi polami do wypełniania.

Dotyczy to m.in. dawnych podsumowań „co pomogło”, opisu zachowania, zbiorczego przebiegu działań, dawnych przedziałów czasu i skali intensywności. Zachowano wcześniejsze zabezpieczenia: kopię starego localStorage przed nadpisaniem, brak automatycznej zamiany tygodniowej liczby interwencji na liczbę dotyczącą zdarzenia i brak odwracania znaczenia odpowiedzi o pomocy bezwarunkowej. Błąd zapisu kopii blokuje nadpisanie poprzednich danych i jest komunikowany.

## Kontrola

- `npm run typecheck` — poprawnie.
- `npm run test:unit` — **72/72**.
- `npm run test:e2e -- --reporter=line` — **22/22**.
- Testy mobilne PL/EN: Chromium z profilem Pixel 7 i WebKit z profilem iPhone 13. Sprawdzono dotknięcie przycisku, walidację, wypełnienie trzech etapów i źródeł, odtworzenie po odświeżeniu oraz pobranie rzeczywistego PDF-a z wpisanymi danymi. To emulacja przeglądarkowa, nie test fizycznych telefonów.
- Testy obejmują również stare dane, brak walidowania usuniętych podsumowań, obecność dawnych wartości tylko w archiwum, oba języki, długi polski wpis i wydruk wszystkich kroków.
- Kolejność źródła → doprecyzowanie → opis sprawdzono w eksportach, źródłach pustych PDF-ów i mobilnym DOM-ie PL/EN.
- Checkboxy źródeł: sprawdzono wielokrotny wybór, obsługę klawiaturą, przełączenie języka, odtworzenie zaznaczeń po odświeżeniu, pełne etykiety w eksportach oraz zachowanie dawnych doprecyzowań bez automatycznych zaznaczeń.
- Testy źródeł drukowanych sprawdzają identyczne brzmienie trzech uzgodnionych pytań i podpowiedzi w WWW i obu wariantach formularza papierowego oraz brak usuniętych pytań.
- `npm run build` — poprawnie; pozostają ostrzeżenia o rozmiarze pakietu pdfmake i nieaktualnych danych Browserslist.
- Kontrola tekstu i kotwic tekstowych PDF-ów: `docs/qa-monitoring-pdf.json`. Sprawdzono m.in. trzy pytania, źródła, polskie znaki, koniec długiego wpisu i brak kotwic poza stroną. Nie wykonano fizycznego wydruku.

Bibliografię zachowano zgodnie z siedmioma pozycjami aktualnej polskiej instrukcji. Nie dodawano źródeł z pamięci. Na prośbę użytkownika usunięto z treści dla użytkowników uwagę o niezależnej weryfikacji danych bibliograficznych; samych pozycji bibliografii nie zmieniano. Bibliografia jest podstawą teoretyczną, nie dowodem walidacji formularza.

## Kopie przed zmianami

- `../_backups/situationmap-przed-synchronizacja-20261027-233026/`
- `../_backups/situationmap-przed-tlumaczeniem-pdf-20261028-002224/`
- `../_backups/situationmap-przed-usunieciem-powtorzen-20261028-003617/`
