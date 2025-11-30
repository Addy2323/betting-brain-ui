import { UserCheck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockApplications = [
  {
    id: '1',
    name: 'KingBet254',
    avatar: '/placeholder.svg',
    email: 'kingbet@example.com',
    slipsSubmitted: 15,
    winRate: 73,
    avgOdds: 12.5,
    status: 'pending' as const,
    appliedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'AccaPro',
    avatar: '/placeholder.svg',
    email: 'acca@example.com',
    slipsSubmitted: 20,
    winRate: 65,
    avgOdds: 25.3,
    status: 'pending' as const,
    appliedDate: '2024-01-14',
  },
];

export default function VerifyTipsters() {
  const pendingCount = mockApplications.filter(a => a.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <UserCheck className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tipster Verification
          </h1>
          <p className="text-muted-foreground">Review and approve tipster applications</p>
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
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold text-win-green">24</p>
            </div>
            <CheckCircle className="h-8 w-8 text-win-green" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-2xl font-bold text-loss-red">8</p>
            </div>
            <XCircle className="h-8 w-8 text-loss-red" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tipsters</p>
              <p className="text-2xl font-bold text-primary">32</p>
            </div>
            <UserCheck className="h-8 w-8 text-primary" />
          </div>
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
            {mockApplications.map((application) => (
              <Card key={application.id} className="glass-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={application.avatar} />
                      <AvatarFallback>{application.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="text-xl font-semibold">{application.name}</h3>
                      <p className="text-sm text-muted-foreground">{application.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">Applied: {application.appliedDate}</p>
                    </div>
                  </div>

                  <Badge variant="outline" className="bg-accent/20 text-accent border-accent/50">
                    PENDING REVIEW
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 p-4 rounded-lg bg-muted/30">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{application.slipsSubmitted}</p>
                    <p className="text-xs text-muted-foreground">Slips Submitted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-win-green">{application.winRate}%</p>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gold">{application.avgOdds}</p>
                    <p className="text-xs text-muted-foreground">Avg Odds</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="flex-1">
                    View Slips
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-win-green to-win-green/80">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <p className="text-center text-muted-foreground py-12">No approved applications to show</p>
        </TabsContent>

        <TabsContent value="rejected">
          <p className="text-center text-muted-foreground py-12">No rejected applications to show</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
