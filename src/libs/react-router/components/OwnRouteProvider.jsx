import { RouterProvider } from 'react-router-dom';
import routes from '../routes';

const OwnRouterProvider = () => {
  return <RouterProvider router={routes} />;
};

export default OwnRouterProvider;
