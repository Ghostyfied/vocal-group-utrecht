<script setup lang="ts">
import { computed } from 'vue'
import { mailto, site } from '../content/site'
import ArrowIcon from './ArrowIcon.vue'

const { join, vacancy } = site
const variant = computed(() => (vacancy.open ? join.open : join.closed))
</script>

<template>
  <section id="meezingen" class="join">
    <div class="container">
      <div v-reveal class="join__panel on-dark">
        <div class="join__main">
          <p class="eyebrow join__eyebrow"><span class="light" aria-hidden="true" />{{ join.eyebrow }}</p>
          <h2 class="section-title">{{ variant.title }}</h2>
          <p class="join__text">{{ variant.text }}</p>
          <a class="btn btn--light" :href="mailto(join.mailSubject)">
            {{ variant.cta }}
            <ArrowIcon />
          </a>
        </div>

        <div class="join__aside">
          <dl class="facts">
            <div v-for="fact in join.facts" :key="fact.label" class="fact">
              <dt>{{ fact.label }}</dt>
              <dd>{{ fact.value }}</dd>
            </div>
          </dl>
          <p class="join__note">{{ variant.note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.join {
  padding-bottom: var(--section-space);
}

.join__panel {
  position: relative;
  display: grid;
  gap: 2.5rem;
  padding: clamp(1.75rem, 6vw, 5rem);
  border-radius: calc(var(--radius) * 1.5);
  background:
    radial-gradient(60rem 30rem at 100% 0%, rgb(247 200 115 / 0.16), transparent 60%),
    linear-gradient(135deg, #8f1f22 0%, var(--c-burgundy) 55%, #2a0b10 100%);
  overflow: hidden;
}

.join__eyebrow {
  color: rgb(244 236 226 / 0.8);
}

.join__text {
  max-width: 34rem;
  margin-top: 1.5rem;
  font-size: var(--fs-lead);
  line-height: 1.45;
  color: rgb(244 236 226 / 0.88);
}

.join__main .btn {
  margin-top: 2rem;
}

.join__aside {
  display: grid;
  gap: 1.5rem;
  align-content: end;
}

.fact {
  display: grid;
  gap: 0.15rem;
  padding-block: 1rem;
  border-top: 1px solid rgb(244 236 226 / 0.22);
}

.fact dt {
  font-size: var(--fs-small);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(244 236 226 / 0.7);
}

.fact dd {
  font-weight: 500;
}

.join__note {
  padding-top: 1.25rem;
  border-top: 1px solid rgb(244 236 226 / 0.22);
  font-size: 0.95rem;
  color: rgb(244 236 226 / 0.8);
}

@media (min-width: 62rem) {
  .join__panel {
    grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
    gap: clamp(3rem, 6vw, 6rem);
  }
}
</style>
