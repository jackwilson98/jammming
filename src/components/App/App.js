// src/components/App/App.js
import React, { useState } from 'react';
import Spotify from './util/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.module.css';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Add track to playlist if not already present
  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) return;
    setPlaylistTracks(prevTracks => [...prevTracks, track]);
  };

  // Remove track from playlist
  const removeTrack = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  // Update playlist name
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Search Spotify for tracks
  const search = async (term) => {
    console.log('Search term:', term);
    const results = await Spotify.search(term);
    console.log('Search results:', results);
    setSearchResults(results);
  };
  

  // Save playlist to Spotify and reset playlist
  const savePlaylist = async () => {
    const trackUris = playlistTracks.map(track => track.uri);
    const success = await Spotify.savePlaylist(playlistName, trackUris);
    if (success) {
      alert(`Playlist "${playlistName}" saved to Spotify!`);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      setSearchResults([]);
    } else {
      alert('Failed to save playlist. Please try again.');
    }
  };

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <SearchBar onSearch={search} />
      <div className="App">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
};

export default App;
