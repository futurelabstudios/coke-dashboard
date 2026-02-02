import { useState, useMemo, useCallback } from 'react';
import { DataTable } from '@/components/dashboard/DataTable';
import { StoreDetailModal } from '@/components/dashboard/StoreDetailModal';
import { FilterBar, FilterConfig } from '@/components/dashboard/FilterBar';
import { storeData, StoreData } from '@/data/salesData';
import { toast } from 'sonner';

const filterConfigs: FilterConfig[] = [
  {
    id: 'region',
    label: 'Region',
    options: [
      { value: 'CBO', label: 'CBO' },
      { value: 'FBO', label: 'FBO' },
      { value: 'NORTH', label: 'North' },
      { value: 'SOUTH', label: 'South' },
    ],
  },
  {
    id: 'bottler',
    label: 'Bottler',
    options: [
      { value: 'Kandhari Global Beverages', label: 'Kandhari Global' },
      { value: 'HCCB C1', label: 'HCCB C1' },
      { value: 'HCCB C2A', label: 'HCCB C2A' },
      { value: 'HCCB C2B', label: 'HCCB C2B' },
    ],
  },
  {
    id: 'vpoClass',
    label: 'VPO Class',
    options: [
      { value: 'PLATINUM', label: 'Platinum' },
      { value: 'GOLD', label: 'Gold' },
      { value: 'SILVER', label: 'Silver' },
      { value: 'BRONZE', label: 'Bronze' },
    ],
  },
];

export default function Stores() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);

  const filteredData = useMemo(() => {
    return storeData.filter((store) => {
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        if (
          !store.outletName.toLowerCase().includes(search) &&
          !store.globalId.includes(search) &&
          !store.townName.toLowerCase().includes(search)
        ) {
          return false;
        }
      }

      if (filters.region && filters.region !== 'all' && store.region !== filters.region) return false;
      if (filters.bottler && filters.bottler !== 'all' && store.bottler !== filters.bottler) return false;
      if (filters.vpoClass && filters.vpoClass !== 'all' && store.vpoClass !== filters.vpoClass) return false;

      return true;
    });
  }, [filters, searchQuery]);

  const handleFilterChange = (id: string, value: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const handleExport = useCallback(() => {
    const headers = ['Global ID', 'Outlet Name', 'Region', 'Bottler', 'VPO Class', 'Town', 'Overall Score'];
    const rows = filteredData.map((store) => [
      store.globalId, store.outletName, store.region, store.bottler, store.vpoClass, store.townName, store.overallTotalScore,
    ]);
    const csvContent = [headers.join(','), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `stores-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filteredData.length} stores`);
  }, [filteredData]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Store Information</h1>
        <p className="text-muted-foreground">Complete list of all audited retail outlets</p>
      </div>

      <FilterBar
        filters={filterConfigs}
        values={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearFilters}
        onExport={handleExport}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <DataTable 
        data={filteredData}
        onRowClick={setSelectedStore}
      />

      <StoreDetailModal
        store={selectedStore}
        open={!!selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </div>
  );
}
