"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import TableOne from "../Tables/TableOne";
import ChartOne from "@/components/Charts/ChartOne";
import ChartFive from "../Charts/ChartFive";                                     
import TextSection from "../Header/TextSection";

const TKDDash: React.FC = () => {
  return (
    <>
      <TextSection />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5"></div>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <ChartFive />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
    </>
  );
};

export default TKDDash;

