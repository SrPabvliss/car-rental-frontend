/// <reference types="vite/client" />
declare global {
  interface Window {
    accessToken: string | null
  }
  interface ImportMetaEnv {
    readonly VITE_API_URL: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
