import { useAuth } from '@/context/AuthContext';
import { usePageLoading } from '@/hooks/usePageLoading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, ShoppingBag, Wallet, Users, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  usePageLoading();
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Browse Trending Slips',
      description: 'Discover the hottest betting tips',
      icon: TrendingUp,
      action: () => navigate('/trending'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'My Purchases',
      description: 'View your purchased slips',
      icon: ShoppingBag,
      action: () => navigate('/purchased'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Wallet',
      description: 'Manage your balance',
      icon: Wallet,
      action: () => navigate('/wallet'),
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Referrals',
      description: 'Earn by referring friends',
      icon: Users,
      action: () => navigate('/referrals'),
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/20 to-gold/20 rounded-lg p-6 border border-primary/30">
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-muted-foreground">
          You're logged in as a <span className="font-semibold text-primary">Regular User</span>
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Account Balance</div>
          <div className="text-2xl font-bold text-gradient-primary">$0.00</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Slips Purchased</div>
          <div className="text-2xl font-bold text-gradient-primary">0</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Win Rate</div>
          <div className="text-2xl font-bold text-gradient-primary">0%</div>
        </Card>
        <Card className="glass-card p-6 border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">Referral Bonus</div>
          <div className="text-2xl font-bold text-gradient-primary">$0.00</div>
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

      {/* Free Daily Brain Section */}
      <Card className="glass-card p-6 border-primary/20">
        <div className="flex items-center gap-4">
          <Gift className="h-12 w-12 text-gold" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Free Daily Brain</h3>
            <p className="text-sm text-muted-foreground">
              Get one free betting tip every day
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-gold">
            Claim Today
          </Button>
        </div>
      </Card>
    </div>
  );
}
