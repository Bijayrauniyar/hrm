/**
 *
 * UnAuthenticatedRoute
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectUser } from '../App/selectors';
import makeSelectUnAuthenticatedRoute from './selectors';
import reducer from './reducer';
import saga from './saga';

export function UnAuthenticatedRoute({
  component: Component,
  user,
  auth,
  ...rest
}) {
  useInjectReducer({ key: 'unAuthenticatedRoute', reducer });
  useInjectSaga({ key: 'unAuthenticatedRoute', saga });

  return (
    <Route
      {...rest}
      render={prop =>
        !user ? <Component {...prop} /> : <>{prop.history.push('/')}</>
      }
    />
  );
}

UnAuthenticatedRoute.propTypes = {
  dispatch: PropTypes.func,
  component: PropTypes.func,
  user: PropTypes.object,
  auth: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  unAuthenticatedRoute: makeSelectUnAuthenticatedRoute(),
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
)(UnAuthenticatedRoute);
