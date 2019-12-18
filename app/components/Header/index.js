/**
 *
 * Header
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../../containers/Login/actions';
function Header(props) {
  if (props.user) {
    return (
      <>
        <Navbar bg="light">
          <Nav className="mr-auto">
            <Link style={{ padding: '0.25em 2em' }} to="/">
              Home
            </Link>
            <Link
              onClick={() => props.dispatch(logout())}
              style={{ padding: '0.25em 2em' }}
              to="/login"
            >
              Logout
            </Link>
          </Nav>
        </Navbar>
      </>
    );
  }
  return (
    <>
      <Navbar bg="light">
        <Nav className="mr-auto">
          <Link style={{ padding: '0.25em 2em' }} to="/login">
            Login
          </Link>
          <Link style={{ padding: '0.25em 2em' }} to="/signup">
            Signup
          </Link>
        </Nav>
      </Navbar>
    </>
  );
}

Header.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Header;
