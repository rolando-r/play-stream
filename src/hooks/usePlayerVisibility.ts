import { useState, useEffect } from "react";

export const usePlayerVisibility = (isVideoReady: boolean, delay = 4000) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  useEffect(() => {
    if (!isVideoReady) {
      setIsPlayerVisible(false);
      return;
    }
    const timer = setTimeout(() => setIsPlayerVisible(true), delay);
    return () => clearTimeout(timer);
  }, [isVideoReady, delay]);

  return isPlayerVisible;
};