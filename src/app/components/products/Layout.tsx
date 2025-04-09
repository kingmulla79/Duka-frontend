/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Layout.js
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import Loader from "../Loader/Loader";

// Lazy load Sidebar
const Sidebar = dynamic(() => import("./Sidebar"), {
  ssr: false,
  loading: () => <Loader />,
});

interface LayoutProps {
  children: ReactNode;
  selectedCategory: string;
  setSelectedCategory: (route: string) => void;
  selectedRatings: any;
  setSelectedRatings: (route: any) => void;
  nameFilter: string;
  setNameFilter: (route: string) => void;
}
const Layout = ({
  children,
  selectedCategory,
  setSelectedCategory,
  selectedRatings,
  setSelectedRatings,
  nameFilter,
  setNameFilter,
}: LayoutProps) => {
  return (
    <div className="flex gap-3">
      {/* Sidebar remains static */}
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
      />

      {/* Main Content updates based on sidebar selection */}
      <main className="flex-1">
        {/* Render the current page content */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
