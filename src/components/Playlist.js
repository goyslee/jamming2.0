//Playlist.js
import React from "react";
import Tracklist from "./Tracklist";

function Playlist({
  playlistTracks,
  onRemove,
  onSave,
  playlistName,
  onNameChange,
  onBackToPlaylists,
  isEditing,
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
      {isEditing ? (
        <>
          <h3>You are editing Spotify Playlist</h3>
          <br></br>
          <h4>{playlistName.toUpperCase()}</h4>
          <br></br>
          <h3>Update Your Spotify Playlist Name Here:</h3>
          <p>(Not Mandatory)</p>
          <br></br>
        </>
      ) : (
        <>
          <h2>Create playlist</h2>
          <h3>Add Your NEW Spotify Playlist Name Here:</h3>
          <br></br>
        </>
      )}
      <input
        id="playlistNameInput"
        value={playlistName}
        onChange={handleNameChange}
        placeholder="Enter playlist name"
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
