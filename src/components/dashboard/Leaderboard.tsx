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
}

export function Leaderboard({
  title,
  subtitle,
  items,
  showMedals = true,
  className,
}: LeaderboardProps) {
  const TrendIcon = ({ trend }: { trend?: 'up' | 'down' | 'stable' }) => {
    if (trend === 'up') return <TrendingUp className="h-3.5 w-3.5 text-success" />;
    if (trend === 'down') return <TrendingDown className="h-3.5 w-3.5 text-danger" />;
    return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'text-warning bg-warning/10';
    if (rank === 2) return 'text-muted-foreground bg-muted';
    if (rank === 3) return 'text-orange-600 bg-orange-100';
    return 'text-muted-foreground bg-muted/50';
  };

  return (
    <div className={cn('rounded-xl border bg-card', className)}>
      <div className="flex items-center gap-2 border-b px-5 py-4">
        <Trophy className="h-5 w-5 text-warning" />
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex items-center gap-4 px-5 py-3 transition-colors hover:bg-accent/50',
              item.rank <= 3 && 'bg-accent/20'
            )}
          >
            {/* Rank */}
            <div className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
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
              <p className="font-medium text-foreground truncate">{item.name}</p>
              {item.subtitle && (
                <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
              )}
            </div>

            {/* Score */}
            <div className="flex items-center gap-3">
              <div className="w-24">
                <ScoreBar 
                  score={item.score} 
                  maxScore={item.maxScore || 100} 
                  height="sm" 
                  showValue={false}
                />
              </div>
              <div className="flex items-center gap-1.5 min-w-[60px] justify-end">
                <span className="text-sm font-semibold tabular-nums">
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
