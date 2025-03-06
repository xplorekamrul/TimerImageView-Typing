"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import TypeEffect from "./typeEffect";

interface AutoSliderProps {
  slides: {
    id: string;
    color?: string;
    image?: string; // Optional background image URL
    content?: React.ReactNode;
  }[];
  interval?: number;
  className?: string;
}

export function AutoSlider({
  slides,
  interval = 5000,
  className,
}: AutoSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Reset timer when slide changes manually
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, interval);
    }
  }, [interval, isPaused, nextSlide]);

  // Auto-slide effect
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetTimer]);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Slides */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[700px]">
        <div className="w-full h-full bg-[rgba(0,0,0,0.4)]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-500",
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
              style={{
                backgroundColor: slide.color,
              }}
            >
              {/* If there's an image, render an <img> tag */}
              {slide.image && (
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Render provided content or default content */}
              {slide.content || (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-2xl font-bold">
                  <div>
                    <TypeEffect
                      fixedText="Hello, "
                      dynamicText={["welcome to My Blog "]}
                      className="text-center mb-10 font-semibold mt-[100px] text-white"
                    />
                    <h1 className="text-center my-10 font-medium text-white">
                      click any Picture For Better Experience
                    </h1>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
        onClick={() => {
          prevSlide();
          resetTimer();
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
        onClick={() => {
          nextSlide();
          resetTimer();
        }}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300 focus:outline-none",
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            )}
            onClick={() => {
              goToSlide(index);
              resetTimer();
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Pause/Play Button (Optional) */}
      <button
        className={cn(
          "absolute bottom-4 right-4 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
      >
        {isPaused ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        )}
      </button>
    </div>
  );
}
