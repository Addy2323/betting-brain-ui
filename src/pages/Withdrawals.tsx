import { DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { MOCK_DATA, FINANCE_CONFIG } from '@/config/mockData';

interface Withdrawal {
  id: string;
  tipsterName: string;
  avatar: string;
  amount: number;
  method: string;
  phone?: string;
  accountNumber?: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function Withdrawals() {
  const [withdrawals, setWithdrawals] = useLocalStorage<Withdrawal[]>(
    STORAGE_KEYS.WITHDRAWAL_HISTORY,
    []
  );
  const [selectedTab, setSelectedTab] = useLocalStorage('withdrawalsTab', 'pending');

  const pendingCount = withdrawals.filter(w => w.status === 'pending').length;
  const approvedCount = withdrawals.filter(w => w.status === 'approved').length;
  const rejectedCount = withdrawals.filter(w => w.status === 'rejected').length;

  // Handle approve
  const handleApprove = (id: string) => {
    const updated = withdrawals.map(w =>
      w.id === id ? { ...w, status: 'approved' as const } : w
    );
    setWithdrawals(updated);
  };

  // Handle reject
  const handleReject = (id: string) => {
    const updated = withdrawals.map(w =>
      w.id === id ? { ...w, status: 'rejected' as const } : w
    );
    setWithdrawals(updated);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <DollarSign className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Withdrawal Management
          </h1>
          <p className="text-muted-foreground">Process tipster withdrawal requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-accent">{pendingCount}</p>
            </div>
            <Clock className="h-8 w-8 text-accent" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Total: TSH {(pendingCount * 100000).toLocaleString()}</p>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved Today</p>
              <p className="text-2xl font-bold text-win-green">{approvedCount}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-win-green" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Total: TSH {(approvedCount * 100000).toLocaleString()}</p>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-2xl font-bold text-loss-red">{rejectedCount}</p>
            </div>
            <XCircle className="h-8 w-8 text-loss-red" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">This week</p>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-primary">TSH {(approvedCount * 100000).toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{approvedCount + rejectedCount + pendingCount} processed</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {withdrawals.filter(w => w.status === 'pending').map((withdrawal) => (
              <Card key={withdrawal.id} className="glass-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={withdrawal.avatar} />
                      <AvatarFallback>{withdrawal.tipsterName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="text-lg font-semibold">{withdrawal.tipsterName}</h3>
                      <p className="text-sm text-muted-foreground">{withdrawal.method}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {'phone' in withdrawal ? withdrawal.phone : withdrawal.accountNumber}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">TSH {withdrawal.amount * 1000}</p>
                    <Badge variant="outline" className="mt-2 bg-accent/20 text-accent border-accent/50">
                      PENDING
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground">
                    Requested: {withdrawal.requestDate}
                  </p>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => handleReject(withdrawal.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-win-green to-win-green/80 hover:from-win-green/90 hover:to-win-green/70"
                    onClick={() => handleApprove(withdrawal.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="space-y-4">
            {withdrawals.filter(w => w.status === 'approved').length > 0 ? (
              withdrawals.filter(w => w.status === 'approved').map((withdrawal) => (
                <Card key={withdrawal.id} className="glass-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={withdrawal.avatar} />
                        <AvatarFallback>{withdrawal.tipsterName.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="text-lg font-semibold">{withdrawal.tipsterName}</h3>
                        <p className="text-sm text-muted-foreground">{withdrawal.method}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {'phone' in withdrawal ? withdrawal.phone : withdrawal.accountNumber}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">TSH {withdrawal.amount * 1000}</p>
                      <Badge className="mt-2 bg-win-green/20 text-win-green border-win-green/50">
                        APPROVED
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">
                      Requested: {withdrawal.requestDate}
                    </p>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-12">No approved withdrawals to show</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="space-y-4">
            {withdrawals.filter(w => w.status === 'rejected').length > 0 ? (
              withdrawals.filter(w => w.status === 'rejected').map((withdrawal) => (
                <Card key={withdrawal.id} className="glass-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={withdrawal.avatar} />
                        <AvatarFallback>{withdrawal.tipsterName.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="text-lg font-semibold">{withdrawal.tipsterName}</h3>
                        <p className="text-sm text-muted-foreground">{withdrawal.method}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {'phone' in withdrawal ? withdrawal.phone : withdrawal.accountNumber}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">TSH {withdrawal.amount * 1000}</p>
                      <Badge className="mt-2 bg-loss-red/20 text-loss-red border-loss-red/50">
                        REJECTED
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">
                      Requested: {withdrawal.requestDate}
                    </p>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-12">No rejected withdrawals to show</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
