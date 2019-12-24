/**
 *
 * ManagerPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectManagerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ManagerPage() {
  useInjectReducer({ key: 'managerPage', reducer });
  useInjectSaga({ key: 'managerPage', saga });

  return (
    <div>
      <Helmet>
        <title>ManagerPage</title>
        <meta name="description" content="Description of ManagerPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ManagerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managerPage: makeSelectManagerPage(),
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
)(ManagerPage);
