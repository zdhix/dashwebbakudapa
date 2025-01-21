import { ApexOptions } from "apexcharts";
import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

const ChartFiveDBH: React.FC = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch data from Google Sheets later
    const fetchData = async () => {
      // Code to fetch data from Google Sheets goes here
      const sheetData = [
        { name: "Pendidikan", value: 168 },
        { name: "Kesehatan & KB", value: 385 },
        { name: "Jalan", value: 201 },
        { name: "Irigasi", value: 298 },
        { name: "Pertanian", value: 187 },
        { name: "Kelautan & Perikanan", value: 195 },
        { name: "Industri Kecil & Menengah", value: 291 },
        { name: "Pariwisata", value: 79 },
      ];
      setData(sheetData);
    };
    fetchData();
  }, []);

  const handleDownloadExcel = () => {
    if (data.length === 0) {
      console.log("No data available to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, 'chart-five-dbh-data.xlsx');
  };

  const handleDownloadChart = async () => {
    if (!chartRef.current) {
      console.log("Chart not available to download.");
      return;
    }

    const chartElement = chartRef.current;
    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL('image/jpeg');
    saveAs(imgData, 'chart-five-dbh.jpeg');
  };

  const series = data.length > 0 ? [
    {
      name: "Pagu",
      data: data.map((item) => item.value),
    },
  ] : [];

  const options: ApexOptions = {
    colors: ["#5750F1"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 500,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 3,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: data.length > 0 ? data.map((item) => item.name) : [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      markers: {
        radius: 99,
      },
    },
    grid: {
      strokeDashArray: 7,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span">
      <div className="flex justify-between border-b border-stroke px-9 pb-4.5 pt-5.5 dark:border-dark-3">
        <div>
          <h2 className="mb-7 text-body-2xlg font-bold text-dark dark:text-white">
            DANA DESA
          </h2>
          <p className="text-body-sm font-medium">Last DANA DESA Performance</p>
        </div>
        <div>
          <h3 className="mb-0.5 text-body-2xlg font-bold text-dark dark:text-white">
            784k
          </h3>
          <p className="flex items-center justify-end gap-1 text-right text-red">
            <svg
              className="fill-current"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.0157 4.74707C12.7532 4.74707 12.5344 4.96582 12.5344 5.22832V7.65645L9.4063 5.57832C8.94693 5.27207 8.37818 5.27207 7.9188 5.57832L5.0313 7.50332C4.92193 7.59082 4.7688 7.59082 4.63755 7.50332L1.24693 5.2502C1.02818 5.09707 0.721929 5.1627 0.568804 5.38145C0.415679 5.6002 0.481304 5.90645 0.700054 6.05957L4.09068 8.3127C4.55005 8.61895 5.1188 8.61895 5.57818 8.3127L8.46568 6.3877C8.57505 6.3002 8.72818 6.3002 8.85943 6.3877L11.6594 8.26895H9.49381C9.23131 8.26895 9.01255 8.4877 9.01255 8.7502C9.01255 9.0127 9.23131 9.23145 9.49381 9.23145H13.0157C13.2782 9.23145 13.4969 9.0127 13.4969 8.7502V5.22832C13.5188 4.96582 13.2782 4.74707 13.0157 4.74707Z" fill="#" />
            </svg>
            <span className="text-body-sm font-medium">-1.5%</span>
          </p>
        </div>
      </div>
      <div className="px-6 pb-6 pt-7.5">
        <div id="chartFiveDBH" className="-ml-3.5" ref={chartRef}>
          {data.length > 0 ? (
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={500}
            />
          ) : (
            <div>Loading data...</div>
          )}
        </div>
      </div>
      <div className="px-6 pb-6 pt-7.5 flex justify-end space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownloadExcel}
          disabled={data.length === 0}
        >
          Download to Excel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue text-white font-bold py-2 px-4 rounded"
          onClick={handleDownloadChart}
          disabled={data.length === 0}
        >
          Download Chart
        </button>
      </div>
    </div>
  );
};

export default ChartFiveDBH;