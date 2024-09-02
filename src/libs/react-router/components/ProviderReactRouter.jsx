import { RouterProvider } from 'react-router-dom';
import routes from '../routes';

const ProviderReactRouter = () => {
  return <RouterProvider router={routes} />;
};

export default ProviderReactRouter;
