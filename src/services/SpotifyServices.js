import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

export const setAccessToken = (token) => {
  spotifyApi.setAccessToken(token);
};

export const getToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
};

export const fetchTracks = async (query, accessToken) => {
  try {
    spotifyApi.setAccessToken(accessToken);
    const response = await spotifyApi.searchTracks(query);
    console.log("Raw Spotify Response:", response); // Log the raw response
    return response.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return []; // Return an empty array in case of an error
  }
};
