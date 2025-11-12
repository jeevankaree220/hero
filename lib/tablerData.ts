// Tabler data structures and interfaces

export interface EmployeeRecord {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: string;
  location: string;
  manager: string;
}

export interface ProjectRecord {
  id: number;
  projectName: string;
  client: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  status: string;
  priority: string;
  lead: string;
}

export interface SalesRecord {
  id: number;
  orderDate: string;
  customer: string;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  region: string;
  salesRep: string;
  paymentStatus: string;
}

export interface SheetData {
  id: string;
  name: string;
  columns: any[];
  data: any[];
  type: 'employee' | 'project' | 'sales' | 'custom';
}

// Sample employee data
export const employeeData: EmployeeRecord[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Engineering",
    position: "Senior Developer",
    salary: 95000,
    hireDate: "2022-03-15",
    status: "Active",
    location: "New York",
    manager: "Robert Chen"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 85000,
    hireDate: "2021-07-22",
    status: "Active",
    location: "San Francisco",
    manager: "Lisa Anderson"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    department: "Engineering",
    position: "Frontend Developer",
    salary: 78000,
    hireDate: "2023-01-10",
    status: "Active",
    location: "Austin",
    manager: "Robert Chen"
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@company.com",
    department: "Sales",
    position: "Sales Director",
    salary: 110000,
    hireDate: "2020-05-18",
    status: "Active",
    location: "Chicago",
    manager: "David Martinez"
  },
  {
    id: 5,
    name: "Sophia Lee",
    email: "sophia.lee@company.com",
    department: "HR",
    position: "HR Specialist",
    salary: 65000,
    hireDate: "2022-11-03",
    status: "Active",
    location: "New York",
    manager: "Patricia Taylor"
  },
  {
    id: 6,
    name: "David Kumar",
    email: "david.kumar@company.com",
    department: "Engineering",
    position: "DevOps Engineer",
    salary: 92000,
    hireDate: "2021-09-14",
    status: "Active",
    location: "Seattle",
    manager: "Robert Chen"
  },
  {
    id: 7,
    name: "Jessica Martinez",
    email: "jessica.martinez@company.com",
    department: "Design",
    position: "UI/UX Designer",
    salary: 72000,
    hireDate: "2022-06-20",
    status: "Active",
    location: "Los Angeles",
    manager: "Amanda Wright"
  },
  {
    id: 8,
    name: "Ryan Thompson",
    email: "ryan.thompson@company.com",
    department: "Sales",
    position: "Account Executive",
    salary: 68000,
    hireDate: "2023-02-28",
    status: "Active",
    location: "Boston",
    manager: "James Wilson"
  },
  {
    id: 9,
    name: "Amanda White",
    email: "amanda.white@company.com",
    department: "Finance",
    position: "Financial Analyst",
    salary: 75000,
    hireDate: "2021-12-05",
    status: "Active",
    location: "New York",
    manager: "Thomas Brown"
  },
  {
    id: 10,
    name: "Kevin Park",
    email: "kevin.park@company.com",
    department: "Engineering",
    position: "Backend Developer",
    salary: 88000,
    hireDate: "2022-08-17",
    status: "Active",
    location: "San Francisco",
    manager: "Robert Chen"
  },
  {
    id: 11,
    name: "Linda Garcia",
    email: "linda.garcia@company.com",
    department: "Marketing",
    position: "Content Strategist",
    salary: 70000,
    hireDate: "2023-04-11",
    status: "Active",
    location: "Austin",
    manager: "Michael Chen"
  },
  {
    id: 12,
    name: "Christopher Lee",
    email: "christopher.lee@company.com",
    department: "Operations",
    position: "Operations Manager",
    salary: 82000,
    hireDate: "2020-10-30",
    status: "Active",
    location: "Chicago",
    manager: "Daniel Harris"
  }
];

