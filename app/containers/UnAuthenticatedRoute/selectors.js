import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the unAuthenticatedRoute state domain
 */

const selectUnAuthenticatedRouteDomain = state =>
  state.unAuthenticatedRoute || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UnAuthenticatedRoute
 */

const makeSelectUnAuthenticatedRoute = () =>
  createSelector(
    selectUnAuthenticatedRouteDomain,
    substate => substate,
  );

export default makeSelectUnAuthenticatedRoute;
export { selectUnAuthenticatedRouteDomain };
