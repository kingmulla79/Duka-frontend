/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import { useSelector } from "react-redux";

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Heading
        title="Ecommerce Homepage"
        description="E-commerce homepage"
        keywords="Shop, home"
      />
      <Header open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
      {user && <h1>Hello {user.username}</h1>}
    </div>
  );
};

export default Page;
