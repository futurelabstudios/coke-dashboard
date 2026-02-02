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
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center gap-3 border-b px-4">
            <img src={cocaColaLogo} alt="Coca-Cola India" className="h-10 w-10 rounded object-cover" />
            <div className="flex flex-col">
              <div>
                <span className="font-bold text-foreground">RED</span>
                <span className="ml-1 text-xs font-medium text-primary">LIVE</span>
              </div>
              <span className="text-[10px] font-medium text-primary/80">COCA-COLA INDIA</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                    'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                  activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  end={item.path === '/'}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      'flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-bold',
                      isActive 
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-danger text-danger-foreground'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t p-3 space-y-1">
            <button
              onClick={handleSettingsClick}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <button
              onClick={handleHelpClick}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help</span>
            </button>
            
            <div className="mt-4 flex flex-col items-center gap-2 pt-3 border-t">
              <img src={futurelabLogo} alt="Futurelab Studios" className="h-6 opacity-70" />
              <p className="text-[10px] text-muted-foreground">
                Built by Futurelab Studios
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
