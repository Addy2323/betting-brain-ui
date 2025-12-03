import { SlipCard } from '@/components/SlipCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { MOCK_DATA } from '@/config/mockData';

export default function Trending() {
  const [searchQuery, setSearchQuery] = useLocalStorage('trendingSearch', '');
  const [selectedRisk, setSelectedRisk] = useLocalStorage('trendingRisk', 'all');
  const [sortBy, setSortBy] = useLocalStorage('trendingSort', 'watching');
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, []);

  // Filter and sort slips based on criteria
  const filteredSlips = useMemo(() => {
    // Load slips from localStorage, fallback to MOCK_DATA
    const storedSlips = JSON.parse(localStorage.getItem('trendingSlips') || '[]');
    let slips = storedSlips.length > 0 ? storedSlips : [...MOCK_DATA.trendingSlips];

    // Filter by search query (tipster name)
    if (searchQuery.trim()) {
      slips = slips.filter(slip =>
        slip.tipsterName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by risk level
    if (selectedRisk !== 'all') {
      slips = slips.filter(slip =>
        slip.risk.toLowerCase() === selectedRisk.toLowerCase()
      );
    }

    // Sort slips
    slips.sort((a, b) => {
      switch (sortBy) {
        case 'watching':
          return (b.watching || 0) - (a.watching || 0);
        case 'odds':
          return (b.totalOdds || 0) - (a.totalOdds || 0);
        case 'streak':
          return (b.winStreak || 0) - (a.winStreak || 0);
        case 'price':
          return (a.price || 0) - (b.price || 0);
        default:
          return 0;
      }
    });

    return slips;
  }, [searchQuery, selectedRisk, sortBy]);

  return (
    <div className="w-full space-y-4 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3">
        <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
        <div className="min-w-0">
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
            Trending Slips
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground truncate">Most watched and hottest picks right now</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-3 md:p-4 space-y-3 md:space-y-4 w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 w-full min-w-0">
          <div className="relative w-full min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Input
              placeholder="Search tipsters..."
              className="pl-9 h-10 md:h-11 text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={selectedRisk} onValueChange={setSelectedRisk}>
            <SelectTrigger className="h-10 md:h-11 text-sm w-full">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-10 md:h-11 text-sm w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="watching">Most Watched</SelectItem>
              <SelectItem value="odds">Highest Odds</SelectItem>
              <SelectItem value="streak">Best Streak</SelectItem>
              <SelectItem value="price">Lowest Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Slips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full min-w-0">
        {filteredSlips.length > 0 ? (
          filteredSlips.map((slip: any) => (
            <SlipCard
              key={slip.id}
              id={slip.id}
              tipsterName={slip.tipsterName}
              tipsterAvatar={slip.tipsterAvatar}
              subscriberCount={slip.subscriberCount || 5300}
              picks={slip.picks}
              totalOdds={slip.totalOdds}
              price={slip.price}
              winStreak={slip.winStreak || 0}
              watching={slip.watching || 0}
              verified={slip.verified}
              bookmakers={slip.bookmakers || []}
              bookingCodes={slip.bookingCodes || {}}
              proofImage={slip.proofImage}
              matches={slip.matches || []}
              startTime={slip.startTime}
              endTime={slip.endTime}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">No slips found matching your criteria</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
