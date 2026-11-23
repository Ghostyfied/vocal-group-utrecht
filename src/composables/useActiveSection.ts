import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/**
 * Tracks which section currently sits around the middle of the viewport,
 * so the navigation can highlight it.
 */
export function useActiveSection(ids: string[]): Ref<string | null> {
  const active = ref<string | null>(null)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
          else if (active.value === entry.target.id) active.value = null
        }
      },
      { rootMargin: '-45% 0px -55% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}
