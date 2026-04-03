/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for the Bread Recipes API (e.g. `http://127.0.0.1:8000`). Omit for same-origin in production builds. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
