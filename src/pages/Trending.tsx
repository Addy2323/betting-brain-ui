import { SlipCard } from '@/components/SlipCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp } from 'lucide-react';

const mockTrendingSlips = [
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
  },
  {
    id: '2',
    tipsterName: 'NairobiTips',
    tipsterAvatar: '/placeholder.svg',
    picks: 3,
    totalOdds: 8.2,
    price: 8,
    league: 'La Liga',
    risk: 'low' as const,
    winStreak: 12,
    watching: 456,
    verified: true,
  },
  {
    id: '3',
    tipsterName: 'AccaMaster',
    tipsterAvatar: '/placeholder.svg',
    picks: 8,
    totalOdds: 156.4,
    price: 25,
    league: 'Serie A',
    risk: 'high' as const,
    winStreak: 3,
    watching: 789,
    verified: false,
  },
  {
    id: '4',
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
  },
];

export default function Trending() {
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
            <Input placeholder="Search tipsters..." className="pl-9" />
          </div>
          
          <Select defaultValue="all">
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

          <Select defaultValue="all">
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

          <Select defaultValue="watching">
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
        {mockTrendingSlips.map((slip) => (
          <SlipCard key={slip.id} {...slip} />
        ))}
      </div>
    </div>
  );
}
