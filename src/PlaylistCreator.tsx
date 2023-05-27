import { useEffect, useState } from "react";
import Button from "./components/base/Buttons/Button";
import H1 from "./components/base/Titles/H1";
import H4 from "./components/base/Titles/H4";
import { useSpotifyContext } from "./utils/SpotifyContext";
import { createPlaylist } from "./utils/spotify";
import Creation from "./elements/Creation";
import PlaylistsGallery from "./elements/Playlist/PlaylistsGallery";
import { usePlaylistContext } from "./utils/PlaylistContext";

export default function PlaylistCreator() {
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
    const [loading, setLoading] = useState(false);
    const playlistContext = usePlaylistContext();
    const spotify = useSpotifyContext();

    const handleCreation = () => {
        setLoading(true);
        if (!spotify || !playlistContext?.generatedPlaylist) return;
        createPlaylist(spotify, playlistContext.generatedPlaylist).then(() => {
            setLoading(false);
            playlistContext.setGeneratedPlaylist(null);
        });
    };

    useEffect(() => {
        if (!spotify || playlists.length) return;
        // @ts-ignore
        spotify.getUserPlaylists({ limit: 50 }).then((data) => {
            setPlaylists(data.items);
        });
    }, [spotify]);

    if (playlistContext?.generatedPlaylist) {
        return (
            <div className="flex flex-col space-y-4 w-full max-w-6xl relative">
                <H1>{playlistContext.generatedPlaylist.title || "Generated playlist"}</H1>
                <H4>{playlistContext.generatedPlaylist.description}</H4>
                <div className="absolute right-0 flex space-x-2">
                    <Button onClick={() => playlistContext.setGeneratedPlaylist(null)}>
                        Back to generation
                    </Button>
                    {/* <Button onClick={() => handleGeneration(generation!)} plain>
                        Regenerate {loading && "⏳"}
                    </Button> */}
                </div>
                <PlaylistsGallery playlists={playlistContext.generatedPlaylist.playlists} allReco={playlistContext.generatedPlaylist.allReco} />
                <div className="flex space-x-2 justify-end">
                    <Button onClick={handleCreation} plain>
                        Create playlist {loading && "⏳"}
                    </Button>
                </div>
            </div>
        )
    }
    return (<Creation playlists={playlists} />);
}