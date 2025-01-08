/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useRegisterMutation } from "../../../../redux/features/auth/authAPI";
import toast from "react-hot-toast";
// import { signIn } from "next-auth/react";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import avatarIcon from "../../../../public/assets/avatar.jpg";

type Props = {
  setRoute: (route: string) => void;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
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
  const [userAvatar, setUserAvatar] = useState<any | null>("");
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const profile_avatar = fileReader.result;
        setUserAvatar(profile_avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

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
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      avatar: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password, username, phone, avatar }) => {
      const data = {
        email,
        password,
        username,
        phone,
        avatar: userAvatar,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Signup with QuizzHacks</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-3 relative mb-3">
          <TextField
            required
            type="username"
            variant="outlined"
            label="Enter your username"
            className={`w-full`}
            id="username"
            defaultValue={values.username}
            placeholder="username"
            onChange={handleChange}
          />
          {errors.username && touched.username && (
            <span className="text-red-500 block">{errors.username}</span>
          )}
        </div>
        <div className="w-full mt-3 relative mb-3">
          <TextField
            required
            type="email"
            variant="outlined"
            label="Enter your email"
            className={`w-full ${
              errors.email && touched.email && "border-red-500"
            }`}
            id="email"
            defaultValue={values.email}
            placeholder="useremail@domain.com"
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 block">{errors.email}</span>
          )}
        </div>

        <div className="w-full mt-3 relative mb-3">
          <TextField
            required
            type="text"
            variant="outlined"
            label="Enter your phone number"
            className={`w-full ${
              errors.phone && touched.phone && "border-red-500"
            }`}
            id="phone"
            defaultValue={values.phone}
            placeholder="07*****,01*****"
            onChange={handleChange}
          />
        </div>
        {errors.phone && touched.phone && (
          <span className="text-red-500 block">{errors.phone}</span>
        )}

        <div className="pl-1 w-full mt-6 relative mb-3 flex justify-items-center">
          <TextField
            required
            type={`${show ? "text" : "password"}`}
            variant="standard"
            label="Enter your password"
            className={`w-full ${
              errors.password && touched.password && "border-red-500"
            }`}
            id="password"
            defaultValue={values.password}
            placeholder={`${show ? "UniquePassword!123" : "***************"}`}
            onChange={handleChange}
          />
          <IconButton
            aria-label="password-visibility"
            onClick={() => setShow(!show)}
            className={`absolute cursor-pointer text-black dark:text-white`}
          >
            {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 mb-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-6 relative mb-3 px-11 flex justify-items-center justify-around">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput type="file" onChange={imageHandler} multiple />
          </Button>
          <Image
            src={userAvatar ? userAvatar : avatarIcon}
            alt=""
            width={50}
            height={50}
            className="w-[50px] h-[50px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
        </div>
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
