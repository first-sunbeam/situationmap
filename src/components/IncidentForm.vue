<script setup>
function hasOther(selected = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

defineProps({
  env: { type: Object, required: true },
  form: { type: Object, required: true },
  tensionLevels: { type: Array, required: true },
  yesNoUnknown: { type: Array, required: true },
  yesNoPartial: { type: Array, required: true },
  regulationPhase: { type: Array, required: true },
  intensity: { type: Array, required: true },
  calmTime: { type: Array, required: true },
  commonSignals: { type: Array, required: true },
  toggle: { type: Function, required: true },
  buildPdf: { type: Function, required: true },
  resetIncident: { type: Function, required: true },
  fieldErrors: { type: Object, required: true }
});
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>{{ env.incidentTitle }}</h2>
        <p>Przy opisie sytuacji warto zapisać fakty, oznaki przeciążenia, warunki środowiskowe i działania poprzedzające eskalację.</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetIncident">↺ Wyczyść formularz</button>
        <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
      </div>
    </div>

    <div class="sections">
      <section class="section">
        <h3>Dane podstawowe</h3>
        <div class="field-grid">
          <label class="field"><span class="field-label">Data</span><input class="text-input" :class="{ invalid: fieldErrors['meta.date'] }" type="date" v-model="form.meta.date" /><span v-if="fieldErrors['meta.date']" class="field-error">{{ fieldErrors['meta.date'] }}</span></label>
          <label class="field"><span class="field-label">Godzina</span><input class="text-input" :class="{ invalid: fieldErrors['meta.time'] }" type="time" v-model="form.meta.time" /><span v-if="fieldErrors['meta.time']" class="field-error">{{ fieldErrors['meta.time'] }}</span></label>
          <label class="field"><span class="field-label">Miejsce</span><input class="text-input" :class="{ invalid: fieldErrors['meta.place'] }" v-model="form.meta.place" /><span v-if="fieldErrors['meta.place']" class="field-error">{{ fieldErrors['meta.place'] }}</span></label>
          <label class="field"><span class="field-label">{{ env.lead }}</span><input class="text-input" :class="{ invalid: fieldErrors['meta.lead'] }" v-model="form.meta.lead" /><span v-if="fieldErrors['meta.lead']" class="field-error">{{ fieldErrors['meta.lead'] }}</span></label>
          <label class="field full"><span class="field-label">Inne osoby obecne</span><input class="text-input" v-model="form.meta.present" /></label>
        </div>
      </section>

      <section class="section">
        <h3>0. Poziom bazowy i kontekst dnia</h3>
        <div class="field-grid">
          <label class="field"><span class="field-label">Poziom napięcia</span><select class="text-input" v-model="form.incident.tension"><option value="">Wybierz</option><option v-for="item in tensionLevels" :key="item">{{ item }}</option></select></label>
          <label class="field"><span class="field-label">Zmęczenie / senność</span><select class="text-input" v-model="form.incident.tired"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="item">{{ item }}</option></select></label>
          <label class="field"><span class="field-label">Sen / odpoczynek w ciągu dnia</span><select class="text-input" v-model="form.incident.slept"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-slept`">{{ item }}</option></select></label>
          <label class="field"><span class="field-label">O której i jak długo?</span><input class="text-input" v-model="form.incident.sleepDetails" /></label>
          <template v-if="env.stayStages">
            <label class="field"><span class="field-label">Etap tygodnia / pobytu</span><select class="text-input" v-model="form.incident.stayStage"><option value="">Wybierz</option><option v-for="item in env.stayStages" :key="item">{{ item }}</option></select></label>
            <label class="field"><span class="field-label">Czy etap był obciążający?</span><select class="text-input" v-model="form.incident.stayStageLoad"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-load`">{{ item }}</option></select></label>
          </template>
          <div class="field full">
            <span class="field-label">Czynniki obciążające</span>
            <div class="choice-grid">
              <label class="choice" v-for="item in env.burdens" :key="item"><input type="checkbox" :checked="form.incident.burdens.includes(item)" @change="toggle(form.incident.burdens, item)" />{{ item }}</label>
            </div>
          </div>
          <label v-if="hasOther(form.incident.burdens, form.incident.burdensOther)" class="field full"><span class="field-label">Jeśli inne, wpisz jakie</span><input class="text-input" v-model="form.incident.burdensOther" /></label>
        </div>
      </section>

      <section class="section">
        <h3>1. Bezpośrednio przed zdarzeniem</h3>
        <div class="field-grid">
          <div class="field full">
            <span class="field-label">Co działo się do 5 minut przed?</span>
            <div class="choice-grid">
              <label class="choice" v-for="item in env.antecedents" :key="item"><input type="checkbox" :checked="form.incident.antecedents.includes(item)" @change="toggle(form.incident.antecedents, item)" />{{ item }}</label>
            </div>
          </div>
          <label class="field full"><span class="field-label">Doprecyzowanie</span><input class="text-input" v-model="form.incident.antecedentsDetails" /></label>
          <label class="field full"><span class="field-label">Krótki opis sytuacji (fakty, bez interpretacji)</span><textarea class="text-area" :class="{ invalid: fieldErrors['incident.factDescription'] }" v-model="form.incident.factDescription"></textarea><span v-if="fieldErrors['incident.factDescription']" class="field-error">{{ fieldErrors['incident.factDescription'] }}</span></label>
        </div>
      </section>

      <section class="section">
        <h3>2. Oczekiwania w tym momencie</h3>
        <div class="choice-grid">
          <label class="choice" v-for="item in env.expectations" :key="item"><input type="checkbox" :checked="form.incident.expectations.includes(item)" @change="toggle(form.incident.expectations, item)" />{{ item }}</label>
        </div>
        <label v-if="hasOther(form.incident.expectations, form.incident.expectationOther)" class="field full"><span class="field-label">Jeśli inne, wpisz jakie</span><input class="text-input" v-model="form.incident.expectationOther" /></label>
      </section>

      <section class="section">
        <h3>3. Sygnały zmiany stanu</h3>
        <div class="field-grid">
          <label class="field"><span class="field-label">Czy pojawiły się sygnały?</span><select class="text-input" v-model="form.incident.signalsAppeared"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-signals`">{{ item }}</option></select></label>
          <label class="field"><span class="field-label">Czas do eskalacji</span><input class="text-input" v-model="form.incident.timeToEscalation" /></label>
          <div class="field full">
            <span class="field-label">Jakie sygnały?</span>
            <div class="choice-grid">
              <label class="choice" v-for="item in commonSignals" :key="item"><input type="checkbox" :checked="form.incident.signals.includes(item)" @change="toggle(form.incident.signals, item)" />{{ item }}</label>
            </div>
          </div>
          <label class="field"><span class="field-label">Co zwykle pojawia się najpierw?</span><input class="text-input" v-model="form.incident.firstSignal" /></label>
          <label class="field"><span class="field-label">Czy zapowiada trudniejsze zachowanie?</span><select class="text-input" v-model="form.incident.predicts"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-predicts`">{{ item }}</option></select></label>
          <label v-if="hasOther(form.incident.signals, form.incident.signalsOther)" class="field full"><span class="field-label">Jeśli inne, wpisz jakie</span><input class="text-input" v-model="form.incident.signalsOther" /></label>
        </div>
      </section>

      <section class="section">
        <h3>3A. Faza regulacyjna i 4. Działania</h3>
        <div class="field-grid">
          <label class="field full"><span class="field-label">Faza regulacyjna</span><select class="text-input" v-model="form.incident.phase"><option value="">Wybierz</option><option v-for="item in regulationPhase" :key="item">{{ item }}</option></select></label>
          <div class="field full">
            <span class="field-label">Działania podjęte przed eskalacją</span>
            <div class="choice-grid">
              <label class="choice" v-for="item in env.interventions" :key="item"><input type="checkbox" :checked="form.incident.interventions.includes(item)" @change="toggle(form.incident.interventions, item)" />{{ item }}</label>
            </div>
          </div>
          <label v-if="hasOther(form.incident.interventions, form.incident.interventionDetails)" class="field full"><span class="field-label">Jeśli inne, wpisz jakie</span><input class="text-input" v-model="form.incident.interventionDetails" /></label>
          <label class="field"><span class="field-label">Dostępne bez warunku?</span><select class="text-input" v-model="form.incident.unconditional"><option value="">Wybierz</option><option>Tak</option><option>Nie</option><option>Częściowo</option><option>Nie wiem</option></select></label>
          <label class="field"><span class="field-label">Czy skorzystał(a)?</span><select class="text-input" v-model="form.incident.usedRegulator"><option value="">Wybierz</option><option v-for="item in yesNoPartial" :key="item">{{ item }}</option></select></label>
          <label class="field"><span class="field-label">Czy obniżyło napięcie?</span><select class="text-input" v-model="form.incident.reducedTension"><option value="">Wybierz</option><option v-for="item in yesNoPartial" :key="`${item}-reduced`">{{ item }}</option></select></label>
          <label class="field"><span class="field-label">Można było zareagować wcześniej?</span><select class="text-input" v-model="form.incident.earlierPossible"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-earlier`">{{ item }}</option></select></label>
          <label class="field full"><span class="field-label">Co było możliwe?</span><input class="text-input" v-model="form.incident.earlierWhat" /></label>
        </div>
      </section>

      <section class="section">
        <h3>5-9. Zachowanie, następstwa i regulacja</h3>
        <div class="field-grid">
          <label class="field full"><span class="field-label">Opis zachowania</span><textarea class="text-area" v-model="form.incident.behavior"></textarea></label>
          <label class="field"><span class="field-label">Intensywność</span><select class="text-input" v-model="form.incident.intensity"><option value="">Wybierz</option><option v-for="item in intensity" :key="item">{{ item }}</option></select></label>
          <label class="field"><span class="field-label">Czas trwania eskalacji</span><input class="text-input" v-model="form.incident.escalationDuration" /></label>
          <div class="field full"><span class="field-label">Czy doszło do</span><div class="choice-grid"><label class="choice" v-for="item in env.harms" :key="item"><input type="checkbox" :checked="form.incident.harms.includes(item)" @change="toggle(form.incident.harms, item)" />{{ item }}</label></div></div>
          <div class="field full"><span class="field-label">Co wydarzyło się po zdarzeniu?</span><div class="choice-grid"><label class="choice" v-for="item in env.after" :key="item"><input type="checkbox" :checked="form.incident.after.includes(item)" @change="toggle(form.incident.after, item)" />{{ item }}</label></div></div>
          <label v-if="hasOther(form.incident.after, form.incident.afterOther)" class="field full"><span class="field-label">Jeśli inne, wpisz jakie</span><input class="text-input" v-model="form.incident.afterOther" /></label>
          <label class="field"><span class="field-label">Czas do pełnego uspokojenia</span><select class="text-input" v-model="form.incident.calmTime"><option value="">Wybierz</option><option v-for="item in calmTime" :key="item">{{ item }}</option></select></label>
          <label class="field"><span class="field-label">Interwencja fizyczna w tym tygodniu?</span><select class="text-input" v-model="form.incident.physicalThisWeek"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-physical`">{{ item }}</option></select></label>
          <label class="field"><span class="field-label">Ile razy?</span><input class="text-input" v-model="form.incident.physicalCount" /></label>
          <label class="field"><span class="field-label">Niższy próg / szybsza reakcja?</span><select class="text-input" v-model="form.incident.lowerThreshold"><option value="">Wybierz</option><option v-for="item in yesNoUnknown" :key="`${item}-threshold`">{{ item }}</option></select></label>
          <label class="field full"><span class="field-label">Notatka o interwencji fizycznej</span><input class="text-input" v-model="form.incident.physicalNote" /></label>
          <label class="field full"><span class="field-label">Co pomogło obniżyć napięcie?</span><textarea class="text-area" v-model="form.incident.helped"></textarea></label>
          <div class="field full"><span class="field-label">Co najprawdopodobniej zakończyło lub obniżyło zachowanie?</span><div class="choice-grid"><label class="choice" v-for="item in env.endedBy" :key="item"><input type="checkbox" :checked="form.incident.endedBy.includes(item)" @change="toggle(form.incident.endedBy, item)" />{{ item }}</label></div></div>
          <label v-if="hasOther(form.incident.endedBy, form.incident.endedByOther)" class="field full"><span class="field-label">Jeśli inne, wpisz jakie</span><input class="text-input" v-model="form.incident.endedByOther" /></label>
          <label class="field full"><span class="field-label">Co mogło nasilić napięcie?</span><textarea class="text-area" v-model="form.incident.worsened"></textarea></label>
          <label class="field full"><span class="field-label">Co obniżało napięcie / pomagało się uspokoić?</span><textarea class="text-area" v-model="form.incident.regulators"></textarea></label>
          <label class="field full"><span class="field-label">Co było zachętą / nagrodą?</span><textarea class="text-area" v-model="form.incident.rewards"></textarea></label>
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="buildPdf('open')">↗ Podgląd</button>
      <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
    </div>
  </section>
</template>
