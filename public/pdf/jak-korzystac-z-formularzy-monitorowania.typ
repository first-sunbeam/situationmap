#set document(
  title: "Jak korzystać z formularzy monitorowania",
  author: "Małgorzata Mikołajczyk"
)
#set page(
  paper: "a4",
  margin: (x: 2.3cm, y: 2cm),
  footer: context [
    #set text(size: 8.5pt, fill: rgb("#6c6a63"))
    #grid(
      columns: (1fr, auto, 1fr),
      align: (left, center, right),

      [© Małgorzata Mikołajczyk],
      [#counter(page).display("1")],
      [#link("https://analiza.tools/map")[analiza.tools/map]]
    )
  ]
)

#set text(
  font: "Linux Libertine",
  size: 10.5pt,
  lang: "pl"
)

#set par(
  justify: true,
  leading: 0.45em,
  spacing: 0.65em
)

#set heading(numbering: none)

#show heading.where(level: 1): it => block(
  sticky: true,
  above: 1em,
  below: 0.55em
)[
  #set text(size: 18pt, weight: "bold")
  #it.body
]

#show heading.where(level: 2): it => block(
  sticky: true,
  above: 0.8em,
  below: 0.4em
)[
  #set text(size: 15pt, weight: "bold")
  #it.body
]

#let note(content) = block(
  breakable: false,
  fill: rgb("#fff8ea"),
  stroke: rgb("#ecd7ab"),
  inset: 11pt,
  radius: 8pt
)[
  #set text(fill: rgb("#5d4a22"))
  #content
]

#let card(title, body) = block(
  fill: rgb("#fcfbf8"),
  stroke: rgb("#d7d2c7"),
  inset: 11pt,
  radius: 8pt,
  width: 100%,
  below: 0.7em
)[
  #text(weight: "bold")[#title]
  #v(0.35em)
  #body
]

#align(center)[
  #text(size: 22pt, weight: "bold")[
   Jak pracować z formularzami monitorowania
  ]

  #v(0.5em)

  #text(size: 13pt, fill: rgb("#6c6a63"))[
    Instrukcja używania formularzy do obserwacji sytuacji, szukania wzorców\
    i planowania wsparcia bez oceniania i przypisywania winy.
  ]
]

#v(2em)

#outline(
  title: [Spis treści],
  depth: 2
)

#pagebreak()

= Zasady zapisu i oceny

Jeden formularz dotyczy jednego zdarzenia. Oznaczaj źródła: O — obserwacja, P — przekaz osoby (także AAC), R — relacja innych, H — hipoteza. „Nie wiem”, „nie obserwowano” i „nie dotyczy” oznaczają różne rzeczy.

Reakcje i działania zapisuj przy odpowiednim etapie: *pierwsze sygnały*, *eskalacja* lub *po eskalacji*. Uwzględnij obserwacje i informacje przekazane przez osobę. Jeśli trudno ocenić — zaznacz to. Na początku każdego etapu są checkboxy źródeł O/P/R/H i opcjonalne doprecyzowanie, a następnie pytanie i miejsce na opis. Możesz zaznaczyć kilka źródeł. W opcjonalnym doprecyzowaniu możesz podać, kto przekazał informację i którego fragmentu opisu dotyczy dane źródło. Nie dodajemy osobnego podsumowania „co pomogło”. Można udzielić wsparcia, zanim ustalimy przyczynę trudności. Zapisz, co zrobiono i co zaobserwowano później.

W sekcji 3 formularza rozszerzonego między źródłami a opisem reakcji są pola o wystąpieniu, czasie i rodzaju sygnałów. Zaznaczenia źródeł dotyczą opisu reakcji otoczenia i odpowiedzi osoby poniżej. Źródła pozostałych informacji dopisz w doprecyzowaniu, wskazując konkretne pole. Wcześniejszych zaznaczeń nie rozszerzaj automatycznie na inne pola.

Czas zapisuj w minutach lub podaj godziny. Jeśli czas jest przybliżony, zaznacz to. Rozdziel trzy informacje:
- *Jak długo trwało opisane zachowanie?* Podaj, kiedy się rozpoczęło i kiedy się zakończyło.
- *Po ilu minutach od rozpoczęcia tego zachowania zmniejszyły się obserwowane oznaki napięcia?* Zapisz, jakie oznaki się zmieniły.
- *Po ilu minutach od zakończenia tego zachowania pojawiły się oznaki gotowości do konkretnej aktywności lub kontaktu?* Wskaż tę aktywność lub kontakt oraz oznaki gotowości albo komunikat osoby.

Jeśli danej zmiany nie zaobserwowano do końca obserwacji, zapisz to. Jeśli nie masz danych, wpisz „brak danych”. To, że osoba przestała krzyczeć lub zaczęła odpowiadać na komunikaty — słowem, gestem lub przez AAC — nie oznacza, że zgadza się wykonać zadanie. Gotowość do określonej aktywności i zgoda na nią to osobne informacje.

