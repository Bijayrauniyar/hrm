/**
 *
 * AuthenticatedRoute
 *
 */

import React, { memo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAuthenticatedRoute from './selectors';
import { makeSelectUser } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';

export function AuthenticatedRoute({
  component: Component,
  user,
  userRole,
  ...rest
}) {
  useInjectReducer({ key: 'authenticatedRoute', reducer });
  useInjectSaga({ key: 'authenticatedRoute', saga });

  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: '/login' }} />;
        }

        // check if route is restricted by role
        if (userRole && userRole !== user.role) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: '/' }} />;
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
    //   <Route
    //   {...rest}
    //   render={prop =>
    //     user ? <Component {...prop} /> : <Redirect to="/login" />
    //   }
    // />
  );
}

AuthenticatedRoute.propTypes = {
  dispatch: PropTypes.func,
  component: PropTypes.func,
  children: PropTypes.node,
  user: PropTypes.object,
  userRole: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  authenticatedRoute: makeSelectAuthenticatedRoute(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AuthenticatedRoute);
