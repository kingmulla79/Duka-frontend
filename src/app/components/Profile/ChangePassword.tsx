/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/role-supports-aria-props */

import { useUpdatePasswordMutation } from "../../../../redux/features/auth/authAPI";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ChangePassword: FC = () => {
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;

  const [showOldPsw, setShowOldPsw] = useState(false);
  const [showNewPsw, setShowNewPsw] = useState(false);
  const [showCnfPwd, setShowCnfPsw] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
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

      setUpdateSuccess(true);
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
          <div className="w-[100%] 800px:w-[60%] flex justify-items-center mt-5">
            <TextField
              required
              variant="standard"
              label="Enter your old password"
              className="!w-[95%]"
              value={oldPassword}
              type={showOldPsw ? "text" : "password"}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <IconButton
              aria-label="password-visibility"
              onClick={() => setShowOldPsw(!showOldPsw)}
              className={`absolute cursor-pointer text-black dark:text-white`}
            >
              {showOldPsw ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>
          <div className="w-[100%] 800px:w-[60%] flex justify-items-center mt-5">
            <TextField
              required
              variant="standard"
              label="Enter your new password"
              className="!w-[95%]"
              value={newPassword}
              type={showNewPsw ? "text" : "password"}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <IconButton
              aria-label="password-visibility"
              onClick={() => setShowNewPsw(!showNewPsw)}
              className={`absolute cursor-pointer text-black dark:text-white`}
            >
              {showNewPsw ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>
          <div className="w-[100%] 800px:w-[60%] flex justify-items-center mt-5">
            <TextField
              required
              variant="standard"
              label="Confirm your new password"
              className="!w-[95%]"
              value={confirmPassword}
              type={showCnfPwd ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <IconButton
              aria-label="password-visibility"
              onClick={() => setShowCnfPsw(!showCnfPwd)}
              className={`absolute cursor-pointer text-black dark:text-white`}
            >
              {showCnfPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>

          <div className="w-[100%] 800px:w-[60%] relative mt-5">
            {updateSuccess ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setConfirmPassword("");
                    setNewPassword("");
                    setOldPassword("");
                    setUpdateSuccess(false);
                  }}
                >
                  Success
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  startIcon={<UpdateIcon />}
                  onClick={passwordChangeHandler}
                >
                  Update
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
