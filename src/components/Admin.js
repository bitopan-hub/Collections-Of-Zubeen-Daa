import React, { useState, useEffect } from "react";

function Admin() {
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const [songs, setSongs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem("songs")) || [];
    setSongs(storedSongs);
  }, []);

  const saveToLocalStorage = (updatedSongs) => {
    localStorage.setItem("songs", JSON.stringify(updatedSongs));
    setSongs(updatedSongs);
  };

  const handleSubmit = () => {
    if (!title || !album || !year || !link || !image) {
      alert("Please fill all fields");
      return;
    }

    const songData = { title, album, year, link, image };

    let updatedSongs;

    if (editIndex !== null) {
      updatedSongs = [...songs];
      updatedSongs[editIndex] = songData;
      setEditIndex(null);
    } else {
      updatedSongs = [...songs, songData];
    }

    saveToLocalStorage(updatedSongs);

    setTitle("");
    setAlbum("");
    setYear("");
    setLink("");
    setImage("");
  };

  const handleEdit = (index) => {
    const song = songs[index];
    setTitle(song.title);
    setAlbum(song.album);
    setYear(song.year);
    setLink(song.link);
    setImage(song.image);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedSongs = songs.filter((_, i) => i !== index);
    saveToLocalStorage(updatedSongs);
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>

      <input
        type="text"
        placeholder="Song Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Album Name"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
      />

      <input
        type="text"
        placeholder="Release Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        type="text"
        placeholder="YouTube Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <input
        type="text"
        placeholder="Album Image Path (e.g. /albums/mayabini.jpg)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editIndex !== null ? "Update Song" : "Add Song"}
      </button>

      <hr />

      <h3>Uploaded Songs</h3>

      {songs.map((song, index) => (
        <div key={index} className="admin-song-row">
          <span>{song.title}</span>
          <button onClick={() => handleEdit(index)}>Edit</button>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
