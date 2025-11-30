import { useAuth } from '@/context/AuthContext';
import { usePageLoading } from '@/hooks/usePageLoading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Settings, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SuperAdminDashboard() {
  usePageLoading();
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Audit Log',
      description: 'View system audit trail',
      icon: Shield,
      action: () => navigate('/audit-log'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'ProofChain',
      description: 'Verify transaction integrity',
      icon: Lock,
      action: () => navigate('/proofchain'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Global Settings',
      description: 'Configure system settings',
      icon: Settings,
      action: () => navigate('/settings'),
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/20 to-gold/20 rounded-lg p-6 border border-primary/30">
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Super Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome, {user?.fullName}. You have <span className="font-semibold text-primary">full system access</span>
        </p>
      </div>

      {/* Critical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Total Users</div>
          <div className="text-2xl font-bold text-gradient-primary">0</div>
          <div className="text-xs text-muted-foreground mt-2">All roles</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">System Uptime</div>
          <div className="text-2xl font-bold text-gradient-primary">99.9%</div>
          <div className="text-xs text-muted-foreground mt-2">Last 30 days</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Total Revenue</div>
          <div className="text-2xl font-bold text-gradient-primary">$0.00</div>
          <div className="text-xs text-muted-foreground mt-2">All time</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Security Alerts</div>
          <div className="text-2xl font-bold text-gradient-primary">0</div>
          <div className="text-xs text-muted-foreground mt-2">Active</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">System Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* System Status */}
      <Card className="glass-card p-6 border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">System Status</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">API Server</span>
              <span className="text-sm font-semibold text-green-500">Operational</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-full"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Database Cluster</span>
              <span className="text-sm font-semibold text-green-500">Healthy</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-full"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Cache Layer</span>
              <span className="text-sm font-semibold text-green-500">Operational</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-full"></div>
            </div>
          </div>
        </div>
      </Card>

      {/* User Management */}
      <Card className="glass-card p-6 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">User Management</h3>
          </div>
          <Button variant="outline" className="border-primary/20">
            View All Users
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Regular Users</div>
            <div className="text-xl font-bold">0</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Tipsters</div>
            <div className="text-xl font-bold">0</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Admins</div>
            <div className="text-xl font-bold">0</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Super Admins</div>
            <div className="text-xl font-bold">1</div>
          </div>
        </div>
      </Card>

      {/* Security Alerts */}
      <Card className="glass-card p-6 border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <AlertCircle className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-semibold">Security Alerts</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No security alerts at this time</p>
        </div>
      </Card>
    </div>
  );
}
