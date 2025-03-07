import { useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

export function useThumbsCarousel() {
  const [mainCarouselApi, setMainCarouselApi] = useState<CarouselApi | null>(
    null,
  );
  const [thumbsCarouselApi, setThumbsCarouselApi] =
    useState<CarouselApi | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onSelect = useCallback(() => {
    if (!mainCarouselApi || !thumbsCarouselApi) return;
    setCurrentIndex(mainCarouselApi.selectedScrollSnap());
    thumbsCarouselApi.scrollTo(mainCarouselApi.selectedScrollSnap());
  }, [mainCarouselApi, thumbsCarouselApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainCarouselApi || !thumbsCarouselApi) return;
      mainCarouselApi.scrollTo(index);
    },
    [mainCarouselApi, thumbsCarouselApi],
  );

  useEffect(() => {
    if (!mainCarouselApi) return;
    onSelect();

    mainCarouselApi?.on("select", onSelect).on("reInit", onSelect);
    return () => {
      mainCarouselApi?.off("select", onSelect);
    };
  }, [mainCarouselApi, onSelect]);

  return {
    mainCarouselApi,
    setMainCarouselApi,
    thumbsCarouselApi,
    setThumbsCarouselApi,
    currentIndex,
    setCurrentIndex,
    onThumbClick,
  };
}
