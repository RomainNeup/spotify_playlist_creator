import { createContext, useState, useContext } from "react";
export const PlaylistContext = createContext<{
    generatedPlaylist: PlaylistGeneration | null,
    setGeneratedPlaylist: React.Dispatch<React.SetStateAction<PlaylistGeneration | null>>,
    removeSong: (songId: string) => void
} | null>(null);

export const PlaylistContextProvider = ({ children }: LayoutProps) => {
    const [generatedPlaylist, setGeneratedPlaylist] = useState<PlaylistGeneration | null>(null);

    const removeSong = (songId: string) => {
        setGeneratedPlaylist(old => {
            if (!old) return null;
            const newPlaylists = old?.playlists.map(playlist => {
                const newTracks = playlist.tracks.filter(track => track.id !== songId);
                const newRecos = playlist.recommendations.filter(track => track.id !== songId);
                return {
                    ...playlist,
                    tracks: newTracks,
                    recommendations: newRecos
                };
            })
            return {
                ...old,
                playlists: newPlaylists || [],
                allReco: old.allReco.filter(track => track.id !== songId)
            };
        });
    }

    return (
        <PlaylistContext.Provider value={{generatedPlaylist, setGeneratedPlaylist, removeSong}}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylistContext = () => {
    const context = useContext(PlaylistContext);

    return context;
};
