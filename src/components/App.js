import React, { useState, useEffect } from 'react';
import { fetchTracks } from '../services/SpotifyServices';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

function App() {
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessTokenState] = useState(null);

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
    
    if (hash.access_token) {
      setAccessTokenState(hash.access_token);
      window.location.hash = '';  // Clear the URL hash
    }
  }, []);

  const handleLogin = () => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = 'http://localhost:3000/callback';
    const scopes = 'user-read-private user-read-email';
    window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}&response_type=token`;
  };

  const handleSearch = async (query) => {
    if (accessToken) {
      try {
        const results = await fetchTracks(query, accessToken);
        setTracks(results);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    } else {
      console.error("No access token available");
    }
  };

  return (
    <div className="App">
      {!accessToken ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <>
          <h1>Jammming</h1>
          <SearchBar onSearch={handleSearch} />
          <div className="App-content">
            <SearchResults tracks={tracks} />
            <Playlist />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
