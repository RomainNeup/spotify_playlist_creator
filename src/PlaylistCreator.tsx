import { useEffect, useState } from "react";
import Button from "./components/base/Buttons/Button";
import H1 from "./components/base/Titles/H1";
import H4 from "./components/base/Titles/H4";
import { useSpotifyContext } from "./utils/SpotifyContext";
import { getPlaylistTracks, getRandomReco, getRecommendations, getTopTrack } from "./utils/spotify";
import { getXRandom } from "./utils/utils";
import Creation from "./elements/Creation";
import PlaylistsGallery from "./elements/Playlist/PlaylistsGallery";

export default function PlaylistCreator() {
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
    const [loading, setLoading] = useState(false);
    const [generation, setGeneration] = useState<PlaylistCreation | void>();
    const [generated, setGenerated] = useState<{
        allReco: SpotifyApi.TrackObjectSimplified[], playlists: {
            playlist?: SpotifyPlaylist,
            tracks: SpotifyApi.TrackObjectSimplified[],
            recommendations: SpotifyApi.TrackObjectSimplified[]
        }[]
    } | null>();
    const spotify = useSpotifyContext();

    const handleGeneration = (final: PlaylistCreation) => {
        const promises = [];
        setGeneration(final);
        if (!spotify) return;
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

        Promise.all(promises).then((tracks) =>
            getRandomReco(spotify, tracks.map(a => (
                a ? [
                    ...a.tracks.map((a): string => a.id),
                    ...a.recommendations.map(a => a.id)
                ] : []
            )).flat(), final.allReco)
                .then(allReco => setGenerated({
                    allReco,
                    playlists: tracks
                }))
        );
    };

    const handleCreation = () => {
        setLoading(true);
        if (!spotify || !generated || !generation) return;
        const tracksUri = generated.playlists.map(a => [...a.recommendations.map(a => a.uri), ...a.tracks.map(a => a.uri)]).flat().concat(generated?.allReco.map(a => a.uri));

        spotify.getMe().then((user) => {
            if (!user) return;
            spotify.createPlaylist(user.id, {
                name: generation.title,
                description: generation.description || "",
                public: generation.public,
                collaborative: generation.collaborative,
            }).then((playlist) => {
                const promises = [];

                for (let i = 0; i < tracksUri.length; i += 100) {
                    promises.push(spotify.addTracksToPlaylist(playlist.id, tracksUri.slice(i, i + 100)))
                }
                Promise.all(promises).then(() => {
                    setLoading(false);
                    setGenerated(null);
                });
            });
        });
    };

    useEffect(() => {
        if (!spotify || playlists.length) return;
        // @ts-ignore
        spotify.getUserPlaylists({ limit: 50 }).then((data) => {
            setPlaylists(data.items);
        });
    }, [spotify]);

    if (!!generated) {
        return (
            <div className="flex flex-col space-y-4 w-full max-w-6xl relative">
                <H1>{generation?.title || "Generated playlist"}</H1>
                <H4>{generation?.description}</H4>
                <div className="absolute right-0 flex space-x-2">
                    <Button onClick={() => setGenerated(null)}>
                        Back to generation
                    </Button>
                    <Button onClick={() => handleGeneration(generation!)} plain>
                        Regenerate {loading && "⏳"}
                    </Button>
                </div>
                <PlaylistsGallery playlists={generated.playlists} allReco={generated.allReco} />
                <div className="flex space-x-2 justify-end">
                    <Button onClick={handleCreation} plain>
                        Create playlist {loading && "⏳"}
                    </Button>
                </div>
            </div>
        )
    }
    return (<Creation handleGeneration={handleGeneration} playlists={playlists} />);
}