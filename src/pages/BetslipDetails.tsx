import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Eye } from 'lucide-react';
import { subscriptionUtils } from '@/lib/subscriptionUtils';

interface BetslipDetailsData {
    tipsterId: string;
    tipsterName: string;
    tipsterImage: string;
    subscribers: string;
    odds: string;
    validityTime: string;
    price: number;
    bookmakers: string[];
    previewImage?: string;
}

// Mock betslip data
const mockBetslipData: { [key: string]: BetslipDetailsData } = {
    '1': {
        tipsterId: 'basketball-pro',
        tipsterName: 'Basketball',
        tipsterImage: '/image/profile/p2.png',
        subscribers: '13k',
        odds: '14.35',
        validityTime: '53h 17m 1s',
        price: 3000,
        bookmakers: ['SportyBet'],
        previewImage: '/image/v1.png',
    },
    '2': {
        tipsterId: 'geoff-lea',
        tipsterName: 'Geoff Lea',
        tipsterImage: '/image/profile/p1.png',
        subscribers: '657',
        odds: '5.20',
        validityTime: '48h 22m 15s',
        price: 2500,
        bookmakers: ['SportyBet', 'betway'],
        previewImage: '/image/v2.png',
    },
    '3': {
        tipsterId: 'hanscana',
        tipsterName: 'Hanscana',
        tipsterImage: '/image/profile/p4.png',
        subscribers: '289',
        odds: '3.45',
        validityTime: '12h 15m 30s',
        price: 1500,
        bookmakers: ['betPawa', 'betway'],
        previewImage: '/image/v3.png',
    },
};

const BetslipDetails = () => {
    const { betslipId } = useParams<{ betslipId: string }>();
    const navigate = useNavigate();

    const betslip = betslipId ? mockBetslipData[betslipId] : null;
    const isSubscribed = betslip ? subscriptionUtils.isSubscribed(betslip.tipsterId) : false;

    if (!betslip) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Betslip not found</h2>
                    <Button onClick={() => navigate(-1)}>Go Back</Button>
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
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <h1 className="font-display text-xl font-bold">Betslip details</h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-4 space-y-6">
                {/* Tipster Info */}
                <div className="flex items-center gap-3">
                    <img
                        src={betslip.tipsterImage}
                        alt={betslip.tipsterName}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="font-display text-xl font-bold">{betslip.tipsterName}</h2>
                        <p className="text-sm text-muted-foreground">Subscribers • {betslip.subscribers}</p>
                    </div>
                </div>

                {/* Odds */}
                <div>
                    <div className="text-5xl font-bold text-foreground">{betslip.odds}</div>
                    <div className="text-lg text-muted-foreground">Odds</div>
                </div>

                {/* Validity Time and Price */}
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Validity Time • <span className="text-foreground font-medium">{betslip.validityTime}</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                        {isSubscribed ? (
                            <span className="text-emerald-500">FREE</span>
                        ) : (
                            <>Tzs {betslip.price.toLocaleString()}/=</>
                        )}
                    </div>
                </div>

                {/* Subscription Badge */}
                {isSubscribed && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg">
                        <p className="text-emerald-500 font-semibold text-center">
                            ✓ You're subscribed! Access this betslip for FREE
                        </p>
                    </div>
                )}

                {/* Bet Companies */}
                <div className="space-y-3">
                    <h3 className="text-xl font-bold">Bet Companies</h3>
                    <div className="flex gap-2 flex-wrap">
                        {betslip.bookmakers.map((bookmaker, idx) => (
                            <Badge
                                key={idx}
                                className="bg-red-600 text-white border-0 px-4 py-2 text-sm font-bold"
                            >
                                {bookmaker}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Betslip Preview */}
                <Card className="overflow-hidden border-0 shadow-xl relative">
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-200 via-gray-100 to-orange-100">
                        {betslip.previewImage ? (
                            <img
                                src={betslip.previewImage}
                                alt="Betslip preview"
                                className="w-full h-full object-cover blur-sm"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-gray-400 text-lg">Betslip Preview</p>
                            </div>
                        )}

                        {/* Overlay Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                                size="lg"
                                className="bg-gray-600/80 hover:bg-gray-700/90 text-foreground font-bold gap-2 backdrop-blur-sm"
                                onClick={() => navigate('/wallet')}
                            >
                                <Eye className="h-5 w-5" />
                                View betslip
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Buy Button */}
                <Button
                    size="lg"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-6"
                    onClick={() => navigate('/wallet')}
                >
                    {isSubscribed ? 'Access Betslip (FREE)' : 'Buy betslip'}
                </Button>
            </div>
        </div>
    );
};

export default BetslipDetails;
