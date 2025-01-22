/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetProductCategoriesQuery,
  useUpdateProductMutation,
} from "../../../../../redux/features/products/productsAPI";
import EditProducts from "./EditProducts";
import { Box, Button, IconButton, Modal } from "@mui/material";
import { useTheme } from "next-themes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { useSelector } from "react-redux";
import Image from "next/image";

const SearchProducts = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [categoryID, setCategoryID] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState<number | null>(2);
  const [stock, setStock] = useState("");

  const [productId, setProductId] = useState("");
  const { categories } = useSelector((state: any) => state.products);
  const { data, isLoading, refetch } = useGetAllProductsQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const {} = useGetProductCategoriesQuery(undefined);
  const [deleteProduct, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteProductMutation();
  const [updateProduct, { isSuccess: updateSuccess, error: updateError }] =
    useUpdateProductMutation();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "prod_url",
      headerName: "Image",
      flex: 0.4,
      headerClassName: "MuiDataGrid-columnHeaders",
      renderCell: (params) => (
        <Image
          alt="product picture"
          width={30}
          height={30}
          className="w-[30px] h-[30px] mt-3 rounded-full hover:cursor-pointer"
          src={params.value}
          onClick={() => {
            setImageURL(params.row.prod_url);
            setImageOpen(!editOpen);
            setProductName(params.row.name);
          }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.6,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "category_name",
      headerName: "Category",
      flex: 0.5,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "category_id",
      headerName: "Cat ID",
      flex: 0.3,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.4,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "prod_desc",
      headerName: "Description",
      flex: 1,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.4,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.3,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "timestamp",
      headerName: "Created At",
      flex: 0.5,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.3,
      headerClassName: "MuiDataGrid-columnHeaders",
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              onClick={() => {
                setImageURL(params.row.prod_url);
                setProductName(params.row.name);
                setProductDesc(params.row.prod_desc);
                setPrice(params.row.price);
                setStock(params.row.stock);
                setRating(params.row.rating);
                setProductId(params.row.id);
                setCategoryID(params.row.category_id);
                setEditOpen(!editOpen);
              }}
            >
              <EditIcon className="text-2xl cursor-pointer dark:text-white text-black" />
            </IconButton>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.3,
      headerClassName: "MuiDataGrid-columnHeaders",
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              onClick={() => {
                setOpen(!open);
                setProductId(params.row.id);
              }}
            >
              <DeleteIcon className="text-2xl cursor-pointer dark:text-white text-black" />
            </IconButton>
          </>
        );
      },
    },
  ];
  const FindCategory = (id: number) => {
    let category_data = categories.filter(
      (item: any) => item.category_id === id
    );
    return category_data[0].category_name;
  };

  let rows: any[] = [];
  const product_data = data?.products;

  {
    product_data &&
      product_data.forEach((item: any) => {
        rows.push({
          id: item.id,
          name: item.name,
          category_name: FindCategory(item.category_id),
          category_id: item.category_id,
          price: item.price,
          prod_desc: item.prod_desc,
          rating: item.rating,
          stock: item.stock,
          timestamp: format(item.timestamp),
          prod_url: item.prod_url,
        });
      });
  }

  const handleDelete = () => {
    deleteProduct(productId);
    setOpen(!open);
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Data successfully deleted");
      refetch();
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData?.data?.message);
      }
    }
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
  }, [
    deleteError,
    deleteSuccess,
    editOpen,
    refetch,
    updateError,
    updateSuccess,
  ]);
  return (
    <div className="mt-[50px] min-h-screen">
      <>
        {!editOpen ? (
          <>
            <h2 className="dark:text-white text-[#000000c7] justify-center">
              <span className="flex w-full text-[60px] font-[500] font-Josefin justify-center">
                Product Data
              </span>
            </h2>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="flex flex-col">
                <Box m="20px">
                  <Box
                    m="40px 0 0 0"
                    height="80vh"
                    sx={{
                      "& .MuiDataGrid-root": {
                        border: "none",
                        outline: "none",
                      },
                      "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                        color: theme === "dark" ? "#fff" : "#000",
                      },
                      "& .MuiDataGrid-sortIcon": {
                        color: theme === "dark" ? "#fff" : "#000",
                      },
                      "& .MuiDataGrid-row": {
                        color: theme === "dark" ? "#fff" : "#000",
                        borderBottom:
                          theme === "dark"
                            ? "1px solid #ffffff30!important"
                            : "1px solid #ccc!important",
                      },
                      "& .MuiTablePagination-root": {
                        color: theme === "dark" ? "#fff" : "#000",
                      },
                      "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                      },

                      "& .name-column--cell": {
                        color: theme == "dark" ? "#fff" : "#000",
                      },

                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor:
                          theme === "dark" ? "#3e4396" : "#A4A9FC",
                        borderBottom: "none",
                        color: theme === "dark" ? "#fff" : "#000",
                      },

                      "& .MuiDataGrid-virtualScroller": {
                        backgroundColor:
                          theme === "dark" ? "#1F2A40" : "#F2F0F0",
                      },

                      "& .MuiDataGrid-footerContainer": {
                        color: theme === "dark" ? "#fff" : "#000",
                        borderTop: "none",
                        backgroundColor:
                          theme == "dark" ? "#3e4396" : "#A4A9FC",
                      },

                      "& .MuiCheckbox-root": {
                        color:
                          theme === "dark"
                            ? `#b7ebde !important`
                            : `#000 !important`,
                      },

                      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `#fff !important`,
                      },
                    }}
                  >
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      slots={{ toolbar: GridToolbar }}
                    />
                  </Box>

                  {open && (
                    <Modal
                      open={open}
                      onClose={() => setOpen(!open)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                        <h1 className={`${styles.title}`}>
                          Are you sure you want to delete this paper?
                        </h1>
                        <div className="flex w-full items-center justify-around mb-6">
                          <Button
                            variant="contained"
                            onClick={() => setOpen(!open)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleDelete}
                            color="error"
                          >
                            Delete
                          </Button>
                        </div>
                      </Box>
                    </Modal>
                  )}
                  {imageOpen && (
                    <Modal
                      open={imageOpen}
                      onClose={() => setImageOpen(!imageOpen)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="absolute top-[50%] left-[50%] justify-items-center -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                        <div className="flex flex-col justify-items-center my-10">
                          <div className="flex justify-center mb-4">
                            <Image
                              alt="profile-user"
                              width={150}
                              height={150}
                              src={imageURL}
                              className="w-[150px] h-[150px] cursor-pointer border-[3px] border-[#5b6fe6] rounded-full"
                            />
                          </div>

                          <div className="font-Poppins text-black dark:text-white font-bold">
                            {productName}
                          </div>
                        </div>
                      </Box>
                    </Modal>
                  )}
                </Box>
              </div>
            )}
          </>
        ) : (
          <EditProducts
            editOpen={editOpen}
            imageURL={imageURL}
            productDesc={productDesc}
            price={price}
            productId={productId}
            productName={productName}
            stock={stock}
            rating={rating}
            categoryID={categoryID}
            setImageURL={setImageURL}
            setCategoryID={setCategoryID}
            setPrice={setPrice}
            setProductDesc={setProductDesc}
            setProductName={setProductName}
            setRating={setRating}
            setStock={setStock}
            setEditOpen={setEditOpen}
            refetch={refetch}
          />
        )}
      </>
    </div>
  );
};

