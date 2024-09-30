import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"; // Import video.js styles

const VideoPlayer = ({ options }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Make sure the video ref is assigned and exists in the DOM
    if (!videoRef.current) {
      return;
    }

    // Initialize video.js player
    playerRef.current = videojs(videoRef.current, options, () => {
      console.log("Player is ready");
    });

    return () => {
      // Dispose of the video.js player instance when the component unmounts
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [options]);

  return (
    <div data-vjs-player>
      {/* Correctly use ref to access the DOM element */}
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        controls
        preload="auto"
      />
    </div>
  );
};

export default VideoPlayer;
