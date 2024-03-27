import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h2 className="logo">Christian blog</h2>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">New post</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
