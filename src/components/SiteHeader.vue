<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { site } from '../content/site'
import { useActiveSection } from '../composables/useActiveSection'
import SocialIcon from './SocialIcon.vue'

const scrolled = ref(false)
const menuOpen = ref(false)
const active = useActiveSection(site.nav.map((item) => item.id))

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') menuOpen.value = false
}

const desktop = window.matchMedia('(min-width: 62rem)')
function onBreakpoint() {
  if (desktop.matches) menuOpen.value = false
}

watch(menuOpen, (open) => document.body.classList.toggle('is-locked', open))

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  desktop.addEventListener('change', onBreakpoint)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  desktop.removeEventListener('change', onBreakpoint)
  document.body.classList.remove('is-locked')
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen, 'on-dark': !scrolled && !menuOpen }">
    <div class="container header__bar">
      <a class="brand" href="#top" :aria-label="`${site.name} — naar boven`" @click="menuOpen = false">
        <span class="light" aria-hidden="true" />
        <span class="brand__name">{{ site.name }}</span>
      </a>

      <nav class="nav" aria-label="Hoofdnavigatie">
        <ul class="nav__list">
          <li v-for="item in site.nav" :key="item.id">
            <a
              class="nav__link"
              :class="{ 'is-active': active === item.id }"
              :href="`#${item.id}`"
              :aria-current="active === item.id ? 'true' : undefined"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobiel-menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="visually-hidden">{{ menuOpen ? 'Menu sluiten' : 'Menu openen' }}</span>
        <span class="menu-toggle__bars" aria-hidden="true"><span /><span /></span>
      </button>
    </div>

    <Transition name="menu">
      <div v-if="menuOpen" id="mobiel-menu" class="mobile-menu">
        <nav class="container mobile-menu__inner" aria-label="Mobiele navigatie">
          <ul class="mobile-menu__list">
            <li v-for="(item, index) in site.nav" :key="item.id" :style="{ '--i': index }">
              <a :href="`#${item.id}`" @click="menuOpen = false">{{ item.label }}</a>
            </li>
          </ul>
          <ul class="mobile-menu__socials">
            <li v-for="social in site.socials" :key="social.name">
              <a :href="social.url" target="_blank" rel="noopener">
                <SocialIcon :name="social.name" />
                {{ social.name }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  transition:
    background-color 0.4s ease,
    border-color 0.4s ease;
  border-bottom: 1px solid transparent;
}

.header.is-scrolled:not(.is-open) {
  background: color-mix(in srgb, var(--c-bg) 80%, transparent);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  backdrop-filter: blur(16px) saturate(1.4);
  border-bottom-color: var(--c-line);
}

.header__bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  height: var(--header-height);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.02em;
}

.nav {
  display: none;
}

.nav__list {
  display: flex;
  align-items: center;
  gap: clamp(1.25rem, 2.4vw, 2.25rem);
}

.nav__link {
  position: relative;
  padding-block: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--c-text-muted);
  transition: color 0.25s ease;
}

.nav__link::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 2px;
  border-radius: 2px;
  background: var(--c-accent-bright);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s var(--ease-out);
}

.nav__link:hover,
.nav__link.is-active {
  color: var(--c-text);
}

.nav__link.is-active::after {
  transform: scaleX(1);
}

/* Mobile toggle */
.menu-toggle {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-right: -0.5rem;
  border-radius: 50%;
}

.menu-toggle__bars {
  position: relative;
  width: 1.5rem;
  height: 0.625rem;
}

.menu-toggle__bars span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition:
    transform 0.45s var(--ease-out),
    top 0.45s var(--ease-out);
}

.menu-toggle__bars span:first-child {
  top: 0;
}

.menu-toggle__bars span:last-child {
  top: calc(100% - 2px);
}

.is-open .menu-toggle__bars span {
  top: calc(50% - 1px);
}

.is-open .menu-toggle__bars span:first-child {
  transform: rotate(45deg);
}

.is-open .menu-toggle__bars span:last-child {
  transform: rotate(-45deg);
}

/* Mobile menu */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 1;
  overflow-y: auto;
  background: var(--c-bg);
}

.mobile-menu__inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  min-height: 100%;
  padding-top: calc(var(--header-height) + 2rem);
  padding-bottom: 2.5rem;
}

.mobile-menu__list a {
  display: block;
  padding-block: 0.4rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.25rem, 11vw, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.mobile-menu__list li {
  animation: menu-item 0.7s var(--ease-out) both;
  animation-delay: calc(var(--i) * 55ms + 80ms);
}

.mobile-menu__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--c-line);
  color: var(--c-text-muted);
}

.mobile-menu__socials a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
}

@keyframes menu-item {
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

@media (min-width: 62rem) {
  .nav {
    display: block;
  }

  .menu-toggle,
  .mobile-menu {
    display: none;
  }
}
</style>
