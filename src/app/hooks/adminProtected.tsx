/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

//used for protected routes
export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  if (user) {
    const isAdmin = user?.user_role === "admin";
    return isAdmin ? children : redirect("/");
  }
}
