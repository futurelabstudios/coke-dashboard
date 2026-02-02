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
              className="pl-9 bg-muted/30 border-border/30 text-sm h-10 rounded-xl focus:bg-muted/50 transition-colors"
            />
          </div>
        )}

        {/* Filter toggle */}
        <Button
          variant={showFilters ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'gap-1.5 sm:gap-2 h-10 px-3 sm:px-4 rounded-xl border-border/30 transition-all',
            showFilters && 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20'
          )}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden xs:inline">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        {/* Date indicator - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-border/30 bg-muted/30 px-4 py-2.5 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Updated:</span>
          <span className="font-semibold text-foreground">Dec 2025</span>
        </div>

        {/* Export button */}
        {onExport && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport} 
            className="gap-1.5 sm:gap-2 h-10 px-3 sm:px-4 rounded-xl border-border/30 ml-auto hover:bg-success/10 hover:text-success hover:border-success/30 transition-all"
          >
            <Download className="h-4 w-4" />
            <span className="hidden xs:inline">Export</span>
          </Button>
        )}
      </div>

      {/* Filter dropdowns */}
      {showFilters && (
        <div className="glass-card rounded-2xl p-4 sm:p-5 animate-fade-in">
          <div className="flex flex-wrap items-end gap-3 sm:gap-4">
            {filters.map((filter) => (
              <div key={filter.id} className="flex flex-col gap-1.5 min-w-0">
                <label className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {filter.label}
                </label>
                <Select
                  value={values[filter.id] || 'all'}
                  onValueChange={(value) => onFilterChange(filter.id, value)}
                >
                  <SelectTrigger className="w-[130px] sm:w-[160px] bg-muted/30 border-border/30 text-xs sm:text-sm h-10 rounded-xl">
                    <SelectValue placeholder={filter.placeholder || 'All'} />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/30">
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
                className="gap-1.5 text-muted-foreground hover:text-danger hover:bg-danger/10 h-10 rounded-xl px-3"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
