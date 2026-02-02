import { RegionalPerformanceChart } from '@/components/dashboard/PerformanceChart';
import { regionSummaryData, storeData } from '@/data/salesData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Regions() {
  const regionStats = regionSummaryData.map((region) => {
    const regionStores = storeData.filter((s) => s.region === region.region);
    const avgScore = regionStores.length > 0 
      ? regionStores.reduce((sum, s) => sum + s.overallTotalScore, 0) / regionStores.length 
      : 0;
    return {
      ...region,
      storeCount: regionStores.length,
      avgScore,
      trend: avgScore > 25 ? 'up' : 'down',
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Regional Summary</h1>
        <p className="text-muted-foreground">Performance breakdown by geographic region</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {regionStats.map((region) => (
          <Card key={region.region} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{region.region}</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{region.avgScore.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">{region.storeCount} stores</p>
              <div className={cn(
                "flex items-center gap-1 mt-2 text-xs font-medium",
                region.trend === 'up' ? 'text-success' : 'text-danger'
              )}>
                {region.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{region.trend === 'up' ? '+5.2%' : '-3.1%'} vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <RegionalPerformanceChart data={regionSummaryData} />
    </div>
  );
}
