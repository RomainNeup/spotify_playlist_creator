import Button from "../../components/base/Buttons/Button";
import Image from "../../components/base/Images/Image";
import { usePlaylistContext } from "../../utils/PlaylistContext";

export default function Song({ image, name, id, artist }: SongProps) {
    const playlistContext = usePlaylistContext();

    return (
        <div className="flex rounded-lg bg-primary text-basic items-center overflow-hidden">
            <div className="mr-4 h-16 w-16 shrink-0">
                <Image src={image} alt={name} />
            </div>
            <div className="w-full">
                <div>{name}</div>
                <div>{artist}</div>
            </div>
            <Button onClick={() => playlistContext?.removeSong(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-basic hover:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2} d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </Button>
        </div>
    )
}