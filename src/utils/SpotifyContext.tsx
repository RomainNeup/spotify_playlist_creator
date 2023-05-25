import { createContext, useState, useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";

export const SpotifyContext = createContext<SpotifyWebApi.SpotifyWebApiJs | null>(null);

export const SpotifyContextProvider = ({ children }: LayoutProps) => {
    const [spotify, setSpotify] = useState<SpotifyWebApi.SpotifyWebApiJs | null>(null);

    useEffect(() => {
        const code = window.location.hash.split("=")[1];
        const spotifyApi = new SpotifyWebApi();

        spotifyApi.setAccessToken(code);
        setSpotify(spotifyApi);
    }, []);

    return (
        <SpotifyContext.Provider value={spotify}>
            {children}
        </SpotifyContext.Provider>
    );
};

export const useSpotifyContext = () => {
    const context = useContext(SpotifyContext);

    return context;
};
