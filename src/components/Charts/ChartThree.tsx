// components/Charts/ChartThree.tsx
import { ApexOptions } from "apexcharts";
import React, { useRef } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { ChartThreeProps } from '@/types/chart';

const ChartThree: React.FC<ChartThreeProps> = ({
  title = "Dana Alokasi Umum",
  series = [76, 24],
  labels = ["REALISASI_1_REG", "REALISASI_1_REG"],
  selectOptions = ["Monthly", "Yearly"],
  centerLabel = "DAU",
  legendItems = [
    { label: "PAGU", percentage: 76 },
    { label: "REALISASI", percentage: 24 }
  ]
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#5750F1", "#5475E5", "#8099EC", "#ADBCF2"],
    labels: labels,
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: centerLabel,
              fontSize: "16px",
              fontWeight: "200",
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  const handleDownloadExcel = () => {
    const data = series.map((value, index) => ({
      Category: labels[index],
      Value: value,
      Percentage: `${value}%`
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Chart Data");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, `${title.toLowerCase().replace(/\s+/g, '-')}-data.xlsx`);
  };

  const handleDownloadChart = async () => {
    if (!chartRef.current) {
      console.log("Chart not available to download.");
      return;
    }

    const chartElement = chartRef.current;
    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL('image/jpeg');
    saveAs(imgData, `${title.toLowerCase().replace(/\s+/g, '-')}-chart.jpeg`);
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            {title}
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={selectOptions} />
        </div>
      </div>

      <div className="mb-8" ref={chartRef}>
        <div className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[350px]">
        <div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
          {legendItems.map((item, index) => (
            <div key={item.label} className="w-full px-7.5 sm:w-1/2">
              <div className="flex w-full items-center">
                <span className={`mr-2 block h-3 w-full max-w-3 rounded-full ${index === 0 ? 'bg-blue' : 'bg-blue-light'}`}></span>
                <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                  <span>{item.label}</span>
                  <span>{item.percentage}%</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4 px-7.5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownloadExcel}
        >
          Download to Excel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownloadChart}
        >
          Download Chart
        </button>
      </div>
    </div>
  );
};

export default ChartThree;