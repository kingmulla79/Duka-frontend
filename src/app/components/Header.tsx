/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../components/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import CustomModal from "../utils/CustomModal";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
// import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../../public/assets/avatar.jpg";
import { useSession } from "next-auth/react";
import {
  useLoadUserQuery,
  useLogoutUserQuery,
  useSocialAuthMutation,
} from "../../../redux/features/auth/authAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  route: string;
  activeItem: number;
  setRoute: (route: string) => void;
}
const Header: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  // const [active, setActive] = useState(false);
  const [openSideBar, setOpenSidebar] = useState(false);

  const { user } = useSelector((state: any) => state.auth);
  //data from social authentication session
  const { data } = useSession();
  const { refetch } = useLoadUserQuery(undefined, {});
  //data from social authentication session
  // RTK query for social authentication
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setlogout] = useState(false);
  //skip logout query if logout button is not pressed
  const {} = useLogoutUserQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!user) {
      if (data) {
        const socialAuthData = {
          email: data?.user?.email,
          username: data?.user?.name,
          avatar: data?.user?.image,
        };
        socialAuth(socialAuthData);
        refetch();
      }
    }

    if (data === null) {
      if (isSuccess) {
        toast.success("Successfully logged in");
      }
    }
    if (data === null && !user) {
      setlogout(true);
    }
  }, [data, isSuccess, refetch, socialAuth, user]);

  // if (typeof window !== "undefined") {
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 80) {
  //       setActive(true);
  //     } else {
  //       setActive(false);
  //     }
  //   });
  // }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };
  return (
    <div className="w-full relative pb-[80px]">
      <div
        className={
          "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 dark:transition dark:duration-500"
        }
      >
        <div className="w-[95%] 800px:w-[92%] m-auto h-full py-2">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                Ecommerce
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile devices*/}
              <div className="800px:hidden pr-3">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user?.avatar_url ? user?.avatar_url : avatar}
                    alt="Profile pic"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full"
                    style={{
                      border: activeItem === 5 ? "2px solid #ffc107" : "none", // border color changes when selected
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  onClick={() => {
                    setOpen(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {openSideBar && (
          <div
            className="800px:hidden fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[38%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 top-0 right-0">
              <NavItems isMobile={true} />
              <div className="w-full items-center justify-center flex">
                {user ? (
                  <Link href={"/profile"}>
                    <Image
                      src={user?.avatar_url ? user?.avatar_url : avatar}
                      alt="Profile pic"
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px] rounded-full"
                      style={{
                        border: activeItem === 5 ? "2px solid #ffc107" : "none", // border color changes when selected
                      }}
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className="800px:flex cursor-pointer dark:text-white text-black"
                    onClick={() => {
                      {
                        setOpen(true);
                        setOpenSidebar(false);
                      }
                    }}
                  />
                )}
              </div>
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Ecommerce © 2023-2024
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Sign-up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
