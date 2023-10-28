import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { fetchTracks } from '../services/SpotifyServices';
import { createPlaylist, addTracksToPlaylist } from '../services/SpotifyServices';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import './App.css';


const spotifyApi = new SpotifyWebApi();

function App() {
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessTokenState] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
   const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState([]);

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

  useEffect(() => {
      const fetchUserPlaylists = async () => {
  if (!accessToken) return; // Ensure you have the access token

  spotifyApi.setAccessToken(accessToken); // Set the access token for Spotify API

  try {
    const response = await spotifyApi.getUserPlaylists();
    if (response && response.items) {
      setPlaylists(response.items);
    }
  } catch (error) {
    console.error("Error fetching user playlists:", error);
  }
};
  fetchUserPlaylists();
}, [accessToken]); // Dependency array ensures this runs when accessToken changes


  const handleLogin = () => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = 'http://localhost:3000/callback';
    const scopes = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';

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

   const addTrack = (track) => {
    if (!playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
   }
   };
  
  const savePlaylist = async () => {
    console.log("savePlaylist function called");
  // if (!playlistTracks.length) return;

  const trackURIs = playlistTracks.map(track => track.uri);
    


    try {
      
      // Get the user's ID
      console.log("Getting user's ID...");
      const userId = await spotifyApi.getMe().then(response => response.id);
      console.log("User ID:", userId);

      // Create a new playlist
      console.log("Creating a new playlist...");
      const newPlaylist = await createPlaylist(userId, playlistName, accessToken);
      console.log("New Playlist:", newPlaylist);

      console.log("Adding tracks to the new playlist...");
      const playlistId = newPlaylist.id;
      console.log("Tracks added to playlist");

      // Add tracks to the new playlist
      await addTracksToPlaylist(playlistId, trackURIs, accessToken);

      alert('Playlist saved to Spotify!');
      setPlaylistName(''); 
    } catch (error) {
    console.error('Error saving playlist:', error.response ? error.response.data : error.message);
}
  };

  const removeTrack = (track) => {
  setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
};

  
  //  const handleCreatePlaylist = () => {
  //   if (playlistName) {
  //     setPlaylists(prevPlaylists => [...prevPlaylists, { name: playlistName, tracks: [] }]);
  //     setPlaylistName('');  // Reset the input field
  //   }
  // };


  return (
    <div className="App">
      {!accessToken ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <>
          <h1>Jammming 2.0</h1>
          <SearchBar onSearch={handleSearch} />
            <div className="App-content">
              <div className="left-section">
                <SearchResults tracks={tracks} onAdd={addTrack} />
              </div>
               <div className="right-section">
                <div className="my-playlist">
                  <Playlist
                    playlistTracks={playlistTracks}
                    onSave={savePlaylist}
                    onRemove={removeTrack}
                    playlistName={playlistName} 
  
                    onNameChange={setPlaylistName}
                    onTrackChange={setPlaylistTracks}
                  />
               <br></br>   
             
                </div>
                
              <div className="playlists">
              <h2>Your Playlists on Spotify</h2>
              <ul>
                {playlists.map((playlist, index) => (
                  <li key={index}>{playlist.name}</li>
                ))}
              </ul>
        </div>

              </div>
              </div>
        </>
      )}
    </div>
  );
}

export default App;
