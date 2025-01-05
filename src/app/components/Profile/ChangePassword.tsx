/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "../../../../redux/features/auth/authAPI";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";

const ChangePassword: FC = () => {
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;

  const [showOldPsw, setShowOldPsw] = useState(false);
  const [showNewPsw, setShowNewPsw] = useState(false);
  const [showCnfPwd, setShowCnfPsw] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (!PWD_REGEX.test(newPassword)) {
      toast.error(
        "Password must contain at least one lowercase, uppercase and special character AND must be 8-24 characters long"
      );
    } else if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // load current changes for user
      toast.success("Information successfully updated");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [error, isSuccess]);

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] dark:text-[#fff] text-black pb-2">
        {" "}
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[60%] relative mt-5">
            <label className={`${styles.label}`}>Enter your old password</label>
            <input
              type={showOldPsw ? "text" : "password"}
              className={`${styles.input}`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {showOldPsw ? (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
                size={20}
                onClick={() => setShowOldPsw(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
                size={20}
                onClick={() => setShowOldPsw(true)}
              />
            )}
          </div>
          <div className="w-[100%] 800px:w-[60%] relative mt-5">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter your new password
            </label>
            <input
              type={showNewPsw ? "text" : "password"}
              className={`${styles.input}`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {showNewPsw ? (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
                size={20}
                onClick={() => setShowNewPsw(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
                size={20}
                onClick={() => setShowNewPsw(true)}
              />
            )}
          </div>
          <div className="w-[100%] 800px:w-[60%] relative mt-5">
            <label className="block pb-2 Otext-black dark:text-[#fff] text-black">
              Enter your confirm password
            </label>
            <input
              type={showCnfPwd ? "text" : "password"}
              className={`${styles.input}`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showCnfPwd ? (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
                size={20}
                onClick={() => setShowCnfPsw(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
                size={20}
                onClick={() => setShowCnfPsw(true)}
              />
            )}
          </div>
          <div className="w-[100%] 800px:w-[60%] relative mt-5">
            <input
              className={`w-[95%] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
              value="Update"
              required
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
