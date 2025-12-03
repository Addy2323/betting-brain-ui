import { useState } from 'react';
import { Eye, Trash2, Edit, TrendingUp, Calendar, DollarSign, Tag, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { useToast } from '@/hooks/use-toast';

interface CreatedSlip {
  id: string;
  league: string;
  risk: string;
  price: string;
  bookmakers: string[];
  picks: number;
  totalOdds: number;
  status: 'draft' | 'published' | 'expired' | 'sold_out';
  createdAt: string;
  startTime: string;
  endTime: string;
  purchases: number;
  earnings: number;
}

export default function MySlips() {
  const { toast } = useToast();
  const [mySlips, setMySlips] = useLocalStorage<CreatedSlip[]>(STORAGE_KEYS.TIPSTER_SLIPS, []);
  const [selectedSlip, setSelectedSlip] = useState<CreatedSlip | null>(null);
  const [editingSlip, setEditingSlip] = useState<CreatedSlip | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<CreatedSlip>>({});

  const handleEditClick = (slip: CreatedSlip) => {
    setEditingSlip(slip);
    setEditFormData({ ...slip });
  };

  const handleSaveEdit = () => {
    if (!editingSlip) return;

    const updatedSlips = mySlips.map(slip =>
      slip.id === editingSlip.id ? { ...slip, ...editFormData } : slip
    );
    setMySlips(updatedSlips);

    // Also update in trending slips if published
    if (editingSlip.status === 'published') {
      const trendingSlips = JSON.parse(localStorage.getItem('trendingSlips') || '[]');
      const updatedTrendingSlips = trendingSlips.map((slip: any) =>
        slip.id === editingSlip.id ? { ...slip, ...editFormData } : slip
      );
      localStorage.setItem('trendingSlips', JSON.stringify(updatedTrendingSlips));
    }

    toast({
      title: "Slip Updated",
      description: "Your slip has been updated successfully",
    });
    setEditingSlip(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditingSlip(null);
    setEditFormData({});
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'expired':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'sold_out':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  const deleteSlip = (id: string) => {
    setMySlips(mySlips.filter(slip => slip.id !== id));
  };

  const totalEarnings = mySlips.reduce((sum, slip) => sum + slip.earnings, 0);
  const totalSales = mySlips.reduce((sum, slip) => sum + slip.purchases, 0);

  return (
    <div className="w-full space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3">
        <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
        <div className="min-w-0">
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
            My Slips
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground truncate">Manage and track your created slips</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full min-w-0">
        <Card className="glass-card p-3 md:p-4 space-y-2">
          <p className="text-xs md:text-sm text-muted-foreground">Total Slips</p>
          <p className="text-2xl md:text-3xl font-bold text-primary">{mySlips.length}</p>
        </Card>
        <Card className="glass-card p-3 md:p-4 space-y-2">
          <p className="text-xs md:text-sm text-muted-foreground">Total Sales</p>
          <p className="text-2xl md:text-3xl font-bold text-accent">{totalSales}</p>
        </Card>
        <Card className="glass-card p-3 md:p-4 space-y-2">
          <p className="text-xs md:text-sm text-muted-foreground">Total Earnings</p>
          <p className="text-2xl md:text-3xl font-bold text-gold">TSH {totalEarnings.toLocaleString()}</p>
        </Card>
        <Card className="glass-card p-3 md:p-4 space-y-2">
          <p className="text-xs md:text-sm text-muted-foreground">Published</p>
          <p className="text-2xl md:text-3xl font-bold text-green-500">
            {mySlips.filter(s => s.status === 'published').length}
          </p>
        </Card>
      </div>

      {/* Slips List */}
      {mySlips.length > 0 ? (
        <div className="space-y-3 md:space-y-4 w-full min-w-0">
          {mySlips.map((slip) => (
            <Card key={slip.id} className="glass-card p-3 md:p-4 space-y-3 w-full min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm md:text-base truncate">{slip.league}</h3>
                    <Badge className={`text-xs ${getStatusColor(slip.status)}`}>
                      {getStatusLabel(slip.status)}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Created: {new Date(slip.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => setSelectedSlip(slip)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditClick(slip)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => deleteSlip(slip.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Slip Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 text-xs md:text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Risk Level</p>
                  <p className="font-semibold capitalize">{slip.risk}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Picks</p>
                  <p className="font-semibold">{slip.picks}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Total Odds</p>
                  <p className="font-semibold">{slip.totalOdds.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Price</p>
                  <p className="font-semibold text-gold">TSH {slip.price}</p>
                </div>
              </div>

              {/* Sales Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 p-2 md:p-3 bg-muted/30 rounded-lg text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Purchases</p>
                    <p className="font-semibold">{slip.purchases}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Earnings</p>
                    <p className="font-semibold text-gold">TSH {slip.earnings.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Expires</p>
                    <p className="font-semibold">{new Date(slip.endTime).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Bookmakers */}
              <div className="flex flex-wrap gap-1">
                {slip.bookmakers.map((bm) => (
                  <Badge key={bm} variant="outline" className="text-xs capitalize">
                    {bm}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glass-card p-8 md:p-12 text-center w-full min-w-0">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground mb-2">No slips created yet</p>
          <p className="text-sm text-muted-foreground">Create your first slip to get started</p>
        </Card>
      )}

      {/* Detail Modal */}
      {selectedSlip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="glass-card p-4 md:p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold">{selectedSlip.league} Slip</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedSlip(null)}
              >
                ✕
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge className={`${getStatusColor(selectedSlip.status)} text-xs`}>
                  {getStatusLabel(selectedSlip.status)}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Risk Level</p>
                <p className="font-semibold capitalize">{selectedSlip.risk}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Picks</p>
                <p className="font-semibold">{selectedSlip.picks}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Odds</p>
                <p className="font-semibold">{selectedSlip.totalOdds.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Price</p>
                <p className="font-semibold text-gold">TSH {selectedSlip.price}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Purchases</p>
                <p className="font-semibold">{selectedSlip.purchases}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Earnings</p>
                <p className="font-semibold text-gold">TSH {selectedSlip.earnings.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-semibold text-xs">{new Date(selectedSlip.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Bookmakers</p>
              <div className="flex flex-wrap gap-2">
                {selectedSlip.bookmakers.map((bm) => (
                  <Badge key={bm} variant="outline" className="capitalize">
                    {bm}
                  </Badge>
                ))}
              </div>
            </div>

            {(selectedSlip as any).bookingCodes && Object.keys((selectedSlip as any).bookingCodes).length > 0 && (
              <div className="space-y-2 border-t border-border pt-3">
                <p className="text-muted-foreground text-sm font-semibold">Booking Codes</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries((selectedSlip as any).bookingCodes).map(([bookmaker, code]) => (
                    <div key={bookmaker} className="p-2 bg-muted/30 rounded text-xs">
                      <p className="text-muted-foreground capitalize">{bookmaker}</p>
                      <p className="font-semibold text-primary">{code as string}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(selectedSlip as any).proofImage && (
              <div className="space-y-2 border-t border-border pt-3">
                <p className="text-muted-foreground text-sm font-semibold">Slip Proof</p>
                <img 
                  src={(selectedSlip as any).proofImage} 
                  alt="Slip Proof" 
                  className="w-full h-auto max-h-64 object-contain rounded-lg border border-border"
                />
              </div>
            )}

            {(selectedSlip as any).pickDetails && (selectedSlip as any).pickDetails.length > 0 && (
              <div className="space-y-2 border-t border-border pt-3">
                <p className="text-muted-foreground text-sm font-semibold">Pick Details</p>
                <div className="space-y-2">
                  {(selectedSlip as any).pickDetails.map((pick: any, idx: number) => (
                    <div key={pick.id} className="p-2 bg-muted/30 rounded text-xs">
                      <p className="font-semibold">Pick #{idx + 1}</p>
                      <p className="text-muted-foreground">Match: {pick.match}</p>
                      <p className="text-muted-foreground">Selection: {pick.pick}</p>
                      <p className="text-muted-foreground">Odds: {pick.odds}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              className="w-full"
              onClick={() => setSelectedSlip(null)}
            >
              Close
            </Button>
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      {editingSlip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="glass-card p-4 md:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold">Edit Slip</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancelEdit}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">League</label>
                  <Input
                    value={editFormData.league || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, league: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Risk Level</label>
                  <Input
                    value={editFormData.risk || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, risk: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (TSH)</label>
                  <Input
                    type="number"
                    value={editFormData.price || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <Input
                    type="datetime-local"
                    value={editFormData.startTime || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, startTime: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">End Time</label>
                  <Input
                    type="datetime-local"
                    value={editFormData.endTime || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, endTime: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-accent"
                  onClick={handleSaveEdit}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
