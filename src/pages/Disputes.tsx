import { AlertTriangle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface DisputeItem {
  id: string;
  userId: string;
  slipId: string;
  reason: string;
  status: 'open' | 'resolved' | 'rejected';
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export default function Disputes() {
  const [disputes] = useLocalStorage<DisputeItem[]>('adminDisputes', []);
  
  const openDisputes = disputes.filter(d => d.status === 'open');
  const resolvedDisputes = disputes.filter(d => d.status === 'resolved');
  const avgResolutionTime = '4.2h';
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
              <p className="text-2xl font-bold text-loss-red">{openDisputes.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-loss-red" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Investigating</p>
              <p className="text-2xl font-bold text-accent">{Math.floor(openDisputes.length * 0.5)}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-accent" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold text-win-green">{resolvedDisputes.length}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-win-green" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Resolution</p>
              <p className="text-2xl font-bold text-primary">{avgResolutionTime}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {disputes.length > 0 ? (
          disputes.map((dispute) => (
            <Card key={dispute.id} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{dispute.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="text-lg font-semibold">{dispute.userId}</h3>
                    <p className="text-sm text-muted-foreground">Slip: {dispute.slipId}</p>
                    <p className="text-xs text-muted-foreground mt-1">ID: {dispute.id}</p>
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
                  Opened: {dispute.createdAt}
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
          ))
        ) : (
          <Card className="glass-card p-6">
            <p className="text-center text-muted-foreground py-8">No disputes to display</p>
          </Card>
        )}
      </div>
    </div>
  );
}
