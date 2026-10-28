#set document(
  title: "Puste formularze monitorowania",
  author: "Małgorzata Mikołajczyk"
)

#set page(
  paper: "a4",
  flipped: false,
  margin: (x: 1.7cm, y: 1.5cm),
  footer: context [
    #set text(size: 8pt, fill: black)
    #grid(
      columns: (1fr, auto, 1fr),
      align: (left, center, right),
      [© Małgorzata Mikołajczyk],
      [#counter(page).display("1")],
      [analiza.tools/map]
    )
  ]
)

#set text(font: "Linux Libertine", size: 9.6pt, lang: "pl")
#set par(justify: false, leading: 0.3em, spacing: 0.4em)
#set heading(numbering: none)

#show heading.where(level: 1): it => block(above: 0.6em, below: 0.6em)[
  #set text(size: 18pt, weight: "bold")
  #it.body
]

#show heading.where(level: 2): it => block(above: 0.65em, below: 0.35em)[
  #set text(size: 13.5pt, weight: "bold")
  #it.body
]

#show heading.where(level: 3): it => block(above: 0.45em, below: 0.25em)[
  #set text(size: 11.2pt, weight: "bold")
  #it.body
]

#let muted = black
#let line-stroke = black
#let soft = white
#let soft-stroke = black

#let title-page(title, subtitle) = align(center)[
  #v(0.7em)
  #text(size: 23pt, weight: "bold")[#title]
  #v(0.7em)
  #text(size: 12.5pt, fill: muted)[#subtitle]
]

#let dotted-stroke = stroke(
  paint: black,
  thickness: 1pt,
  dash: "dotted"
)

#let hint-text(hint) = if hint != none [
  #v(0.1em)
  #text(size: 8.2pt, style: "italic")[#hint]
]

#let field(label, height: 0.85cm, hint: none) = block(width: 100%, breakable: false, below: 0.45em, above: 0.5em)[
  #v(0.5em)
  #text(weight: "bold")[#label]
  #hint-text(hint)
  #v(1em)
  #line(length: 100%, stroke: dotted-stroke)
]

#let area(label, height: 2cm, hint: none) = block(width: 100%, breakable: false, below: 0.1em, above: 0.55em)[
  #text(weight: "bold")[#label]
  #hint-text(hint)
  #v(0.12em)
  #rect(width: 100%, height: height, stroke: line-stroke, radius: 2pt)
]

#let row-fields(a, b) = grid(columns: (1fr, 1fr), column-gutter: 0.3cm, field(a), field(b))

#let checks(items, columns: 2) = block(width: 100%, below: 0.45em, above: 0.25em)[
  #grid(
    columns: if columns == 4 { (auto, auto, auto, auto) } else if columns == 3 { (1fr, 1fr, 1fr) } else { (1fr, 1fr) },
    column-gutter: 0.5em,
    row-gutter: 0.45em,
    ..items.map(item => [#box(width: 0.7em, height: 0.7em, baseline: 10%, stroke: 0.5pt) #item])
  )
]

#let select(label, items, columns: 2, hint: none) = block(width: 100%, breakable: false, below: 0.35em, above: 0.75em)[
  #text(weight: "bold")[#label]
  #hint-text(hint)
  #checks(items, columns: columns)
]

#let stage-sources(stage, hint: none) = block(breakable: false)[
  #v(0.65em, weak: false)
  #text(weight: "bold")[Źródła tego opisu — #stage]
  #hint-text(hint)
  #checks(("O — własna obserwacja", "P — przekaz osoby (także AAC)", "R — relacja innej osoby", "H — hipoteza"), columns: 4)
  #field("Doprecyzowanie źródeł (opcjonalnie) — " + stage)
]

#let stage-field(question, stage, height: 2cm) = block(breakable: false)[
  #stage-sources(stage)
  #area(question, height: height, hint: "Uwzględnij obserwacje i informacje przekazane przez osobę. Jeśli trudno ocenić — zaznacz to.")
]

#let section(title, body, breakable: true) = block(
  breakable: breakable,
  fill: soft,
  stroke: soft-stroke,
  inset: 10pt,
  radius: 6pt,
  width: 100%,
  below: 0.85em
)[
  #block(sticky: true, below: 0.3em)[#text(size: 12.5pt, weight: "bold")[#title]]
  #body
]

