import { useRef, useState } from "react";
import Button from "../../components/base/Buttons/Button";
import Image from "../../components/base/Images/Image";
import { usePlaylistContext } from "../../utils/PlaylistContext";
import spotifyLogo from "../../assets/Spotify_Icon_RGB_Green.png";
import Link from "../../components/base/Links/Link";

export default function Song({ image, name, id, artist, preview, url }: SongProps) {
    const playlistContext = usePlaylistContext();
    const [playing, setPlaying] = useState<boolean>(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlayPause = () => {
        if (audioRef?.current?.paused) {
            audioRef?.current?.play();
        }
        else {
            audioRef?.current?.pause();
        }
        setPlaying(!audioRef?.current?.paused || false);
    }

    return (
        <div className="flex rounded-lg bg-primary text-basic items-center overflow-hidden">
            <div className="mr-4 h-16 w-16 shrink-0 relative">
                <Button onClick={handlePlayPause} className="absolute left-0 h-full bg-primary/30 rounded-r-none" border={false} fullWidth color="basic">
                    {
                        playing ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 24" className="h-6 w-6">
                                <path d="M10 24h-6v-24h6v24zm10-24h-6v24h6v-24z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 24" className="h-6 w-7">
                                <path d="M2 24v-24l20 12-20 12z" />
                            </svg>
                    }
                </Button>
                <Image src={image} alt={name} />
            </div>
            <div className="w-full truncate">
                <div>{name}</div>
                <div>{artist}</div>
                <audio src={preview} ref={audioRef} />
            </div>
            <div className="flex shrink-0">
                <Link to={url} className="py-3" newTab>
                    <Image src={spotifyLogo} alt="Spotify logo" className="h-6 w-6" background="none" />
                </Link>
                <Button onClick={() => playlistContext?.removeSong(id)} border={false}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-basic hover:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2} d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    )
}