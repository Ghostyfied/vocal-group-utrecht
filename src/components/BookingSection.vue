<script setup lang="ts">
import { mailto, site } from '../content/site'
import ArrowIcon from './ArrowIcon.vue'

const { booking } = site
</script>

<template>
  <section id="boeken" class="section booking">
    <div class="container">
      <div class="booking__intro">
        <div v-reveal>
          <p class="eyebrow"><span class="light" aria-hidden="true" />{{ booking.eyebrow }}</p>
          <h2 class="section-title">{{ booking.title }}</h2>
        </div>
        <div v-reveal="80" class="booking__text">
          <p class="prose">{{ booking.text }}</p>
          <a class="btn btn--primary" :href="mailto(booking.mailSubject)">
            {{ booking.cta }}
            <ArrowIcon />
          </a>
        </div>
      </div>

      <ul class="occasions">
        <li
          v-for="(occasion, index) in booking.occasions"
          :key="occasion.title"
          v-reveal="index * 90"
          class="occasion"
        >
          <span class="occasion__number" aria-hidden="true">0{{ index + 1 }}</span>
          <h3 class="occasion__title">{{ occasion.title }}</h3>
          <p class="occasion__text">{{ occasion.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.booking__intro {
  display: grid;
  gap: 2rem;
}

.booking__text {
  display: grid;
  justify-items: start;
  gap: 1.75rem;
}

.occasions {
  display: grid;
  gap: 1rem;
  margin-top: clamp(3rem, 6vw, 5rem);
}

.occasion {
  display: flex;
  flex-direction: column;
  min-height: 12rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border: 1px solid var(--c-line);
  border-radius: var(--radius);
  background: var(--c-bg-raised);
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    transform 0.6s var(--ease-out);
}

.occasion:hover {
  border-color: var(--c-accent);
  background: var(--c-burgundy);
  transform: translateY(-4px);
}

.occasion__number {
  font-size: var(--fs-small);
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--c-accent-bright);
  transition: color 0.3s ease;
}

.occasion:hover .occasion__number {
  color: var(--c-glow);
}

.occasion__title {
  margin-top: auto;
  padding-top: 2.5rem;
  font-size: clamp(1.6rem, 2.8vw, 2.25rem);
}

.occasion__text {
  margin-top: 0.6rem;
  color: var(--c-text-muted);
}

@media (min-width: 48rem) {
  .occasions {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 62rem) {
  .booking__intro {
    grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
    gap: clamp(3rem, 7vw, 7rem);
    align-items: end;
  }
}
</style>
