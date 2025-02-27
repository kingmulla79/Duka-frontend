import React from "react";
import Carousel from "../../../app/utils/Carousel";
import { BannerImages } from "./images";

const Hero = () => {
  return (
    <div className="min-h-screen w-[95%] mx-auto">
      <Carousel slides={BannerImages}></Carousel>
    </div>
  );
};

export default Hero;
