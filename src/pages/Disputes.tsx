import { AlertTriangle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const mockDisputes = [
  {
    id: '1',
    userName: 'User123',
    userAvatar: '/placeholder.svg',
    tipsterName: 'KingBet254',
    slipId: 'SLIP-2024-001',
    reason: 'Slip marked as won but picks were actually lost',
    amount: 15,
    status: 'open' as const,
    createdAt: '2024-01-15 14:30',
  },
  {
    id: '2',
    userName: 'BetterJohn',
    userAvatar: '/placeholder.svg',
    tipsterName: 'AccaMaster',
    slipId: 'SLIP-2024-045',
    reason: 'Invalid odds - doesn\'t match bookmaker',
    amount: 25,
    status: 'investigating' as const,
    createdAt: '2024-01-15 10:20',
  },
];

export default function Disputes() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dispute Center
          </h1>
          <p className="text-muted-foreground">Resolve user complaints and disputes</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open</p>
              <p className="text-2xl font-bold text-loss-red">2</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-loss-red" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Investigating</p>
              <p className="text-2xl font-bold text-accent">1</p>
            </div>
            <MessageSquare className="h-8 w-8 text-accent" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold text-win-green">45</p>
            </div>
            <MessageSquare className="h-8 w-8 text-win-green" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Resolution</p>
              <p className="text-2xl font-bold text-primary">4.2h</p>
            </div>
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {mockDisputes.map((dispute) => (
          <Card key={dispute.id} className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={dispute.userAvatar} />
                  <AvatarFallback>{dispute.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-lg font-semibold">{dispute.userName}</h3>
                  <p className="text-sm text-muted-foreground">vs {dispute.tipsterName}</p>
                  <p className="text-xs text-muted-foreground mt-1">Slip: {dispute.slipId}</p>
                </div>
              </div>

              <Badge variant="outline" className={
                dispute.status === 'open' 
                  ? 'bg-loss-red/20 text-loss-red border-loss-red/50'
                  : 'bg-accent/20 text-accent border-accent/50'
              }>
                {dispute.status.toUpperCase()}
              </Badge>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 mb-4">
              <p className="text-sm">{dispute.reason}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Opened: {dispute.createdAt} • Amount: ${dispute.amount}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                View Conversation
              </Button>
              <Button variant="outline" className="flex-1">
                View Slip Details
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-primary to-accent">
                Resolve Dispute
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
