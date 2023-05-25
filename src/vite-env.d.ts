/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_SPOTIFY_CLIENT_ID: string;
    VITE_SPOTIFY_REDIRECT_URI: string;
    VITE_SPOTIFY_SCOPES: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}