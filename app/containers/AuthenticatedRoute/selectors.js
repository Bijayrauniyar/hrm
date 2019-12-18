import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authenticatedRoute state domain
 */

const selectAuthenticatedRouteDomain = state =>
  state.authenticatedRoute || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AuthenticatedRoute
 */

const makeSelectAuthenticatedRoute = () =>
  createSelector(
    selectAuthenticatedRouteDomain,
    substate => substate,
  );

export default makeSelectAuthenticatedRoute;
export { selectAuthenticatedRouteDomain };
