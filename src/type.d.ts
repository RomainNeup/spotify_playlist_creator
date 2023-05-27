interface PlaylistCreation {
    title: string,
    description: string
    top: { limit: number, reco: number },
    playlists: {
        id: string,
        limit: number,
        reco: number
    }[],
    allReco: number,
    collaborative: boolean,
    public: boolean,
}

interface PlaylistGeneration {
    title: string,
    description: string,
    collaborative: boolean,
    public: boolean,
    allReco: SpotifyApi.TrackObjectSimplified[],
    playlists: {
        playlist?: SpotifyPlaylist,
        tracks: SpotifyApi.TrackObjectSimplified[],
        recommendations: SpotifyApi.TrackObjectSimplified[]
    }[]
}