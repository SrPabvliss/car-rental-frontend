/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />
declare global {
  interface Window {
    accessToken: string | null
  }
  interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_APP_TITLE: string
    readonly VITE_NODE_ENV: 'development' | 'test' | 'production'
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
