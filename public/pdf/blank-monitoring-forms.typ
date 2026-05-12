#set document(
  title: "Blank Monitoring Forms",
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

#set text(font: "Linux Libertine", size: 9.6pt, lang: "en")
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

#let field(label, height: 0.85cm, hint: none) = block(width: 100%, below: 1em, above: 1em)[
  #v(0.5em)
  #text(weight: "bold")[#label]
  #hint-text(hint)
  #v(1em)
  #line(length: 100%, stroke: dotted-stroke)
]

#let area(label, height: 2cm, hint: none) = block(width: 100%, below: 0.1em, above: 1em)[
  #text(weight: "bold")[#label]
  #hint-text(hint)
  #v(0.12em)
  #rect(width: 100%, height: height, stroke: line-stroke, radius: 2pt)
]

#let row-fields(a, b) = grid(columns: (1fr, 1fr), column-gutter: 0.3cm, field(a), field(b))

#let checks(items, columns: 2) = block(width: 100%, below:1em, above:0.4em)[
  #grid(
    columns: if columns == 3 { (1fr, 1fr, 1fr) } else { (1fr, 1fr) },
    column-gutter: 0.5em,
    row-gutter: 0.55em,
    ..items.map(item => [☐ #item])
  )
]

#let select(label, items, columns: 2, hint: none) = block(width: 100%, below: 0.55em, above: 2em)[
  #text(weight: "bold")[#label]
  #hint-text(hint)
  #checks(items, columns: columns)
]

#let section(title, body) = block(
  fill: soft,
  stroke: soft-stroke,
  inset: 10pt,
  radius: 6pt,
  width: 100%,
  below: 2em
)[
  #text(size: 12.5pt, weight: "bold")[#title]
  #body
]

#let meta() = section("Basic information", [
  #grid(columns: (1fr, 1fr, 1fr), column-gutter: 0.3cm,
    field("Date"),
    field("Time"),
    field("Place")
  )
  #grid(columns: (1fr, 1fr), column-gutter: 0.3cm,
    field("Person’s initials / name"),
    field("Parent / caregiver / lead person")
  )
  #field("Other people present")
  #select("Environment", ("Home", "School", "Care setting", "Other: ........................................"), columns: 2)
])

#title-page("Situation Monitoring Forms", "Printable version for manual completion")

#pagebreak()

= Simple form

#meta()

#section("Quick situation description", [
  #area("What was the person’s state before the situation?", height: 2.1cm, hint: "Sleep, hunger, pain, noise, changes of plan, earlier tension.")
  #area("What happened immediately before the situation?", height: 2.1cm, hint: "Describe the last minutes: demand, change, refusal, waiting, contact.")
  #area("First signs of rising tension", height: 1.8cm, hint: "What appeared before escalation: body, voice, movement, withdrawal.")
  #area("Adults’ / environment’s response", height: 1.8cm, hint: "What did adults or the environment do? What was changed, added or withdrawn?")
  #area("What did the person do? Observable facts", height: 2.2cm, hint: "Record words, movements and actions. Avoid interpreting intentions.")
  #area("What helped reduce tension or return to regulation?", height: 2cm, hint: "Write specific conditions or actions, not only “calmed down”.")
  #area("Did the person have influence, choice, room to negotiate or pause?", height: 1.7cm, hint: "What could the person control, and what was imposed or unavoidable?")
  #area("Was the situation predictable? What was known / unknown?", height: 1.5cm, hint: "Was it clear what would happen, how long it would take and how it would end?")
  #select("Return to readiness", ("5 minutes", "10–30 minutes", "1–2 hours", "several hours or the next day"), columns: 2, hint: "Readiness means ability to connect, talk or return to activity — not only absence of escalation.")
])

#pagebreak()

= Extended form

#meta()

#section("0. Baseline and daily context", [
  #select("Tension level before the event", ("0 low / stable", "1 elevated", "2 high", "3 very high"), columns: 2, hint: "What was the person’s state before the immediate trigger?")
  #select("Was the person tired?", ("Yes", "No", "Not sure"), columns: 3)
  #select("Did the person sleep enough?", ("Yes", "No", "Not sure"), columns: 3)
  #field("If sleep mattered — specify", hint: "E.g. short sleep, waking, nightmares, very early waking.")
  #select("Stay stage / daily context, if applicable", ("arrival / change day", "departure / return day", "middle of the week", "end of the week", "not applicable"), columns: 2)
  #select("Load factors", (
    "poor sleep / night waking", "change of plan", "leaving / returning / travel", "visitors / more people", "conflict", "time pressure", "noise / crowding", "pain / discomfort", "hunger / thirst", "other: ........................................"
  ))
  #select("Body state", (
    "hunger", "thirst", "need for toilet", "pain / discomfort", "physical tiredness", "body temperature — cold/hot", "muscle tension", "other: ........................................"
  ))
  #select("Sensory intensity", (
    "noise / sounds", "light", "crowding / number of people", "smells", "textures / touch", "room temperature", "other: ........................................"
  ))
])

