import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
      <nav className='Navbar'>
          <Link className='link' to="/"><img src='/logo2.png' alt='logo' id='logo'></img></Link>
        <ul className='Navbar-links'>
          <li><Link className='link' to="/">Home</Link></li>
          <li><Link className='link' to="/newmember">New Member</Link></li>
          <li><Link className='link' to="/details">Add Details</Link></li>
          <li><Link className='link' to="/member">Member Details</Link></li>
          <li><Link className='link' to="/members">All Members</Link></li>
        </ul>
      </nav>
  );
}

export default Navbar;
