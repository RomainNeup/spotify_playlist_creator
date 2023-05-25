import querystring from 'querystring';
import SpotifyWebApi from 'spotify-web-api-js';
import { getXRandom } from './utils';



export function getLoginLink() {
    return 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'token',
            client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
            scope: import.meta.env.VITE_SPOTIFY_SCOPES,
            redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        })
}

export function generatePlaylist(playlists: [], top: {}, recoLimit: number) {

}

export function getPlaylistTracks(spotify: SpotifyWebApi.SpotifyWebApiJs, playlistId: string, offset = 0): Promise<SpotifyApi.PlaylistTrackObject[]> {
    return spotify.getPlaylistTracks(playlistId, { limit: 100, offset })
        .then((res) => {
            const tracks = res.items;
            if (tracks.length >= 100) {
                return getPlaylistTracks(spotify, playlistId, offset + 100)
                    .then((a: SpotifyApi.PlaylistTrackObject[]) => tracks.concat(a))
            }
            return tracks;
        })
        .catch((err) => {
            console.error(err)
            return [];
        })
}

export function getRecommendations(spotify: SpotifyWebApi.SpotifyWebApiJs, tracks: string[], limit = 10) {
    if (!limit || !tracks.length)
        return Promise.resolve([]);
    return spotify.getRecommendations({
        seed_tracks: tracks,
        market: "FR",
        limit,
    })
        .then(a => a.tracks);
}

export function getRandomReco(spotify: SpotifyWebApi.SpotifyWebApiJs, tracks: string[], limit = 10) {
    const promises = [];
    for (let i = 0; i < limit && tracks.length > 0; i++) {
        promises.push(getRecommendations(spotify, getXRandom<string>(tracks, 5), 1));
    }
    return Promise.all(promises).then(a => a.flat());
}

export function getTopTrack(spotify: SpotifyWebApi.SpotifyWebApiJs, limit = 10) {
    return limit ? spotify.getMyTopTracks({
        time_range: "short_term",
        limit: limit
    }).then(a => a.items) : Promise.resolve([]);
}