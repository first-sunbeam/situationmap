<script setup lang="ts">
import { computed } from "vue";
import { useFormState } from "../composables/useFormState";
import { hasOther } from "../lib/formUtils";
import { getSubjectInline } from "../lib/subject";
import ChoiceGroupField from "./form/ChoiceGroupField.vue";
import InputField from "./form/InputField.vue";
import SelectField from "./form/SelectField.vue";
import TextAreaField from "./form/TextAreaField.vue";
import MetaFields from "./form/MetaFields.vue";
import SvgIcon from "./ui/SvgIcon.vue";

const {
  labels,
  env,
  envMapTitle,
  envLead,
  form,
  buildPdf,
  resetMap,
  fieldErrors,
  activityRoleOptions,
  escalationReducerOptions,
  optimalConditionOptions,
  reducerOptions,
  yesNoUnknown,
} = useFormState();

const mapSectionErrorKeys = [
  "map.preferredPlaces",
  "map.preferredReason",
  "map.avoidedPlaces",
  "map.avoidedReason",
  "map.likes",
  "map.easiestWhen",
  "map.cooperatesWith",
  "map.reducers",
  "map.escalationContexts",
];

const hasMapSectionError = computed(() =>
  mapSectionErrorKeys.some((key) => fieldErrors.value[key]),
);
const placeOptions = computed(() => env.value.places);
const conditionOptions = computed(
  () => env.value.mapOptimalConditions || optimalConditionOptions,
);
const tensionReducerOptions = computed(
  () => env.value.mapReducers || reducerOptions,
);
const riskReducerOptions = computed(
  () => env.value.mapEscalationReducers || escalationReducerOptions,
);
const subject = computed(() =>
  getSubjectInline(
    form.value,
    labels.value.map.section === "Environment map" ? "the person" : "osoba",
  ),
);

const subjectStart = computed(() =>
  getSubjectInline(
    form.value,
    labels.value.map.section === "Environment map" ? "The person" : "Osoba",
  ),
);


