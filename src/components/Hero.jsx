import { useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [nextVideoIndex, setNextVideoIndex] = useState(2);
  const [previousVideoIndex, setPreviousVideoIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideo, setLoadedVideo] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const nextVideoRef = useRef(null);
  const totalVideos = 4;

  const getNextVideoIndex = () => {
    setHasClicked(true);
    setPreviousVideoIndex(currentVideoIndex);
    setCurrentVideoIndex((currentVideoIndex % totalVideos) + 1);
    setNextVideoIndex(((currentVideoIndex + 1) % totalVideos) + 1);
  };

  const handleVideoLoad = () => {
    setLoadedVideo((prev) => prev + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        console.log("yes clicked");
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          height: "100%",
          width: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentVideoIndex],
      revertOnUpdate: true,
    }
  );

  console.log(previousVideoIndex, currentVideoIndex, nextVideoIndex);
  // console.log((currentVideoIndex + 1) % totalVideos + 1);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path  absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div className="origin-center  scale-50 opacity-0 transition-all duration-500 ease-in hover:opacity-100 hover:scale-100 ">
              <video
                id="current-video"
                ref={nextVideoRef}
                loop
                muted
                className="size-64 origin-center scale-150"
                src={`videos/hero-${nextVideoIndex}.mp4`}
                onLoadedData={handleVideoLoad}
                onClick={() => getNextVideoIndex(currentVideoIndex)}
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            src={`videos/hero-${currentVideoIndex}.mp4`}
            onLoadedData={handleVideoLoad}
          />
          <video
            src={`videos/hero-${previousVideoIndex}.mp4`}
            onLoadedData={handleVideoLoad}
            autoPlay
            muted
            loop
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        <div className="absolute left-0 top-0  z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="absolute special-font hero-heading bottom-5 right-5 text-black">
        g<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
