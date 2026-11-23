<script setup lang="ts">
import { site } from '../content/site'
import group720 from '../assets/images/stage-group-720.webp'
import group1200 from '../assets/images/stage-group-1200.webp'
import group1920 from '../assets/images/stage-group-1920.webp'

const { about } = site
</script>

<template>
  <section id="over-ons" class="section about">
    <div class="container">
      <div class="about__grid">
        <div v-reveal class="about__heading">
          <p class="eyebrow"><span class="light" aria-hidden="true" />{{ about.eyebrow }}</p>
          <h2 class="section-title">
            <span v-for="line in about.titleLines" :key="line" class="about__line">{{ line }} </span>
          </h2>
        </div>

        <div class="about__text">
          <p v-reveal class="lead">{{ about.lead }}</p>
          <div v-reveal="80" class="prose about__prose">
            <p v-for="paragraph in about.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </div>
        </div>
      </div>

      <figure v-reveal class="about__figure">
        <img
          :src="group1200"
          :srcset="`${group720} 720w, ${group1200} 1200w, ${group1920} 1920w`"
          sizes="(min-width: 82rem) 82rem, 100vw"
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
          alt="De zangers van Vocal Group Utrecht zingen en bewegen samen op een donker podium, gekleed in rood en bordeaux."
        />
        <figcaption>{{ about.photoCaption }}</figcaption>
      </figure>

      <dl class="stats">
        <div v-for="(stat, index) in about.stats" :key="stat.label" v-reveal="index * 90" class="stat">
          <dd class="stat__value">{{ stat.value }}</dd>
          <dt class="stat__label">{{ stat.label }}</dt>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  gap: 2.5rem;
}

.about__line {
  display: block;
}

.about__prose {
  margin-top: 1.75rem;
}

.about__figure {
  margin-top: clamp(3rem, 7vw, 6rem);
}

.about__figure img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius);
}

.about__figure figcaption {
  margin-top: 0.9rem;
  font-size: var(--fs-small);
  color: var(--c-text-muted);
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 1.5rem;
  margin-top: clamp(3rem, 6vw, 5rem);
  padding-top: clamp(2rem, 4vw, 3rem);
  border-top: 1px solid var(--c-line);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.stat__value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 0.9;
  letter-spacing: -0.04em;
}

.stat__label {
  color: var(--c-text-muted);
  font-size: 0.95rem;
  line-height: 1.35;
  max-width: 12rem;
}

@media (min-width: 40rem) {
  .about__figure img {
    aspect-ratio: 16 / 9;
  }
}

@media (min-width: 62rem) {
  .about__grid {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    gap: clamp(3rem, 7vw, 7rem);
    align-items: start;
  }

  .about__heading {
    position: sticky;
    top: calc(var(--header-height) + 2rem);
  }

  .stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
