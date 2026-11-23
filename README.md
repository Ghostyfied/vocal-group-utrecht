# Vocal Group Utrecht — website

Concept for the new [vocalgrouputrecht.nl](https://www.vocalgrouputrecht.nl/): a single-page site built with Vue 3, Vite and TypeScript, deployed to GitHub Pages.

## Develop

Requires Node 22.12 or newer.

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run build` type-checks and writes the static site to `dist/`. `npm run preview` serves that build locally.

## Editing content

All texts, links and agenda items live in one file: [`src/content/site.ts`](src/content/site.ts). The components only handle layout.

- **Agenda** — add an entry to `agenda.items` with a `date` in `YYYY-MM-DD` form. Shows are sorted automatically and move to "Eerder" by themselves once the date has passed. Remove the entries marked `placeholder: true` when real dates are in.
- **Call-out in the hero** ("Gezocht: …") — edit `callout`, or set `callout.enabled` to `false` to hide it.
- **Conductor portrait** — import an image and set `conductor.photo`; until then a monogram tile is shown.
- **Photos** — optimised WebP files in `src/assets/images/`, referenced from the section components.

## Structure

```
src/
  content/site.ts       all copy and data
  components/           one component per page section
  styles/main.css       design tokens (colours, type, spacing) and shared styles
  directives/reveal.ts  v-reveal scroll animation
  composables/          active-section tracking for the navigation
```

## Deployment

`.github/workflows/deploy.yml` builds every push and publishes the default branch to GitHub Pages. One-time setup: **Settings → Pages → Source: GitHub Actions**.

Two settings in `.env` matter when the site moves to its own domain:

- `VITE_SITE_URL` — the public URL, used for the social share image.
- `VITE_ROBOTS` — `noindex` while this is a concept; change to `index, follow` at launch.

The build uses a relative base path, so it works unchanged on a `github.io/<repo>/` URL and on a custom domain.
