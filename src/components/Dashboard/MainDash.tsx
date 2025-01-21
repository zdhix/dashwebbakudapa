"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import TableOne from "../Tables/TableOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import ChartFive from "../Charts/ChartFive";
import ImageSlider from "../ImageSlider/ImageSlider";
import TextSection from "../Header/TextSection";

const MainDash: React.FC = () => {
  const chartOneData = {
    title: "Dana Alokasi Umum (DAU)",
    series: [
      {
        name: "PAGU",
        data: [0, 20, 35, 45, 35, 55, 65, 50, 65, 75, 60, 75],
      },
      {
        name: "Alokasi Periode",
        data: [15, 9, 17, 32, 25, 68, 80, 68, 84, 94, 74, 62],
      },
    ],
    categories: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    
    colors: ["#5750F1", "#0ABEF9"],
    height: 310,
    showDownloadButtons: true,
    summaryData: {
      leftLabel: "Pagu",
      leftValue: "Rp 45,070.00",
      rightLabel: "Realisasi",
      rightValue: "Rp 32,400.00"
    },
    downloadFilePrefix: "dau-chart"
  };

  const chartFiveData = {
    title: "DANA DESA",
    subtitle: "Dana Desa Performance 2024",
    totalValue: "784k",
    percentageChange: -1.5,
    series: [{
      name: "Pagu",
      data: [168, 385, 201, 298, 187, 195, 291, 79]
    }],
    categories: [
      "Pendidikan",
      "Kesehatan & KB",
      "Jalan",
      "Irigasi",
      "Pertanian",
      "Kelautan & Perikanan",
      "Industri Kecil & Menengah",
      "Pariwisata"
    ],
    colors: ["#5750F1"],
    height: 500,
    className: "xl:col-span-12"
  };

  return (
    <>
      <TextSection
        greeting="Welcome,"
        subGreeting="To Our Dashboard!"
        showEmoji={true}
        description="This is"
        boldText="Our Custom Dashboard"
        logoSrc="/images/logo/logo-bakudapa.png"
        logoAlt="Custom Logo"
        emojiAnimationDuration={3}
        className="my-custom-class" />

      <ImageSlider />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5"></div>
      <DataStatsOne />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne {...chartOneData} />
 
        <ChartThree
          title="Dana Alokasi Khusus"
          series={[80, 20]}
          labels={["REALISASI_DAK_1", "REALISASI_DAK_2"]}
          centerLabel="DAK"
          legendItems={[
            { label: "PAGU DAK", percentage: 80 },
            { label: "REALISASI DAK", percentage: 20 }
          ]}
        />
        <ChartFive {...chartFiveData} />
        <div className="col-span-12 xl:col-span-8">
          <TableOne  />
        
        </div>
      </div>
    </>
  );
};

export default MainDash;