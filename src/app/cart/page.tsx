/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Cart from "../components/products/Cart";

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem] = useState(0);

  return (
    <div>
      <Heading
        title="Duka Cart Page"
        description="Duka cart display page"
        keywords="Shop, products, cart, checkout"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Cart />
    </div>
  );
};

export default Page;
