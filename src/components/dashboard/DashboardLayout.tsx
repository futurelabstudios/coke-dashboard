import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { toast } from 'sonner';

export function DashboardLayout() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    toast.loading('Refreshing data...');
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast.dismiss();
      toast.success('Data refreshed successfully', {
        description: `Last updated: ${new Date().toLocaleTimeString()}`,
      });
    }, 1500);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar className="hidden lg:flex" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          title="Sales Intelligence Dashboard" 
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="container py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
