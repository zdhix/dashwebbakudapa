// src/app/api/sheets/route.ts
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

interface SheetRequest {
  sheetName: string;
  pemda: string;
}

interface ChartData {
  pagu: number[];
  alokasi: number[];
  categories: string[];
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sheetName, pemda } = await req.json() as SheetRequest;

    // Initialize Google Sheets client
    const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '{}'),
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Fetch data from specified sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: `${sheetName}!A:Z`, // Fetch all columns
    });

    const rows = response.data.values || [];
    
    // Get header row to find column indices
    const headers = rows[0];
    const pemdaIndex = headers.indexOf('Pemda');
    const paguIndex = headers.indexOf('Pagu');
    const alokasiIndex = headers.indexOf('Alokasi Periode');
    const periodeIndex = headers.indexOf('Periode');

    // Filter and transform data for the specified Pemda
    const filteredData = rows.slice(1).filter(row => row[pemdaIndex] === pemda);
    
    const chartData: ChartData = {
      pagu: [],
      alokasi: [],
      categories: []
    };

    // Process data month by month
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach(month => {
      const monthData = filteredData.find(row => row[periodeIndex].startsWith(month));
      if (monthData) {
        chartData.pagu.push(Number(monthData[paguIndex]) || 0);
        chartData.alokasi.push(Number(monthData[alokasiIndex]) || 0);
        chartData.categories.push(month);
      }
    });

    // Calculate summary data
    const totalPagu = chartData.pagu.reduce((sum, val) => sum + val, 0);
    const totalAlokasi = chartData.alokasi.reduce((sum, val) => sum + val, 0);

    return NextResponse.json({
      series: [
        {
          name: "PAGU",
          data: chartData.pagu
        },
        {
          name: "Alokasi Periode",
          data: chartData.alokasi
        }
      ],
      categories: chartData.categories,
      summaryData: {
        leftLabel: "Pagu",
        leftValue: `Rp ${totalPagu.toLocaleString()}`,
        rightLabel: "Realisasi",
        rightValue: `Rp ${totalAlokasi.toLocaleString()}`
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}