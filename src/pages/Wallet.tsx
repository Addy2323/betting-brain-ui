import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, ArrowUp, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Wallet = () => {
  const transactions = [
    { id: 1, type: 'deposit', amount: 50, status: 'completed', date: '2024-01-15', method: 'M-Pesa' },
    { id: 2, type: 'purchase', amount: -9.99, status: 'completed', date: '2024-01-14', method: 'Wallet' },
    { id: 3, type: 'withdrawal', amount: -30, status: 'pending', date: '2024-01-13', method: 'M-Pesa' },
    { id: 4, type: 'deposit', amount: 100, status: 'completed', date: '2024-01-12', method: 'M-Pesa' },
  ];

  const withdrawalLimit = 500;
  const currentWithdrawn = 120;
  const withdrawalProgress = (currentWithdrawn / withdrawalLimit) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds with M-Pesa integration</p>
      </div>

      {/* Balance Card */}
      <Card className="glass-card p-8 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
        <div className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
            <h2 className="font-display text-5xl font-bold text-gradient-gold">
              $247.50
            </h2>
          </div>
          
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="bg-win-green hover:bg-win-green/90 gap-2">
              <ArrowDown className="h-5 w-5" />
              Deposit
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 gap-2">
              <ArrowUp className="h-5 w-5" />
              Withdraw
            </Button>
          </div>
        </div>
      </Card>

      {/* Withdrawal Limits */}
      <Card className="glass-card p-6">
        <h3 className="font-display text-lg font-bold mb-4">Monthly Withdrawal Limit</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Used this month</span>
            <span className="font-bold">${currentWithdrawn} / ${withdrawalLimit}</span>
          </div>
          <Progress value={withdrawalProgress} className="h-3" />
          <p className="text-xs text-muted-foreground">
            ${withdrawalLimit - currentWithdrawn} remaining for this billing cycle
          </p>
        </div>
      </Card>

      {/* Deposit/Withdraw Tabs */}
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        
        <TabsContent value="deposit" className="space-y-4 mt-6">
          <Card className="glass-card p-6">
            <h3 className="font-display text-lg font-bold mb-6">Add Funds</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deposit-amount">Amount (USD)</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="Enter amount"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                    <span className="font-bold text-win-green">M-Pesa</span>
                    <span className="text-xs text-muted-foreground">Instant</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                    <span className="font-bold">Bank Card</span>
                    <span className="text-xs text-muted-foreground">2-5 mins</span>
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-win-green hover:bg-win-green/90" size="lg">
                Continue with M-Pesa
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="withdraw" className="space-y-4 mt-6">
          <Card className="glass-card p-6">
            <h3 className="font-display text-lg font-bold mb-6">Withdraw Funds</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="withdraw-amount">Amount (USD)</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="Enter amount"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">M-Pesa Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254 xxx xxx xxx"
                  className="mt-2"
                />
              </div>

              <div className="bg-muted/30 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Withdrawal Fee</span>
                  <span className="font-medium">$0.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Time</span>
                  <span className="font-medium">5-15 mins</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Request Withdrawal
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction History */}
      <Card className="glass-card p-6">
        <h3 className="font-display text-lg font-bold mb-6">Transaction History</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-full ${
                    tx.type === 'deposit'
                      ? 'bg-win-green/20'
                      : tx.type === 'withdrawal'
                      ? 'bg-primary/20'
                      : 'bg-secondary/20'
                  }`}
                >
                  {tx.type === 'deposit' ? (
                    <ArrowDown className="h-5 w-5 text-win-green" />
                  ) : tx.type === 'withdrawal' ? (
                    <ArrowUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ArrowUp className="h-5 w-5 text-secondary" />
                  )}
                </div>
                <div>
                  <p className="font-semibold capitalize">{tx.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {tx.method} • {tx.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`font-bold ${
                    tx.amount > 0 ? 'text-win-green' : 'text-foreground'
                  }`}
                >
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </span>
                {tx.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-win-green" />
                ) : tx.status === 'pending' ? (
                  <Clock className="h-5 w-5 text-accent" />
                ) : (
                  <XCircle className="h-5 w-5 text-loss-red" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Wallet;
