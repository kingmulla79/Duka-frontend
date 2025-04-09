/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useEffect, useState } from "react";
import { useGetProductsByIdQuery } from "../../../../redux/features/products/productsAPI";
import Image from "next/image";
import { Box, Button, TextField, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../../redux/features/products/productsSlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import avatar from "../../../../public/assets/avatar.jpg";
import {
  useFetchProductCommentsQuery,
  useNewCommentMutation,
} from "../../../../redux/features/comments/commentsAPI";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import toast from "react-hot-toast";

type Props = { product_id: string };

const ProductIndividualView: FC<Props> = ({ product_id }) => {
  const dispatch = useDispatch();
  const { data, refetch: productRefetch } = useGetProductsByIdQuery(
    product_id,
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: commentData, refetch } = useFetchProductCommentsQuery(
    product_id,
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );
  const [newComment, { isSuccess, error }] = useNewCommentMutation();
  const { user } = useSelector((state: any) => state.auth);
  const { userList } = useSelector((state: any) => state.auth);
  const [value, setValue] = React.useState(0);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(2);
  const [userCommented, setUserCommented] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const product_data = data?.product;
  const comment_data = commentData?.comments;

  const PostNewComment = async () => {
    const data = {
      comments: comment,
      rating,
      product_id: product_data.id,
    };
    await newComment(data);
  };

  useEffect(() => {
    if (comment_data) {
      const user_comment = comment_data.find(
        (comment: any) => user.id === comment.user_id
      );

      if (user_comment) setUserCommented(true);
    }
    if (isSuccess) {
      toast.success("Comment posted. Thank you for your input");
      setComment("");
      setRating(0);
      refetch();
      productRefetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
        console.log(errorData?.data?.message);
      }
    }
  }, [comment_data, error, isSuccess, productRefetch, refetch, user]);

  return (
    <div className="min-h-screen py-4 px-3">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex items-center w-full md:w-[30%]">
          {product_data && (
            <Image
              src={product_data.prod_url}
              width={50}
              height={50}
              alt={`${product_data.name}`}
              className="w-[200px] h-[200px] object-contain mx-auto my-auto"
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
              <Rating
                name="half-rating-read"
                defaultValue={product_data.rating}
                precision={0.5}
                readOnly
              />
              <p className="text-black dark:text-white font-Poppins py-2 text-[15px] md:text-[18px] font-semibold">
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
      <Box sx={{ maxWidth: "100%", bgcolor: "transparent" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          centered
        >
          <Tab label="Product Description" />
          <Tab label="Comments" />
        </Tabs>
      </Box>
      {value === 0 && product_data && (
        <div className="mx-6 md:mx-10 text-black dark:text-white font-Poppins text-[15px] md:text-[18px]">
          <p className="text-gray-800 dark:text-white py-4 font-Poppins text-[15px] md:text-[18px]">
            {product_data.prod_desc}
          </p>
        </div>
      )}
      {value === 1 && (
        <div>
          {!userCommented && user && (
            <form onSubmit={PostNewComment}>
              <div className="flex text-black dark:text-white w-full my-4 justify-center items-center">
                <Image
                  src={user?.avatar_url ? user?.avatar_url : avatar}
                  alt="Profile pic"
                  width={30}
                  height={30}
                  className="w-[50px] h-[50px] rounded-full mx-5"
                />
                <TextField
                  id="price"
                  label="Type your comment about the product"
                  variant="filled"
                  placeholder="Enter your comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-[70%] md:w-[50%]"
                />
              </div>

              <div className="text-black dark:text-white w-full my-4 flex justify-around">
                <div>
                  <Typography
                    component="legend"
                    fontWeight="bold"
                    fontFamily="Poppins"
                    align="center"
                  >
                    Rate the Product
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
                <Button variant="contained" onClick={PostNewComment}>
                  Upload Product details
                </Button>
              </div>
            </form>
          )}

          {comment_data && userList ? (
            comment_data.map((comment: any) => {
              const userInfo = userList.find(
                (user: any) => user.id === comment.user_id
              );
              return (
                <div key={comment.comment_id}>
                  <List
                    sx={{
                      width: "100%",

                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem alignItems="flex-start">
                      <Image
                        src={
                          userInfo?.avatar_url ? userInfo?.avatar_url : avatar
                        }
                        alt="Profile pic"
                        width={50}
                        height={50}
                        className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full mx-2 md:mx-4"
                      />

                      <ListItemText
                        primary={`${userInfo.username}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: "text.primary", display: "inline" }}
                            >
                              <Rating
                                name="half-rating-read"
                                defaultValue={comment.rating}
                                precision={0.5}
                                readOnly
                              />
                            </Typography>
                            {
                              <span className="block font-Poppins text-black dark:text-white text-[12px] md:text-[14px]">
                                {comment.comments}
                              </span>
                            }
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
                </div>
              );
            })
          ) : (
            <div className="font-Poppins font-semibold text-[13px] md:text-[16px] text-center">
              No comments posted for this product
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductIndividualView;
