interface Playlist {
    id: string;
    limit: number;
}

interface SpotifyPlaylist {
    id: string;
    name: string;
    default?: boolean;
}