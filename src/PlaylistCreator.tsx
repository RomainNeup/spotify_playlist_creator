import { useEffect, useState } from "react";
import Input from "./components/base/Inputs/Input";
import Button from "./components/base/Buttons/Button";
import H1 from "./components/base/Titles/H1";
import H2 from "./components/base/Titles/H2";
import Image from "./components/base/Images/Image";
import H4 from "./components/base/Titles/H4";
import { useSpotifyContext } from "./utils/SpotifyContext";
import { getPlaylistTracks, getRandomReco, getRecommendations, getTopTrack } from "./utils/spotify";
import { getXRandom } from "./utils/utils";
import Creation from "./elements/Creation";
import PlaylistsGallery from "./elements/Playlist/PlaylistsGallery";

type Playlist = {
    id: string;
    limit: number;
    recoLimit: number;
}

interface Track {
    "artists":
    {
        "externalURL": { "spotify": string },
        "id": string, "name": string, "type": string, "uri": string
    }[],
    "availableMarkets": string[],
    "discNumber": number,
    "duration": number,
    "explicit": boolean,
    "externalURL": { "spotify": string },
    "id": string,
    "isLocal": boolean,
    "name": string,
    "previewURL": string,
    "restrictions": any[],
    "trackNumber": number,
    "type": string
    "uri": string
    "album": {
        "artists": {
            "externalURL": { "spotify": string }
            "id": string
            "name": string
            "type": string,
            "uri": string
        }[],
        "albumType": string,
        "availableMarkets": string[],
        "externalURL": { "spotify": string },
        "id": string,
        "images":
        {
            "height": number,
            "url": string,
            "width": number
        }[],
        "name": string,
        "releaseDate": string,
        "releaseDatePrecision": string,
        "restrictions": any[],
        "totalTracks": number,
        "type": string,
        "uri": string,
        "albumGroup"?: string
    },
    "externalID": { "isrc": string },
    "popularity": number
}

export default function PlaylistCreator() {
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
    const [loading, setLoading] = useState(false);
    const [generation, setGeneration] = useState<PlaylistCreation | void>();
    const [generated, setGenerated] = useState<{ allReco: SpotifyApi.TrackObjectSimplified[], playlists: {
        playlist?: SpotifyPlaylist,
        tracks: SpotifyApi.TrackObjectSimplified[],
        recommendations: SpotifyApi.TrackObjectSimplified[]
    }[] } | null>();
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
                            name: "Top ⭐️"
                        },
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

    // const handleCreation = () => {
    //     const code = new URLSearchParams(window.location.search).get("code");
    //     setLoading(true);
    //     fetch('http://localhost:8080/create', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: "Bearer " + code
    //         },
    //         body: JSON.stringify({
    //             tracks: result.map(a => a && a.uri),
    //             title: playlistCreationFinal.title,
    //             description: playlistCreationFinal.description
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(() => {
    //             setPlaylistCreationFinal({ description: "", playlists: [], recoLimit: 0, title: "", top: { limit: 0, recoLimit: 0 } })
    //             setResult([]);
    //             setLoading(false);
    //         })
    // };

    useEffect(() => {
        if (!spotify || playlists.length) return;
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
                    <Button onClick={() => { }} plain>
                        Create playlist {loading && "⏳"}
                    </Button>
                </div>
            </div>
        )
    }
    return (<Creation handleGeneration={handleGeneration} playlists={playlists} />);
}