import React from "react";

const HomeAnimation = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover opacity-60"
      >
        <source src="/assets/shoppingvideo.mp4" type="video/mp4"></source>
      </video>
      <div className="relative z-10 text-white text-center">
        <h1 className="text-4xl font-bold">
          Welcome to The Best Ecommerce MarketPlace
        </h1>
        <p className="text-lg mt-2">Experience hassle free shopping</p>
      </div>
    </div>
  );
};

export default HomeAnimation;
