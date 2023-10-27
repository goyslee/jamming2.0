// App.js
import React, { useState } from 'react';
import { fetchTracks } from '../services/SpotifyServices';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

function App() {
  const [tracks, setTracks] = useState([]);

  const handleSearch = async (query) => {
    try {
      const results = await fetchTracks(query);
      setTracks(results);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      // Handle the error appropriately here, e.g., set an error state and display an error message to the user
    }
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="App-content">
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
