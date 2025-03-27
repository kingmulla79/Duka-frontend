import React from "react";
import Hero from "./Hero";
import SearchPanel from "./SearchPanel";
import HomeAnimation from "./HomeAnimation";
import Categories from "./Categories";
import FAQComponent from "../FAQ/FAQComponent";
import Footer from "../Footer";
import Showcase from "./Showcase";
import Display from "./Display";

const Homepage = () => {
  return (
    <div className="min-h-screen pt-5">
      <SearchPanel />
      <HomeAnimation />
      <Hero />
      <Categories />
      <Showcase />
      <Display />
      <FAQComponent homepage={true} />
      <Footer />
    </div>
  );
};

export default Homepage;
