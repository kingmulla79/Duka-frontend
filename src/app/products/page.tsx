/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import ProductView from "../components/products/ProductView";
import { useSelector } from "react-redux";

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem] = useState(0);
  const { category_id } = useSelector((state: any) => state.products);

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
      {/* <ProductView /> */}
      {category_id ? <ProductView pattern={category_id} /> : <ProductView />}
    </div>
  );
};

export default Page;
