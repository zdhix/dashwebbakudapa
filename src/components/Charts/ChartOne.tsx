// types/chart.ts
export interface AreaChartProps {
  title?: string;
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  colors?: string[];
  height?: number;
  className?: string;
  showDownloadButtons?: boolean;
  summaryData?: {
    leftLabel?: string;
    leftValue?: string;
    rightLabel?: string;
    rightValue?: string;
  };
  downloadFilePrefix?: string;
}

// components/ChartOne.tsx
import { ApexOptions } from "apexcharts";
import React, { useRef, useMemo } from "react";
import dynamic from 'next/dynamic';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

// Dynamically import ReactApexChart with no SSR to avoid window is not defined error
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartOne: React.FC<AreaChartProps> = ({
  title = "Chart Title",
  series = [],
  categories = [],
  colors = ["#5750F1", "#0ABEF9"],
  height = 310,
  className = "col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7",
  showDownloadButtons = true,
  summaryData,
  downloadFilePrefix = "chart"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize the options to prevent unnecessary re-renders
  const options: ApexOptions = useMemo(() => ({
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: colors,
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: height,
      type: "area",
      toolbar: {
        show: false,
      },
      background: 'transparent',
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: height - 10,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: height + 10,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
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
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val: number) {
          return val.toFixed(2);
        },
      },
    },
    xaxis: {
      type: "category",
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
      },
    },
  }), [categories, colors, height]);

  const handleDownloadExcel = () => {
    if (!series.length || !categories.length) return;

    const data = categories.map((month, index) => {
      const rowData: Record<string, string | number> = {
        Month: month,
      };
      
      series.forEach(s => {
        rowData[s.name] = s.data[index];
      });
      
      return rowData;
    });

    // Add summary row with totals
    const summaryRow: Record<string, string | number> = {
      Month: "Total",
    };
    series.forEach(s => {
      summaryRow[s.name] = s.data.reduce((a, b) => a + b, 0);
    });
    data.push(summaryRow);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Chart Data");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, `${downloadFilePrefix}-data.xlsx`);
  };

  const handleDownloadChart = async () => {
    if (!containerRef.current) return;

    try {
      const originalBackground = containerRef.current.style.background;
      containerRef.current.style.background = 'white';

      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: 'white',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        onclone: function (clonedDoc) {
          const clonedElement = clonedDoc.getElementById('chart-container');
          if (clonedElement) {
            clonedElement.style.padding = '20px';
          }
        }
      });

      containerRef.current.style.background = originalBackground;
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      saveAs(imgData, `${downloadFilePrefix}-chart.jpeg`);
    } catch (error) {
      console.error('Error generating chart image:', error);
    }
  };

  // Check if we have valid data before rendering
  if (!series?.length || !categories?.length) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center h-[310px]">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="chart-container"
      ref={containerRef}
      className={className}
    >
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            {title}
          </h4>
        </div>
      </div>

      <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={height}
          />
        </div>
      </div>

      {summaryData && (
        <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
          <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
            <p className="font-medium">{summaryData.leftLabel}</p>
            <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
              {summaryData.leftValue}
            </h4>
          </div>
          <div className="xsm:w-1/2">
            <p className="font-medium">{summaryData.rightLabel}</p>
            <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
              {summaryData.rightValue}
            </h4>
          </div>
        </div>
      )}

      {showDownloadButtons && (
        <div className="mt-6 flex justify-end space-x-4">
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
      )}
    </div>
  );
};

export default ChartOne;