#let meta() = section("Dane podstawowe", [
  #grid(columns: (1fr, 1fr, 1fr), column-gutter: 0.3cm,
    field("Data"),
    field("Godzina"),
    field("Miejsce")
  )
  #grid(columns: (1fr, 1fr), column-gutter: 0.3cm,
    field("Oznaczenie osoby"),
    field("Osoba sporządzająca zapis")
  )
  #field("Inne osoby obecne")
  #field("Początek i koniec obserwacji")
  #select("Środowisko", ("Dom", "Szkoła", "Ośrodek", "Inne: ........................................"), columns: 2)
])

#title-page("Formularze monitorowania sytuacji", "Wersja do wydruku i ręcznego wypełnienia")

= Formularz prosty

Opisuj jedno zdarzenie. Przy informacjach rozróżniaj: O — własna obserwacja, P — przekaz osoby (także AAC), R — relacja innej osoby, H — hipoteza. Przy opisach etapów zaznacz źródła w checkboxach; możesz wybrać kilka. Doprecyzowanie jest opcjonalne. Brak danych nie oznacza braku trudności. Zapis wykonaj, gdy pozwala na to bezpieczeństwo.

#meta()

#section("Szybki opis sytuacji", [
  #area("Jak wyglądał stan osoby przed sytuacją?", height: 2.1cm, hint: "Sen, głód, ból, hałas, zmiany planu, wcześniejsze napięcie.")
  #area("Co działo się bezpośrednio przed sytuacją?", height: 2.1cm, hint: "Opisz ostatnie minuty: wymaganie, zmianę, odmowę, czekanie, kontakt.")
  #area("Pierwsze sygnały narastającego napięcia", height: 1.8cm, hint: "Co pojawiło się zanim sytuacja się nasiliła: ciało, głos, ruch, wycofanie.")
  #stage-field("Jak zareagowało otoczenie na pierwsze sygnały trudności? Co osoba zrobiła lub zakomunikowała po tej reakcji?", "Pierwsze sygnały", height: 1.8cm)
  #stage-field("Jak przebiegała eskalacja? Jakie działania lub zmiany towarzyszyły jej nasilaniu się i ustępowaniu?", "Eskalacja", height: 2.2cm)
  #stage-field("Czego osoba potrzebowała przed ponownym kontaktem lub aktywnością? Co jej zapewniono i po czym rozpoznano gotowość?", "Po eskalacji", height: 2cm)
  #area("Czy osoba miała wpływ, wybór, możliwość negocjacji lub przerwy?", height: 1.7cm, hint: "Co osoba mogła kontrolować, a co było narzucone lub nieuniknione?")
  #area("Czy sytuacja była przewidywalna? Co było znane / nieznane?", height: 1.5cm, hint: "Czy było wiadomo, co się wydarzy, jak długo potrwa i jaki będzie koniec?")
  #area("Czas do zaobserwowania gotowości", height: 1.5cm, hint: "Po ilu minutach od zakończenia opisanego zachowania zaobserwowano oznaki gotowości? Możesz podać godzinę. Zaznacz szacunek / brak danych / nie zaobserwowano do końca obserwacji. Potrzeby i oznaki gotowości opisz przy etapie po eskalacji.")
])

#pagebreak()

= Formularz rozszerzony

Jeden zapis dotyczy jednego zdarzenia. O — obserwacja, P — przekaz osoby, R — relacja innej osoby, H — hipoteza. Przy opisach etapów zaznacz źródła w checkboxach; możesz wybrać kilka. Doprecyzowanie jest opcjonalne. Podaj, od kiedy obserwowałaś/obserwowałeś. Nie musisz wypełniać pól, których nie da się ocenić — wpisz „brak danych”.

#meta()

