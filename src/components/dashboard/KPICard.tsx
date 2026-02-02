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

const variantConfig = {
  default: {
    card: 'bg-white/70 backdrop-blur-xl border-white/50',
    icon: 'bg-muted text-muted-foreground',
    value: 'text-foreground',
    accent: 'from-muted/20 to-transparent',
  },
  primary: {
    card: 'bg-white/75 backdrop-blur-xl border-white/60',
    icon: 'bg-primary text-white shadow-sm',
    value: 'text-primary',
    accent: 'from-primary/5 to-transparent',
  },
  success: {
    card: 'bg-white/75 backdrop-blur-xl border-success/20',
    icon: 'bg-success text-white shadow-sm',
    value: 'text-success',
    accent: 'from-success/5 to-transparent',
  },
  warning: {
    card: 'bg-white/75 backdrop-blur-xl border-warning/20',
    icon: 'bg-warning text-white shadow-sm',
    value: 'text-warning',
    accent: 'from-warning/5 to-transparent',
  },
  danger: {
    card: 'bg-white/75 backdrop-blur-xl border-danger/20',
    icon: 'bg-danger text-white shadow-sm',
    value: 'text-danger',
    accent: 'from-danger/5 to-transparent',
  },
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
  const trendColor = trend === 'up' ? 'text-success bg-success/10' : trend === 'down' ? 'text-danger bg-danger/10' : 'text-muted-foreground bg-muted';
  const config = variantConfig[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-4 transition-all duration-300',
        'border shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]',
        'hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)]',
        config.card,
        onClick && 'cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]',
        className
      )}
      onClick={onClick}
    >
      {/* Subtle gradient overlay for depth */}
      <div className={cn('absolute inset-0 bg-gradient-to-br pointer-events-none', config.accent)} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground truncate">
              {title}
            </p>
            <p className={cn(
              'mt-1.5 text-2xl font-bold tracking-tight font-display',
              config.value
            )}>
              {value}
            </p>
          </div>
          {Icon && (
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl shrink-0',
              config.icon
            )}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Footer with trend and subtitle */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
              trendColor
            )}>
              <TrendIcon className="h-3 w-3" />
              {trendValue && <span>{trendValue}</span>}
            </div>
          )}
          {subtitle && (
            <p className="text-[11px] text-muted-foreground truncate">{subtitle}</p>
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
    <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6', className)}>
      {children}
    </div>
  );
}
