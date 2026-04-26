<script setup>
defineProps({
  env: { type: Object, required: true },
  form: { type: Object, required: true },
  sendEmail: { type: Function, required: true },
  resetSimple: { type: Function, required: true }
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
          <label class="field"><span class="field-label">Data</span><input class="text-input" type="date" v-model="form.meta.date" /></label>
          <label class="field"><span class="field-label">Godzina</span><input class="text-input" type="time" v-model="form.meta.time" /></label>
          <label class="field"><span class="field-label">Miejsce</span><input class="text-input" v-model="form.meta.place" /></label>
          <label class="field"><span class="field-label">{{ env.lead }}</span><input class="text-input" v-model="form.meta.lead" /></label>
          <label class="field full"><span class="field-label">Inne osoby obecne</span><input class="text-input" v-model="form.meta.present" /></label>
        </div>
      </section>

      <section class="section">
        <h3>Opis sytuacji</h3>
        <div class="field-grid">
          <label class="field full"><span class="field-label">Krótki opis sytuacji</span><textarea class="text-area" v-model="form.simple.factDescription"></textarea></label>
          <label class="field full"><span class="field-label">Co wydarzyło się tuż przed?</span><textarea class="text-area" v-model="form.simple.antecedents"></textarea></label>
          <label class="field full"><span class="field-label">Jakie były pierwsze sygnały?</span><textarea class="text-area" v-model="form.simple.signals"></textarea></label>
          <label class="field full"><span class="field-label">Co zrobiono?</span><textarea class="text-area" v-model="form.simple.interventions"></textarea></label>
          <label class="field full"><span class="field-label">Opis zachowania</span><textarea class="text-area" v-model="form.simple.behavior"></textarea></label>
          <label class="field full"><span class="field-label">Co pomogło?</span><textarea class="text-area" v-model="form.simple.helped"></textarea></label>
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
