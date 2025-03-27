/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from "react";
import { useGetProductCategoriesQuery } from "../../../../redux/features/products/productsAPI";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { categorySelect } from "../../../../redux/features/products/productsSlice";
import Skeleton from "@mui/material/Skeleton";

const Categories = () => {
  const { data, isLoading } = useGetProductCategoriesQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useDispatch();

  const category_data: [] = data?.product_categories;

  const sliced_array = category_data?.slice(0, 5);

  return (
    <div className="pt-6 w-full">
      <h2 className="text-[25px] font-Poppins text-center py-5 font-extrabold text-black dark:text-white">
        Popular Categories
      </h2>
      <div className="flex justify-between md:justify-around">
        {isLoading && <Skeleton variant="circular" width={40} height={40} />}
        {sliced_array &&
          sliced_array.map((item: any) => (
            <Link
              href={"/products"}
              key={item.category_id}
              onClick={() => dispatch(categorySelect(item.category_id))}
            >
              <div className="w-full px-3 overflow-hidden justify-items-center">
                <Image
                  src={item.category_url}
                  alt=""
                  width={120}
                  height={120}
                  className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] object-cover cursor-pointer border-[3px] rounded-full"
                />
                <div className="text-[10px] md:text-[14px] font-Poppins text-center">
                  {item.category_name}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Categories;
