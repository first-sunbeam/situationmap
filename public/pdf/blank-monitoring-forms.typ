#set document(
  title: "Blank Monitoring Forms",
  author: "Małgorzata Mikołajczyk"
)

#set page(
  paper: "a4",
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

// Libertinus Serif is the face embedded in the supplied Polish print edition.
#set text(font: "Libertinus Serif", size: 9.6pt, lang: "en")
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

#let title-page(title, subtitle) = align(center)[
  #v(0.7em)
  #text(size: 23pt, weight: "bold")[#title]
  #v(0.7em)
  #text(size: 12.5pt)[#subtitle]
]
#let dotted-stroke = stroke(paint: black, thickness: 1pt, dash: "dotted")
#let hint-text(hint) = if hint != none [
  #v(0.1em)
  #text(size: 8.2pt, style: "italic")[#hint]
]
#let field(label, hint: none) = block(width: 100%, breakable: false, below: 0.45em, above: 0.5em)[
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
  #rect(width: 100%, height: height, stroke: black, radius: 2pt)
]
#let checks(items, columns: 2) = block(width: 100%, below: 0.45em, above: 0.25em)[
  #grid(
    columns: if columns == 3 { (1fr, 1fr, 1fr) } else if columns == 4 { (auto, auto, auto, auto) } else { (1fr, 1fr) },
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
  #text(weight: "bold")[Sources for this description — #stage]
  #hint-text(hint)
  #checks(("O — direct observation", "P — person's communication (including AAC)", "R — another person's report", "H — hypothesis"), columns: 4)
  #field("Source details (optional) — " + stage)
]

#let stage-field(question, stage, height: 2cm) = block(breakable: false)[
  #stage-sources(stage)
  #area(question, height: height, hint: "Include observations and information communicated by the person. If it is difficult to assess — indicate this.")
]

#let section(title, body, breakable: true) = block(
  breakable: breakable,
  fill: white,
  stroke: black,
  inset: 10pt,
  radius: 6pt,
  width: 100%,
  below: 0.85em
)[
  #block(sticky: true, below: 0.3em)[#text(size: 12.5pt, weight: "bold")[#title]]
  #body
]
#let meta() = section("Basic information", [
  #grid(columns: (1fr, 1fr, 1fr), column-gutter: 0.3cm,
    field("Date"), field("Time"), field("Place")
  )
  #grid(columns: (1fr, 1fr), column-gutter: 0.3cm,
    field("Person’s identifier"), field("Person completing the record")
  )
  #field("Other people present")
  #field("Observation start and end")
  #select("Environment", ("Home", "School", "Care setting", "Other: ........................................"), columns: 2)
])

#title-page("Situation Monitoring Forms", "Printable version for manual completion")
= Simple form

Describe one event. Mark information sources: O — direct observation, P — the person’s communication (including AAC), R — another person’s report, H — hypothesis. Select the relevant source checkboxes beside each stage description; you may select several. Further details are optional. Missing data does not mean no difficulty. Record when it is safe to do so. “Unknown”, “not observed” and “not applicable” mean different things; a blank never means “no”.

#meta()

#section("Quick situation description", [
  #area("What was the person’s state before the situation?", height: 2.1cm, hint: "Sleep, hunger, pain, noise, changes of plan, earlier tension.")
  #area("What happened immediately before the situation?", height: 2.1cm, hint: "Describe the preceding minutes: a demand, change, refusal, waiting or contact.")
  #area("First signs of rising tension", height: 1.8cm, hint: "What appeared before the situation intensified: changes in body, voice, movement or contact.")
  #stage-field("How did the environment respond to the first signs of difficulty? What did the person do or communicate after that response?", "Early signs", height: 1.8cm)
  #stage-field("How did the escalation unfold? What actions or changes accompanied its intensification and subsiding?", "Escalation", height: 2.2cm)
  #stage-field("What did the person need before resuming contact or activity? What was provided, and how was readiness recognized?", "After escalation", height: 2cm)
  #area("Did the person have influence, choice, room to negotiate or take a break?", height: 1.7cm, hint: "What could the person control, and what was imposed or unavoidable?")
  #area("Was the situation predictable? What was known / unknown?", height: 1.5cm, hint: "Was it clear what would happen, how long it would take and when it would end?")
  #area("Time until signs of readiness were observed", height: 1.5cm, hint: "How many minutes after the described behavior ended were signs of readiness observed? You may give clock times. Mark estimate / missing data / not observed by observation end. Describe needs and signs of readiness at the After escalation stage.")
])

#pagebreak()

= Extended form

One record concerns one event. O — observation, P — the person’s communication (including AAC), R — another person’s report, H — hypothesis. Select the source checkboxes beside each stage description; you may select several. Further details are optional. State when your observation began. Do not guess: enter “missing data” where assessment is not possible. Distinguish unknown, not observed and not applicable.

