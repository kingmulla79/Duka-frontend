/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC } from "react";
import { useGetProductsByIdQuery } from "../../../../redux/features/products/productsAPI";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../redux/features/products/productsSlice";

type Props = { product_id: string };

const ProductIndividualView: FC<Props> = ({ product_id }) => {
  const dispatch = useDispatch();
  const { data } = useGetProductsByIdQuery(product_id, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const product_data = data?.product;

  return (
    <div className="min-h-screen py-4 px-3">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-[40%]">
          {product_data && (
            <Image
              src={product_data.prod_url}
              width={50}
              height={50}
              alt={`${product_data.name}`}
              className="w-full object-cover my-auto"
              unoptimized
            />
          )}
        </div>
        <div className="flex-1">
          {product_data && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <p className="text-black dark:text-white font-Poppins font-semibold text-[18px] md:text-[25px] pb-8">
                {product_data.name}
              </p>
              <p className="text-gray-800 dark:text-white py-4 font-Poppins text-[15px] md:text-[18px]">
                {product_data.prod_desc}
              </p>
              <Rating
                name="half-rating-read"
                defaultValue={product_data.rating}
                precision={0.5}
                readOnly
              />
              <p className="text-black dark:text-white font-Poppins py-4 text-[15px] md:text-[18px] font-semibold">
                Stock: {product_data.stock}
              </p>
              <div className="flex my-2 justify-center">
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  className="w-fit"
                  onClick={() => {
                    dispatch(addItem(product_data));
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductIndividualView;
