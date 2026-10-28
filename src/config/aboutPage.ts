import type { LanguageCode } from "../i18n/useLanguage";
import { getMonitoringRevision } from "./monitoringRevision";

const publicPdfPath = (filename: string) => `${import.meta.env.BASE_URL}pdf/${filename}`;
export interface AboutCard { title: string; text: string }
export interface AboutTableRow { section: string; measures: string; purpose: string }
export interface AboutSection {
  id: string; title: string; badge?: string; paragraphs?: string[]; note?: string;
  cards?: AboutCard[]; list?: string[]; table?: AboutTableRow[];
}
export interface AboutPageContent {
  title: string; lead: string; navTitle: string; pdfLink: string; pdfText: string; sections: AboutSection[];
}

// Preserved from the supplied, revised instruction. This is theoretical background,
// not evidence that the form or its categories have been validated.
const bibliography = [
  "Cooper, J. O., Heron, T. E., & Heward, W. L. (2020). Applied Behavior Analysis (3rd ed.). Pearson.",
  "O'Neill, R. E., Albin, R. W., Storey, K., Horner, R. H., & Sprague, J. R. (2015). Functional Assessment and Program Development for Problem Behavior: A Practical Handbook (3rd ed.). Cengage Learning.",
  "Garfinkel, S. N., Seth, A. K., Barrett, A. B., Suzuki, K., & Critchley, H. D. (2015). Knowing your own heart: Distinguishing interoceptive accuracy from interoceptive sensibility. Biological Psychology, 104, 65–74.",
  "Shah, P., Hall, R., Catmur, C., & Bird, G. (2016). Alexithymia, not autism, is associated with impaired interoception. Cortex, 81, 215–220.",
  "Deci, E. L., & Ryan, R. M. (2000). The \"what\" and \"why\" of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268.",
  "O'Nions, E., Christie, P., Gould, J., Viding, E., & Happé, F. (2014). Development of the \"Extreme Demand Avoidance Questionnaire\" (EDA-Q): Preliminary observations on a trait measure for pathological demand avoidance. Journal of Child Psychology and Psychiatry, 55(7), 758–768.",
  "Substance Abuse and Mental Health Services Administration. (2014). SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach. HHS Publication No. SMA 14-4884.",
];
const pl = getMonitoringRevision("pl");
const en = getMonitoringRevision("en");
export function getAboutPageContent(language: LanguageCode): AboutPageContent {
  return aboutPageByLanguage[language];
}