#note[
  *Przykład sposobu liczenia czasu:* krzyk trwał od 12:00 do 12:05, czyli 5 minut. O 12:08 osoba przestała zaciskać dłonie — tę zmianę zaobserwowano *8 minut od początku krzyku*. O 12:15 wybrała książkę i zaczęła czytać — oznaki gotowości do czytania zaobserwowano *10 minut od zakończenia krzyku*. Nie oznacza to gotowości ani zgody na inne zadanie.
]

Nasilenie opisuj mierzalną cechą wybranego zachowania; skutki i potencjalne zagrożenie opisuj osobno. Kontynuowanie aktywności samo nie potwierdza maskowania. Typy sygnałów są pomocą w opisie, nie rozpoznaniem mechanizmu.

Bibliografia wskazuje podstawy teoretyczne. Nie stanowi dowodu walidacji formularza.

= Po co są formularze

Formularze pomagają zamienić pojedyncze „incydenty” w dane, które można porównywać między sytuacjami.

Ich celem nie jest ocenianie osoby ani szukanie winy. Mają pomóc odpowiedzieć na pytania:
- co wydarzyło się przed wzrostem napięcia,
- jakie sygnały pojawiły się wcześniej,
- co pomogło,
- co zwiększyło trudność,
- jakie wzorce powtarzają się w czasie.

Formularz pomaga oddzielić:
- opis sytuacji od interpretacji,
- zachowanie od intencji,
- uspokojenie od powrotu do regulacji,
- pojedyncze zdarzenie bezpośrednio poprzedzające od całego kontekstu dnia.

Dzięki kilku podobnym zapisom można zauważyć wzorce, których nie widać po jednej sytuacji:
- konkretne pory dnia,
- typy wymagań,
- zmiany planu,
- warunki przeciążające,
- brak przewidywalności,
- zbyt szybkie przejścia między aktywnościami,
- długi czas potrzebny na powrót do regulacji i gotowości.

#note[
  Formularz nie służy do budowania „listy problemowych zachowań”.
  Ma pomagać w planowaniu wsparcia i modyfikacji środowiska.
]

= Zasady opisu sytuacji

== 1. Opisuj fakty obserwowalne

Zapisuj to, co można było zobaczyć lub usłyszeć.

Dobrze:
- „zacisnął dłonie”,
- „powtarzała: nie chcę”,
- „usiadł pod stołem”,
- „podniósł głos”,
- „wyszedł z sali”.

Unikaj:
- „manipulował”,
- „robił specjalnie”,
- „testował granice”,
- „był leniwy”,
- „chciała zwrócić uwagę”.

== 2. Oddziel tło od zdarzenia bezpośrednio poprzedzającego

Zdarzenie bezpośrednio poprzedzające nie zawsze jest „dużą” sytuacją.

Często jest ostatnim elementem po serii wcześniejszych obciążeń:
hałasie, zmęczeniu, zmianach planu, bólu, presji albo wielu drobnych wymaganiach.

== 3. Zapisuj pierwsze sygnały

Najważniejsze są momenty przed eskalacją.

To mogą być:
- wycofanie,
- milczenie,
- szybsze mówienie,
- napięcie ciała,
- żarty lub ironia,
- zwiększona potrzeba kontroli,
- zatrzymanie aktywności,
- „zamrożenie”.

== 4. Notuj reakcję otoczenia

Ważne jest nie tylko to, co zrobiła osoba, ale też:
- jak odpowiedziało otoczenie,
- czy wsparcie było dostępne,
- czy pojawiły się dodatkowe wymagania,
- czy osoba miała możliwość wyboru lub przerwy.

== 5. Oddziel uspokojenie od gotowości

To, że osoba przestała płakać, krzyczeć albo protestować, nie zawsze oznacza gotowość do:
- rozmowy,
- kolejnych poleceń,
- powrotu do aktywności,
- podejmowania decyzji.

W formularzu warto zaznaczyć:
- kiedy zachowanie się zatrzymało,
- a kiedy wróciła możliwość kontaktu i współpracy.

#note[
  *Praktycznie:* jeśli po sytuacji nie wiadomo, co wpisać, zacznij od trzech rzeczy:
  - co było wcześniej,
  - co było pierwszym sygnałem,
  - co pomogło i po czym to poznajemy.
]

= Formularz prosty

Formularz prosty służy do szybkiego zapisu po sytuacji.

Najlepiej sprawdza się:
- w domu,
- w szkole,
- podczas codziennych sytuacji,
- wtedy, gdy nie ma czasu na pełną analizę.

== Jak go wypełniać

