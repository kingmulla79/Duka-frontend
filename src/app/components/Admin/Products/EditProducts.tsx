/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC, useEffect, useState } from "react";
import {
  useGetProductCategoriesQuery,
  useUpdateProductMutation,
} from "../../../../../redux/features/products/productsAPI";
import {
  Button,
  InputLabel,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Image from "next/image";
import Loader from "../../Loader/Loader";

type Props = {
  editOpen: boolean;
  imageURL: string;
  productName: string;
  productDesc: string;
  price: string;
  stock: string;
  rating: any;
  productId: string;
  categoryID: string;
  setImageURL: (imageURL: string) => void;
  setProductName: (productName: string) => void;
  setProductDesc: (productDesc: string) => void;
  setPrice: (price: string) => void;
  setStock: (stock: string) => void;
  setRating: (rating: any) => void;
  setCategoryID: (categoryID: string) => void;
  setEditOpen: (editOpen: boolean) => void;
  refetch: any;
};

const Page: FC<Props> = ({
  editOpen,
  imageURL,
  productDesc,
  price,
  productId,
  productName,
  stock,
  rating,
  categoryID,
  setImageURL,
  setCategoryID,
  setPrice,
  setProductDesc,
  setProductName,
  setRating,
  setStock,
  setEditOpen,
  refetch,
}) => {
  const [dragging, setDragging] = useState(false);

  const { categories } = useSelector((state: any) => state.products);
  const { data, isLoading } = useGetProductCategoriesQuery({});
  const [updateProduct, { isSuccess: updateSuccess, error: updateError }] =
    useUpdateProductMutation();

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const productImage = fileReader.result as string;
        setImageURL(productImage);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageURL(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleUpdateSubmit = async () => {
    const data = {
      id: productId,
      name: productName,
      category_id: categoryID,
      price: price,
      prod_desc: productDesc,
      rating: rating,
      stock: stock,
      prod_photo: imageURL,
    };
    // console.log(data);
    await updateProduct(data);
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Data successfully updated");
      setEditOpen(!editOpen);
      refetch();
    }
    if (updateError) {
      if ("data" in updateError) {
        const errorData = updateError as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [editOpen, refetch, setEditOpen, updateError, updateSuccess]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center mt-16">
          <div className="w-full flex justify-center bg-white dark:bg-slate-900">
            <form onSubmit={handleUpdateSubmit} className="w-[65%]">
              <h2 className="text-black dark:text-white font-Poppins font-bold text-3xl mb-6">
                Update Product Details
              </h2>
              <div className="text-black dark:text-white w-full">
                <TextField
                  id="product-name"
                  label="Product name"
                  multiline
                  rows={3}
                  placeholder="Enter the product name"
                  variant="filled"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  fullWidth
                />
              </div>
              <div className="text-black dark:text-white w-full my-4">
                <TextField
                  id="price"
                  label="Product price"
                  variant="filled"
                  placeholder="Enter the product price"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="text-black dark:text-white w-full my-4">
                <TextField
                  id="product-description"
                  label="Product description"
                  multiline
                  rows={3}
                  placeholder="Enter the product description"
                  variant="filled"
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  fullWidth
                />
              </div>
              <div className="text-black dark:text-white w-full my-4">
                <TextField
                  id="price"
                  label="Product Stock Quantity"
                  variant="filled"
                  placeholder="Enter the product stock quantity"
                  fullWidth
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="text-black dark:text-white w-full my-4">
                <InputLabel id="product-category">Product Category</InputLabel>
                <select
                  value={categoryID}
                  onChange={(e) => setCategoryID(e.target.value)}
                  className="font-Poppins text-black dark:text-white text-1xl w-full bg-[#e7e7e7] dark:bg-[#475569] py-2 pl-2 mt-1 rounded font-bold"
                >
                  <option disabled={true} value="">
                    --Choose a Product Category--
                  </option>
                  {categories &&
                    categories.map((category: any) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="text-black dark:text-white w-full my-4 justify-items-center">
                <Typography
                  component="legend"
                  fontWeight="bold"
                  fontFamily="Poppins"
                  align="center"
                >
                  Product Rating
                </Typography>
                <Rating
                  name="half-rating"
                  precision={0.5}
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </div>
              <div className="mb-5">
                <input
                  type="file"
                  name=""
                  id="paperImage"
                  className="hidden" //to display camera icon
                  onChange={imageHandler}
                  accept="image/png,image/jpg,image/jpeg,image/webp"
                />
                <label
                  htmlFor="paperImage"
                  className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                    dragging ? "bg-blue-500" : "bg-transparent"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {imageURL ? (
                    <Image
                      src={imageURL}
                      alt=""
                      className="max-h-full w-full object-cover"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <span className="text-black dark:text-white cursor-pointer">
                      Drag and Drop the Past Paper to Upload or Click to Browse
                    </span>
                  )}
                </label>
                <div className="flex justify-around mt-6 mb-10 w-full">
                  <Button
                    variant="contained"
                    startIcon={<UpdateIcon />}
                    onClick={handleUpdateSubmit}
                  >
                    Update Product details
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => setEditOpen(!editOpen)}
                  >
                    Go back to data view
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
