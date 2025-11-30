import { BarChart3, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Finance() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Finance Dashboard
          </h1>
          <p className="text-muted-foreground">Platform revenue and financial metrics</p>
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-primary">TSH 45,230,000</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-4 w-4 text-win-green" />
            <span className="text-xs text-win-green">+12.5% from last month</span>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">This Month</p>
            <DollarSign className="h-5 w-5 text-accent" />
          </div>
          <p className="text-3xl font-bold text-accent">TSH 12,890,000</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-4 w-4 text-win-green" />
            <span className="text-xs text-win-green">+8.3% from last week</span>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending Payouts</p>
            <DollarSign className="h-5 w-5 text-gold" />
          </div>
          <p className="text-3xl font-bold text-gold">TSH 8,450,000</p>
          <p className="text-xs text-muted-foreground mt-2">45 pending requests</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Platform Fee</p>
            <DollarSign className="h-5 w-5 text-win-green" />
          </div>
          <p className="text-3xl font-bold text-win-green">TSH 5,670,000</p>
          <p className="text-xs text-muted-foreground mt-2">30% commission</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="tipsters">Tipster Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">Slip Sales</p>
                  <p className="text-sm text-muted-foreground">1,234 slips sold</p>
                </div>
                <p className="text-xl font-bold text-primary">TSH 38,560,000</p>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">Subscription Fees</p>
                  <p className="text-sm text-muted-foreground">567 active subs</p>
                </div>
                <p className="text-xl font-bold text-accent">TSH 4,250,000</p>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">Premium Features</p>
                  <p className="text-sm text-muted-foreground">89 users</p>
                </div>
                <p className="text-xl font-bold text-gold">TSH 2,420,000</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <p className="text-center text-muted-foreground py-12">Transaction history coming soon</p>
        </TabsContent>

        <TabsContent value="tipsters">
          <p className="text-center text-muted-foreground py-12">Tipster earnings breakdown coming soon</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
