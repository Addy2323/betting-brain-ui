import { Flag, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  type: 'fraud' | 'spam' | 'abuse' | 'other';
  reason: string;
  severity: 'low' | 'medium' | 'high';
  status: 'pending' | 'reviewing' | 'resolved';
  createdAt: string;
}

export default function Reports() {
  const [reports] = useLocalStorage<Report[]>('userReports', []);
  
  const pendingReports = reports.filter(r => r.status === 'pending');
  const highPriorityReports = reports.filter(r => r.severity === 'high');
  const resolvedReports = reports.filter(r => r.status === 'resolved');
  const thisWeekReports = reports.filter(r => {
    const reportDate = new Date(r.createdAt);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return reportDate > weekAgo;
  });
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
              <p className="text-2xl font-bold text-accent">{pendingReports.length}</p>
            </div>
            <Flag className="h-8 w-8 text-accent" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Priority</p>
              <p className="text-2xl font-bold text-loss-red">{highPriorityReports.length}</p>
            </div>
            <Shield className="h-8 w-8 text-loss-red" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold text-win-green">{resolvedReports.length}</p>
            </div>
            <Shield className="h-8 w-8 text-win-green" />
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold text-primary">{thisWeekReports.length}</p>
            </div>
            <Flag className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingReports.length})</TabsTrigger>
          <TabsTrigger value="reviewing">Under Review</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {pendingReports.length > 0 ? pendingReports.map((report) => (
              <Card key={report.id} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{report.reportedUserId.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="text-lg font-semibold">{report.reportedUserId}</h3>
                      <p className="text-sm text-muted-foreground">Reported by {report.reporterId}</p>
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
            )) : (
              <Card className="glass-card p-6">
                <p className="text-center text-muted-foreground py-8">No pending reports</p>
              </Card>
            )}
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