#section("0. Poziom bazowy i kontekst dnia", [
  #select("Poziom napięcia przed zdarzeniem", ("0 niski / stabilny", "1 podwyższony", "2 wysoki", "3 bardzo wysoki"), columns: 2, hint: "Ocena obserwatora, nie skala diagnostyczna. Dopisz konkretne oznaki i porównaj ze zwykłym funkcjonowaniem osoby; jeśli nie wiesz, pomiń ocenę.")
  #field("Oznaki będące podstawą oceny napięcia")
  #select("Czy osoba była zmęczona?",  ("Tak", "Nie", "Nie wiem"), columns: 3)
  #select("Czy osoba spała wystarczająco?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #field("Informacje o śnie i ich źródło — jeśli są dostępne", hint: "Np. krótki sen, pobudki, koszmary, bardzo wczesna pobudka.")
  #select("Etap pobytu / kontekst dnia, jeśli dotyczy", ("dzień przyjazdu / zmiany", "dzień wyjazdu / powrotu", "środek tygodnia", "koniec tygodnia", "nie dotyczy"), columns: 2)
  #select("Czy etap był obciążający? — placówka całodobowa, jeśli dotyczy", ("Tak", "Nie", "Nie wiem", "Nie dotyczy"), columns: 2)
  #select("Czynniki obciążające", (
    "słaby sen / pobudka w nocy", "zmiana planu", "wyjście / powrót / podróż", "wizyta gości / większa liczba osób", "konflikt", "presja czasu", "hałas / tłok", "ból / dyskomfort", "głód / pragnienie", "inne: ........................................"
  ))
  #select("Stan ciała", (
    "głód", "pragnienie", "potrzeba toalety", "ból / dyskomfort", "zmęczenie fizyczne", "temperatura ciała — zimno/gorąco", "napięcie mięśniowe", "inne: ........................................"
  ))
  #select("Intensywność sensoryczna", (
    "hałas / dźwięki", "światło", "tłok / liczba osób", "zapachy", "tekstury / dotyk", "temperatura pomieszczenia", "inne: ........................................"
  ))
])

#section("1. Bezpośrednio przed zdarzeniem", [
  #select("Co wydarzyło się bezpośrednio przed zdarzeniem?", (
    "zmiana aktywności", "koniec aktywności", "czekanie", "odmowa / brak dostępu", "prośba / polecenie", "korekta zachowania", "kontakt społeczny", "hałas / tłok", "konflikt", "przejście między miejscami", "inne: ........................................"
  ))
  #area("Doprecyzowanie tego, co było bezpośrednio przed", height: 2.3cm, hint: "Opisz fakty obserwowalne, bez oceniania i przypisywania winy.")
])

#section("2. Czego oczekiwano w tym momencie?", [
  #area("Na co osoba miała wpływ?", height: 1.4cm, hint: "Wybór kolejności, czasu, miejsca, sposobu wykonania, możliwość przerwy.")
  #area("Co było nieznane, narzucone albo poza wpływem?", height: 1.4cm, hint: "Nagła zmiana, brak informacji, presja czasu, brak możliwości odmowy lub negocjacji.")
  #select("Czy było wiadomo, co się wydarzy?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #select("Czy było wiadomo, jak długo to potrwa?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #select("Czy była możliwość negocjacji lub wyboru?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #select("Oczekiwania / wymagania", (
    "brak wymagań", "koniec aktywności", "rozpoczęcie zadania", "przejście do innego miejsca", "czekanie", "kontakt społeczny", "podporządkowanie się zasadzie", "wykonanie czynności samoobsługowej", "inne: ........................................"
  ))
])

#section("3. Pierwsze oznaki narastającego napięcia", [
  #stage-sources("Pierwsze sygnały", hint: "Zaznaczenia źródeł dotyczą opisu reakcji otoczenia i odpowiedzi osoby poniżej. Źródła pozostałych informacji dopisz w doprecyzowaniu, wskazując konkretne pole.")
  #select("Czy pojawiły się sygnały?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #field("Ile czasu przed eskalacją?", hint: "Szacunkowo: minuty, kilkanaście minut, wcześniej w ciągu dnia.")
  #select("Obserwowane zmiany ciała i ruchu", (
    "przyspieszone oddychanie", "napięcie mięśniowe", "pot", "drżenie", "rozszerzone źrenice", "ucieczka / walka", "inne: ........................................"
  ))
  #select("Obserwowane ograniczenie kontaktu lub aktywności", (
    "patrzenie w jeden punkt / podłogę", "brak reakcji na głos", "spowolnienie ruchów", "opadnięcie ciała", "wycofanie", "inne: ........................................"
  ))
  #select("Obserwowane reakcje na otoczenie", (
    "zatykanie uszu", "zasłanianie oczu", "stereotypie", "unikanie dotyku", "ucieczka z pomieszczenia", "inne: ........................................"
  ))
  #area("Jak zareagowało otoczenie na pierwsze sygnały trudności? Co osoba zrobiła lub zakomunikowała po tej reakcji?", height: 2.2cm, hint: "Uwzględnij obserwacje i informacje przekazane przez osobę. Jeśli trudno ocenić — zaznacz to.")
  #field("Co zwykle pojawia się najpierw?",  hint: "Pierwszy najmniejszy sygnał, który może pomóc zareagować wcześniej.")
  #select("Czy w innych zapisach te sygnały poprzedzały opisane zachowanie?", ("Tak", "Nie", "Nie wiem"), columns: 3)
])

