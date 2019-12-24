/**
 *
 * WithAuthorization
 *
 */

import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
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

const Authorization = allowedRoles => WrappedComponent => {
  function WithAuthorization(props) {
    useInjectReducer({ key: 'authorization', reducer });
    useInjectSaga({ key: 'authorization', saga });

    if (!props.user) {
      // not logged in so redirect to login page
      return <Redirect to="/login" />;
    }
    const { role } = props.user;
    if (allowedRoles.includes(role)) {
      return <WrappedComponent {...props} />;
    }
    return <h1>No page for you!</h1>;
  }
  WithAuthorization.propTypes = {
    dispatch: PropTypes.func,
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

  return compose(
    withConnect,
    memo,
  )(WithAuthorization);
};
export default Authorization;
