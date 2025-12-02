import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PaymentMethods } from '@/components/PaymentMethods';

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { subscriptionUtils } from '@/lib/subscriptionUtils';
import { useNavigate } from 'react-router-dom';

interface Transaction {
  id: number;
  type: 'deposit' | 'purchase' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
}

function Wallet() {
  const navigate = useNavigate();
  const [balance, setBalance] = useLocalStorage(STORAGE_KEYS.WALLET_BALANCE, 50000);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(STORAGE_KEYS.TRANSACTION_HISTORY, []);
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedDepositMethod, setSelectedDepositMethod] = useState<string | null>(null);
  const [pendingSubscription, setPendingSubscription] = useState<any>(null);

  useEffect(() => {
    const pending = subscriptionUtils.getPendingSubscription();
    if (pending) {
      setDepositAmount(pending.price.toString());
      setPendingSubscription(pending);
    }
  }, []);

  const handleDeposit = () => {
    if (!selectedDepositMethod || !depositAmount) return;

    const amount = parseFloat(depositAmount);
    const newTransaction: Transaction = {
      id: Date.now(),
      type: 'deposit',
      amount: amount,
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
      method: selectedDepositMethod === 'mpesa' ? 'M-Pesa' :
        selectedDepositMethod === 'airtel' ? 'Airtel Money' :
          selectedDepositMethod === 'bank' ? 'Bank Transfer' : 'Halopesa'
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(balance + amount);

    // Handle pending subscription activation
    if (pendingSubscription && amount >= pendingSubscription.price) {
      const activated = subscriptionUtils.activatePendingSubscription();
      if (activated) {
        // Show success message and redirect
        // Ideally use a toast here, but for now we'll just redirect
        navigate(`/tipster/${pendingSubscription.tipsterId}`);
        return;
      }
    }

    // Reset form
    setDepositAmount('');
    setSelectedDepositMethod(null);
  };

return (
  <div className="space-y-8">
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">Wallet</h1>
      <p className="text-muted-foreground">Manage your funds with M-Pesa integration</p>
    </div>

    {/* Pending Subscription Alert */}
    {pendingSubscription && (
      <Card className="bg-primary/10 border-primary p-4 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={pendingSubscription.tipsterImage}
            alt={pendingSubscription.tipsterName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg">Complete Subscription Payment</h3>
            <p className="text-sm text-muted-foreground">
              Deposit <span className="font-bold text-primary">TSH {pendingSubscription.price.toLocaleString()}</span> to activate your {pendingSubscription.plan} subscription for {pendingSubscription.tipsterName}.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              subscriptionUtils.clearPendingSubscription();
              setPendingSubscription(null);
              setDepositAmount('');
            }}
          >
            Cancel
          </Button>
        </div>
      </Card>
    )}

    {/* Balance Card */}
    <Card className="glass-card p-8 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
      <div className="text-center space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
          <h2 className="font-display text-5xl font-bold text-gradient-gold">
            TSH {balance.toLocaleString()}
          </h2>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" className="bg-win-green hover:bg-win-green/90 gap-2">
            <ArrowDown className="h-5 w-5" />
            Deposit
          </Button>
        </div>
      </div>
    </Card>

    {/* Deposit Tab */}
    <Tabs defaultValue="deposit" className="w-full">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
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
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                disabled={!!pendingSubscription} // Lock amount if pending subscription
              />
            </div>

            <div>
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                <Button
                  onClick={() => setSelectedDepositMethod('mpesa')}
                  className={`h-auto p-4 flex flex-col gap-3 transition-all ${selectedDepositMethod === 'mpesa'
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
                  className={`h-auto p-4 flex flex-col gap-3 transition-all ${selectedDepositMethod === 'airtel'
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
                  className={`h-auto p-4 flex flex-col gap-3 transition-all ${selectedDepositMethod === 'bank'
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
                  className={`h-auto p-4 flex flex-col gap-3 transition-all ${selectedDepositMethod === 'halopesa'
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
              className={`w-full transition-all ${selectedDepositMethod && depositAmount
                ? 'bg-win-green hover:bg-win-green/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              size="lg"
              disabled={!selectedDepositMethod || !depositAmount}
              onClick={handleDeposit}
            >
              {selectedDepositMethod
                ? `Complete ${pendingSubscription ? 'Subscription Payment' : 'Deposit'} via ${selectedDepositMethod === 'mpesa' ? 'M-Pesa' :
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
                className={`p-2 rounded-full ${tx.type === 'deposit'
                  ? 'bg-win-green/20'
                  : tx.type === 'withdrawal'
                    ? 'bg-primary/20'
                    : 'bg-secondary/20'
                  }`}
              >
                {tx.type === 'deposit' ? (
                  <ArrowDown className="h-5 w-5 text-win-green" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-secondary" />
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
                className={`font-bold ${tx.amount > 0 ? 'text-win-green' : 'text-foreground'
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
}

export default Wallet;
