<script setup lang="ts">
import { computed } from 'vue'
import { site } from '../content/site'

const { conductor } = site

const initials = computed(() =>
  conductor.name
    .split(' ')
    .map((part) => part[0])
    .join(''),
)
</script>

<template>
  <section id="dirigent" class="section conductor">
    <div class="container conductor__grid">
      <div v-reveal class="portrait">
        <img
          v-if="conductor.photo"
          :src="conductor.photo"
          :alt="`Portret van ${conductor.name}`"
          loading="lazy"
          decoding="async"
        />
        <!-- Shown until a portrait is added in content/site.ts -->
        <div v-else class="portrait__placeholder" aria-hidden="true">
          <span class="portrait__glow" />
          <span class="portrait__initials">{{ initials }}</span>
        </div>
      </div>

      <div class="conductor__text">
        <p v-reveal class="eyebrow"><span class="light" aria-hidden="true" />{{ conductor.eyebrow }}</p>
        <h2 v-reveal="60" class="section-title">{{ conductor.name }}</h2>
        <p v-reveal="120" class="conductor__role">{{ conductor.role }}</p>
        <div v-reveal="180" class="prose conductor__prose">
          <p v-for="paragraph in conductor.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.conductor__grid {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

.portrait {
  width: 100%;
  max-width: 26rem;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--c-bg-raised);
}

.portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portrait__placeholder {
  position: relative;
  display: grid;
  place-items: end start;
  width: 100%;
  height: 100%;
  padding: clamp(1.25rem, 3vw, 2rem);
  background: linear-gradient(160deg, var(--c-burgundy) 0%, #230a0e 55%, #120708 100%);
}

.portrait__glow {
  position: absolute;
  top: 18%;
  right: 16%;
  width: 34%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(255 243 214 / 0.95) 0%, rgb(247 200 115 / 0.55) 22%, rgb(247 200 115 / 0) 70%);
  filter: blur(2px);
}

.portrait__initials {
  position: relative;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(4rem, 12vw, 7rem);
  line-height: 0.85;
  letter-spacing: -0.05em;
  color: rgb(244 236 226 / 0.9);
}

.conductor__role {
  margin-top: 1rem;
  color: var(--c-accent-bright);
  font-weight: 600;
}

.conductor__prose {
  margin-top: 1.75rem;
}

@media (min-width: 48rem) {
  .conductor__grid {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: clamp(3rem, 8vw, 8rem);
  }
}
</style>
