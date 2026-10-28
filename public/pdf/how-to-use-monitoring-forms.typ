#set document(
  title: "How to Use Monitoring Forms",
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
  font: "Libertinus Serif",
  size: 10.5pt,
  lang: "en"
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
   How to Use Monitoring Forms
  ]

  #v(0.5em)

  #text(size: 13pt, fill: rgb("#6c6a63"))[
    A guide for using monitoring forms to observe situations,
    identify patterns, and plan support without blame or judgment.
  ]
]

#v(2em)

#outline(
  title: [Contents],
  depth: 2
)

#pagebreak()

= Recording and assessment

One form concerns one event. Mark information sources next to entries:
- *O* — direct observation,
- *P* — the person’s communication, including AAC,
- *R* — another person’s report,
- *H* — hypothesis.

State when your observation began and ended. “Unknown”, “not observed” and “not applicable” mean different things. Missing data is not a negative finding; a blank never means “no”. Record when it is safe to do so and do not guess information you do not have.

Describe responses and actions at the relevant stage: *early signs*, *escalation* or *after escalation*. Include observations and information communicated by the person. If it is difficult to assess — indicate this. Each description has O/P/R/H source checkboxes; you may select several. In the optional details field, you may identify who provided the information and which part of the account each source supports. There is no separate “what helped” summary. Support can be offered before the cause of the difficulty has been established. Record what was done and what was observed afterwards; temporal sequence alone does not prove a cause.

Record minutes or clock times and mark estimates. Keep three pieces of information separate:
- *How long did the described behavior last?* Give its start and end times.
- *How many minutes after that behavior started did the observed signs of tension decrease?* Describe which signs changed.
- *How many minutes after that behavior ended were signs of readiness for a specific activity or contact observed?* Specify the activity or contact and the signs of readiness or the person’s communication.

If the change was not observed by the end of observation, record that. If the information is unavailable, enter “missing data”. Stopping shouting or beginning to respond to communication — through words, gestures or AAC — does not mean agreeing to a task. Readiness for an activity and consent to it are separate information.

#note[
  *Example of calculating the times:* shouting lasted from 12:00 to 12:05 — 5 minutes. At 12:08 the person stopped clenching their hands: this change was observed *8 minutes after the shouting started*. At 12:15 they chose a book and started reading: signs of readiness for reading were observed *10 minutes after the shouting ended*. This does not imply readiness or consent for a different task.
]

Describe magnitude using a measurable feature of a selected behavior, not a single aggression/risk score. Record actual consequences separately from potential risk. Observer-rated tension requires individual signs and comparison with the person’s usual presentation; it is not a diagnostic scale and must not be added into a total.

Continuing an activity alone does not confirm anxiety, overload or masking. Categories of signs are descriptive aids, not diagnoses of a mechanism. The form itself does not measure hidden costs of functioning.

#note[
  The bibliography provides theoretical background. It is not evidence that this form or its categories have been validated.
]

= Why use monitoring forms

Monitoring forms help turn individual incidents into data that can be compared across situations.

Their purpose is not to judge the person or assign blame. They are meant to help answer questions such as:
- what happened before tension increased,
- what early signs appeared,
- what helped,
- what made the situation harder,
- what patterns repeat over time.

The form helps separate:
- description from interpretation,
- behavior from intention,
- calming down from return to regulation,
- the immediately preceding event from the broader context of the day.

Several similar records can reveal patterns that are not visible after a single situation:
- specific times of day,
- types of demands,
- changes in routine,
- overwhelming conditions,
- lack of predictability,
- transitions that happen too quickly,
- long recovery time before regulation and readiness return.

#note[
  The form is not meant to build a “list of problem behaviors.”
  Its purpose is to support planning and environmental adjustments.
]

= Principles for describing situations

== 1. Describe observable facts

Write down what could be seen or heard.

Good examples:
- “clenched hands,”
- “repeated: I don’t want to,”
- “sat under the table,”
- “raised voice,”
- “left the room.”

Avoid:
- “manipulated,”
- “did it on purpose,”
- “tested boundaries,”
- “was lazy,”
- “wanted attention.”

== 2. Separate background from the immediately preceding event