</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>{{ envMapTitle }}</h2>
        <p>{{ labels.ui.mapIntro }}</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetMap">
          <SvgIcon name="reset" /> {{ labels.ui.resetForm }}
        </button>
        <button class="primary-button" @click="buildPdf('download')">
          <SvgIcon name="download" /> {{ labels.ui.downloadPdf }}
        </button>
      </div>
    </div>

    <div class="sections">
      <section class="section">
        <h3>{{ labels.meta.section }} <span class="required-mark">*</span></h3>
        <MetaFields :env="env" :form="form" :field-errors="fieldErrors" :lead-label="envLead" />
      </section>

      <section class="section" :class="{ invalidSection: hasMapSectionError }">
        <h3>{{ labels.export.mapSectionPlaces }}</h3>
        <div class="field-grid">
          <ChoiceGroupField
            v-model="form.map.preferredPlaces"
            :label="`${labels.ui.preferredPlacesFor} ${subject} ${labels.ui.preferredPlacesSuffix}`"
            :options="placeOptions"
            :error="fieldErrors['map.preferredPlaces']"
            grouped
            required
          >
            <InputField
              v-if="
                hasOther(
                  form.map.preferredPlaces,
                  form.map.preferredPlacesOther,
                )
              "
              v-model="form.map.preferredPlacesOther"
              :label="labels.ui.otherPlace"
              full
            />
          </ChoiceGroupField>
          <TextAreaField
            v-model="form.map.preferredReason"
            :label="labels.ui.preferredReason"
            :hint="labels.ui.preferredReasonHint"
            :error="fieldErrors['map.preferredReason']"
            required
          />

          <ChoiceGroupField
            v-model="form.map.avoidedPlaces"
            :label="`${labels.ui.avoidedPlacesFor} ${subject} ${labels.ui.avoidedPlacesSuffix}`"
            :options="placeOptions"
            :error="fieldErrors['map.avoidedPlaces']"
            grouped
            required
          >
            <InputField
              v-if="
                hasOther(form.map.avoidedPlaces, form.map.avoidedPlacesOther)
              "
              v-model="form.map.avoidedPlacesOther"
              :label="labels.ui.otherPlace"
              full
            />
          </ChoiceGroupField>
          <TextAreaField
            v-model="form.map.avoidedReason"
            :label="labels.ui.avoidedReason"
            :hint="labels.ui.avoidedReasonHint"
            :error="fieldErrors['map.avoidedReason']"
            required
          />
        </div>
      </section>

      <section class="section">
        <h3>{{ labels.ui.mapActivitiesTitle }}</h3>
        <div class="field-grid">
          <TextAreaField
            v-model="form.map.likes"
            :label="`${labels.ui.likesFor} ${subject} ${labels.ui.likesSuffix}`"
            :hint="labels.ui.likesHint"
            :error="fieldErrors['map.likes']"
            required
          />
          <ChoiceGroupField
            v-model="form.map.activityRoles"
            :label="`${labels.ui.activityRoleFor} ${subject} ${labels.ui.activityRoleSuffix}`"
            :options="activityRoleOptions"
            :hint="labels.ui.activityRoleHint"
            grouped
          />
        </div>
      </section>

      <section class="section">
        <h3>{{ labels.export.mapSectionConditions }}</h3>
        <div class="field-grid">
          <ChoiceGroupField
            v-model="form.map.easiestWhen"
            :label="`${subjectStart} ${labels.ui.easiestWhenSuffix}`"
            :options="conditionOptions"
            :error="fieldErrors['map.easiestWhen']"
            grouped
            required
          >
            <TextAreaField
              v-if="hasOther(form.map.easiestWhen, form.map.easiestWhenOther)"
              v-model="form.map.easiestWhenOther"
              label="Inne warunki"
            />
          </ChoiceGroupField>
        </div>
      </section>

      <section class="section">
        <h3>{{ labels.ui.mapSupportTitle }}</h3>
        <div class="field-grid">
          <TextAreaField
            v-model="form.map.cooperatesWith"
            :label="`${subjectStart} ${labels.ui.cooperatesWithSuffix}`"
            :hint="labels.ui.cooperatesWithHint"
            :error="fieldErrors['map.cooperatesWith']"
            required
          />
          <ChoiceGroupField
            v-model="form.map.reducers"
            :label="labels.ui.reducersLabel"
            :options="tensionReducerOptions"
            :error="fieldErrors['map.reducers']"
            grouped
            required
          >
            <TextAreaField
              v-if="hasOther(form.map.reducers, form.map.reducersOther)"
              v-model="form.map.reducersOther"
              label="Inne"
            />
          </ChoiceGroupField>
          <TextAreaField
            v-model="form.map.energySources"
            :label="labels.ui.energySourcesLabel"
            :hint="labels.ui.energySourcesHint"
          />
        </div>
      </section>

      <section class="section">
        <h3>{{ labels.ui.mapDependsTitle }}</h3>
        <div class="field-grid">
          <ChoiceGroupField
            v-model="form.map.dependsOn"
            :label="labels.map.dependsOn"
            :options="env.dependencies"
            grouped
          />
          <TextAreaField
            v-model="form.map.dependsDescription"
            :label="labels.ui.behaviorChangeLabel"
            :required="Boolean(form.map.dependsOn.length)"
            :error="fieldErrors['map.dependsDescription']"
          />
        </div>
      </section>

      <section class="section">
        <h3>{{ labels.export.mapSectionSafe }}</h3>
        <p class="section-hint">{{ labels.ui.safeBaseHint }}</p>
        <TextAreaField
          v-model="form.map.safeBase"
          :label="`${labels.ui.safeBaseFor} ${subject} ${labels.ui.safeBaseSuffix}`"
        />
      </section>

      <section class="section">
        <h3>{{ labels.ui.mapEscalationTitle }}</h3>
        <div class="field-grid">
          <ChoiceGroupField
            v-model="form.map.escalationContexts"
            :label="labels.map.escalationContexts"
            :options="env.escalationContexts"
            :error="fieldErrors['map.escalationContexts']"
            grouped
            required
          >
            <InputField
              v-if="
                hasOther(form.map.escalationContexts, form.map.escalationOther)
              "
              v-model="form.map.escalationOther"
              :label="labels.map.escalationOther"
              required
              :error="fieldErrors['map.escalationOther']"
              full
            />
          </ChoiceGroupField>
          <ChoiceGroupField
            v-model="form.map.escalationReducers"
            :label="labels.ui.escalationReducersLabel"
            :options="riskReducerOptions"
            :hint="labels.ui.escalationReducersHint"
            grouped
          >
            <TextAreaField
              v-if="
                hasOther(
                  form.map.escalationReducers,
                  form.map.escalationReducersOther,
                )
              "
              v-model="form.map.escalationReducersOther"
              label="Inne"
            />
          </ChoiceGroupField>
          <SelectField
            v-model="form.map.noAggression"
            :label="labels.map.noAggression"
            :options="yesNoUnknown"
          />
          <TextAreaField
            v-model="form.map.noAggressionWhere"
            :label="labels.ui.noAggressionWhereLabel"
            :hint="labels.ui.noAggressionWhereHint"
            :required="form.map.noAggression === 'Tak'"
            :error="fieldErrors['map.noAggressionWhere']"
          />
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="buildPdf('open')">
        <SvgIcon name="external" /> {{ labels.ui.preview }}
      </button>
      <button class="primary-button" @click="buildPdf('download')">
        <SvgIcon name="download" /> {{ labels.ui.downloadPdf }}
      </button>
    </div>
  </section>
</template>
