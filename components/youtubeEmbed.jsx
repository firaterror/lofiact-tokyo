"use client";

import { useEffect, useRef } from "react";

export default function YoutubeEmbed({ videoUrl }) {
  const iframeId = "youtube-player";

  useEffect(() => {
    if (!videoUrl) return;

    // Load iframe API if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      tag.onload = createPlayer;
    } else {
      createPlayer();
    }

    function createPlayer() {
      // Wait until YT API available
      if (!window.YT || typeof window.YT.Player !== "function") return;

      new window.YT.Player(iframeId, {
        events: {
          onReady: (event) => {
            event.target.setVolume(30); // 🔊 Set volume to 30%
          },
        },
      });
    }
  }, [videoUrl]);

  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full mb-8">
      {videoUrl && (
        <iframe
          id={iframeId}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          width="853"
          height="480"
          src={`${videoUrl}&enablejsapi=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      )}
    </div>
  );
}
