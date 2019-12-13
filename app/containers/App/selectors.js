import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectRouter = state => state.router;
const selectGlobal = state => state.global || initialState;

const makeSelectAuth = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.Auth,
  );
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export { makeSelectLocation, makeSelectAuth };
