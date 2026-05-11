import { describe, expect, it } from "vitest";
import {
  activationSignalOptions,
  activityRoleOptions,
  bodyStateOptions,
  calmTime,
  cognitiveRecoveryOptions,
  environments,
  escalationReducerOptions,
  homePlaceOptions,
  intensity,
  interventionTypeOptions,
  maskingDurationOptions,
  maskingStrategyOptions,
  optimalConditionOptions,
  recoverySupportOptions,
  reducerOptions,
  regulationPhase,
  sensoryIntensityOptions,
  sensorySignalOptions,
  shutdownSignalOptions,
  tensionLevels,
  yesNoPartial,
  yesNoUnknown
} from "../../src/data/environments";
import { translateOption } from "../../src/i18n/options";

function collectOptionValues(): string[] {
  const optionLists: readonly (readonly string[])[] = [
    bodyStateOptions,
    sensoryIntensityOptions,
    activationSignalOptions,
    shutdownSignalOptions,
    sensorySignalOptions,
    interventionTypeOptions,
    maskingStrategyOptions,
    recoverySupportOptions,
    maskingDurationOptions,
    cognitiveRecoveryOptions,
    homePlaceOptions,
    activityRoleOptions,
    optimalConditionOptions,
    reducerOptions,
    escalationReducerOptions,
    yesNoUnknown,
    yesNoPartial,
    tensionLevels,
    regulationPhase,
    intensity,
    calmTime
  ];

  for (const env of Object.values(environments)) {
    optionLists.push(
      env.burdens,
      env.antecedents,
      env.expectations,
      env.harms,
      env.after,
      env.endedBy,
      env.places,
      env.dependencies,
      env.escalationContexts
    );

    if (env.stayStages) optionLists.push(env.stayStages);
    if (env.mapOptimalConditions) optionLists.push(env.mapOptimalConditions);
    if (env.mapReducers) optionLists.push(env.mapReducers);
    if (env.mapEscalationReducers) optionLists.push(env.mapEscalationReducers);
  }

  return [...new Set(optionLists.flat())].sort((a, b) => a.localeCompare(b, "pl"));
}

describe("tłumaczenia opcji formularza", () => {
  it("ma angielskie tłumaczenie dla każdej predefiniowanej opcji", () => {
    const missingTranslations = collectOptionValues().filter((value) => translateOption(value, "en") === value);

    expect(missingTranslations).toEqual([]);
  });
});
