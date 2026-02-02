import { useState, useMemo } from 'react';
import { DataTable } from '@/components/dashboard/DataTable';
import { StoreDetailModal } from '@/components/dashboard/StoreDetailModal';
import { storeData, StoreData } from '@/data/salesData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, AlertTriangle, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Coolers() {
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);
  const [activeTab, setActiveTab] = useState('impure');

  const impureStores = useMemo(() => 
    storeData.filter((s) => s.coolerPurityPercent < 100), []);
  
  const pureStores = useMemo(() => 
    storeData.filter((s) => s.coolerPurityPercent === 100), []);

  const criticalStores = useMemo(() => 
    storeData.filter((s) => s.coolerPurityPercent < 50), []);

  const avgPurity = useMemo(() => 
    storeData.reduce((sum, s) => sum + s.coolerPurityPercent, 0) / storeData.length, []);

  const displayData = activeTab === 'impure' ? impureStores : pureStores;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Cooler Purity</h1>
        <p className="text-muted-foreground">Monitor and manage cooler compliance across stores</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Purity</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPurity.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Impure Coolers</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{impureStores.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Critical (&lt;50%)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{criticalStores.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pure Coolers</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{pureStores.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="impure">Impure Coolers ({impureStores.length})</TabsTrigger>
          <TabsTrigger value="pure">Pure Coolers ({pureStores.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="impure" className="mt-4">
          <DataTable data={displayData} onRowClick={setSelectedStore} />
        </TabsContent>
        <TabsContent value="pure" className="mt-4">
          <DataTable data={displayData} onRowClick={setSelectedStore} />
        </TabsContent>
      </Tabs>

      <StoreDetailModal
        store={selectedStore}
        open={!!selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </div>
  );
}