#section("3B. Kontynuowanie aktywności, kompensacja i możliwe maskowanie", [
  #area("Co obserwowano podczas kontynuowania aktywności?", height: 1.5cm, hint: "Zapisz działania, dostępne wsparcie i czas. Samo kontynuowanie nie dowodzi przeciążenia ani maskowania. Możliwe: nie dotyczy / brak danych.")
  #area("Co osoba przekazała o wysiłku lub dyskomforcie?", height: 1.5cm, hint: "Przekaz osoby (P), także AAC. Brak komunikatu nie oznacza braku doświadczenia.")
  #area("Co zauważono później?", height: 1.5cm, hint: "Oddziel własną obserwację (O) od relacji innych (R); podaj czas i źródło.")
  #area("Czy rozważamy kompensację lub maskowanie — na jakiej podstawie?", height: 1.2cm, hint: "Hipoteza (H), nie rozpoznanie. Możliwe: brak podstaw do oceny.")
])

#section("4. Udzielone wsparcie i warunki jego udzielenia", [
  #select("Podjęte działania", (
    "obniżenie bodźców sensorycznych", "zwiększenie autonomii / wybór", "zapewnienie przewidywalności", "wsparcie interoceptywne", "czas bez wymagań / pauza", "regulacja sensoryczna", "inne: ........................................"
  ))
  #select("Czy dostęp do wsparcia uzależniono od wykonania polecenia?", ("Tak", "Nie", "Częściowo", "Nie wiem"), columns: 4)
  #select("Czy użyto regulatora / strategii regulacyjnej?", ("Tak", "Nie", "Częściowo", "Nie wiem"), columns: 2)
])



#section("5. Opis zachowania", [
  #stage-field("Jak przebiegała eskalacja? Jakie działania lub zmiany towarzyszyły jej nasilaniu się i ustępowaniu?", "Eskalacja", height: 2.8cm)
  #field("Nasilenie opisanego zachowania", hint: "Podaj liczbę, czas lub cechę działania, którą można porównywać. Np. 3 uderzenia dłonią w stół. Nie oceniaj całego zdarzenia skalą agresji.")
  #select("Skutki / szkody zaobserwowane", ("nie zaobserwowano szkód", "uraz osoby", "uraz innej osoby", "uszkodzenie rzeczy", "przerwanie aktywności", "brak danych", "inne: ........................................"), columns: 2)
  #field("Opis faktycznych skutków")
  #field("Potencjalne zagrożenie — oddzielnie od skutków", hint: "Co było możliwym zagrożeniem lub czemu zapobieżono? Nie zapisuj tego jako skutku, który faktycznie nastąpił.")
])


#section("6. Czas i gotowość", [
  #area("Czas trwania opisanego zachowania", height: 1.5cm, hint: "Podaj początek i koniec zachowania oraz czas trwania. Zaznacz szacunek / brak danych / trwało do końca obserwacji.")
  #area("Zmniejszenie obserwowanych oznak napięcia", height: 1.5cm, hint: "Jakie oznaki się zmniejszyły? Po ilu minutach od rozpoczęcia opisanego zachowania to zaobserwowano? Podaj minuty lub godzinę. Możliwe: nie zaobserwowano do końca obserwacji / brak danych.")
  #area("Czas do zaobserwowania gotowości", height: 1.5cm, hint: "Po ilu minutach od zakończenia opisanego zachowania zaobserwowano oznaki gotowości? Możesz podać godzinę. Zaznacz szacunek / brak danych / nie zaobserwowano do końca obserwacji. Potrzeby i oznaki gotowości opisz w części „Po eskalacji”.")
])

