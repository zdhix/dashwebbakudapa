// src/hooks/useChartData.ts
import { useState, useEffect } from 'react';
import { AreaChartProps } from '@/types/chart';

interface ChartDataParams {
  sheetName: string;
  pemda: string;
}

export function useChartData({ sheetName, pemda }: ChartDataParams) {
  const [chartData, setChartData] = useState<Partial<AreaChartProps>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/sheets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sheetName, pemda }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setChartData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sheetName, pemda]);

  return { chartData, isLoading, error };
}