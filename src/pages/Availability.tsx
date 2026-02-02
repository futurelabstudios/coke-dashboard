import { useState, useMemo } from 'react';
import { DataTable } from '@/components/dashboard/DataTable';
import { StoreDetailModal } from '@/components/dashboard/StoreDetailModal';
import { storeData, StoreData } from '@/data/salesData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function Availability() {
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);

  const avgAvailability = useMemo(() => 
    storeData.reduce((sum, s) => sum + s.availabilityTotal, 0) / storeData.length, []);

  const lowAvailabilityStores = useMemo(() => 
    storeData.filter((s) => s.availabilityTotal < 50).sort((a, b) => a.availabilityTotal - b.availabilityTotal), []);

  const highAvailabilityStores = useMemo(() => 
    storeData.filter((s) => s.availabilityTotal >= 80).length, []);

  const availabilityTarget = 100;
  const achievementRate = (avgAvailability / availabilityTarget) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Availability</h1>
        <p className="text-muted-foreground">Product availability metrics across all stores</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Availability</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAvailability.toFixed(1)}</div>
            <Progress value={achievementRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{achievementRate.toFixed(1)}% of target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Performers</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{highAvailabilityStores}</div>
            <p className="text-xs text-muted-foreground">Stores with 80+ score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Performers</CardTitle>
            <TrendingDown className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{lowAvailabilityStores.length}</div>
            <p className="text-xs text-muted-foreground">Stores below 50</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storeData.length}</div>
            <p className="text-xs text-muted-foreground">Audited locations</p>
          </CardContent>
        </Card>
      </div>

      {lowAvailabilityStores.length > 0 && (
        <div className="rounded-xl border border-warning/20 bg-warning-muted p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/20">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-warning">Low Availability Alert</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {lowAvailabilityStores.length} stores have availability below 50. Review and take action.
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-4">Stores Needing Attention</h2>
        <DataTable data={lowAvailabilityStores.slice(0, 20)} onRowClick={setSelectedStore} />
      </div>

      <StoreDetailModal
        store={selectedStore}
        open={!!selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </div>
  );
}
