import { Home, ShoppingCart, LayoutDashboard, LogIn, LogOut, User } from 'lucide-react';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (!user) return '/auth';
    switch (user.role) {
      case 'admin': return '/admin-dashboard';
      case 'ngo': return '/ngo-dashboard';
      case 'verifier': return '/verifier-dashboard';
      default: return '/user-dashboard';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = isAuthenticated ? [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Marketplace', url: '/marketplace', icon: ShoppingCart },
    { name: 'Dashboard', url: getDashboardPath(), icon: LayoutDashboard },
  ] : [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Marketplace', url: '/marketplace', icon: ShoppingCart },
    { name: 'Sign In', url: '/auth', icon: LogIn },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pt-6">
        <div className="flex items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center">
            <NavBar items={navItems} showLogo={false} />
          </div>

          {/* User Info and Logout */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-ocean text-white font-semibold">
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground capitalize">
                      {user.role} Account
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
      
      {/* Spacer to prevent content underlap with fixed top navbar */}
      <div className="h-20" />
    </>
  );
};
