/**
 *
 * Header
 *
 */

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <>
      <Navbar bg="light">
        <Nav className="mr-auto">
          <Link style={{ padding: '0.25em 2em' }} to="/">
            Home
          </Link>
          <Link style={{ padding: '0.25em 2em' }} to="/login">
            Login
          </Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
