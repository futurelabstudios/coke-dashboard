import { Bell, Search, User, RefreshCw, LogOut, Settings, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  time: string;
}

interface HeaderProps {
  title?: string;
  className?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function Header({ 
  title = 'Sales Intelligence', 
  className,
  onRefresh,
  isRefreshing = false,
}: HeaderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Impure Cooler Alert', description: '3 stores reported impure coolers in Chandigarh', read: false, time: '5m ago' },
    { id: '2', title: 'Missing Cooler Stores', description: '12 stores missing cooler presence this week', read: false, time: '1h ago' },
    { id: '3', title: 'Target Achievement', description: 'CBO region achieved 104% of monthly target', read: true, time: '2h ago' },
  ]);

  const [searchValue, setSearchValue] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
    toast.info(notification.title, {
      description: notification.description,
    });
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      toast.info(`Searching for: ${searchValue}`);
    }
  };

  const handleProfileAction = (action: string) => {
    switch (action) {
      case 'profile':
        toast.info('Opening profile settings...');
        break;
      case 'settings':
        toast.info('Opening application settings...');
        break;
      case 'logout':
        toast.success('Logged out successfully');
        break;
    }
  };

  return (
    <header className={cn('flex h-16 items-center justify-between border-b bg-card px-6', className)}>
      {/* Left side */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Live
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search stores, regions..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-64 bg-background pl-9"
          />
        </form>

        {/* Refresh */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-danger-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-2 py-1.5">
              <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-1 text-xs text-primary hover:text-primary"
                  onClick={handleMarkAllRead}
                >
                  Mark all read
                </Button>
              )}
            </div>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id}
                className={cn(
                  'flex flex-col items-start gap-1 py-3 cursor-pointer',
                  !notification.read && 'bg-accent/50'
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium flex-1">{notification.title}</span>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{notification.description}</span>
                <span className="text-xs text-muted-foreground/70">{notification.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>Sales Manager</span>
                <span className="text-xs font-normal text-muted-foreground">admin@cocacola.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleProfileAction('profile')}>
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileAction('settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => handleProfileAction('logout')}
              className="text-danger focus:text-danger"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
