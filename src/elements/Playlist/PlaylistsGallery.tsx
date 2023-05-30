import Button from "../../components/base/Buttons/Button";
import H2 from "../../components/base/Titles/H2";
import { usePlaylistContext } from "../../utils/PlaylistContext";
import { useSpotifyContext } from "../../utils/SpotifyContext";
import { getRecommendations } from "../../utils/spotify";
import Playlist from "./Playlist";

export default function PlaylistsGallery({ allReco, playlists }: {
    allReco: SpotifyApi.TrackObjectSimplified[], playlists: {
        playlist?: SpotifyPlaylist;
        tracks: SpotifyApi.TrackObjectSimplified[];
        recommendations: SpotifyApi.TrackObjectSimplified[];
    }[]
}) {
    const playlistContext = usePlaylistContext();
    const spotify = useSpotifyContext();

    const handleRecommendationRegeneration = (playlistId: string) => {
        const playlist = playlistContext?.generatedPlaylist?.playlists.find(a => a.playlist?.id === playlistId);
        if (!playlist || !spotify) return;
        getRecommendations(spotify, playlist.tracks.map(a => a.id), playlist.recommendations.length)
            .then((data) => {
                if (!playlistContext?.generatedPlaylist) return;
                const newPlaylists = playlistContext?.generatedPlaylist?.playlists.map((a) => {
                    if (a.playlist?.id === playlistId) {
                        return {
                            ...a,
                            recommendations: data
                        }
                    }
                    return a;
                });
                playlistContext.setGeneratedPlaylist({
                    ...playlistContext?.generatedPlaylist,
                    playlists: newPlaylists || []
                })
            });
    };

    return (
        <div>
            {playlists.map(({ playlist, tracks, recommendations }) => (
                <div>
                    {playlist?.name && (!!tracks.length || !!recommendations.length) &&
                        <div className="flex justify-between pt-3">
                            <H2>{playlist.name}</H2>
                            <Button onClick={() => handleRecommendationRegeneration(playlist.id)}>
                                Regenerate recommendations
                            </Button>
                        </div>
                    }
                    <div className="grid grid-cols-2 gap-4 py-4">
                        {<Playlist tracks={tracks} />}
                        {<Playlist tracks={recommendations} />}
                    </div>
                </div>
            ))}
            {
                !!allReco.length && <div>
                    <H2 className="pt-3">All recommendations</H2>
                    <div className="grid gap-2 py-4">
                        {<Playlist tracks={allReco} />}
                    </div>
                </div>
            }
        </div>
    )
}