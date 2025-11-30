import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, ArrowUp, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PaymentMethods } from '@/components/PaymentMethods';

import { useState } from 'react';

const Wallet = () => {
  const [selectedDepositMethod, setSelectedDepositMethod] = useState<string | null>(null);
  const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState<string | null>(null);

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
              TSH 247,500
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
            <span className="font-bold">TSH {currentWithdrawn * 1000} / TSH {withdrawalLimit * 1000}</span>
          </div>
          <Progress value={withdrawalProgress} className="h-3" />
          <p className="text-xs text-muted-foreground">
            TSH {(withdrawalLimit - currentWithdrawn) * 1000} remaining for this billing cycle
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
                <Label htmlFor="deposit-amount">Amount (TSH)</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="Enter amount"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  <Button 
                    onClick={() => setSelectedDepositMethod('mpesa')}
                    className={`h-auto p-4 flex flex-col gap-3 transition-all ${
                      selectedDepositMethod === 'mpesa'
                        ? 'border-2 border-primary bg-primary/10'
                        : 'border border-border hover:border-primary'
                    }`}
                    variant="outline"
                  >
                    <img src="/mpesa.png" alt="M-Pesa" className="h-8 w-auto" />
                    <div>
                      <span className="font-bold text-win-green block text-xs">M-Pesa</span>
                      <span className="text-xs text-muted-foreground">Instant</span>
                    </div>
                    {selectedDepositMethod === 'mpesa' && (
                      <Badge className="mt-2 bg-primary text-primary-foreground">Selected</Badge>
                    )}
                  </Button>
                  <Button 
                    onClick={() => setSelectedDepositMethod('airtel')}
                    className={`h-auto p-4 flex flex-col gap-3 transition-all ${
                      selectedDepositMethod === 'airtel'
                        ? 'border-2 border-primary bg-primary/10'
                        : 'border border-border hover:border-primary'
                    }`}
                    variant="outline"
                  >
                    <img src="/airtelmoney.png" alt="Airtel Money" className="h-8 w-auto" />
                    <div>
                      <span className="font-bold block text-xs">Airtel Money</span>
                      <span className="text-xs text-muted-foreground">5-15 mins</span>
                    </div>
                    {selectedDepositMethod === 'airtel' && (
                      <Badge className="mt-2 bg-primary text-primary-foreground">Selected</Badge>
                    )}
                  </Button>
                  <Button 
                    onClick={() => setSelectedDepositMethod('bank')}
                    className={`h-auto p-4 flex flex-col gap-3 transition-all ${
                      selectedDepositMethod === 'bank'
                        ? 'border-2 border-primary bg-primary/10'
                        : 'border border-border hover:border-primary'
                    }`}
                    variant="outline"
                  >
                    <img src="/bank.png" alt="Bank" className="h-8 w-auto" />
                    <div>
                      <span className="font-bold block text-xs">Bank Transfer</span>
                      <span className="text-xs text-muted-foreground">1-2 hours</span>
                    </div>
                    {selectedDepositMethod === 'bank' && (
                      <Badge className="mt-2 bg-primary text-primary-foreground">Selected</Badge>
                    )}
                  </Button>
                  <Button 
                    onClick={() => setSelectedDepositMethod('halopesa')}
                    className={`h-auto p-4 flex flex-col gap-3 transition-all ${
                      selectedDepositMethod === 'halopesa'
                        ? 'border-2 border-primary bg-primary/10'
                        : 'border border-border hover:border-primary'
                    }`}
                    variant="outline"
                  >
                    <img src="/halopesa.png" alt="Halopesa" className="h-8 w-auto" />
                    <div>
                      <span className="font-bold block text-xs">Halopesa</span>
                      <span className="text-xs text-muted-foreground">5-15 mins</span>
                    </div>
                    {selectedDepositMethod === 'halopesa' && (
                      <Badge className="mt-2 bg-primary text-primary-foreground">Selected</Badge>
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                className={`w-full transition-all ${
                  selectedDepositMethod
                    ? 'bg-win-green hover:bg-win-green/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
                size="lg"
                disabled={!selectedDepositMethod}
              >
                {selectedDepositMethod 
                  ? `Continue with ${
                      selectedDepositMethod === 'mpesa' ? 'M-Pesa' :
                      selectedDepositMethod === 'airtel' ? 'Airtel Money' :
                      selectedDepositMethod === 'bank' ? 'Bank Transfer' :
                      'Halopesa'
                    }`
                  : 'Select a payment method'
                }
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="withdraw" className="space-y-4 mt-6">
          <Card className="glass-card p-6">
            <h3 className="font-display text-lg font-bold mb-6">Withdraw Funds</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="withdraw-amount">Amount (TSH)</Label>
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

              <div>
                <Label>Withdrawal Method</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  <Button 
                    onClick={() => setSelectedWithdrawMethod('mpesa')}
                    className={`h-auto p-4 flex flex-col gap-3 transition-all ${
                      selectedWithdrawMethod === 'mpesa'
                        ? 'border-2 border-primary bg-primary/10'
                        : 'border border-border hover:border-primary'
                    }`}
                    variant="outline"
                  >
                    <img src="/mpesa.png" alt="M-Pesa" className="h-8 w-auto" />
                    <div>
                      <span className="font-bold text-win-green block text-xs">M-Pesa</span>
                      <span className="text-xs text-muted-foreground">5-15 mins</span>
                    </div>
                    {selectedWithdrawMethod === 'mpesa' && (
                      <Badge className="mt-2 bg-primary text-primary-foreground">Selected</Badge>
                    )}
                  </Button>
                  <Button 
                    onClick={() => setSelectedWithdrawMethod('airtel')}
                    className={`h-auto p-4 flex flex-col gap-3 transition-all ${
                      selectedWithdrawMethod === 'airtel'
                        ? 'border-2 border-primary bg-primary/10'
                        : 'border border-border hover:border-primary'
                    }`}
                    variant="outline"
                  >
                    <img src="/airtelmoney.png" alt="Airtel Money" className="h-8 w-auto" />
                    <div>
                      <span className="font-bold block text-xs">Airtel Money</span>
                      <span className="text-xs text-muted-foreground">5-15 mins</span>
                    </div>
                    {selectedWithdrawMethod === 'airtel' && (
                      <Badge className="mt-2 bg-primary text-primary-foreground">Selected</Badge>
                    )}
                  </Button>
                  <Button 
                    onClick={() => setSelectedWithdrawMethod('bank')}
                    className={`h-auto p-4 flex flex-col gap-3 transition-all ${
                      selectedWithdrawMethod === 'bank'
                        ? 'border-2 border-primary bg-primary/10'
                        : 'border border-border hover:border-primary'
                    }`}
                    variant="outline"
                  >
                    <img src="/bank.png" alt="Bank" className="h-8 w-auto" />
                    <div>
                      <span className="font-bold block text-xs">Bank Transfer</span>
                      <span className="text-xs text-muted-foreground">1-2 hours</span>
                    </div>
                    {selectedWithdrawMethod === 'bank' && (
                      <Badge className="mt-2 bg-primary text-primary-foreground">Selected</Badge>
                    )}
                  </Button>
                  <Button 
                    onClick={() => setSelectedWithdrawMethod('halopesa')}
                    className={`h-auto p-4 flex flex-col gap-3 transition-all ${
                      selectedWithdrawMethod === 'halopesa'
                        ? 'border-2 border-primary bg-primary/10'
                        : 'border border-border hover:border-primary'
                    }`}
                    variant="outline"
                  >
                    <img src="/halopesa.png" alt="Halopesa" className="h-8 w-auto" />
                    <div>
                      <span className="font-bold block text-xs">Halopesa</span>
                      <span className="text-xs text-muted-foreground">5-15 mins</span>
                    </div>
                    {selectedWithdrawMethod === 'halopesa' && (
                      <Badge className="mt-2 bg-primary text-primary-foreground">Selected</Badge>
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Withdrawal Fee</span>
                  <span className="font-medium">TSH 500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Time</span>
                  <span className="font-medium">5-15 mins</span>
                </div>
              </div>

              <Button 
                className={`w-full transition-all ${
                  selectedWithdrawMethod
                    ? 'bg-primary hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
                size="lg"
                disabled={!selectedWithdrawMethod}
              >
                {selectedWithdrawMethod 
                  ? `Request Withdrawal via ${
                      selectedWithdrawMethod === 'mpesa' ? 'M-Pesa' :
                      selectedWithdrawMethod === 'airtel' ? 'Airtel Money' :
                      selectedWithdrawMethod === 'bank' ? 'Bank Transfer' :
                      'Halopesa'
                    }`
                  : 'Select a withdrawal method'
                }
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
                  {tx.amount > 0 ? '+' : ''}TSH {(Math.abs(tx.amount) * 1000).toFixed(0)}
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

      {/* Payment Methods */}
      <PaymentMethods className="mt-8" />
    </div>
  );
};

export default Wallet;
