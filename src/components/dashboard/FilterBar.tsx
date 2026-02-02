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
    <div className={cn('space-y-3 sm:space-y-4', className)}>
      {/* Main toolbar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Search */}
        {onSearchChange && (
          <div className="relative flex-1 min-w-0 sm:min-w-[200px] sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-card text-sm"
            />
          </div>
        )}

        {/* Filter toggle */}
        <Button
          variant={showFilters ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-1.5 sm:gap-2 h-9 px-2.5 sm:px-3"
        >
          <Filter className="h-4 w-4" />
          <span className="hidden xs:inline">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[9px] sm:text-[10px] font-bold text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        {/* Date indicator - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Data updated:</span>
          <span className="font-medium">Dec 2025</span>
        </div>

        {/* Export button */}
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport} className="gap-1.5 sm:gap-2 h-9 px-2.5 sm:px-3 ml-auto">
            <Download className="h-4 w-4" />
            <span className="hidden xs:inline">Export</span>
          </Button>
        )}
      </div>

      {/* Filter dropdowns */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-lg border bg-card/50 p-3 sm:p-4">
          {filters.map((filter) => (
            <div key={filter.id} className="flex flex-col gap-1 min-w-0">
              <label className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                {filter.label}
              </label>
              <Select
                value={values[filter.id] || 'all'}
                onValueChange={(value) => onFilterChange(filter.id, value)}
              >
                <SelectTrigger className="w-[120px] sm:w-[160px] bg-card text-xs sm:text-sm h-8 sm:h-9">
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
              className="mt-4 sm:mt-5 gap-1 text-muted-foreground hover:text-foreground h-8 text-xs"
            >
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
