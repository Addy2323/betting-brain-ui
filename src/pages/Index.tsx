import { SlipCard } from '@/components/SlipCard';
import { BrainScoreWidget } from '@/components/BrainScoreWidget';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, TrendingUp, Flame, Star } from 'lucide-react';

const Index = () => {
  const trendingSlips = [
    {
      tipsterName: 'Alex Martinez',
      tipsterAvatar: undefined,
      picks: 5,
      totalOdds: 12.5,
      price: 9.99,
      league: 'Premier League',
      risk: 'medium' as const,
      winStreak: 7,
      watching: 234,
      verified: true,
    },
    {
      tipsterName: 'Sarah Johnson',
      tipsterAvatar: undefined,
      picks: 3,
      totalOdds: 8.2,
      price: 4.99,
      league: 'La Liga',
      risk: 'low' as const,
      winStreak: 12,
      watching: 189,
      verified: true,
    },
    {
      tipsterName: 'Mike Chen',
      tipsterAvatar: undefined,
      picks: 7,
      totalOdds: 24.8,
      price: 14.99,
      league: 'Champions League',
      risk: 'high' as const,
      winStreak: 4,
      watching: 412,
      verified: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Free Daily Brain Banner */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-secondary to-secondary/80 p-8 border-secondary">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-6 w-6 text-gold" />
              <Badge className="bg-gold/20 text-gold border-gold/50">
                FREE DAILY
              </Badge>
            </div>
            <h2 className="font-display text-3xl font-bold mb-2">
              Today's Free Brain from Elite Tipster
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Sarah Johnson • 12-game win streak • 94% accuracy
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-destructive" />
                <span className="font-semibold">Drops in 2h 14m</span>
              </span>
              <span className="text-muted-foreground">Available at 11:00 AM EAT</span>
            </div>
          </div>
          <Button size="lg" className="bg-gold text-black hover:bg-gold-glow gap-2 gold-glow">
            <Star className="h-5 w-5" />
            <span className="font-bold">Notify Me</span>
          </Button>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending Slips - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Trending Slips
            </h2>
            <Button variant="ghost" className="text-primary">
              View All →
            </Button>
          </div>
          
          <div className="grid gap-6">
            {trendingSlips.map((slip, idx) => (
              <SlipCard key={idx} {...slip} />
            ))}
          </div>
        </div>

        {/* Sidebar - BrainScore Widget */}
        <div className="space-y-6">
          <BrainScoreWidget
            score={742}
            winRate={68}
            accuracy={82}
            totalSlips={156}
            roi={34}
          />

          {/* Quick Stats */}
          <Card className="glass-card p-6">
            <h3 className="font-display text-lg font-bold mb-4">
              Your Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Purchased Slips</span>
                <span className="font-bold text-primary">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="font-bold text-win-green">62.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Profit</span>
                <span className="font-bold text-gold">+$187.50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Referrals</span>
                <span className="font-bold">7</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
