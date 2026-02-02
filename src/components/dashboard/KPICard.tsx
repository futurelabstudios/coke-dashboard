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
  default: 'bg-card border-border',
  primary: 'bg-primary/5 border-primary/20',
  success: 'bg-success-muted border-success/20',
  warning: 'bg-warning-muted border-warning/20',
  danger: 'bg-danger-muted border-danger/20',
};

const valueStyles = {
  default: 'text-foreground',
  primary: 'text-primary',
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
        'relative overflow-hidden rounded-xl border p-5 transition-all duration-200',
        variantStyles[variant],
        onClick && 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5',
        className
      )}
      onClick={onClick}
    >
      {/* Background decoration */}
      {variant === 'primary' && (
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10" />
      )}

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            <p className={cn('mt-2 text-3xl font-bold tracking-tight', valueStyles[variant])}>
              {value}
            </p>
          </div>
          {Icon && (
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg',
              variant === 'primary' ? 'bg-primary/10 text-primary' :
              variant === 'success' ? 'bg-success/10 text-success' :
              variant === 'warning' ? 'bg-warning/10 text-warning' :
              variant === 'danger' ? 'bg-danger/10 text-danger' :
              'bg-muted text-muted-foreground'
            )}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center gap-2">
          {trend && (
            <div className={cn('flex items-center gap-1 text-sm font-medium', trendColor)}>
              <TrendIcon className="h-4 w-4" />
              {trendValue && <span>{trendValue}</span>}
            </div>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
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
