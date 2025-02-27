/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Image from "next/image";

export default function Carousel({
  autoSlide = true,
  autoSlideInterval = 8000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: any[];
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((img, i) => (
          <Image
            src={img}
            alt=""
            width={50}
            height={50}
            className="w-full h-full"
            quality={100}
            unoptimized
            key={i}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="px-[2px] pb-[2px] rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ArrowCircleLeftIcon className="size-10" />
        </button>
        <button
          onClick={next}
          className="px-[2px] pb-[2px] rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ArrowCircleRightIcon className="size-10" />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
