import { useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { AISummary } from '@/components/dashboard/AISummary';
import { AIChatbot } from '@/components/dashboard/AIChatbot';
import { toast } from 'sonner';

export function DashboardLayout() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const location = useLocation();

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
          title="Sales Intelligence" 
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-4 sm:px-6 sm:py-6">
            <div className="mb-4 sm:mb-6">
              <AISummary currentPath={location.pathname} />
            </div>
            <Outlet />
          </div>
        </main>
      </div>

      {/* AI Chatbot - floating */}
      <AIChatbot />
    </div>
  );
}
