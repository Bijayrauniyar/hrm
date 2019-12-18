/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { makeSelectUser } from '../App/selectors';

function HomePage({ user }) {
  return (
    <>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <h2>Welcome {user.name} !!</h2>
    </>
  );
}

HomePage.propTypes = {
  user: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});
const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(HomePage);
