
//chart3
export interface ChartThreeProps {
  title?: string;
  series: number[];
  labels: string[];
  selectOptions?: string[];
  centerLabel?: string;
  legendItems?: {
    label: string;
    percentage: number;
  }[];
}
//chart2
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
//chart1
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
//chart5
export interface ChartFiveProps {
  title?: string;
  subtitle?: string;
  totalValue?: string;
  percentageChange?: number;
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  height?: number;
  colors?: string[];
  className?: string;
}