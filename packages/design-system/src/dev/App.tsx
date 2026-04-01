import { RouterProvider } from 'react-router-dom';

import { UniConfigProvider } from '../components/config-provider/UniConfigProvider';
import { ANT_THEME_TOKEN } from '../theme/themeAntDesign';
import { devRouter } from './router/createRouter';

import './dev-runtime.scss';

export const App = () => (
  <UniConfigProvider theme={ANT_THEME_TOKEN}>
    <RouterProvider router={devRouter} />
  </UniConfigProvider>
);

export default App;