#section("7. Po eskalacji", [
  #stage-field("Czego osoba potrzebowała przed ponownym kontaktem lub aktywnością? Co jej zapewniono i po czym rozpoznano gotowość?", "Po eskalacji", height: 2.2cm)
  #select("Co wydarzyło się po zdarzeniu?", (
    "przejście do spokojniejszego miejsca", "odpoczynek", "rozmowa później", "powrót do aktywności", "sen", "kontakt z bliską osobą", "brak dalszych wymagań", "inne: ........................................"
  ))
  #select("Czy podczas tego zdarzenia była interwencja fizyczna?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #field("Jeśli tak — ile razy?", hint: "Wpisz liczbę lub przybliżenie.")
  #select("Czy osoba reagowała szybciej lub mocniej niż zwykle?",  ("Tak", "Nie", "Nie wiem"), columns: 3)
  #field("Działanie, kontekst i następstwa interwencji fizycznej / bezpieczeństwo", hint: "Co zrobiono, jakie były skutki i dalsze potrzeby bezpieczeństwa? Bez instrukcji technik fizycznych.")
], breakable: false)

#pagebreak()

= Mapa środowiska

#field("Okres obserwacji uwzględniony w mapie")
#field("Data aktualizacji mapy")
Zaznacz źródło: O — obserwacja, P — przekaz osoby, R — relacja innej osoby, H — hipoteza. Mapa opisuje aktualną wiedzę, preferencje i przypuszczenia.


#meta()

#section("1. Miejsca i preferowane przestrzenie", [
  #select("Gdzie osobie jest najłatwiej?", ("pokój osoby", "salon / wspólna przestrzeń", "kuchnia / jadalnia", "łazienka", "przedpokój / przejścia", "na zewnątrz", "samochód", "inne: ........................................"), columns: 2)
  #area("Co obserwujesz w tych miejscach i co mówi o nich osoba?", height: 1.4cm, hint: "Co tam działa: cisza, światło, kontrola bodźców, przewidywalność, osoba towarzysząca.")
  #select("Jakich miejsc osoba unika albo gdzie jest trudniej?", ("pokój osoby", "salon / wspólna przestrzeń", "kuchnia / jadalnia", "łazienka", "przedpokój / przejścia", "na zewnątrz", "samochód", "inne: ........................................"), columns: 2)
  #area("Co obserwujesz w tych miejscach i co może utrudniać sytuację?", height: 1.4cm, hint: "Co obciąża: hałas, zapachy, tłok, przejścia, oczekiwanie, brak wpływu.")
])

#section("2. Aktywności, role i relacje", [
  #area("Co osoba lubi robić lub wybiera?", height: 1.4cm, hint: "Aktywności, tematy, relacje, miejsca lub rytuały, które odbudowują zasoby.")
  #select("Jaka rola w aktywności jest najłatwiejsza?", (
    "prowadzący / kontrolujący", "uczestnik współpracujący", "obserwator / obecność bez aktywnego udziału", "samodzielnie bez interakcji z innymi"
  ), columns: 2)
])

#section("3. Warunki optymalnego funkcjonowania", [
  #select("Osobie jest najłatwiej, gdy…", (
    "jest cisza / mało bodźców słuchowych", "światło jest przyciemnione / naturalne", "otoczenie jest spokojne", "może kontrolować bodźce", "ma samotność / czas bez wymagań", "jest bliska osoba bez wymagań", "kontakt jest 1:1", "kontakt może być równoległy, bez bezpośredniej komunikacji", "ma wpływ na przebieg aktywności", "wie, co się wydarzy i jak długo potrwa", "może negocjować lub wybierać", "są rutyny / powtarzalność", "jest najedzona / napita", "jest wypoczęta", "temperatura jest komfortowa", "nie ma bólu / dyskomfortu", "inne: ........................................"
  ))
])

#section("4. Wsparcie i regulatory", [
  #area("Z kim osoba wybiera kontakt? Jak ten kontakt przebiega?", height: 1.3cm, hint: "Zwróć uwagę na styl kontaktu tej osoby: ton, dystans, brak presji, przewidywalność.")
  #select("Co zmniejsza napięcie?", (
    "cisza / wyciszenie bodźców", "ruch — huśtawka / trampolina / spacer", "ciężar / ucisk", "chłód lub ciepło", "stereotypie / bujanie / skakanie", "jedzenie / picie", "sen / drzemka", "toaleta", "obecność bliskiej osoby bez wymagań", "samotność / wycofanie", "kontakt fizyczny", "dystans / przestrzeń osobista", "wycofanie wymagania", "dostęp do ulubionej aktywności", "wybór / możliwość decyzji", "informacja, ile to potrwa", "inne: ........................................"
  ))
  #area("Co daje energię / pomaga odbudować zasoby?", height: 1.2cm, hint: "Nie tylko co uspokaja, ale co realnie regeneruje po obciążeniu.")
])


