import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { subscriptionUtils } from '@/lib/subscriptionUtils';

interface TipsterCardProps {
    id: string;
    name: string;
    accuracy: number;
    image: string;
    verified?: boolean;
}

export const TipsterCard = ({ id, name, accuracy, image, verified = false }: TipsterCardProps) => {
    const navigate = useNavigate();
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const isSubscribed = subscriptionUtils.isSubscribed(id);

    const handleCardClick = () => {
        navigate(`/tipster/${id}`);
    };

    const handleSubscribe = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click when clicking subscribe
        if (!isSubscribed) {
            setShowSubscriptionModal(true);
        }
    };

    return (
        <>
            <Card
                className="glass-card overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={handleCardClick}
            >
                {/* Tipster Image */}
                <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                    {/* Name and Verification */}
                    <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-lg text-foreground">{name}</h3>
                        {verified && (
                            <CheckCircle className="h-5 w-5 text-green-500 fill-green-500" />
                        )}
                    </div>

                    {/* Accuracy */}
                    <div className="text-center">
                        <div className="text-3xl font-bold text-foreground">{accuracy}%</div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>

                    {/* Subscribe Button */}
                    <Button
                        className={`w-full font-bold ${isSubscribed
                                ? 'bg-primary/20 text-primary border border-primary hover:bg-primary/30'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                            }`}
                        size="sm"
                        onClick={handleSubscribe}
                    >
                        {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                    </Button>
                </div>
            </Card>

            <SubscriptionModal
                isOpen={showSubscriptionModal}
                onClose={() => setShowSubscriptionModal(false)}
                tipsterId={id}
                tipsterName={name}
                tipsterImage={image}
            />
        </>
    );
};
