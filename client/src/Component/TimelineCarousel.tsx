import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TimelineEvent } from "../types/types";
import { TimelineCard } from "./TimelineCard";

interface TimelineCarouselProps {
  events: TimelineEvent[];
}

export function TimelineCarousel({ events }: TimelineCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      if (!isAnimating && events.length > 1) {
        handleNext();
      }
    }, 5000); 

    return () => clearInterval(timer);
  }, [currentIndex, isAnimating, events.length, isPaused]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % events.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!events || events.length === 0) return null;

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel Stage */}
      <div className="relative w-full max-w-7xl perspective-1000" ref={containerRef}>
        <div className="relative h-[600px] flex items-center justify-center preserve-3d">
          {events.map((event, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);
            
            // Render visible window
            if (absOffset > 2) return null;

            return (
              <div
                key={event.id}
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `
                    translateX(${offset * (window.innerWidth < 768 ? 110 : 60)}%) 
                    scale(${absOffset === 0 ? 1 : absOffset === 1 ? 0.9 : 0.8})
                  `,
                  zIndex: 20 - absOffset,
                  opacity: absOffset > 1 ? 0 : absOffset === 0 ? 1 : 0.5,
                  filter: absOffset === 0 ? 'none' : 'blur(2px)',
                  pointerEvents: absOffset === 0 ? 'auto' : 'none',
                }}
              >
                <TimelineCard data={event} isActive={absOffset === 0} />
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons - Floating */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:scale-110 transition-all active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:scale-110 transition-all active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Interactive Progress Bar */}
      <div className="mt-8 flex flex-col items-center gap-4 z-30">
        <div className="flex gap-2">
            {events.map((_, index) => (
            <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                    ? "w-8 bg-blue-600"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
            />
            ))}
        </div>
        
        <div className="text-xs font-medium text-slate-400 uppercase tracking-widest">
            {currentIndex + 1} <span className="text-slate-300 mx-1">/</span> {events.length}
        </div>
      </div>
    </div>
  );
}