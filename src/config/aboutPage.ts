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
  pdfLink: string;
  pdfText: string;
  sections: AboutSection[];
}

export const aboutPageByLanguage: Record<LanguageCode, AboutPageContent> = {
  pl: {
    title: "Jak korzystać z formularzy monitorowania",
    lead: "Formularze pomagają opisać sytuację trudną w sposób uporządkowany: co wydarzyło się wcześniej, jakie pojawiły się pierwsze sygnały, jak zareagowało otoczenie, co pomogło i ile trwał powrót do gotowości.",
    navTitle: "Spis treści",
    pdfLink: "/pdf/jak-korzystac-z-formularzy-monitorowania.pdf",
    pdfText: "Pobierz opis formularzy PDF",
    sections: [
      {
        id: "purpose",
        title: "Po co są formularze",
        badge: "Instrukcja używania formularzy",
        paragraphs: [
          "Formularze pomagają zamienić pojedyncze sytuacje w dane, które można porównywać. Ich celem nie jest ocenianie osoby ani szukanie winy.",
          "Formularz pomaga sprawdzić: co wydarzyło się przed wzrostem napięcia, jakie sygnały pojawiły się wcześniej, co pomogło, co zwiększyło trudność i jakie wzorce powtarzają się w czasie.",
          "Dzięki kilku podobnym zapisom można zauważyć powtarzalne pory dnia, typy wymagań, zmiany planu, przeciążające warunki, brak przewidywalności albo długi czas powrotu do gotowości.",
        ],
        note: "To narzędzie do zauważania wzorców i planowania wsparcia, nie do budowania listy incydentów.",
      },
      {
        id: "principles",
        title: "Zasady opisu sytuacji",
        cards: [
          {
            title: "1. Opisuj fakty",
            text: "Zapisuj to, co można było zobaczyć lub usłyszeć: słowa, ruchy, działania, zmianę tonu głosu, wycofanie albo protest.",
          },
          {
            title: "2. Oddziel tło od triggera",
            text: "Zaznacz wcześniejsze obciążenia, ale osobno wpisz to, co wydarzyło się bezpośrednio przed wzrostem napięcia.",
          },
          {
            title: "3. Szukaj pierwszych sygnałów",
            text: "Najważniejsze są momenty przed eskalacją: milczenie, napięcie ciała, przyspieszenie mowy, zamrożenie, wycofanie albo wzrost potrzeby kontroli.",
          },
          {
            title: "4. Notuj reakcję otoczenia",
            text: "Wpisz, co zrobiły osoby dorosłe lub środowisko: czy wsparcie było dostępne, czy pojawiły się kolejne wymagania, czy osoba miała możliwość przerwy.",
          },
          {
            title: "5. Oddziel uspokojenie od gotowości",
            text: "Brak krzyku, płaczu lub protestu nie zawsze oznacza gotowość do rozmowy, kolejnych poleceń albo powrotu do aktywności.",
          },
        ],
      },
      {
        id: "simple-form",
        title: "Formularz prosty",
        paragraphs: [
          "Formularz prosty służy do szybkiego zapisu po sytuacji. Najlepiej sprawdza się w domu, w szkole i wtedy, gdy nie ma czasu na pełną analizę.",
          "Zachowuje najważniejsze informacje: stan przed zdarzeniem, pierwsze sygnały, reakcję otoczenia, to, co pomogło, zakres wpływu oraz czas powrotu do gotowości.",
        ],
        table: [
          {
            section: "1. Stan przed sytuacją",
            measures:
              "Sen, głód, ból, hałas, zmiany planu, wcześniejsze trudności.",
            purpose: "Pokazuje punkt startowy sytuacji.",
          },
          {
            section: "2. Pierwsze sygnały",
            measures: "To, co pojawiło się przed eskalacją.",
            purpose:
              "Pomaga zauważyć moment, w którym wsparcie mogło być potrzebne wcześniej.",
          },
          {
            section: "3. Zachowanie",
            measures: "Fakty obserwowalne: słowa, ruchy, działania.",
            purpose: "Oddziela opis od interpretacji intencji.",
          },
          {
            section: "4. Reakcja otoczenia",
            measures: "Co zrobiły osoby dorosłe lub otoczenie.",
            purpose:
              "Pokazuje, czy wsparcie zmniejszało, czy zwiększało trudność.",
          },
          {
            section: "5. Co pomogło",
            measures: "Co zmniejszyło napięcie lub ułatwiło powrót.",
            purpose:
              "Pomaga planować skuteczniejsze wsparcie w podobnych sytuacjach.",
          },
          {
            section: "6. Powrót do gotowości",
            measures:
              "Ile czasu trwał powrót do kontaktu, rozmowy lub aktywności.",
            purpose: "Chroni przed zbyt szybkim dokładaniem kolejnych wymagań.",
          },
        ],
        note: "Formularz prosty nie ma dawać pełnej diagnozy sytuacji. Ma umożliwić szybki zapis danych, które później można porównać.",
      },
      {
        id: "extended-form",
        title: "Formularz rozszerzony",
        paragraphs: [
          "Formularz rozszerzony służy do dokładniejszej analizy sytuacji. Najlepiej sprawdza się przy powtarzających się trudnościach, w pracy zespołowej i podczas planowania wsparcia.",
          "Pozwala oddzielić obciążenia z całego dnia, bezpośredni trigger, wymagania, przewidywalność, pierwsze sygnały, działania otoczenia, przebieg sytuacji i czas powrotu do gotowości.",
        ],
      },
      {
        id: "sections",
        title: "Opis sekcji 0–7",
        table: [
          {
            section: "0. Kontekst dnia",
            measures:
              "Sen, zmęczenie, ból, głód, bodźce, wcześniejsze obciążenia.",
            purpose: "Pomaga ocenić punkt startowy sytuacji.",
          },
          {
            section: "1. Bezpośrednio przed",
            measures: "Ostatnie minuty przed wzrostem napięcia.",
            purpose: "Pozwala oddzielić trigger od wcześniejszego tła.",
          },
          {
            section: "2. Wymagania i wpływ",
            measures: "Co było jasne, co narzucone, na co osoba miała wpływ.",
            purpose: "Pomaga ocenić rolę przewidywalności, wyboru i autonomii.",
          },
          {
            section: "3. Pierwsze sygnały",
            measures: "Zmiany zachowania przed eskalacją.",
            purpose: "Pomaga zauważyć moment na wcześniejsze wsparcie.",
          },
          {
            section: "3B. Maskowanie i kompensacja",
            measures:
              "Czy osoba działała dalej mimo widocznych sygnałów trudności.",
            purpose: "Pokazuje koszt utrzymywania pozornego funkcjonowania.",
          },
          {
            section: "4. Działania otoczenia",
            measures: "Rodzaj wsparcia i reakcję środowiska.",
            purpose:
              "Pozwala sprawdzić, co pomagało, a co zwiększało trudność.",
          },
          {
            section: "5. Zachowanie",
            measures:
              "Fakty: słowa, ruchy, krzyk, wycofanie, autoagresja, zniszczenia.",
            purpose:
              "Pomaga odejść od oceniania i skupić się na danych obserwowalnych.",
          },
          {
            section: "6. Powrót do gotowości",
            measures:
              "Czas i warunki potrzebne do odzyskania kontaktu lub aktywności.",
            purpose:
              "Pokazuje, że brak płaczu lub krzyku nie musi oznaczać gotowości do kontaktu.",
          },
          {
            section: "7. Co było później",
            measures:
              "Dalszy przebieg sytuacji, kontakt z opiekunem, interwencje, powrót do aktywności.",
            purpose:
              "Pozwala ocenić bezpieczeństwo, etykę i ryzyko wtórnej eskalacji.",
          },
        ],
      },
      {
        id: "using-data",
        title: "Jak używać danych z formularzy",
        paragraphs: [
          "Formularz ma sens przede wszystkim wtedy, gdy porównujemy kilka sytuacji. Jeden zapis pokazuje pojedynczy dzień. Kilka formularzy pozwala zauważyć wzorzec.",
        ],
        list: [
          "Czy trudności pojawiają się częściej o konkretnej porze dnia?",
          "Czy wzrost napięcia pojawia się po zmianach planu?",
          "Czy określony typ wymagań zwiększa trudność?",
          "Czy osoba potrzebuje długiego czasu na powrót do gotowości?",
          "Czy konkretne warunki środowiskowe zwiększają obciążenie?",
          "Czy wsparcie było dostępne wystarczająco wcześnie?",
        ],
      },
      {
        id: "use",
        title: "Gdzie można używać formularzy",
        cards: [
          {
            title: "W domu",
            text: "Wypełniaj krótko po zdarzeniu albo tego samego dnia. Szukaj powtarzalnych wzorców: pory dnia, przejść, hałasu, wymagań i czasu powrotu do gotowości.",
          },
          {
            title: "W szkole",
            text: "Ustal jeden sposób opisu w zespole. Wpisuj fakty i warunki środowiskowe zamiast interpretacji intencji.",
          },
          {
            title: "W zespole specjalistycznym",
            text: "Porównuj formularze w serii. Jedno zdarzenie mówi niewiele; kilka podobnych zdarzeń pokazuje wzorzec.",
          },
        ],
      },
      {
        id: "limits",
        title: "Czego formularz nie robi",
        list: [
          "Nie diagnozuje autyzmu, ADHD, PDA, traumy ani innych trudności rozwojowych lub psychicznych.",
          "Nie służy do przypisywania złej woli, oceniania charakteru ani budowania narracji o „trudnym dziecku”.",
          "Nie służy do uzasadniania kar, wykluczania ani ograniczania praw dziecka.",
          "Nie zastępuje diagnozy, funkcjonalnej oceny zachowania, planu wsparcia ani superwizji klinicznej.",
          "Nie daje jednej magicznej odpowiedzi — daje materiał do myślenia, porównywania i testowania hipotez.",
        ],
        note: "Formularz ma pomagać w myśleniu o sytuacji, nie zamykać jej w jednej interpretacji.",
      },
      {
        id: "not-assumptions",
        title: "Czego formularz nie zakłada",
        list: [
          "Nie zakłada, że każde wymaganie jest szkodliwe.",
          "Nie zakłada, że każda trudność wynika wyłącznie z sensoryki.",
          "Nie zakłada, że wsparcie oznacza brak granic.",
          "Nie zakłada, że analiza kontekstu wyklucza odpowiedzialność dorosłych za bezpieczeństwo.",
          "Nie zakłada, że celem jest usunięcie wszystkich wymagań.",
        ],
        note: "Celem jest lepsze dawkowanie wymagań, wcześniejsze zauważanie sygnałów, zmniejszanie niepotrzebnego przeciążenia i budowanie bardziej przewidywalnego środowiska.",
      },
      {
        id: "background",
        title: "Literatura i podstawa merytoryczna",
        paragraphs: [
          "Formularze opierają się na analizie funkcjonalnej zachowania, obserwacji kontekstu środowiskowego, podejściach trauma-informed oraz wiedzy dotyczącej regulacji, interocepcji, sensoryki, autonomii i przewidywalności.",
        ],
        list: [
          "Cooper, J. O., Heron, T. E., & Heward, W. L. (2020). Applied Behavior Analysis.",
          "O'Neill, R. E., Albin, R. W., Storey, K., Horner, R. H., & Sprague, J. R. (2015). Functional Assessment and Program Development for Problem Behavior.",
          "Garfinkel, S. N., Seth, A. K., Barrett, A. B., Suzuki, K., & Critchley, H. D. (2015). Knowing your own heart: Distinguishing interoceptive accuracy from interoceptive sensibility.",
          "Shah, P., Hall, R., Catmur, C., & Bird, G. (2016). Alexithymia, not autism, is associated with impaired interoception.",
          "Deci, E. L., & Ryan, R. M. (2000). The what and why of goal pursuits: Human needs and the self-determination of behavior.",
          "O'Nions, E., Christie, P., Gould, J., Viding, E., & Happé, F. (2014). Development of the Extreme Demand Avoidance Questionnaire.",
          "Substance Abuse and Mental Health Services Administration. (2014). SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach.",
        ],
      },
    ],
  },

  en: {
    title: "How to use monitoring forms",
    lead: "The forms help describe a difficult situation in a structured way: what happened before, what early signs appeared, how the environment responded, what helped, and how long it took to regain readiness.",
    navTitle: "Contents",
    pdfLink: "/pdf/how-to-use-monitoring-forms.pdf",
    pdfText: "Download PDF guide",
    sections: [
      {
        id: "purpose",
        title: "Why use these forms",
        badge: "Form instruction guide",
        paragraphs: [
          "The forms help turn individual situations into data that can be compared over time. Their purpose is not to judge the person or assign blame.",
          "The form helps identify what happened before tension increased, what early signs appeared, what helped, what made the situation harder, and what patterns repeat over time.",
          "Several similar records can reveal repeated times of day, types of demands, changes in routine, difficult environmental conditions, lack of predictability, or long recovery time.",
        ],
        note: "This is a tool for noticing patterns and planning support, not for building a list of incidents.",
      },
      {
        id: "principles",
        title: "Principles for describing situations",
        cards: [
          {
            title: "1. Describe facts",
            text: "Record what could be seen or heard: words, movements, actions, changes in tone of voice, withdrawal, or protest.",
          },
          {
            title: "2. Separate background from trigger",
            text: "Note earlier demands or stressors, but separately record what happened directly before tension increased.",
          },
          {
            title: "3. Look for early signs",
            text: "The most important moments are before escalation: silence, body tension, faster speech, freezing, withdrawal, or increased need for control.",
          },
          {
            title: "4. Record the environmental response",
            text: "Describe what adults or the environment did: whether support was available, whether more demands appeared, and whether the person could take a break.",
          },
          {
            title: "5. Separate calming from readiness",
            text: "The absence of crying, shouting, or protest does not always mean readiness for conversation, new instructions, or return to activity.",
          },
        ],
      },
      {
        id: "simple-form",
        title: "Simple form",
        paragraphs: [
          "The simple form is for quick recording after a situation. It works best at home, at school, and whenever there is no time for full analysis.",
          "It keeps the most important information: state before the event, early signs, environmental response, what helped, degree of control, and time needed to regain readiness.",
        ],
        table: [
          {
            section: "1. State before the situation",
            measures:
              "Sleep, hunger, pain, noise, changes in routine, earlier difficulties.",
            purpose: "Shows the starting point of the situation.",
          },
          {
            section: "2. Early signs",
            measures: "What appeared before escalation.",
            purpose:
              "Helps identify when earlier support may have been needed.",
          },
          {
            section: "3. Behavior",
            measures: "Observable facts: words, movements, actions.",
            purpose: "Separates description from interpretation of intent.",
          },
          {
            section: "4. Environmental response",
            measures: "What adults or the environment did.",
            purpose: "Shows whether support reduced or increased difficulty.",
          },
          {
            section: "5. What helped",
            measures: "What reduced tension or supported recovery.",
            purpose: "Helps plan more effective support in similar situations.",
          },
          {
            section: "6. Return to readiness",
            measures:
              "How long it took to return to contact, conversation, or activity.",
            purpose: "Protects against adding new demands too early.",
          },
        ],
        note: "The simple form is not meant to provide a full explanation. It creates a quick record of data that can later be compared.",
      },
      {
        id: "extended-form",
        title: "Extended form",
        paragraphs: [
          "The extended form is for more detailed analysis. It works best with repeated difficulties, team-based work, and support planning.",
          "It separates the daily load, immediate trigger, demands, predictability, early signs, environmental response, course of the situation, and recovery time.",
        ],
      },
      {
        id: "sections",
        title: "Sections 0–7",
        table: [
          {
            section: "0. Daily context",
            measures:
              "Sleep, tiredness, pain, hunger, stimuli, earlier demands.",
            purpose: "Helps assess the starting point of the situation.",
          },
          {
            section: "1. Immediately before",
            measures: "The last minutes before tension increased.",
            purpose:
              "Separates the trigger from earlier background conditions.",
          },
          {
            section: "2. Demands and control",
            measures:
              "What was clear, what was imposed, and what the person could influence.",
            purpose:
              "Helps assess the role of predictability, choice, and autonomy.",
          },
          {
            section: "3. Early signs",
            measures: "Changes in behavior before escalation.",
            purpose: "Helps identify the moment for earlier support.",
          },
          {
            section: "3B. Masking and compensation",
            measures:
              "Whether the person continued despite visible signs of difficulty.",
            purpose: "Shows the cost of maintaining apparent functioning.",
          },
          {
            section: "4. Environmental actions",
            measures: "Type of support and environmental response.",
            purpose:
              "Helps identify what helped and what increased difficulty.",
          },
          {
            section: "5. Behavior",
            measures:
              "Facts: words, movements, shouting, withdrawal, self-injury, damage.",
            purpose:
              "Helps move away from judgment and focus on observable data.",
          },
          {
            section: "6. Return to readiness",
            measures:
              "Time and conditions needed to regain contact or activity.",
            purpose:
              "Shows that absence of crying or shouting does not necessarily mean readiness for contact.",
          },
          {
            section: "7. What happened later",
            measures:
              "Further course of the situation, caregiver contact, interventions, return to activity.",
            purpose:
              "Helps review safety, ethics, and risk of renewed escalation.",
          },
        ],
      },
      {
        id: "using-data",
        title: "How to use the data",
        paragraphs: [
          "The form is most useful when several situations are compared. One record shows one day. Several forms can reveal a pattern.",
        ],
        list: [
          "Do difficulties appear more often at a specific time of day?",
          "Does tension increase after changes in routine?",
          "Does a specific type of demand increase difficulty?",
          "Does the person need a long time to regain readiness?",
          "Do specific environmental conditions increase load?",
          "Was support available early enough?",
        ],
      },
      {
        id: "use",
        title: "Where the forms can be used",
        cards: [
          {
            title: "At home",
            text: "Complete the form soon after the situation or on the same day. Look for repeated patterns: time of day, transitions, noise, demands, and recovery time.",
          },
          {
            title: "At school",
            text: "Use one shared description approach across the team. Record facts and environmental conditions instead of interpretations of intent.",
          },
          {
            title: "In a specialist team",
            text: "Compare forms over time. One incident shows little; several similar incidents reveal a pattern.",
          },
        ],
      },
      {
        id: "limits",
        title: "What the form does not do",
        list: [
          "It does not diagnose autism, ADHD, PDA, trauma, or other developmental or mental health difficulties.",
          "It is not for assigning bad intent, judging character, or building a narrative about a difficult child.",
          "It is not for justifying punishment, exclusion, or restricting a child’s rights.",
          "It does not replace diagnosis, functional behavior assessment, a support plan, or clinical supervision.",
          "It does not provide one magic answer — it provides material for thinking, comparison, and hypothesis testing.",
        ],
        note: "The form is meant to support thinking about the situation, not close it inside one interpretation.",
      },
      {
        id: "not-assumptions",
        title: "What the form does not assume",
        list: [
          "It does not assume that every demand is harmful.",
          "It does not assume that every difficulty is purely sensory.",
          "It does not assume that support means lack of boundaries.",
          "It does not assume that contextual analysis removes adult responsibility for safety.",
          "It does not assume that the goal is to remove all demands.",
        ],
        note: "The goal is better pacing of demands, earlier noticing of warning signs, reducing unnecessary load, and building a more predictable environment.",
      },
      {
        id: "background",
        title: "Literature and knowledge base",
        paragraphs: [
          "The forms are based on functional behavior assessment, observation of environmental context, trauma-informed approaches, and knowledge related to regulation, interoception, sensory processing, autonomy, and predictability.",
        ],
        list: [
          "Cooper, J. O., Heron, T. E., & Heward, W. L. (2020). Applied Behavior Analysis.",
          "O'Neill, R. E., Albin, R. W., Storey, K., Horner, R. H., & Sprague, J. R. (2015). Functional Assessment and Program Development for Problem Behavior.",
          "Garfinkel, S. N., Seth, A. K., Barrett, A. B., Suzuki, K., & Critchley, H. D. (2015). Knowing your own heart: Distinguishing interoceptive accuracy from interoceptive sensibility.",
          "Shah, P., Hall, R., Catmur, C., & Bird, G. (2016). Alexithymia, not autism, is associated with impaired interoception.",
          "Deci, E. L., & Ryan, R. M. (2000). The what and why of goal pursuits: Human needs and the self-determination of behavior.",
          "O'Nions, E., Christie, P., Gould, J., Viding, E., & Happé, F. (2014). Development of the Extreme Demand Avoidance Questionnaire.",
          "Substance Abuse and Mental Health Services Administration. (2014). SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach.",
        ],
      },
    ],
  },
};

export function getAboutPageContent(language: LanguageCode): AboutPageContent {
  return aboutPageByLanguage[language] ?? aboutPageByLanguage.pl;
}
