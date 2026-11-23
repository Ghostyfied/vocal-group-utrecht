/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_ROBOTS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
