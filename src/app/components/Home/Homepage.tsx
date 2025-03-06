import React from "react";
import Hero from "./Hero";
import SearchPanel from "./SearchPanel";
import Categories from "./Categories";
import FAQComponent from "../FAQ/FAQComponent";
import Footer from "../Footer";
import Showcase from "./Showcase";

const Homepage = () => {
  return (
    <div className="min-h-[300vh] pt-5">
      <SearchPanel />
      <Hero />
      <Categories />
      <Showcase />
      <FAQComponent homepage={true} />
      <Footer />
    </div>
  );
};

export default Homepage;
