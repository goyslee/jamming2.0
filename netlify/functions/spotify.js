//spotify.js
// In your Netlify function (e.g., spotify-token-exchange.js)
import axios from 'axios';

const handler = async (event) => {
  const { code } = JSON.parse(event.body);
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
  };

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', params, { headers });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
   } catch (error) {
    console.error('Error exchanging authorization code:', error);
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({
        error: error.response ? error.response.data.error : 'Internal Server Error',
        error_description: error.response ? error.response.data.error_description : 'An unexpected error occurred'
      }),
    };
  }
};

module.exports = { handler };