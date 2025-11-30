import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Flame, Star } from 'lucide-react';

interface BannerSlide {
  id: string;
  tipsterName: string;
  winStreak: number;
  accuracy: number;
  dropTime: string;
  availableTime: string;
  description: string;
  image?: string;
  gradientFrom: string;
  gradientTo: string;
  badgeColor: string;
}

interface FreeBrainCarouselProps {
  slides?: BannerSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const defaultSlides: BannerSlide[] = [
  {
    id: '1',
    tipsterName: 'Sarah Johnson',
    winStreak: 12,
    accuracy: 94,
    dropTime: '2h 14m',
    availableTime: '11:00 AM EAT',
    description: 'Today\'s Free Brain from Elite Tipster',
    image: '/image1.png',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-purple-800',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
  },
  {
    id: '2',
    tipsterName: 'Alex Martinez',
    winStreak: 8,
    accuracy: 89,
    dropTime: '1h 45m',
    availableTime: '10:30 AM EAT',
    description: 'Premium Betting Tips - Limited Time Offer',
    image: '/image2.png',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-blue-800',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
  },
  {
    id: '3',
    tipsterName: 'Mike Chen',
    winStreak: 15,
    accuracy: 92,
    dropTime: '3h 30m',
    availableTime: '12:15 PM EAT',
    description: 'Exclusive Predictions from Top Tipsters',
    image: '/image3.png',
    gradientFrom: 'from-orange-600',
    gradientTo: 'to-orange-800',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
  },
];

export const FreeBrainCarousel = ({
  slides = defaultSlides,
  autoPlay = true,
  autoPlayInterval = 5000,
}: FreeBrainCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="space-y-4">
      {/* Banner Card with Animation */}
      <Card className={`relative overflow-hidden bg-gradient-to-r ${currentSlide.gradientFrom} ${currentSlide.gradientTo} p-8 border-secondary transition-all duration-500 ease-in-out`}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {currentSlide.image && (
            <img
              src={currentSlide.image}
              alt={currentSlide.description}
              className="w-full h-full object-cover opacity-20 transition-opacity duration-500"
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.gradientFrom} ${currentSlide.gradientTo} opacity-80`} />
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        
        {/* Content with Animation */}
        <div className="relative z-10 flex items-center justify-between animate-fade-in">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-6 w-6 text-white" />
              <Badge className={`${currentSlide.badgeColor} border transition-all duration-500`}>
                FREE DAILY
              </Badge>
            </div>
            <h2 className="font-display text-3xl font-bold mb-2 text-white transition-all duration-500">
              {currentSlide.description}
            </h2>
            <p className="text-lg text-white/90 mb-4 transition-all duration-500">
              {currentSlide.tipsterName} • {currentSlide.winStreak}-game win streak • {currentSlide.accuracy}% accuracy
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-white/80">
                <Flame className="h-4 w-4" />
                <span className="font-semibold">Drops in {currentSlide.dropTime}</span>
              </span>
              <span className="text-white/70">Available at {currentSlide.availableTime}</span>
            </div>
          </div>
          <Button size="lg" className="bg-gold text-black hover:bg-gold-glow gap-2 gold-glow transition-transform duration-500 hover:scale-105">
            <Star className="h-5 w-5" />
            <span className="font-bold">Notify Me</span>
          </Button>
        </div>
      </Card>

      {/* Dots Navigation */}
      <div className="flex items-center justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentIndex
                ? 'bg-primary w-8 h-2'
                : 'bg-muted hover:bg-muted-foreground w-2 h-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
