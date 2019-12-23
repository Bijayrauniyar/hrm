/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from 'containers/Login/Loadable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Signup from 'containers/Signup/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { createStructuredSelector } from 'reselect';
import GlobalStyle from '../../global-styles';
import Header from '../../components/Header/index';
import { makeSelectUser } from './selectors';
import AuthenticatedRoute from '../AuthenticatedRoute/Loadable';
import { logout } from '../Login/actions';
import UnAuthenticatedRoute from '../UnAuthenticatedRoute/index';
import AdminPage from '../AdminPage/Loadable';
import { Role } from '../../utils/role';

import Authorization from '../Authorization';
function App(props) {
  const logoutEvent = () => {
    props.onLogout();
  };

  const Admin = Authorization([Role.USER, Role.ADMIN]);

  return (
    <div>
      <Header user={props.user} logout={logoutEvent} />
      <Switch>
        <UnAuthenticatedRoute exact path="/login" component={Login} />
        <UnAuthenticatedRoute exact path="/signup" component={Signup} />
        {/* <PrivateRoute exact path="/" component={HomePage} /> */}
        <AuthenticatedRoute exact path="/" component={HomePage} />
        {/* <AuthenticatedRoute
          exact
          userRole={Role.ADMIN}
          path="/admin"
          component={AdminPage}
        /> */}
        <Route exact path="/admin" component={Admin(AdminPage)} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