#table(
  columns: (2fr, 3fr, 3fr),
  stroke: rgb("#d7d2c7"),
  fill: (x, y) => if y == 0 { rgb("#f1efe8") },

  table.header([*Pytanie*], [*Co wpisywać*], [*Czego unikać*]),

  [1. Stan przed sytuacją], [Sen, głód, ból, warunki i wcześniejsze trudności.], [Ocen typu „zły humor”.],
  [2. Bezpośrednio przed], [Co wydarzyło się w ostatnich minutach.], [Uznawania tego za ustaloną przyczynę.],
  [3. Pierwsze sygnały], [Obserwowane zmiany zachowania lub komunikat osoby.], [Przypisywania mechanizmu reakcji.],
  [4. Reakcja na pierwsze sygnały], [Jak odpowiedziało otoczenie i co osoba zrobiła lub zakomunikowała później.], [Pomijania odpowiedzi osoby.],
  [5. Eskalacja], [Przebieg oraz działania i zmiany towarzyszące nasilaniu się i ustępowaniu.], [Zakładania, że następstwo oznacza przyczynę.],
  [6. Po eskalacji], [Potrzeby, zapewnione wsparcie i oznaki gotowości.], [Utożsamiania ciszy lub odpowiadania ze zgodą.],
  [7. Wpływ i wybór], [Co można było wybrać lub negocjować.], [Dopisywania intencji.],
  [8. Przewidywalność], [Co było znane i nieznane.], [Zakładania, że osoba wiedziała.],
  [9. Czas gotowości], [Minuty od zakończenia zachowania lub godzina; zaznacz szacunek albo brak danych.], [Przepisywania opisu potrzeb po raz drugi.]
)

#note[
  Formularz prosty nie ma dawać pełnej diagnozy sytuacji. \
  Ma umożliwić szybki zapis danych, które później można porównać.
]

= Formularz rozszerzony

Wersja rozszerzona służy do dokładniejszej analizy sytuacji.

Najlepiej sprawdza się:
- przy powtarzających się trudnościach,
- podczas planowania wsparcia,
- w pracy zespołowej,
- przy budowaniu hipotez funkcjonalnych.

Pozwala oddzielić:
- obciążenia z całego dnia,
- zdarzenie bezpośrednio poprzedzające,
- wymagania i przewidywalność,
- pierwsze sygnały,
- działania otoczenia,
- przebieg sytuacji,
- czas powrotu do regulacji i gotowości.

== Sekcje formularza

#table(
  columns: (2fr, 3fr, 4fr),
  stroke: rgb("#d7d2c7"),
  fill: (x, y) => if y == 0 { rgb("#f1efe8") },

  table.header([*Sekcja*], [*Co opisuje*], [*Po co jest*]),

  [0. Kontekst dnia],
  [Sen, zmęczenie, ból, wcześniejsze obciążenia.],
  [Pomaga ocenić punkt startowy sytuacji.],

  [1. Bezpośrednio przed],
  [Ostatnie minuty przed wzrostem napięcia.],
  [Pozwala oddzielić zdarzenie poprzedzające od wcześniejszego tła.],

  [2. Wymagania i kontrola],
  [Co było jasne, co narzucone, na co osoba miała wpływ.],
  [Pomaga ocenić rolę przewidywalności i autonomii.],

  [3. Pierwsze sygnały],
  [Zmiany zachowania, reakcja otoczenia i późniejsza odpowiedź osoby.],
  [Pomaga zauważyć moment na wcześniejsze wsparcie.],

  [3B. Kontynuowanie i możliwe maskowanie],
  [Obserwacje, relację osoby i hipotezę o wysiłku lub maskowaniu.],
  [Pomaga zebrać informacje o możliwym koszcie; sam zapis go nie mierzy.],

  [4. Udzielone wsparcie i warunki],
  [Rodzaj wsparcia i warunki dostępu do niego.],
  [Oddziela dostępność pomocy od nacisku i negocjacji; nie powtarza opisu reakcji.],

  [5. Zachowanie / eskalacja],
  [Przebieg eskalacji oraz towarzyszące działania i zmiany; nasilenie, skutki i ryzyko.],
  [Oddziela opis od interpretacji.],

  [6. Czas i gotowość],
  [Czas trwania zachowania, zmniejszenia oznak napięcia i zaobserwowania gotowości.],
  [Pomaga planować dalszą aktywność.],

  [7. Po eskalacji],
  [Potrzeby osoby, zapewnione wsparcie i oznaki gotowości oraz dalsze zdarzenia.],
  [Pozwala ocenić ryzyko wtórnej eskalacji.]
)

= Jak używać danych z formularzy

Formularz ma sens przede wszystkim wtedy, gdy porównujemy kilka sytuacji.

