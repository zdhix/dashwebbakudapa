import { ApexOptions } from "apexcharts";
import React, { useRef } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

export interface BarChartProps {
  title?: string;
  selectOptions?: string[];
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  colors?: string[];
  height?: number;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  title = "Profit this week",
  selectOptions = ["This Week", "Last Week"],
  series,
  categories,
  colors = ["#5750F1", "#0ABEF9"],
  height = 335,
  className = "",
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const options: ApexOptions = {
    colors,
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: height,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },

    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    xaxis: {
      categories,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",

      markers: {
        radius: 99,
        width: 16,
        height: 16,
        strokeWidth: 10,
        strokeColor: "transparent",
      },
    },
    fill: {
      opacity: 1,
    },
  };

  // Function to download the chart as an Excel file
  const handleDownloadExcel = () => {
    const data = series[0].data.map((value, index) => ({
      Day: categories[index] ?? `Day ${index + 1}`,
      Sales: value,
      Revenue: series[1]?.data[index] || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Chart Data");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, 'chart-data.xlsx');
  };

  // Function to download the chart as an image
  const handleDownloadChart = async () => {
    if (!chartRef.current) {
      console.log("Chart not available to download.");
      return;
    }

    const chartElement = chartRef.current;
    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL('image/jpeg');
    saveAs(imgData, 'chart-image.jpeg');
  };

  return (
    <div className={`col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5 ${className}`}>
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            {title}
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={selectOptions} />
        </div>
      </div>

      <div ref={chartRef}>
        <div id="chartTwo" className="-ml-3.5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={height}
          />
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

export default BarChart;
