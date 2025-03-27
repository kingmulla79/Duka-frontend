import React from "react";
import Carousel from "../../../app/utils/Carousel";
import { BannerImages } from "./images";

const Hero = () => {
  return (
    <div className="w-[85%] pt-12 mx-auto">
      <Carousel slides={BannerImages}></Carousel>
    </div>
  );
};

export default Hero;