Jedno zdarzenie pokazuje pojedynczy dzień.
Kilka formularzy może wskazać wzorzec. Porównuj również podobne sytuacje bez eskalacji i liczbę okazji. Samo powtarzanie się związku nie potwierdza przyczyny.

== Na co zwracać uwagę

- Czy trudności pojawiają się częściej o konkretnej porze dnia?
- Czy wzrost napięcia pojawia się po zmianach planu?
- Czy określony typ wymagań zwiększa trudność?
- Czy osoba potrzebuje długiego czasu na powrót do gotowości?
- Czy konkretne warunki środowiskowe zwiększają obciążenie?
- Czy wsparcie było dostępne wystarczająco wcześnie?

== Czego formularz nie zakłada

Formularz nie zakłada, że:
- każde wymaganie jest szkodliwe,
- każda trudność wynika wyłącznie z sensoryki,
- wsparcie oznacza brak granic,
- analiza kontekstu wyklucza odpowiedzialność za bezpieczeństwo.

Celem formularza nie jest usuwanie wszystkich wymagań.

Celem jest:
- lepsze rozumienie sytuacji,
- wcześniejsze zauważanie sygnałów,
- dostosowanie sposobu wsparcia,
- zmniejszanie niepotrzebnego przeciążenia,
- budowanie bardziej przewidywalnego środowiska.

#note[
  Celem nie jest usunięcie wszystkich wymagań. \
  Celem jest sprawdzanie:\
  kiedy, \
  jak\
  i w jakich warunkach\
  stają się dostępne.
]

= Czego formularz nie robi

== Nie diagnozuje

Formularz nie diagnozuje autyzmu, ADHD, PDA, traumy ani innych trudności rozwojowych lub psychicznych.

Może dostarczać materiału obserwacyjnego pomocnego w dalszej ocenie, ale sam nie jest narzędziem diagnostycznym.

== Nie służy do oceniania

Formularz nie służy do:
- przypisywania złej woli,
- oceniania charakteru,
- budowania narracji o „trudnym dziecku”,
- uzasadniania kar.

== Nie zastępuje oceny klinicznej

Formularz nie zastępuje:
- diagnozy,
- funkcjonalnej oceny zachowania,
- planu wsparcia,
- superwizji klinicznej.

Jest narzędziem do zbierania danych i budowania hipotez.

== Nie daje jednej odpowiedzi

Nie każdy wzorzec będzie od razu widoczny.

Czasem potrzeba kilku lub kilkunastu zapisów, żeby zauważyć:
- powtarzalne obciążenia,
- konkretne warunki,
- skuteczne strategie wsparcia.

#note[
  Formularz ma pomagać w myśleniu o sytuacji,\
  nie zamykać jej w jednej interpretacji.
]

= Podstawa merytoryczna

Formularz opiera się między innymi na:
- analizie funkcjonalnej zachowania,
- obserwacji kontekstu środowiskowego,
- podejściach trauma-informed,
- wiedzy dotyczącej regulacji, interocepcji i sensoryki,
- badaniach dotyczących autonomii i przewidywalności.

Najważniejsze źródła:
- Cooper, J. O., Heron, T. E., & Heward, W. L. (2020). _Applied Behavior Analysis_ (3rd ed.). Pearson.
- O'Neill, R. E., Albin, R. W., Storey, K., Horner, R. H., & Sprague, J. R. (2015). _Functional Assessment and Program Development for Problem Behavior: A Practical Handbook_ (3rd ed.). Cengage Learning.
- Garfinkel, S. N., Seth, A. K., Barrett, A. B., Suzuki, K., & Critchley, H. D. (2015). Knowing your own heart: Distinguishing interoceptive accuracy from interoceptive sensibility. _Biological Psychology_, 104, 65–74.
- Shah, P., Hall, R., Catmur, C., & Bird, G. (2016). Alexithymia, not autism, is associated with impaired interoception. _Cortex_, 81, 215–220.
- Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. _Psychological Inquiry_, 11(4), 227–268.
- O'Nions, E., Christie, P., Gould, J., Viding, E., & Happé, F. (2014). Development of the "Extreme Demand Avoidance Questionnaire" (EDA-Q): Preliminary observations on a trait measure for pathological demand avoidance. _Journal of Child Psychology and Psychiatry_, 55(7), 758–768.
- Substance Abuse and Mental Health Services Administration. (2014). _SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach_. HHS Publication No. SMA 14-4884.

#v(2em)

#align(center)[
  #line(length: 60%, stroke: rgb("#d7d2c7"))

  #v(1em)

  #text(size: 10pt, fill: rgb("#6c6a63"))[
    *Małgorzata Mikołajczyk* \
    Psycholog · Analityk zachowania (BCBA)\
    #link("http://autyzm.poznan.pl")
  ]
]