#section("5. Od czego zależy funkcjonowanie?", [
  #select("W jakich warunkach obserwujesz różnice zachowania lub gotowości?", ("hałas", "liczba osób", "zmiana planu", "pora dnia", "sen", "jedzenie / picie", "ból / dyskomfort", "temperatura", "kontakt społeczny", "presja czasu", "oczekiwanie", "przejścia między aktywnościami", "inne: ........................................"), columns: 2)
  #area("Jak zmienia się zachowanie w zależności od tych warunków?", height: 1.8cm, hint: "Opisz różnice: kiedy jest łatwiej, kiedy szybciej narasta napięcie, co obniża próg reakcji.")
])

#section("6. Bezpieczne przestrzenie i osoby", [
  #area("Gdzie / przy kim osoba może wracać do regulacji bez dodatkowych wymagań?", height: 2.2cm, hint: "Bez rozmowy naprawczej, pytań i nowych poleceń, z uwzględnieniem komunikowanych potrzeb i obserwowanych oznak gotowości.")
])

#section("7. Konteksty eskalacji i profilaktyka", [
  #select("Kiedy najczęściej rośnie ryzyko eskalacji?", ("oczekiwanie / czekanie", "koniec aktywności", "zmiana planu", "hałas / tłok", "kontakt społeczny", "korekta zachowania", "brak wpływu", "przejście do innego miejsca", "zmęczenie / głód / ból", "inne: ........................................"), columns: 2)
  #select("Co może zmniejszyć ryzyko eskalacji?", (
    "uprzedzenie / przygotowanie", "timer / plan wizualny", "wybór kiedy / jak / w jakiej kolejności", "negocjacja / omówienie", "jasny koniec", "brak pośpiechu", "obecność bliskiej osoby", "dostęp do regulacji sensorycznej", "inne: ........................................"
  ), columns: 2)
  #select("Czy podobne sytuacje zdarzają się bez opisywanej eskalacji?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #area("Jeśli tak — co jest podobne, a co inne? Co może pomagać?", height: 1.5cm, hint: "To mogą być warunki ochronne: osoba, miejsce, przewidywalność, wybór, brak presji.")
])

#pagebreak()
#text(size: 17pt, weight: "bold")[Bibliografia towarzysząca formularzom]
#v(8pt)
#text(size: 9pt)[Poniższe pozycje przeniesiono z instrukcji Małgorzaty Mikołajczyk „Jak korzystać z formularzy monitorowania”, z sekcji „Podstawa merytoryczna”. Stanowią bibliografię towarzyszącą formularzom, nie potwierdzenie walidacji narzędzia ani trafności każdej jego kategorii.]
#v(10pt)
#block(above: 7pt, breakable: false)[#text(size: 10pt)[Cooper, J. O., Heron, T. E., & Heward, W. L. (2020). _Applied Behavior Analysis_ (3rd ed.). Pearson.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[O'Neill, R. E., Albin, R. W., Storey, K., Horner, R. H., & Sprague, J. R. (2015). _Functional Assessment and Program Development for Problem Behavior: A Practical Handbook_ (3rd ed.). Cengage Learning.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[Garfinkel, S. N., Seth, A. K., Barrett, A. B., Suzuki, K., & Critchley, H. D. (2015). Knowing your own heart: Distinguishing interoceptive accuracy from interoceptive sensibility. _Biological Psychology_, 104, 65–74.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[Shah, P., Hall, R., Catmur, C., & Bird, G. (2016). Alexithymia, not autism, is associated with impaired interoception. _Cortex_, 81, 215–220.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. _Psychological Inquiry_, 11(4), 227–268.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[O'Nions, E., Christie, P., Gould, J., Viding, E., & Happé, F. (2014). Development of the "Extreme Demand Avoidance Questionnaire" (EDA-Q): Preliminary observations on a trait measure for pathological demand avoidance. _Journal of Child Psychology and Psychiatry_, 55(7), 758–768.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[Substance Abuse and Mental Health Services Administration. (2014). _SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach_. HHS Publication No. SMA 14-4884.]]
