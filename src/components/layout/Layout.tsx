import React, { ReactElement, useEffect, useState } from 'react';
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
    <div className="flex flex-col p-8 space-y-16 items-center">
      <Header />
      {
        logged ?
          children
          : <Button to={getLoginLink()}>Connexion</Button>
      }
      <Footer />
    </div>
  );
}
