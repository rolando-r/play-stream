import { useState, useEffect } from "react";

interface PreloadImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const PreloadImage = ({ src, alt, className }: PreloadImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setCurrentSrc(src);
      setLoaded(true);
    };
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`${className} transition-opacity duration-200 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};
