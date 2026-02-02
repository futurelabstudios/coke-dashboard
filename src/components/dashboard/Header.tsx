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
import { MobileNav } from './MobileNav';

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
    <header className={cn(
      'flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6',
      'border-b border-border/30',
      'bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-xl',
      className
    )}>
      {/* Left side */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile menu */}
        <MobileNav />
        
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img src="/coca-cola-logo.png" alt="Coca-Cola India" className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl object-cover ring-1 ring-primary/20" />
            <div className="absolute -inset-0.5 bg-primary/10 rounded-xl blur-sm -z-10" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm sm:text-base font-display font-bold text-foreground leading-tight">{title}</h1>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-primary/80 uppercase hidden xs:block">Coca-Cola India</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 ml-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-xs font-semibold text-success">Live</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search - desktop only */}
        <form onSubmit={handleSearch} className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search stores, regions..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-64 bg-background/50 pl-9 border-border/30 focus:bg-background/80 transition-colors"
          />
        </form>

        {/* Refresh */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 sm:h-10 sm:w-10 text-muted-foreground rounded-xl hover:bg-accent/50 transition-colors"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10 text-muted-foreground rounded-xl hover:bg-accent/50">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-danger-foreground animate-pulse-subtle shadow-glow-sm">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 sm:w-96 glass-card border-border/30">
            <div className="flex items-center justify-between px-3 py-2.5">
              <DropdownMenuLabel className="p-0 text-sm font-display font-semibold">Notifications</DropdownMenuLabel>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto px-2 py-1 text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-lg"
                  onClick={handleMarkAllRead}
                >
                  Mark all read
                </Button>
              )}
            </div>
            <DropdownMenuSeparator className="bg-border/30" />
            {notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id}
                className={cn(
                  'flex flex-col items-start gap-1.5 py-3 px-3 cursor-pointer rounded-lg mx-1 my-0.5',
                  !notification.read && 'bg-primary/5'
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium flex-1 text-sm">{notification.title}</span>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{notification.description}</span>
                <span className="text-[10px] text-muted-foreground/60">{notification.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 text-muted-foreground rounded-xl hover:bg-accent/50 p-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20">
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
