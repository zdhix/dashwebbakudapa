// src/lib/googleSheets.ts
import { google } from 'googleapis';
import { sheets_v4 } from 'googleapis/build/src/apis/sheets/v4';

// Types for the sheet data
export interface UserData {
  userName: string;
  [key: string]: string | number; // For dynamic column data
}

export interface ColumnMapping {
  userName: string;
  [key: string]: string; // Map of your data columns to sheet columns
}

export class GoogleSheetsClient {
  private sheets: sheets_v4.Sheets;
  private columnMapping: ColumnMapping;
  private headerRow: string[] = [];

  constructor(columnMapping: ColumnMapping) {
    this.columnMapping = columnMapping;
    this.initialize();
  }

  private async initialize() {
    const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '{}'),
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    await this.fetchHeaders();
  }

  private async fetchHeaders() {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Sheet1!1:1', // First row for headers
    });

    this.headerRow = response.data.values?.[0] ?? [];
  }

  private getColumnIndex(columnName: string): number {
    return this.headerRow.findIndex(header => header === columnName);
  }

  async getUserData(userName: string): Promise<UserData | null> {
    if (!this.sheets) {
      await this.initialize();
    }

    try {
      // Get all data
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: 'Sheet1!A2:Z', // Adjust range as needed
      });

      const rows = response.data.values ?? [];
      const userNameIndex = this.getColumnIndex(this.columnMapping.userName);

      // Find the row with matching username
      const userRow = rows.find(row => row[userNameIndex] === userName);

      if (!userRow) {
        return null;
      }

      // Convert row data to structured object
      const userData: UserData = {
        userName: userName,
      };

      // Map other columns based on columnMapping
      Object.entries(this.columnMapping).forEach(([key, sheetColumn]) => {
        const columnIndex = this.getColumnIndex(sheetColumn);
        if (columnIndex !== -1) {
          userData[key] = userRow[columnIndex];
        }
      });

      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data');
    }
  }
}

// Create a configured client instance
export const createSheetsClient = (columnMapping: ColumnMapping) => {
  return new GoogleSheetsClient(columnMapping);
};