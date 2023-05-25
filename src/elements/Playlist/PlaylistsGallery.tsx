import H2 from "../../components/base/Titles/H2";
import Playlist from "./Playlist";

export default function PlaylistsGallery({ allReco, playlists }: {
    allReco: SpotifyApi.TrackObjectSimplified[], playlists: {
        playlist?: SpotifyPlaylist;
        tracks: SpotifyApi.TrackObjectSimplified[];
        recommendations: SpotifyApi.TrackObjectSimplified[];
    }[]
}) {
    return (
        <div>
            {playlists.map(({ playlist, tracks, recommendations }) => (
                <div>
                    {playlist?.name && (!!tracks.length || !!recommendations.length) && <H2 className="pt-3">{playlist.name}</H2>}
                    <div className="grid grid-cols-2 gap-2 py-4">
                        {<Playlist tracks={tracks} />}
                        {<Playlist tracks={recommendations} />}
                    </div>
                </div>
            ))}
            <div>
                <H2 className="pt-3">All recommendations</H2>
                <div className="grid gap-2 py-4">
                    {<Playlist tracks={allReco} />}
                </div>
            </div>
        </div>
    )
}