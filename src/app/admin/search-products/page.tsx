"use client";
import React, { useState } from "react";
import AdminProtected from "../../hooks/adminProtected";
import Heading from "../../utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSideBar";
import DashboardHero from "../../components/Admin/DashboardHero";
import SearchProducts from "../../components/Admin/Products/SearchProducts";

const Page = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <AdminProtected>
      <Heading
        title="Ecommerce Products Admin Page"
        description="The Products Admin page for the website"
        keywords="Admin, Shop, Ecommerce, Products"
      />
      <div className="flex h-fit">
        <div className={isCollapsed ? "w-16" : "1500px:w-[16%] w-1/5"}>
          <AdminSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
        <div className="w-[85%]">
          <DashboardHero isDashboard={false} />
          <SearchProducts />
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
