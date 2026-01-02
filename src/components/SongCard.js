import React from "react";

function SongCard({ song }) {
  return (
    <div className="card">
      <img
        src={song.image}
        alt={song.title}
        className="album-img"
      />

      <h3>🎵 {song.title}</h3>
      <p>🎤 Artist: Zubeen Garg</p>
      <p>💿 Album: {song.album}</p>
      <p>📅 Year: {song.year}</p>

      <a href={song.link} target="_blank" rel="noreferrer">
        <button className="play-btn small">▶ Play</button>
      </a>
    </div>
  );
}

export default SongCard;
