//AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const login = (token) => {
    setAccessToken(token);
    spotifyApi.setAccessToken(token);
  };

  const logout = () => {
    setAccessToken(null);
    spotifyApi.setAccessToken('');
    // Redirect to Spotify logout or clear the session
    window.location = 'https://www.spotify.com/logout/';
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
