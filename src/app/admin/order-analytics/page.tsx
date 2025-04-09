"use client";
import React, { useState } from "react";
import AdminProtected from "../../hooks/adminProtected";
import Heading from "../../utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSideBar";
import DashboardHero from "../../components/Admin/DashboardHero";
import OrderAnalytics from "../../../app/components/Admin/Analytics/OrdersAnalytics";

const Page = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <AdminProtected>
      <Heading
        title="Duka Products Admin Page"
        description="The Products Admin page for the website"
        keywords="Admin, Shop, Duka, Products"
      />
      <div className="flex h-full">
        <div className={isCollapsed ? "w-16" : "1500px:w-[16%] w-1/5"}>
          <AdminSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
        <div className="w-[85%]">
          <DashboardHero isDashboard={false} />
          <OrderAnalytics isDashboard={false} />
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
