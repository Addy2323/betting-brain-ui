import { SlipCard } from '@/components/SlipCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, CheckCircle, XCircle, Clock } from 'lucide-react';

const mockWonSlips = [
  {
    id: '1',
    tipsterName: 'KingBet254',
    tipsterAvatar: '/placeholder.svg',
    picks: 5,
    totalOdds: 23.5,
    price: 15,
    league: 'Premier League',
    risk: 'medium' as const,
    winStreak: 7,
    watching: 234,
    verified: true,
    isPurchased: true,
  },
];

const mockPendingSlips = [
  {
    id: '2',
    tipsterName: 'SafeBets_KE',
    tipsterAvatar: '/placeholder.svg',
    picks: 4,
    totalOdds: 12.8,
    price: 10,
    league: 'Bundesliga',
    risk: 'low' as const,
    winStreak: 15,
    watching: 567,
    verified: true,
    isPurchased: true,
  },
];

const mockLostSlips: typeof mockWonSlips = [];

export default function PurchasedSlips() {
  const allSlips = [...mockWonSlips, ...mockPendingSlips, ...mockLostSlips];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ShoppingBag className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Purchased Slips
          </h1>
          <p className="text-muted-foreground">Track your betting slips and results</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Won</p>
              <p className="text-2xl font-bold text-win-green">{mockWonSlips.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-win-green" />
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Lost</p>
              <p className="text-2xl font-bold text-loss-red">{mockLostSlips.length}</p>
            </div>
            <XCircle className="h-8 w-8 text-loss-red" />
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-accent">{mockPendingSlips.length}</p>
            </div>
            <Clock className="h-8 w-8 text-accent" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({allSlips.length})</TabsTrigger>
          <TabsTrigger value="won">Won ({mockWonSlips.length})</TabsTrigger>
          <TabsTrigger value="lost">Lost ({mockLostSlips.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({mockPendingSlips.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSlips.map((slip) => (
              <SlipCard key={slip.id} {...slip} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="won" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockWonSlips.map((slip) => (
              <SlipCard key={slip.id} {...slip} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lost" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLostSlips.length === 0 ? (
              <p className="text-muted-foreground col-span-3 text-center py-12">No lost slips yet</p>
            ) : (
              mockLostSlips.map((slip) => <SlipCard key={slip.id} {...slip} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPendingSlips.map((slip) => (
              <SlipCard key={slip.id} {...slip} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
