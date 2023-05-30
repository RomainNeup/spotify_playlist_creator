import { ReactElement, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSpotifyContext } from '../../utils/SpotifyContext';
import Song from './Song';

export default function Playlist({
  className,
  tracks
}: PlaylistProps): ReactElement {
  const spotify = useSpotifyContext();
  const [trackDetails, setTrackDetails] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const componentClass = clsx(
    className,
    [
      "flex",
      "w-full",
      "flex-wrap",
      "h-fit",
      "gap-y-2"
    ]
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
          />
        </div>
      ))}
    </div>
  );
}
