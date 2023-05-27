interface PlaylistProps {
  className?: string;
  tracks: SpotifyApi.TrackObjectSimplified[];
}

interface SongProps {
  image: string;
  name: string;
  id: string;
  artist: string;
}