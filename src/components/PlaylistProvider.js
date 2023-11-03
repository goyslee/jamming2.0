//PlaylisProvider.js
import React, { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};

export const PlaylistProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <PlaylistContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </PlaylistContext.Provider>
  );
};
