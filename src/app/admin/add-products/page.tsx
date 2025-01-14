"use client";
import React from "react";
import AdminProtected from "../../hooks/adminProtected";
import Heading from "../../utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSideBar";
import DashboardHero from "../../components/Admin/DashboardHero";
import AddProducts from "../../components/Admin/Products/AddProducts";

const page = () => {
  return (
    <AdminProtected>
      <Heading
        title="Ecommerce Products Admin Page"
        description="The Products Admin page for the website"
        keywords="Admin, Shop, Ecommerce, Products"
      />
      <div className="flex h-[200vh]">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero isDashboard={true} />
          <AddProducts />
        </div>
      </div>
    </AdminProtected>
  );
};

export default page;