export default SearchProducts;

// {
//   editOpen && (
//     <Dialog open={editOpen} onClose={() => setEditOpen(!editOpen)} fullWidth>
//       <div className="w-full flex justify-center bg-white dark:bg-slate-900">
//         <form onSubmit={handleUpdateSubmit} className="w-[65%]">
//           <h2 className="text-black dark:text-white font-Poppins font-bold text-3xl mb-6">
//             Update Product Details
//           </h2>
//           <div className="text-black dark:text-white w-full">
//             <TextField
//               id="product-name"
//               label="Product name"
//               multiline
//               rows={3}
//               placeholder="Enter the product name"
//               variant="filled"
//               value={productName}
//               defaultValue={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               fullWidth
//             />
//           </div>
//           <div className="text-black dark:text-white w-full my-4">
//             <TextField
//               id="price"
//               label="Product price"
//               variant="filled"
//               placeholder="Enter the product price"
//               defaultValue={price}
//               fullWidth
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </div>
//           <div className="text-black dark:text-white w-full my-4">
//             <TextField
//               id="product-description"
//               label="Product description"
//               multiline
//               rows={3}
//               placeholder="Enter the product description"
//               variant="filled"
//               value={productDesc}
//               onChange={(e) => setProductDesc(e.target.value)}
//               fullWidth
//             />
//           </div>
//           <div className="text-black dark:text-white w-full my-4">
//             <TextField
//               id="price"
//               label="Product Stock Quantity"
//               variant="filled"
//               placeholder="Enter the product stock quantity"
//               fullWidth
//               defaultValue={stock}
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//             />
//           </div>
//           <div className="text-black dark:text-white w-full my-4">
//             <InputLabel id="product-category">Product Category</InputLabel>
//             <select
//               value={categoryID}
//               onChange={(e) => setCategoryID(e.target.value)}
//               defaultValue={categoryID}
//               className="font-Poppins text-black dark:text-white text-1xl w-full bg-[#e7e7e7] dark:bg-[#475569] py-2 pl-2 mt-1 rounded font-bold"
//             >
//               <option disabled={true} value="">
//                 --Choose a Product Category--
//               </option>
//               {categories &&
//                 categories.map((category: any) => (
//                   <option
//                     key={category.category_id}
//                     value={category.category_id}
//                   >
//                     {category.category_name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <div className="text-black dark:text-white w-full my-4 justify-items-center">
//             <Typography
//               component="legend"
//               fontWeight="bold"
//               fontFamily="Poppins"
//               align="center"
//             >
//               Product Rating
//             </Typography>
//             <Rating
//               name="half-rating"
//               precision={0.5}
//               value={rating}
//               onChange={(event, newValue) => {
//                 setRating(newValue);
//               }}
//             />
//           </div>
//           <div className="mb-5">
//             <input
//               type="file"
//               name=""
//               id="paperImage"
//               className="hidden" //to display camera icon
//               onChange={imageHandler}
//               accept="image/png,image/jpg,image/jpeg,image/webp"
//             />
//             <label
//               htmlFor="paperImage"
//               className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
//                 dragging ? "bg-blue-500" : "bg-transparent"
//               }`}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//             >
//               {imageURL ? (
//                 <Image
//                   src={imageURL}
//                   alt=""
//                   className="max-h-full w-full object-cover"
//                   width={100}
//                   height={100}
//                 />
//               ) : (
//                 <span className="text-black dark:text-white cursor-pointer">
//                   Drag and Drop the Past Paper to Upload or Click to Browse
//                 </span>
//               )}
//             </label>
//             <div className="flex justify-center mt-6 mb-10 w-full">
//               <Button
//                 variant="contained"
//                 startIcon={<UpdateIcon />}
//                 onClick={handleUpdateSubmit}
//               >
//                 Update Product details
//               </Button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </Dialog>
//   );
// }
