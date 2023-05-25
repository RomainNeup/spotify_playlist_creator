import { ReactElement } from 'react';
import clsx from 'clsx';
import { Spotify } from 'react-spotify-embed';

export default function Playlist({
  className,
  tracks
}: PlaylistProps): ReactElement {
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

  if (!tracks)
    return (<></>);

  return (
    <div
      className={componentClass}
    >
      {tracks.map((track, index) => (
        <div className="w-1/2 px-1">
          <Spotify link={"https://open.spotify.com/track/" + track.id} key={"playlist_" + index} wide={true} />
        </div>
      ))}
    </div>
  );
}
