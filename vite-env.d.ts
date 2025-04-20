interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_VENDOR_URL: string;
  readonly MODE: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_NOTIFICATION_URL: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_EXPRESS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "virtual:pwa-register" {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
  }

  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => void;
}
