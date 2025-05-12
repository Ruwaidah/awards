import { useState } from "react";

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [nextVideoIndex, setNextVideoIndex] = useState(2);
  const [previousVideoIndex, setPreviousVideoIndex] = useState(4);
  const totalVideos = 4;

  const getNextVideoIndex = () => {
    setPreviousVideoIndex(currentVideoIndex);
    setCurrentVideoIndex((currentVideoIndex % totalVideos) + 1);
    setNextVideoIndex(((currentVideoIndex + 1) % totalVideos) + 1);
  };
  console.log(currentVideoIndex, nextVideoIndex);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg ">
            <div className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:opacity-100">
              <video
                loop
                muted
                className="size-64 origin-center scale-150"
                src={`videos/hero-${currentVideoIndex}.mp4`}
                onClick={() => getNextVideoIndex(currentVideoIndex)}
              />
            </div>
          </div>
          <video
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            src={`videos/hero-${nextVideoIndex}.mp4`}
          />
          <video
            src={`videos/hero-${previousVideoIndex}.mp4`}
            autoPlay
            muted
            loop
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
