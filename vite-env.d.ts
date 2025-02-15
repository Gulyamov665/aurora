interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_VENDOR_URL: string;
  readonly MODE: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_NOTIFICATION_URL: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
