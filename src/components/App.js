
// App.js
import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
// import crypto from 'crypto';
import { fetchTracks, createPlaylist, addTracksToPlaylist, unfollowSpotifyPlaylist } from '../services/SpotifyServices';
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
  const [isEditing, setIsEditing] = useState(false);
  // const [forceUpdate, setForceUpdate] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  

  


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
            window.history.replaceState(null, null, ' ');

  // Clear the URL hash
        }
    }, []);

    useEffect(() => {
        const fetchUserPlaylists = async () => {
            if (!accessToken) return;
            spotifyApi.setAccessToken(accessToken);
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
    }, [accessToken]);

  

    
    const handleLogin = () => {
        const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || process.env.REACT_APP_REDIRECT_URI1

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

    const onExitEditView = () => {
      setPlaylistTracks([]); // Clear the current tracks
      setPlaylistName('');   // Clear the current playlist name
    };
    
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

  
const savePlaylist = async () => {
    const trackURIs = playlistTracks.map(track => track.uri);

    try {
        const userId = await spotifyApi.getMe().then(response => response.id);

        if (selectedPlaylistId) {
            // Update existing playlist
            await spotifyApi.changePlaylistDetails(selectedPlaylistId, { name: playlistName });
            await spotifyApi.replaceTracksInPlaylist(selectedPlaylistId, trackURIs);
            alert('Playlist updated on Spotify!');
        } else {
            // Create a new playlist
            const newPlaylist = await createPlaylist(userId, playlistName, accessToken);
            const playlistId = newPlaylist.id;
            await addTracksToPlaylist(playlistId, trackURIs, accessToken);
            alert('Playlist saved to Spotify!');
        }

        // Reset states
        setPlaylistName('');
        setPlaylistTracks([]);
        setSelectedPlaylistId(null);
        setIsEditing(false);
        fetchUserPlaylists();  // Refresh the list of playlists

    } catch (error) {
        console.error('Error saving/updating playlist:', error.response ? error.response.data : error.message);
    }
};



    const removeTrack = (track) => {
        setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
    };

  const handleEditPlaylist = async (playlistId) => {
    // Fetch the tracks of the selected playlist and set them to playlistTracks
    try {
        const playlistData = await spotifyApi.getPlaylist(playlistId);
        const extractedTracks = playlistData.tracks.items.map(item => ({
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists[0].name,
            album: item.track.album.name,
            uri: item.track.uri
        }));
        setPlaylistTracks(extractedTracks);
      setPlaylistName(playlistData.name);
      setIsEditing(true); 
      setSelectedPlaylistId(playlistId);
    } catch (error) {
        console.error("Error fetching playlist data:", error);
    }
};


    const handleUnfollowPlaylist = async (playlistId) => {
        try {
            await unfollowSpotifyPlaylist(playlistId, accessToken);
            const updatedPlaylists = playlists.filter(playlist => playlist.id !== playlistId);
            setPlaylists(updatedPlaylists);
        } catch (error) {
            console.error("Error deleting playlist:", error);
        }
    };

    const handleBackToPlaylists = () => {
      setPlaylistTracks([]);  // Clear the tracks of the currently edited playlist
      setPlaylistName('');    // Reset the playlist name
      setIsEditing(false);    // Set isEditing back to false
    };

    const handleLogout = () => {
      setAccessTokenState(null); // Clear the access token from state
      window.location = 'https://www.spotify.com/logout/'; // Redirect to Spotify logout
    };

  
    return (
      <div className="App">
        {accessToken && (
            <button className="LogoutButton" onClick={handleLogout} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                Logout
            </button>
        )}
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
                                    accessToken={accessToken} 
                                    onNameChange={setPlaylistName}
                                    onTrackChange={setPlaylistTracks}
                                    onExitEditView={onExitEditView}
                                    isEditing={isEditing}
                                    onBackToPlaylists={handleBackToPlaylists}
                                />
                            </div>
                            <div className="playlists">
                                <h2>Your Playlists on Spotify</h2>
                                <ul>
                                    {playlists.map((playlist, index) => (
                                        <li key={index}>
                                            <span onClick={() => handleEditPlaylist(playlist.id)}>
                                                {playlist.name}
                                            </span>
                                            <button onClick={() => handleUnfollowPlaylist(playlist.id)}>Delete</button>
                                        </li>
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
