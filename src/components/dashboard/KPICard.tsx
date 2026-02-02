import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  default: 'bg-card border border-border shadow-md hover:shadow-lg',
  primary: 'bg-card border-2 border-primary/30 shadow-md hover:shadow-lg ring-1 ring-primary/10',
  success: 'bg-card border-2 border-success/30 shadow-md hover:shadow-lg ring-1 ring-success/10',
  warning: 'bg-card border-2 border-warning/30 shadow-md hover:shadow-lg ring-1 ring-warning/10',
  danger: 'bg-card border-2 border-danger/30 shadow-md hover:shadow-lg ring-1 ring-danger/10',
};

const iconStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/15 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
};

const valueStyles = {
  default: 'text-foreground',
  primary: 'gradient-text',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  variant = 'default',
  className,
  onClick,
}: KPICardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted-foreground';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-3 sm:p-5 transition-all duration-300',
        variantStyles[variant],
        onClick && 'cursor-pointer hover:shadow-card-hover hover:-translate-y-1 active:scale-[0.98]',
        className
      )}
      onClick={onClick}
    >
      {/* Decorative gradient orb - subtle for light theme */}
      {variant === 'primary' && (
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
      )}
      {variant === 'success' && (
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-success/10 blur-2xl" />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground truncate">
              {title}
            </p>
            <p className={cn(
              'mt-1 sm:mt-2 text-xl sm:text-3xl font-bold tracking-tight font-display',
              valueStyles[variant]
            )}>
              {value}
            </p>
          </div>
          {Icon && (
            <div className={cn(
              'flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl shrink-0',
              iconStyles[variant]
            )}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-2 sm:mt-4 flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {trend && (
            <div className={cn(
              'flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full',
              trend === 'up' ? 'bg-success/10' : trend === 'down' ? 'bg-danger/10' : 'bg-muted/50',
              trendColor
            )}>
              <TrendIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {trendValue && <span>{trendValue}</span>}
            </div>
          )}
          {subtitle && (
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface KPICardGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function KPICardGroup({ children, className }: KPICardGroupProps) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6', className)}>
      {children}
    </div>
  );
}
