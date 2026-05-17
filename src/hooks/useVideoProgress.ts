import { useEffect, useRef } from "react";

export const useVideoProgress = (
  playerRef: any,
  duration: number | null,
  setProgress: (val: number) => void,
  handleNext: () => void,
) => {
  const handleNextRef = useRef(handleNext);

  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  useEffect(() => {
    if (!duration) return;

    const interval = setInterval(() => {
      const currentTime = playerRef.current?.getCurrentTime?.();

      if (typeof currentTime === "number" && duration > 0) {
        const percentage = (currentTime / duration) * 100;
        setProgress(percentage);

        if (percentage >= 99) {
          handleNextRef.current();
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [duration]);
};
