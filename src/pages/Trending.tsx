import { SlipCard } from '@/components/SlipCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { MOCK_DATA } from '@/config/mockData';

export default function Trending() {
  const [searchQuery, setSearchQuery] = useLocalStorage('trendingSearch', '');
  const [selectedLeague, setSelectedLeague] = useLocalStorage('trendingLeague', 'all');
  const [selectedRisk, setSelectedRisk] = useLocalStorage('trendingRisk', 'all');
  const [sortBy, setSortBy] = useLocalStorage('trendingSort', 'watching');
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Trending Slips
          </h1>
          <p className="text-muted-foreground">Most watched and hottest picks right now</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tipsters..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={selectedLeague} onValueChange={setSelectedLeague}>
            <SelectTrigger>
              <SelectValue placeholder="League" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leagues</SelectItem>
              <SelectItem value="epl">Premier League</SelectItem>
              <SelectItem value="laliga">La Liga</SelectItem>
              <SelectItem value="seriea">Serie A</SelectItem>
              <SelectItem value="bundesliga">Bundesliga</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRisk} onValueChange={setSelectedRisk}>
            <SelectTrigger>
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
            <SelectTrigger>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DATA.trendingSlips.map((slip) => (
          <SlipCard key={slip.id} {...slip} />
        ))}
      </div>
    </div>
  );
}
