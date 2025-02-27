import React from "react";
import Hero from "./Hero";
import SearchPanel from "./SearchPanel";

const Homepage = () => {
  return (
    <div className="min-h-[300vh] pt-5">
      <SearchPanel />
      <Hero />
    </div>
  );
};

export default Homepage;
