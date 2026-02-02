import { useState } from 'react';
import { cn } from '@/lib/utils';
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
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'stores', label: 'Store Information', icon: Store },
  { id: 'regions', label: 'Regional Summary', icon: MapPin },
  { id: 'coolers', label: 'Impure Coolers', icon: Thermometer, badge: 3 },
  { id: 'missing', label: 'Missing Coolers', icon: AlertTriangle, badge: 12 },
  { id: 'metrics', label: 'Usage Metrics', icon: BarChart3 },
  { id: 'availability', label: 'Availability', icon: Package },
];

interface SidebarProps {
  activeItem: string;
  onItemChange: (id: string) => void;
  className?: string;
}

export function Sidebar({ activeItem, onItemChange, className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

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
          <div className="flex items-center gap-2">
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
          onClick={() => {
            setCollapsed(!collapsed);
            toast.info(collapsed ? 'Sidebar expanded' : 'Sidebar collapsed');
          }}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemChange(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
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
            </button>
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
