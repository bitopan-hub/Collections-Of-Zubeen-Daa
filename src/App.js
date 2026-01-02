import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "./components/Admin";
import Client from "./components/Client";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Client</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Client />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
