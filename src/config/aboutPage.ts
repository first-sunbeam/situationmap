import type { LanguageCode } from "../i18n/useLanguage";

export interface AboutCard {
  title: string;
  text: string;
}

export interface AboutTableRow {
  section: string;
  measures: string;
  purpose: string;
}

export interface AboutSection {
  id: string;
  title: string;
  badge?: string;
  paragraphs?: string[];
  note?: string;
  cards?: AboutCard[];
  list?: string[];
  table?: AboutTableRow[];
}

export interface AboutPageContent {
  title: string;
  lead: string;
  navTitle: string;
  sections: AboutSection[];
}

export const aboutPageByLanguage: Record<LanguageCode, AboutPageContent> = {
  pl: {
    title: "Jak czytać formularze monitorowania eskalacji i regulacji",
    lead: "Formularze pomagają uporządkować opis sytuacji trudnej: co było przed, jakie pojawiły się sygnały napięcia, jak przebiegała eskalacja, co pomogło i co mogło zwiększyć obciążenie.",
    navTitle: "Spis treści",
    sections: [
      {
        id: "purpose",
        title: "Po co są formularze",
        badge: "Opis merytoryczny formularzy",
        paragraphs: [
          "Celem formularzy jest zamiana chaosu i interpretacji na dane, które można porównać między sytuacjami. Zamiast pytać, czy ktoś był „niegrzeczny”, formularz pomaga zapytać: co przeciążyło układ nerwowy, jakie sygnały pojawiły się wcześniej i jakie wsparcie było skuteczne.",
          "Zachowanie jest czytane jako możliwa odpowiedź na przeciążenie sensoryczne, interoceptywne, społeczne albo związane z utratą autonomii i przewidywalności."
        ],
        note: "To narzędzie do zauważania wzorców, nie do szukania winy."
      },
      {
        id: "reading-behavior",
        title: "Jak czytać zachowanie",
        cards: [
          { title: "1. Stan bazowy", text: "Sprawdzamy, z czym osoba weszła w sytuację: sen, głód, ból, liczba bodźców, wcześniejsze zmiany planu." },
          { title: "2. Wyzwalacz", text: "Patrzymy, co wydarzyło się bezpośrednio przed narastaniem napięcia — zwykle w ostatnich kilku minutach." },
          { title: "3. Sygnały", text: "Szukamy pierwszych oznak aktywacji, shutdownu albo przeciążenia sensorycznego." },
          { title: "4. Odpowiedź otoczenia", text: "Sprawdzamy, czy wsparcie było dopasowane do typu obciążenia i dostępne bez dodatkowego warunku." },
          { title: "5. Powrót", text: "Oddzielamy uspokojenie emocjonalne od gotowości poznawczej do kontaktu, rozmowy lub aktywności." }
        ]
      },
      {
        id: "simple-form",
        title: "Formularz prosty",
        paragraphs: [
          "Wersja prosta służy do szybkiego zapisu po zdarzeniu. Zachowuje kluczowe osie myślenia: stan przed zdarzeniem, bezpośredni kontekst, pierwsze sygnały, reakcję otoczenia, wpływ/autonomię i czas do odzyskania gotowości.",
          "To dobra wersja, gdy potrzebny jest krótki opis, ale bez utraty informacji ważnych dla regulacji i planowania wsparcia."
        ],
        list: [
          "Pytanie 1: stan ciała i kontekst bezpośrednio przed zdarzeniem.",
          "Pytanie 2: pierwsze sygnały napięcia i odpowiedź otoczenia.",
          "Pytanie 3: fakty obserwowalne, bez etykietowania intencji.",
          "Pytanie 4: co pomogło wyregulować sytuację, a co nie pomogło.",
          "Pytanie 5: wpływ, przewidywalność i zakres autonomii.",
          "Pytanie 6: czas do gotowości na kontakt, rozmowę lub aktywność."
        ]
      },
      {
        id: "extended-form",
        title: "Formularz rozszerzony",
        paragraphs: [
          "Wersja rozszerzona rozkłada sytuację na części: obciążenia z dnia, bezpośredni trigger, oczekiwania, sygnały ostrzegawcze, działania wsparcia, opis zachowania i powrót do równowagi.",
          "Dzięki temu łatwiej zauważyć maskowanie, opóźnioną eskalację, koszt kontynuowania aktywności mimo przeciążenia oraz różnicę między uspokojeniem a gotowością poznawczą."
        ]
      },
      {
        id: "sections",
        title: "Opis sekcji 0–7",
        table: [
          { section: "0. Poziom bazowy i kontekst dnia", measures: "Sen, zmęczenie, ból, głód, bodźce, wcześniejsze obciążenia.", purpose: "Pomaga zrozumieć poziom dostępnych zasobów i tolerancji na obciążenie przed zdarzeniem." },
          { section: "1. Bezpośrednio przed zdarzeniem", measures: "Ostatnie minuty przed narastaniem napięcia.", purpose: "Oddziela trigger sytuacyjny od późniejszej reakcji układu nerwowego." },
          { section: "2. Oczekiwania, wpływ, przewidywalność", measures: "Co było jasne, co było narzucone, na co był wpływ.", purpose: "Pokazuje rolę autonomii i niepewności, szczególnie ważną w PDA." },
          { section: "3. Pierwsze oznaki napięcia", measures: "Aktywacja, shutdown, przeciążenie sensoryczne.", purpose: "Pomaga dobrać wsparcie do typu reakcji, nie tylko do wyglądu zachowania." },
          { section: "3B. Strategie kompensacyjne i maskowanie", measures: "Czy osoba kontynuowała aktywność mimo przeciążenia.", purpose: "Ujawnia koszt pozornego funkcjonowania i ryzyko opóźnionej eskalacji." },
          { section: "4. Faza napięcia i działania", measures: "Jakie wsparcie podjęto i czy było dopasowane.", purpose: "Pomaga odróżnić realne wsparcie od zamieniania wsparcia w kolejne wymaganie." },
          { section: "5. Opis zachowania", measures: "Fakty: słowa, ruchy, krzyk, wycofanie, autoagresja, zniszczenia.", purpose: "Chroni przed moralizowaniem i daje dane obserwowalne." },
          { section: "6. Zakończenie eskalacji i powrót", measures: "Czas trwania, uspokojenie, gotowość poznawcza, czynniki regulujące.", purpose: "Pokazuje, że brak płaczu lub krzyku nie musi oznaczać gotowości do kontaktu." },
          { section: "7. Co wydarzyło się po zdarzeniu", measures: "Dalszy przebieg, kontakt z opiekunem, interwencja fizyczna, powrót do aktywności.", purpose: "Daje materiał do oceny bezpieczeństwa, etyki i ryzyka wtórnej eskalacji lub dodatkowego przeciążenia." }
        ]
      },
      {
        id: "use",
        title: "Jak używać",
        cards: [
          { title: "W domu", text: "Wypełniaj krótko po zdarzeniu albo tego samego dnia. Szukaj powtarzalnych wzorców: pory dnia, przejść, hałasu, wymagań i czasu powrotu do gotowości." },
          { title: "W szkole", text: "Ustal jeden sposób opisu w zespole. Wpisuj fakty i warunki środowiskowe zamiast interpretacji intencji." },
          { title: "W zespole specjalistycznym", text: "Porównuj formularze w serii. Jedno zdarzenie mówi niewiele; kilka podobnych zdarzeń pokazuje wzorzec." }
        ]
      },
      {
        id: "limits",
        title: "Czego formularz nie robi",
        list: [
          "Nie diagnozuje autyzmu, PDA ani traumy.",
          "Nie służy do uzasadniania kary ani do udowadniania intencji.",
          "Nie zastępuje oceny klinicznej, superwizji ani planu wsparcia.",
          "Nie daje jednej magicznej odpowiedzi — daje materiał do myślenia i porównywania."
        ]
      },
      {
        id: "background",
        title: "Podstawa merytoryczna",
        cards: [
          { title: "Interocepcja i regulacja", text: "Shah et al., Garfinkel et al., DuBois et al., Mahler." },
          { title: "Sensoryka i meltdown", text: "Ayres, Miller et al., Kildahl et al., National Autistic Society." },
          { title: "PDA, autonomia, przewidywalność", text: "Newson et al., O'Nions et al., PDA Society, Deci & Ryan." },
          { title: "Układ nerwowy i powrót do równowagi", text: "Porges, Dana, Siegel & Bryson, Groden et al." },
          { title: "Opis zachowania i etyka", text: "Cooper et al., O'Neill et al., BACB, CPI, US Department of Education." }
        ]
      }
    ]
  },
  en: {
    title: "How to understand escalation and regulation monitoring forms",
    lead: "The forms help structure the description of a challenging situation: what happened before, what signs of tension appeared, how escalation unfolded, what helped, and what may have increased stress or overload.",
    navTitle: "Contents",
    sections: [
      {
        id: "purpose",
        title: "Why use these forms",
        badge: "Form overview",
        paragraphs: [
          "The purpose of the forms is to turn chaos and interpretation into data that can be compared across situations. Instead of asking whether someone was “misbehaving”, the form helps ask: what overloaded the nervous system, what early warning signs appeared, and what support was effective.",
          "Behavior is understood as a possible response to sensory, interoceptive, social, autonomy-related, or predictability-related overload."
        ],
        note: "This is a tool for noticing patterns, not for assigning blame."
      },
      {
        id: "reading-behavior",
        title: "How to understand behavior",
        cards: [
          { title: "1. Baseline state", text: "Check what the person brought into the situation: sleep, hunger, pain, number of stimuli, earlier changes in routine." },
          { title: "2. Trigger", text: "Look at what happened immediately before tension increased — usually in the last few minutes." },
          { title: "3. Warning signs", text: "Look for early signs of activation, shutdown, or sensory overload." },
          { title: "4. Adult response", text: "Check whether support matched the type of overload and was available without additional conditions." },
          { title: "5. Recovery", text: "Separate emotional calming from cognitive readiness for contact, conversation, or activity." }
        ]
      },
      {
        id: "simple-form",
        title: "Simple form",
        paragraphs: [
          "The simple version is for quick recording after an incident. It keeps the key areas: state before the incident, immediate context, first warning signs, adult response, control/autonomy, and time to regain readiness for engagement.",
          "It is useful when a brief description is needed without losing information important for regulation and support planning."
        ],
        list: [
          "Question 1: body state and immediate context before the incident.",
          "Question 2: first signs of tension and the adult response.",
          "Question 3: observable facts, without labeling intentions.",
          "Question 4: what helped regulate the situation and what did not help.",
          "Question 5: control, predictability, and autonomy.",
          "Question 6: time to readiness for contact, conversation, or activity."
        ]
      },
      {
        id: "extended-form",
        title: "Extended form",
        paragraphs: [
          "The extended version breaks the situation into parts: daily load, immediate trigger, expectations, warning signs, support actions, behavior description, and return to balance.",
          "This makes it easier to notice masking, delayed escalation, the cost of continuing activity despite overload, and the difference between calming and cognitive readiness."
        ]
      },
      {
        id: "sections",
        title: "Sections 0–7",
        table: [
          { section: "0. Baseline and daily context", measures: "Sleep, tiredness, pain, hunger, stimuli, earlier demands.", purpose: "Helps understand the level of available resources and tolerance for stress before the incident." },
          { section: "1. Immediately before the incident", measures: "The last minutes before tension increased.", purpose: "Separates the situational trigger from the later nervous system response." },
          { section: "2. Expectations, control, predictability", measures: "What was clear, what was imposed, and what could be influenced.", purpose: "Shows the role of autonomy and uncertainty, especially important in PDA." },
          { section: "3. First signs of tension", measures: "Activation, shutdown, sensory overload.", purpose: "Helps match support to the type of nervous system response, not only to how behavior appears." },
          { section: "3B. Compensatory strategies and masking", measures: "Whether the person continued the activity despite overload.", purpose: "Reveals the cost of apparent functioning and the risk of delayed escalation." },
          { section: "4. Tension phase and actions", measures: "What support was offered and whether it matched the overload.", purpose: "Helps distinguish real support from adding another demand." },
          { section: "5. Behavior description", measures: "Facts: words, movements, screaming, withdrawal, self-injury, property damage.", purpose: "Protects against moralizing and provides observable data." },
          { section: "6. Ending escalation and recovery", measures: "Duration, calming, cognitive readiness, regulating factors.", purpose: "Shows that absence of crying or screaming does not necessarily mean readiness for contact or engagement." },
          { section: "7. What happened after the incident", measures: "What followed, caregiver contact, physical intervention, return to usual activities.", purpose: "Provides material for reviewing safety, ethics, and risk of further escalation or renewed overload." }
        ]
      },
      {
        id: "use",
        title: "How to use the forms",
        cards: [
          { title: "At home", text: "Complete the form soon after the incident or on the same day. Look for repeated patterns: time of day, transitions, noise, demands, and recovery time." },
          { title: "At school", text: "Use one shared description approach across the team. Record facts and environmental conditions instead of interpretations of intent." },
          { title: "In a specialist team", text: "Compare forms over time. One incident shows little; several similar incidents reveal a pattern." }
        ]
      },
      {
        id: "limits",
        title: "What the form does not do",
        list: [
          "It does not diagnose autism, PDA, or trauma.",
          "It is not for justifying punishment or proving intent.",
          "It does not replace clinical assessment, supervision, or a support plan.",
          "It does not provide one simple answer — it provides material for reflection and comparison."
        ]
      },
      {
        id: "background",
        title: "Knowledge base",
        cards: [
          { title: "Interoception and regulation", text: "Shah et al., Garfinkel et al., DuBois et al., Mahler." },
          { title: "Sensory processing and meltdown", text: "Ayres, Miller et al., Kildahl et al., National Autistic Society." },
          { title: "PDA, autonomy, predictability", text: "Newson et al., O'Nions et al., PDA Society, Deci & Ryan." },
          { title: "Nervous system and recovery", text: "Porges, Dana, Siegel & Bryson, Groden et al." },
          { title: "Behavior description and ethics", text: "Cooper et al., O'Neill et al., BACB, CPI, US Department of Education." }
        ]
      }
    ]
  }
};

export function getAboutPageContent(language: LanguageCode): AboutPageContent {
  return aboutPageByLanguage[language] ?? aboutPageByLanguage.pl;
}
