import { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode[]; // Array of React nodes
  autoPlay?: boolean;
  interval?: number;
};

export const Carousel = ({
  children,
  autoPlay = false,
  interval = 5000,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrevious = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === children.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === activeIndex) return;

    setIsTransitioning(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  return (
    <div className="bg-black/80 w-full aspect-video relative flex items-center justify-center mb-10 rounded-lg border border-gray-700 overflow-hidden">
      <div className="absolute left-4 z-30">
        <button
          className="text-white p-2 rounded-full bg-gray-800/70 hover:bg-blue-600/70 transition-colors"
          onClick={goToPrevious}
          disabled={isTransitioning}
        >
          <span className="text-2xl">&lt;</span>
        </button>
      </div>

      <div className="w-full h-full relative">
        {children.map((child, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ease-in-out ${
              index === activeIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="absolute right-4 z-30">
        <button
          className="text-white p-2 rounded-full bg-gray-800/70 hover:bg-blue-600/70 transition-colors"
          onClick={goToNext}
          disabled={isTransitioning}
        >
          <span className="text-2xl">&gt;</span>
        </button>
      </div>

      <div className="absolute bottom-2 w-full flex justify-center space-x-2 z-30">
        {children.map((_, index) => (
          <button
            key={index}
            className={`h-1 rounded-full transition-all ${
              index === activeIndex
                ? "w-6 bg-white/80"
                : "w-1 bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
