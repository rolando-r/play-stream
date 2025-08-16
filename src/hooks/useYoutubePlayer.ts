import { useEffect, useRef, useState } from "react";

export const useYouTubePlayer = (trailerKey: string | null, isLargeScreen: boolean) => {
  const playerRef = useRef<any>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (trailerKey && isLargeScreen) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      (window as any).onYouTubeIframeAPIReady = () => {
        playerRef.current = new (window as any).YT.Player("yt-player", {
          videoId: trailerKey,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: trailerKey,
            controls: 0,
            modestbranding: 1,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event: any) => event.target.playVideo(),
            onStateChange: (event: any) => {
              if (event.data === (window as any).YT.PlayerState.PLAYING)
                setIsVideoReady(true);
            },
          },
        });
      };
    }
  }, [trailerKey, isLargeScreen]);

  return { playerRef, isVideoReady };
};
