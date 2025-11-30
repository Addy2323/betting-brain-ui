import { Card } from '@/components/ui/card';

interface PaymentMethod {
  id: string;
  name: string;
  image: string;
  description: string;
  processingTime: string;
}

interface PaymentMethodsProps {
  methods?: PaymentMethod[];
  title?: string;
  className?: string;
}

const defaultMethods: PaymentMethod[] = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    image: '/mpesa.png',
    description: 'Mobile Money Transfer',
    processingTime: 'Instant - 5 mins',
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    image: '/airtelmoney.png',
    description: 'Airtel Mobile Money',
    processingTime: '5-15 mins',
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    image: '/bank.png',
    description: 'Direct Bank Account',
    processingTime: '1-2 hours',
  },
  {
    id: 'halopesa',
    name: 'Halopesa',
    image: '/halopesa.png',
    description: 'Mobile Money Service',
    processingTime: '5-15 mins',
  },
];

export const PaymentMethods = ({ 
  methods = defaultMethods, 
  title = 'Supported Payment Methods',
  className = ''
}: PaymentMethodsProps) => {
  return (
    <div className={className}>
      <h3 className="font-display text-lg font-bold mb-6">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {methods.map((method) => (
          <Card 
            key={method.id}
            className="glass-card p-4 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 flex items-center justify-center">
                <img 
                  src={method.image} 
                  alt={method.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">{method.name}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
              <div className="pt-2 border-t border-border w-full">
                <p className="text-xs text-accent font-medium">{method.processingTime}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
