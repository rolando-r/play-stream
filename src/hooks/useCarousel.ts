import { useState, useEffect } from "react";

export const useCarousel = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNext = () => setCurrentIndex(prev => (prev + 1) % length);
  const handlePrev = () => setCurrentIndex(prev => (prev - 1 + length) % length);

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  return { currentIndex, setCurrentIndex, progress, setProgress, handleNext, handlePrev };
};
