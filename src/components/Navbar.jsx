import React from "react";
import "../style/navbar.css";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar text-center">
        <div className="container-fluid">
          <div className="navbar-brand">
            <div className="navbar-logo">
            <img src="heart.png" alt="gambar" className="gambar" />
            </div>
            <div className="navbar-name">
              Group 1
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
