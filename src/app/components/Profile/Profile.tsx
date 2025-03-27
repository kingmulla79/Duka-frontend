/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from "react";
import { useLogoutUserQuery } from "../../../../redux/features/auth/authAPI";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import SideBarProfile from "./SideBarProfile";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import OrderProfile from "./OrderProfile";
import { useUserOrdersQuery } from "../../../../redux/features/orders/orderAPI";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../../redux/features/products/productsSlice";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null); //user may not have avatar attribute
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const dispatch = useDispatch();

  //skip logout query if logout button is not pressed
  const {} = useLogoutUserQuery(undefined, {
    skip: !logout ? true : false,
  });
  const {} = useUserOrdersQuery(undefined, {});

  const logOutHandler = async () => {
    setLogout(true);
    await signOut(); // will give a reload, should be done in case of social-authentication
    dispatch(clearCart());
    localStorage.removeItem("cart");
    redirect("/");
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-600 bg-white bg-opacity-90 border dark:border-slate-800 border-[#e6e5e51d] rounded-[5px] shadow-xl dark:shadow-sm mt-[40px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[40px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[40px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full h-full bg-transparent mt-[40px]">
          <OrderProfile />
        </div>
      )}
    </div>
  );
};

export default Profile;
