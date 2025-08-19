import { useEffect } from "react";

export const useVideoProgress = (
  playerRef: any,
  duration: number | null,
  setProgress: (val: number) => void,
  handleNext: () => void
) => {
  useEffect(() => {
    if (!playerRef.current || !duration) return;

    const interval = setInterval(() => {
      const currentTime = playerRef.current?.getCurrentTime?.();
      if (currentTime && duration) {
        const percentage = (currentTime / duration) * 100;
        setProgress(percentage);

        if (percentage >= 99) handleNext();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [duration, playerRef, handleNext, setProgress]);
};
