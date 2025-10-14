// Mock data for dashboard widgets

export interface StorageProvider {
  name: string;
  icon: string;
  files: number;
  storage: number;
  maxStorage: number;
  color: string;
}

export interface RecentFile {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  icon: string;
  color: string;
}

export interface WeeklyAnalytic {
  day: string;
  value: number;
}

export interface FileTypeBreakdown {
  type: string;
  count: number;
  size: string;
  icon: string;
  color: string;
}

export interface StorageUsage {
  total: number;
  used: number;
  breakdown: {
    type: string;
    value: number;
    color: string;
  }[];
}

// Storage Providers Data
export const storageProviders: StorageProvider[] = [
  {
    name: "Documents",
    icon: "file-text",
    files: 1328,
    storage: 1.3,
    maxStorage: 5,
    color: "#3B82F6",
  },
  {
    name: "Google Drive",
    icon: "cloud",
    files: 2329,
    storage: 2.9,
    maxStorage: 15,
    color: "#FBBF24",
  },
  {
    name: "One Drive",
    icon: "cloud",
    files: 1916,
    storage: 1.7,
    maxStorage: 5,
    color: "#3B82F6",
  },
  {
    name: "Dropbox",
    icon: "cloud",
    files: 328,
    storage: 1.1,
    maxStorage: 2,
    color: "#06B6D4",
  },
];

// Recent Files Data
export const recentFiles: RecentFile[] = [
  {
    id: "1",
    name: "Xd File",
    type: "xd",
    date: "01-03-2021",
    size: "3.5mb",
    icon: "file",
    color: "#EC4899",
  },
  {
    id: "2",
    name: "Figma File",
    type: "figma",
    date: "27-02-2021",
    size: "19mb",
    icon: "figma",
    color: "#EC4899",
  },
  {
    id: "3",
    name: "Documents",
    type: "doc",
    date: "23-02-2021",
    size: "15mb",
    icon: "file-text",
    color: "#EF4444",
  },
  {
    id: "4",
    name: "Sound File",
    type: "audio",
    date: "21-02-2021",
    size: "40mb",
    icon: "music",
    color: "#F97316",
  },
  {
    id: "5",
    name: "Media",
    type: "video",
    date: "23-02-2021",
    size: "15mb",
    icon: "film",
    color: "#FBBF24",
  },
  {
    id: "6",
    name: "Sals PDF",
    type: "pdf",
    date: "21-02-2021",
    size: "9mb",
    icon: "file-text",
    color: "#10B981",
  },
  {
    id: "7",
    name: "Excel File",
    type: "excel",
    date: "23-02-2021",
    size: "11mb",
    icon: "table",
    color: "#3B82F6",
  },
];

// Weekly Analytics Data
export const weeklyAnalytics: WeeklyAnalytic[] = [
  { day: "Sat", value: 20 },
  { day: "Sun", value: 40 },
  { day: "Mon", value: 60 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 100 },
  { day: "Thu", value: 60 },
  { day: "Fri", value: 80 },
];

// File Type Breakdown Data
export const fileTypeBreakdown: FileTypeBreakdown[] = [
  {
    type: "Documents Files",
    count: 1328,
    size: "1.3GB",
    icon: "file-text",
    color: "#3B82F6",
  },
  {
    type: "Media Files",
    count: 1328,
    size: "15.1GB",
    icon: "film",
    color: "#06B6D4",
  },
  {
    type: "Other Files",
    count: 1228,
    size: "12.7GB",
    icon: "folder",
    color: "#FBBF24",
  },
  {
    type: "Unknown",
    count: 428,
    size: "1.3GB",
    icon: "help-circle",
    color: "#EF4444",
  },
];

// Storage Usage Data
export const storageUsage: StorageUsage = {
  total: 128,
  used: 29.1,
  breakdown: [
    { type: "Documents", value: 8, color: "#3B82F6" },
    { type: "Media", value: 52, color: "#06B6D4" },
    { type: "Other", value: 30, color: "#FBBF24" },
    { type: "Unknown", value: 10, color: "#EF4444" },
  ],
};