#meta()
#section("0. Baseline and daily context", [
  #select("Tension level before the event", ("0 low / stable", "1 elevated", "2 high", "3 very high"), columns: 2, hint: "Observer judgement, not a diagnostic scale. Describe specific signs compared with this person’s usual presentation; leave the level unrated if unknown. Do not calculate a total.")
  #field("Individual signs supporting the tension rating")
  #select("Was the person tired?", ("Yes", "No", "Unknown"), columns: 3)
  #select("Did the person get sufficient sleep?", ("Yes", "No", "Unknown"), columns: 3)
  #field("Sleep information and its source — if available", hint: "E.g. short sleep, waking, nightmares or very early waking.")
  #select("Stay stage / daily context, if applicable", ("arrival / change day", "departure / return day", "middle of the week", "end of the week", "not applicable"), columns: 2)
  #select("Was this stage stressful? — residential care, if applicable", ("Yes", "No", "Unknown", "Not applicable"), columns: 2)
  #select("Contributing stressors", (
    "poor sleep / night waking", "change of plan", "leaving / returning / travel", "visitors / more people", "conflict", "time pressure", "noise / crowding", "pain / discomfort", "hunger / thirst", "other: ........................................"
  ))
  #select("Body state", (
    "hunger", "thirst", "need for toilet", "pain / discomfort", "physical tiredness", "body temperature — cold/hot", "muscle tension", "other: ........................................"
  ))
  #select("Sensory conditions", (
    "noise / sounds", "light", "crowding / number of people", "smells", "textures / touch", "room temperature", "other: ........................................"
  ))
])

#section("1. Immediately before the event", [
  #select("What happened immediately before the event?", (
    "activity change", "end of activity", "waiting", "refusal / no access", "request / instruction", "behavior correction", "social contact", "noise / crowding", "conflict", "transition between places", "other: ........................................"
  ))
  #area("Details of what happened immediately before", height: 2.3cm, hint: "Describe observable facts, without judging or blaming. A preceding event is not an established cause.")
])

#section("2. What was expected at that moment?", [
  #area("What did the person have influence over?", height: 1.4cm, hint: "Choice of order, time, place, way of doing the activity or opportunity for a break.")
  #area("What was unknown, imposed or outside the person’s influence?", height: 1.4cm, hint: "Sudden change, lack of information, time pressure or no opportunity to refuse or negotiate.")
  #select("Was it clear what would happen?", ("Yes", "No", "Unknown"), columns: 3)
  #select("Was it clear how long it would take?", ("Yes", "No", "Unknown"), columns: 3)
  #select("Was there room for negotiation or choice?", ("Yes", "No", "Unknown"), columns: 3)
  #select("Expectations / demands", (
    "no demands", "end of activity", "starting a task", "moving to another place", "waiting", "social contact", "following a rule", "self-care task", "other: ........................................"
  ))
])

#section("3. First signs of rising tension", [
  #stage-sources("Early signs", hint: "The selected sources apply to the account of the environment's response and the person's subsequent response below. For other information, specify its sources and the relevant field in the source details.")
  #select("Did signs appear?", ("Yes", "No", "Unknown"), columns: 3)
  #field("How long before escalation?", hint: "Minutes or clock times; mark an estimate or missing data.")
  #select("Observed changes in body and movement", (
    "faster breathing", "muscle tension", "sweating", "trembling", "dilated pupils", "fleeing / fighting actions", "other: ........................................"
  ))
  #select("Observed reduction in contact or activity", (
    "staring at one point / floor", "no response to voice", "slowed movements", "body slumping", "withdrawal", "other: ........................................"
  ))
  #select("Observed responses to surroundings", (
    "covering ears", "covering eyes", "stereotyped movements", "avoiding touch", "leaving the room", "other: ........................................"
  ))
  #area("How did the environment respond to the first signs of difficulty? What did the person do or communicate after that response?", height: 2.2cm, hint: "Include observations and information communicated by the person. If it is difficult to assess — indicate this.")
  #field("What usually appears first?",  hint: "The first small sign that may help identify an opportunity for earlier support.")
  #select("Did these signs precede the described behavior in other records?", ("Yes", "No", "Unknown"), columns: 3)
])

#section("3B. Continuing activity, compensation and possible masking", [
  #area("What was observed while the activity continued?", height: 1.5cm, hint: "Record actions, available support and time. Continuing alone does not demonstrate overload or masking. Not applicable / missing data are valid answers.")
  #area("What did the person communicate about effort or discomfort?", height: 1.5cm, hint: "The person’s communication (P), including AAC. No communication does not mean no experience.")
  #area("What was noticed later?", height: 1.5cm, hint: "Separate direct observation (O) from others’ reports (R); give time and source.")
  #area("Are compensation or masking being considered — on what basis?", height: 1.2cm, hint: "A hypothesis (H), not a diagnosis. Insufficient basis is a valid answer. The form itself does not measure hidden costs.")
])

