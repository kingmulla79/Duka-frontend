/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNewProductMutation } from "../../../../../redux/features/products/productsAPI";
import toast from "react-hot-toast";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import UpdateIcon from "@mui/icons-material/Update";

import { useGetProductCategoriesQuery } from "../../../../../redux/features/products/productsAPI";
import Loader from "../../Loader/Loader";

const AddProducts = () => {
  const [dragging, setDragging] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState<number | null>(2);
  const [stock, setStock] = useState("");
  const [productPhoto, setProductPhoto] = useState("");
  const categories: any = [];

  const { data } = useGetProductCategoriesQuery({});
  const [newProducts, { isSuccess, isLoading, error }] =
    useNewProductMutation();

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const productImage = fileReader.result as string;
        setProductPhoto(productImage);
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
        setProductPhoto(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const data = {
      name,
      category_id: categoryID,
      price,
      prod_desc: desc,
      rating,
      stock,
      prod_photo: productPhoto,
    };
    console.log(data);
    await newProducts(data);
  };

  data &&
    data.product_categories.map((category: any) => categories.push(category));

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setPrice("");
      setCategoryID("");
      setDesc("");
      setRating(2);
      setStock("");
      setProductPhoto("");
      toast.success("Product successfully added");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [error, isSuccess]);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center mt-16">
          <form onSubmit={handleSubmit} className="w-[65%]">
            <h2 className="text-black dark:text-white font-Poppins font-bold text-3xl mb-6">
              Product form
            </h2>
            <div className="text-black dark:text-white w-full">
              <TextField
                id="product-name"
                label="Product name"
                multiline
                rows={3}
                placeholder="Enter the product name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
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
                defaultValue={2.5}
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
                {productPhoto ? (
                  <Image
                    src={productPhoto}
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
              <div className=" justify-center justify-items-center my-3 w-full">
                <Button
                  variant="contained"
                  startIcon={<UpdateIcon />}
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
