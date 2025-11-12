# Tabler - Enterprise Data Manager

A sophisticated spreadsheet-like application built with **Tabulator.js**, featuring a Google Sheets/Excel aesthetic with enterprise-level functionality.

## Features

### 🎨 Design
- **Google Sheets/Excel Look**: Professional spreadsheet aesthetic with gradient headers and grid borders
- **Custom Styling**: Tailwind CSS + Custom CSS for pixel-perfect design
- **Responsive**: Mobile-friendly with touch-optimized controls
- **Modern UI**: Clean navbar with logo, download, and logout buttons

### 📊 Table Features
- **Editable Cells**: Click any cell to edit (except ID column)
- **Column Sorting**: Click column headers to sort (ascending/descending/no sort)
- **Column Resizing**: Drag column borders to resize
- **Movable Columns**: Drag columns to reorder
- **Row Selection**: Click rows to select, multiple selection support
- **Keyboard Navigation**: Tab, Arrow keys, Enter for navigation
- **Copy/Paste**: Ctrl+C to copy selected cells
- **Frozen Columns**: ID column stays fixed during horizontal scroll

### 🔧 Toolbar Actions
- **Add Row**: Add new empty row at the top
- **Delete Row**: Delete selected rows
- **Search**: Global search or column-specific search
- **Date Filter**: Filter rows by date range
- **Clear Filters**: Reset all filters and search

### 📑 Multi-Sheet Support
- **Sheet Tabs**: Switch between Sheet 1, 2, 3, etc.
- **Add Sheet**: Create new custom sheets
- **Rename Sheet**: Double-click or right-click to rename
- **Delete Sheet**: Right-click to delete (minimum 1 sheet required)
- **Sheet Types**: Pre-configured sheets (Employees, Projects, Sales) + Custom sheets

### 💾 Export Features
- **Excel Export (.xlsx)**: Download as Excel file with formatting
- **CSV Export (.csv)**: Download as CSV for universal compatibility
- **Current Sheet Only**: Exports active sheet data

## File Structure

```
components/tabler/
├── TablerLayout.tsx       # Main layout component with state management
├── TablerNavbar.tsx       # Top navbar with logo and actions
├── TablerTable.tsx        # Tabulator.js wrapper component
├── ToolbarControls.tsx    # Toolbar with add/delete/search/filter
├── SheetTabs.tsx          # Bottom sheet tab management
├── index.ts               # Component exports
└── README.md              # This file

lib/
└── tablerData.ts          # Data structures, interfaces, mock data

app/
└── tabler/
    └── page.tsx           # Page wrapper

app/globals.css            # Custom Tabulator styling (lines 618-913)
```

## Data Structure

### Pre-configured Sheets

#### 1. Employees Sheet
- **Columns**: ID, Name, Email, Department, Position, Salary, Hire Date, Status, Location, Manager
- **Features**: Salary formatting, department dropdown, status dropdown

#### 2. Projects Sheet
- **Columns**: ID, Project Name, Client, Start Date, End Date, Budget, Spent, Status, Priority, Lead
- **Features**: Money formatting, priority levels, status tracking

#### 3. Sales Sheet
- **Columns**: ID, Order Date, Customer, Product, Quantity, Unit Price, Total, Region, Sales Rep, Payment Status
- **Features**: Currency formatting, region dropdown, payment status

### Custom Sheets
- **Default Columns**: ID, Column A, B, C, D
- **Fully Editable**: All columns can be edited
- **Extensible**: Add your own columns and data

## Usage

### Accessing the Page
Navigate to: `http://localhost:3000/tabler`

### Keyboard Shortcuts
- **Tab**: Move to next cell
- **Shift + Tab**: Move to previous cell
- **Arrow Keys**: Navigate cells
- **Enter**: Edit cell (if editable)
- **Escape**: Cancel editing
- **Ctrl + C**: Copy selected cells

### Adding Data
1. Click **Add Row** button in toolbar
2. A new empty row appears at the top
3. Click any cell to start editing
4. Press Enter or Tab to save and move

### Deleting Data
1. Click row(s) to select
2. Click **Delete** button in toolbar
3. Confirm deletion

### Searching Data
1. Choose search scope (All Columns or specific column)
2. Enter search term
3. Click **Search** button
4. Click **Clear Filters** to reset

