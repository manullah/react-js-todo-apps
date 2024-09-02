import { useNavigate, useRouteError } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../libs/shadcn-ui/components/card';
import { Button } from '../libs/shadcn-ui/components/button';
import { paths } from '../utils/constant/path-config';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800">Oops! An Error Occurred</h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            We're sorry, but something went wrong. Our team has been notified and we're working on
            fixing it.
          </p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm text-gray-700 font-mono">
              {error.statusText || error.message || 'Unknown error'}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate(paths.root)}>Go to Homepage</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ErrorPage;