The immediately preceding event may be small. Record it separately from earlier conditions such as noise, tiredness, changes of plan, pain, pressure or multiple demands. Do not treat a preceding event as an established cause merely because it happened first.

== 3. Record early signs

The moments before escalation are the most important.

These may include:
- withdrawal,
- silence,
- faster speech,
- body tension,
- jokes or irony,
- increased need for control,
- stopping an activity,
- a pause or marked reduction in movement or response.

Describe what was actually seen or heard rather than assigning a shutdown, freezing or autonomic mechanism.

== 4. Record the environmental response

It matters not only what the person did, but also:
- how the environment responded,
- whether support was available,
- whether additional demands appeared,
- whether the person had access to choice or breaks.

== 5. Separate calming from readiness

A person stopping crying, shouting, or protesting does not always mean readiness for:
- conversation,
- further instructions,
- returning to activities,
- making decisions.

It is useful to record:
- when the behavior stopped,
- when specific observed signs of tension decreased,
- and when there were signs of readiness for a specified activity or contact.

No shouting or aggression does not demonstrate wellbeing. Contact, readiness and consent are different information.

#note[
  Practical tip: if you are not sure what to write after a situation,
  start with three things:
  - what happened beforehand,
  - what the first warning sign was,
  - what helped or may have helped, and the observable basis or the person’s communication supporting that judgement.
]

= Simple form

The simple form is designed for quick recording after a situation.

It works best:
- at home,
- at school,
- during everyday situations,
- when there is no time for full analysis.

== How to complete it

#table(
  columns: (2fr, 3fr, 3fr),
  stroke: rgb("#d7d2c7"),
  fill: (x, y) => if y == 0 { rgb("#f1efe8") },

  table.header([*Question*], [*What to record*], [*What to avoid*]),

  [1. State before], [Sleep, hunger, pain, conditions and earlier difficulties.], [Judgements such as “bad mood”.],
  [2. Immediately before], [What happened in the preceding minutes.], [Treating it as an established cause.],
  [3. Early signs], [Observed changes or the person’s communication.], [Inferring a reaction mechanism.],
  [4. Response to early signs], [The environmental response and what the person did or communicated afterwards.], [Omitting the person’s response.],
  [5. Escalation], [Its course and actions or changes accompanying intensification and subsiding.], [Assuming sequence proves cause.],
  [6. After escalation], [Needs, support provided and signs of readiness.], [Equating silence or responding with consent.],
  [7. Influence and choice], [What could be chosen or negotiated.], [Inferring intentions.],
  [8. Predictability], [What was known or unknown.], [Assuming the person knew.],
  [9. Readiness timing], [Minutes after behavior ended or clock time; mark estimate or missing data.], [Repeating the account of needs.]
)

#note[
  The simple form is not intended to provide a complete explanation of the situation.
  It is meant to create a quick record of data that can later be compared.
]

= Extended form

The extended version is designed for more detailed analysis.

It works best:
- when difficulties repeat,
- during support planning,
- in team-based work,
- when developing functional hypotheses.

It helps separate:
- stressors from the entire day,
- the immediately preceding event,
- demands and predictability,
- early warning signs,
- environmental responses,
- the course of the situation,
- recovery time before regulation and readiness return.

== Sections of the form

#table(
  columns: (2fr, 3fr, 4fr),
  stroke: rgb("#d7d2c7"),
  fill: (x, y) => if y == 0 { rgb("#f1efe8") },

  table.header([*Section*], [*What it describes*], [*Why it matters*]),

  [0. Daily context],
  [Sleep, exhaustion, pain, earlier stressors.],
  [Helps assess the starting point of the situation.],

  [1. Immediately before],
  [The last minutes before tension increased.],
  [Separates the preceding event from earlier context and a hypothesis about cause.],

  [2. Demands and control],
  [What was clear, imposed, or under the person’s control.],
  [Helps assess predictability and autonomy.],

  [3. Early signs],
  [Behavior changes, the environmental response and the person’s subsequent response.],
  [Helps identify opportunities for earlier support.],

  [3B. Continuing activity, compensation and possible masking],
  [Observations during activity, the person’s account, later observations or reports, and a separate hypothesis.],
  [Collects information about possible effort or cost; the record does not itself measure it or establish masking.],

  [4. Support provided and access conditions],
  [Type of support and conditions of access.],
  [Separates access to help, pressure and negotiation without repeating the account of responses.],

  [5. Behavior],
  [The course of escalation and accompanying actions or changes; measurable features, actual consequences and potential risk.],
  [Separates behavior, consequences and risk instead of combining them in one score.],

  [6. Timing and readiness],
  [Behavior duration, reduction in observed signs of tension and readiness for a specified activity or contact.],
  [Separates three measures with different time anchors. Readiness does not imply consent.],

  [7. After escalation],
  [The person’s needs, support provided, signs of readiness, subsequent events and any physical intervention during this event.],
  [Records action, consequences and safety, not a weekly intervention total or instructions for physical techniques.]
)

