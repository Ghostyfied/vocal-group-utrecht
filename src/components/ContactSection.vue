<script setup lang="ts">
import { mailto, site } from '../content/site'
import SocialIcon from './SocialIcon.vue'
import lights1100 from '../assets/images/lights-1100.webp'
import lights1920 from '../assets/images/lights-1920.webp'

const { contact } = site
</script>

<template>
  <section id="contact" class="contact on-dark">
    <div class="contact__media" aria-hidden="true">
      <img
        :src="lights1100"
        :srcset="`${lights1100} 1100w, ${lights1920} 1920w`"
        sizes="100vw"
        width="1920"
        height="819"
        loading="lazy"
        decoding="async"
        alt=""
      />
    </div>

    <div class="container contact__content">
      <p v-reveal class="eyebrow"><span class="light" aria-hidden="true" />{{ contact.eyebrow }}</p>
      <h2 v-reveal="60" class="contact__title">{{ contact.title }}</h2>
      <p v-reveal="120" class="prose contact__text">{{ contact.text }}</p>

      <a v-reveal="180" class="contact__mail" :href="mailto()">{{ site.email }}</a>

      <ul v-reveal="240" class="contact__socials">
        <li v-for="social in site.socials" :key="social.name">
          <a class="btn btn--ghost" :href="social.url" target="_blank" rel="noopener">
            <SocialIcon :name="social.name" />
            {{ social.name }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  padding-top: clamp(14rem, 34vw, 30rem);
  padding-bottom: clamp(4rem, 8vw, 7rem);
  border-radius: var(--sheet-radius) var(--sheet-radius) 0 0;
  background: var(--c-bg);
  overflow: hidden;
  isolation: isolate;
}

.contact__media {
  position: absolute;
  inset: 0 0 auto;
  z-index: -1;
}

.contact__media img {
  width: 100%;
  min-height: 20rem;
  object-fit: cover;
}

/* Fade the photo into the page on both ends. */
.contact__media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, var(--c-bg) 0%, transparent 22%, transparent 55%, var(--c-bg) 100%);
}

.contact__title {
  margin-top: 1.25rem;
  font-size: clamp(2.75rem, 9vw, 7.5rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.045em;
}

.contact__text {
  margin-top: 1.75rem;
}

.contact__mail {
  display: inline-block;
  margin-top: 2.25rem;
  padding-bottom: 0.2rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.25rem, 3.6vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;
  background: linear-gradient(var(--c-accent-bright), var(--c-accent-bright)) 0 100% / 100% 2px no-repeat;
  transition:
    color 0.3s ease,
    background-size 0.5s var(--ease-out);
}

.contact__mail:hover {
  color: var(--c-accent-bright);
  background-size: 35% 2px;
}

.contact__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.25rem;
}
</style>
