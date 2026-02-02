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
    if (trend === 'up') return <TrendingUp className="h-3 w-3 text-success" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3 text-danger" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const getMedalStyle = (rank: number) => {
    if (rank === 1) return 'bg-warning text-white shadow-sm';
    if (rank === 2) return 'bg-muted text-muted-foreground';
    if (rank === 3) return 'bg-accent text-accent-foreground';
    return 'bg-muted/50 text-muted-foreground';
  };

  return (
    <div className={cn(
      'relative rounded-2xl overflow-hidden',
      'bg-white/70 backdrop-blur-xl border border-white/50',
      'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]',
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning text-white shadow-sm">
          <Trophy className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-display font-bold text-sm text-foreground">{title}</h3>
          {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div className="divide-y divide-border/20">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 transition-all duration-200',
              item.rank <= 3 && 'bg-white/50',
              onItemClick && 'cursor-pointer hover:bg-white/80'
            )}
          >
            {/* Rank */}
            <div className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold shrink-0',
              getMedalStyle(item.rank)
            )}>
              {showMedals && item.rank <= 3 ? (
                <Medal className="h-4 w-4" />
              ) : (
                item.rank
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">{item.name}</p>
              {item.subtitle && (
                <p className="text-[10px] text-muted-foreground truncate">{item.subtitle}</p>
              )}
            </div>

            {/* Score */}
            <div className="flex items-center gap-2">
              <div className="w-16 hidden sm:block">
                <ScoreBar 
                  score={item.score} 
                  maxScore={item.maxScore || 100} 
                  height="sm" 
                  showValue={false}
                />
              </div>
              <div className="flex items-center gap-1 min-w-[50px] justify-end">
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
