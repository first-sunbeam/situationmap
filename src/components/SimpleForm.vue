<script setup>
defineProps({
  env: { type: Object, required: true },
  form: { type: Object, required: true },
  sendEmail: { type: Function, required: true },
  resetSimple: { type: Function, required: true },
  fieldErrors: { type: Object, required: true }
});
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>Formularz prosty - {{ env.label }}</h2>
        <p>Krótka wersja do szybkiego zgłoszenia sytuacji. Po kliknięciu „Wyślij” otworzy się wiadomość e-mail z wpisanymi odpowiedziami.</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetSimple">↺ Wyczyść formularz</button>
        <button class="primary-button" @click="sendEmail">✉ Wyślij</button>
      </div>
    </div>

    <div class="sections">
      <section class="section">
        <h3>Dane podstawowe</h3>
        <div class="field-grid">
          <label class="field"><span class="field-label">Data <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['meta.date'] }" type="date" v-model="form.meta.date" /><span v-if="fieldErrors['meta.date']" class="field-error">{{ fieldErrors['meta.date'] }}</span></label>
          <label class="field"><span class="field-label">Godzina <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['meta.time'] }" type="time" v-model="form.meta.time" /><span v-if="fieldErrors['meta.time']" class="field-error">{{ fieldErrors['meta.time'] }}</span></label>
          <label class="field"><span class="field-label">Miejsce <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['meta.place'] }" v-model="form.meta.place" /><span v-if="fieldErrors['meta.place']" class="field-error">{{ fieldErrors['meta.place'] }}</span></label>
          <label class="field"><span class="field-label">{{ env.lead }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['meta.lead'] }" v-model="form.meta.lead" /><span v-if="fieldErrors['meta.lead']" class="field-error">{{ fieldErrors['meta.lead'] }}</span></label>
          <label class="field full"><span class="field-label">Inne osoby obecne</span><input class="text-input" v-model="form.meta.present" /></label>
        </div>
      </section>

      <section class="section">
        <h3>Opis sytuacji</h3>
        <div class="field-grid">
          <label class="field full"><span class="field-label">Krótki opis sytuacji <span class="required-mark">*</span></span><span class="field-hint">Krótko, fakty bez interpretacji.</span><textarea class="text-area" :class="{ invalid: fieldErrors['simple.factDescription'] }" v-model="form.simple.factDescription"></textarea><span v-if="fieldErrors['simple.factDescription']" class="field-error">{{ fieldErrors['simple.factDescription'] }}</span></label>
          <label class="field full"><span class="field-label">Co wydarzyło się tuż przed?</span><span class="field-hint">Np. zmiana planu, hałas, oczekiwanie.</span><textarea class="text-area" v-model="form.simple.antecedents"></textarea></label>
          <label class="field full"><span class="field-label">Jakie były pierwsze sygnały?</span><span class="field-hint">Np. milczenie, napięcie ciała, protest.</span><textarea class="text-area" v-model="form.simple.signals"></textarea></label>
          <label class="field full"><span class="field-label">Jak zareagowano na pierwsze sygnały?</span><textarea class="text-area" v-model="form.simple.interventions"></textarea></label>
          <label class="field full"><span class="field-label">Opis zachowania</span><textarea class="text-area" v-model="form.simple.behavior"></textarea></label>
          <label class="field full"><span class="field-label">Co pomogło obniżyć napięcie lub uspokoić sytuację? <span class="required-mark">*</span></span><span class="field-hint">Jeśli nic nie pomogło, wpisz to wprost.</span><textarea class="text-area" :class="{ invalid: fieldErrors['simple.helped'] }" v-model="form.simple.helped"></textarea><span v-if="fieldErrors['simple.helped']" class="field-error">{{ fieldErrors['simple.helped'] }}</span></label>
          <label class="field full"><span class="field-label">Dodatkowe uwagi</span><textarea class="text-area" v-model="form.simple.notes"></textarea></label>
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="resetSimple">↺ Wyczyść</button>
      <button class="primary-button" @click="sendEmail">✉ Wyślij na kontakt@autyzm.poznan.pl</button>
    </div>
  </section>
</template>
