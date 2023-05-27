import { ReactElement, useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { useSpotifyContext } from '../../utils/SpotifyContext';
import { getLoginLink } from '../../utils/spotify';
import Button from '../base/Buttons/Button';

export default function Layout({ children }: LayoutProps): ReactElement {
  const spotify = useSpotifyContext();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (spotify) {
      spotify.getMe().then(() => setLogged(true))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [spotify]);

  return (
    <div className="flex flex-col p-8 space-y-16 items-center min-h-screen">
      <Header />
      {
        logged ?
          children
          : <div className="flex h-full items-center grow">
            <Button to={getLoginLink()}>Connexion avec Spotify</Button>
          </div>
      }
      <Footer />
    </div>
  );
}
