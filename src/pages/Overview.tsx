import { useMemo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KPICard, KPICardGroup } from '@/components/dashboard/KPICard';
import { FilterBar, FilterConfig } from '@/components/dashboard/FilterBar';
import { 
  RegionalPerformanceChart, 
  TrendChart, 
  BottlerComparisonChart 
} from '@/components/dashboard/PerformanceChart';
import { DataTable } from '@/components/dashboard/DataTable';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { StoreDetailModal } from '@/components/dashboard/StoreDetailModal';
import { KPIDrilldown } from '@/components/dashboard/KPIDrilldown';
import {
  storeData,
  regionSummaryData,
  bottlerPerformanceData,
  monthlyTrendData,
  calculateKPISummary,
  StoreData,
  formatNumber,
} from '@/data/salesData';
import {
  Store,
  TrendingUp,
  Thermometer,
  Package,
  Target,
  Zap,
  AlertTriangle,
} from 'lucide-react';
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
      { value: 'EAST', label: 'East' },
      { value: 'WEST', label: 'West' },
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
      { value: 'HCCB C3', label: 'HCCB C3' },
    ],
  },
  {
    id: 'unit',
    label: 'Unit',
    options: [
      { value: 'CHANDIGARH', label: 'Chandigarh' },
      { value: 'GUJARAT', label: 'Gujarat' },
      { value: 'MUMBAI', label: 'Mumbai' },
      { value: 'HYDERABAD', label: 'Hyderabad' },
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

export default function Overview() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);
  const [drilldownKPI, setDrilldownKPI] = useState<string | null>(null);

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
      if (filters.unit && filters.unit !== 'all' && store.unit !== filters.unit) return false;
      if (filters.vpoClass && filters.vpoClass !== 'all' && store.vpoClass !== filters.vpoClass) return false;

      return true;
    });
  }, [filters, searchQuery]);

  const kpis = useMemo(() => calculateKPISummary(filteredData), [filteredData]);

  const asmLeaderboard = useMemo(() => {
    const asmScores: Record<string, { total: number; count: number }> = {};
    
    filteredData.forEach((store) => {
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
      .slice(0, 5)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }, [filteredData]);

  const handleFilterChange = (id: string, value: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
    toast.success(`Filter applied: ${id} = ${value === 'all' ? 'All' : value}`);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
    toast.info('All filters cleared');
  };

  const handleExport = useCallback(() => {
    const headers = [
      'Global ID', 'Outlet Name', 'Region', 'Unit', 'Bottler', 'VPO Class',
      'Town', 'District', 'State', 'Availability', 'Cooler', 'Activation',
      'SOVI', 'Purity %', 'Overall Score',
    ];

    const rows = filteredData.map((store) => [
      store.globalId, store.outletName, store.region, store.unit, store.bottler,
      store.vpoClass, store.townName, store.district, store.state, store.availabilityTotal,
      store.coolerTotal, store.activationTotal, store.totalSovi, store.coolerPurityPercent,
      store.overallTotalScore,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `store-performance-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${filteredData.length} stores to CSV`);
  }, [filteredData]);

  const handleKPIClick = (kpiType: string) => {
    const routeMap: Record<string, string> = {
      stores: '/stores',
      availability: '/availability',
      cooler: '/coolers',
      activation: '/metrics',
      purity: '/coolers',
      overall: '/metrics',
    };
    
    if (routeMap[kpiType]) {
      navigate(routeMap[kpiType]);
    } else {
      setDrilldownKPI(kpiType);
    }
  };

  const handleStoreClick = (store: StoreData) => {
    setSelectedStore(store);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <FilterBar
        filters={filterConfigs}
        values={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearFilters}
        onExport={handleExport}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
        <KPICard
          title="Store Count"
          value={formatNumber(kpis.storeCount)}
          subtitle="audited stores"
          icon={Store}
          variant="primary"
          trend="up"
          trendValue="+12%"
          onClick={() => handleKPIClick('stores')}
        />
        <KPICard
          title="Availability"
          value={kpis.avgAvailability.toFixed(1)}
          subtitle="75.3% achievement"
          icon={Package}
          variant="default"
          trend="up"
          trendValue="+5.2"
          onClick={() => handleKPIClick('availability')}
        />
        <KPICard
          title="Cooler Score"
          value={kpis.avgCooler.toFixed(1)}
          subtitle="62.5% achievement"
          icon={Thermometer}
          variant="default"
          trend="up"
          trendValue="+3.1"
          onClick={() => handleKPIClick('cooler')}
        />
        <KPICard
          title="Activation"
          value={kpis.avgActivation.toFixed(1)}
          subtitle="15.0% achievement"
          icon={Zap}
          variant="default"
          trend="stable"
          onClick={() => handleKPIClick('activation')}
        />
        <KPICard
          title="Purity Rate"
          value={`${kpis.purityRate.toFixed(0)}%`}
          subtitle="cooler purity"
          icon={Target}
          variant={kpis.purityRate >= 80 ? 'success' : kpis.purityRate >= 50 ? 'warning' : 'danger'}
          trend={kpis.purityRate >= 80 ? 'up' : 'down'}
          onClick={() => handleKPIClick('purity')}
        />
        <KPICard
          title="Overall Score"
          value={kpis.avgOverallScore.toFixed(1)}
          subtitle="21.8% achievement"
          icon={TrendingUp}
          variant="primary"
          trend="up"
          trendValue="+8.5"
          onClick={() => handleKPIClick('overall')}
        />
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <TrendChart data={monthlyTrendData} />
        <RegionalPerformanceChart data={regionSummaryData} />
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <BottlerComparisonChart 
          data={bottlerPerformanceData.slice(0, 6)} 
          className="lg:col-span-2"
        />
        <Leaderboard
          title="Top Performers"
          subtitle="ASM Rankings"
          items={asmLeaderboard}
          onItemClick={(item) => {
            toast.info(`Selected ASM: ${item.name}`, {
              description: `Average score: ${item.score.toFixed(1)}`,
            });
          }}
        />
      </div>

      <DataTable 
        data={filteredData}
        onRowClick={handleStoreClick}
      />

      {filteredData.some((s) => s.coolerPurityPercent < 50) && (
        <div className="rounded-xl border border-danger/20 bg-danger-muted p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger/20">
              <AlertTriangle className="h-5 w-5 text-danger" />
            </div>
            <div>
              <h3 className="font-semibold text-danger">Action Required: Low Purity Stores</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredData.filter((s) => s.coolerPurityPercent < 50).length} stores have 
                cooler purity below 50%. Immediate attention needed to improve brand visibility.
              </p>
              <ul className="mt-3 space-y-1">
                {filteredData
                  .filter((s) => s.coolerPurityPercent < 50)
                  .slice(0, 3)
                  .map((store) => (
                    <li 
                      key={store.id} 
                      className="text-sm text-danger cursor-pointer hover:underline"
                      onClick={() => handleStoreClick(store)}
                    >
                      • {store.outletName} ({store.coolerPurityPercent.toFixed(1)}% purity)
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <StoreDetailModal
        store={selectedStore}
        open={!!selectedStore}
        onClose={() => setSelectedStore(null)}
      />

      <KPIDrilldown
        kpiType={drilldownKPI}
        data={filteredData}
        open={!!drilldownKPI}
        onClose={() => setDrilldownKPI(null)}
      />
    </div>
  );
}
