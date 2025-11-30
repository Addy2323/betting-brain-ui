import { Lock, TrendingUp, Shield, Flame, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SlipCardProps {
  tipsterName: string;
  tipsterAvatar?: string;
  picks: number;
  totalOdds: number;
  price: number;
  league: string;
  risk: 'low' | 'medium' | 'high';
  winStreak: number;
  watching: number;
  verified: boolean;
  isPurchased?: boolean;
}

export const SlipCard = ({
  tipsterName,
  tipsterAvatar,
  picks,
  totalOdds,
  price,
  league,
  risk,
  winStreak,
  watching,
  verified,
  isPurchased = false,
}: SlipCardProps) => {
  const getRiskColor = () => {
    switch (risk) {
      case 'low': return 'bg-win-green/20 text-win-green border-win-green/50';
      case 'medium': return 'bg-accent/20 text-accent border-accent/50';
      case 'high': return 'bg-loss-red/20 text-loss-red border-loss-red/50';
    }
  };

  return (
    <Card className="glass-card p-5 hover:border-primary/50 transition-all group cursor-pointer">
      {/* Tipster Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/30">
            <AvatarImage src={tipsterAvatar} alt={tipsterName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {tipsterName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{tipsterName}</span>
              {verified && (
                <Shield className="h-4 w-4 text-primary" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">{league}</span>
          </div>
        </div>
        
        <Badge className={getRiskColor()}>
          {risk.toUpperCase()}
        </Badge>
      </div>

      {/* Blurred Content */}
      {!isPurchased && (
        <div className="relative my-4 p-6 bg-muted/30 rounded-lg backdrop-blur-sm border border-white/5">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-muted-foreground">
                Locked - Purchase to Reveal
              </p>
            </div>
          </div>
          <div className="blur-md select-none">
            <div className="h-16 bg-card/50 rounded mb-2"></div>
            <div className="h-16 bg-card/50 rounded mb-2"></div>
            <div className="h-16 bg-card/50 rounded"></div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <div className="text-lg font-bold text-primary">{picks}</div>
          <div className="text-xs text-muted-foreground">Picks</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <div className="text-lg font-bold text-gold">{totalOdds.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Total Odds</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <div className="flex items-center justify-center gap-1 text-lg font-bold text-destructive">
            <Flame className="h-4 w-4" />
            {winStreak}
          </div>
          <div className="text-xs text-muted-foreground">Streak</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{watching} watching</span>
        </div>
        
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 gap-2 group-hover:scale-105 transition-transform">
          <span className="font-bold">${price}</span>
          <TrendingUp className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
