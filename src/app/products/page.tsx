/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import ProductView from "../components/products/ProductView";
import { useSelector } from "react-redux";
import Layout from "../components/products/Layout";

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem] = useState(0);
  const { category_id } = useSelector((state: any) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(
    category_id ? category_id : ""
  );
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [nameFilter, setNameFilter] = useState("");

  return (
    <div>
      <Heading
        title="Duka Products Page"
        description="Duka product display page"
        keywords="Shop, products"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      {/* <ProductView /> */}
      <Layout
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
      >
        {category_id ? (
          <ProductView
            pattern={category_id}
            selectedCategory={selectedCategory}
            selectedRatings={selectedRatings}
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
          />
        ) : (
          <ProductView
            selectedCategory={selectedCategory}
            selectedRatings={selectedRatings}
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
          />
        )}
      </Layout>
    </div>
  );
};

export default Page;
