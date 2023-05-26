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