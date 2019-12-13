/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from 'containers/Login/Loadable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { createStructuredSelector } from 'reselect';
import GlobalStyle from '../../global-styles';
import Header from '../../components/Header/index';
import { makeSelectUser } from './selectors';

function App({ user }) {
  // eslint-disable-next-line react/prop-types
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  user: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});
const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(App);
