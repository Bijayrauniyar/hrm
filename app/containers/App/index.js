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
import { logout } from '../Login/actions';
import UnAuthenticatedRoute from '../UnAuthenticatedRoute/index';
import AdminPage from '../AdminPage/Loadable';
import { Role } from '../../utils/role';
import ManagerPage from '../ManagerPage/Loadable';
import Authorization from '../Authorization/index';
function App(props) {
  const logoutEvent = () => {
    props.onLogout();
  };

  const Home = Authorization([Role.USER, Role.ADMIN, Role.MANAGER]);
  const Admin = Authorization([Role.ADMIN, Role.MANAGER]);
  const Manager = Authorization([Role.MANAGER]);

  return (
    <div>
      <Header user={props.user} logout={logoutEvent} />
      <Switch>
        <UnAuthenticatedRoute exact path="/login" component={Login} />
        <UnAuthenticatedRoute exact path="/signup" component={Signup} />
        <Route exact path="/" component={Home(HomePage)} />
        <Route exact path="/manager" component={Manager(ManagerPage)} />
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
