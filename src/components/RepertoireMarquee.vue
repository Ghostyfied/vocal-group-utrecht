<script setup lang="ts">
import { site } from '../content/site'

const { artists } = site.repertoire
</script>

<template>
  <section class="marquee" aria-label="Repertoire">
    <p class="visually-hidden">Wij zingen onder meer nummers van {{ artists.join(', ') }}.</p>
    <div class="marquee__track" aria-hidden="true">
      <!-- Four identical groups; the track shifts by exactly one group width, so the loop is seamless. -->
      <ul v-for="copy in 4" :key="copy" class="marquee__group">
        <li v-for="artist in artists" :key="artist" class="marquee__item">
          {{ artist }}
          <span class="light" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  padding-block: clamp(1.5rem, 3vw, 2.5rem);
  border-block: 1px solid var(--c-line);
  background: var(--c-bg-sunken);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 38s linear infinite;
}

.marquee:hover .marquee__track {
  animation-play-state: paused;
}

.marquee__group {
  display: flex;
  flex: none;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 3rem);
  padding-right: clamp(1.5rem, 3vw, 3rem);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--c-line-strong);
}

.marquee__item:nth-child(odd) {
  color: var(--c-text);
  -webkit-text-stroke: 0;
}

@keyframes marquee {
  to {
    transform: translateX(-25%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
}
</style>
