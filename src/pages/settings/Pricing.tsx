import { useState } from "react";
import { DataGrid, type GridColDef, type GridRowParams } from "@mui/x-data-grid";
import { TrendingUpDownIcon, X } from "lucide-react";
import SettingsModal from "../utils/Modal";
import { useNavigate } from "react-router-dom";

type PricingPlanType = {
  id: string;
  name: string;
  price: number;
  users: number;
  features: string;
};

/* Dummy UI Data */
export const pricingPlans: PricingPlanType[] = [
  { id: "1", name: "Counselling Services", price: 500, users: 2, features: "Initial consultation session, guidance report, follow-up support" },
  { id: "2", name: "Executive Coaching", price: 1500, users: 5, features: "Leadership coaching sessions, performance strategy, progress evaluation" },
  { id: "3", name: "People & HR Solutions", price: 3000, users: 10, features: "HR policy review, employee engagement strategy, HR advisory support" },
  { id: "6", name: "Business Advisory", price: 2500, users: 25, features: "Business strategy consulting, financial guidance, growth planning" },
  { id: "7", name: "Corporate Events Management", price: 1800, users: 4, features: "Event planning, logistics coordination, corporate program management" },
  { id: "8", name: "System Development", price: 7500, users: 20, features: "Custom system design, development, deployment and training" },
  { id: "9", name: "Cloud Migration Consulting", price: 3800, users: 10, features: "Cloud readiness assessment, migration planning, infrastructure guidance" },
  { id: "10", name: "Operational Efficiency Review", price: 2700, users: 6, features: "Operational assessment, workflow optimization, performance report" },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Service Type", flex: 1 },
  { field: "price", headerName: "Price (₵)", flex: 1 },
  { field: "users", headerName: "User Limit", flex: 1 },
  { field: "features", headerName: "Features", flex: 2 },
];

export default function PricingPlans() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  function goToPlan(params: GridRowParams<PricingPlanType>) {
    navigate(`/settings/pricing/${params.row.id}`);
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between border rounded border-gray-200 p-3 bg-white shadow-sm">
        <h2 className="text-yellow-900 font-semibold text-sm">
          Pricing Plans
        </h2>

        <button
          className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition active:scale-95 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <TrendingUpDownIcon size={16} />
        Set Up Pricing
        </button>
      </div>

      {/* Table */}
      <span className="text-green-500 text-sm ml-1">Available Plans</span>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={pricingPlans}
          columns={columns}
          density="compact"
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          onRowClick={goToPlan}
                  getRowClassName={()=>"hover:cursor-pointer"}
                    getRowHeight={() => "auto"}
                    sx={{
                      "& .MultiGrid-Cell": {
                        whiteSpace: "normal",
                        wordBreak: "break-word"
                      }
                    }}
        />
      </div>

      {/* Modal UI Only */}
    <SettingsModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  className="bg-white max-w-3xl p-6 rounded-lg shadow-lg"
>
  <div className="flex flex-col gap-4">
    {/* Modal Header */}
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800">Add New Pricing Plan</h2>
      <X
        className="text-red-600 cursor-pointer hover:text-red-700 transition"
        onClick={() => setIsOpen(false)}
      />
    </div>
    <hr className="border-gray-300" />

    {/* 3 Columns Form */}
    <div className="grid md:grid-cols-3 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Plan Name</label>
        <input
          type="text"
          placeholder="e.g., Executive Coaching"
          className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Price (₵)</label>
        <input
          type="number"
          placeholder="e.g., 1500"
          className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">User Limit</label>
        <input
          type="number"
          placeholder="e.g., 5"
          className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
      </div>
    </div>

    {/* Features - Full Width */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Features</label>
      <input
        type="text"
        placeholder="e.g., Consultation, report, follow-up"
        className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
      />
    </div>

    {/* Save Button */}
    <button className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium w-full">
      Save Pricing Plan
    </button>
  </div>
</SettingsModal>
    </div>
  );
}
