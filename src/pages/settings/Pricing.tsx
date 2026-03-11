import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { TrendingUpDownIcon } from "lucide-react";

type PricingPlanType = {
  id: string;
  name: string;
  price: number;
  users: number;
  features: string;
};

/* Dummy UI Data */
const pricingPlans: PricingPlanType[] = [
  {
    id: "1",
    name: "Basic Consulting",
    price: 500,
    users: 2,
    features: "Initial consultation, summary report",
  },
  {
    id: "2",
    name: "Business Advisory",
    price: 1500,
    users: 5,
    features: "3 consulting sessions, strategy report",
  },
  {
    id: "3",
    name: "IT Infrastructure Audit",
    price: 3000,
    users: 10,
    features: "System audit, security report",
  },
  {
    id: "4",
    name: "Digital Transformation",
    price: 4500,
    users: 12,
    features: "Process analysis, digital strategy roadmap",
  },
  {
    id: "5",
    name: "Cybersecurity Assessment",
    price: 5200,
    users: 8,
    features: "Security audit, vulnerability scan, risk report",
  },
  {
    id: "6",
    name: "Corporate Training Package",
    price: 2500,
    users: 25,
    features: "On-site training, course materials, certification",
  },
  {
    id: "7",
    name: "Startup Growth Advisory",
    price: 1800,
    users: 4,
    features: "Market strategy, funding guidance, growth roadmap",
  },
  {
    id: "8",
    name: "Enterprise Transformation",
    price: 7500,
    users: 20,
    features: "Full consulting package, leadership workshops",
  },
  {
    id: "9",
    name: "Cloud Migration Consulting",
    price: 3800,
    users: 10,
    features: "Cloud readiness assessment, migration strategy",
  },
  {
    id: "10",
    name: "Operational Efficiency Review",
    price: 2700,
    users: 6,
    features: "Workflow optimization, performance report",
  },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Service Type", flex: 1 },
  { field: "price", headerName: "Price (₵)", flex: 1 },
  { field: "users", headerName: "User Limit", flex: 1 },
  { field: "features", headerName: "Features", flex: 2 },
];

export default function PricingPlans() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between border rounded border-gray-200 p-3 bg-white shadow-sm">
        <h2 className="text-yellow-900 font-semibold text-sm">
          Pricing Plans
        </h2>

            <button
              className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition active:scale-95 cursor-pointer"
            >
              <TrendingUpDownIcon size={16} />
              Set Up Pricing
            </button>
      </div>

      <span className="text-green-500 text-sm ml-1">
        Available Plans
      </span>

      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={pricingPlans}
          columns={columns}
          density="compact"
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
        />
      </div>
    </div>
  );
}