import './App.css'
import Layout from './components/layout/Layout'
import PlaylistCreator from './PlaylistCreator'
import { SpotifyContextProvider } from './utils/SpotifyContext';

function App() {
  return (
    <SpotifyContextProvider>
      <Layout>
        <PlaylistCreator />
      </Layout>
    </SpotifyContextProvider>
  )
}

export default App
