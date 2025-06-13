import React, { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from './util/Spotify';

useEffect(() => {
  Spotify.getAccessToken()
}, [])

const App = () => {
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const addTrack = (track) => {
    setPlaylistTracks((prevTracks) => {
      if (prevTracks.find((savedTrack) => savedTrack.id === track.id)) {
        return prevTracks;
      }
      return [...prevTracks, track];
    });
  };

  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((savedTrack) => savedTrack.id !== track.id)
    );
  };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchResults searchResults={searchResults} onAdd={addTrack} />
      <Playlist
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        onRemove={removeTrack}
        onNameChange={updatePlaylistName}
      />
    </div>
  );
};

export default App;
