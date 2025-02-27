"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import ProductView from "../components/products/ProductView";

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem] = useState(0);

  return (
    <div>
      <Heading
        title="Ecommerce Products Page"
        description="Ecommerce product display page"
        keywords="Shop, products"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <ProductView />
    </div>
  );
};

export default Page;
