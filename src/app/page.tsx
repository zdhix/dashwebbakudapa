import MainDash from "@/components/Dashboard/MainDash";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";


export const metadata: Metadata = {
  title:
    "BAKUDAPA",
  description: "BAKUDAPA for SULUT",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <MainDash />
      </DefaultLayout>
    </>
  );
}
