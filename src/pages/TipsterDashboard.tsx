import { useAuth } from '@/context/AuthContext';
import { usePageLoading } from '@/hooks/usePageLoading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, DollarSign, Brain, Award, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DASHBOARD_METRICS } from '@/config/mockData';

export default function TipsterDashboard() {
  usePageLoading();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load metrics from localStorage
  const [totalRevenue] = useLocalStorage('tipsterTotalRevenue', DASHBOARD_METRICS.tipster.totalRevenue);
  const [slipsCreated] = useLocalStorage('tipsterSlipsCreated', DASHBOARD_METRICS.tipster.slipsCreated);
  const [winRate] = useLocalStorage('tipsterWinRate', DASHBOARD_METRICS.tipster.winRate);
  const [followers] = useLocalStorage('tipsterFollowers', DASHBOARD_METRICS.tipster.followers);

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
          <div className="text-2xl font-bold text-gradient-primary">TSH {totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-2">This month</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Slips Created</div>
          <div className="text-2xl font-bold text-gradient-primary">{slipsCreated}</div>
          <div className="text-xs text-muted-foreground mt-2">Total</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Win Rate</div>
          <div className="text-2xl font-bold text-gradient-primary">{winRate}%</div>
          <div className="text-xs text-muted-foreground mt-2">All time</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Followers</div>
          <div className="text-2xl font-bold text-gradient-primary">{followers}</div>
          <div className="text-xs text-muted-foreground mt-2">Active</div>
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
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No slips created yet</p>
          <Button
            onClick={() => navigate('/create-slip')}
            className="bg-gradient-to-r from-primary to-gold"
          >
            Create Your First Slip
          </Button>
        </div>
      </Card>
    </div>
  );
}
