/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useAdminOrdersQuery } from "../../../../../redux/features/orders/orderAPI";

const Orders = () => {
  const { theme, setTheme } = useTheme();
  const { data, isLoading, isSuccess } = useAdminOrdersQuery({});

  const columns: GridColDef[] = [
    {
      field: "id",
      headerClassName: "MuiDataGrid-columnHeaders",
      headerName: "ID",
      flex: 0.1,
    },
    {
      field: "user_id",
      headerClassName: "MuiDataGrid-columnHeaders",
      headerName: "User ID",
      flex: 0.4,
    },
    {
      field: "total_order_price",
      headerClassName: "MuiDataGrid-columnHeaders",
      headerName: "Order Cost",
      flex: 0.7,
    },
    {
      field: "payment_service",
      headerClassName: "MuiDataGrid-columnHeaders",
      headerName: "Payment Service",
      flex: 0.8,
    },
    {
      field: "payment_method",
      headerClassName: "MuiDataGrid-columnHeaders",
      headerName: "Payment method",
      flex: 1,
    },
    {
      field: "order_status",
      headerClassName: "MuiDataGrid-columnHeaders",
      headerName: "Status",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerClassName: "MuiDataGrid-columnHeaders",
      headerName: "Created At",
      flex: 1.3,
    },
  ];
  let rows: any[] = [];
  const userOrders = data?.orders;

  {
    userOrders &&
      userOrders.forEach((item: any) => {
        let createdAt = new Date(item.timestamp);
        rows.push({
          id: item.id,
          order_status: item.order_status,
          user_id: item.user_id,
          total_order_price: item.total_order_price,
          payment_service: item.payment_info.service,
          payment_method: item.payment_info.payment_method,
          created_at: createdAt.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      });
  }
  return (
    <div className="mt-[50px] min-h-screen">
      <h2 className="dark:text-white text-[#000000c7] justify-center">
        <span className="flex w-full text-[60px] font-[500] font-Josefin justify-center">
          Order Data
        </span>
      </h2>
      <Box
        m="20px"
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
            color: theme === "dark" ? "#fff" : "#000",
          },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
            borderBottom: "none",
            color: theme === "dark" ? "#fff" : "#000",
          },

          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
          },

          "& .MuiDataGrid-footerContainer": {
            color: theme === "dark" ? "#fff" : "#000",
            borderTop: "none",
            backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
          },

          "& .MuiCheckbox-root": {
            color: theme === "dark" ? `#b7ebde !important` : `#000 !important`,
          },

          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: theme === "dark" ? `#fff` : `#000`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </div>
  );
};

export default Orders;
