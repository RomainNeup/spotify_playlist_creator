interface PlaylistProps {
  className?: string;
  columns?: number;
  tracks: SpotifyApi.TrackObjectSimplified[];
}

interface SongProps {
  image: string;
  name: string;
  id: string;
  artist: string;
  preview: string;
  url: string;
}