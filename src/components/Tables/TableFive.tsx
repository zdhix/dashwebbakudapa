import React, { useState, useEffect } from 'react';
import { Package } from "@/types/package";

// Assuming you'll fetch data from Google Sheets
const fetchDataFromGoogleSheets = async (sheetId: string, apiKey: string): Promise<Package[]> => {
  // Implementation of Google Sheets API fetch
  // For now, we'll return the static data
  return packageData;
};

interface TableFiveProps {
  title: string;
  sheetId: string;
  apiKey: string;
}

const TableFive: React.FC<TableFiveProps> = ({ title, sheetId, apiKey }) => {
  const [data, setData] = useState<Package[]>([]);
  const [filteredData, setFilteredData] = useState<Package[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataFromGoogleSheets(sheetId, apiKey);
      setData(result);
      setFilteredData(result);
    };
    fetchData();
  }, [sheetId, apiKey]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterData(term, activeFilter);
  };

  const filterData = (term: string, filter: string) => {
    let filtered = data;
    if (filter !== 'all') {
      filtered = data.filter(item => item.status.toLowerCase() === filter.toLowerCase());
    }
    if (term) {
      filtered = filtered.filter(item => 
        Object.values(item).some(val => 
          val.toString().toLowerCase().includes(term)
        )
      );
    }
    setFilteredData(filtered);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    filterData(searchTerm, filter);
  };

  const downloadCSV = () => {
    const headers = Object.keys(data[0]).join(',');
    const csv = [
      headers,
      ...filteredData.map(row => Object.values(row).join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'table_data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const TableContent = ({ data }: { data: Package[] }) => (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
          <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
            Package
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
            Invoice date
          </th>
          <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
            Status
          </th>
          {!isModalOpen && (
            <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((packageItem, index) => (
          <tr key={index}>
            <td
              className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
            >
              <h5 className="text-dark dark:text-white">
                {packageItem.name}
              </h5>
              <p className="mt-[3px] text-body-sm font-medium">
                ${packageItem.price}
              </p>
            </td>
            <td
              className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
            >
              <p className="text-dark dark:text-white">
                {packageItem.invoiceDate}
              </p>
            </td>
            <td
              className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
            >
              <p
                className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                  packageItem.status === "Paid"
                    ? "bg-[#219653]/[0.08] text-[#219653]"
                    : packageItem.status === "Unpaid"
                      ? "bg-[#D34053]/[0.08] text-[#D34053]"
                      : "bg-[#FFA70B]/[0.08] text-[#FFA70B]"
                }`}
              >
                {packageItem.status}
              </p>
            </td>
            {!isModalOpen && (
              <td
                className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
              >
                <div className="flex items-center justify-end space-x-3.5">
                  {/* Action buttons (view, edit, delete) remain unchanged */}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="space-x-2">
          <button onClick={() => handleFilterChange('all')} className="px-4 py-2 bg-gray-200 rounded">All</button>
          <button onClick={() => handleFilterChange('paid')} className="px-4 py-2 bg-gray-200 rounded">Paid</button>
          <button onClick={() => handleFilterChange('unpaid')} className="px-4 py-2 bg-gray-200 rounded">Unpaid</button>
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded"
        />
        <div className="space-x-2">
          <button onClick={downloadCSV} className="px-4 py-2 bg-blue-500 text-white rounded">Download CSV</button>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-green-500 text-white rounded">View Report</button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <TableContent data={filteredData} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{title} - Full Report</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-2xl">&times;</button>
            </div>
            <TableContent data={filteredData} />
          </div>
        </div>
      )}
    </div>
  );
};

