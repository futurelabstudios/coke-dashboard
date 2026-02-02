import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Medal, Trophy } from 'lucide-react';
import { ScoreBar } from './ScoreIndicator';

interface LeaderboardItem {
  id: string;
  name: string;
  subtitle?: string;
  score: number;
  maxScore?: number;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
  rank: number;
}

interface LeaderboardProps {
  title: string;
  subtitle?: string;
  items: LeaderboardItem[];
  showMedals?: boolean;
  className?: string;
  onItemClick?: (item: LeaderboardItem) => void;
}

export function Leaderboard({
  title,
  subtitle,
  items,
  showMedals = true,
  className,
  onItemClick,
}: LeaderboardProps) {
  const TrendIcon = ({ trend }: { trend?: 'up' | 'down' | 'stable' }) => {
    if (trend === 'up') return <TrendingUp className="h-3.5 w-3.5 text-success" />;
    if (trend === 'down') return <TrendingDown className="h-3.5 w-3.5 text-danger" />;
    return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'text-warning bg-gradient-to-br from-warning/20 to-warning/10 ring-1 ring-warning/30';
    if (rank === 2) return 'text-muted-foreground bg-muted/50 ring-1 ring-border/30';
    if (rank === 3) return 'text-accent-foreground bg-accent/50 ring-1 ring-border/30';
    return 'text-muted-foreground bg-muted/30';
  };

  return (
    <div className={cn('glass-card rounded-2xl overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/30 px-5 py-4 bg-gradient-to-r from-warning/10 to-transparent">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/20 ring-1 ring-warning/30">
          <Trophy className="h-5 w-5 text-warning" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div className="divide-y divide-border/20">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className={cn(
              'flex items-center gap-4 px-5 py-3.5 transition-all duration-200 animate-fade-in',
              item.rank <= 3 && 'bg-muted/20',
              onItemClick && 'cursor-pointer hover:bg-accent/30'
            )}
            style={{ animationDelay: `${index * 75}ms` }}
          >
            {/* Rank */}
            <div className={cn(
              'flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold',
              getMedalColor(item.rank)
            )}>
              {showMedals && item.rank <= 3 ? (
                <Medal className="h-4 w-4" />
              ) : (
                item.rank
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{item.name}</p>
              {item.subtitle && (
                <p className="text-[11px] text-muted-foreground truncate">{item.subtitle}</p>
              )}
            </div>

            {/* Score */}
            <div className="flex items-center gap-3">
              <div className="w-20 hidden sm:block">
                <ScoreBar 
                  score={item.score} 
                  maxScore={item.maxScore || 100} 
                  height="sm" 
                  showValue={false}
                />
              </div>
              <div className="flex items-center gap-1.5 min-w-[55px] justify-end">
                <span className={cn(
                  'text-sm font-bold tabular-nums',
                  item.rank === 1 && 'text-warning'
                )}>
                  {item.score.toFixed(1)}
                </span>
                {item.trend && <TrendIcon trend={item.trend} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
