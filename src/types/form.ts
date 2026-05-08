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
  lead: string;
  stayStages?: string[];
  burdens: string[];
  antecedents: string[];
  expectations: string[];
  harms: string[];
  after: string[];
  endedBy: string[];
  places: string[];
  dependencies: string[];
  escalationContexts: string[];
  mapOptimalConditions?: string[];
  mapReducers?: string[];
  mapEscalationReducers?: string[];
}

export interface MetaForm {
  date: string;
  time: string;
  place: string;
  initials: string;
  lead: string;
  present: string;
}

export interface SimpleFormData {
  stateBefore: string;
  antecedents: string;
  signals: string;
  interventions: string;
  behavior: string;
  helped: string;
  notes: string;
  predictability: string;
  recoveryTime: string;
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
  bodyState: string[];
  bodyStateOther: string;
  sensoryIntensity: string[];
  sensoryIntensityOther: string;
  antecedents: string[];
  factDescription: string;
  expectations: string[];
  expectationOther: string;
  influence: string;
  noInfluence: string;
  predictabilityWhat: string;
  predictabilityDuration: string;
  predictabilityChoice: string;
  signalsAppeared: string;
  activationSignals: string[];
  activationSignalsOther: string;
  shutdownSignals: string[];
  shutdownSignalsOther: string;
  sensorySignals: string[];
  sensorySignalsOther: string;
  timeToEscalation: string;
  firstSignal: string;
  maskingContinued: string;
  maskingStrategies: string[];
  maskingStrategiesOther: string;
  maskingDuration: string;
  predicts: string;
  phase: string;
  interventions: string[];
  interventionDetails: string;
  unconditional: string;
  usedRegulator: string;
  reducedTension: string;
  earlierWhat: string;
  behavior: string;
  intensity: string;
  harms: string[];
  after: string[];
  afterOther: string;
  escalationDuration: string;
  calmTime: string;
  cognitiveRecoveryTime: string;
  physicalThisWeek: string;
  physicalCount: string;
  lowerThreshold: string;
  physicalNote: string;
  helped: string;
  endedBy: string[];
  endedByOther: string;
  worsened: string;
  recoverySupports: string[];
  recoverySupportsOther: string;
}

export interface MapRow {
  place: string;
  time: string;
  activity: string;
}

export interface EnvironmentMapFormData {
  preferredPlaces: string[];
  preferredPlacesOther: string;
  preferredReason: string;
  avoidedPlaces: string[];
  avoidedPlacesOther: string;
  avoidedReason: string;
  likes: string;
  activityRoles: string[];
  easiestWhen: string[];
  easiestWhenOther: string;
  cooperatesWith: string;
  reducers: string[];
  reducersOther: string;
  energySources: string;
  dependsOn: string[];
  dependsDescription: string;
  safeBase: string;
  escalationContexts: string[];
  escalationOther: string;
  escalationReducers: string[];
  escalationReducersOther: string;
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
