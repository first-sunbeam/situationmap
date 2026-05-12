#set document(
  title: "Puste formularze monitorowania",
  author: "Małgorzata Mikołajczyk"
)

#set page(
  paper: "a4",
  margin: (x: 1.7cm, y: 1.5cm),
  footer: context [
    #set text(size: 8pt, fill: rgb("#6c6a63"))
    #grid(
      columns: (1fr, auto, 1fr),
      align: (left, center, right),
      [© Małgorzata Mikołajczyk],
      [#counter(page).display("1")],
      [#link("https://analiza.tools/map")[analiza.tools/map]]
    )
  ]
)

#set text(font: "Linux Libertine", size: 9.6pt, lang: "pl")
#set par(justify: false, leading: 0.48em)
#set heading(numbering: none)

#show heading.where(level: 1): it => block(above: 0.8em, below: 0.6em)[
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

#let muted = rgb("#6c6a63")
#let line-stroke = rgb("#bdb7aa")
#let soft = rgb("#fcfbf8")
#let soft-stroke = rgb("#d7d2c7")

#let title-page(title, subtitle) = align(center)[
  #v(3cm)
  #text(size: 23pt, weight: "bold")[#title]
  #v(0.7em)
  #text(size: 12.5pt, fill: muted)[#subtitle]
  #v(1.4em)
  #text(fill: muted)[Wersja do druku / wypełniania ręcznego]
]

#let field(label, height: 0.85cm) = block(width: 100%, below: 0.35em)[
  #text(weight: "bold")[#label]
  #v(0.12em)
  #line(length: 100%, stroke: line-stroke)
  #v(height)
]

#let area(label, height: 2cm) = block(width: 100%, below: 0.45em)[
  #text(weight: "bold")[#label]
  #v(0.12em)
  #rect(width: 100%, height: height, stroke: line-stroke, radius: 2pt)
]

#let row-fields(a, b) = grid(columns: (1fr, 1fr), column-gutter: 0.8cm, field(a), field(b))

#let checks(items, columns: 2) = block(width: 100%, below: 0.35em)[
  #grid(
    columns: if columns == 3 { (1fr, 1fr, 1fr) } else { (1fr, 1fr) },
    column-gutter: 0.5cm,
    row-gutter: 0.16cm,
    ..items.map(item => [☐ #item])
  )
]

#let select(label, items, columns: 2) = block(width: 100%, below: 0.55em)[
  #text(weight: "bold")[#label]
  #v(0.18em)
  #checks(items, columns: columns)
]

#let section(title, body) = block(
  fill: soft,
  stroke: soft-stroke,
  inset: 8pt,
  radius: 6pt,
  width: 100%,
  below: 0.65em
)[
  #text(size: 12.5pt, weight: "bold")[#title]
  #v(0.35em)
  #body
]

#let meta() = section("Dane podstawowe", [
  #grid(columns: (1fr, 1fr, 1.3fr), column-gutter: 0.6cm,
    field("Data"),
    field("Godzina"),
    field("Miejsce")
  )
  #grid(columns: (1fr, 1fr), column-gutter: 0.6cm,
    field("Inicjały / imię osoby"),
    field("Rodzic / opiekun / osoba prowadząca")
  )
  #field("Inne osoby obecne")
  #select("Środowisko", ("Dom", "Szkoła", "Ośrodek", "Inne: ........................................"), columns: 2)
])

#title-page("Formularze monitorowania sytuacji", "Puste formularze do pobrania, wydruku i ręcznego wypełniania")

#pagebreak()

= Formularz prosty

#meta()

#section("Szybki opis sytuacji", [
  #area("Jak wyglądał stan osoby przed sytuacją?", height: 2.1cm)
  #area("Co działo się bezpośrednio przed sytuacją?", height: 2.1cm)
  #area("Pierwsze sygnały narastającego napięcia", height: 1.8cm)
  #area("Reakcja dorosłych / otoczenia", height: 1.8cm)
  #area("Co zrobiła osoba? Opis zachowania — fakty obserwowalne", height: 2.2cm)
  #area("Co pomogło zmniejszyć napięcie lub wrócić do regulacji?", height: 2cm)
  #area("Czy osoba miała wpływ, wybór, możliwość negocjacji lub przerwy?", height: 1.7cm)
  #area("Czy sytuacja była przewidywalna? Co było znane / nieznane?", height: 1.5cm)
  #select("Powrót do gotowości", ("5 minut", "10–30 minut", "1–2 godziny", "kilka godzin lub następnego dnia"), columns: 2)
])

#pagebreak()

= Karta monitorowania sytuacji — formularz rozszerzony

#meta()

#section("0. Poziom bazowy i kontekst dnia", [
  #select("Poziom napięcia przed zdarzeniem", ("0 niski / stabilny", "1 podwyższony", "2 wysoki", "3 bardzo wysoki"), columns: 2)
  #select("Czy osoba była zmęczona?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #select("Czy osoba spała wystarczająco?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #field("Jeśli sen miał znaczenie — doprecyzuj")
  #select("Etap pobytu / kontekst dnia, jeśli dotyczy", ("dzień przyjazdu / zmiany", "dzień wyjazdu / powrotu", "środek tygodnia", "koniec tygodnia", "nie dotyczy"), columns: 2)
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
  #area("Doprecyzowanie tego, co było bezpośrednio przed", height: 2.3cm)
])

