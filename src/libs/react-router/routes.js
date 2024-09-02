import { createBrowserRouter } from 'react-router-dom';

import { paths } from '../../utils/constant/path-config';
import { guardOnly, guessOnly } from '../../modules/auth/utils';

import HomePage from '../../pages/board-page';
import LoginPage from '../../pages/login-page';
import RegisterPage from '../../pages/register-page';
import ErrorPage from '../../pages/error-page';

const routes = createBrowserRouter([
  {
    path: paths.root,
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: guardOnly,
  },
  {
    path: paths.auth.login,
    element: <LoginPage />,
    loader: guessOnly,
  },
  {
    path: paths.auth.register,
    element: <RegisterPage />,
    loader: guessOnly,
  },
]);

export default routes;
