import React, { useState, useEffect } from "react";

function Admin() {
  /* ---------- LOGIN STATE ---------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* ---------- SONG FORM STATE ---------- */
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const [songs, setSongs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  /* ---------- LOAD LOGIN + SONGS ---------- */
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") setIsLoggedIn(true);

    const storedSongs = JSON.parse(localStorage.getItem("songs")) || [];
    setSongs(storedSongs);
  }, []);

  /* ---------- LOGIN HANDLER ---------- */
  const handleLogin = () => {
    // simple hardcoded credentials (for project/viva)
    if (username === "Bitopan" && password === "Bito123") {
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
  };

  /* ---------- SONG FUNCTIONS ---------- */
  const clearForm = () => {
    setTitle("");
    setAlbum("");
    setYear("");
    setLink("");
    setImage("");
    setEditIndex(null);
  };

  const saveSong = () => {
    if (!title || !album || !year || !link || !image) {
      alert("Please fill all fields");
      return;
    }

    const song = { title, album, year, link, image };
    let updatedSongs = [...songs];

    if (editIndex !== null) {
      updatedSongs[editIndex] = song;
      alert("Song updated successfully ✏️");
    } else {
      updatedSongs.push(song);
      alert("Song uploaded successfully 🎵");
    }

    setSongs(updatedSongs);
    localStorage.setItem("songs", JSON.stringify(updatedSongs));
    clearForm();
  };

  const editSong = (index) => {
    const song = songs[index];
    setTitle(song.title);
    setAlbum(song.album);
    setYear(song.year);
    setLink(song.link);
    setImage(song.image);
    setEditIndex(index);
  };

  /* ---------- LOGIN PAGE ---------- */
  if (!isLoggedIn) {
    return (
      <div className="container">
        <h2>🔐 Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p style={{ marginTop: "10px", fontSize: "13px", opacity: 0.8 }}>
          Demo Login → <strong>Username: Bitopan / Password: Bitopan123</strong>
        </p>
      </div>
    );
  }

  /* ---------- ADMIN DASHBOARD ---------- */
  return (
    <div className="container">
      <h2>🎛 Admin Dashboard</h2>

      <button
        onClick={handleLogout}
        className="play-btn small"
        style={{ marginBottom: "20px" }}
      >
        Logout
      </button>

      {/* Song Form */}
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
        placeholder="YouTube Song Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <input
        type="text"
        placeholder="Album Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={saveSong}>
        {editIndex !== null ? "Update Song" : "Upload Song"}
      </button>

      {/* Uploaded Songs */}
      <h2 style={{ marginTop: "35px", fontSize: "22px" }}>
        🎼 Uploaded Songs
      </h2>

      {songs.length === 0 && <p>No songs uploaded yet.</p>}

      {songs.map((song, index) => (
        <div
          key={index}
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span>
            <strong>{song.title}</strong> ({song.album})
          </span>

          <button
            className="play-btn small"
            onClick={() => editSong(index)}
          >
            ✏️ Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
