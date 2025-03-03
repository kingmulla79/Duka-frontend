import React from "react";
import Hero from "./Hero";
import SearchPanel from "./SearchPanel";
import Categories from "./Categories";

const Homepage = () => {
  return (
    <div className="min-h-[300vh] pt-5">
      <SearchPanel />
      <Hero />
      <Categories />
    </div>
  );
};

export default Homepage;
