"use client";
import React, { useState, use } from "react";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";
import ProductSearchGrid from "../../components/products/ProductSearchGrid";

const Page = ({ params }: { params: Promise<{ searchValue: string }> }) => {
  const { searchValue } = use(params);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem] = useState(0);

  return (
    <div>
      <Heading
        title="Duka Products Search Page"
        description="Duka product search results display page"
        keywords="Shop, products, personalized search"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <ProductSearchGrid searchValue={searchValue.replace(/%20/g, " ")} />
    </div>
  );
};

export default Page;
