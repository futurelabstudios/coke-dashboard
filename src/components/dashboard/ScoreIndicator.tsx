import { cn } from '@/lib/utils';

interface ScoreIndicatorProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return { bg: 'bg-success', text: 'text-success', ring: 'ring-success/20' };
  if (percentage >= 60) return { bg: 'bg-chart-3', text: 'text-chart-3', ring: 'ring-chart-3/20' };
  if (percentage >= 40) return { bg: 'bg-warning', text: 'text-warning', ring: 'ring-warning/20' };
  return { bg: 'bg-danger', text: 'text-danger', ring: 'ring-danger/20' };
};

const sizeStyles = {
  sm: { container: 'h-6 w-6', text: 'text-[10px]' },
  md: { container: 'h-10 w-10', text: 'text-xs' },
  lg: { container: 'h-14 w-14', text: 'text-sm' },
};

export function ScoreIndicator({
  score,
  maxScore = 100,
  size = 'md',
  showLabel = false,
  label,
  className,
}: ScoreIndicatorProps) {
  const percentage = Math.min((score / maxScore) * 100, 100);
  const colors = getScoreColor(percentage);
  const sizeStyle = sizeStyles[size];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'relative flex items-center justify-center rounded-full ring-2',
          colors.ring,
          sizeStyle.container
        )}
      >
        {/* Background circle */}
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted/30"
          />
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
            className={colors.text}
          />
        </svg>
        <span className={cn('font-semibold', colors.text, sizeStyle.text)}>
          {Math.round(score)}
        </span>
      </div>
      {showLabel && label && (
        <span className="text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  );
}

interface ScoreBarProps {
  score: number;
  maxScore?: number;
  height?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const barHeights = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export function ScoreBar({
  score,
  maxScore = 100,
  height = 'md',
  showValue = true,
  className,
}: ScoreBarProps) {
  const percentage = Math.min((score / maxScore) * 100, 100);
  const colors = getScoreColor(percentage);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex-1 overflow-hidden rounded-full bg-muted', barHeights[height])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', colors.bg)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className={cn('text-sm font-medium tabular-nums', colors.text)}>
          {score.toFixed(1)}
        </span>
      )}
    </div>
  );
}

interface StatusBadgeProps {
  status: 'excellent' | 'good' | 'warning' | 'critical';
  label?: string;
  className?: string;
}

const statusStyles = {
  excellent: 'bg-success/10 text-success border-success/20',
  good: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  critical: 'bg-danger/10 text-danger border-danger/20',
};

const statusLabels = {
  excellent: 'Excellent',
  good: 'Good',
  warning: 'Needs Attention',
  critical: 'Critical',
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status],
        className
      )}
    >
      {label || statusLabels[status]}
    </span>
  );
}
