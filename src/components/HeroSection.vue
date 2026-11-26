<script setup lang="ts">
import { site } from '../content/site'
import ArrowIcon from './ArrowIcon.vue'
import hero900 from '../assets/images/stage-solo-900.webp'
import hero1600 from '../assets/images/stage-solo-1600.webp'
import hero2400 from '../assets/images/stage-solo-2400.webp'

const { hero, vacancy } = site
</script>

<template>
  <section id="top" class="hero on-dark">
    <div class="hero__media" aria-hidden="true">
      <img
        :src="hero1600"
        :srcset="`${hero900} 900w, ${hero1600} 1600w, ${hero2400} 2400w`"
        sizes="100vw"
        width="2400"
        height="1350"
        alt=""
        fetchpriority="high"
        decoding="async"
      />
    </div>

    <div class="container hero__content">
      <p class="eyebrow hero__eyebrow">
        <span class="light" aria-hidden="true" />
        {{ site.tagline }}
      </p>

      <h1 class="hero__title">
        <span v-for="(line, index) in hero.titleLines" :key="line" class="hero__line">
          <span :style="{ '--i': index }">{{ line }}</span>
        </span>
      </h1>

      <div class="hero__foot">
        <p class="lead hero__lede">{{ hero.lede }}</p>
        <div class="hero__aside">
          <div class="hero__actions">
            <a class="btn btn--primary" :href="`#${hero.primaryCta.target}`">
              {{ hero.primaryCta.label }}
              <ArrowIcon />
            </a>
            <a class="btn btn--ghost" :href="`#${hero.secondaryCta.target}`">{{ hero.secondaryCta.label }}</a>
          </div>
          <a v-if="vacancy.open" class="callout" href="#meezingen">
            <span class="callout__label">{{ vacancy.label }}</span>
            <span>{{ vacancy.voice }}</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 100vh;
  min-height: 100svh;
  padding-top: calc(var(--header-height) + 2rem);
  padding-bottom: calc(clamp(2rem, 5vw, 4rem) + var(--sheet-radius));
  background: var(--c-bg);
  overflow: hidden;
  isolation: isolate;
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 62% 30%;
  animation: hero-settle 2.8s var(--ease-out) both;
}

/* The photo's black stage melts into the page background. */
.hero__media::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, var(--c-bg) 0%, rgb(12 9 9 / 0.88) 22%, rgb(12 9 9 / 0.25) 55%, rgb(12 9 9 / 0.5) 100%),
    linear-gradient(to right, rgb(12 9 9 / 0.6) 0%, transparent 60%);
}

.hero__content {
  position: relative;
}

.hero__eyebrow {
  color: var(--c-text);
  animation: hero-fade 1s var(--ease-out) 0.15s both;
}

.hero__title {
  margin-top: clamp(1rem, 2vw, 1.75rem);
  font-size: var(--fs-display);
  font-weight: 800;
  line-height: 0.88;
  letter-spacing: -0.045em;
}

.hero__line {
  display: block;
  overflow: hidden;
  /* Room for descenders inside the clipping box. */
  padding-bottom: 0.12em;
  margin-bottom: -0.12em;
}

.hero__line > span {
  display: block;
  animation: hero-rise 1.2s var(--ease-out) both;
  animation-delay: calc(var(--i) * 120ms + 200ms);
}

.hero__foot {
  display: grid;
  gap: 1.75rem;
  margin-top: clamp(1.75rem, 3.5vw, 3rem);
  animation: hero-fade 1.1s var(--ease-out) 0.65s both;
}

.hero__lede {
  max-width: 42rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.35rem, 2.4vw, 2rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hero__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.callout {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 0.7rem;
  padding: 0.55rem 1rem 0.55rem 0.55rem;
  border: 1px solid var(--c-line-strong);
  border-radius: 999px;
  background: rgb(12 9 9 / 0.55);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  font-size: 0.95rem;
  line-height: 1.3;
  transition: border-color 0.25s ease;
}

.callout:hover {
  border-color: var(--c-glow);
}

.callout__label {
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: var(--c-glow);
  color: var(--c-bg);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.callout .arrow {
  transition: transform 0.4s var(--ease-out);
}

.callout:hover .arrow {
  transform: translateX(4px);
}

@keyframes hero-settle {
  from {
    transform: scale(1.08);
    opacity: 0;
  }
}

@keyframes hero-rise {
  from {
    transform: translateY(105%);
  }
}

@keyframes hero-fade {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
}

@media (min-width: 62rem) {
  .hero__foot {
    grid-template-columns: minmax(0, 42rem) auto;
    align-items: end;
    justify-content: space-between;
  }

  .hero__aside {
    flex-direction: column-reverse;
    align-items: flex-end;
  }
}

@media (max-width: 30rem) {
  .hero__eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
  }
}
</style>
