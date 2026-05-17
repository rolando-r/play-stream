import { useState } from "react";

interface PreloadImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const PreloadImage = ({ src, alt, className }: PreloadImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      fetchPriority="low"
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-200 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};