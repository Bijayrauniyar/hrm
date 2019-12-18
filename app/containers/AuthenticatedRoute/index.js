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

export function AuthenticatedRoute({ component: Component, user, ...rest }) {
  useInjectReducer({ key: 'authenticatedRoute', reducer });
  useInjectSaga({ key: 'authenticatedRoute', saga });

  return (
    <Route
      {...rest}
      render={prop =>
        user != null ? <Component {...prop} /> : <Redirect to="/login" />
      }
    />
  );
}

AuthenticatedRoute.propTypes = {
  dispatch: PropTypes.func,
  component: PropTypes.func,
  children: PropTypes.node,
  user: PropTypes.object,
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