#section("2. Czego oczekiwano w tym momencie?", [
  #area("Na co osoba miała wpływ?", height: 1.4cm)
  #area("Co było nieznane, narzucone albo poza wpływem?", height: 1.4cm)
  #select("Czy było wiadomo, co się wydarzy?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #select("Czy było wiadomo, jak długo to potrwa?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #select("Czy była możliwość negocjacji lub wyboru?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #select("Oczekiwania / wymagania", (
    "brak wymagań", "koniec aktywności", "rozpoczęcie zadania", "przejście do innego miejsca", "czekanie", "kontakt społeczny", "podporządkowanie się zasadzie", "wykonanie czynności samoobsługowej", "inne: ........................................"
  ))
])

#pagebreak()

#section("3. Pierwsze oznaki narastającego napięcia", [
  #select("Czy pojawiły się sygnały?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #field("Ile czasu przed eskalacją?")
  #select("Typ 1: aktywacja", (
    "przyspieszone oddychanie", "napięcie mięśniowe", "pot", "drżenie", "rozszerzone źrenice", "ucieczka / walka", "inne: ........................................"
  ))
  #select("Typ 2: shutdown / zamrożenie", (
    "patrzenie w jeden punkt / podłogę", "brak reakcji na głos", "spowolnienie ruchów", "opadnięcie ciała", "wycofanie", "inne: ........................................"
  ))
  #select("Typ 3: sensoryczny", (
    "zatykanie uszu", "zasłanianie oczu", "stereotypie", "unikanie dotyku", "ucieczka z pomieszczenia", "inne: ........................................"
  ))
  #field("Co zwykle pojawia się najpierw?")
  #select("Czy zapowiada trudniejsze zachowanie?", ("Tak", "Nie", "Nie wiem"), columns: 3)
])

#section("3B. Strategie kompensacyjne i maskowanie", [
  #select("Czy osoba próbowała kontynuować aktywność mimo narastającego napięcia?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #select("Jeśli tak — co pozwoliło osobie „trzymać się razem” przed eskalacją?", (
    "maskowanie / ukrywanie dyskomfortu", "wycofanie w fantazję / humor / kontrolowanie rozmowy", "wsparcie osoby towarzyszącej", "jasny koniec aktywności", "lęk przed konsekwencjami / oceną", "silna motywacja wewnętrzna", "inne: ........................................"
  ))
  #select("Ile czasu osoba „trzymała się” przed eskalacją?", ("kilka minut", "10–30 minut", "ponad 30 minut", "cały dzień — eskalacja później / w domu"), columns: 2)
])

#section("4. Działania podjęte przed eskalacją", [
  #select("Faza napięcia w momencie podjęcia działań", ("zielona — możliwa rozmowa", "żółta — narastające napięcie", "czerwona — pełna eskalacja", "trudno określić"), columns: 2)
  #select("Działania podjęte przed eskalacją", (
    "obniżenie bodźców sensorycznych", "zwiększenie autonomii / wybór", "zapewnienie przewidywalności", "wsparcie interoceptywne", "czas bez wymagań / pauza", "regulacja sensoryczna", "inne: ........................................"
  ))
  #select("Czy działanie było bezwarunkowe, bez nacisku i negocjacji?", ("Tak", "Nie", "Częściowo", "Nie wiem"), columns: 4)
  #select("Czy użyto regulatora / strategii regulacyjnej?", ("Tak", "Nie", "Częściowo"), columns: 3)
  #select("Czy działanie zmniejszyło napięcie?", ("Tak", "Nie", "Częściowo"), columns: 3)
  #area("Co następnym razem warto zrobić wcześniej?", height: 1.5cm)
])

#pagebreak()

#section("5. Opis zachowania", [
  #area("Opis zachowania — fakty obserwowalne", height: 2.8cm)
  #select("Intensywność", ("0 brak agresji", "1 lekkie", "2 umiarkowane", "3 wysokie ryzyko"), columns: 2)
  #select("Skutki / szkody, jeśli wystąpiły", ("brak szkód", "krzyk / płacz", "rzucanie przedmiotami", "niszczenie rzeczy", "agresja wobec innych", "autoagresja", "ucieczka / oddalenie się", "inne: ........................................"), columns: 2)
])

