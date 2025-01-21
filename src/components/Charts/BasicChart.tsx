"use client";

import React from "react";
import ChartThree from "@/components/Charts/ChartThree";
import ChartFive from "@/components/Charts/ChartFive";

const BasicChart: React.FC = () => {
  const chartThreeData = {
    title: "Dana Alokasi Khusus",
    series: [80, 20],
    labels: ["REALISASI_DAK_1", "REALISASI_DAK_2"],
    centerLabel: "DAK",
    legendItems: [
      { label: "PAGU DAK", percentage: 80 },
      { label: "REALISASI DAK", percentage: 20 },
    ],
  };

  const chartFiveData = {
    title: "DANA DESA",
    subtitle: "Dana Desa Performance 2024",
    totalValue: "784k",
    percentageChange: -1.5,
    series: [
      {
        name: "Pagu",
        data: [168, 385, 201, 298, 187, 195, 291, 79],
      },
    ],
    categories: [
      "Pendidikan",
      "Kesehatan & KB",
      "Jalan",
      "Irigasi",
      "Pertanian",
      "Kelautan & Perikanan",
      "Industri Kecil & Menengah",
      "Pariwisata",
    ],
    colors: ["#5750F1"],
    height: 500,
    className: "xl:col-span-12",
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <ChartThree {...chartThreeData} />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <ChartFive {...chartFiveData} />
        </div>
      </div>
    </>
  );
};

export default BasicChart;
