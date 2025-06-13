const clientId = '8fd3fb21c50c401f9ff42d9b838f57a6'; // Replace this
const redirectUri = 'https://0d87-83-98-38-90.ngrok-free.app'; // Replace with your redirect URI
let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    // Check URL for access token
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresMatch) {
      accessToken = tokenMatch[1];
      expiresIn = Number(expiresMatch[1]);

      // Set timeout to clear token after expiration
      window.setTimeout(() => accessToken = '', expiresIn * 1000);

      // Clear token from URL
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      // Redirect to Spotify auth
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20playlist-modify-private&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location = authUrl;
    }
  }
};

export default Spotify;