#section("4. Support provided and conditions of access", [
  #select("Actions taken", (
    "reducing sensory input", "increasing autonomy / choice", "providing predictability", "interoceptive support", "time without demands / pause", "sensory regulation", "other: ........................................"
  ))
  #select("Was access to support conditional on following an instruction?", ("Yes", "No", "Partly", "Unknown"), columns: 4, hint: "Separate conditions for receiving help, pressure and opportunities for negotiation.")
  #select("Did the person use this form of support?", ("Yes", "No", "Partly", "Unknown"), columns: 2)
])

#section("5. Behavior description", [
  #stage-field("How did the escalation unfold? What actions or changes accompanied its intensification and subsiding?", "Escalation", height: 2.8cm)
  #field("Magnitude of the described behavior", hint: "Give a count, duration or comparable feature, e.g. 3 hand strikes on the table. Do not rate the whole event on an aggression scale.")
  #select("Observed consequences / harm", ("no harm observed", "injury to the person", "injury to another person", "damage to objects", "activity interrupted", "missing data", "other: ........................................"), columns: 2)
  #field("Actual consequences — description")
  #field("Potential risk — separate from actual consequences", hint: "What might have happened or was prevented? Do not record it as a consequence that actually occurred.")
])

#section("6. Timing and readiness", [
  #area("Duration of the described behavior", height: 1.5cm, hint: "Give the start and end of the behavior and its duration. Mark estimate / missing data / ongoing at observation end.")
  #area("Reduction in observed signs of tension", height: 1.5cm, hint: "Which signs decreased? How many minutes after the described behavior started was this change observed? Give minutes or clock time. Not observed by observation end / missing data are valid answers.")
  #area("Time until signs of readiness were observed", height: 1.5cm, hint: "How many minutes after the described behavior ended were signs of readiness observed? You may give clock times. Mark estimate / missing data / not observed by observation end. Describe needs and signs of readiness in the After escalation section.")
])

#section("7. After escalation", [
  #stage-field("What did the person need before resuming contact or activity? What was provided, and how was readiness recognized?", "After escalation", height: 2.2cm)
  #select("What happened after the event?", (
    "moving to a calmer place", "rest", "conversation later", "return to activity", "sleep", "contact with a close person", "no further demands", "other: ........................................"
  ))
  #select("Was there physical intervention during this event?", ("Yes", "No", "Unknown"), columns: 3)
  #field("If so — how many times during this event?", hint: "Enter a count or estimate; mark missing data if unknown.")
  #select("Did the person react faster or more strongly than usual?",  ("Yes", "No", "Unknown"), columns: 3)
  #field("Physical intervention: action, context, consequences / safety",  hint: "Briefly: action, context, consequences, safety and what could change next time. No instructions for physical techniques.")
], breakable: false)

#pagebreak()
= Environment map

#field("Observation period covered by the map")
#field("Map update date")
Mark sources: O — observation, P — the person’s communication (including AAC), R — another person’s report, H — hypothesis. The map records current knowledge, preferences and hypotheses. Liking an activity does not demonstrate reinforcement; cooperation does not establish feeling safe; silence does not mean no burden.

#meta()

#section("1. Places and preferred spaces", [
  #select("Where is it easiest for the person?", ("person’s room", "living room / shared space", "kitchen / dining room", "bathroom", "hallway / transitions", "outside", "car", "other: ........................................"), columns: 2)
  #area("What do you observe in these places, and what does the person say about them?", height: 1.4cm, hint: "Consider quiet, light, control of stimuli, predictability and accompanying people. Separate observation from a hypothesis about what helps.")
  #select("Which places does the person avoid, or where is it harder?", ("person’s room", "living room / shared space", "kitchen / dining room", "bathroom", "hallway / transitions", "outside", "car", "other: ........................................"), columns: 2)
  #area("What do you observe in these places, and what might make the situation difficult?", height: 1.4cm, hint: "Consider noise, smells, crowding, transitions, waiting and lack of influence. Mark hypotheses H.")
])

#section("2. Activities, roles and relationships", [
  #area("What does the person like doing or choose?", height: 1.4cm, hint: "Activities, topics, relationships, places or routines. Separate preference from observed signs of recovery.")
  #select("Which role in an activity is easiest?", (
    "leading / controlling", "cooperating participant", "observer / present without active participation", "independently without interaction with others"
  ), columns: 2)
])

