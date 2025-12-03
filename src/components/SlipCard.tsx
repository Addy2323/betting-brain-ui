import { useState } from 'react';
import { Eye, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useCountdown } from '@/lib/countdown';
import { getBookmakerConfig } from '@/config/bookmakerLogos';
import confetti from 'canvas-confetti';

interface Match {
  id: string;
  name: string;
  options: string;
}

interface SlipCardProps {
  id?: string;
  tipsterName: string;
  tipsterAvatar?: string;
  subscriberCount?: number;
  picks: number;
  totalOdds: number;
  price: number;
  winStreak?: number;
  watching: number;
  verified: boolean;
  isPurchased?: boolean;
  bookmakers?: string[];
  bookingCodes?: { [key: string]: string };
  proofImage?: string;
  matches?: Match[];
  startTime?: string;
  endTime?: string;
}

export const SlipCard = ({
  id,
  tipsterName,
  tipsterAvatar,
  subscriberCount = 0,
  picks,
  totalOdds,
  price,
  isPurchased = false,
  bookmakers = [],
  bookingCodes = {},
  proofImage,
  matches = [],
  endTime,
}: SlipCardProps) => {
  const { toast } = useToast();
  const [purchased, setPurchased] = useState(isPurchased);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const countdown = useCountdown(endTime);

  const handlePurchase = async () => {
    setIsRevealing(true);

    // Confetti animation
    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ['#14b8a6', '#fbbf24', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Wait for animation
    setTimeout(() => {
      setPurchased(true);
      setIsRevealing(false);
      toast({
        title: "Slip Unlocked! 🎉",
        description: "Your betting slip has been revealed",
      });
    }, 2000);
  };

  return (
    <Card className="glass-card overflow-hidden hover:border-primary/50 transition-all group">
      {/* Header - Tipster Info */}
      <div className="p-4 pb-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/30">
            <AvatarImage src={tipsterAvatar} alt={tipsterName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {tipsterName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{tipsterName}</p>
            <p className="text-xs text-muted-foreground">
              Subscribers • {subscriberCount >= 1000 ? `${(subscriberCount / 1000).toFixed(1)}k` : subscriberCount}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Odds Display */}
        <div>
          <div className="text-4xl font-bold text-primary">{totalOdds.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">Odds</div>
        </div>

        {/* Validity Time and Price */}
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-muted-foreground">Validity Time • </span>
            <span className="font-semibold text-primary">{countdown}</span>
          </div>
          <div className="font-bold text-lg">Tzs {(price * 1000).toLocaleString()}/=</div>
        </div>

        {/* Bet Companies */}
        {bookmakers.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold">Bet Companies</p>
            <div className="flex flex-wrap gap-2">
              {bookmakers.slice(0, 3).map((bookmaker) => {
                const config = getBookmakerConfig(bookmaker);
                return (
                  <div
                    key={bookmaker}
                    className="px-3 py-1 rounded text-xs font-semibold"
                    style={{
                      backgroundColor: config.backgroundColor,
                      color: config.textColor,
                    }}
                  >
                    {config.displayName}
                  </div>
                );
              })}
              {bookmakers.length > 3 && (
                <div className="px-3 py-1 rounded text-xs font-semibold bg-muted text-muted-foreground">
                  +{bookmakers.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview/Content Area */}
        {!purchased && (
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border">
            {/* Blurred proof image or placeholder */}
            {proofImage ? (
              <img
                src={proofImage}
                alt="Betslip Preview"
                className="w-full h-full object-cover blur-md select-none pointer-events-none"
              />
            ) : (
              <div className="p-4 blur-sm select-none pointer-events-none">
                <div className="space-y-2">
                  <div className="h-4 bg-card/50 rounded w-3/4"></div>
                  <div className="h-4 bg-card/50 rounded w-full"></div>
                  <div className="h-4 bg-card/50 rounded w-2/3"></div>
                  <div className="h-4 bg-card/50 rounded w-full"></div>
                  <div className="h-4 bg-card/50 rounded w-1/2"></div>
                </div>
              </div>
            )}
            {/* Overlay with View betslip button */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 bg-purple-600/90 hover:bg-purple-700 text-white border-none"
                disabled
              >
                <Eye className="h-4 w-4" />
                View betslip
              </Button>
            </div>
          </div>
        )}

        {/* Revealed Content */}
        {purchased && (
          <div className="space-y-3 animate-fade-in">
            {/* Matches */}
            {matches && matches.length > 0 && (
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Matches ({matches.length})</p>
                <div className="space-y-1.5">
                  {matches.map((match) => (
                    <div key={match.id} className="p-2 rounded bg-card/50 text-sm">
                      <p className="font-medium">{match.name}</p>
                      <p className="text-xs text-muted-foreground">{match.options}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Codes */}
            {bookmakers.length > 0 && (
              <div className="p-3 bg-accent/10 rounded-lg border border-accent/30 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Booking Codes</p>
                <div className="space-y-1">
                  {bookmakers.map((bm) => {
                    const config = getBookmakerConfig(bm);
                    return (
                      <div key={bm} className="flex items-center justify-between text-xs p-2 rounded bg-card/30">
                        <span className="capitalize font-medium">{config.displayName}</span>
                        {bookingCodes[bm] && (
                          <span className="font-mono text-primary font-semibold">{bookingCodes[bm]}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Proof Image */}
            {proofImage && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Bet Slip Proof</p>
                <div
                  className="relative rounded-lg overflow-hidden border border-border bg-card/30 cursor-pointer"
                  onClick={() => setShowFullImage(!showFullImage)}
                >
                  <img
                    src={proofImage}
                    alt="Slip Proof"
                    className={`w-full h-auto object-contain transition-all ${showFullImage ? 'max-h-none' : 'max-h-48'}`}
                  />
                  {!showFullImage && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-2 text-center">
                      <p className="text-xs text-white">Click to expand</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="p-4 pt-0">
        <Button
          onClick={handlePurchase}
          disabled={purchased || isRevealing}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold h-11"
        >
          {purchased ? (
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Purchased
            </span>
          ) : isRevealing ? (
            'Unlocking...'
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Buy betslip
            </span>
          )}
        </Button>
      </div>
    </Card>
  );
};
