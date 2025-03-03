/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from "react";
import { useGetProductCategoriesQuery } from "../../../../redux/features/products/productsAPI";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { categorySelect } from "../../../../redux/features/products/productsSlice";

const Categories = () => {
  const { data } = useGetProductCategoriesQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useDispatch();

  const category_data = data?.product_categories;

  return (
    <div className="pt-6 w-full">
      <h2 className="text-[25px] font-Poppins pl-5 py-5 font-extrabold text-black dark:text-white">
        Popular Categories
      </h2>
      <div className="flex">
        {category_data &&
          category_data.map((item: any) => (
            <Link
              href={"/products"}
              key={item.category_id}
              onClick={() => dispatch(categorySelect(item.category_id))}
            >
              <div className="w-full px-3 overflow-hidden justify-around justify-items-center">
                <Image
                  src={item.category_url}
                  alt=""
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px] object-cover cursor-pointer border-[3px] rounded-full"
                />
                <div className="text-[15px] font-Poppins text-center">
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
