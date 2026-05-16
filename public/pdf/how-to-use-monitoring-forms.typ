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
  font: "Linux Libertine",
  size: 10.5pt,
  lang: "en"
)

#set par(
  justify: true,
  leading: 0.62em
)

#set heading(numbering: none)

#show heading.where(level: 1): it => block(
  above: 1.4em,
  below: 0.9em
)[
  #set text(size: 18pt, weight: "bold")
  #it.body
]

#show heading.where(level: 2): it => block(
  above: 1.1em,
  below: 0.7em
)[
  #set text(size: 15pt, weight: "bold")
  #it.body
]

#let note(content) = block(
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
- a single trigger from the broader context of the day.

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

== 2. Separate background from trigger

A trigger is not always a “big” event.

Often it is the final element after a series of earlier stressors:
noise, exhaustion, changes in routine, pain, pressure, or many small demands.

#pagebreak()

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
- “freezing.”

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
- and when the person became ready for contact and cooperation again.

#note[
  Practical tip: if you are not sure what to write after a situation,
  start with three things:
  - what happened beforehand,
  - what the first warning sign was,
  - what actually helped.
]

#pagebreak()

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

  [*Question*], [*What to record*], [*What to avoid*],

  [1. State before the situation],
  [Sleep, hunger, pain, noise, changes in routine, earlier difficulties.],
  [“Was in a bad mood.”],

  [2. Early signs],
  [What appeared before escalation.],
  [“Suddenly exploded for no reason.”],

  [3. Behavior],
  [Observable facts: words, movements, actions.],
  [Interpreting intentions.],

  [4. Environmental response],
  [What adults or the environment did.],
  [Ignoring the role of the environment.],

  [5. What helped],
  [What reduced tension or supported a return to regulation and readiness.],
  [Vague descriptions such as “calmed down.”],

  [6. Return to readiness],
  [How long it took to return to contact and activity.],
  [Assuming no protest = readiness.]
)

#note[
  The simple form is not intended to provide a complete explanation of the situation.
  It is meant to create a quick record of data that can later be compared.
]

#pagebreak()

= Extended form

The extended version is designed for more detailed analysis.

It works best:
- when difficulties repeat,
- during support planning,
- in team-based work,
- when developing functional hypotheses.

It helps separate:
- stressors from the entire day,
- the immediate trigger,
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

  [*Section*], [*What it describes*], [*Why it matters*],

  [0. Daily context],
  [Sleep, exhaustion, pain, earlier stressors.],
  [Helps assess the starting point of the situation.],

  [1. Immediately before],
  [The last minutes before tension increased.],
  [Separates the trigger from the earlier background.],

  [2. Demands and control],
  [What was clear, imposed, or under the person’s control.],
  [Helps assess predictability and autonomy.],

  [3. Early signs],
  [Behavior changes before escalation.],
  [Helps identify opportunities for earlier support.],

  [3B. Masking and compensation],
  [Whether the person continued despite overload.],
  [Shows the cost of maintaining “apparent functioning.”],

  [4. Environmental actions],
  [Type of support and environmental response.],
  [Helps identify what reduced or increased difficulty.],

  [5. Behavior],
  [Observable facts.],
  [Separates description from interpretation.],

  [6. Return to readiness],
  [Time and conditions needed to regain contact.],
  [Supports planning of further activity.],

  [7. What happened afterward],
  [Further course of the situation.],
  [Helps assess the risk of secondary escalation.]
)

#pagebreak()

= How to use the data

The form is most useful when several situations are compared.

One event reflects one day.
Several forms make patterns visible.

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

#pagebreak()

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

#pagebreak()

= Knowledge base

The form is informed by:
- functional behavior analysis,
- observation of environmental context,
- trauma-informed approaches,
- research on regulation, interoception, and sensory processing,
- research on autonomy and predictability.

Key sources:
- Cooper, J. O., Heron, T. E., & Heward, W. L. (2020). _Applied Behavior Analysis_ (3rd ed.). Pearson.
- Allen et al. (2024). Neurodiversity-Affirming Applied Behavior Analysis. _Behavior Analysis in Practice_.
- Mathur, S. K., Renz, E., & Tarbox, J. (2024). Affirming Neurodiversity within Applied Behavior Analysis. _Behavior Analysis in Practice_.
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