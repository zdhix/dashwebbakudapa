import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import DBHDash from "@/components/Dashboard/DBHDash";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const DashDBHPage = () => {
  return (
    <>
      <DefaultLayout>
        <DBHDash />
      </DefaultLayout>
    </>
  );
};

export default DashDBHPage;