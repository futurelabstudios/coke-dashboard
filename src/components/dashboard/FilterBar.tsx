import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, X, Filter, Download, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
  placeholder?: string;
}

interface FilterBarProps {
  filters: FilterConfig[];
  values: Record<string, string>;
  onFilterChange: (id: string, value: string) => void;
  onClearAll?: () => void;
  onExport?: () => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
}

export function FilterBar({
  filters,
  values,
  onFilterChange,
  onClearAll,
  onExport,
  searchPlaceholder = 'Search stores...',
  searchValue = '',
  onSearchChange,
  className,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(true);
  const activeFiltersCount = Object.values(values).filter(v => v && v !== 'all').length;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        {onSearchChange && (
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-card"
            />
          </div>
        )}

        {/* Filter toggle */}
        <Button
          variant={showFilters ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        {/* Date indicator */}
        <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Data updated:</span>
          <span className="font-medium">Dec 2025</span>
        </div>

        {/* Export button */}
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport} className="gap-2 ml-auto">
            <Download className="h-4 w-4" />
            Export
          </Button>
        )}
      </div>

      {/* Filter dropdowns */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card/50 p-4">
          {filters.map((filter) => (
            <div key={filter.id} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                {filter.label}
              </label>
              <Select
                value={values[filter.id] || 'all'}
                onValueChange={(value) => onFilterChange(filter.id, value)}
              >
                <SelectTrigger className="w-[160px] bg-card">
                  <SelectValue placeholder={filter.placeholder || 'All'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          {activeFiltersCount > 0 && onClearAll && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="mt-5 gap-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
