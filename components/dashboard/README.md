# Dashboard UI Components

A modern, responsive dashboard interface with data visualization and file management features.

## Features

### 🎨 Design System
- **Color Palette**: Midnight (#1A2B4C), Sky Mist (#E6EEF7), Soft Orange (#F4A261)
- **Typography**: Josefin Sans for headings, EB Garamond for body
- **Icons**: Lucide React icon library
- **Animations**: Fade-in, slide-in, hover effects

### 📊 Components

#### StorageOverview
4-column grid of cloud storage providers with:
- Animated progress bars
- File count and storage usage
- Hover effects with shadow elevation
- Staggered animation on load

#### StorageDonutChart
Donut chart visualization with:
- Recharts PieChart integration
- Animated number counter (CountUp)
- File type breakdown list
- Total storage usage display

#### RecentFilesTable
Sortable table with:
- File name, date, size columns
- Colored file type icons
- Hover row highlighting
- Sort by any column (ASC/DESC)

#### WeeklyAnalyticsChart
Bar chart for analytics with:
- 7-day week view
- Gradient bar fills
- Responsive sizing
- Grid lines and axis labels

#### Header
Top navigation bar featuring:
- Page title
- Search bar (desktop) / search icon (mobile)
- Notification bell with badge
- User avatar with dropdown menu

#### Sidebar
Left navigation panel with:
- 8 menu items with icons
- Active state highlighting
- Upgrade CTA card
- Logout button
- Mobile responsive drawer

### 📱 Responsive Design

**Mobile (<768px)**
- Stacked card layouts
- Collapsible sidebar (hamburger menu)
- Search icon instead of search bar
- Full-width tables with horizontal scroll

**Tablet (768-1024px)**
- 2-column grid for storage cards
- Visible sidebar
- Optimized spacing

**Desktop (>1024px)**
- 4-column grid for storage cards
- Fixed sidebar
- 2/3 + 1/3 split for main content
- Full feature set

### 🎭 Animations & Interactions

- **Page Load**: Fade-in animation (300ms)
- **Card Hover**: Shadow elevation + translate-y
- **Progress Bars**: Width transition (500ms)
- **Number Counters**: CountUp animation on mount
- **Charts**: Recharts built-in animations
- **Button Hover**: Color transitions + transform
- **Notification Badge**: Pulse animation

### 🔧 Technical Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4 with custom variables
- **Charts**: Recharts 2.15
- **Icons**: Lucide React
- **Animations**: CSS keyframes + CountUp
- **Date**: date-fns

### 📂 File Structure

```
components/dashboard/
├── DashboardLayout.tsx          # Main layout wrapper
├── Header.tsx                   # Top navigation
├── Sidebar.tsx                  # Left navigation
├── index.ts                     # Component exports
└── widgets/
    ├── AddNewButton.tsx         # CTA button
    ├── StorageOverview.tsx      # Storage cards grid
    ├── StorageDonutChart.tsx    # Donut chart + breakdown
    ├── RecentFilesTable.tsx     # Sortable file table
    └── WeeklyAnalyticsChart.tsx # Bar chart
```

### 🎯 Usage

```tsx
import { DashboardLayout } from '@/components/dashboard';

export default function DashboardPage() {
  return <DashboardLayout />;
}
```

### 🎨 Customization

#### Colors
Edit `app/globals.css` to change the color variables:
```css
:root {
  --midnight: #1A2B4C;
  --skymist: #E6EEF7;
  --softorange: #F4A261;
  /* ... */
}
```

#### Mock Data
Edit `lib/mockData.ts` to change dashboard content:
- `storageProviders[]` - Cloud storage cards
- `recentFiles[]` - File table data
- `weeklyAnalytics[]` - Chart data
- `fileTypeBreakdown[]` - Storage breakdown

#### Menu Items
Edit `components/dashboard/Sidebar.tsx`:
```tsx
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  // Add more items...
];
```

### ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states with ring styling
- Color contrast ratios meet WCAG AA
- Screen reader friendly

### 🚀 Performance

- Lazy loading chart components
- Memoized expensive calculations
- Debounced search input
- Optimized re-renders
- Smooth 60fps animations

### 📝 Notes

- All components are client-side ("use client")
- Responsive breakpoints: 768px (md), 1024px (lg), 1280px (xl)
- Color variables support dark mode (defined but not active)
- Charts are fully responsive with ResponsiveContainer

