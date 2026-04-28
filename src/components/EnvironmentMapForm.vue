<script setup>
function hasOther(selected = [], value = "") {
  return selected.includes("Inne") || selected.includes("inne") || String(value || "").trim() !== "";
}

defineProps({
  env: { type: Object, required: true },
  form: { type: Object, required: true },
  toggle: { type: Function, required: true },
  buildPdf: { type: Function, required: true },
  resetMap: { type: Function, required: true },
  fieldErrors: { type: Object, required: true }
});
</script>

<template>
  <section class="panel form-panel">
    <div class="form-heading">
      <div>
        <h2>{{ env.mapTitle }}</h2>
        <p>To jest osobny formularz opisujący miejsca, warunki i sytuacje związane z funkcjonowaniem w danym środowisku.</p>
      </div>
      <div class="heading-actions">
        <button class="secondary-button" @click="resetMap">↺ Wyczyść formularz</button>
        <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
      </div>
    </div>

    <div class="sections">
      <section class="section" :class="{ invalidSection: fieldErrors.map }">
        <h3>{{ env.mapTitle }}</h3>
        <p v-if="fieldErrors.map" class="field-error">{{ fieldErrors.map }}</p>
        <div class="matrix">
          <div class="matrix-row matrix-head"><span>Miejsce</span><span>Czas</span><span>Rodzaj aktywności</span></div>
          <div class="matrix-row" v-for="row in form.map.rows" :key="row.place">
            <span class="place-name">{{ row.place }}</span>
            <input class="text-input" v-model="row.time" placeholder="h/dzień" />
            <input class="text-input" v-model="row.activity" />
          </div>
        </div>
        <div class="field-grid" style="margin-top: 16px">
          <label class="field"><span class="field-label">Chętnie przebywa w</span><input class="text-input" v-model="form.map.preferred" /></label>
          <label class="field"><span class="field-label">Unika / wychodzi z trudem z</span><input class="text-input" v-model="form.map.avoided" /></label>
          <label class="field"><span class="field-label">Najchętniej angażuje się w</span><input class="text-input" v-model="form.map.likes" /></label>
          <label class="field"><span class="field-label">Najłatwiej funkcjonuje, gdy</span><input class="text-input" v-model="form.map.easiestWhen" /></label>
          <label class="field"><span class="field-label">Najłatwiej współpracuje z</span><input class="text-input" v-model="form.map.cooperatesWith" /></label>
          <label class="field"><span class="field-label">Co obniża napięcie?</span><input class="text-input" v-model="form.map.reducers" /></label>
          <div class="field full"><span class="field-label">Zachowanie zmienia się w zależności od</span><div class="choice-grid"><label class="choice" v-for="item in env.dependencies" :key="item"><input type="checkbox" :checked="form.map.dependsOn.includes(item)" @change="toggle(form.map.dependsOn, item)" />{{ item }}</label></div></div>
          <label class="field full"><span class="field-label">Opis zależności</span><textarea class="text-area" v-model="form.map.dependsDescription"></textarea></label>
          <div class="field full"><span class="field-label">Najczęstsze sytuacje eskalacji</span><div class="choice-grid"><label class="choice" v-for="item in env.escalationContexts" :key="item"><input type="checkbox" :checked="form.map.escalationContexts.includes(item)" @change="toggle(form.map.escalationContexts, item)" />{{ item }}</label></div></div>
          <label v-if="hasOther(form.map.escalationContexts, form.map.escalationOther)" class="field full"><span class="field-label">Jeśli inne, wpisz jakie</span><input class="text-input" v-model="form.map.escalationOther" /></label>
          <label class="field"><span class="field-label">Czy są sytuacje bez agresji?</span><select class="text-input" v-model="form.map.noAggression"><option value="">Wybierz</option><option>Tak</option><option>Nie</option></select></label>
          <label class="field"><span class="field-label">Jakie?</span><input class="text-input" v-model="form.map.noAggressionWhere" /></label>
        </div>
      </section>
    </div>

    <div class="footer-actions">
      <button class="secondary-button" @click="buildPdf('open')">↗ Podgląd</button>
      <button class="primary-button" @click="buildPdf('download')">↓ Pobierz PDF</button>
    </div>
  </section>
</template>