### Date Filtering
1. Click **Date Filter** button
2. Select start and end dates
3. Click **Apply Date Filter**
4. Works on any date column in the sheet

### Managing Sheets
- **Switch Sheet**: Click sheet tab at bottom
- **Add Sheet**: Click **+** button
- **Rename**: Double-click sheet tab or right-click → Rename
- **Delete**: Right-click sheet tab → Delete Sheet

### Exporting Data
1. Click **Download** button in navbar
2. Choose format:
   - **Excel (.xlsx)**: Preserves formatting
   - **CSV (.csv)**: Plain text format
3. File downloads automatically

## Styling

### Color Palette
- **Headers**: `#f8f9fa` → `#f1f3f4` gradient
- **Borders**: `#e0e0e0` (light gray)
- **Hover**: `#f5f8ff` (light blue)
- **Selected**: `#e8f0fe` (blue tint)
- **Focus**: `var(--softorange)` (#f77103) border
- **Background**: `white` and `#fafafa` alternating

### Typography
- **Font**: System fonts (Arial, Segoe UI, San Francisco)
- **Size**: 13px base (12px on mobile)
- **Numbers**: Monospace for money values

### Responsive Breakpoints
- **Mobile** (< 768px): Reduced padding, smaller font
- **Tablet** (768px - 1024px): Optimized spacing
- **Desktop** (> 1024px): Full features

## Technical Details

### Dependencies
- **tabulator-tables**: ^6.4.0 (table functionality)
- **React**: ^19.1.0
- **Next.js**: ^15.5.4
- **TypeScript**: ^5.x
- **Tailwind CSS**: ^4.x

### State Management
- **Local State**: React useState hooks
- **No Redux**: Lightweight, component-level state
- **Data Persistence**: In-memory (can be extended with localStorage/API)

### Performance
- **Virtual Rendering**: Tabulator handles large datasets efficiently
- **Lazy Loading**: Only renders visible rows
- **Optimized Re-renders**: React.memo and useRef for table instance

### Browser Support
- **Chrome**: ✅ Full support
- **Firefox**: ✅ Full support
- **Safari**: ✅ Full support
- **Edge**: ✅ Full support
- **Mobile**: ✅ Touch-optimized

## Customization

### Adding New Sheet Types
Edit `lib/tablerData.ts`:

```typescript
export const customColumns = [
  { title: "ID", field: "id", width: 80, frozen: true },
  { title: "Your Column", field: "yourField", width: 150, editor: "input" },
  // Add more columns...
];

export const customData = [
  { id: 1, yourField: "value" },
  // Add more rows...
];
```

### Changing Colors
Edit `app/globals.css` (lines 618-913) or use CSS variables:
- `var(--midnight)`: Dark blue
- `var(--softorange)`: Orange accent
- `var(--mist)`: Light gray borders

### Adding Validators
Edit `TablerTable.tsx` column config:

```typescript
{
  title: "Email",
  field: "email",
  editor: "input",
  validator: ["required", "email"]
}
```

## Troubleshooting

### Table Not Rendering
- Check browser console for errors
- Ensure `tabulator-tables` is installed
- Verify CSS is loaded

### Data Not Saving
- Data is in-memory only by default
- Implement `localStorage` or API calls in `TablerLayout.tsx`
- Listen to `onDataChange` events

### Styles Not Applying
- Clear browser cache
- Check CSS specificity
- Ensure `globals.css` is imported

### Export Not Working
- Check browser pop-up blocker
- Ensure Tabulator download module is loaded
- Verify data is present in table

## Future Enhancements

### Potential Features
- [ ] Formula support (SUM, AVERAGE, etc.)
- [ ] Cell formatting (bold, italic, colors)
- [ ] Conditional formatting rules
- [ ] Data validation rules
- [ ] Charts and graphs
- [ ] Real-time collaboration
- [ ] Version history
- [ ] Import from Excel/CSV
- [ ] Auto-save with localStorage
- [ ] API integration for backend storage
- [ ] User permissions (view/edit)
- [ ] Cell comments
- [ ] Print optimization
- [ ] Dark mode support

## Credits

Built with:
- [Tabulator](https://tabulator.info/) - Interactive table library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide Icons](https://lucide.dev/) - Icon library

---

**Need Help?** Check the [Tabulator documentation](https://tabulator.info/docs) for advanced features.
