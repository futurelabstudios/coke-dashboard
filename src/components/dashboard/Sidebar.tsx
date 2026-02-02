import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavLink } from '@/components/NavLink';
import { 
  LayoutDashboard, 
  Store, 
  MapPin, 
  Thermometer, 
  AlertTriangle,
  BarChart3,
  Package,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/' },
  { id: 'stores', label: 'Store Information', icon: Store, path: '/stores' },
  { id: 'regions', label: 'Regional Summary', icon: MapPin, path: '/regions' },
  { id: 'coolers', label: 'Impure Coolers', icon: Thermometer, path: '/coolers', badge: 3 },
  { id: 'missing', label: 'Missing Coolers', icon: AlertTriangle, path: '/missing-coolers', badge: 12 },
  { id: 'metrics', label: 'Usage Metrics', icon: BarChart3, path: '/metrics' },
  { id: 'availability', label: 'Availability', icon: Package, path: '/availability' },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    toast.info('Settings', {
      description: 'Settings panel coming soon',
    });
  };

  const handleHelpClick = () => {
    toast.info('Help & Support', {
      description: 'Contact: support@cocacola-india.com',
      action: {
        label: 'Open Docs',
        onClick: () => toast.success('Opening documentation...'),
      },
    });
  };

  return (
    <div
      className={cn(
        'flex flex-col border-r bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">R</span>
            </div>
            <div>
              <span className="font-bold text-sidebar-foreground">RED</span>
              <span className="ml-1 text-xs font-medium text-primary">LIVE</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              activeClassName="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
              end={item.path === '/'}
            >
              <Icon className={cn('h-5 w-5 flex-shrink-0', collapsed && 'mx-auto')} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      'flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-bold',
                      isActive 
                        ? 'bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground'
                        : 'bg-danger text-danger-foreground'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={handleSettingsClick}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent'
          )}
        >
          <Settings className={cn('h-5 w-5 flex-shrink-0', collapsed && 'mx-auto')} />
          {!collapsed && <span>Settings</span>}
        </button>
        <button
          onClick={handleHelpClick}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent'
          )}
        >
          <HelpCircle className={cn('h-5 w-5 flex-shrink-0', collapsed && 'mx-auto')} />
          {!collapsed && <span>Help</span>}
        </button>
      </div>
    </div>
  );
}