= Environment map

The map records current knowledge, preferences and hypotheses about places, activities, relationships and environmental conditions. Give the *observation period and update date*.

Use the same source markings: O — observation, P — the person’s communication (including AAC), R — another person’s report, H — hypothesis. Separate what the person chooses or says they like from observed changes and hypotheses about what helps.

Record:
- preferred or avoided places and what is observed there,
- activities the person likes or chooses and their role during those activities,
- conditions associated with easier participation,
- chosen contact and what happens during contact,
- observed signs or the person’s account of rest and recovery,
- differences across conditions,
- places and people offering rest without additional demands,
- similar situations without the described escalation.

Liking an activity does not demonstrate a reinforcement function. Cooperation does not establish feeling safe, and silence does not mean no burden. When describing possible protective conditions, distinguish observation from a causal hypothesis.

Compare what is similar and different in situations with and without escalation. Give dates, examples and numbers of opportunities if available. Absence of aggression alone does not mean absence of difficulty or a need for support.

= How to use the data

The form is most useful when several situations are compared.

One event reflects one day.
Several records may suggest a pattern. Also compare similar situations without escalation and the number of opportunities. Two events in two opportunities differ from two in twenty. Repeated association does not establish causality.

== What to look for

- Do difficulties appear more often at a specific time of day?
- Does tension increase after changes in routine?
- Does a certain type of demand increase difficulty?
- Does the person need a long recovery period before readiness returns?
- Do specific environmental conditions increase overload?
- Was support available early enough?

== What the form does not assume

The form does not assume that:
- every demand is harmful,
- every difficulty is purely sensory,
- support means absence of boundaries,
- contextual analysis removes responsibility for safety.

The purpose of the form is not to remove all demands.

The purpose is:
- better understanding of situations,
- earlier recognition of warning signs,
- adjusting support strategies,
- reducing unnecessary overload,
- building a more predictable environment.

#note[
  The goal is not to eliminate all demands. \
  The goal is to understand:\
  when,\
  how,\
  and under what conditions\
  demands become accessible.
]

= What the form does not do

== It does not diagnose

The form does not diagnose autism, ADHD, PDA, trauma, or other developmental or mental health conditions.

It may provide observational material useful for further assessment, but it is not a diagnostic tool.

== It is not for judgment

The form is not intended for:
- assigning bad intentions,
- judging character,
- building narratives about a “difficult child,”
- justifying punishment.

== It does not replace clinical assessment

The form does not replace:
- diagnosis,
- functional behavior assessment,
- support planning,
- clinical supervision.

It is a tool for collecting data and building hypotheses.

== It does not provide one final answer

Not every pattern will be immediately visible.

Sometimes several or many records are needed to identify:
- repeated stressors,
- specific environmental conditions,
- effective support strategies.

#note[
  The form is meant to support thinking about the situation,
  not reduce it to a single interpretation.
]

= Theoretical background

The form is informed by:
- functional behavior analysis,
- observation of environmental context,
- trauma-informed approaches,
- research on regulation, interoception, and sensory processing,
- research on autonomy and predictability.

The references below are preserved from Małgorzata Mikołajczyk’s revised Polish instruction. They provide theoretical background, not validation of this form, its categories or the efficacy of an action in a particular situation.

Key sources:
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
    Małgorzata Mikołajczyk \
    Psychologist · Behavior Analyst (BCBA)\
    #link("http://autyzm.poznan.pl")
  ]
]