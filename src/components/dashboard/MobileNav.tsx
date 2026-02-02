import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Store, 
  MapPin, 
  Thermometer, 
  AlertTriangle,
  BarChart3,
  Package,
  Menu,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import cocaColaLogo from '@/assets/coca-cola-logo.png';
import futurelabLogo from '@/assets/futurelab-logo.png';

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

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    setOpen(false);
    toast.info('Settings', { description: 'Settings panel coming soon' });
  };

  const handleHelpClick = () => {
    setOpen(false);
    toast.info('Help & Support', {
      description: 'Contact: support@cocacola-india.com',
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 rounded-xl hover:bg-accent/50">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 border-r-0 bg-gradient-to-b from-sidebar to-sidebar/95 backdrop-blur-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-20 items-center gap-3 border-b border-sidebar-border/50 px-5">
            <div className="relative">
              <img src={cocaColaLogo} alt="Coca-Cola India" className="h-11 w-11 rounded-xl object-cover ring-2 ring-primary/30" />
              <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-md -z-10" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-lg text-sidebar-foreground">RED</span>
                <span className="text-sm font-bold text-primary animate-pulse-subtle">LIVE</span>
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-primary/70 uppercase">Coca-Cola India</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200',
                    'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                  activeClassName="bg-primary/20 text-primary-foreground hover:bg-primary/25 shadow-glow-sm"
                  end={item.path === '/'}
                >
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                    isActive ? 'bg-primary text-primary-foreground' : 'bg-sidebar-accent/50'
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      'flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-[11px] font-bold',
                      isActive 
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-danger text-danger-foreground animate-pulse-subtle'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border/50 p-4 space-y-1">
            <button
              onClick={handleSettingsClick}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-accent/50">
                <Settings className="h-4 w-4" />
              </div>
              <span>Settings</span>
            </button>
            <button
              onClick={handleHelpClick}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-accent/50">
                <HelpCircle className="h-4 w-4" />
              </div>
              <span>Help</span>
            </button>
            
            <div className="mt-4 flex flex-col items-center gap-2 pt-4 border-t border-sidebar-border/30 rounded-xl">
              <img src={futurelabLogo} alt="Futurelab Studios" className="h-5 opacity-50 grayscale" />
              <p className="text-[10px] text-sidebar-foreground/40">
                Built by Futurelab Studios
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
