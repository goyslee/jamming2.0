//App.js
import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';


function App() {
  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar />
      <div className="App-content">
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
