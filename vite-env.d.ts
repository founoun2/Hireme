/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_ADZUNA_APP_ID: string
  readonly VITE_ADZUNA_APP_KEY: string
  readonly VITE_API_KEY: string
  readonly VITE_GEMINI_API_KEY: string
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_Z_AI_API_KEY: string
  readonly VITE_FLOWITH_API_KEY: string
  readonly VITE_SENDGRID_API_KEY: string
  readonly VITE_SENDGRID_FROM_EMAIL: string
  readonly VITE_SENDGRID_FROM_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
