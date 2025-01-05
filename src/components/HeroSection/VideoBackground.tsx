import React, { useEffect, useRef } from 'react';
import video1 from '../../assets/video/video_1.mp4'; 

const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const playVideo = async () => {
        try {
          videoElement.src = video1; 
          videoElement.load();
          await videoElement.play();
        } catch (error) {
          console.error('Error playing video:', error);
        }
      };

      playVideo();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
        filter: 'brightness(30%)',
      }}
    />
  );
};

export default VideoBackground;
