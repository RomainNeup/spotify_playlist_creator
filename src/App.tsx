import './App.css'
import Layout from './components/layout/Layout'
import PlaylistCreator from './PlaylistCreator'
import { PlaylistContextProvider } from './utils/PlaylistContext';
import { SpotifyContextProvider } from './utils/SpotifyContext';

function App() {
  return (
    <SpotifyContextProvider>
      <PlaylistContextProvider>
        <Layout>
          <PlaylistCreator />
        </Layout>
      </PlaylistContextProvider>
    </SpotifyContextProvider>
  )
}

export default App
