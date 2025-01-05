/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../../public/assets/avatar.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className="w-full">
      {" "}
      <div
        className={`w-full flex flex-col items-center px-3 py-4 cursor-pointer ${
          active === 1
            ? "dark:bg-slate-800 bg-slate-500"
            : "dark:bg-transparent bg-slate-300"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar_url || avatar
              ? user.avatar_url || avatar
              : avatarDefault
          }
          alt="profile"
          width={30}
          height={30}
          className="w-[30px] h-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:flex hidden font-Poppins dark:text-white text-black">
          {user.username}{" "}
          {user.user_role === "admin" && (
            <RiVerifiedBadgeFill
              size={18}
              className="dark:text-green-600 text-red-600 justify-center items-center ml-1 mt-[2px]"
            />
          )}
        </h5>
      </div>
      <div
        className={`w-full flex px-3 py-4 items-center 800px:justify-normal justify-center cursor-pointer dark:text-white text-black ${
          active === 2
            ? "dark:bg-slate-800 bg-slate-500"
            : "dark:bg-transparent bg-slate-300"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 800px:justify-normal justify-center cursor-pointer dark:text-white text-black ${
          active === 3
            ? "dark:bg-slate-800 bg-slate-500"
            : "dark:bg-transparent bg-slate-300"
        }`}
        onClick={() => setActive(3)}
      >
        <FaShippingFast size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Orders
        </h5>
      </div>
      {user.user_role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 800px:justify-normal justify-center cursor-pointer dark:text-white text-black ${
            active === 6
              ? "dark:bg-slate-800 bg-slate-500"
              : "dark:bg-transparent bg-slate-300"
          }`}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className="dark:text-white text-black"
          />
          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
            Admin Dashboard
          </h5>
        </Link>
      )}
      {user.user_role === "user" && (
        <div
          className={`w-full flex items-center px-3 py-4 800px:justify-normal justify-center cursor-pointer dark:text-white text-black ${
            active === 7
              ? "dark:bg-slate-800 bg-slate-500"
              : "dark:bg-transparent bg-slate-300"
          }`}
          onClick={() => setActive(7)}
        >
          <IoMdNotifications size={20} className="dark:text-white text-black" />
          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
            Notifications
          </h5>
        </div>
      )}
      <div
        className={`w-full flex items-center px-3 py-4 800px:justify-normal justify-center cursor-pointer dark:text-white text-black ${
          active === 4
            ? "dark:bg-slate-800 bg-slate-500"
            : "dark:bg-transparent bg-slate-300"
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          LogOut
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
