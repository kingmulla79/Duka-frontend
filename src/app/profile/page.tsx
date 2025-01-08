/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Protected from "../hooks/useProtected";
import Footer from "../components/Footer";

const page: FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeItem, setactiveItem] = useState(5);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [route, setRoute] = useState("Login");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useSelector((state: any) => state.auth);

  return (
    <Protected>
      <Heading
        title={`${user.username} profile - Ecommerce`}
        description="Ecommerce profile page for users"
        keywords="Profile, Ecommerce Profile"
      />
      <div className="min-h-screen">
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
        <Footer />
      </div>
    </Protected>
  );
};

export default page;
