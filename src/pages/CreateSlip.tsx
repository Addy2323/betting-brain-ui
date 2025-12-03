import { useState } from 'react';
import { FileText, Plus, Trash2, Upload, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

interface Match {
  id: string;
  name: string;
  options: string;
}

interface DraftSlip {
  totalPicks: string;
  totalOdds: string;
  price: string;
  bookmakers: string[];
  bookingCodes: { [key: string]: string };
  matches: Match[];
  startTime: string;
  endTime: string;
  proofImage: string;
  description: string;
}

export default function CreateSlip() {
  const { toast } = useToast();

  const defaultDraft: DraftSlip = {
    totalPicks: '',
    totalOdds: '',
    price: '',
    bookmakers: [],
    bookingCodes: {},
    matches: [{ id: '1', name: '', options: '' }],
    startTime: '',
    endTime: '',
    proofImage: '',
    description: '',
  };

  // Load draft from localStorage
  const [draftSlip, setDraftSlip] = useLocalStorage<DraftSlip>(STORAGE_KEYS.DRAFT_SLIP, defaultDraft);

  const [matches, setMatches] = useState<Match[]>((draftSlip?.matches) || defaultDraft.matches);

  const addMatch = () => {
    setMatches([...matches, { id: Date.now().toString(), name: '', options: '' }]);
  };

  const removeMatch = (id: string) => {
    if (matches.length > 1) {
      setMatches(matches.filter(m => m.id !== id));
    }
  };

  const handleSaveDraft = () => {
    setDraftSlip({
      totalPicks: draftSlip?.totalPicks || '',
      totalOdds: draftSlip?.totalOdds || '',
      price: draftSlip?.price || '',
      bookmakers: draftSlip?.bookmakers || [],
      bookingCodes: draftSlip?.bookingCodes || {},
      matches,
      startTime: draftSlip?.startTime || '',
      endTime: draftSlip?.endTime || '',
      proofImage: draftSlip?.proofImage || '',
      description: draftSlip?.description || '',
    });
    toast({
      title: "Draft Saved",
      description: "Your slip draft has been saved to local storage",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!draftSlip?.totalPicks || !draftSlip?.totalOdds || !draftSlip?.price || (draftSlip?.bookmakers || []).length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create new slip object
    const newSlip = {
      id: Date.now().toString(),
      totalPicks: parseInt(draftSlip.totalPicks) || 0,
      totalOdds: parseFloat(draftSlip.totalOdds) || 0,
      price: parseInt(draftSlip.price) || 0,
      bookmakers: draftSlip.bookmakers,
      bookingCodes: draftSlip.bookingCodes,
      matches: matches,
      proofImage: draftSlip.proofImage,
      status: 'published' as const,
      createdAt: new Date().toISOString(),
      startTime: draftSlip.startTime,
      endTime: draftSlip.endTime,
      purchases: 0,
      earnings: 0,
    };

    // Save to MySlips
    const existingSlips = JSON.parse(localStorage.getItem(STORAGE_KEYS.TIPSTER_SLIPS) || '[]');
    const updatedSlips = [...existingSlips, newSlip];
    localStorage.setItem(STORAGE_KEYS.TIPSTER_SLIPS, JSON.stringify(updatedSlips));

    // Also add to trending slips for users to see
    const trendingSlips = JSON.parse(localStorage.getItem('trendingSlips') || '[]');
    const trendingSlip = {
      ...newSlip,
      picks: parseInt(draftSlip.totalPicks) || 0,
      tipsterName: localStorage.getItem(STORAGE_KEYS.AUTH_USER) || 'Anonymous Tipster',
      tipsterAvatar: '/placeholder.svg',
      subscriberCount: 5300,
      verified: true,
      watching: 0,
      risk: 'medium' as const,
    };
    const updatedTrendingSlips = [...trendingSlips, trendingSlip];
    localStorage.setItem('trendingSlips', JSON.stringify(updatedTrendingSlips));

    // Clear draft after successful submission
    setDraftSlip({
      totalPicks: '',
      totalOdds: '',
      price: '',
      bookmakers: [],
      bookingCodes: {},
      matches: [{ id: '1', name: '', options: '' }],
      startTime: '',
      endTime: '',
      proofImage: '',
      description: '',
    });
    setMatches([{ id: '1', name: '', options: '' }]);

    toast({
      title: "Slip Published",
      description: "Your betting slip has been encrypted and published successfully!",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload PNG or JPG images only",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setDraftSlip({
        ...(draftSlip || defaultDraft),
        proofImage: base64String,
      });
      toast({
        title: "Image Uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3">
        <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
        <div className="min-w-0">
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
            Create Betting Slip
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground truncate">Encrypted until purchased - Your picks stay secure</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Slip Details */}
        <Card className="glass-card p-4 md:p-6 space-y-4 w-full min-w-0">
          <h2 className="text-lg md:text-xl font-semibold">Slip Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full min-w-0">
            <div className="space-y-2 w-full min-w-0">
              <Label className="text-sm">Total Picks</Label>
              <Input
                type="number"
                placeholder="2"
                min="1"
                value={draftSlip?.totalPicks || ''}
                onChange={(e) => setDraftSlip({ ...(draftSlip || defaultDraft), totalPicks: e.target.value })}
                className="h-10 md:h-11 text-sm w-full"
              />
            </div>

            <div className="space-y-2 w-full min-w-0">
              <Label className="text-sm">Total Odds</Label>
              <Input
                type="number"
                placeholder="5.02"
                min="1"
                step="0.01"
                value={draftSlip?.totalOdds || ''}
                onChange={(e) => setDraftSlip({ ...(draftSlip || defaultDraft), totalOdds: e.target.value })}
                className="h-10 md:h-11 text-sm w-full"
              />
            </div>

            <div className="space-y-2 w-full min-w-0">
              <Label className="text-sm">Price (TSH)</Label>
              <Input
                type="number"
                placeholder="5000"
                min="1"
                value={draftSlip?.price || ''}
                onChange={(e) => setDraftSlip({ ...(draftSlip || defaultDraft), price: e.target.value })}
                className="h-10 md:h-11 text-sm w-full"
              />
            </div>
          </div>

          {/* Bookmakers Selection */}
          <div className="space-y-3 w-full min-w-0">
            <Label className="text-sm font-semibold">Select Bookmakers</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full min-w-0">
              {['Betika', 'SportPesa', '1xBet', 'Bet365', 'Betpawa', 'Betway', 'Mozzart', 'Betin', 'Helabet', 'Paripesa'].map((bookmaker) => (
                <label key={bookmaker} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={(draftSlip?.bookmakers || []).includes(bookmaker.toLowerCase())}
                    onChange={(e) => {
                      const value = bookmaker.toLowerCase();
                      const updated = e.target.checked
                        ? [...(draftSlip?.bookmakers || []), value]
                        : (draftSlip?.bookmakers || []).filter(b => b !== value);
                      setDraftSlip({ ...(draftSlip || defaultDraft), bookmakers: updated });
                    }}
                    className="w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="text-sm">{bookmaker}</span>
                </label>
              ))}
            </div>
            {(draftSlip?.bookmakers || []).length > 0 && (
              <div className="text-xs text-muted-foreground">
                Selected: {(draftSlip?.bookmakers || []).map(b => b.charAt(0).toUpperCase() + b.slice(1)).join(', ')}
              </div>
            )}
          </div>

          {/* Booking Codes for Each Bookmaker */}
          {(draftSlip?.bookmakers || []).length > 0 && (
            <div className="space-y-3 w-full min-w-0">
              <Label className="text-sm font-semibold">Booking Codes</Label>
              <p className="text-xs text-muted-foreground">Enter the booking code for each selected bookmaker</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full min-w-0">
                {(draftSlip?.bookmakers || []).map((bookmaker) => (
                  <div key={bookmaker} className="space-y-1 w-full min-w-0">
                    <Label className="text-xs capitalize">{bookmaker} Code</Label>
                    <Input
                      type="text"
                      placeholder={`${bookmaker.charAt(0).toUpperCase() + bookmaker.slice(1)} booking code`}
                      value={(draftSlip?.bookingCodes || {})[bookmaker] || ''}
                      onChange={(e) => {
                        const updated = { ...(draftSlip?.bookingCodes || {}) };
                        updated[bookmaker] = e.target.value;
                        setDraftSlip({ ...(draftSlip || defaultDraft), bookingCodes: updated });
                      }}
                      className="h-9 text-sm w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 w-full min-w-0">
            <Label className="text-sm">Slip Description (Optional)</Label>
            <Textarea
              placeholder="Explain your reasoning, analysis, or strategy..."
              value={draftSlip?.description || ''}
              onChange={(e) => setDraftSlip({ ...(draftSlip || defaultDraft), description: e.target.value })}
              className="text-sm min-h-24 w-full"
            />
          </div>
        </Card>

        {/* Timer Section */}
        <Card className="glass-card p-4 md:p-6 space-y-4 w-full min-w-0">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
            <h2 className="text-lg md:text-xl font-semibold">Slip Timer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full min-w-0">
            <div className="space-y-2 w-full min-w-0">
              <Label className="text-sm">Slip Start Time</Label>
              <Input
                type="datetime-local"
                value={draftSlip?.startTime || ''}
                onChange={(e) => setDraftSlip({ ...(draftSlip || defaultDraft), startTime: e.target.value })}
                className="h-10 md:h-11 text-sm w-full"
              />
              <p className="text-xs text-muted-foreground">When the slip becomes available for purchase</p>
            </div>

            <div className="space-y-2 w-full min-w-0">
              <Label className="text-sm">Slip End Time</Label>
              <Input
                type="datetime-local"
                value={draftSlip?.endTime || ''}
                onChange={(e) => setDraftSlip({ ...(draftSlip || defaultDraft), endTime: e.target.value })}
                className="h-10 md:h-11 text-sm w-full"
              />
              <p className="text-xs text-muted-foreground">When the slip expires and is no longer available</p>
            </div>
          </div>

          {/* Time Display */}
          {(draftSlip?.startTime || draftSlip?.endTime) && (
            <div className="p-3 md:p-4 rounded-lg bg-primary/10 border border-primary/30 space-y-2">
              {draftSlip?.startTime && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Starts:</span>
                  <span className="font-semibold text-primary">
                    {new Date(draftSlip.startTime).toLocaleString()}
                  </span>
                </div>
              )}
              {draftSlip?.endTime && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ends:</span>
                  <span className="font-semibold text-primary">
                    {new Date(draftSlip.endTime).toLocaleString()}
                  </span>
                </div>
              )}
              {draftSlip?.startTime && draftSlip?.endTime && (
                <div className="flex items-center justify-between text-sm pt-2 border-t border-primary/20">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-semibold text-accent">
                    {Math.floor((new Date(draftSlip.endTime).getTime() - new Date(draftSlip.startTime).getTime()) / (1000 * 60 * 60))} hours
                  </span>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Matches */}
        <Card className="glass-card p-4 md:p-6 space-y-4 w-full min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg md:text-xl font-semibold truncate">Matches ({matches.length})</h2>
            <Button type="button" onClick={addMatch} variant="outline" size="sm" className="text-xs md:text-sm flex-shrink-0">
              <Plus className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Add Match</span>
              <span className="md:hidden">Add</span>
            </Button>
          </div>

          <div className="space-y-3 md:space-y-4 w-full min-w-0">
            {matches.map((match, index) => (
              <div key={match.id} className="p-3 md:p-4 rounded-lg bg-muted/30 space-y-3 w-full min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-xs md:text-sm">Match #{index + 1}</span>
                  {matches.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMatch(match.id)}
                      className="h-8 w-8 p-0 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 w-full min-w-0">
                  <Input
                    placeholder="Match (e.g., Arsenal vs Chelsea)"
                    value={match.name}
                    onChange={(e) => {
                      const updated = matches.map(m => m.id === match.id ? { ...m, name: e.target.value } : m);
                      setMatches(updated);
                    }}
                    className="h-10 text-sm w-full"
                  />
                  <Input
                    placeholder="Options (e.g., Over 2.5 Goals, BTTS Yes)"
                    value={match.options}
                    onChange={(e) => {
                      const updated = matches.map(m => m.id === match.id ? { ...m, options: e.target.value } : m);
                      setMatches(updated);
                    }}
                    className="h-10 text-sm w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Proof Upload */}
        <Card className="glass-card p-4 md:p-6 space-y-4 w-full min-w-0">
          <h2 className="text-lg md:text-xl font-semibold">Upload Slip Proof</h2>

          {draftSlip?.proofImage ? (
            <div className="space-y-3">
              <div className="relative w-full rounded-lg overflow-hidden bg-muted/30 border border-primary/30">
                <img
                  src={draftSlip.proofImage}
                  alt="Slip Proof"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 text-sm"
                  onClick={() => {
                    const input = document.getElementById('file-upload') as HTMLInputElement;
                    input?.click();
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-destructive hover:text-destructive text-sm"
                  onClick={() => setDraftSlip({ ...(draftSlip || defaultDraft), proofImage: '' })}
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <label className="border-2 border-dashed border-border rounded-lg p-6 md:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer w-full min-w-0 block">
              <Upload className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-muted-foreground" />
              <p className="text-xs md:text-sm text-muted-foreground mb-2">
                Upload screenshot of your betting slip from bookmaker
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 5MB
              </p>
              <input
                id="file-upload"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}
        </Card>

        {/* Submit */}
        <div className="flex gap-2 md:gap-4">
          <Button type="button" variant="outline" className="flex-1 h-10 md:h-11 text-sm" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button type="submit" className="flex-1 h-10 md:h-11 text-sm bg-gradient-to-r from-primary to-accent">
            Publish Slip
          </Button>
        </div>
      </form>
    </div>
  );
}