#section("6. Regulacja i wpływ", [
  #field("Czas trwania eskalacji")
  #select("Czas do pełnego uspokojenia emocjonalnego", ("do 5 minut", "5–15 minut", "15–30 minut", "30–60 minut", "ponad godzinę"), columns: 2)
  #select("Czas powrotu do gotowości poznawczej / kontaktu", ("od razu po uspokojeniu", "10–30 minut po", "1–2 godziny po", "kilka godzin lub następnego dnia"), columns: 2)
  #select("Co najbardziej pomogło zakończyć eskalację?", (
    "czas / przeczekanie bez interwencji", "cisza / wyciszenie bodźców", "obecność bliskiej osoby", "kontakt 1:1", "przerwa od wymagań", "dostęp do regulacji sensorycznej", "wycofanie wymagania", "inne: ........................................"
  ))
  #area("Co pogorszyło sytuację albo wydłużyło powrót do regulacji?", height: 1.6cm)
  #select("Co pomogło wrócić do gotowości po sytuacji?", (
    "cisza i brak bodźców", "sen / drzemka", "jedzenie / picie", "aktywność sensoryczna", "obecność bliskiej osoby bez wymagań", "samotność", "ulubiona aktywność bez presji", "czas", "inne: ........................................"
  ))
])

#section("7. Po zdarzeniu", [
  #select("Co wydarzyło się po zdarzeniu?", (
    "przejście do spokojniejszego miejsca", "odpoczynek", "rozmowa później", "powrót do aktywności", "sen", "kontakt z bliską osobą", "brak dalszych wymagań", "inne: ........................................"
  ))
  #select("Czy w tym tygodniu była interwencja fizyczna?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #field("Jeśli tak — ile razy?")
  #select("Czy próg reakcji był niższy niż zwykle?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #field("Notatka dotycząca interwencji fizycznej / bezpieczeństwa")
])

#pagebreak()

= Mapa środowiska

#meta()

#section("1. Miejsca i preferowane przestrzenie", [
  #select("Gdzie osobie jest najłatwiej?", ("pokój osoby", "salon / wspólna przestrzeń", "kuchnia / jadalnia", "łazienka", "przedpokój / przejścia", "na zewnątrz", "samochód", "inne: ........................................"), columns: 2)
  #area("Dlaczego te miejsca pomagają?", height: 1.4cm)
  #select("Jakich miejsc osoba unika albo gdzie jest trudniej?", ("pokój osoby", "salon / wspólna przestrzeń", "kuchnia / jadalnia", "łazienka", "przedpokój / przejścia", "na zewnątrz", "samochód", "inne: ........................................"), columns: 2)
  #area("Dlaczego te miejsca są trudne?", height: 1.4cm)
])

#section("2. Aktywności, role i relacje", [
  #area("Co osoba lubi robić / co ją wzmacnia?", height: 1.4cm)
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
  #area("Z kim osoba najłatwiej współpracuje / przy kim czuje się bezpiecznie?", height: 1.3cm)
  #select("Co zmniejsza napięcie?", (
    "cisza / wyciszenie bodźców", "ruch — huśtawka / trampolina / spacer", "ciężar / ucisk", "chłód lub ciepło", "stereotypie / bujanie / skakanie", "jedzenie / picie", "sen / drzemka", "toaleta", "obecność bliskiej osoby bez wymagań", "samotność / wycofanie", "kontakt fizyczny", "dystans / przestrzeń osobista", "wycofanie wymagania", "dostęp do ulubionej aktywności", "wybór / możliwość decyzji", "informacja, ile to potrwa", "inne: ........................................"
  ))
  #area("Co daje energię / pomaga odbudować zasoby?", height: 1.2cm)
])

#pagebreak()

#section("5. Od czego zależy funkcjonowanie?", [
  #select("Zachowanie / gotowość zależy szczególnie od…", ("hałas", "liczba osób", "zmiana planu", "pora dnia", "sen", "jedzenie / picie", "ból / dyskomfort", "temperatura", "kontakt społeczny", "presja czasu", "oczekiwanie", "przejścia między aktywnościami", "inne: ........................................"), columns: 2)
  #area("Jak zmienia się zachowanie w zależności od tych warunków?", height: 1.8cm)
])

#section("6. Bezpieczne przestrzenie i osoby", [
  #area("Gdzie / przy kim osoba może wracać do regulacji bez dodatkowych wymagań?", height: 2.2cm)
])

#section("7. Konteksty eskalacji i profilaktyka", [
  #select("Kiedy najczęściej rośnie ryzyko eskalacji?", ("oczekiwanie / czekanie", "koniec aktywności", "zmiana planu", "hałas / tłok", "kontakt społeczny", "korekta zachowania", "brak wpływu", "przejście do innego miejsca", "zmęczenie / głód / ból", "inne: ........................................"), columns: 2)
  #select("Co może zmniejszyć ryzyko eskalacji?", (
    "uprzedzenie / przygotowanie", "timer / plan wizualny", "wybór kiedy / jak / w jakiej kolejności", "negocjacja / omówienie", "jasny koniec", "brak pośpiechu", "obecność bliskiej osoby", "dostęp do regulacji sensorycznej", "inne: ........................................"
  ), columns: 2)
  #select("Czy są sytuacje bez agresji mimo trudności?", ("Tak", "Nie", "Nie wiem"), columns: 3)
  #area("Jeśli tak — gdzie / kiedy i co wtedy pomaga?", height: 1.5cm)
])
