import { Bell, Search, User, RefreshCw } from 'lucide-react';
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

interface HeaderProps {
  title?: string;
  className?: string;
}

export function Header({ title = 'Sales Intelligence', className }: HeaderProps) {
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
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 bg-background pl-9"
          />
        </div>

        {/* Refresh */}
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <RefreshCw className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-danger-foreground">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Impure Cooler Alert</span>
              <span className="text-xs text-muted-foreground">3 stores reported impure coolers in Chandigarh</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Missing Cooler Stores</span>
              <span className="text-xs text-muted-foreground">12 stores missing cooler presence this week</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Target Achievement</span>
              <span className="text-xs text-muted-foreground">CBO region achieved 104% of monthly target</span>
            </DropdownMenuItem>
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
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
