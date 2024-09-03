import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Card, CardHeader } from '../libs/shadcn-ui/components/card';
import { Avatar, AvatarFallback, AvatarImage } from '../libs/shadcn-ui/components/avatar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../modules/auth/hooks/use-auth-context';
import { paths } from '../utils/constant/path-config';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../libs/shadcn-ui/components/dropdown';
import { LogOut } from 'lucide-react';

function Layout(props) {
  const { children } = props;

  const navigate = useNavigate();
  const { user, onRemoveToken } = useAuthContext();

  const handleLogout = () => {
    onRemoveToken();
    navigate(paths.auth.login);
    return;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-6">
      <Card>
        <CardHeader className="flex-row justify-between items-center">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">Todo Apps</h2>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt={user.email} />
                <AvatarFallback>MY</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <div className="px-2 py-1.5">
                  <small className="text-sm font-medium leading-none">{user.email}</small>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2" size={16} />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
      </Card>

      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}

export default Layout;
