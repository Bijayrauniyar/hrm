import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the managerPage state domain
 */

const selectManagerPageDomain = state => state.managerPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManagerPage
 */

const makeSelectManagerPage = () =>
  createSelector(
    selectManagerPageDomain,
    substate => substate,
  );

export default makeSelectManagerPage;
export { selectManagerPageDomain };
