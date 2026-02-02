import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StoreData, getScoreStatus } from '@/data/salesData';
import { ScoreBar, StatusBadge } from './ScoreIndicator';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Store, Package, Thermometer, Zap, Target, TrendingUp, Download } from 'lucide-react';
import { toast } from 'sonner';

interface KPIDrilldownProps {
  kpiType: string | null;
  data: StoreData[];
  open: boolean;
  onClose: () => void;
}

const kpiConfig: Record<string, {
  title: string;
  description: string;
  icon: React.ElementType;
  dataKey: keyof StoreData;
  maxValue: number;
}> = {
  stores: {
    title: 'Store Count Analysis',
    description: 'Breakdown of audited stores by region and class',
    icon: Store,
    dataKey: 'overallTotalScore',
    maxValue: 100,
  },
  availability: {
    title: 'Availability Drilldown',
    description: 'Product availability scores across stores',
    icon: Package,
    dataKey: 'availabilityTotal',
    maxValue: 100,
  },
  cooler: {
    title: 'Cooler Score Analysis',
    description: 'Cooler compliance and visibility metrics',
    icon: Thermometer,
    dataKey: 'coolerTotal',
    maxValue: 50,
  },
  activation: {
    title: 'Activation Performance',
    description: 'In-store activation and promotion scores',
    icon: Zap,
    dataKey: 'activationTotal',
    maxValue: 30,
  },
  purity: {
    title: 'Cooler Purity Analysis',
    description: 'Brand purity in coolers across stores',
    icon: Target,
    dataKey: 'coolerPurityPercent',
    maxValue: 100,
  },
  overall: {
    title: 'Overall Score Breakdown',
    description: 'Comprehensive store performance analysis',
    icon: TrendingUp,
    dataKey: 'overallTotalScore',
    maxValue: 100,
  },
};

export function KPIDrilldown({ kpiType, data, open, onClose }: KPIDrilldownProps) {
  if (!kpiType || !kpiConfig[kpiType]) return null;

  const config = kpiConfig[kpiType];
  const Icon = config.icon;

  // Group data by region
  const regionData = data.reduce((acc, store) => {
    const region = store.region;
    if (!acc[region]) {
      acc[region] = { total: 0, count: 0 };
    }
    acc[region].total += store[config.dataKey] as number;
    acc[region].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const chartData = Object.entries(regionData).map(([region, { total, count }]) => ({
    region,
    value: total / count,
    count,
  }));

  // Group by VPO class
  const vpoData = data.reduce((acc, store) => {
    const vpo = store.vpoClass;
    if (!acc[vpo]) {
      acc[vpo] = { total: 0, count: 0 };
    }
    acc[vpo].total += store[config.dataKey] as number;
    acc[vpo].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const vpoChartData = Object.entries(vpoData).map(([vpoClass, { total, count }]) => ({
    vpoClass,
    value: total / count,
    count,
  }));

  // Top and bottom performers
  const sortedStores = [...data].sort((a, b) => 
    (b[config.dataKey] as number) - (a[config.dataKey] as number)
  );
  const topPerformers = sortedStores.slice(0, 5);
  const bottomPerformers = sortedStores.slice(-5).reverse();

  const getBarColor = (value: number) => {
    const percentage = (value / config.maxValue) * 100;
    if (percentage >= 80) return 'hsl(142, 72%, 42%)';
    if (percentage >= 60) return 'hsl(358, 82%, 50%)';
    if (percentage >= 40) return 'hsl(38, 92%, 50%)';
    return 'hsl(0, 84%, 60%)';
  };

  const handleExport = () => {
    const headers = ['Store Name', 'Global ID', 'Region', 'VPO Class', config.title];
    const rows = data.map((store) => [
      store.outletName,
      store.globalId,
      store.region,
      store.vpoClass,
      store[config.dataKey],
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${kpiType}-drilldown-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast.success(`Exported ${data.length} records`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle>{config.title}</DialogTitle>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard 
              label="Total Stores" 
              value={data.length.toString()} 
            />
            <StatCard 
              label="Average Score" 
              value={(data.reduce((sum, s) => sum + (s[config.dataKey] as number), 0) / data.length).toFixed(1)} 
            />
            <StatCard 
              label="Top Score" 
              value={Math.max(...data.map((s) => s[config.dataKey] as number)).toFixed(1)} 
            />
            <StatCard 
              label="Bottom Score" 
              value={Math.min(...data.map((s) => s[config.dataKey] as number)).toFixed(1)} 
            />
          </div>

          {/* Region Chart */}
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-4">Performance by Region</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12 }} domain={[0, config.maxValue]} />
                  <YAxis type="category" dataKey="region" tick={{ fontSize: 12 }} width={60} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [value.toFixed(1), 'Score']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={24}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* VPO Class Chart */}
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-4">Performance by VPO Class</h4>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vpoChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="vpoClass" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, config.maxValue]} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [value.toFixed(1), 'Avg Score']}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top & Bottom Performers */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-3 text-success">Top 5 Performers</h4>
              <div className="space-y-2">
                {topPerformers.map((store, i) => (
                  <div key={store.id} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-xs font-bold text-success">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{store.outletName}</p>
                      <p className="text-xs text-muted-foreground">{store.region}</p>
                    </div>
                    <span className="text-sm font-bold text-success">
                      {(store[config.dataKey] as number).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-3 text-danger">Needs Attention</h4>
              <div className="space-y-2">
                {bottomPerformers.map((store, i) => (
                  <div key={store.id} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger/10 text-xs font-bold text-danger">
                      {data.length - 4 + i}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{store.outletName}</p>
                      <p className="text-xs text-muted-foreground">{store.region}</p>
                    </div>
                    <span className="text-sm font-bold text-danger">
                      {(store[config.dataKey] as number).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3 text-center">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
