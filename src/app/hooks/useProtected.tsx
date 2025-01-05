import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import React from "react";

interface ProtectedProps {
  children: React.ReactNode;
}

//used for protected routes
export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = UserAuth(); //true for signed in users
  return isAuthenticated ? children : redirect("/");
}
