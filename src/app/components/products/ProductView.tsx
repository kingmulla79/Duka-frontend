/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useGetAllProductsQuery } from "../../../../redux/features/products/productsAPI";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Image from "next/image";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";

const ProductView = () => {
  const { data } = useGetAllProductsQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const product_data: Array<any> = data?.products;

  console.log(data);

  return (
    <div className="min-h-screen pt-4 px-3">
      <div className="flex gap-3">
        <div className="hidden sm:block flex-none w-[200px] border-2  bg-red-700">
          Sidebar
        </div>
        <div className="flex-1">
          {product_data &&
            product_data.map((item) => (
              <Card sx={{ width: "full", marginY: "5px" }} key={item.id}>
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
