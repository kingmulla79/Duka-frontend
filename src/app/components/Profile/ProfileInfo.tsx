/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../../public/assets/avatar.jpg";
import {
  useUpdateProfilePicMutation,
  useUpdateDetailsMutation,
} from "../../../../redux/features/auth/authAPI";

import { useLoadUserQuery } from "../../../../redux/features/auth/authAPI";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import TextField from "@mui/material/TextField";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
  const PHONE_REGEX = /^(01|07)\d{8}$/;

  const [username, setUsername] = useState(user && user.username);
  const [phone, setPhone] = useState(user && user.phone ? user.phone : null);

  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [updateProfilePic, { isSuccess, error: update_error }] =
    useUpdateProfilePicMutation();
  const [updateUserInfo, { isSuccess: success, error }] =
    useUpdateDetailsMutation();

  // const [loadUser, setLoadUser] = useState(false);
  const { refetch } = useLoadUserQuery(undefined, {
    // skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateProfilePic({ avatar: avatar });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!PHONE_REGEX.test(phone)) {
      setPhoneError("Invalid Kenyan phone number");
    } else if (!USERNAME_REGEX.test(username)) {
      setUsernameError(
        "Username should only have 3 to 20 alphanumeric charaters, only special charater is _(underscore)"
      );
    } else {
      const data = { phone, username };
      await updateUserInfo(data);
    }
  };

  useEffect(() => {
    if (isSuccess || success) {
      // load current changes for user
      // setLoadUser(true);
      refetch();
      toast.success("Information successfully updated");
    }
    if (success) {
      setUpdateSuccess(true);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
    if (update_error) {
      if ("data" in update_error) {
        const errorData = update_error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [error, isSuccess, refetch, success, update_error, setUpdateSuccess]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user.avatar_url || avatar ? user.avatar_url || avatar : avatarIcon
            }
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />

          <input
            type="file"
            name=""
            id="avatar"
            className="hidden" //to display camera icon
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%] pb-10">
              <TextField
                required
                variant="outlined"
                label="Username"
                className="!w-[95%]"
                defaultValue={username}
                onFocus={() => setUsernameError("")}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && (
                <span className="text-red-500 block">{usernameError}</span>
              )}
            </div>
            <div className="w-[100%] pb-10">
              <TextField
                required
                variant="outlined"
                label="Phone"
                className="!w-[95%]"
                defaultValue={phone}
                onFocus={() => setPhoneError("")}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phoneError && (
                <span className="text-red-500 block">{phoneError}</span>
              )}
            </div>
            <div className="w-[100%] pt-2">
              <TextField
                variant="outlined"
                label="Email Address"
                className="!w-[95%]"
                defaultValue={user?.email}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </div>
            <div className="items-center justify-center mt-8">
              {updateSuccess ? (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setUpdateSuccess(false)}
                  >
                    Success
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    startIcon={<UpdateIcon />}
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                </>
              )}
            </div>

            {/* <input
              className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            /> */}
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
