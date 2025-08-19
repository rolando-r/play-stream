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

      if (typeof currentTime === "number" && duration > 0) {
        const percentage = (currentTime / duration) * 100;
        setProgress(percentage);

        if (percentage >= 99) {
          handleNext();
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [playerRef, duration, setProgress, handleNext]);
};
