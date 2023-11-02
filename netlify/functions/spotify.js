//spotify.js
import axios from 'axios';

exports.handler = async function(event, context) {
    const endpoint = "https://api.spotify.com/v1/"; // Spotify API endpoint
    const path = event.queryStringParameters.path; // Get the desired path from query parameters
    const token = event.headers.authorization; // Get the Spotify token from headers

    try {
        const response = await axios.get(`${endpoint}${path}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
               
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: error.response ? error.response.status : 500,
            body: JSON.stringify(error.response ? error.response.data : {}),
        };
    }
};
