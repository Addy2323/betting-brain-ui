import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, X, Check } from 'lucide-react';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { subscriptionUtils } from '@/lib/subscriptionUtils';

interface Betslip {
    id: string;
    odds: string;
    validityTime: string;
    price: number;
    bookmakers: string[];
    status: 'active' | 'won' | 'lost';
}

interface TipsterProfileData {
    name: string;
    image: string;
    subscribers: number;
    accuracy: number;
    betslipsCount: number;
    verified: boolean;
    betslips: Betslip[];
}

// Mock data for different tipsters
const mockTipsterData: { [key: string]: TipsterProfileData } = {
    'geoff-lea': {
        name: 'Geoff Lea',
        image: '/image/profile/p1.png',
        subscribers: 657,
        accuracy: 77.8,
        betslipsCount: 12,
        verified: true,
        betslips: [
            {
                id: '1',
                odds: '8.55',
                validityTime: '75h 4m 42s',
                price: 3000,
                bookmakers: ['SportyBet', 'betPawa', 'betway'],
                status: 'active',
            },
            {
                id: '2',
                odds: '5.20',
                validityTime: '48h 22m 15s',
                price: 2500,
                bookmakers: ['SportyBet', 'betway'],
                status: 'active',
            },
        ],
    },
    'basketball-pro': {
        name: 'Basketball Pro',
        image: '/image/profile/p2.png',
        subscribers: 432,
        accuracy: 70.3,
        betslipsCount: 8,
        verified: false,
        betslips: [],
    },
    'hanscana': {
        name: 'Hanscana',
        image: '/image/profile/p4.png',
        subscribers: 289,
        accuracy: 62.7,
        betslipsCount: 5,
        verified: true,
        betslips: [
            {
                id: '3',
                odds: '3.45',
                validityTime: '12h 15m 30s',
                price: 1500,
                bookmakers: ['betPawa', 'betway'],
                status: 'active',
            },
        ],
    },
};

const TipsterProfile = () => {
    const { tipsterId } = useParams<{ tipsterId: string }>();
    const navigate = useNavigate();
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

    const tipster = tipsterId ? mockTipsterData[tipsterId] : null;
    const isSubscribed = tipsterId ? subscriptionUtils.isSubscribed(tipsterId) : false;

    if (!tipster) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Tipster not found</h2>
                    <Button onClick={() => navigate('/index')}>Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="flex items-center gap-4 p-4">
                    <button
                        onClick={() => navigate('/index')}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <h1 className="font-display text-xl font-bold">Tipster Profile</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-4 space-y-6">
                {/* Profile Hero Section */}
                <Card className="overflow-hidden border-0 shadow-xl">
                    {/* Hero Image */}
                    <div className="relative h-64 bg-gradient-to-br from-blue-600 to-purple-700">
                        <img
                            src={tipster.image}
                            alt={tipster.name}
                            className="w-full h-full object-cover mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Profile Info */}
                    <div className="relative -mt-16 px-6 pb-6">
                        <div className="text-center space-y-4">
                            {/* Name */}
                            <div className="flex items-center justify-center gap-2">
                                <h2 className="font-display text-3xl font-bold text-white">
                                    {tipster.name}
                                </h2>
                                {tipster.verified && (
                                    <CheckCircle className="h-7 w-7 text-green-500 fill-green-500" />
                                )}
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-6 py-6">
                                <div className="space-y-1">
                                    <div className="text-3xl font-bold text-white">{tipster.subscribers}</div>
                                    <div className="text-sm text-muted-foreground">Subscribers</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-3xl font-bold text-white">{tipster.accuracy}%</div>
                                    <div className="text-sm text-muted-foreground">Accuracy</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-3xl font-bold text-white">{tipster.betslipsCount}</div>
                                    <div className="text-sm text-muted-foreground">Betslips</div>
                                </div>
                            </div>

                            {/* Subscribe Button */}
                            <Button
                                size="lg"
                                className={`w-full font-bold text-lg py-6 ${isSubscribed
                                        ? 'bg-primary/20 text-primary border-2 border-primary hover:bg-primary/30'
                                        : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                    }`}
                                onClick={() => !isSubscribed && setShowSubscriptionModal(true)}
                            >
                                {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Last 10 Betslips Section */}
                <div className="space-y-4">
                    {/* Section Header */}
                    <div className="flex items-center gap-4">
                        <h3 className="font-display text-xl font-bold">Last 10 Betslips</h3>
                        <div className="flex items-center gap-2">
                            <div className="p-1 bg-red-500/20 rounded">
                                <X className="h-4 w-4 text-red-500" />
                            </div>
                            <div className="p-1 bg-green-500/20 rounded">
                                <Check className="h-4 w-4 text-green-500" />
                            </div>
                        </div>
                    </div>

                    {/* Betslips List */}
                    {tipster.betslips.length === 0 ? (
                        <Card className="glass-card p-12 text-center">
                            <div className="text-muted-foreground text-lg">No active slip</div>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {tipster.betslips.map((betslip) => (
                                <Card key={betslip.id} className="glass-card p-6 space-y-4">
                                    {/* Odds and Status */}
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-4xl font-bold text-white">{betslip.odds}</div>
                                            <div className="text-sm text-muted-foreground">Odds</div>
                                        </div>
                                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                                            active
                                        </Badge>
                                    </div>

                                    {/* Validity Time */}
                                    <div className="text-sm text-muted-foreground">
                                        Validity Time • <span className="text-white font-medium">{betslip.validityTime}</span>
                                    </div>

                                    {/* Price */}
                                    <div className="text-2xl font-bold text-white">
                                        Tzs {betslip.price.toLocaleString()}/=
                                    </div>

                                    {/* Bookmakers */}
                                    <div className="flex gap-2 flex-wrap">
                                        {betslip.bookmakers.map((bookmaker, idx) => (
                                            <Badge
                                                key={idx}
                                                variant="outline"
                                                className="bg-red-600 text-white border-0 px-3 py-1 font-bold"
                                            >
                                                {bookmaker}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* View Betslip Button */}
                                    <Button
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
                                        size="lg"
                                        onClick={() => navigate(`/betslip/${betslip.id}`)}
                                    >
                                        View betslips
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <SubscriptionModal
                isOpen={showSubscriptionModal}
                onClose={() => setShowSubscriptionModal(false)}
                tipsterId={tipsterId || ''}
                tipsterName={tipster?.name || ''}
                tipsterImage={tipster?.image || ''}
            />
        </div>
    );
};

export default TipsterProfile;
