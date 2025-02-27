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
        title="Ecommerce Products Search Page"
        description="Ecommerce product search results display page"
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

// import React from "react";

// const Page = async ({ params }: { params: { searchValue: string } }) => {
//   const { searchValue } = await params;
//   return <div>page {searchValue.replace(/%20/g, " ")}</div>;
// };

// export default Page;
