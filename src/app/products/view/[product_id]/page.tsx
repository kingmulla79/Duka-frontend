"use client";
import React, { useState, use } from "react";
import Heading from "../../../utils/Heading";
import Header from "../../../components/Header";
import ProductIndividualView from "@/app/components/products/ProductIndividualView";
import Footer from "../../../../app/components/Footer";
import { useGetAllUsersInfoQuery } from "../../../../../redux/features/auth/authAPI";

const Page = ({ params }: { params: Promise<{ product_id: string }> }) => {
  const { product_id } = use(params);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem] = useState(0);
  const {} = useGetAllUsersInfoQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  return (
    <div>
      <Heading
        title="Duka Products Search Page"
        description="Duka product search results display page"
        keywords="Shop, products, personalized search"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <ProductIndividualView product_id={product_id} />
      <Footer />
    </div>
  );
};

export default Page;
