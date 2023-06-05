import { ReactElement, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSpotifyContext } from '../../utils/SpotifyContext';
import Song from './Song';

export default function Playlist({
  className,
  tracks,
  columns = 1
}: PlaylistProps): ReactElement {
  const spotify = useSpotifyContext();
  const [trackDetails, setTrackDetails] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const componentClass = clsx(
    className,
    [
      "grid",
      "w-full",
      "h-fit",
      "gap-2",
    ],
    {
      "grid-cols-1": columns === 1,
      "grid-cols-2": columns === 2,
      "grid-cols-4": columns === 4,
    }
  );

  const getSongDetails = () => {
    console.log(tracks);
    spotify?.getTracks(tracks?.map(track => track.id) || [])
      .then((tracks) => {
        setTrackDetails(tracks.tracks);
      })
  }

  useEffect(() => {
    if (tracks.length)
      getSongDetails();
  }, [tracks]);

  if (!tracks)
    return (<></>);

  return (
    <div
      className={componentClass}
    >
      {trackDetails.map((track, index) => (
        <div className="w-full" key={`track_${index}`}>
          <Song
            image={track.album.images[0].url}
            name={track.name} id={track.id}
            artist={track.artists[0].name}
            url={track.preview_url}
          />
        </div>
      ))}
    </div>
  );
}
