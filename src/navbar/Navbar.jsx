import React from 'react';

const Navbar = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  return (
    <nav className="navbar">
      <div className="container">
        <h2 className="logo">Christians blog</h2>
        <ul className="nav-links">
         <li><a onClick={scrollToTop}>Back to top</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
