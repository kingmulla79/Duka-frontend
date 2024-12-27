/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useRegisterMutation } from "../../../../redux/features/auth/authAPI";
import toast from "react-hot-toast";
// import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .min(3, "Minimum of 3 characters")
    .max(20, "Maximum of 20 characters")
    .matches(/^[a-zA-Z0-9_]{3,20}$/, {
      message:
        "Username should only have alphanumeric charaters, only special charater is _(underscore)",
      excludeEmptyString: false,
    }),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password!")
    .min(8, "Minimum of 8 characters")
    .max(32, "Maximum of 32 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/,
      {
        message:
          "Password must contain at least one lowercase, uppercase and special character",
        excludeEmptyString: false,
      }
    ),
  phone: Yup.string()
    .matches(/^(01|07)\d{8}$/, {
      message: "Invalid Kenyan number",
      excludeEmptyString: false,
    })
    .required("Please enter your phone number!"),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: { username: "", email: "", password: "", phone: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password, username, phone }) => {
      const data = {
        email,
        password,
        username,
        phone,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Signup with QuizzHacks</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-1 relative mb-1">
          <label className={`${styles.label}`}>Enter your username</label>
          <input
            type="text"
            name=""
            value={values.username}
            onChange={handleChange}
            id="username"
            placeholder="username"
            className={`${
              errors.username && touched.username && "border-red-500"
            } ${styles.input}`}
          />
          {errors.username && touched.username && (
            <span className="text-red-500 block">{errors.username}</span>
          )}
        </div>
        <div className="w-full mt-1 relative mb-1">
          <label className={`${styles.label}`}>Enter your email</label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 block">{errors.email}</span>
          )}
        </div>

        <div className="w-full mt-1 relative mb-1">
          <label className={`${styles.label}`}>Enter your phone number</label>
          <input
            type="text"
            name=""
            value={values.phone}
            onChange={handleChange}
            id="phone"
            placeholder="07*****,01*****"
            className={`${errors.phone && touched.phone && "border-red-500"} ${
              styles.input
            }`}
          />
        </div>
        {errors.phone && touched.phone && (
          <span className="text-red-500 block">{errors.phone}</span>
        )}

        <div className="w-full mt-1 relative mb-2">
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
          <span className="text-red-500 mb-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <input type="submit" value="Signup" className={`${styles.button}`} />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or Join with
        </h5>
        <div className="flex items-center justify-center my-1">
          <FcGoogle
            size={30}
            className="cursor-pointer mr-2"
            // onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className="cursor-pointer mr-2 text-black dark:text-white"
          />
        </div>
        <h2 className="text-center pt-1 font-Poppins text-[14px] text-black dark:text-white">
          Already have an account?{""}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            {" "}
            Login
          </span>
        </h2>
      </form>
    </div>
  );
};

export default SignUp;
