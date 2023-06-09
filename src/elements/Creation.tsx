import { useState } from "react";
import Input from "../components/base/Inputs/Input";
import Button from "../components/base/Buttons/Button";
import H1 from "../components/base/Titles/H1";
import H2 from "../components/base/Titles/H2";
import Checkbox from "../components/base/Inputs/Checkbox";
import { generatePlaylist } from "../utils/spotify";
import { usePlaylistContext } from "../utils/PlaylistContext";
import { useSpotifyContext } from "../utils/SpotifyContext";
import Spinner from "../components/base/Spinners/Spinner";

export default function Creation({ playlists }: { playlists: SpotifyPlaylist[] }) {
    const [title, setTitle] = useState<string>("Generated playlist " + new Date().toLocaleDateString());
    const [description, setDescription] = useState<string>("");
    const [selectedPlaylists, setSelectedPlaylists] = useState<{
        id: string,
        limit: number,
        reco: number
    }[]>([]);
    const [topSongs, setTopSongs] = useState<{
        limit: number,
        reco: number
    }>({ limit: 0, reco: 0 });
    const [reco, setReco] = useState<number>(0);
    const [collaborative, setCollaborative] = useState<boolean>(false);
    const [publicPlaylist, setPublicPlaylist] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const playlistContext = usePlaylistContext();
    const spotify = useSpotifyContext();

    const handleCreationChange = (index: number, key: string, value: string) => {
        const newCreation = [...selectedPlaylists];
        // @ts-ignore
        newCreation[index][key] = value;
        setSelectedPlaylists(newCreation);
    }

    const handleGeneration = (final: PlaylistCreation) => {
        if (!spotify) return;
        setLoading(true);
        generatePlaylist(spotify, playlists, final)
            .then((res) => {
                setLoading(false);
                playlistContext?.setGeneratedPlaylist({
                    playlists: res.playlists.map(a => ({...a, playlist: {
                        ...a.playlist,
                        name: a.playlist.name || ""
                    }})),
                    allReco: res.allReco,
                    title,
                    description,
                    public: publicPlaylist,
                    collaborative
                });
            })
            .catch(() => setLoading(false));
    };

    if (loading) {
        return (
            <div className="flex h-full items-center grow">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="flex flex-col space-y-4 w-full max-w-5xl relative">
            <H1 className="mb-4">Create your playlist</H1>
            <div className="py-4 space-y-4">
                <H2 className="pt-3">First select new playlist informations</H2>
                <div className="flex space-x-4 items-start">
                    <Input
                        className="w-full"
                        type="text"
                        label="Playlist name"
                        onChange={(elem) => setTitle(elem.target.value)}
                        value={title}
                    />
                    <Input
                        className="w-full"
                        type="textarea"
                        rows={1}
                        label="Playlist description"
                        onChange={(elem) => setDescription(elem.target.value)}
                        value={description}
                    />
                    <div>
                        <label>Playlist privacy</label>
                        <Checkbox label="Public" className="mt-2" checked={publicPlaylist} onChange={() => setPublicPlaylist(old => !old)} />
                        <Checkbox label="Collaborative" checked={collaborative} onChange={() => setCollaborative(old => !old)} />
                    </div>
                </div>
            </div>
            <div className="py-4 space-y-4">
                <H2 className="pt-3">Second select playlists</H2>
                {
                    selectedPlaylists.map((value, index: number) => (
                        <div className="flex space-x-4 items-end" key={"playlist_" + index}>
                            <>
                                <Input
                                    type='select'
                                    className="w-full"
                                    options={[...playlists.map(({ name, id }) => ({ value: id, label: name, default: false })), { value: "", label: "Other 🔍", default: true }]}
                                    label="Playlist"
                                    onChange={(elem) => handleCreationChange(index, "id", elem.target.value)}
                                    value={value.id}
                                />
                                {
                                    !playlists.find(a => a.id === value.id) && <Input
                                        type="text"
                                        className="w-full"
                                        label="Playlist ID"
                                        onChange={(elem) => handleCreationChange(index, "id", elem.target.value)}
                                        value={value.id}
                                    />
                                }
                            </>
                            <Input
                                type="number"
                                className="w-full"
                                label="Number of songs"
                                onChange={(elem) => handleCreationChange(index, "limit", elem.target.value)}
                                value={value.limit}
                            />
                            <Input
                                type="number"
                                className="w-full"
                                label="Number of reco"
                                onChange={(elem) => handleCreationChange(index, "reco", elem.target.value)}
                                value={value.reco}
                            />
                        </div>
                    ))
                }
                <div className="flex space-x-4">
                    <Button
                        fullWidth
                        size='medium'
                        onClick={() => setSelectedPlaylists((old) => [...old, { id: "", limit: 0, reco: 0 }])}
                    >
                        Add playlist
                    </Button>
                    <Button fullWidth color="secondary" onClick={() => setSelectedPlaylists(old => old.slice(0, -1))}>
                        Delete playlist
                    </Button>
                </div>
            </div>
            <div className="py-4 space-y-4">
                <H2 className="pt-3">Then select top song</H2>
                <div className="flex space-x-4 items-end">
                    <Input
                        className="w-full"
                        type="number"
                        label="Number of top songs"
                        onChange={(elem) => setTopSongs(old => ({ ...old, limit: parseInt(elem.target.value) }))}
                        value={topSongs.limit}
                    />
                    <Input
                        className="w-full"
                        type="number"
                        label="Number of reco from top songs"
                        onChange={(elem) => setTopSongs(old => ({ ...old, reco: parseInt(elem.target.value) }))}
                        value={topSongs.reco}
                    />
                </div>
            </div>
            <div className="py-4 space-y-4">
                <H2 className="pt-3">Finaly validate or dismiss</H2>
                <div className="flex space-x-4 items-end w-full">
                    <Input
                        className="w-full"
                        type="number"
                        label="Number of reco from all playlists"
                        onChange={(elem) => setReco(parseInt(elem.target.value))}
                        value={reco}
                    />
                </div>
                <div className="flex space-x-4 items-end w-full">
                    <Button onClick={() => handleGeneration({
                        allReco: reco,
                        description,
                        title,
                        top: topSongs,
                        playlists: selectedPlaylists,
                        collaborative,
                        public: publicPlaylist
                    })} fullWidth plain>
                        Validate {false && "⏳"}
                    </Button>
                    <Button color="secondary" onClick={() => {
                        setDescription("");
                        setTitle("");
                        setSelectedPlaylists([]);
                        setReco(0);
                        setTopSongs({ limit: 0, reco: 0 });
                        setCollaborative(false);
                        setPublicPlaylist(false);
                    }} fullWidth>
                        Dismiss
                    </Button>
                </div>
            </div>
        </div>
    )
}