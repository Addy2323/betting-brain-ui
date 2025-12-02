import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Gift, Copy, Share2, Trophy, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { MOCK_DATA, REFERRAL_CONFIG } from '@/config/mockData';

const Referrals = () => {
  const [referralCode, setReferralCode] = useLocalStorage(STORAGE_KEYS.REFERRAL_CODE, REFERRAL_CONFIG.defaultCode);
  const [totalReferrals, setTotalReferrals] = useLocalStorage(STORAGE_KEYS.REFERRAL_HISTORY, REFERRAL_CONFIG.defaultReferrals);
  const [referralEarnings, setReferralEarnings] = useLocalStorage(STORAGE_KEYS.REFERRAL_EARNINGS, REFERRAL_CONFIG.defaultEarnings);
  
  const tiers = MOCK_DATA.referralTiers.map((tier, index) => ({
    ...tier,
    icon: index < 2 ? Trophy : Star,
    achieved: index === 0,
  }));

  const nextTier = tiers.find(tier => !tier.achieved);
  const progressToNext = nextTier ? (totalReferrals / nextTier.required) * 100 : 100;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Referral Program</h1>
        <p className="text-muted-foreground">Invite friends and earn rewards together</p>
      </div>

      {/* Current Progress */}
      <Card className="glass-card p-8 bg-gradient-to-br from-secondary/20 to-primary/20 border-primary/30">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h2 className="font-display text-4xl font-bold text-gradient-primary">
                {totalReferrals}
              </h2>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </div>
          </div>

          {nextTier && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress to {nextTier.name}</span>
                <span className="font-bold">
                  {totalReferrals} / {nextTier.required}
                </span>
              </div>
              <Progress value={progressToNext} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {nextTier.required - totalReferrals} more referrals to unlock {nextTier.reward}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Referral Code */}
      <Card className="glass-card p-6">
        <h3 className="font-display text-lg font-bold mb-4">Your Referral Code</h3>
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted/30 rounded-lg border border-border">
            <code className="text-2xl font-bold text-primary tracking-wider flex-1">
              {referralCode}
            </code>
          </div>
          <Button
            onClick={handleCopyCode}
            className="gap-2"
            size="lg"
          >
            <Copy className="h-5 w-5" />
            Copy
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-primary/30"
            size="lg"
          >
            <Share2 className="h-5 w-5" />
            Share
          </Button>
        </div>
      </Card>

      {/* Tier Ladder */}
      <div>
        <h3 className="font-display text-xl font-bold mb-6">Referral Tiers</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <Card
                key={tier.name}
                className={`glass-card p-6 relative overflow-hidden ${
                  tier.achieved ? 'border-2 ' + tier.borderColor : ''
                }`}
              >
                {tier.achieved && (
                  <div className="absolute top-4 right-4">
                    <Badge className={`${tier.bgColor} ${tier.color} border ${tier.borderColor}`}>
                      Unlocked!
                    </Badge>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${tier.bgColor}`}>
                      <Icon className={`h-8 w-8 ${tier.color}`} />
                    </div>
                    <div>
                      <h4 className={`font-display text-xl font-bold ${tier.color}`}>
                        {tier.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {tier.required} referrals required
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${tier.bgColor} border ${tier.borderColor}`}>
                    <div className="flex items-start gap-2">
                      <Gift className={`h-5 w-5 ${tier.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className="font-semibold mb-1">Rewards</p>
                        <p className="text-sm text-muted-foreground">{tier.reward}</p>
                      </div>
                    </div>
                  </div>

                  {!tier.achieved && (
                    <Progress
                      value={Math.min((totalReferrals / tier.required) * 100, 100)}
                      className="h-2"
                    />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Referral Stats */}
      <Card className="glass-card p-6">
        <h3 className="font-display text-lg font-bold mb-6">Your Referral Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <p className="text-2xl font-bold text-win-green">TSH 47,500</p>
            <p className="text-sm text-muted-foreground mt-1">Total Earned</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <p className="text-2xl font-bold text-primary">{totalReferrals}</p>
            <p className="text-sm text-muted-foreground mt-1">Active Referrals</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <p className="text-2xl font-bold text-accent">12</p>
            <p className="text-sm text-muted-foreground mt-1">Pending</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <p className="text-2xl font-bold text-gold">5%</p>
            <p className="text-sm text-muted-foreground mt-1">Commission Rate</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Referrals;
