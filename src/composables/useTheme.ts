import { ref, watch } from 'vue'

export type Theme = 'licht' | 'donker'

const STORAGE_KEY = 'vgu-thema'

function initial(): Theme {
  // index.html has already applied the stored or ?thema= choice before first paint.
  return document.documentElement.dataset.theme === 'dark' ? 'donker' : 'licht'
}

const theme = ref<Theme>(initial())

watch(theme, (value) => {
  if (value === 'donker') document.documentElement.dataset.theme = 'dark'
  else delete document.documentElement.dataset.theme
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this visit only.
  }
})

/** Light is the default; `?thema=donker` or the footer switch selects the dark theme. */
export function useTheme() {
  return { theme }
}