export const aboutPageByLanguage: Record<LanguageCode, AboutPageContent> = {
  pl: {
    title: "Jak korzystać z formularzy monitorowania",
    lead: "Uporządkowany zapis jednego zdarzenia: kontekst, obserwowane zachowanie, działania otoczenia, późniejsze zmiany i podstawa praktycznej oceny wsparcia.",
    navTitle: "Spis treści",
    pdfLink: publicPdfPath("jak-korzystac-z-formularzy-monitorowania.pdf"),
    pdfText: "Pobierz instrukcję PDF",
    sections: [
      { id: "recording", title: "Zasady zapisu i oceny", paragraphs: [pl.sources, pl.assessmentHint], note: "Bibliografia wskazuje podstawy teoretyczne. Nie stanowi dowodu walidacji formularza ani trafności każdej kategorii." },
      { id: "purpose", title: "Po co są formularze", paragraphs: [
        "Formularze pomagają porównywać sytuacje i planować wsparcie bez oceniania osoby ani przypisywania winy. Oddzielają wcześniejsze tło, zdarzenie bezpośrednio poprzedzające, zachowanie i działania otoczenia.",
        "Kilka zapisów może wskazać wzorzec, ale nie ustala przyczyny. Nie jest to lista problemowych zachowań ani narzędzie do uzasadniania kar.",
      ] },
      { id: "principles", title: "Zasady opisu sytuacji", cards: [
        { title: "1. Opisuj fakty obserwowalne", text: "Zapisz słowa, ruchy i działania, np. „zacisnął dłonie”, „powtarzała: nie chcę”. Nie wpisuj „manipulował” ani „testowała granice”. Przekaz osoby (także AAC) oznacz P; interpretację oznacz H." },
        { title: "2. Oddziel tło od zdarzenia bezpośrednio poprzedzającego", text: "Kontekst dnia i ostatnie minuty to różne informacje. Nie nazywaj zdarzenia ustaloną przyczyną tylko dlatego, że wystąpiło wcześniej." },
        { title: "3. Zapisuj pierwsze sygnały", text: "Co konkretnie zmieniło się w ruchu, głosie, ciele lub kontakcie? Kategorie sygnałów nie rozpoznają mechanizmu shutdown, zamrożenia ani aktywacji autonomicznej." },
        { title: "4. Notuj działanie i późniejszą obserwację", text: "Kto, co i kiedy zrobił? Co zmieniono w otoczeniu? Co obserwowano później? Oddziel warunki udzielenia pomocy, presję i negocjację. Dopiero potem oceń, co mogło pomóc." },
        { title: "5. Oddziel zachowanie, skutki i ryzyko", text: "Nasilenie opisuj liczbą, czasem lub inną mierzalną cechą wybranego zachowania. Uraz lub uszkodzenie rzeczy zapisuj jako skutek, a możliwe zagrożenie osobno. Nie wyliczaj sumy diagnostycznej." },
        { title: "6. Nie utożsamiaj ciszy ze zgodą", text: "Brak krzyku lub agresji nie dowodzi dobrostanu. Kontakt, gotowość do określonej aktywności i zgoda na nią to różne informacje." },
      ] },
      { id: "stages", title: "Trzy etapy opisu", cards: [
        { title: pl.stageNames.earlyResponse, text: pl.earlyResponse },
        { title: pl.stageNames.escalationCourse, text: pl.escalationCourse },
        { title: pl.stageNames.postEscalationNeeds, text: pl.postEscalationNeeds },
      ], note: pl.stageHint, paragraphs: ["Przy każdym opisie jest pole na źródła O/P/R/H — wskaż, których informacji dotyczą. Nie ma osobnego podsumowania „co pomogło”."] },
      { id: "simple-form", title: "Formularz prosty", paragraphs: [
        "Krótki zapis po jednym zdarzeniu, gdy pozwala na to bezpieczeństwo. Zachowuje kontekst, pierwsze sygnały, trzy opisy etapów, wpływ osoby, przewidywalność i czas gotowości.",
        "Działania i reakcje zapisuj przy odpowiednim etapie: pierwsze sygnały, eskalacja albo po eskalacji. Możliwe są brak zauważalnej zmiany, nasilenie oznak, różny przebieg i trudność oceny. Można udzielić wsparcia, zanim ustalimy przyczynę trudności. Zapisz, co zrobiono i co zaobserwowano później.",
      ], note: "Nie musisz zgadywać. Wpisz „nie wiem”, „nie obserwowano”, „nie dotyczy” lub „brak danych” zgodnie z sytuacją. Bardziej szczegółowe porównania i hipotezy zostaw do wersji rozszerzonej." },
      { id: "extended-form", title: "Formularz rozszerzony — sekcje 0–7", table: [
        { section: "0. Poziom bazowy i kontekst dnia", measures: "Sen, zmęczenie, ból, bodźce, wcześniejsze obciążenia; indywidualne oznaki napięcia.", purpose: "Ocena osoby obserwującej, nie skala diagnostyczna. Przy poziomie napięcia podaj podstawę i porównanie ze zwykłym funkcjonowaniem." },
        { section: "1. Bezpośrednio przed zdarzeniem", measures: "Obserwowane zdarzenie w ostatnich minutach.", purpose: "Oddziela poprzedzające zdarzenie od tła i hipotezy o przyczynie." },
        { section: "2. Czego oczekiwano w tym momencie?", measures: "Wymagania, wybór, wpływ, negocjacja i przewidywalność.", purpose: "Opisuje dostępne możliwości, nie domniemany mechanizm reakcji." },
        { section: "3. Pierwsze oznaki narastającego napięcia", measures: "Zmiany ciała, ruchu, kontaktu i aktywności oraz reakcja otoczenia i późniejsza odpowiedź osoby.", purpose: "Pomaga ustalić obserwowalny sygnał do wcześniejszego wsparcia." },
        { section: "3B. Kontynuowanie aktywności, kompensacja i możliwe maskowanie", measures: "Działania w trakcie aktywności, przekaz osoby, późniejsze obserwacje i odrębna hipoteza.", purpose: "Kontynuowanie samo nie dowodzi lęku, przeciążenia ani maskowania. Sam formularz nie mierzy ukrytych kosztów." },
        { section: "4. Udzielone wsparcie i warunki jego udzielenia", measures: "Rodzaj wsparcia i warunki dostępu do niego.", purpose: "Oddziela dostępność pomocy, nacisk i negocjacje. Nie powtarza opisu reakcji." },
        { section: "5. Opis zachowania", measures: "Przebieg eskalacji i towarzyszące działania lub zmiany; mierzalne nasilenie, skutki i zagrożenie.", purpose: "Nie łączy agresji, skutków i ryzyka w jeden wynik." },
        { section: "6. Czas i gotowość", measures: "Trwanie zachowania, zmniejszenie oznak napięcia i gotowość do konkretnej aktywności.", purpose: "Rozdziela trzy różne informacje i ich punkty odniesienia w czasie." },
        { section: "7. Po eskalacji / 7A. Interwencja fizyczna", measures: "Potrzeby, zapewnione wsparcie i oznaki gotowości oraz dalszy przebieg i ewentualna interwencja podczas tego zdarzenia.", purpose: "Opis działania, następstw i bezpieczeństwa, bez instrukcji technik fizycznych. Nie jest to podsumowanie tygodnia." },
      ] },
      { id: "time", title: "Jak zapisywać czas i gotowość", list: [pl.durationHint, pl.reductionHint, pl.readinessHint], note: "Przykład sposobu liczenia czasu: krzyk trwał 12:00–12:05 (5 minut). O 12:08 osoba przestała zaciskać dłonie — 8 minut od początku krzyku. O 12:15 wybrała książkę i zaczęła czytać — oznaki gotowości do czytania zaobserwowano 10 minut od zakończenia krzyku. Nie oznacza to gotowości ani zgody na inne zadanie. Nie przeliczaj dawnych przedziałów czasu na dokładne minuty. „Nie zaobserwowano do końca obserwacji” różni się od braku danych." },
      { id: "environment-map", title: "Mapa środowiska", paragraphs: [pl.mapSources,
        "Podaj okres obserwacji i datę aktualizacji. Oddziel to, co osoba wybiera lub lubi, od obserwacji jej zachowania i hipotez o warunkach wspierających. Lubienie nie dowodzi funkcji wzmacniającej, a współpraca — poczucia bezpieczeństwa.",
        "Zapisz również podobne okoliczności bez opisywanej eskalacji. Co było podobne, a co inne? Jakie są źródła i ile było okazji? Nie zakładaj, że cisza oznacza brak obciążenia.",
      ] },
      { id: "using-data", title: "Jak używać danych z formularzy", paragraphs: [
        "Porównuj kilka zapisów, podobne sytuacje bez eskalacji i liczbę okazji. Dwa zdarzenia w dwóch okazjach to inna informacja niż dwa zdarzenia w dwudziestu okazjach. Powtarzalny związek i kolejność czasowa nie potwierdzają przyczyny.",
        "Szukaj warunków, pór dnia, typów wymagań i momentów dostępu do wsparcia. Formułuj hipotezy do dalszej obserwacji, uwzględniając przekaz osoby i alternatywne wyjaśnienia.",
      ], note: "Przykład zapisu (fikcyjny): O — o 12:05 wyłączono radio. O — do 12:08 osoba nadal zasłaniała uszy. P — wskazała w AAC „za jasno”. H — do sprawdzenia rola światła. Nie wpisujemy automatycznie, że cisza pomogła." },
      { id: "limits", title: "Czego formularz nie robi i nie zakłada", list: [
        "Nie diagnozuje autyzmu, ADHD, PDA, traumy ani mechanizmu reakcji.",
        "Nie zastępuje diagnozy, funkcjonalnej oceny zachowania, planu wsparcia ani superwizji klinicznej.",
        "Nie służy do oceniania charakteru, przypisywania złej woli, uzasadniania kar lub ograniczania praw osoby.",
        "Nie zakłada, że każde wymaganie szkodzi, że każda trudność wynika z sensoryki lub że wsparcie oznacza brak granic.",
        "Analiza kontekstu nie znosi odpowiedzialności za bezpieczeństwo. Celem nie jest usunięcie wszystkich wymagań, lecz dostosowanie wsparcia i środowiska.",
      ] },
      { id: "legacy", title: "Zapisy z poprzedniej wersji", paragraphs: [pl.legacyHint,
        "Dane nadal zapisują się lokalnie. Starsze pola pozostają dostępne w rozwijanej części formularza i w oddzielnej sekcji eksportu. Nowe pytania wymagają własnego wpisu; nie dopisujemy źródeł O/P/R/H do dawnych danych automatycznie.",
      ] },
      { id: "background", title: "Literatura i podstawa merytoryczna", paragraphs: [
        "Poniższa bibliografia pochodzi z dostarczonej instrukcji Małgorzaty Mikołajczyk. Dotyczy podstaw teoretycznych, a nie walidacji narzędzia. Nie potwierdza trafności każdej kategorii ani skuteczności działań w konkretnej sytuacji. Dane bibliograficzne zachowano zgodnie z instrukcją; nie weryfikowano ich niezależnie.",
      ], list: bibliography },
    ],
  },
  en: {
    title: "How to use monitoring forms",
    lead: "A structured record of one event: context, observed behavior, actions, subsequent changes and the basis for practical judgements about support.",
    navTitle: "Contents", pdfLink: publicPdfPath("how-to-use-monitoring-forms.pdf"), pdfText: "Download PDF guide",
    sections: [
      { id: "recording", title: "Recording and assessment", paragraphs: [en.sources, en.assessmentHint], note: "The bibliography provides theoretical background, not evidence of validation of the form or its categories." },
      { id: "purpose", title: "Why use the forms", paragraphs: ["Compare situations and plan support without judging the person or assigning blame. Separate earlier context, the immediately preceding event, behavior and environmental actions. Several records may suggest a pattern; they do not establish a cause."] },
      { id: "principles", title: "Principles", cards: [
        { title: "Describe observable facts", text: "Record words, movements and actions, not manipulation or testing boundaries. Mark the person's communication, including AAC, P and your hypothesis H." },
        { title: "Separate context from the immediately preceding event", text: "An event happening first does not establish that it caused what followed." },
        { title: "Record concrete changes", text: "Body, voice, movement, contact and response to surroundings. The categories do not diagnose shutdown, freezing or autonomic activation." },
        { title: "Action, then observation, then judgement", text: "Record who did what and when, conditions for support, pressure and negotiation. Give the observable basis for your judgement. No change and uncertainty are valid outcomes." },
        { title: "Separate behavior, consequences and risk", text: "Use count, duration or another measurable feature. Record actual injury or damage separately from potential risk; do not calculate a diagnostic total." },
        { title: "Silence is not consent", text: "No screaming or aggression does not demonstrate wellbeing. Contact, readiness for a specific activity and consent are separate information." },
      ] },
      { id: "stages", title: "Three stages of the account", cards: [
        { title: en.stageNames.earlyResponse, text: en.earlyResponse },
        { title: en.stageNames.escalationCourse, text: en.escalationCourse },
        { title: en.stageNames.postEscalationNeeds, text: en.postEscalationNeeds },
      ], note: en.stageHint, paragraphs: ["Each description has a source field: enter O/P/R/H and identify which information each supports. There is no separate what-helped summary."] },
      { id: "simple-form", title: "Simple form", paragraphs: ["A quick record of one event, made when safe: context, early signs, the three stage descriptions, choice, predictability and readiness timing. Record actions and responses at the relevant stage. No noticeable change, increased signs, a mixed course or inability to assess are possible. Do not guess; use unknown, not observed, not applicable or missing data as appropriate. Detailed comparison and hypotheses belong in the extended form."] },
      { id: "extended-form", title: "Extended form — sections 0–7", table: [
        { section: "0. Baseline and context", measures: "Sleep, body state, environmental conditions and earlier load.", purpose: "Observer-rated tension requires individual signs; it is not a diagnostic scale." },
        { section: "1. Immediately before", measures: "The immediately preceding event.", purpose: "Separate fact, context and a hypothesis about cause." },
        { section: "2. Expectations and influence", measures: "Demands, choice, negotiation and predictability.", purpose: "Describe available opportunities rather than an inferred mechanism." },
        { section: "3. Early signs", measures: "Changes in body, movement, contact and activity, the environmental response and the person's subsequent response.", purpose: "Identify observable cues for earlier support." },
        { section: "3B. Continuing activity, compensation and possible masking", measures: "Activity observations, the person's account, later observations and a separate hypothesis.", purpose: "Continuing does not prove anxiety, overload or masking. The form does not measure hidden costs." },
        { section: "4. Support provided and conditions of access", measures: "Type of support and conditions of access.", purpose: "Separates availability of help, pressure and negotiation without repeating the account of responses." },
        { section: "5. Behavior", measures: "The course of escalation and accompanying actions or changes; measurable features, consequences and risk.", purpose: "Do not combine aggression, consequences and risk into one score." },
        { section: "6. Timing and readiness", measures: "Behavior duration, reduced signs and activity-specific readiness.", purpose: "Three different measures with different time anchors." },
        { section: "7. After escalation / 7A. Physical intervention", measures: "Needs, support provided and signs of readiness, subsequent events and any intervention during this event.", purpose: "Record action, consequences and safety, not physical techniques or a weekly total." },
      ] },
      { id: "time", title: "Time and readiness", list: [en.durationHint, en.reductionHint, en.readinessHint], note: "Example of calculating the times: shouting lasted 12:00–12:05 (5 minutes). At 12:08 the person stopped clenching their hands — 8 minutes after the shouting started. At 12:15 they chose a book and started reading — signs of readiness for reading were observed 10 minutes after the shouting ended. This does not imply readiness or consent for a different task. Do not convert old time bands into precise minutes. Not observed by observation end differs from missing data." },
      { id: "environment-map", title: "Environment map", paragraphs: [en.mapSources, "Give the observation period and update date. Separate preference, observation and causal hypotheses. Liking an activity does not demonstrate a reinforcement function. Compare similar situations without escalation and numbers of opportunities."] },
      { id: "using-data", title: "Using the records", paragraphs: ["Compare repeated records, similar situations without escalation and numbers of opportunities. Two events in two opportunities differ from two in twenty. Repeated association and temporal sequence do not establish causality. Consider the person's communication and alternative explanations when forming hypotheses."] },
      { id: "limits", title: "Limits", list: ["No diagnosis of autism, ADHD, PDA, trauma or reaction mechanisms.", "Does not replace diagnosis, functional assessment, a support plan or clinical supervision.", "Not for assigning ill will, justifying punishment or restricting rights.", "Does not assume all demands are harmful, all difficulties sensory or support means no boundaries. Safety remains a responsibility."] },
      { id: "legacy", title: "Previous-version records", paragraphs: [en.legacyHint, "Older answers remain in the expandable previous-version section and in a separate export section. New questions require their own answers. Sources are never assigned to old entries automatically."] },
      { id: "background", title: "Literature and theoretical background", paragraphs: ["References are preserved from Małgorzata Mikołajczyk's supplied instruction. They are theoretical background, not evidence of validation of this form, its categories or the efficacy of a particular action. Bibliographic details have not been independently verified."], list: bibliography },
    ],
  },
};
