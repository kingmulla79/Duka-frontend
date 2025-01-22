/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersInfoQuery,
  useUpdateUserRoleMutation,
} from "../../../../../redux/features/auth/authAPI";
import { AiOutlineDelete } from "react-icons/ai";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useTheme } from "next-themes";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import { format } from "timeago.js";
import Loader from "../../Loader/Loader";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { styles } from "@/app/styles/style";

type Props = {
  isAdmin: boolean;
};
const Users: FC<Props> = ({ isAdmin }) => {
  const { data, isLoading, refetch } = useGetAllUsersInfoQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const [updateUserRole, { isSuccess, error }] = useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deteleError }] =
    useDeleteUserMutation();

  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.2,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "avatar_url",
      headerName: "Profile Pic",
      flex: 0.3,
      headerClassName: "MuiDataGrid-columnHeaders",
      renderCell: (params: any) => (
        <Image
          alt="profile picture"
          width={30}
          height={30}
          className="w-[30px] h-[30px] mt-3 rounded-full hover:cursor-pointer"
          src={params.value}
        />
      ),
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.5,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.9,
      headerClassName: "MuiDataGrid-columnHeaders",
    },
    {
      field: "user_role",
      headerName: "Role",
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
      headerName: "Email",
      flex: 0.3,
      headerClassName: "MuiDataGrid-columnHeaders",
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <EmailIcon className="text-2xl cursor-pointer dark:text-white text-black" />
            </a>
          </>
        );
      },
    },
    {
      field: "",
      headerName: "Delete",
      flex: 0.3,
      headerClassName: "MuiDataGrid-columnHeaders",
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <DeleteIcon className="dark:text-white text-black" />
            </Button>
          </>
        );
      },
    },
  ];

  let rows: any[] = [];

  const user_data = data?.users;
  if (isAdmin) {
    const Admin_Data =
      data && data.users.filter((item: any) => item.user_role === "admin");

    Admin_Data &&
      Admin_Data.forEach((item: any) => {
        rows.push({
          id: item.id,
          username: item.username,
          email: item.email,
          user_role: item.user_role,
          avatar_url: item.avatar_url,
          timestamp: format(item.timestamp),
        });
      });
  } else {
    user_data &&
      user_data.forEach((item: any) => {
        rows.push({
          id: item.id,
          username: item.username,
          email: item.email,
          user_role: item.user_role,
          avatar_url: item.avatar_url,
          timestamp: format(item.timestamp),
        });
      });
  }

  const handleUpdateUserDetails = async () => {
    const data = {
      email,
      role,
    };
    await updateUserRole(data);
    setActive(!active);
  };
  const handleDelete = () => {
    deleteUser(userId);
    setOpen(!open);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Role updated");
      setEmail("");
      setRole("");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
    if (deleteSuccess) {
      toast.success("User deleted");
      setEmail("");
      setRole("");
      refetch();
    }
    if (deteleError) {
      if ("data" in deteleError) {
        const errorData = deteleError as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [
    active,
    deleteSuccess,
    deteleError,
    error,
    isSuccess,
    refetch,
    setActive,
  ]);

  return (
    <div className="mt-[50px] min-h-screen">
      <h2 className="dark:text-white text-[#000000c7] justify-center">
        {isAdmin ? (
          <span className="flex w-full text-[60px] font-[500] font-Josefin justify-center">
            Admin Data
          </span>
        ) : (
          <span className="flex w-full text-[60px] font-[500] font-Josefin justify-center">
            User Data
          </span>
        )}
      </h2>

      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <Button variant="contained" onClick={() => setActive(!active)}>
              Edit Role
            </Button>
          </div>

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
                backgroundColor: theme == "dark" ? "#3e4396" : "#A4A9FC",
              },

              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
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

          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <div className="mb-5">
                  <TextField
                    required
                    variant="outlined"
                    label="Enter User Email"
                    className="!w-full"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="" className={`${styles.label}`}>
                    Select role
                  </label>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    className={`${styles.input} dark:bg-slate-900 !h-min !py-2 border-2 border-stone-950 dark:border-neutral-50`}
                  >
                    <option disabled={true} value="">
                      --Choose a Role--
                    </option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <Button variant="contained" onClick={handleUpdateUserDetails}>
                    Update Details
                  </Button>
                </div>
              </Box>
            </Modal>
          )}

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>
                <div className="flex w-full items-center justify-around mb-6">
                  <Button variant="contained" onClick={() => setOpen(!open)}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default Users;
