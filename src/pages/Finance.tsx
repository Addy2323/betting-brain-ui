import { BarChart3, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

export default function Finance() {
  // Load finance data from localStorage - completely dependent on localStorage
  const [totalRevenue, setTotalRevenue] = useLocalStorage('financeTotalRevenue', null);
  const [monthlyRevenue, setMonthlyRevenue] = useLocalStorage('financeMonthlyRevenue', null);
  const [pendingPayouts, setPendingPayouts] = useLocalStorage('financePendingPayouts', null);
  const [platformFee, setPlatformFee] = useLocalStorage('financePlatformFee', null);
  const [selectedTab, setSelectedTab] = useLocalStorage('financeTab', 'overview');

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
          <p className="text-3xl font-bold text-primary">
            {totalRevenue !== null ? `TSH ${totalRevenue.toLocaleString()}` : 'No data'}
          </p>
          {totalRevenue !== null && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-win-green" />
              <span className="text-xs text-win-green">+12.5% from last month</span>
            </div>
          )}
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">This Month</p>
            <DollarSign className="h-5 w-5 text-accent" />
          </div>
          <p className="text-3xl font-bold text-accent">
            {monthlyRevenue !== null ? `TSH ${monthlyRevenue.toLocaleString()}` : 'No data'}
          </p>
          {monthlyRevenue !== null && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-win-green" />
              <span className="text-xs text-win-green">+8.3% from last week</span>
            </div>
          )}
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending Payouts</p>
            <DollarSign className="h-5 w-5 text-gold" />
          </div>
          <p className="text-3xl font-bold text-gold">
            {pendingPayouts !== null ? `TSH ${pendingPayouts.toLocaleString()}` : 'No data'}
          </p>
          <p className="text-xs text-muted-foreground mt-2">0 pending requests</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Platform Fee</p>
            <DollarSign className="h-5 w-5 text-win-green" />
          </div>
          <p className="text-3xl font-bold text-win-green">
            {platformFee !== null ? `TSH ${platformFee.toLocaleString()}` : 'No data'}
          </p>
          <p className="text-xs text-muted-foreground mt-2">17% commission</p>
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
            {totalRevenue !== null ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">Slip Sales</p>
                    <p className="text-sm text-muted-foreground">Add data to see slips</p>
                  </div>
                  <p className="text-xl font-bold text-primary">TSH 0</p>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">Subscription Fees</p>
                    <p className="text-sm text-muted-foreground">Add data to see subs</p>
                  </div>
                  <p className="text-xl font-bold text-accent">TSH 0</p>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">Premium Features</p>
                    <p className="text-sm text-muted-foreground">Add data to see users</p>
                  </div>
                  <p className="text-xl font-bold text-gold">TSH 0</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No data available. Add finance data to localStorage to see breakdown.</p>
            )}
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
