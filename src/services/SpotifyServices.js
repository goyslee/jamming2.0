const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

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

export const fetchTracks = async (query) => {
  let token = await getToken();
  let response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  // Check for a 401 status code (Unauthorized)
  if (response.status === 401) {
    // Token has expired. Fetch a new token and retry the request.
    token = await getToken();
    response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  // Handle other potential errors
  if (!response.ok) {
    throw new Error(`Spotify API request failed with status: ${response.status}`);
  }

  const data = await response.json();
  return data.tracks.items;
};

