"use client";
import React, { useState } from "react";
import AdminProtected from "../hooks/adminProtected";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSideBar";
import DashboardHero from "../components/Admin/DashboardHero";
import { useGetProductCategoriesQuery } from "../../../redux/features/products/productsAPI";

const Page = () => {
  const {} = useGetProductCategoriesQuery(undefined);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AdminProtected>
      <Heading
        title="Duka Admin Page"
        description="The Admin page for the website"
        keywords="Admin, Shop, Duka"
      />
      <div className="flex min-h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
        <div className="w-[85%]">
          <DashboardHero isDashboard={true} />
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
