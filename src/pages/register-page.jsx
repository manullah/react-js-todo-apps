import { Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '../libs/shadcn-ui/components/card';
import { Input } from '../libs/shadcn-ui/components/input';
import { Button } from '../libs/shadcn-ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../libs/shadcn-ui/components/form';
import { useAuthRegisterForm } from '../modules/auth/hooks/use-auth-register-form';
import { paths } from '../utils/constant/path-config';

function RegisterPage() {
  const navigate = useNavigate();

  const { form, isLoading, onSubmit } = useAuthRegisterForm({
    onSuccess: data => {
      alert(data.message);
      navigate(paths.auth.login);
    },
  });

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">Register</h2>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="Enter your email" className="pl-10" {...field} />
                          <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            className="pl-10"
                            {...field}
                          />
                          <Lock
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Sign up'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Link to={paths.auth.login} className="text-sm text-blue-600 hover:underline">
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default RegisterPage;
