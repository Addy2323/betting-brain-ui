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
    <div className="space-y-6 w-full overflow-x-hidden">
      {/* Free Daily Brain Banner Carousel */}
      <div className="w-full min-w-0">
        <FreeBrainCarousel
          autoPlay={true}
          autoPlayInterval={5000}
        />
      </div>

      {/* Search Bar */}
      <div className="relative w-full min-w-0">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for tipster"
          className="pl-12 h-12 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground rounded-2xl text-sm md:text-base w-full"
        />
      </div>

      {/* Top Tipsters Section */}
      <div className="space-y-3 w-full min-w-0">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/20 rounded-xl flex-shrink-0">
            <Target className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </div>
          <h2 className="font-display text-lg md:text-2xl font-bold truncate">Top Tipsters</h2>
        </div>
        <div className="w-full min-w-0">
          <TipsterCarousel tipsters={topTipsters} autoPlay={true} autoPlayInterval={3000} />
        </div>
      </div>

      {/* Tipsters to Follow Section */}
      <div className="space-y-3 w-full min-w-0">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/20 rounded-xl flex-shrink-0">
            <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-emerald-500" />
          </div>
          <h2 className="font-display text-lg md:text-2xl font-bold truncate">Tipsters to follow</h2>
        </div>
        <div className="w-full min-w-0">
          <TipsterCarousel tipsters={tipstersToFollow} autoPlay={true} autoPlayInterval={3000} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full min-w-0">
        {/* Trending Slips - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4 w-full min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-lg md:text-2xl font-bold flex items-center gap-2 truncate">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
              <span className="truncate">Trending Slips</span>
            </h2>
            <Button variant="ghost" className="text-primary text-xs md:text-sm flex-shrink-0">
              View All →
            </Button>
          </div>

          <div className="grid gap-4 w-full min-w-0">
            {MOCK_DATA.indexTrendingSlips.map((slip, idx) => (
              <SlipCard key={idx} {...slip} />
            ))}
          </div>
        </div>

        {/* Sidebar - BrainScore Widget */}
        <div className="space-y-4 w-full min-w-0">
          <BrainScoreWidget
            score={742}
            winRate={68}
            accuracy={82}
            totalSlips={156}
            roi={34}
          />

          {/* Quick Stats */}
          <Card className="glass-card p-4 md:p-6">
            <h3 className="font-display text-base md:text-lg font-bold mb-3 md:mb-4">
              Your Activity
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-muted-foreground">Purchased Slips</span>
                <span className="font-bold text-primary text-sm md:text-base">{purchasedSlips}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-muted-foreground">Win Rate</span>
                <span className="font-bold text-win-green text-sm md:text-base">{winRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-muted-foreground">Total Profit</span>
                <span className="font-bold text-gold text-sm md:text-base">+TSH {totalProfit.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-muted-foreground">Referrals</span>
                <span className="font-bold text-sm md:text-base">{referrals}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
