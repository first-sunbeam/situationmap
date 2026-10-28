# Formularze WWW i PDF — aktualizacja 28.10.2026

## Aktualna treść

W wersji prostej i rozszerzonej zastosowano trzy uzgodnione pytania:

1. **Pierwsze sygnały:** „Jak zareagowało otoczenie na pierwsze sygnały trudności? Co osoba zrobiła lub zakomunikowała po tej reakcji?”
2. **Eskalacja:** „Jak przebiegała eskalacja? Jakie działania lub zmiany towarzyszyły jej nasilaniu się i ustępowaniu?”
3. **Po eskalacji:** „Czego osoba potrzebowała przed ponownym kontaktem lub aktywnością? Co jej zapewniono i po czym rozpoznano gotowość?”

Pod każdym jest dokładnie ta podpowiedź: „Uwzględnij obserwacje i informacje przekazane przez osobę. Jeśli trudno ocenić — zaznacz to”. Każdy opis ma osobne pole na źródła O/P/R/H, z określeniem, których informacji dotyczą. Źródła nie są przypisywane automatycznie.

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

Angielski interfejs ponownie prowadzi do aktualnych angielskich PDF-ów; polski — do polskich. `npm run build` kopiuje je do `dist/pdf/`. Polskie formularze i instrukcję zsynchronizowano także z odpowiadającymi im plikami w `../SzkolenieTZ/`. Pozostałych materiałów szkoleniowych, w tym zeszytów z osadzonymi wcześniej formularzami, nie przebudowywano.

**PDF generowany z wypełnionej strony** korzysta ze wspólnego opisu pól używanego również przez e-mail i wydruk. Obejmuje bieżące odpowiedzi i źródła. **Puste PDF-y do ręcznego wypełniania** mają te same trzy uzgodnione opisy etapów i pola źródeł. Są uniwersalne dla środowisk; listy wyboru w aplikacji są natomiast dostosowane do domu, szkoły lub placówki. Nie należy mylić zgodności eksportu z deklaracją identyczności każdego podpisu i wariantu listy w uniwersalnym papierowym formularzu.

Zachowano autorstwo Małgorzaty Mikołajczyk i styl materiałów. Angielskie źródła wskazują wprost Libertinus Serif — krój osadzony w dostarczonych polskich PDF-ach. Polskie źródła nadal wskazują Linux Libertine; lokalny Typst stosuje Libertinus Serif jako zastępstwo i zgłasza ostrzeżenie o nieobecnej rodzinie.

## Wcześniejsze dane

Dawnych wartości nie kasuje się ani nie przepisuje do nowych opisów etapów. Pozostają w przechowywanym formularzu oraz w osobnej części „Zapis z poprzedniej wersji — bez przeliczania”, także w eksporcie. Archiwalne pytania nie są nowymi polami do wypełniania.

Dotyczy to m.in. dawnych podsumowań „co pomogło”, opisu zachowania, zbiorczego przebiegu działań, dawnych przedziałów czasu i skali intensywności. Zachowano wcześniejsze zabezpieczenia: kopię starego localStorage przed nadpisaniem, brak automatycznej zamiany tygodniowej liczby interwencji na liczbę dotyczącą zdarzenia i brak odwracania znaczenia odpowiedzi o pomocy bezwarunkowej. Błąd zapisu kopii blokuje nadpisanie poprzednich danych i jest komunikowany.

## Kontrola

- `npm run typecheck` — poprawnie.
- `npm run test:unit` — **66/66**.
- `npm run test:e2e -- --reporter=line` — **21/21**.
- Testy mobilne PL/EN: Chromium z profilem Pixel 7 i WebKit z profilem iPhone 13. Sprawdzono dotknięcie przycisku, walidację, wypełnienie trzech etapów i źródeł, odtworzenie po odświeżeniu oraz pobranie rzeczywistego PDF-a z wpisanymi danymi. To emulacja przeglądarkowa, nie test fizycznych telefonów.
- Testy obejmują również stare dane, brak walidowania usuniętych podsumowań, obecność dawnych wartości tylko w archiwum, oba języki, długi polski wpis i wydruk wszystkich kroków.
- Testy źródeł drukowanych sprawdzają identyczne brzmienie trzech uzgodnionych pytań i podpowiedzi w WWW i obu wariantach formularza papierowego oraz brak usuniętych pytań.
- `npm run build` — poprawnie; pozostają ostrzeżenia o rozmiarze pakietu pdfmake i nieaktualnych danych Browserslist.
- Kontrola tekstu i kotwic tekstowych PDF-ów: `docs/qa-monitoring-pdf.json`. Sprawdzono m.in. trzy pytania, źródła, polskie znaki, koniec długiego wpisu i brak kotwic poza stroną. Nie wykonano fizycznego wydruku.

Bibliografię zachowano zgodnie z siedmioma pozycjami aktualnej polskiej instrukcji. Nie dodawano źródeł z pamięci; dane bibliograficzne nie były niezależnie weryfikowane. Bibliografia jest podstawą teoretyczną, nie dowodem walidacji formularza.

## Kopie przed zmianami

- `../_backups/situationmap-przed-synchronizacja-20261027-233026/`
- `../_backups/situationmap-przed-tlumaczeniem-pdf-20261028-002224/`
- `../_backups/situationmap-przed-usunieciem-powtorzen-20261028-003617/`
