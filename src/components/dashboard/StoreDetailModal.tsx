import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScoreBar, StatusBadge } from './ScoreIndicator';
import { StoreData, getScoreStatus } from '@/data/salesData';
import { 
  Store, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Thermometer,
  Package,
  TrendingUp,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface StoreDetailModalProps {
  store: StoreData | null;
  open: boolean;
  onClose: () => void;
}

export function StoreDetailModal({ store, open, onClose }: StoreDetailModalProps) {
  if (!store) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const openInMaps = () => {
    const query = encodeURIComponent(`${store.townName}, ${store.district}, ${store.state}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    toast.info('Opening location in Google Maps');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{store.outletName}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">{store.globalId}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(store.globalId, 'Store ID')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <StatusBadge status={getScoreStatus(store.overallTotalScore)} />
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Score Overview */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ScoreCard 
              label="Overall Score" 
              value={store.overallTotalScore} 
              maxValue={100}
              icon={TrendingUp}
            />
            <ScoreCard 
              label="Availability" 
              value={store.availabilityTotal} 
              maxValue={100}
              icon={Package}
            />
            <ScoreCard 
              label="Cooler" 
              value={store.coolerTotal} 
              maxValue={50}
              icon={Thermometer}
            />
            <ScoreCard 
              label="Purity" 
              value={store.coolerPurityPercent} 
              maxValue={100}
              suffix="%"
              icon={TrendingUp}
            />
          </div>

          {/* Location */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Location
              </h4>
              <Button variant="outline" size="sm" onClick={openInMaps}>
                <ExternalLink className="h-4 w-4 mr-1" />
                View in Maps
              </Button>
            </div>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Town</span>
                <span className="font-medium">{store.townName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">District</span>
                <span className="font-medium">{store.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">State</span>
                <span className="font-medium">{store.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Region</span>
                <span className="font-medium">{store.region}</span>
              </div>
            </div>
          </div>

          {/* Store Details */}
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Store className="h-4 w-4 text-primary" />
              Store Details
            </h4>
            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Outlet Type</span>
                <span className="font-medium">{store.outletType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Archetype</span>
                <span className="font-medium">{store.archetype}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VPO Class</span>
                <span className={cn(
                  'font-medium px-2 py-0.5 rounded-full text-xs',
                  store.vpoClass === 'GOLD' && 'bg-warning/10 text-warning',
                  store.vpoClass === 'SILVER' && 'bg-muted text-muted-foreground',
                  store.vpoClass === 'BRONZE' && 'bg-accent text-accent-foreground',
                  store.vpoClass === 'PLATINUM' && 'bg-chart-5/10 text-chart-5'
                )}>
                  {store.vpoClass}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cooler Presence</span>
                <span className={cn(
                  'font-medium',
                  store.coolerPresence ? 'text-success' : 'text-danger'
                )}>
                  {store.coolerPresence ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Sales Team
            </h4>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <TeamMember label="Sales Manager" name={store.smName} />
              <TeamMember label="ASM" name={store.asmName} />
              <TeamMember label="Sales Executive" name={store.seName} />
              <TeamMember label="Distributor" name={store.distributorName} />
            </div>
          </div>

          {/* Detailed Scores */}
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-3">Detailed Scores</h4>
            <div className="space-y-3">
              <ScoreRow label="Availability Total" value={store.availabilityTotal} max={100} />
              <ScoreRow label="Cooler Total" value={store.coolerTotal} max={50} />
              <ScoreRow label="Activation Total" value={store.activationTotal} max={30} />
              <ScoreRow label="Total SOVI" value={store.totalSovi} max={20} />
              <ScoreRow label="UF Availability" value={store.ufAvailabilityScore} max={30} />
              <ScoreRow label="Strategic Pack Score" value={store.strategicPackScore} max={20} />
              <ScoreRow label="IPS Bonus" value={store.ipsBonus} max={10} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="default"
              onClick={() => {
                toast.success('Store added to watchlist');
              }}
            >
              Add to Watchlist
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ScoreCard({ 
  label, 
  value, 
  maxValue, 
  suffix = '',
  icon: Icon,
}: { 
  label: string; 
  value: number; 
  maxValue: number;
  suffix?: string;
  icon: React.ElementType;
}) {
  const percentage = (value / maxValue) * 100;
  const status = getScoreStatus(value, maxValue);
  
  return (
    <div className="rounded-lg border p-3 text-center">
      <Icon className={cn(
        'h-5 w-5 mx-auto mb-2',
        status === 'excellent' && 'text-success',
        status === 'good' && 'text-chart-3',
        status === 'warning' && 'text-warning',
        status === 'critical' && 'text-danger',
      )} />
      <p className="text-2xl font-bold">{value.toFixed(1)}{suffix}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function TeamMember({ label, name }: { label: string; name: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{name}</span>
    </div>
  );
}

function ScoreRow({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground w-36">{label}</span>
      <div className="flex-1">
        <ScoreBar score={value} maxScore={max} height="sm" />
      </div>
    </div>
  );
}
