"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Homepage from "./components/Home/Homepage";

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem] = useState(0);

  return (
    <div>
      <Heading
        title="Ecommerce Homepage"
        description="Ecommerce homepage"
        keywords="Shop, home"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Homepage />
    </div>
  );
};

export default Page;
