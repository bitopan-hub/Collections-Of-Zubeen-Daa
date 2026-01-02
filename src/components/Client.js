import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";

function Client() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem("songs")) || [];
    setSongs(storedSongs);
  }, []);

  return (
    <div className="container">
      <h2>🎧 Tribute to Our Zubeen Daa</h2>


      <div className="card-container">
        {songs.length === 0 && <p>No songs uploaded yet.</p>}

        {songs.map((song, index) => (
          <SongCard key={index} song={song} />
        ))}
      </div>
    </div>
  );
}

export default Client;
