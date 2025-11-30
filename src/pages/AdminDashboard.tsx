import { useAuth } from '@/context/AuthContext';
import { usePageLoading } from '@/hooks/usePageLoading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, BarChart3, DollarSign, AlertTriangle, Flag, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  usePageLoading();
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Verify Tipsters',
      description: 'Review and verify tipster accounts',
      icon: UserCheck,
      action: () => navigate('/verify-tipsters'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Finance Dashboard',
      description: 'Monitor financial metrics',
      icon: BarChart3,
      action: () => navigate('/finance'),
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Withdrawals',
      description: 'Process withdrawal requests',
      icon: DollarSign,
      action: () => navigate('/withdrawals'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Disputes',
      description: 'Resolve user disputes',
      icon: AlertTriangle,
      action: () => navigate('/disputes'),
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/20 to-gold/20 rounded-lg p-6 border border-primary/30">
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome, {user?.fullName}. You're logged in as an <span className="font-semibold text-primary">Administrator</span>
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Total Users</div>
          <div className="text-2xl font-bold text-gradient-primary">0</div>
          <div className="text-xs text-muted-foreground mt-2">Active accounts</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Pending Verifications</div>
          <div className="text-2xl font-bold text-gradient-primary">0</div>
          <div className="text-xs text-muted-foreground mt-2">Tipsters</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Platform Revenue</div>
          <div className="text-2xl font-bold text-gradient-primary">$0.00</div>
          <div className="text-xs text-muted-foreground mt-2">This month</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Open Disputes</div>
          <div className="text-2xl font-bold text-gradient-primary">0</div>
          <div className="text-xs text-muted-foreground mt-2">Unresolved</div>
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

      {/* System Health */}
      <Card className="glass-card p-6 border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">System Health</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Server Status</span>
              <span className="text-sm font-semibold text-green-500">Healthy</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-full"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Database</span>
              <span className="text-sm font-semibold text-green-500">Operational</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-full"></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-card p-6 border-primary/20">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      </Card>
    </div>
  );
}
