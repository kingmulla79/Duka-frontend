/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useEffect, useState } from "react";
import {
  useGetAllProductsQuery,
  useProductAbstractFilterQuery,
} from "../../../../redux/features/products/productsAPI";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Image from "next/image";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import { useSelector } from "react-redux";
// import dynamic from "next/dynamic";

type Props = {
  pattern?: string;
  selectedCategory?: string;
  selectedRatings?: any;
  nameFilter?: string;
  setNameFilter?: (route: string) => void;
};

// const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false });

const ProductView: FC<Props> = ({
  pattern,
  selectedCategory,
  selectedRatings,
  nameFilter,
  setNameFilter,
}) => {
  const { data } = useGetAllProductsQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const { data: filter_data } = useProductAbstractFilterQuery(
    { column: "category_id", pattern },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );
  const [productData, setProductData] = useState([]);
  const { products } = useSelector((state: any) => state.products);

  const filter_data_array: [] = filter_data?.products;

  console.log(products);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter((product: any) => {
        return product.category_id === parseInt(selectedCategory);
      });
    } else if (selectedCategory == "") {
      setProductData(filtered);
    }
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product: any) => {
        return selectedRatings.includes(product.rating);
      });
    }
    if (nameFilter) {
      filtered = filtered.filter((product: any) => {
        return product.name.toLowerCase().includes(nameFilter.toLowerCase());
      });
    }
    setProductData(filtered);
    if (filter_data_array && !selectedCategory && pattern !== undefined) {
      setProductData(filter_data_array);
    }
  }, [
    filter_data_array,
    nameFilter,
    pattern,
    products,
    selectedCategory,
    selectedRatings,
  ]);

  return (
    <div className="min-h-screen pt-4 px-3">
      <div className="flex gap-3">
        {productData.length > 0 ? (
          <div className="flex-1">
            {productData &&
              productData.map((item: any) => (
                <Link href={`/products/view/${item.id}`} key={item.id}>
                  <Card sx={{ width: "full", marginY: "5px" }}>
                    <CardActionArea>
                      <Box sx={{ display: "flex" }}>
                        <Image
                          src={item.prod_url}
                          width={50}
                          height={50}
                          alt={`${item.name}`}
                          className="h-[150px] w-[150px] my-auto"
                          unoptimized
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardContent>
                            <p className="text-black dark:text-white font-Poppins text-[15px] lg:font-semibold lg:text-[18px]">
                              {item.name}
                            </p>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                              className="hidden lg:block pb-1"
                            >
                              {item.prod_desc}
                            </Typography>
                            <Rating
                              name="half-rating-read"
                              defaultValue={item.rating}
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                            <p className="text-black dark:text-white font-Poppins text-[12px] font-semibold">
                              Stock: {item.stock}
                            </p>
                          </CardContent>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Link>
              ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center h-screen">
            <span className="font-Poppins text-3xl text-black dark:text-white">
              {" "}
              No Item in the specified category
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;
