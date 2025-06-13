// src/util/Spotify.js

const clientId = '8fd3fb21c50c401f9ff42d9b838f57a6';
const redirectUri = 'https://0d87-83-98-38-90.ngrok-free.app';
let accessToken = '';
let expiresIn = 0;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check URL for access token and expiration time
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);

      // Clear token after expiration time
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      // Clean URL removing token info
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      // Redirect user to Spotify authorization page
      const authUrl = 
        `https://accounts.spotify.com/authorize?client_id=${clientId}` +
        `&response_type=token` +
        `&scope=playlist-modify-public` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location = authUrl;
    }
  },

  async search(term) {
    const token = this.getAccessToken();
    if (!token) return [];

    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;

    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch search results from Spotify');

      const jsonResponse = await response.json();

      if (!jsonResponse.tracks) return [];

      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) return;

    const token = this.getAccessToken();
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };
    let userId;

    try {
      // Get Spotify User ID
      const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
      if (!userResponse.ok) throw new Error('Failed to get user ID from Spotify');
      const userData = await userResponse.json();
      userId = userData.id;

      // Create a new playlist
      const createPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: playlistName }),
        }
      );
      if (!createPlaylistResponse.ok) throw new Error('Failed to create playlist on Spotify');
      const playlistData = await createPlaylistResponse.json();

      // Add tracks to the playlist
      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uris: trackUris }),
        }
      );

      if (!addTracksResponse.ok) throw new Error('Failed to add tracks to playlist');

      return true;  // Indicate success
    } catch (error) {
      console.error(error);
      return false;  // Indicate failure
    }
  },
};

export default Spotify;