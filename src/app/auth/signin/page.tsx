import React from "react";
import { Metadata } from "next";
import Signin from "@/components/Auth/Signin";
import HomeLogin from "@/components/Auth/HomeLogin";

export const metadata: Metadata = {
  title: " Login ",
  description:
    "This is Login BAKUDAPA SULUT",
  // other metadata
};

const LoginPage = () => {
  return (
    <HomeLogin />

  );
};

export default LoginPage;
