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
    if (tracks.length > 5)
        tracks = getXRandom<string>(tracks, 5);
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

export function generatePlaylist(spotify: SpotifyWebApi.SpotifyWebApiJs, playlists: SpotifyPlaylist[], final: PlaylistCreation) {
    const promises = [];
    if (!spotify) return Promise.resolve({ allReco: [], playlists: [] });
    promises.push(
        getTopTrack(spotify, final.top.limit)
            .then(tracks => getRecommendations(spotify, getXRandom<SpotifyApi.TrackObjectSimplified>(tracks, 5).map(a => a.id), final.top.reco)
                .then(recommendations => ({
                    playlist: {
                        id: "top",
                        name: "Top ⭐️"
                    } as SpotifyPlaylist,
                    tracks: tracks,
                    recommendations
                }))
            )
    )
    for (let playlist of final.playlists) {
        promises.push(
            getPlaylistTracks(spotify, playlist.id)
                .then((tracks) => getXRandom<SpotifyApi.PlaylistTrackObject>(tracks, playlist.limit))
                .then((tracks) => getRecommendations(spotify, getXRandom<SpotifyApi.PlaylistTrackObject>(tracks, 5).map(a => a.track.id), playlist.reco)
                    .then(recommendations => ({
                        playlist: playlists.find(a => a.id === playlist.id),
                        tracks: tracks.map(a => a.track as SpotifyApi.TrackObjectSimplified),
                        recommendations
                    }))
                )
        );
    }

    return Promise.all(promises).then((tracks) =>
        getRandomReco(spotify, tracks.map(a => (
            a ? [
                ...a.tracks.map((a): string => a.id),
                ...a.recommendations.map(a => a.id)
            ] : []
        )).flat(), final.allReco)
            .then(allReco => ({
                allReco,
                playlists: tracks
            }))
    );
}

export function createPlaylist(spotify: SpotifyWebApi.SpotifyWebApiJs, generation: PlaylistGeneration) {
    const tracksUri = generation.playlists.map(a => [
        ...a.recommendations.map(a => a.uri),
        ...a.tracks.map(a => a.uri)
    ]).flat().concat(generation?.allReco.map(a => a.uri));

    return spotify.getMe().then((user) => {
        if (!user) return;
        return spotify.createPlaylist(user.id, {
            name: generation.title,
            description: generation.description || "",
            public: generation.public,
            collaborative: generation.collaborative,
        }).then((playlist) => {
            const promises = [];

            for (let i = 0; i < tracksUri.length; i += 100) {
                promises.push(spotify.addTracksToPlaylist(playlist.id, tracksUri.slice(i, i + 100)))
            }
            return Promise.all(promises);
        });
    });
}