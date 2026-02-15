interface ImportMetaEnv {
    readonly VITE_KINOPOISK_API_URL: string;
    readonly VITE_KINOPOISK_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
