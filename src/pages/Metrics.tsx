import { TrendChart, BottlerComparisonChart } from '@/components/dashboard/PerformanceChart';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { monthlyTrendData, bottlerPerformanceData, storeData } from '@/data/salesData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

export default function Metrics() {
  const asmLeaderboard = useMemo(() => {
    const asmScores: Record<string, { total: number; count: number }> = {};
    
    storeData.forEach((store) => {
      if (!asmScores[store.asmName]) {
        asmScores[store.asmName] = { total: 0, count: 0 };
      }
      asmScores[store.asmName].total += store.overallTotalScore;
      asmScores[store.asmName].count += 1;
    });

    return Object.entries(asmScores)
      .map(([name, data]) => ({
        id: name,
        name,
        subtitle: `${data.count} stores`,
        score: data.total / data.count,
        trend: 'up' as const,
        rank: 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }, []);

  const avgActivation = storeData.reduce((sum, s) => sum + s.activationTotal, 0) / storeData.length;
  const avgScore = storeData.reduce((sum, s) => sum + s.overallTotalScore, 0) / storeData.length;
  const avgSovi = storeData.reduce((sum, s) => sum + s.totalSovi, 0) / storeData.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Usage Metrics</h1>
        <p className="text-muted-foreground">Performance analytics and trend analysis</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Activation</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgActivation.toFixed(1)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Overall Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore.toFixed(1)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg SOVI</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSovi.toFixed(1)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bottlers</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bottlerPerformanceData.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TrendChart data={monthlyTrendData} />
        <Leaderboard
          title="Top 10 ASM Performers"
          subtitle="By Average Score"
          items={asmLeaderboard}
          onItemClick={(item) => {
            toast.info(`Selected: ${item.name}`, {
              description: `Average score: ${item.score.toFixed(1)}`,
            });
          }}
        />
      </div>

      <BottlerComparisonChart data={bottlerPerformanceData} />
    </div>
  );
}
