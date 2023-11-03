//Playlist.js
import React from 'react';
import Tracklist from './Tracklist';

function Playlist({ 
    playlistTracks, 
    onRemove, 
    onSave, 
    playlistName, 
    onNameChange, 
    onBackToPlaylists, 
    isEditing 
}) {
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="Playlist">
      <div className="Playlist-Controls">
        <button className="SaveButton" onClick={onSave}>
          {isEditing ? "UPDATE PLAYLIST ON SPOTIFY" : "SAVE TO SPOTIFY"}
        </button>
        {isEditing && (
          <button className="BackButton" onClick={onBackToPlaylists}>
            BACK TO PLAYLISTS
          </button>
        )}
          </div>
          {isEditing && (
              <h3>You are editing:
                  <br></br>
                  <h4>{playlistName}</h4>
                  <br></br>
          playlist.
        </h3>
      )}
          <br></br>
      <input 
        value={playlistName} 
        onChange={handleNameChange} 
        placeholder="Enter playlist name" 
        name={playlistName}
      />
      <Tracklist
        tracks={playlistTracks}
        onRemove={onRemove}
        isPlaylist={true}
      />
    </div>
  );
}

export default Playlist;
