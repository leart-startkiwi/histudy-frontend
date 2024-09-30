import { useEffect, useState } from "react";

const useVideoData = ({ url, type }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (!url || type !== "video") {
      return;
    }

    const generateThumbnail = async () => {
      const video = document.createElement("video");
      video.src = url;
      video.crossOrigin = "anonymous";

      return new Promise((resolve, reject) => {
        video.addEventListener("loadeddata", () => {
          const formattedDuration = formatDuration(video.duration);
          setDuration(formattedDuration);
          video.currentTime = 1;
        });

        video.addEventListener("seeked", () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imgUrl = canvas.toDataURL("image/png");
          resolve(imgUrl);
        });

        video.addEventListener("error", (e) => {
          reject(e);
        });
      });
    };

    generateThumbnail()
      .then((imgUrl) => {
        setThumbnail(imgUrl);
      })
      .catch((error) => {
        console.error("Error generating thumbnail:", error);
      });
  }, [url, type]); // Depend on `url` and `type`

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return { thumbnail, duration };
};

export default useVideoData;
