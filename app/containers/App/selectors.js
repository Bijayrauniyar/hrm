import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectRouter = state => state.router;
const selectGlobal = state => state.global || initialState;

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export { makeSelectLocation, makeSelectUser };
