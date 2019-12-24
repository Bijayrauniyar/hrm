/**
 *
 * Asynchronously loads the component for ManagerPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
