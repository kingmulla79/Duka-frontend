/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from "react";
import {
  useGetAllProductsQuery,
  useGetProductCategoriesQuery,
} from "../../../../redux/features/products/productsAPI";
import Image from "next/image";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { Rating } from "@mui/material";

const Categories = () => {
  const { data } = useGetAllProductsQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const product_data: Array<any> = data?.products;

  const sliced_array = product_data?.slice(0, 5);

  return (
    <div className="py-12 w-full">
      <h2 className="text-[25px] text-center font-Poppins pl-5 py-3 font-extrabold text-black dark:text-white">
        Product Showcase
      </h2>
      <div className="flex flex-col 1000px:flex 1000px:flex-row justify-between px-5 md:px-10 items-center">
        {sliced_array &&
          sliced_array.map((item: any) => (
            <Link href={`/products/${item.search_name}`} key={item.id}>
              <Card
                //   sx={{ maxWidth: 345, width: 200 }}
                className="w-[400px] 1000px:w-[200px] my-3"
              >
                <CardActionArea className="justify-items-center">
                  <Image
                    src={item.prod_url}
                    width={50}
                    height={50}
                    alt={`${item.name}`}
                    className="h-[150px] w-[150px] my-auto mt-2"
                    unoptimized
                  />
                  <CardContent>
                    <p className="text-black dark:text-white font-Poppins text-[15px] lg:font-semibold lg:text-[18px]">
                      {item.search_name}
                    </p>

                    <Rating
                      name="half-rating-read"
                      defaultValue={item.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}

        {/* {sliced_array &&
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
          ))} */}
      </div>
    </div>
  );
};

export default Categories;
