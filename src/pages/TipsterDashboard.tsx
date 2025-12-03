import { useAuth } from '@/context/AuthContext';
import { usePageLoading } from '@/hooks/usePageLoading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, DollarSign, Brain, Award, Users, TrendingUp, Eye, Edit, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { useMemo, useState } from 'react';

interface CreatedSlip {
  id: string;
  totalPicks: number;
  totalOdds: number;
  price: number;
  bookmakers: string[];
  matches: any[];
  status: 'draft' | 'published' | 'expired' | 'sold_out';
  createdAt: string;
  startTime: string;
  endTime: string;
  purchases: number;
  earnings: number;
}

export default function TipsterDashboard() {
  usePageLoading();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSlip, setSelectedSlip] = useState<CreatedSlip | null>(null);

  // Load slips from localStorage
  const [mySlips] = useLocalStorage<CreatedSlip[]>(STORAGE_KEYS.TIPSTER_SLIPS, []);

  // Calculate metrics from actual slip data
  const metrics = useMemo(() => {
    const totalEarnings = mySlips.reduce((sum, slip) => sum + slip.earnings, 0);
    const totalSales = mySlips.reduce((sum, slip) => sum + slip.purchases, 0);
    const publishedCount = mySlips.filter(s => s.status === 'published').length;
    const totalSlips = mySlips.length;

    return {
      totalRevenue: totalEarnings,
      slipsCreated: totalSlips,
      publishedSlips: publishedCount,
      totalSales: totalSales,
    };
  }, [mySlips]);

  const quickActions = [
    {
      title: 'Create New Slip',
      description: 'Share your betting predictions',
      icon: FileText,
      action: () => navigate('/create-slip'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Revenue',
      description: 'Track your earnings',
      icon: DollarSign,
      action: () => navigate('/revenue'),
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'BrainScore',
      description: 'View your performance metrics',
      icon: Brain,
      action: () => navigate('/brainscore'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Badges',
      description: 'Earn and display achievements',
      icon: Award,
      action: () => navigate('/badges'),
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/20 to-gold/20 rounded-lg p-6 border border-primary/30">
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Welcome, {user?.fullName}!
        </h1>
        <p className="text-muted-foreground">
          You're logged in as a <span className="font-semibold text-primary">Tipster</span>
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Total Revenue</div>
          <div className="text-2xl font-bold text-gold">TSH {metrics.totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-2">All earnings</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Slips Created</div>
          <div className="text-2xl font-bold text-primary">{metrics.slipsCreated}</div>
          <div className="text-xs text-muted-foreground mt-2">Total</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Published</div>
          <div className="text-2xl font-bold text-green-500">{metrics.publishedSlips}</div>
          <div className="text-xs text-muted-foreground mt-2">Active slips</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Total Sales</div>
          <div className="text-2xl font-bold text-accent">{metrics.totalSales}</div>
          <div className="text-xs text-muted-foreground mt-2">Purchases</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.title}
                className="glass-card p-6 border-primary/20 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/20"
                onClick={action.action}
              >
                <div className={`bg-gradient-to-br ${action.color} p-3 rounded-lg w-fit mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Performance Chart */}
      <Card className="glass-card p-6 border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Performance Overview</h3>
        </div>
        <div className="h-64 flex items-center justify-center bg-slate-800/50 rounded-lg">
          <p className="text-muted-foreground">Chart will display your performance metrics</p>
        </div>
      </Card>

      {/* Recent Slips */}
      <Card className="glass-card p-6 border-primary/20">
        <h3 className="text-lg font-semibold mb-4">Recent Slips</h3>
        {mySlips.length > 0 ? (
          <div className="space-y-3">
            {mySlips.slice(-5).reverse().map((slip) => (
              <div key={slip.id} className="p-4 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">
                      {slip.totalPicks} Picks • {slip.totalOdds.toFixed(2)} Odds
                    </span>
                    <Badge 
                      className={`text-xs ${
                        slip.status === 'published' ? 'bg-green-500/20 text-green-500' :
                        slip.status === 'draft' ? 'bg-yellow-500/20 text-yellow-500' :
                        slip.status === 'expired' ? 'bg-red-500/20 text-red-500' :
                        'bg-purple-500/20 text-purple-500'
                      }`}
                    >
                      {slip.status.charAt(0).toUpperCase() + slip.status.slice(1).replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(slip.createdAt).toLocaleDateString()} • Price: TSH {slip.price.toLocaleString()} • Sales: {slip.purchases}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
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
                    onClick={() => navigate(`/my-slips`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No slips created yet</p>
            <Button
              onClick={() => navigate('/create-slip')}
              className="bg-gradient-to-r from-primary to-gold"
            >
              Create Your First Slip
            </Button>
          </div>
        )}
      </Card>

      {/* Slip Detail Modal */}
      {selectedSlip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="glass-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Slip Details</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedSlip(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Picks</p>
                <p className="font-semibold text-lg">{selectedSlip.totalPicks}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Odds</p>
                <p className="font-semibold text-lg text-gold">{selectedSlip.totalOdds.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Price</p>
                <p className="font-semibold text-lg">TSH {selectedSlip.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge className={`text-xs ${
                  selectedSlip.status === 'published' ? 'bg-green-500/20 text-green-500' :
                  selectedSlip.status === 'draft' ? 'bg-yellow-500/20 text-yellow-500' :
                  selectedSlip.status === 'expired' ? 'bg-red-500/20 text-red-500' :
                  'bg-purple-500/20 text-purple-500'
                }`}>
                  {selectedSlip.status.charAt(0).toUpperCase() + selectedSlip.status.slice(1).replace('_', ' ')}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Purchases</p>
                <p className="font-semibold text-lg">{selectedSlip.purchases}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Earnings</p>
                <p className="font-semibold text-lg text-gold">TSH {selectedSlip.earnings.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-semibold text-sm">{new Date(selectedSlip.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Bookmakers</p>
                <p className="font-semibold text-sm capitalize">{selectedSlip.bookmakers.join(', ')}</p>
              </div>
            </div>

            {selectedSlip.matches && selectedSlip.matches.length > 0 && (
              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-muted-foreground text-sm font-semibold">Matches</p>
                <div className="space-y-2">
                  {selectedSlip.matches.map((match, idx) => (
                    <div key={match.id} className="p-2 bg-muted/30 rounded text-xs">
                      <p className="font-semibold">Match #{idx + 1}</p>
                      <p className="text-muted-foreground">Name: {match.name}</p>
                      <p className="text-muted-foreground">Options: {match.options}</p>
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
    </div>
  );
}