// Sample project data
export const projectData: ProjectRecord[] = [
  {
    id: 1,
    projectName: "Website Redesign",
    client: "Acme Corporation",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: 150000,
    spent: 87500,
    status: "In Progress",
    priority: "High",
    lead: "Sarah Johnson"
  },
  {
    id: 2,
    projectName: "Mobile App Development",
    client: "TechStart Inc",
    startDate: "2024-02-01",
    endDate: "2024-08-31",
    budget: 250000,
    spent: 125000,
    status: "In Progress",
    priority: "Critical",
    lead: "Emily Rodriguez"
  },
  {
    id: 3,
    projectName: "CRM Integration",
    client: "Global Solutions",
    startDate: "2023-11-01",
    endDate: "2024-03-31",
    budget: 100000,
    spent: 98000,
    status: "Almost Complete",
    priority: "Medium",
    lead: "Kevin Park"
  },
  {
    id: 4,
    projectName: "Data Analytics Platform",
    client: "Finance Corp",
    startDate: "2024-03-15",
    endDate: "2024-12-31",
    budget: 400000,
    spent: 150000,
    status: "In Progress",
    priority: "High",
    lead: "David Kumar"
  },
  {
    id: 5,
    projectName: "E-commerce Portal",
    client: "Retail Masters",
    startDate: "2023-09-01",
    endDate: "2024-02-28",
    budget: 180000,
    spent: 180000,
    status: "Completed",
    priority: "Medium",
    lead: "Sarah Johnson"
  },
  {
    id: 6,
    projectName: "Brand Identity Refresh",
    client: "Fashion Trends",
    startDate: "2024-04-01",
    endDate: "2024-07-15",
    budget: 75000,
    spent: 35000,
    status: "In Progress",
    priority: "Low",
    lead: "Jessica Martinez"
  },
  {
    id: 7,
    projectName: "Cloud Migration",
    client: "Legacy Systems Inc",
    startDate: "2024-01-01",
    endDate: "2024-09-30",
    budget: 320000,
    spent: 210000,
    status: "In Progress",
    priority: "Critical",
    lead: "David Kumar"
  },
  {
    id: 8,
    projectName: "Marketing Campaign",
    client: "Consumer Goods Co",
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    budget: 60000,
    spent: 22000,
    status: "Planning",
    priority: "Medium",
    lead: "Michael Chen"
  }
];

// Sample sales data
export const salesData: SalesRecord[] = [
  {
    id: 1,
    orderDate: "2024-01-05",
    customer: "ABC Electronics",
    product: "Premium Widget Pro",
    quantity: 25,
    unitPrice: 299.99,
    total: 7499.75,
    region: "Northeast",
    salesRep: "James Wilson",
    paymentStatus: "Paid"
  },
  {
    id: 2,
    orderDate: "2024-01-08",
    customer: "Tech Solutions Ltd",
    product: "Standard Widget",
    quantity: 50,
    unitPrice: 149.99,
    total: 7499.50,
    region: "West",
    salesRep: "Ryan Thompson",
    paymentStatus: "Paid"
  },
  {
    id: 3,
    orderDate: "2024-01-12",
    customer: "Innovate Corp",
    product: "Enterprise Suite",
    quantity: 10,
    unitPrice: 999.99,
    total: 9999.90,
    region: "Midwest",
    salesRep: "James Wilson",
    paymentStatus: "Pending"
  },
  {
    id: 4,
    orderDate: "2024-01-18",
    customer: "Mega Retail Chain",
    product: "Premium Widget Pro",
    quantity: 100,
    unitPrice: 289.99,
    total: 28999.00,
    region: "South",
    salesRep: "Ryan Thompson",
    paymentStatus: "Paid"
  },
  {
    id: 5,
    orderDate: "2024-01-22",
    customer: "StartUp Innovators",
    product: "Starter Package",
    quantity: 15,
    unitPrice: 99.99,
    total: 1499.85,
    region: "West",
    salesRep: "James Wilson",
    paymentStatus: "Paid"
  },
  {
    id: 6,
    orderDate: "2024-02-03",
    customer: "Global Manufacturing",
    product: "Enterprise Suite",
    quantity: 25,
    unitPrice: 999.99,
    total: 24999.75,
    region: "Northeast",
    salesRep: "Ryan Thompson",
    paymentStatus: "Paid"
  },
  {
    id: 7,
    orderDate: "2024-02-10",
    customer: "Local Business Hub",
    product: "Standard Widget",
    quantity: 30,
    unitPrice: 149.99,
    total: 4499.70,
    region: "Midwest",
    salesRep: "James Wilson",
    paymentStatus: "Pending"
  },
  {
    id: 8,
    orderDate: "2024-02-15",
    customer: "Digital Services Inc",
    product: "Premium Widget Pro",
    quantity: 40,
    unitPrice: 299.99,
    total: 11999.60,
    region: "South",
    salesRep: "Ryan Thompson",
    paymentStatus: "Paid"
  },
  {
    id: 9,
    orderDate: "2024-02-20",
    customer: "Tech Innovations",
    product: "Enterprise Suite",
    quantity: 5,
    unitPrice: 999.99,
    total: 4999.95,
    region: "West",
    salesRep: "James Wilson",
    paymentStatus: "Paid"
  },
  {
    id: 10,
    orderDate: "2024-02-28",
    customer: "Retail Excellence",
    product: "Standard Widget",
    quantity: 75,
    unitPrice: 149.99,
    total: 11249.25,
    region: "Northeast",
    salesRep: "Ryan Thompson",
    paymentStatus: "Pending"
  }
];

