import { SlipCard } from '@/components/SlipCard';
import { BrainScoreWidget } from '@/components/BrainScoreWidget';
import { FreeBrainCarousel } from '@/components/FreeBrainCarousel';
import { TipsterCarousel } from '@/components/TipsterCarousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TrendingUp, Search, Target, CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { MOCK_DATA, DEFAULT_STATS } from '@/config/mockData';

const Index = () => {
  // Load user activity stats from localStorage
  const [purchasedSlips, setPurchasedSlips] = useLocalStorage('userPurchasedSlips', DEFAULT_STATS.purchasedSlips);
  const [winRate, setWinRate] = useLocalStorage('userWinRate', DEFAULT_STATS.winRate);
  const [totalProfit, setTotalProfit] = useLocalStorage('userTotalProfit', DEFAULT_STATS.totalProfit);
  const [referrals, setReferrals] = useLocalStorage(STORAGE_KEYS.REFERRAL_HISTORY, DEFAULT_STATS.referrals);

  // Mock tipster data
  const topTipsters = [
    { id: 'geoff-lea', name: 'Geoff Lea', accuracy: 77.8, image: '/image/profile/p1.png', verified: true },
    { id: 'basketball-pro', name: 'Basketball Pro', accuracy: 70.3, image: '/image/profile/p2.png', verified: false },
    { id: 'soccer-expert', name: 'Soccer Expert', accuracy: 75.5, image: '/image/profile/p3.png', verified: true },
  ];

  const tipstersToFollow = [
    { id: 'hanscana', name: 'Hanscana', accuracy: 62.7, image: '/image/profile/p4.png', verified: true },
    { id: 'winners', name: 'Winners', accuracy: 62.2, image: '/image/profile/p5.png', verified: false },
    { id: 'elite-picks', name: 'Elite Picks', accuracy: 68.9, image: '/image/profile/p1.png', verified: true },
  ];

  return (
    <div className="space-y-8">
      {/* Free Daily Brain Banner Carousel */}
      <FreeBrainCarousel
        autoPlay={true}
        autoPlayInterval={5000}
      />

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for tipster"
          className="pl-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 rounded-2xl text-lg"
        />
      </div>

      {/* Top Tipsters Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-xl">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold">Top Tipsters</h2>
        </div>
        <TipsterCarousel tipsters={topTipsters} autoPlay={true} autoPlayInterval={3000} />
      </div>

      {/* Tipsters to Follow Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-xl">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          </div>
          <h2 className="font-display text-2xl font-bold">Tipsters to follow</h2>
        </div>
        <TipsterCarousel tipsters={tipstersToFollow} autoPlay={true} autoPlayInterval={3000} />
      </div>


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
            {MOCK_DATA.indexTrendingSlips.map((slip, idx) => (
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
                <span className="font-bold text-primary">{purchasedSlips}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="font-bold text-win-green">{winRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Profit</span>
                <span className="font-bold text-gold">+TSH {totalProfit.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Referrals</span>
                <span className="font-bold">{referrals}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