#section("1. Immediately before the event", [
  #select("What happened immediately before the event?", (
    "activity change", "end of activity", "waiting", "refusal / no access", "request / instruction", "behaviour correction", "social contact", "noise / crowding", "conflict", "transition between places", "other: ........................................"
  ))
  #area("Details of what happened immediately before", height: 2.3cm, hint: "Describe observable facts, without judging or blaming.")
])

#section("2. What was expected at that moment?", [
  #area("What did the person have influence over?", height: 1.4cm, hint: "Choice of order, time, place, way of doing it, possibility of a break.")
  #area("What was unknown, imposed or outside the person’s control?", height: 1.4cm, hint: "Sudden change, lack of information, time pressure, no possibility to refuse or negotiate.")
  #select("Was it clear what would happen?", ("Yes", "No", "Not sure"), columns: 3)
  #select("Was it clear how long it would take?", ("Yes", "No", "Not sure"), columns: 3)
  #select("Was there room for negotiation or choice?", ("Yes", "No", "Not sure"), columns: 3)
  #select("Expectations / demands", (
    "no demands", "end of activity", "starting a task", "moving to another place", "waiting", "social contact", "following a rule", "self-care task", "other: ........................................"
  ))
])

#pagebreak();

#section("3. First signs of rising tension", [
  #select("Did signs appear?", ("Yes", "No", "Not sure"), columns: 3)
  #field("How long before escalation?", hint: "Estimate: minutes, several minutes, earlier in the day.")
  #select("Type 1: activation", (
    "faster breathing", "muscle tension", "sweat", "trembling", "dilated pupils", "flight / fight", "other: ........................................"
  ))
  #select("Type 2: shutdown / freeze", (
    "staring at one point / floor", "no response to voice", "slowed movements", "body slumping", "withdrawal", "other: ........................................"
  ))
  #select("Type 3: sensory", (
    "covering ears", "covering eyes", "stereotyped movements", "avoiding touch", "leaving the room", "other: ........................................"
  ))
  #field("What usually appears first?", hint: "The first small sign that may help respond earlier.")
  #select("Does it predict more difficult behaviour?", ("Yes", "No", "Not sure"), columns: 3)
])

#section("3B. Compensatory strategies and masking", [
  #select("Did the person try to continue the activity despite rising tension?", ("Yes", "No", "Not sure"), columns: 3, hint: "This means “holding it together” despite overload, not deliberate pretending.")
  #select("If yes — what helped the person “hold it together” before escalation?", (
    "masking / hiding discomfort", "retreating into fantasy / humour / controlling the conversation", "support from accompanying person", "clear end of activity", "fear of consequences / judgement", "strong internal motivation", "other: ........................................"
  ))
  #select("How long did the person “hold it together” before escalation?", ("a few minutes", "10–30 minutes", "over 30 minutes", "all day — escalation later / at home"), columns: 2)
])

#section("4. Actions taken before escalation", [
  #select("Tension phase when actions were taken", ("green — conversation possible", "yellow — rising tension", "red — full escalation", "hard to tell"), columns: 2)
  #select("Actions taken before escalation", (
    "reducing sensory input", "increasing autonomy / choice", "providing predictability", "interoceptive support", "time without demands / pause", "sensory regulation", "other: ........................................"
  ))
  #select("Was the action unconditional, without pressure or negotiation?", ("Yes", "No", "Partly", "Not sure"), columns: 4)
  #select("Was a regulator / regulation strategy used?", ("Yes", "No", "Partly"), columns: 3)
  #select("Did the action reduce tension?", ("Yes", "No", "Partly"), columns: 3)
  #area("What should be done earlier next time?", height: 1.5cm, hint: "Cue for earlier pause, reduced demands, choice, regulation or environmental change.")
])



#section("5. Behaviour description", [
  #area("Behaviour description — observable facts", height: 2.8cm, hint: "What was seen or heard: words, movement, gestures, actions, without labels like “manipulation”.")
  #select("Intensity", ("0 no aggression", "1 mild", "2 moderate", "3 high risk"), columns: 2)
  #select("Effects / harm, if any", ("no harm", "shouting / crying", "throwing objects", "damaging things", "aggression towards others", "self-injury", "running away / leaving", "other: ........................................"), columns: 2)
])


#section("6. Regulation and impact", [
  #field("Escalation duration", hint: "From clear intensification until escalation began to decrease.")
  #select("Time to full emotional calming", ("up to 5 minuteses", "5–15 minuteses", "15–30 minutes", "30–60 minutes", "over an hour"), columns: 2)
  #select("Time to cognitive / contact readiness", ("immediately after calming", "10–30 minuteses after", "1–2 hours after", "several hours or the next day"), columns: 2)
  #select("What helped end escalation most?", (
    "time / waiting without intervention", "silence / reducing stimuli", "presence of a close person", "1:1 contact", "break from demands", "access to sensory regulation", "withdrawing the demand", "other: ........................................"
  ))
  #area("What made things worse or prolonged return to regulation?", height: 1.6cm, hint: "E.g. talking too early, more demands, touch, noise, public attention.")
  #select("What helped return to readiness after the situation?", (
    "silence and no stimuli", "sleep / nap", "food / drink", "sensory activity", "close person without demands", "being alone", "favourite activity without pressure", "time", "other: ........................................"
  ))
])

