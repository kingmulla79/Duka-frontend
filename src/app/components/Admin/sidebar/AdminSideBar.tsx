/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  PaymentsIcon,
  GroupsIcon,
  ArrowBackIcon,
  ExitToAppIcon,
  AddCircleOutlineOutlinedIcon,
  SearchOutlinedIcon,
  QuizIcon,
  PeopleAltOutlinedIcon,
} from "./Icon";
import avatarDefault from "../../../../../public/assets/avatar.jpg";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useLogoutUserQuery } from "../../../../../redux/features/auth/authAPI";
import { redirect } from "next/navigation";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

interface Props {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar: FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setlogout] = useState(false);
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const { theme, setTheme } = useTheme();
  //skip logout query if logout button is not pressed
  const {} = useLogoutUserQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    function getSize() {
      setWidth(window.innerWidth);
    }
    setMounted(true);

    if (width < 900) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
    window.addEventListener("resize", getSize);
  }, [width, setIsCollapsed]);

  if (!mounted) {
    return null;
  }

  const logOutHandler = async () => {
    setlogout(true);
    await signOut(); // will give a reload, should be done in case of social-authentication
    redirect("/");
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "5%",
        }}
        width={isCollapsed ? "0%" : "20%"}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => {
              if (width > 900) {
                setIsCollapsed(!isCollapsed);
              }
            }}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{ margin: "10px 0 0 0" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {/* <Link href="/"> */}
                <h3 className="text-[19px] font-Poppins uppercase dark:text-white text-black">
                  Ecommerce
                </h3>
                {/* </Link> */}
                {width > 900 && (
                  <IconButton
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="inline-block"
                  >
                    <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                  </IconButton>
                )}
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user.avatar_url ? user.avatar_url : avatarDefault}
                  className="w-[100px] h-[100px] cursor-pointer border-[3px] border-[#5b6fe6] rounded-full"
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.username}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  {user?.user_role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "2%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders"
              to="/admin/orders"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Add Products"
              to="/admin/add-products"
              icon={<AddCircleOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Search Products"
              to="/admin/search-products"
              icon={<SearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Manage Team"}
            </Typography>
            <Item
              title="Team"
              to="/admin/team"
              icon={<SearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Customization"}
            </Typography>

            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Product Analytics"
              to="/admin/product-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Order Analytics"
              to="/admin/order-analytics"
              icon={<PaymentsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<PeopleAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="Back to Profile"
              to="/profile"
              icon={<ArrowBackIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <div onClick={logOutHandler}>
              <Item
                title="Logout"
                to=""
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
