import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../../pages/board-page';
import LoginPage from '../../pages/login-page';
import RegisterPage from '../../pages/register-page';
import ErrorPage from '../../pages/error-page';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

export default routes;
