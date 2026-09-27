/**
 * KrishiDrishti Client Router
 * Module 1: Project Foundation & Design System
 * 
 * Manages zero-dependency browser path routing with popstate event listeners
 * and smooth client-side transitions across all specified routes.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AppRoute =
  | '/language'
  | '/account-type'
  | '/register'
  | '/admin/login'
  | '/farmer/profile'
  | '/farmer/farm-setup'
  | '/service-provider/profile'
  | '/buyer/profile'
  | '/admin/dashboard'
  | '/farmer/dashboard'
  | '/dashboard'
  | '/farmer/calendar'
  | '/service-provider/dashboard'
  | '/buyer/dashboard'
  | '/weather'
  | '/crop-advisory'
  | '/farm-risk'
  | '/produce-management'
  | '/market-intelligence'
  | '/ai-assistant'
  | '/market'
  | '/tasks'
  | '/farm-services'
  | '/government-schemes'
  | '/farmer/crops'
  | '/design-system'
  | '/';

export const ALL_ROUTES: { path: AppRoute; label: string; group: 'Onboarding' | 'Profile Setup' | 'Dashboards' | 'System' }[] = [
  { path: '/language', label: 'Language Selection', group: 'Onboarding' },
  { path: '/account-type', label: 'Account Type', group: 'Onboarding' },
  { path: '/register', label: 'User Registration', group: 'Onboarding' },
  { path: '/admin/login', label: 'Admin Login', group: 'Onboarding' },

  { path: '/farmer/profile', label: 'Farmer Profile', group: 'Profile Setup' },
  { path: '/farmer/farm-setup', label: 'Farm Setup & Crops', group: 'Profile Setup' },
  { path: '/service-provider/profile', label: 'Service Provider Profile', group: 'Profile Setup' },
  { path: '/buyer/profile', label: 'Buyer Profile', group: 'Profile Setup' },

  { path: '/farmer/dashboard', label: 'Farmer Dashboard', group: 'Dashboards' },
  { path: '/weather', label: 'Weather & Farm Intelligence', group: 'Dashboards' },
  { path: '/crop-advisory', label: 'Crop Advisory (Coming Soon)', group: 'Dashboards' },
  { path: '/farm-risk', label: 'Farm Risk (Coming Soon)', group: 'Dashboards' },
  { path: '/produce-management', label: 'Produce Management (Coming Soon)', group: 'Dashboards' },
  { path: '/market-intelligence', label: 'Market Intelligence (Coming Soon)', group: 'Dashboards' },
  { path: '/ai-assistant', label: 'AI Assistant (Coming Soon)', group: 'Dashboards' },
  { path: '/farmer/calendar', label: 'Farmer Calendar', group: 'Dashboards' },
  { path: '/government-schemes', label: 'Government Schemes (Coming Soon)', group: 'Dashboards' },
  { path: '/service-provider/dashboard', label: 'Service Provider Dashboard', group: 'Dashboards' },
  { path: '/buyer/dashboard', label: 'Buyer Dashboard', group: 'Dashboards' },
  { path: '/admin/dashboard', label: 'Admin Dashboard', group: 'Dashboards' },

  { path: '/design-system', label: 'Design System Showcase', group: 'System' },
];

interface RouterContextValue {
  currentPath: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  currentPath: '/language',
  navigate: () => {},
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path === '/' ? '/language' : path;
    }
    return '/language';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path === '/' ? '/language' : path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', to);
      setCurrentPath(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  return useContext(RouterContext);
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function useLocation() {
  const { currentPath } = useContext(RouterContext);
  return { pathname: currentPath };
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ to, children, className, onClick, ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};
