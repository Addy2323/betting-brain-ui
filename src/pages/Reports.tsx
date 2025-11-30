import { Flag, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockReports = [
  {
    id: '1',
    reporterName: 'User456',
    reportedUser: 'ShadyTipster',
    reportedAvatar: '/placeholder.svg',
    type: 'fraud' as const,
    reason: 'Fake slip screenshots - verified with bookmaker',
    severity: 'high' as const,
    createdAt: '2024-01-15 16:45',
  },
  {
    id: '2',
    reporterName: 'BetterJohn',
    reportedUser: 'SpamAccount',
    reportedAvatar: '/placeholder.svg',
    type: 'spam' as const,
    reason: 'Posting excessive promotional content',
    severity: 'medium' as const,
    createdAt: '2024-01-15 15:20',
  },
];

export default function Reports() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Flag className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            User Reports
          </h1>
          <p className="text-muted-foreground">Review reports and take action</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-accent">2</p>
            </div>
            <Flag className="h-8 w-8 text-accent" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Priority</p>
              <p className="text-2xl font-bold text-loss-red">1</p>
            </div>
            <Shield className="h-8 w-8 text-loss-red" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold text-win-green">34</p>
            </div>
            <Shield className="h-8 w-8 text-win-green" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold text-primary">8</p>
            </div>
            <Flag className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending (2)</TabsTrigger>
          <TabsTrigger value="reviewing">Under Review</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {mockReports.map((report) => (
              <Card key={report.id} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={report.reportedAvatar} />
                      <AvatarFallback>{report.reportedUser.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="text-lg font-semibold">{report.reportedUser}</h3>
                      <p className="text-sm text-muted-foreground">Reported by {report.reporterName}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {report.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={
                          report.severity === 'high'
                            ? 'bg-loss-red/20 text-loss-red border-loss-red/50'
                            : 'bg-accent/20 text-accent border-accent/50'
                        }>
                          {report.severity.toUpperCase()} PRIORITY
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 mb-4">
                  <p className="text-sm">{report.reason}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Reported: {report.createdAt}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    View User Profile
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Dismiss Report
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Suspend User
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-loss-red to-loss-red/80">
                    Ban User
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviewing">
          <p className="text-center text-muted-foreground py-12">No reports under review</p>
        </TabsContent>

        <TabsContent value="resolved">
          <p className="text-center text-muted-foreground py-12">No resolved reports to show</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
