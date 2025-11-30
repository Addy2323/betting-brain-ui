import { Brain, TrendingUp, Target, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface BrainScoreWidgetProps {
  score: number;
  winRate: number;
  accuracy: number;
  totalSlips: number;
  roi: number;
}

export const BrainScoreWidget = ({
  score,
  winRate,
  accuracy,
  totalSlips,
  roi,
}: BrainScoreWidgetProps) => {
  const getScoreColor = () => {
    if (score >= 800) return 'text-gold';
    if (score >= 600) return 'text-win-green';
    if (score >= 400) return 'text-primary';
    return 'text-muted-foreground';
  };

  const getScoreLabel = () => {
    if (score >= 800) return 'Elite Brain';
    if (score >= 600) return 'Pro Brain';
    if (score >= 400) return 'Rising Brain';
    return 'New Brain';
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          BrainScore 3.0
        </h3>
        <span className="text-sm text-muted-foreground">{getScoreLabel()}</span>
      </div>

      {/* Score Ring */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            className="fill-none stroke-muted stroke-[12]"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            className="fill-none stroke-primary stroke-[12] primary-glow"
            strokeDasharray={`${(score / 1000) * 565} 565`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-bold ${getScoreColor()}`}>
            {score}
          </span>
          <span className="text-sm text-muted-foreground">/ 1000</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm flex items-center gap-2">
              <Trophy className="h-4 w-4 text-gold" />
              Win Rate
            </span>
            <span className="font-bold text-gold">{winRate}%</span>
          </div>
          <Progress value={winRate} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Odds Accuracy
            </span>
            <span className="font-bold text-primary">{accuracy}%</span>
          </div>
          <Progress value={accuracy} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-win-green" />
              ROI
            </span>
            <span className="font-bold text-win-green">+{roi}%</span>
          </div>
          <Progress value={Math.min(roi, 100)} className="h-2" />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Slips</span>
            <span className="font-bold">{totalSlips}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
