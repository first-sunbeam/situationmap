<script setup lang="ts">
import { computed } from "vue";
import { getAboutPageContent } from "../config/aboutPage";
import { useLanguage } from "../i18n/useLanguage";
import SvgIcon from "./ui/SvgIcon.vue";

const { language } = useLanguage();
const content = computed(() => getAboutPageContent(language.value));
</script>

<template>
  <section class="panel about-page">
    <div class="about-layout">
      <nav class="about-nav" :aria-label="content.navTitle">
        <h2>{{ content.navTitle }}</h2>
        <a
          v-for="section in content.sections"
          :key="section.id"
          :href="`#${section.id}`"
        >
          {{ section.title }}
        </a>
      </nav>

      <div class="about-content">
        <a
          :href="content.pdfLink"
          target="_blank"
          rel="noopener noreferrer"
          download
          class="about-pdf-link"
        >
          <SvgIcon name="pdf" :size="32" />
          {{ content.pdfText }}
        </a>
        <section
          v-for="section in content.sections"
          :id="section.id"
          :key="section.id"
          class="about-section"
        >
          <span v-if="section.badge" class="about-badge">{{
            section.badge
          }}</span>
          <h2>{{ section.title }}</h2>

          <p v-for="paragraph in section.paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
          <p v-if="section.note" class="about-note">{{ section.note }}</p>

          <div v-if="section.cards" class="about-cards">
            <article
              v-for="card in section.cards"
              :key="card.title"
              class="about-card"
            >
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
            </article>
          </div>

          <ul v-if="section.list" class="about-list">
            <li v-for="item in section.list" :key="item">{{ item }}</li>
          </ul>

          <div v-if="section.table" class="about-table-wrap">
            <table class="about-table">
              <thead>
                <tr>
                  <th>{{ language === "en" ? "Section" : "Sekcja" }}</th>
                  <th>
                    {{ language === "en" ? "What it captures" : "Co mierzy" }}
                  </th>
                  <th>
                    {{ language === "en" ? "Why it matters" : "Po co to jest" }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in section.table" :key="row.section">
                  <td>{{ row.section }}</td>
                  <td>{{ row.measures }}</td>
                  <td>{{ row.purpose }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
