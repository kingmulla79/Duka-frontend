"use client";
import React from "react";
import AdminProtected from "../hooks/adminProtected";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSideBar";

const page = () => {
  return (
    <AdminProtected>
      <Heading
        title="Ecommerce Admin Page"
        description="The Admin page for the website"
        keywords="Admin, Shop, Ecommerce"
      />
      <div className="flex h-[200vh]">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
      </div>
    </AdminProtected>
  );
};

export default page;
