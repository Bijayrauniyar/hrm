/**
 *
 * Header
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Role } from '../../utils/role';
function Header(props) {
  if (props.user) {
    return (
      <>
        <Navbar bg="light">
          <Nav className="mr-auto">
            <Link style={{ padding: '0.25em 2em' }} to="/">
              Home
            </Link>
            {props.user.role === Role.ADMIN && (
              <>
                <Link style={{ padding: '0.25em 2em' }} to="/admin">
                  Admin
                </Link>
                <Link style={{ padding: '0.25em 2em' }} to="/manager">
                  check Manager
                </Link>
              </>
            )}
            {props.user.role === Role.MANAGER && (
              <>
                <Link style={{ padding: '0.25em 2em' }} to="/admin">
                  Admin
                </Link>
                <Link style={{ padding: '0.25em 2em' }} to="/manager">
                  Manager
                </Link>
              </>
            )}
            {props.user.role === Role.USER && (
              <>
                <Link style={{ padding: '0.25em 2em' }} to="/admin">
                  check Admin
                </Link>
                <Link style={{ padding: '0.25em 2em' }} to="/manager">
                  check Manager
                </Link>
              </>
            )}

            <Link
              onClick={() => props.logout()}
              style={{ padding: '0.25em 2em' }}
              to="/"
            >
              Logout
            </Link>
            <Link style={{ padding: '0.25em 2em' }} to="/any">
              any
            </Link>

            <Link style={{ padding: '0.25em 2em' }} to="/login">
              check Login
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
  logout: PropTypes.func,
};

export default Header;
