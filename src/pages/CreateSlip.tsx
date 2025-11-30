import { useState } from 'react';
import { FileText, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Pick {
  id: string;
  match: string;
  pick: string;
  odds: string;
}

export default function CreateSlip() {
  const { toast } = useToast();
  const [picks, setPicks] = useState<Pick[]>([
    { id: '1', match: '', pick: '', odds: '' }
  ]);

  const addPick = () => {
    setPicks([...picks, { id: Date.now().toString(), match: '', pick: '', odds: '' }]);
  };

  const removePick = (id: string) => {
    if (picks.length > 1) {
      setPicks(picks.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Slip Created",
      description: "Your betting slip has been encrypted and published",
    });
  };

  const totalOdds = picks.reduce((acc, pick) => {
    const odds = parseFloat(pick.odds) || 1;
    return acc * odds;
  }, 1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Create Betting Slip
          </h1>
          <p className="text-muted-foreground">Encrypted until purchased - Your picks stay secure</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Slip Details */}
        <Card className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Slip Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>League/Competition</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select league" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="epl">Premier League</SelectItem>
                  <SelectItem value="laliga">La Liga</SelectItem>
                  <SelectItem value="seriea">Serie A</SelectItem>
                  <SelectItem value="bundesliga">Bundesliga</SelectItem>
                  <SelectItem value="ucl">Champions League</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Risk Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk (Odds 2-5)</SelectItem>
                  <SelectItem value="medium">Medium Risk (Odds 5-20)</SelectItem>
                  <SelectItem value="high">High Risk (Odds 20+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Price (USD)</Label>
              <Input type="number" placeholder="5.00" min="1" step="0.01" />
            </div>

            <div className="space-y-2">
              <Label>Bookmaker</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select bookmaker" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="betika">Betika</SelectItem>
                  <SelectItem value="sportpesa">SportPesa</SelectItem>
                  <SelectItem value="1xbet">1xBet</SelectItem>
                  <SelectItem value="bet365">Bet365</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Slip Description (Optional)</Label>
            <Textarea placeholder="Explain your reasoning, analysis, or strategy..." />
          </div>
        </Card>

        {/* Picks */}
        <Card className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Picks ({picks.length})</h2>
            <Button type="button" onClick={addPick} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Pick
            </Button>
          </div>

          <div className="space-y-4">
            {picks.map((pick, index) => (
              <div key={pick.id} className="p-4 rounded-lg bg-muted/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Pick #{index + 1}</span>
                  {picks.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePick(pick.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder="Match (e.g., Arsenal vs Chelsea)" />
                  <Input placeholder="Pick (e.g., Over 2.5 Goals)" />
                  <Input type="number" placeholder="Odds" step="0.01" min="1" />
                </div>
              </div>
            ))}
          </div>

          {/* Total Odds */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total Odds</span>
              <span className="text-2xl font-bold text-gold">{totalOdds.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Proof Upload */}
        <Card className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Upload Slip Proof</h2>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Upload screenshot of your betting slip from bookmaker
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG up to 5MB
            </p>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="button" variant="outline" className="flex-1">
            Save as Draft
          </Button>
          <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
            Publish Encrypted Slip
          </Button>
        </div>
      </form>
    </div>
  );
}
