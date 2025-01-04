import React, { useEffect, useRef, useMemo } from 'react';

const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentVideoIndex = useRef<number>(0);

  const videos = useMemo(() => [
    `${process.env.PUBLIC_URL}/assets/video/video_1.mp4`,
    `${process.env.PUBLIC_URL}/assets/video/video_2.mp4`,
    `${process.env.PUBLIC_URL}/assets/video/video_3.mp4`,
    `${process.env.PUBLIC_URL}/assets/video/video_4.mp4`,
  ], []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const playVideo = async () => {
        try {
          videoElement.src = videos[currentVideoIndex.current];
          videoElement.load();
          await videoElement.play();
        } catch (error) {
          console.error('Error playing video:', error);
        }
      };

      playVideo();

      const handleVideoEnd = () => {
        currentVideoIndex.current = (currentVideoIndex.current + 1) % videos.length;
        playVideo();
      };

      videoElement.addEventListener('ended', handleVideoEnd);

      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [videos]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop={false}
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