// Employee columns configuration
export const employeeColumns = [
  { title: "ID", field: "id", width: 80, frozen: true, headerSort: true },
  { title: "Name", field: "name", width: 180, editor: "input", headerSort: true },
  { title: "Email", field: "email", width: 220, editor: "input", headerSort: true },
  { title: "Department", field: "department", width: 140, editor: "list",
    editorParams: { values: ["Engineering", "Marketing", "Sales", "HR", "Finance", "Design", "Operations"] },
    headerSort: true
  },
  { title: "Position", field: "position", width: 180, editor: "input", headerSort: true },
  { title: "Salary", field: "salary", width: 120, editor: "number",
    formatter: "money", formatterParams: { precision: 0 }, headerSort: true
  },
  { title: "Hire Date", field: "hireDate", width: 120, editor: "date", headerSort: true },
  { title: "Status", field: "status", width: 100, editor: "list",
    editorParams: { values: ["Active", "On Leave", "Remote"] }, headerSort: true
  },
  { title: "Location", field: "location", width: 140, editor: "input", headerSort: true },
  { title: "Manager", field: "manager", width: 160, editor: "input", headerSort: true }
];

// Project columns configuration
export const projectColumns = [
  { title: "ID", field: "id", width: 80, frozen: true, headerSort: true },
  { title: "Project Name", field: "projectName", width: 200, editor: "input", headerSort: true },
  { title: "Client", field: "client", width: 180, editor: "input", headerSort: true },
  { title: "Start Date", field: "startDate", width: 120, editor: "date", headerSort: true },
  { title: "End Date", field: "endDate", width: 120, editor: "date", headerSort: true },
  { title: "Budget", field: "budget", width: 130, editor: "number",
    formatter: "money", formatterParams: { precision: 0 }, headerSort: true
  },
  { title: "Spent", field: "spent", width: 130, editor: "number",
    formatter: "money", formatterParams: { precision: 0 }, headerSort: true
  },
  { title: "Status", field: "status", width: 140, editor: "list",
    editorParams: { values: ["Planning", "In Progress", "Almost Complete", "Completed", "On Hold"] },
    headerSort: true
  },
  { title: "Priority", field: "priority", width: 100, editor: "list",
    editorParams: { values: ["Low", "Medium", "High", "Critical"] }, headerSort: true
  },
  { title: "Lead", field: "lead", width: 160, editor: "input", headerSort: true }
];

// Sales columns configuration
export const salesColumns = [
  { title: "ID", field: "id", width: 80, frozen: true, headerSort: true },
  { title: "Order Date", field: "orderDate", width: 120, editor: "date", headerSort: true },
  { title: "Customer", field: "customer", width: 180, editor: "input", headerSort: true },
  { title: "Product", field: "product", width: 180, editor: "input", headerSort: true },
  { title: "Quantity", field: "quantity", width: 100, editor: "number", headerSort: true },
  { title: "Unit Price", field: "unitPrice", width: 120, editor: "number",
    formatter: "money", formatterParams: { precision: 2 }, headerSort: true
  },
  { title: "Total", field: "total", width: 130, editor: "number",
    formatter: "money", formatterParams: { precision: 2 }, headerSort: true
  },
  { title: "Region", field: "region", width: 120, editor: "list",
    editorParams: { values: ["Northeast", "South", "Midwest", "West"] }, headerSort: true
  },
  { title: "Sales Rep", field: "salesRep", width: 160, editor: "input", headerSort: true },
  { title: "Payment Status", field: "paymentStatus", width: 140, editor: "list",
    editorParams: { values: ["Pending", "Paid", "Overdue"] }, headerSort: true
  }
];

// Default sheets configuration
export const defaultSheets: SheetData[] = [
  {
    id: "sheet-1",
    name: "Employees",
    columns: employeeColumns,
    data: employeeData,
    type: 'employee'
  },
  {
    id: "sheet-2",
    name: "Projects",
    columns: projectColumns,
    data: projectData,
    type: 'project'
  },
  {
    id: "sheet-3",
    name: "Sales",
    columns: salesColumns,
    data: salesData,
    type: 'sales'
  }
];

// Utility function to generate new row based on sheet type
export function generateNewRow(type: string, id: number): any {
  switch (type) {
    case 'employee':
      return {
        id,
        name: "",
        email: "",
        department: "Engineering",
        position: "",
        salary: 0,
        hireDate: new Date().toISOString().split('T')[0],
        status: "Active",
        location: "",
        manager: ""
      };
    case 'project':
      return {
        id,
        projectName: "",
        client: "",
        startDate: new Date().toISOString().split('T')[0],
        endDate: "",
        budget: 0,
        spent: 0,
        status: "Planning",
        priority: "Medium",
        lead: ""
      };
    case 'sales':
      return {
        id,
        orderDate: new Date().toISOString().split('T')[0],
        customer: "",
        product: "",
        quantity: 0,
        unitPrice: 0,
        total: 0,
        region: "Northeast",
        salesRep: "",
        paymentStatus: "Pending"
      };
    default:
      return { id };
  }
}
