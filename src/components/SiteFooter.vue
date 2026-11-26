<script setup lang="ts">
import { site } from '../content/site'
import { useTheme, type Theme } from '../composables/useTheme'

const { theme } = useTheme()
const themes: { value: Theme; label: string }[] = [
  { value: 'licht', label: 'Licht' },
  { value: 'donker', label: 'Donker' },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer on-dark">
    <div class="container footer__inner">
      <p class="footer__brand">
        <span class="light" aria-hidden="true" />
        {{ site.name }}
      </p>

      <nav aria-label="Voetnavigatie">
        <ul class="footer__links">
          <li v-for="item in site.nav" :key="item.id">
            <a :href="`#${item.id}`">{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <p class="footer__legal">
        <span>© {{ year }} {{ site.name }}</span>
        <span class="theme-switch" role="group" aria-label="Kleurthema">
          <span class="theme-switch__label">Thema</span>
          <button
            v-for="option in themes"
            :key="option.value"
            type="button"
            class="theme-switch__option"
            :aria-pressed="theme === option.value"
            @click="theme = option.value"
          >
            {{ option.label }}
          </button>
        </span>
        <a href="#top">Terug naar boven ↑</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--c-bg);
  border-top: 1px solid var(--c-line);
  padding-block: clamp(2rem, 4vw, 3rem);
  font-size: 0.95rem;
  color: var(--c-text-muted);
}

.footer__inner {
  display: grid;
  gap: 1.5rem;
}

.footer__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.02em;
  color: var(--c-text);
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
}

.footer__links a,
.footer__legal a {
  display: inline-block;
  padding-block: 0.4rem;
  transition: color 0.25s ease;
}

.footer__links a:hover,
.footer__legal a:hover {
  color: var(--c-text);
}

.footer__legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--c-line);
}

.theme-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.theme-switch__label {
  margin-right: 0.5rem;
}

.theme-switch__option {
  min-height: 2.25rem;
  padding: 0.3rem 0.85rem;
  border: 1px solid var(--c-line);
  border-radius: 999px;
  font-size: var(--fs-small);
  font-weight: 600;
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;
}

.theme-switch__option:hover {
  border-color: var(--c-line-strong);
  color: var(--c-text);
}

.theme-switch__option[aria-pressed='true'] {
  border-color: var(--c-text);
  background: var(--c-text);
  color: var(--c-bg);
}

@media (min-width: 62rem) {
  .footer__inner {
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  .footer__links {
    justify-content: flex-end;
  }

  .footer__legal {
    grid-column: 1 / -1;
  }
}
</style>
