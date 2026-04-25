import { useEffect, useState } from "react";
import { useProposalStore } from "../../../ZustandShare/ProposalZuts";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";
import { Card, CardContent, Typography,  Divider, Button, Stack } from "@mui/material";
import { Clock, DollarSign, FileText, ListCheck, ShieldCheck } from "lucide-react";
type ProposalRow = {
  id: string;
  service?: string;
  deliverables?: string;
  pricing?: number;
  timeline?: string;
  status?: string;
  raw?: any;
};

export function ProposalReviewList() {

  const { fetchProposals, proposalReviews } = useProposalStore()

  const [selectedProposal, setSelectedProposal]= useState<ProposalRow | null>(null)

  useEffect(() => {
    fetchProposals()
  }, [fetchProposals])

  useEffect(() => {
    console.log(proposalReviews)
  }, [proposalReviews])


  // ✅ 1. DEFINE COLUMNS (table headers)
  const columns: GridColDef[] = [
    {
      field: "service",
      headerName: "Service",
      flex: 1,
    },
    {
      field: "deliverables",
      headerName: "Deliverables",
      flex: 1,
    },
    {
      field: "pricing",
      headerName: "Price",
      flex: 0.5,
    },
    {
      field: "timeline",
      headerName: "Timeline",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      renderCell: (params) => {
        const status = params.value;

        return (
          <Chip
            label={status}
            color={
              status === "PENDING"
                ? "warning"
                : status === "APPROVED"
                ? "success"
                : "default"
            }
            size="small"
          />
        );
      },
    },
  ];


  // ✅ 2. TRANSFORM YOUR DATA → ROWS
  const rows: ProposalRow[] = proposalReviews?.map((p: any) => ({
    id: p.id, // REQUIRED
    service: p.service?.ServiceName,
    deliverables: p.deliverables,
    pricing: p.pricing,
    timeline: p.timeline,
    status: p.status,
    raw: p,
  })) || [];


  return (
    <main className="w-full bg-gray-50 p-6">

      {/* Header */}
      <div className="w-full mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Proposal Reviews
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and manage submitted proposals in one place.
        </p>
      </div>

      {/* Filters */}
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="flex gap-3">

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Sort By</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>

        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">

        {/* ✅ DATA GRID */}
        <div className="bg-white p-4 rounded-xl shadow">
          <Box sx={{ height: 500 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              onRowClick={(params) => {
                setSelectedProposal(params.row as ProposalRow)
              }}
              sx={{
                "& .MuiDataGrid-row": { cursor: "pointer" },
              }}
            />
          </Box>
        </div>

        {/* ✅ RIGHT SIDE DETAILS */}

<aside className="lg:sticky lg:top-6">
  <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 max-h-[520px] overflow-y-auto">

    {!selectedProposal ? (
      <p className="text-sm text-gray-500">
        Click a row to preview the proposal details here.
      </p>
    ) : (
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedProposal.service || "Proposal"}
            </h2>
            <p className="text-xs text-gray-500">
              ID: {selectedProposal.id}
            </p>
          </div>

          {selectedProposal.status && (
            <Chip
              label={selectedProposal.status}
              size="small"
              color={
                selectedProposal.status === "PENDING"
                  ? "warning"
                  : selectedProposal.status === "APPROVED"
                  ? "success"
                  : "default"
              }
            />
          )}
        </div>

        <Divider />

        {/* QUICK INFO */}
        <div className="space-y-4 text-sm">

          <div className="flex items-center gap-3">
            <DollarSign size={16} className="text-gray-400" />
            <span className="text-gray-500 w-24">Price</span>
            <span className="font-medium text-gray-900">
              {selectedProposal.pricing ?? "—"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={16} className="text-gray-400" />
            <span className="text-gray-500 w-24">Timeline</span>
            <span className="font-medium text-gray-900">
              {selectedProposal.timeline || "—"}
            </span>
          </div>

        </div>

        <Divider />

        {/* DELIVERABLES */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <ListCheck size={16} />
            <span className="text-sm font-medium">Deliverables</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {selectedProposal.deliverables || "—"}
          </p>
        </div>

        {/* SCOPE */}
        {selectedProposal.raw?.scope && (
          <>
            <Divider />
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <FileText size={16} />
                <span className="text-sm font-medium">Scope</span>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedProposal.raw.scope}
              </p>
            </div>
          </>
        )}

        {/* TERMS */}
        {selectedProposal.raw?.termsAndConditions && (
          <>
            <Divider />
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <ShieldCheck size={16} />
                <span className="text-sm font-medium">Terms</span>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedProposal.raw.termsAndConditions}
              </p>
            </div>
          </>
        )}

        <Divider />

        {/* ACTIONS */}
        <div className="flex gap-3 pt-1">
          <Button variant="contained" color="success" fullWidth>
            Approve
          </Button>
          <Button variant="outlined" color="error" fullWidth>
            Reject
          </Button>
        </div>

      </div>
    )}
  </div>
</aside>
      </div>

    </main>
  );
}
