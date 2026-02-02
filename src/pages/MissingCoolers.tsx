import { useState, useMemo } from 'react';
import { DataTable } from '@/components/dashboard/DataTable';
import { StoreDetailModal } from '@/components/dashboard/StoreDetailModal';
import { storeData, StoreData } from '@/data/salesData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Store } from 'lucide-react';

export default function MissingCoolers() {
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);

  const missingCoolerStores = useMemo(() => 
    storeData.filter((s) => !s.coolerPresence), []);

  const totalStores = storeData.length;
  const missingRate = (missingCoolerStores.length / totalStores) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Missing Coolers</h1>
        <p className="text-muted-foreground">Stores that require cooler installation</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-danger/20 bg-danger-muted">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Missing Coolers</CardTitle>
            <AlertTriangle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-danger">{missingCoolerStores.length}</div>
            <p className="text-xs text-muted-foreground">Stores without coolers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalStores}</div>
            <p className="text-xs text-muted-foreground">Audited locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Missing Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{missingRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Of all stores</p>
          </CardContent>
        </Card>
      </div>

      {missingCoolerStores.length > 0 ? (
        <DataTable data={missingCoolerStores} onRowClick={setSelectedStore} />
      ) : (
        <Card className="p-12 text-center">
          <div className="text-muted-foreground">
            All stores have coolers installed
          </div>
        </Card>
      )}

      <StoreDetailModal
        store={selectedStore}
        open={!!selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </div>
  );
}
