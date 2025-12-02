import { useState, useEffect, useRef } from 'react';
import { TipsterCard } from '@/components/TipsterCard';

interface Tipster {
    id: string;
    name: string;
    accuracy: number;
    image: string;
    verified?: boolean;
}

interface TipsterCarouselProps {
    tipsters: Tipster[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

export const TipsterCarousel = ({
    tipsters,
    autoPlay = true,
    autoPlayInterval = 3000,
}: TipsterCarouselProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!autoPlay || isPaused) return;

        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const scroll = () => {
            if (scrollContainer) {
                // Calculate card width + gap
                const cardWidth = scrollContainer.children[0]?.clientWidth || 0;
                const gap = 16; // gap-4 = 16px
                const scrollAmount = cardWidth + gap;

                // Get current scroll position
                const currentScroll = scrollContainer.scrollLeft;
                const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

                // If at the end, reset to beginning; otherwise scroll to next
                if (currentScroll >= maxScroll - 10) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        };

        const interval = setInterval(scroll, autoPlayInterval);
        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, isPaused]);

    return (
        <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar snap-x snap-mandatory"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
        >
            {tipsters.map((tipster, idx) => (
                <div key={idx} className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)] snap-start">
                    <TipsterCard {...tipster} />
                </div>
            ))}
        </div>
    );
};
