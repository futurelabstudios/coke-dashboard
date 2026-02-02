import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function ChartContainer({
  title,
  subtitle,
  children,
  className,
  action,
}: ChartContainerProps) {
  return (
    <div className={cn('glass-card rounded-2xl p-5 sm:p-6', className)}>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="font-display font-bold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

interface RegionalPerformanceChartProps {
  data: Array<{
    region: string;
    storeCount: number;
    avgScore: number;
    achievement: number;
  }>;
  className?: string;
}

export function RegionalPerformanceChart({ data, className }: RegionalPerformanceChartProps) {
  const getBarColor = (achievement: number) => {
    if (achievement >= 80) return 'hsl(142, 72%, 42%)';
    if (achievement >= 60) return 'hsl(358, 82%, 50%)';
    if (achievement >= 40) return 'hsl(38, 92%, 50%)';
    return 'hsl(0, 84%, 60%)';
  };

  return (
    <ChartContainer
      title="Regional Performance"
      subtitle="Store count and achievement by region"
      className={className}
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis 
              type="category" 
              dataKey="region" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 500 }} 
              axisLine={false} 
              tickLine={false}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
              formatter={(value: number, name: string) => [
                name === 'achievement' ? `${value}%` : value.toLocaleString(),
                name === 'achievement' ? 'Achievement' : 'Stores'
              ]}
            />
            <Bar dataKey="achievement" radius={[0, 4, 4, 0]} maxBarSize={28}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.achievement)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}

interface TrendChartProps {
  data: Array<{
    month: string;
    availability: number;
    cooler: number;
    activation: number;
    sovi: number;
    overallScore: number;
  }>;
  className?: string;
}

export function TrendChart({ data, className }: TrendChartProps) {
  return (
    <ChartContainer
      title="Performance Trends"
      subtitle="Monthly score progression"
      className={className}
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -10, right: 10 }}>
            <defs>
              <linearGradient id="colorAvailability" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(358, 82%, 50%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(358, 82%, 50%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="availability"
              name="Availability"
              stroke="hsl(358, 82%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAvailability)"
            />
            <Area
              type="monotone"
              dataKey="overallScore"
              name="Overall Score"
              stroke="hsl(220, 70%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOverall)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}

interface BottlerComparisonChartProps {
  data: Array<{
    bottler: string;
    avgScore: number;
    availability: number;
    cooler: number;
  }>;
  className?: string;
}

export function BottlerComparisonChart({ data, className }: BottlerComparisonChartProps) {
  return (
    <ChartContainer
      title="Bottler Comparison"
      subtitle="Performance metrics by bottler"
      className={className}
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="bottler" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
              axisLine={false} 
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
            />
            <Bar dataKey="avgScore" name="Avg Score" fill="hsl(358, 82%, 50%)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="availability" name="Availability" fill="hsl(220, 70%, 50%)" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
