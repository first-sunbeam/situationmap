export type EnvironmentKey = "home" | "center" | "school";
export type FormVariant = "simple" | "extended";
export type ExtendedMode = "incident" | "map";
export type PdfAction = "open" | "download";

export interface EnvironmentConfig {
  icon: string;
  label: string;
  header: string;
  footer: string;
  incidentTitle: string;
  mapTitle: string;
  person: string;
  personShort: string;
  lead: string;
  stayStages?: string[];
  burdens: string[];
  antecedents: string[];
  expectations: string[];
  interventions: string[];
  harms: string[];
  after: string[];
  endedBy: string[];
  places: string[];
  dependencies: string[];
  escalationContexts: string[];
}

export interface MetaForm {
  date: string;
  time: string;
  place: string;
  lead: string;
  present: string;
}

export interface SimpleFormData {
  factDescription: string;
  antecedents: string;
  signals: string;
  interventions: string;
  behavior: string;
  helped: string;
  notes: string;
}

export interface IncidentFormData {
  tension: string;
  tired: string;
  slept: string;
  sleepDetails: string;
  stayStage: string;
  stayStageLoad: string;
  burdens: string[];
  burdensOther: string;
  antecedents: string[];
  factDescription: string;
  expectations: string[];
  expectationOther: string;
  signalsAppeared: string;
  signals: string[];
  signalsOther: string;
  timeToEscalation: string;
  firstSignal: string;
  predicts: string;
  phase: string;
  interventions: string[];
  interventionDetails: string;
  unconditional: string;
  usedRegulator: string;
  reducedTension: string;
  earlierPossible: string;
  earlierWhat: string;
  behavior: string;
  intensity: string;
  harms: string[];
  after: string[];
  afterOther: string;
  escalationDuration: string;
  calmTime: string;
  physicalThisWeek: string;
  physicalCount: string;
  lowerThreshold: string;
  physicalNote: string;
  helped: string;
  endedBy: string[];
  endedByOther: string;
  worsened: string;
  regulators: string;
  rewards: string;
}

export interface MapRow {
  place: string;
  time: string;
  activity: string;
}

export interface EnvironmentMapFormData {
  rows: MapRow[];
  preferred: string;
  avoided: string;
  likes: string;
  easiestWhen: string;
  cooperatesWith: string;
  reducers: string;
  dependsOn: string[];
  dependsDescription: string;
  escalationContexts: string[];
  escalationOther: string;
  noAggression: string;
  noAggressionWhere: string;
}

export interface SituationForm {
  meta: MetaForm;
  simple: SimpleFormData;
  incident: IncidentFormData;
  map: EnvironmentMapFormData;
}

export type FieldErrors = Record<string, string>;

export interface ValidationResult {
  fieldErrors: FieldErrors;
  summary: string[];
}
