/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "../../../../redux/features/auth/authAPI";
import toast from "react-hot-toast";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { signIn } from "next-auth/react";

type Props = {
  open: boolean;
  setRoute: (route: string) => void;
  setOpen: (route: boolean) => void;
};
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password!"),
});

const Login: FC<Props> = ({ open, setRoute, setOpen }) => {
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      const data = { email, password };
      await login(data);
    },
  });
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, setOpen, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login to Eccommerce App</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`}>Enter your email</label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="username@domain.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`}>Enter your password</label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="********"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or Join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            size={30}
            className="cursor-pointer mr-2"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className="cursor-pointer mr-2 text-black dark:text-white"
            onClick={() => signIn("github")}
          />
        </div>
        <h2 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Dont have an account?{""}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-up")}
          >
            {" "}
            Sign-up
          </span>
        </h2>
        <h2 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Forgot your password?{""}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("ForgotPassword")}
          >
            {" "}
            Reset Password
          </span>
        </h2>
      </form>
      <br />
      {isLoading && (
        <>
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </div>
  );
};

export default Login;
