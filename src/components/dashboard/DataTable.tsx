import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ScoreBar, StatusBadge } from './ScoreIndicator';
import { ChevronDown, ChevronUp, ChevronRight, Store, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StoreData, getScoreStatus } from '@/data/salesData';

interface DataTableProps {
  data: StoreData[];
  onRowClick?: (store: StoreData) => void;
  className?: string;
}

type SortField = 'outletName' | 'overallTotalScore' | 'availabilityTotal' | 'coolerTotal' | 'coolerPurityPercent';
type SortDirection = 'asc' | 'desc';

export function DataTable({ data, onRowClick, className }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>('overallTotalScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * modifier;
    }
    return ((aValue as number) - (bValue as number)) * modifier;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className={cn('rounded-xl border bg-card', className)}>
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h3 className="font-semibold text-foreground">Store Performance</h3>
          <p className="text-sm text-muted-foreground">{data.length} stores</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10"></TableHead>
              <TableHead 
                className="cursor-pointer select-none"
                onClick={() => handleSort('outletName')}
              >
                <div className="flex items-center gap-1">
                  Store
                  <SortIcon field="outletName" />
                </div>
              </TableHead>
              <TableHead>Location</TableHead>
              <TableHead>VPO Class</TableHead>
              <TableHead 
                className="cursor-pointer select-none text-right"
                onClick={() => handleSort('availabilityTotal')}
              >
                <div className="flex items-center justify-end gap-1">
                  Availability
                  <SortIcon field="availabilityTotal" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer select-none text-right"
                onClick={() => handleSort('coolerTotal')}
              >
                <div className="flex items-center justify-end gap-1">
                  Cooler
                  <SortIcon field="coolerTotal" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer select-none text-right"
                onClick={() => handleSort('coolerPurityPercent')}
              >
                <div className="flex items-center justify-end gap-1">
                  Purity %
                  <SortIcon field="coolerPurityPercent" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer select-none"
                onClick={() => handleSort('overallTotalScore')}
              >
                <div className="flex items-center gap-1">
                  Overall Score
                  <SortIcon field="overallTotalScore" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((store) => (
              <>
                <TableRow
                  key={store.id}
                  className={cn(
                    'cursor-pointer transition-colors',
                    expandedRow === store.id && 'bg-accent/50'
                  )}
                  onClick={() => {
                    setExpandedRow(expandedRow === store.id ? null : store.id);
                    onRowClick?.(store);
                  }}
                >
                  <TableCell className="w-10">
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 text-muted-foreground transition-transform',
                        expandedRow === store.id && 'rotate-90'
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Store className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{store.outletName}</p>
                        <p className="text-xs text-muted-foreground">{store.globalId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {store.townName}, {store.district}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
                      store.vpoClass === 'GOLD' && 'bg-warning/10 text-warning',
                      store.vpoClass === 'SILVER' && 'bg-muted text-muted-foreground',
                      store.vpoClass === 'BRONZE' && 'bg-accent text-accent-foreground',
                      store.vpoClass === 'PLATINUM' && 'bg-chart-5/10 text-chart-5'
                    )}>
                      {store.vpoClass}
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {store.availabilityTotal}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {store.coolerTotal}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={cn(
                      'tabular-nums',
                      store.coolerPurityPercent >= 80 && 'text-success',
                      store.coolerPurityPercent >= 40 && store.coolerPurityPercent < 80 && 'text-warning',
                      store.coolerPurityPercent < 40 && 'text-danger'
                    )}>
                      {store.coolerPurityPercent.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="w-32">
                      <ScoreBar score={store.overallTotalScore} maxScore={100} height="sm" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={getScoreStatus(store.overallTotalScore)} />
                  </TableCell>
                </TableRow>
                
                {/* Expanded details row */}
                {expandedRow === store.id && (
                  <TableRow className="bg-accent/30 hover:bg-accent/30">
                    <TableCell colSpan={9} className="p-0">
                      <div className="grid grid-cols-2 gap-4 p-5 md:grid-cols-4">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Sales Manager</p>
                          <p className="text-sm font-medium">{store.smName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">ASM</p>
                          <p className="text-sm font-medium">{store.asmName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Sales Executive</p>
                          <p className="text-sm font-medium">{store.seName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Distributor</p>
                          <p className="text-sm font-medium">{store.distributorName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Activation Score</p>
                          <p className="text-sm font-medium">{store.activationTotal}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">SOVI Score</p>
                          <p className="text-sm font-medium">{store.totalSovi}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">UF Available</p>
                          <p className="text-sm font-medium">{store.ufAvailabilityCount}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">IPS Bonus</p>
                          <p className="text-sm font-medium">{store.ipsBonus}</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
