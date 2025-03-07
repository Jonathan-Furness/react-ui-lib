"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useThumbsCarousel } from "../hooks/use-thumbs-carousel";
import { cn } from "@/lib/utils";

export default function ThumbsCarousel() {
  const {
    currentIndex,
    onThumbClick,
    setMainCarouselApi,
    setThumbsCarouselApi,
  } = useThumbsCarousel();

  return (
    <div className="w-full">
      <Carousel setApi={setMainCarouselApi}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={`main-${index}`} className="h-[400px] w-full">
              <div className="bg-black w-full h-full flex items-center justify-center text-white">
                <p className="m-auto">{index}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel setApi={setThumbsCarouselApi}>
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={`thumbs-${index}`}
              className={cn(
                "pl-1 basis-1/4 h-[200px]",
                index !== currentIndex ? "opacity-50" : null,
              )}
            >
              <button
                type="button"
                onClick={() => onThumbClick(index)}
                className="bg-black w-full h-full flex items-center justify-center text-white"
              >
                <p className="m-auto">{index}</p>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
