import { SlipCard } from '@/components/SlipCard';
import { BrainScoreWidget } from '@/components/BrainScoreWidget';
import { FreeBrainCarousel } from '@/components/FreeBrainCarousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

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
      {/* Free Daily Brain Banner Carousel */}
      <FreeBrainCarousel
        slides={[
          {
            id: '1',
            tipsterName: 'Sarah Johnson',
            winStreak: 12,
            accuracy: 94,
            dropTime: '2h 14m',
            availableTime: '11:00 AM EAT',
            description: 'Today\'s Free Brain from Elite Tipster',
            image: '/image1.png',
            gradientFrom: 'from-purple-600',
            gradientTo: 'to-purple-800',
            badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
          },
          {
            id: '2',
            tipsterName: 'Alex Martinez',
            winStreak: 8,
            accuracy: 89,
            dropTime: '1h 45m',
            availableTime: '10:30 AM EAT',
            description: 'Premium Betting Tips - Limited Time Offer',
            image: '/image2.png',
            gradientFrom: 'from-blue-600',
            gradientTo: 'to-blue-800',
            badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
          },
          {
            id: '3',
            tipsterName: 'Mike Chen',
            winStreak: 15,
            accuracy: 92,
            dropTime: '3h 30m',
            availableTime: '12:15 PM EAT',
            description: 'Exclusive Predictions from Top Tipsters',
            image: '/image3.png',
            gradientFrom: 'from-orange-600',
            gradientTo: 'to-orange-800',
            badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
          },
        ]}
        autoPlay={true}
        autoPlayInterval={5000}
      />

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
                <span className="font-bold text-gold">+TSH 187,500</span>
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
