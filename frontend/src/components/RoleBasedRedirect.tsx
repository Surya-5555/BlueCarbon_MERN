import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RoleBasedRedirectProps {
  children: React.ReactNode;
}

export const RoleBasedRedirect = ({ children }: RoleBasedRedirectProps) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && user) {
      const currentPath = location.pathname;
      
      // Define role-based default routes
      const roleRoutes: Record<string, string> = {
        'admin': '/admin-dashboard',
        'ngo': '/ngo-dashboard',
        'verifier': '/verifier-dashboard',
        'user': '/user-dashboard'
      };

      // If user is on root path or auth page, redirect to their role-based dashboard
      if (currentPath === '/' || currentPath === '/auth') {
        const defaultRoute = roleRoutes[user.role];
        if (defaultRoute) {
          navigate(defaultRoute, { replace: true });
        }
      }
      
      // If user is on a role-specific dashboard that doesn't match their role, redirect
      const roleSpecificPaths = [
        '/admin-dashboard',
        '/ngo-dashboard', 
        '/verifier-dashboard',
        '/user-dashboard'
      ];
      
      if (roleSpecificPaths.includes(currentPath)) {
        const expectedRole = currentPath.replace('-dashboard', '').replace('/', '');
        if (expectedRole !== user.role) {
          const correctRoute = roleRoutes[user.role];
          if (correctRoute) {
            navigate(correctRoute, { replace: true });
          }
        }
      }
    }
  }, [user, isAuthenticated, navigate, location.pathname]);

  return <>{children}</>;
};
