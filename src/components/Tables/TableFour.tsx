"use client"
import React, { useState, useEffect } from 'react';
import { Package } from "@/types/package";

// You'll need to implement this function to fetch data from Google Sheets
async function fetchDataFromGoogleSheets(): Promise<Package[]> {
  // Implement Google Sheets API call here
  // For now, we'll use the mock data
  return packageData;
}

const SearchForm: React.FC<{ onSearch: (term: string) => void }> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="relative w-full max-w-[300px]">
        <button
          type="submit"
          className="absolute left-5 top-1/2 -translate-y-1/2 text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1791_1693)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_1791_1693">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>

        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-full border border-stroke bg-gray-2 py-3 pl-13.5 pr-5 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary xl:w-[300px]"
        />
      </div>
    </form>
  );
};

const TableFour: React.FC = () => {
  const [data, setData] = useState<Package[]>([]);
  const [filteredData, setFilteredData] = useState<Package[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetchDataFromGoogleSheets().then(setData);
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (term: string) => {
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.status === filter));
    }
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + [
        [ "PAGU", "KONTRAK", "SALUR","PERSEN_SALUR_KONTRAK" ].join(","),
        ...filteredData.map(row => [
          row.name,
          row.price,
          row.invoiceDate,
          row.status
        ].join(","))
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dak_fisik.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewReport = () => {
    // Implement logic to show the table on a bigger scale
    // This could open a modal or navigate to a new page
    console.log("View Report clicked");
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <h2 className="text-2xl font-bold text-dark dark:text-white">DAK FISIK</h2>
        <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
          <button
            onClick={() => handleFilter('All')}
            className={`rounded py-1 px-3 text-s font-medium ${activeFilter === 'PEMDA'
                ? 'bg-primary text-white dark:bg-primary dark:text-white'
                : 'text-body-color hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:text-bodydark dark:hover:bg-primary dark:hover:bg-opacity-10 dark:hover:text-white'
              }`}
          >
            PEMDA
          </button>
          <button
            onClick={() => handleFilter('Paid')}
            className={`rounded py-1 px-3 text-s font-medium ${activeFilter === 'BIDANG'
                ? 'bg-primary text-white dark:bg-primary dark:text-white'
                : 'text-body-color hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:text-bodydark dark:hover:bg-primary dark:hover:bg-opacity-10 dark:hover:text-white'
              }`}
          >
            BIDANG
          </button>
          <button
            onClick={() => handleFilter('Unpaid')}
            className={`rounded py-1 px-3 text-s font-medium ${activeFilter === 'KPPN'
                ? 'bg-primary text-white dark:bg-primary dark:text-white'
                : 'text-body-color hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:text-bodydark dark:hover:bg-primary dark:hover:bg-opacity-10 dark:hover:text-white'
              }`}
          >
            KPPN
          </button>
        </div>
      </div>
      <SearchForm onSearch={handleSearch} />
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                PAGU
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                KONTRAK
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                SALUR
              </th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                %SALUR/KONTRAK
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((packageItem, index) => (
              <tr key={index}>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === filteredData.length - 1 ? "border-b-0" : "border-b"
                    }`}
                >
                  <h5 className="text-dark dark:text-white">{packageItem.name}</h5>
                  <p className="mt-[3px] text-body-sm font-medium">
                    ${packageItem.price}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === filteredData.length - 1 ? "border-b-0" : "border-b"
                    }`}
                >
                  <p className="text-dark dark:text-white">
                    {packageItem.invoiceDate}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === filteredData.length - 1 ? "border-b-0" : "border-b"
                    }`}
                >
                  <p
                    className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${packageItem.status === "Paid"
                        ? "bg-[#219653]/[0.08] text-[#219653]"
                        : packageItem.status === "Unpaid"
                          ? "bg-[#D34053]/[0.08] text-[#D34053]"
                          : "bg-[#FFA70B]/[0.08] text-[#FFA70B]"
                      }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === filteredData.length - 1 ? "border-b-0" : "border-b"
                    }`}
                >
                  <div className="flex items-center justify-end space-x-3.5">
                    {/* Action buttons (view, edit, delete) */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleDownload}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Download CSV
        </button>
        <button
          onClick={handleViewReport}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          View 
        </button>
      </div>
    </div>
  );
};

export default TableFour;