#section("3. Conditions for optimal functioning", [
  #select("It is easiest for the person when…", (
    "there is quiet / little auditory input", "light is dimmed / natural", "the surroundings are calm", "they can control stimuli", "they have solitude / time without demands", "a close person is present without demands", "contact is 1:1", "parallel activity is possible without direct communication", "they influence how the activity unfolds", "they know what will happen and how long it will take", "they can negotiate or choose", "there are routines / repetition", "they have eaten / drunk", "they are rested", "temperature is comfortable", "there is no pain / discomfort", "other: ........................................"
  ))
])

#section("4. Support and regulators", [
  #area("Whom does the person choose to contact? What happens during contact?", height: 1.3cm, hint: "Notice contact style: tone, distance, absence of pressure and predictability.")
  #select("What reduces tension?", (
    "quiet / reducing stimuli", "movement — swing / trampoline / walk", "weight / pressure", "cold or warmth", "stereotyped movements / rocking / jumping", "food / drink", "sleep / nap", "toilet", "a close person without demands", "solitude / withdrawal", "physical contact", "distance / personal space", "withdrawing the demand", "access to a preferred activity", "choice / ability to decide", "information about duration", "other: ........................................"
  ))
  #area("What gives energy / helps restore resources?", height: 1.2cm, hint: "Not only what appears calming: record the person’s account or observed signs of recovery after effort, separately from hypotheses.")
])

#section("5. What does functioning depend on?", [
  #select("Under which conditions do you observe differences in behavior or readiness?", ("noise", "number of people", "change of plan", "time of day", "sleep", "food / drink", "pain / discomfort", "temperature", "social contact", "time pressure", "waiting", "transitions between activities", "other: ........................................"), columns: 2)
  #area("How does behavior differ across these conditions?", height: 1.8cm, hint: "Describe when it is easier and when signs of tension appear sooner. An observed difference does not by itself establish a cause.")
])

#section("6. Safe spaces and people", [
  #area("Where / with whom can the person return to regulation without additional demands?", height: 2.2cm, hint: "Without a repair conversation, questions or new instructions; consider communicated needs and observed signs of readiness. Cooperation is not evidence of feeling safe.")
])

#section("7. Escalation contexts and prevention", [
  #select("When does escalation risk most often increase?", ("waiting", "end of activity", "change of plan", "noise / crowding", "social contact", "behavior correction", "lack of influence", "moving to another place", "tiredness / hunger / pain", "other: ........................................"), columns: 2)
  #select("What might reduce escalation risk?", (
    "advance notice / preparation", "timer / visual plan", "choice of when / how / in what order", "negotiation / discussion", "clear ending", "no rush", "presence of a close person", "access to sensory regulation", "other: ........................................"
  ), columns: 2)
  #select("Do similar situations occur without the described escalation?", ("Yes", "No", "Unknown"), columns: 3)
  #area("If so — what is similar or different? What might help?", height: 1.5cm, hint: "Consider people, place, predictability, choice and pressure. Give examples and numbers of opportunities if available. Repeated association does not establish causality.")
])

#pagebreak()
#text(size: 17pt, weight: "bold")[Bibliography accompanying the forms]
#v(8pt)
#text(size: 9pt)[The references below are preserved from the “Theoretical background” section of Małgorzata Mikołajczyk’s guide “How to Use Monitoring Forms”. They provide accompanying theoretical background, not evidence of validation of this tool or of the accuracy of every category.]
#v(10pt)
#block(above: 7pt, breakable: false)[#text(size: 10pt)[Cooper, J. O., Heron, T. E., & Heward, W. L. (2020). _Applied Behavior Analysis_ (3rd ed.). Pearson.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[O'Neill, R. E., Albin, R. W., Storey, K., Horner, R. H., & Sprague, J. R. (2015). _Functional Assessment and Program Development for Problem Behavior: A Practical Handbook_ (3rd ed.). Cengage Learning.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[Garfinkel, S. N., Seth, A. K., Barrett, A. B., Suzuki, K., & Critchley, H. D. (2015). Knowing your own heart: Distinguishing interoceptive accuracy from interoceptive sensibility. _Biological Psychology_, 104, 65–74.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[Shah, P., Hall, R., Catmur, C., & Bird, G. (2016). Alexithymia, not autism, is associated with impaired interoception. _Cortex_, 81, 215–220.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. _Psychological Inquiry_, 11(4), 227–268.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[O'Nions, E., Christie, P., Gould, J., Viding, E., & Happé, F. (2014). Development of the "Extreme Demand Avoidance Questionnaire" (EDA-Q): Preliminary observations on a trait measure for pathological demand avoidance. _Journal of Child Psychology and Psychiatry_, 55(7), 758–768.]]
#block(above: 7pt, breakable: false)[#text(size: 10pt)[Substance Abuse and Mental Health Services Administration. (2014). _SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach_. HHS Publication No. SMA 14-4884.]]
