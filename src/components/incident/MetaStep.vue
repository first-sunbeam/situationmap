<script setup>
import { useFormState } from "../../composables/useFormState";
import { formLabels } from "../../config/formLabels";

const { env, form, fieldErrors } = useFormState();
</script>

<template>
  <section class="section">
    <h3>{{ formLabels.meta.section }} <span class="required-mark">*</span></h3>
    <div class="field-grid">
      <label class="field"><span class="field-label">{{ formLabels.meta.date }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['meta.date'] }" type="date" v-model="form.meta.date" /><span v-if="fieldErrors['meta.date']" class="field-error">{{ fieldErrors['meta.date'] }}</span></label>
      <label class="field"><span class="field-label">{{ formLabels.meta.time }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['meta.time'] }" type="time" v-model="form.meta.time" /><span v-if="fieldErrors['meta.time']" class="field-error">{{ fieldErrors['meta.time'] }}</span></label>
      <label class="field"><span class="field-label">{{ formLabels.meta.place }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['meta.place'] }" v-model="form.meta.place" /><span v-if="fieldErrors['meta.place']" class="field-error">{{ fieldErrors['meta.place'] }}</span></label>
      <label class="field"><span class="field-label">{{ env.lead }} <span class="required-mark">*</span></span><input class="text-input" :class="{ invalid: fieldErrors['meta.lead'] }" v-model="form.meta.lead" /><span v-if="fieldErrors['meta.lead']" class="field-error">{{ fieldErrors['meta.lead'] }}</span></label>
      <label class="field full"><span class="field-label">{{ formLabels.meta.present }}</span><input class="text-input" v-model="form.meta.present" /></label>
    </div>
  </section>
</template>
