<script setup lang="ts">
import { computed, ref } from 'vue'
import { site } from '../content/site'
import ArrowIcon from './ArrowIcon.vue'

const { video } = site

// The YouTube player (and its cookies) only loads after the visitor presses play.
const playing = ref(false)

const poster = computed(() => video.poster ?? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`)
const embedUrl = computed(
  () => `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`,
)
</script>

<template>
  <section id="luister" class="section video">
    <div class="container">
      <header class="video__header">
        <div v-reveal>
          <p class="eyebrow"><span class="light" aria-hidden="true" />{{ video.eyebrow }}</p>
          <h2 class="section-title">{{ video.title }}</h2>
        </div>
        <p v-reveal="80" class="lead video__text">{{ video.text }}</p>
      </header>

      <div v-reveal class="player">
        <iframe
          v-if="playing"
          class="player__frame"
          :src="embedUrl"
          :title="`${site.name} — ${video.videoTitle}`"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
        <button v-else class="player__poster" type="button" @click="playing = true">
          <img :src="poster" width="1280" height="720" loading="lazy" decoding="async" alt="" />
          <span class="player__play" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
          <span class="player__label">
            <span class="visually-hidden">Speel video af: </span>
            {{ video.videoTitle }}
          </span>
        </button>
      </div>

      <div class="video__foot">
        <p class="video__note">De video wordt bij het afspelen geladen vanaf YouTube.</p>
        <a class="video__channel" :href="video.channelUrl" target="_blank" rel="noopener">
          {{ video.channelLabel }}
          <ArrowIcon />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video__header {
  display: grid;
  gap: 1.5rem;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.video__text {
  max-width: 30rem;
  color: var(--c-text-muted);
}

.player {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  overflow: hidden;
  background: #0c0909;
  box-shadow: 0 2rem 4rem -2rem rgb(36 20 22 / 0.45);
}

.player__frame,
.player__poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.player__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s var(--ease-out);
}

.player__poster::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgb(12 9 9 / 0.7) 0%, rgb(12 9 9 / 0) 45%);
}

.player__poster:hover img {
  transform: scale(1.03);
}

.player__play {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  display: grid;
  place-items: center;
  width: clamp(4rem, 9vw, 6rem);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--c-accent);
  color: var(--c-on-accent);
  translate: -50% -50%;
  transition:
    scale 0.5s var(--ease-out),
    background-color 0.25s ease;
}

.player__play svg {
  margin-left: 0.2rem;
}

.player__poster:hover .player__play {
  scale: 1.08;
  background: var(--c-accent-hover);
}

.player__label {
  position: absolute;
  left: clamp(1rem, 3vw, 2rem);
  bottom: clamp(0.9rem, 2.5vw, 1.75rem);
  z-index: 1;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.1rem, 2.4vw, 1.75rem);
  letter-spacing: -0.02em;
  color: #f4ece2;
}

.video__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 2rem;
  margin-top: 1rem;
}

.video__note {
  font-size: var(--fs-small);
  color: var(--c-text-muted);
}

.video__channel {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  font-weight: 600;
  transition: color 0.25s ease;
}

.video__channel:hover {
  color: var(--c-accent-bright);
}

.video__channel .arrow {
  transition: transform 0.4s var(--ease-out);
}

.video__channel:hover .arrow {
  transform: translateX(4px);
}

@media (min-width: 48rem) {
  .video__header {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: end;
  }
}
</style>
