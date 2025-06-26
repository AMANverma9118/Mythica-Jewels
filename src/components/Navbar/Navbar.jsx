import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png'
import menueIcon from '../../assets/menu-icon.png'
import SearchIcon from '../../assets/SearchIcon.png'
import cartIcon from '../../assets/AddtoCartIcon.png'
import './Navbar.css'

//Link is used on bhealf on ancher tag "a" but it doesn't do the page refresh and In this Link instead of "hreaf" we write "to"

function Navbar() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    })
  })

  const [mobileMenu, setMobileMenu] = useState(false);
  const ToggleMenu = () => {
    console.log(mobileMenu);
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  }


  return (
    <nav className={`navbar ${sticky ? 'dark-nav' : ''}`}>
      {/* Left: Logo */}
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <span className="brand-name">Mythica Jewels</span>
      </div>

      {/* Center: Links */}
      <ul className="nav-links">
        <li><Link to="Hero" smooth offset={0} duration={500}>Home</Link></li>
        <li><Link to="about" smooth offset={-150} duration={500}>About</Link></li>
        <li><Link to="contact" smooth offset={-260} duration={500}>Contact</Link></li>
      </ul>

      {/* Right: Search + Cart */}
      <div className="nav-right">
        <div className="search-section">
          <label htmlFor="search">
          <img src={SearchIcon} alt="search" className="icon" />
          </label>
          <span>
            <input type="search" name="SearchProduct" id="search" placeholder='Search' />
          </span>
        </div>
        <img src={cartIcon} alt="cart" className="icon cart" />
      </div>
      <img src={menueIcon} alt="" className='menu-icon' onClick={ToggleMenu}/>
    </nav>
  );
}

export default Navbar
