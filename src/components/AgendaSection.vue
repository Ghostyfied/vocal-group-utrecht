<script setup lang="ts">
import { computed } from 'vue'
import { site, type AgendaItem } from '../content/site'
import ArrowIcon from './ArrowIcon.vue'

const { agenda } = site

function toDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year!, month! - 1, day!)
}

const today = new Date()
today.setHours(0, 0, 0, 0)

// Split on today's date, so a show moves to "Eerder" by itself once it has passed.
const upcoming = computed(() =>
  agenda.items.filter((item) => toDate(item.date) >= today).sort((a, b) => a.date.localeCompare(b.date)),
)
const past = computed(() =>
  agenda.items.filter((item) => toDate(item.date) < today).sort((a, b) => b.date.localeCompare(a.date)),
)

const dayFormat = new Intl.DateTimeFormat('nl-NL', { day: '2-digit' })
const monthFormat = new Intl.DateTimeFormat('nl-NL', { month: 'short' })
const weekdayFormat = new Intl.DateTimeFormat('nl-NL', { weekday: 'long' })
const fullFormat = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })

function parts(item: AgendaItem) {
  const date = toDate(item.date)
  return {
    day: dayFormat.format(date),
    month: monthFormat.format(date).replace('.', ''),
    year: date.getFullYear(),
    weekday: weekdayFormat.format(date),
    full: fullFormat.format(date),
  }
}

function place(item: AgendaItem): string {
  return [item.venue, item.city].filter(Boolean).join(', ')
}

const instagram = site.socials.find((social) => social.name === 'Instagram')
</script>

<template>
  <section id="agenda" class="section agenda">
    <div class="container">
      <header class="agenda__header">
        <div v-reveal>
          <p class="eyebrow"><span class="light" aria-hidden="true" />{{ agenda.eyebrow }}</p>
          <h2 class="section-title">{{ agenda.title }}</h2>
        </div>
        <p v-reveal="80" class="prose">{{ agenda.intro }}</p>
      </header>

      <ol v-if="upcoming.length" class="events">
        <li v-for="(item, index) in upcoming" :key="item.date + item.title" v-reveal="index * 80">
          <component
            :is="item.url ? 'a' : 'div'"
            class="event"
            :class="{ 'event--link': item.url }"
            :href="item.url"
            :target="item.url ? '_blank' : undefined"
            :rel="item.url ? 'noopener' : undefined"
          >
            <time class="event__date" :datetime="item.date">
              <span class="event__day">{{ parts(item).day }}</span>
              <span class="event__month">{{ parts(item).month }} {{ parts(item).year }}</span>
            </time>
            <div class="event__body">
              <h3 class="event__title">
                {{ item.title }}
                <span v-if="item.placeholder" class="tag">Voorbeeld</span>
              </h3>
              <p class="event__meta">
                <span class="event__weekday">{{ parts(item).weekday }}</span>
                <template v-if="item.time"> · {{ item.time }} uur</template>
                <template v-if="place(item)"> · {{ place(item) }}</template>
              </p>
              <p v-if="item.note" class="event__note">{{ item.note }}</p>
            </div>
            <span v-if="item.url" class="event__action">
              Meer info
              <ArrowIcon />
            </span>
          </component>
        </li>
      </ol>

      <div v-else v-reveal class="empty">
        <h3 class="empty__title">{{ agenda.emptyTitle }}</h3>
        <p>{{ agenda.emptyText }}</p>
        <a v-if="instagram" class="btn btn--ghost" :href="instagram.url" target="_blank" rel="noopener">
          Volg ons op Instagram
          <ArrowIcon />
        </a>
      </div>

      <div v-if="past.length" v-reveal class="past">
        <h3 class="past__title">{{ agenda.pastTitle }}</h3>
        <ul class="past__list">
          <li v-for="item in past" :key="item.date + item.title" class="past__item">
            <time :datetime="item.date">{{ parts(item).full }}</time>
            <span class="past__name">{{ item.title }}</span>
            <span>{{ place(item) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.agenda {
  background: var(--c-bg-raised);
}

.agenda__header {
  display: grid;
  gap: 1.5rem;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.events {
  border-top: 1px solid var(--c-line);
}

.event {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.5rem clamp(1.25rem, 4vw, 3.5rem);
  align-items: center;
  padding-block: clamp(1.5rem, 3vw, 2.25rem);
  border-bottom: 1px solid var(--c-line);
  transition:
    padding 0.5s var(--ease-out),
    background-color 0.3s ease;
}

.event--link:hover {
  padding-inline: 1rem;
  background: rgb(244 236 226 / 0.04);
}

.event__date {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 5.5rem;
}

.event__day {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3rem, 7vw, 5rem);
  line-height: 0.82;
  letter-spacing: -0.05em;
  font-variant-numeric: tabular-nums;
}

.event__month {
  font-size: var(--fs-small);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-accent-bright);
}

.event__title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.9rem;
  font-size: var(--fs-h3);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.event__meta {
  margin-top: 0.4rem;
  color: var(--c-text-muted);
}

.event__weekday {
  text-transform: capitalize;
}

.event__note {
  margin-top: 0.4rem;
  font-size: var(--fs-small);
  color: var(--c-text-muted);
}

.event__action {
  grid-column: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.tag {
  padding: 0.3rem 0.65rem;
  border: 1px dashed var(--c-glow);
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-glow);
}

.empty {
  display: grid;
  justify-items: start;
  gap: 0.75rem;
  padding: clamp(2rem, 5vw, 3.5rem);
  border: 1px solid var(--c-line);
  border-radius: var(--radius);
  color: var(--c-text-muted);
}

.empty__title {
  font-size: var(--fs-h3);
  color: var(--c-text);
}

.empty .btn {
  margin-top: 0.75rem;
}

.past {
  margin-top: clamp(3rem, 6vw, 5rem);
}

.past__title {
  font-family: var(--font-body);
  font-size: var(--fs-small);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--c-text-muted);
}

.past__list {
  margin-top: 1rem;
}

.past__item {
  display: grid;
  gap: 0.1rem;
  padding-block: 0.9rem;
  border-top: 1px solid var(--c-line);
  color: var(--c-text-muted);
}

.past__name {
  color: var(--c-text);
  font-weight: 500;
}

@media (min-width: 48rem) {
  .agenda__header {
    grid-template-columns: minmax(0, 1fr) minmax(0, 24rem);
    align-items: end;
  }

  .event {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .event__action {
    grid-column: auto;
  }

  .past__item {
    grid-template-columns: 12rem minmax(0, 1fr) minmax(0, 1fr);
    gap: 1.5rem;
  }
}
</style>
