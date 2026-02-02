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
import futurelabLogo from '@/assets/futurelab-logo.png';
import cocaColaLogo from '@/assets/coca-cola-logo.png';
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
        'flex flex-col border-r border-sidebar-border/50 transition-all duration-300',
        'bg-gradient-to-b from-sidebar to-sidebar/95 backdrop-blur-xl',
        collapsed ? 'w-20' : 'w-72',
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-18 items-center justify-between border-b border-sidebar-border/50 px-4 py-4">
        {!collapsed && (
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <img src={cocaColaLogo} alt="Coca-Cola India" className="h-10 w-10 rounded-xl object-cover ring-2 ring-primary/30" />
              <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-md -z-10 group-hover:bg-primary/30 transition-colors" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-lg text-sidebar-foreground">RED</span>
                <span className="text-sm font-bold text-primary animate-pulse-subtle">LIVE</span>
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-primary/70 uppercase">Coca-Cola India</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <img src={cocaColaLogo} alt="Coca-Cola India" className="h-10 w-10 rounded-xl object-cover ring-2 ring-primary/30" />
          </div>
        )}
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>
      {collapsed && (
        <Button
          variant="ghost"
          size="icon"
          className="mx-auto mt-3 h-8 w-8 text-sidebar-foreground/60 hover:bg-sidebar-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
              activeClassName="bg-primary/20 text-primary-foreground hover:bg-primary/25 shadow-glow-sm"
              end={item.path === '/'}
            >
              <div className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                isActive ? 'bg-primary text-primary-foreground' : 'bg-sidebar-accent/50',
                collapsed && 'mx-auto'
              )}>
                <Icon className="h-4 w-4" />
              </div>
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      'flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold',
                      isActive 
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-danger text-danger-foreground animate-pulse-subtle'
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
      <div className="border-t border-sidebar-border/50 p-3 space-y-1">
        <button
          onClick={handleSettingsClick}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground'
          )}
        >
          <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent/50', collapsed && 'mx-auto')}>
            <Settings className="h-4 w-4" />
          </div>
          {!collapsed && <span>Settings</span>}
        </button>
        <button
          onClick={handleHelpClick}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground'
          )}
        >
          <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent/50', collapsed && 'mx-auto')}>
            <HelpCircle className="h-4 w-4" />
          </div>
          {!collapsed && <span>Help</span>}
        </button>
        
        {/* Futurelab Studios branding */}
        {!collapsed && (
          <div className="mt-4 px-3 py-3 flex flex-col items-center gap-2 rounded-xl bg-sidebar-accent/30">
            <img src={futurelabLogo} alt="Futurelab Studios" className="h-5 opacity-60 grayscale" />
            <p className="text-[9px] text-sidebar-foreground/40">
              Built by Futurelab Studios
            </p>
          </div>
        )}
        {collapsed && (
          <div className="mt-3 flex justify-center">
            <img src={futurelabLogo} alt="Futurelab Studios" className="h-4 opacity-50 grayscale" />
          </div>
        )}
      </div>
    </div>
  );
}
