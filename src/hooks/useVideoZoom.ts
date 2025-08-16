import { useEffect, useState } from "react";

export const useVideoZoom = (isLargeScreen: boolean) => {
  const [zoomFactor, setZoomFactor] = useState(1);

  useEffect(() => {
    const adjustZoom = () => {
      const aspectRatioScreen = window.innerWidth / window.innerHeight;
      const aspectRatioVideo = 16 / 9;
      let zoom = 1;
      if (aspectRatioScreen > aspectRatioVideo)
        zoom = aspectRatioScreen / aspectRatioVideo;
      else
        zoom = aspectRatioVideo / aspectRatioScreen;
      setZoomFactor(zoom * 1.2);
    };

    if (isLargeScreen) {
      adjustZoom();
      window.addEventListener("resize", adjustZoom);
      return () => window.removeEventListener("resize", adjustZoom);
    }
  }, [isLargeScreen]);

  return zoomFactor;
};
