import { useState, useEffect } from 'react';

// Array of images from public/image directory
const images = [
  '/image/v1.png',
  '/image/v2.png',
  '/image/v3.png',
  '/image/v4.jpeg',
  '/image/v5.png',
  '/image/v6.jpeg',
];

interface FreeBrainCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const FreeBrainCarousel = ({
  autoPlay = true,
  autoPlayInterval = 5000,
}: FreeBrainCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-3">
      {/* Image Container */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl max-h-[280px]">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Dots Navigation */}
      <div className="flex items-center justify-center gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentIndex
              ? 'bg-primary w-6 h-1.5'
              : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-1.5 h-1.5'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
