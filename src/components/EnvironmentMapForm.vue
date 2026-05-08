<script setup lang="ts">
import { computed } from "vue";
import { useFormState } from "../composables/useFormState";
import { formLabels } from "../config/formLabels";
import ChoiceGroupField from "./form/ChoiceGroupField.vue";
import InputField from "./form/InputField.vue";
import SelectField from "./form/SelectField.vue";
import TextAreaField from "./form/TextAreaField.vue";
import MetaFields from "./form/MetaFields.vue";

function hasOther(selected: string[] = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

const {
  env,
  form,
  buildPdf,
  resetMap,
  fieldErrors,
  activityRoleOptions,
  escalationReducerOptions,
  optimalConditionOptions,
  reducerOptions,
  yesNoUnknown
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
  "map.escalationContexts"
];

const hasMapSectionError = computed(() => mapSectionErrorKeys.some((key) => fieldErrors.value[key]));
const placeOptions = computed(() => env.value.places);
const conditionOptions = computed(() => env.value.mapOptimalConditions || optimalConditionOptions);
const tensionReducerOptions = computed(() => env.value.mapReducers || reducerOptions);
const riskReducerOptions = computed(() => env.value.mapEscalationReducers || escalationReducerOptions);
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>{{ env.mapTitle }}</h2>
        <p>Mapa opisuje miejsca, aktywności, warunki regulacji i sytuacje zwiększające ryzyko eskalacji.</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetMap">↺ Wyczyść formularz</button>
        <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
      </div>
    </div>

    <div class="sections">
      <section class="section">
        <h3>Dane podstawowe <span class="required-mark">*</span></h3>
        <MetaFields :env="env" :form="form" :field-errors="fieldErrors" />
      </section>

      <section class="section" :class="{ invalidSection: hasMapSectionError }">
        <h3>1. Miejsca i preferowane przestrzenie</h3>
        <div class="field-grid">
          <ChoiceGroupField v-model="form.map.preferredPlaces" label="W jakich miejscach dziecko/uczeń najchętniej przebywa?" :options="placeOptions" :error="fieldErrors['map.preferredPlaces']" grouped required>
            <InputField v-if="hasOther(form.map.preferredPlaces, form.map.preferredPlacesOther)" v-model="form.map.preferredPlacesOther" label="Inne miejsce" full />
          </ChoiceGroupField>
          <TextAreaField v-model="form.map.preferredReason" label="Dlaczego te miejsca? Co je wyróżnia?" hint="Np. cisza, samotność, przewidywalność, ulubione przedmioty, dostęp do bliskiej osoby, możliwość kontrolowania bodźców (światło, dźwięk)." :error="fieldErrors['map.preferredReason']" required />

          <ChoiceGroupField v-model="form.map.avoidedPlaces" label="Z jakich miejsc dziecko/uczeń unika lub wychodzi z trudem?" :options="placeOptions" :error="fieldErrors['map.avoidedPlaces']" grouped required>
            <InputField v-if="hasOther(form.map.avoidedPlaces, form.map.avoidedPlacesOther)" v-model="form.map.avoidedPlacesOther" label="Inne miejsce" full />
          </ChoiceGroupField>
          <TextAreaField v-model="form.map.avoidedReason" label="Co w tych miejscach aktywuje napięcie?" hint="Np. hałas, tłok, brak kontroli nad bodźcami, nieprzewidywalność, narzucone wymagania, obecność innych osób." :error="fieldErrors['map.avoidedReason']" required />
        </div>
      </section>

      <section class="section">
        <h3>2. Preferowane aktywności i rola</h3>
        <div class="field-grid">
          <TextAreaField v-model="form.map.likes" label="W jakie aktywności dziecko/uczeń najchętniej się angażuje?" hint="Np. samodzielna zabawa, ekran, ruch (huśtawka, trampolina), tworzenie, czytanie, kontakt z bliską osobą, rutyny." :error="fieldErrors['map.likes']" required />
          <ChoiceGroupField v-model="form.map.activityRoles" label="Jaka rola w tych aktywnościach?" :options="activityRoleOptions" hint="W PDA preferowana rola to często prowadzący — dziecko funkcjonuje najlepiej, gdy ma kontrolę nad przebiegiem aktywności." grouped />
        </div>
      </section>

      <section class="section">
        <h3>3. Warunki optymalnego funkcjonowania</h3>
        <div class="field-grid">
          <ChoiceGroupField v-model="form.map.easiestWhen" label="Dziecko/uczeń najłatwiej funkcjonuje, gdy:" :options="conditionOptions" :error="fieldErrors['map.easiestWhen']" grouped required>
            <TextAreaField v-if="hasOther(form.map.easiestWhen, form.map.easiestWhenOther)" v-model="form.map.easiestWhenOther" label="Inne warunki" />
          </ChoiceGroupField>
        </div>
      </section>

      <section class="section">
        <h3>4. Co wspiera i co obniża napięcie</h3>
        <div class="field-grid">
          <TextAreaField v-model="form.map.cooperatesWith" label="Dziecko/uczeń najłatwiej współpracuje z:" hint="Np. mama, tata, rodzeństwo, konkretna osoba — opisz, co wyróżnia tę osobę." :error="fieldErrors['map.cooperatesWith']" required />
          <ChoiceGroupField v-model="form.map.reducers" label="Co OBNIŻA napięcie (reguluje w momencie dyskomfortu)?" :options="tensionReducerOptions" :error="fieldErrors['map.reducers']" grouped required>
            <TextAreaField v-if="hasOther(form.map.reducers, form.map.reducersOther)" v-model="form.map.reducersOther" label="Inne" />
          </ChoiceGroupField>
          <TextAreaField v-model="form.map.energySources" label="Co DAJE energię / motywuje do funkcjonowania mimo przeciążenia?" hint="Np. silne zainteresowanie, ulubiona osoba, satysfakcja z dokończenia, jasny koniec aktywności. W PDA to pokazuje koszt maskowania, a nie brak trudności." />
        </div>
      </section>

      <section class="section">
        <h3>5. Czynniki zmieniające zachowanie</h3>
        <div class="field-grid">
          <ChoiceGroupField v-model="form.map.dependsOn" :label="formLabels.map.dependsOn" :options="env.dependencies" grouped />
          <TextAreaField v-model="form.map.dependsDescription" label="Jak zmienia się zachowanie?" :required="Boolean(form.map.dependsOn.length)" :error="fieldErrors['map.dependsDescription']" />
        </div>
      </section>

      <section class="section">
        <h3>6. Bezpieczne przestrzenie i osoby</h3>
        <p class="section-hint">Teoria poliwagalna: układ nerwowy potrzebuje „bezpiecznej bazy” — miejsca/osoby, które aktywują tryb zaangażowania społecznego, nie tryb zagrożenia.</p>
        <TextAreaField v-model="form.map.safeBase" label="Gdzie/z kim dziecko/uczeń czuje się najbezpieczniej?" />
      </section>

      <section class="section">
        <h3>7. Najczęstsze sytuacje eskalacji</h3>
        <div class="field-grid">
          <ChoiceGroupField v-model="form.map.escalationContexts" :label="formLabels.map.escalationContexts" :options="env.escalationContexts" :error="fieldErrors['map.escalationContexts']" grouped required>
            <InputField v-if="hasOther(form.map.escalationContexts, form.map.escalationOther)" v-model="form.map.escalationOther" :label="formLabels.map.escalationOther" required :error="fieldErrors['map.escalationOther']" full />
          </ChoiceGroupField>
          <ChoiceGroupField v-model="form.map.escalationReducers" label="Co ZMNIEJSZA ryzyko eskalacji w tych sytuacjach?" :options="riskReducerOptions" hint="W PDA przewidywalność i autonomia zmniejszają aktywację układu zagrożenia." grouped>
            <TextAreaField v-if="hasOther(form.map.escalationReducers, form.map.escalationReducersOther)" v-model="form.map.escalationReducersOther" label="Inne" />
          </ChoiceGroupField>
          <SelectField v-model="form.map.noAggression" :label="formLabels.map.noAggression" :options="yesNoUnknown" />
          <TextAreaField v-model="form.map.noAggressionWhere" label="Jakie to sytuacje i co je wyróżnia?" hint="Sytuacje bez eskalacji pokazują, jakie warunki wspierają regulację. To klucz do projektowania wsparcia." :required="form.map.noAggression === 'Tak'" :error="fieldErrors['map.noAggressionWhere']" />
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="buildPdf('open')">↗ Podgląd</button>
      <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
    </div>
  </section>
</template>
