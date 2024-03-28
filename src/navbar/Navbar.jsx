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
      <div className="navContainer">
        <h2 className="navLogo">Christians blog</h2>
        <ul className="nav-links">
         <li><a onClick={scrollToTop}>Back to top</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