#section("7. After the event", [
  #select("What happened after the event?", (
    "moving to a calmer place", "rest", "conversation later", "return to activity", "sleep", "contact with a close person", "no further demands", "other: ........................................"
  ))
  #select("Was there physical intervention this week?", ("Yes", "No", "Not sure"), columns: 3)
  #field("If yes — how many times?", hint: "Enter a number or estimate.")
  #select("Was the reaction threshold lower than usual?", ("Yes", "No", "Not sure"), columns: 3)
  #field("Note on physical intervention / safety", hint: "Briefly: context, safety, what could change next time.")
])

#pagebreak()

= Environment map

#meta()

#section("1. Places and preferred spaces", [
  #select("Where is it easiest for the person?", ("person’s room", "living room / shared space", "kitchen / dining room", "bathroom", "hallway / transitions", "outside", "car", "other: ........................................"), columns: 2)
  #area("Why do these places help?", height: 1.4cm, hint: "What works there: silence, light, control of stimuli, predictability, accompanying person.")
  #select("Which places does the person avoid or find harder?", ("person’s room", "living room / shared space", "kitchen / dining room", "bathroom", "hallway / transitions", "outside", "car", "other: ........................................"), columns: 2)
  #area("Why are these places difficult?", height: 1.4cm, hint: "What loads the person: noise, smells, crowding, transitions, waiting, lack of influence.")
])

#section("2. Activities, roles and relationships", [
  #area("What does the person like doing / what strengthens them?", height: 1.4cm, hint: "Activities, topics, relationships, places or rituals that rebuild resources.")
  #select("Which role in an activity is easiest?", (
    "leading / controlling", "cooperating participant", "observer / present without active participation", "alone without interaction with others"
  ), columns: 2)
])

#section("3. Conditions for optimal functioning", [
  #select("It is easiest for the person when…", (
    "there is silence / little auditory input", "light is dimmed / natural", "the environment is calm", "they can control stimuli", "they have solitude / time without demands", "a close person is present without demands", "contact is 1:1", "contact can be parallel, without direct communication", "they influence how the activity unfolds", "they know what will happen and how long it will take", "they can negotiate or choose", "there are routines / repetition", "they have eaten / drunk", "they are rested", "temperature is comfortable", "there is no pain / discomfort", "other: ........................................"
  ))
])

#section("4. Support and regulators", [
  #area("Who does the person cooperate with most easily / feel safe with?", height: 1.3cm, hint: "Notice that person’s contact style: tone, distance, lack of pressure, predictability.")
  #select("What reduces tension?", (
    "silence / reducing stimuli", "movement — swing / trampoline / walk", "weight / pressure", "cold or warmth", "stereotyped movements / rocking / jumping", "food / drink", "sleep / nap", "toilet", "close person without demands", "solitude / withdrawal", "physical contact", "distance / personal space", "withdrawing the demand", "access to favourite activity", "choice / ability to decide", "information about how long it will take", "other: ........................................"
  ))
  #area("What gives energy / helps rebuild resources?", height: 1.2cm, hint: "Not only what calms, but what truly restores after load.")
])


#section("5. What does functioning depend on?", [
  #select("Behaviour / readiness depends especially on…", ("noise", "number of people", "change of plan", "time of day", "sleep", "food / drink", "pain / discomfort", "temperature", "social contact", "time pressure", "waiting", "transitions between activities", "other: ........................................"), columns: 2)
  #area("How does behaviour change depending on these conditions?", height: 1.8cm, hint: "Describe differences: when it is easier, when tension rises faster, what lowers the threshold.")
])

#section("6. Safe spaces and people", [
  #area("Where / with whom can the person return to regulation without additional demands?", height: 2.2cm, hint: "Without repair talk, questions or new instructions until the nervous system returns to readiness.")
])

#section("7. Escalation contexts and prevention", [
  #select("When does the risk of escalation most often increase?", ("waiting", "end of activity", "change of plan", "noise / crowding", "social contact", "behaviour correction", "lack of influence", "moving to another place", "tiredness / hunger / pain", "other: ........................................"), columns: 2)
  #select("What can reduce the risk of escalation?", (
    "warning / preparation", "timer / visual plan", "choice when / how / in what order", "negotiation / discussion", "clear ending", "no rush", "presence of a close person", "access to sensory regulation", "other: ........................................"
  ), columns: 2)
  #select("Are there situations without aggression despite difficulty?", ("Yes", "No", "Not sure"), columns: 3)
  #area("If yes — where / when and what helps then?", height: 1.5cm, hint: "These may be protective conditions: person, place, predictability, choice, no pressure.")
])
