import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Sidebar will be added here */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};
