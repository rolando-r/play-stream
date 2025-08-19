import { useEffect, useRef, useState } from "react";

export const useYouTubePlayer = (
  trailerKey: string | null,
  isLargeScreen: boolean,
  isMuted: boolean
) => {
  const playerRef = useRef<any>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    if (!trailerKey || !isLargeScreen) return;
    
    setIsVideoReady(false);

    const initPlayer = () => {
      if (playerRef.current) {
        playerRef.current.loadVideoById(trailerKey);
        if (!isMuted) {
          playerRef.current.unMute();
        }
        return;
      }

      playerRef.current = new (window as any).YT.Player("yt-player", {
        videoId: trailerKey,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: trailerKey,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            const videoDuration = event.target.getDuration();
            setDuration(videoDuration);
            if (!isMuted) {
                event.target.unMute();
            }
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              setIsVideoReady(true);
              if (!duration && playerRef.current) {
                setDuration(playerRef.current.getDuration());
              }
            }
          },
        },
      });
    };

    if ((window as any).YT?.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [trailerKey, isLargeScreen]);

  return { playerRef, isVideoReady, duration };
};