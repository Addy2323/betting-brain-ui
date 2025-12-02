import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { subscriptionUtils } from '@/lib/subscriptionUtils';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    tipsterId: string;
    tipsterName: string;
    tipsterImage: string;
}

export const SubscriptionModal = ({
    isOpen,
    onClose,
    tipsterId,
    tipsterName,
    tipsterImage,
}: SubscriptionModalProps) => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

    const plans = [
        {
            id: 'daily' as const,
            name: 'Daily',
            price: 3000,
            duration: '24 hours',
            features: ['Access all betslips', 'Valid for 1 day', 'Instant activation'],
        },
        {
            id: 'weekly' as const,
            name: 'Weekly',
            price: 7000,
            duration: '7 days',
            features: ['Access all betslips', 'Valid for 7 days', 'Best value', 'Instant activation'],
            popular: true,
        },
        {
            id: 'monthly' as const,
            name: 'Monthly',
            price: 20000,
            duration: '30 days',
            features: ['Access all betslips', 'Valid for 30 days', 'Maximum savings', 'Instant activation'],
        },
    ];

    const handleSubscribe = () => {
        const pendingSubscription = {
            tipsterId,
            tipsterName,
            tipsterImage,
            plan: selectedPlan,
            price: subscriptionUtils.getPlanPrice(selectedPlan),
        };

        subscriptionUtils.setPendingSubscription(pendingSubscription);
        onClose();
        navigate('/wallet');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        <div className="flex flex-col items-center gap-3 mb-4">
                            <img
                                src={tipsterImage}
                                alt={tipsterName}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">Subscribe to {tipsterName}</h2>
                                <p className="text-sm text-muted-foreground font-normal">
                                    Get unlimited access to all betslips
                                </p>
                            </div>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {plans.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`p-4 cursor-pointer transition-all ${selectedPlan === plan.id
                                    ? 'border-primary border-2 bg-primary/5'
                                    : 'border-border hover:border-primary/50'
                                } ${plan.popular ? 'relative' : ''}`}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                                        POPULAR
                                    </span>
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-bold text-lg">{plan.name}</h3>
                                    <p className="text-sm text-muted-foreground">{plan.duration}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">Tzs {plan.price.toLocaleString()}</div>
                                </div>
                            </div>

                            <ul className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>

                <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button onClick={handleSubscribe} className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                        Continue to Payment
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
