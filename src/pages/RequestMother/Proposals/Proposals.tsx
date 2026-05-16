import { useEffect, useState } from "react";
import { useProposalStore } from "../../../ZustandShare/ProposalZuts";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";
import {   Divider, Button, } from "@mui/material";
import { AlertTriangle, CheckCircle, Clock, DollarSign, FileText, ListCheck, ShieldCheck, Send, X, XCircle, } from "lucide-react";
import SettingsModal from "../../utils/Modal";
import type { NegotiationType, ProjectType } from "../../../../GlobalTypes";
import { useAuth } from "../../../context/AuthContext";
import { useProjectStore } from "../../../ZustandShare/ProjectZuts";
import { alpha } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

type ProposalRow = {
id: string;
client_request_id?:string
service?: string;
deliverables?: string;
pricing?: number;
timeline?: string;
status?: string;
raw?: any;
};

export function ProposalReviewList() {




const {currentUser} = useAuth()

const {createProjects} = useProjectStore()

const { fetchProposals, proposalReviews, NegotiateProposals, updateProposalStatus } = useProposalStore()

const [selectedProposal, setSelectedProposal]= useState<ProposalRow | null>(null)

const [isOpenModal, setIsOpenModal] = useState<boolean>(false)


// get the project store

const [isNegotiateOpen, setIsNegotiateOpen] = useState(false);
const [negotiationMessage, setNegotiationMessage] = useState(""); 


useEffect(() => {

fetchProposals()
}, [fetchProposals])

useEffect(() => {
console.log(proposalReviews)
}, [proposalReviews])

const navigate = useNavigate();
//  1. DEFINE COLUMNS (table headers)
const columns: GridColDef[] = [
{
field: "service",
headerName: "Service",
flex: 1,
},
// {
// field: "deliverables",
// headerName: "Deliverables",
// flex: 1,
// },
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
const status = params.value?.toLowerCase();

return (
<Chip
label={status}
size="small"
icon={
status === "pending" ? (
  <Clock size={14} />
) : status === "approved" ? (
  <CheckCircle size={14} />
) : (
  <XCircle size={14} />
)
}
sx={{
textTransform: "capitalize",
fontWeight: 500,

backgroundColor:
  status === "pending"
    ? alpha("#2196f3", 0.1) // light blue (like bg-blue-50)
    : status === "approved"
    ? alpha("#4caf50", 0.1) // light green (like bg-green-50)
    : alpha("#9e9e9e", 0.1), // light gray

color:
  status === "pending"
    ? "#2196f3"
    : status === "approved"
    ? "#4caf50"
    : "#666",
}}
/>
);
}



},
];


//  2. TRANSFORM YOUR DATA → ROWS
const rows: ProposalRow[] = proposalReviews?.map((p: any) => {

  const latestVersion = p.versions?.[0];

  return {
    id: p?.id ?? p?._id,
    service: p.service?.ServiceName,
    deliverables: p.deliverables,
    pricing: latestVersion?.amount ?? p.pricing,
    timeline: p.timeline,
    // status: latestVersion?.status ?? p.status,
    status:  p.status,

    raw: p,
  };
}) || [];


//  Function to create a project

async function CreateProject(){
if (!selectedProposal || !currentUser?.id) return;

const serviceId = selectedProposal.raw?.service?.id;

const client_request_id = selectedProposal.raw?.client_request_id;

if (!serviceId || !client_request_id) return

const project: ProjectType = {
service_id: serviceId,
proposal_id: selectedProposal.id,
client_request_id,
client_id: currentUser.id,
projectStatus: "PLANNING"
};


console.log(project)

setSelectedProposal((prev) => (prev ? { ...prev, status: "APPROVED" } : prev))


// await updateProposalStatus(selectedProposal.id, "APPROVED")
await createProjects(project)

setIsOpenModal(false)

}

// navigate



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

    <p className="text-sm text-gray-500 mt-1 tracking-wider ">
     Proposals with request marked Approved has already begun its projects.
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




<div className="flex items-center gap-2">

<p>View all your angoing projects with approved proposals.</p>
<button className="bg-blue-400 p-2 text-white rounded mb-2 active:scale-105 cursor-pointer animate-pulse" onClick={()=>navigate("/projects")}>You can view your projects</button>
</div>



<div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">



  {/* ✅ DATA GRID */}
  <div className="bg-white p-4 rounded-xl shadow">
    <Box sx={{ height: 500 }}>

      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={(params) => {
          console.log(params.row)

          setSelectedProposal(params.row as ProposalRow)
        }}

        sx={{
    "--DataGrid-rowBorderColor": "transparent", // removes horizontal separators
    "& .MuiDataGrid-cell": { borderBottom: "none" }, // fallback
    "& .MuiDataGrid-columnHeaders": { borderBottom: "none" }, // optional (header line)
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
  PROPOSAL ID: <br />
        {selectedProposal.id}
      </p>
    </div>

    {selectedProposal.status && (
      <Chip
        label={selectedProposal.status}
        size="small"
        color={
          selectedProposal.status === "PENDING"
            ? "info"
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
      ₵
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
    <Button
  disabled={
  selectedProposal?.status === "APPROVED" ||
  selectedProposal?.status === "NEGOTIATING"
}
    onClick={()=>setIsOpenModal(true)}
    variant="contained" color="success" fullWidth>
      {selectedProposal.status === "APPROVED" ? "Approved" : "Approve"}
    </Button>

<Button
disabled={selectedProposal.status === "APPROVED" || selectedProposal.status === "NEGOTIATING" }
variant="outlined"
color="error"
fullWidth
onClick={() => setIsNegotiateOpen(true)}
>
{selectedProposal.status === "NEGOTIATING"  ? "Under Negotiation" : "Negotiate"}
</Button>
  </div>
  
  {/* Other projects */}
{selectedProposal.status === "NEGOTIATING" && (
<div className="flex items-center gap-2">
  <Button
    onClick={() => navigate(`/negotiation/${selectedProposal.id}`)}
    variant="outlined"
    color="secondary"
  >
    View Negotiation Details
  </Button>
</div>
)}



</div>
)}
</div>
</aside>
</div>

<SettingsModal isOpen={isOpenModal} onClose={()=>setIsOpenModal(false)}>
<>
<>


{/* Modal */}
<div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
  
  {/* Header */}
  <div className="flex items-center gap-2">
    <AlertTriangle className="text-yellow-500" />
    <h2 className="text-lg font-semibold text-gray-800">
      Confirm Approval
    </h2>
  </div>

  {/* Message */}
  <p className="text-gray-600 mt-3">
    Are you sure you want to approve this request?
  </p>

  {/* Extra info */}
  <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 flex gap-2 items-start">
    <CheckCircle className="text-green-600 mt-0.5" size={18} />
    <p className="text-sm text-green-700">
      Once approved, your project will start immediately and move to the active development stage.
    </p>
  </div>

  {/* Buttons */}
  <div className="flex justify-end gap-3 mt-6">
    
    {/* Cancel */}
    <button className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 cursor-pointer" 
    onClick={()=>setIsOpenModal(false)}
    >
      Cancel
    </button>

    {/* Yes */}
    <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 cursor-pointer" onClick={CreateProject}>
      Yes, Approve
    </button>

  </div>
</div>
</>
</>

</SettingsModal>




<div>
<SettingsModal isOpen={isNegotiateOpen} onClose={() => setIsNegotiateOpen(false)}>
<div className="bg-white w-full max-w-md rounded-2xl border border-gray-100 shadow-lg p-6">

{/* HEADER */}
<div className="mb-5">
<h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
  <AlertTriangle size={18} className="text-red-500" />
  Negotiate Proposal
</h2>

<p className="text-sm text-gray-500 mt-1">
  Send a counter offer before approval.
</p>
</div>

{/* CLIENT INFO CARD */}
<div className="rounded-xl border border-gray-100 bg-white shadow-sm p-4 space-y-3 text-sm">

<div className="flex justify-between">
  <span className="text-gray-500">Service</span>
  <span className="font-medium text-gray-900">
    {selectedProposal?.service || "—"}
  </span>
</div>

<div className="flex justify-between">
  <span className="text-gray-500">Price</span>
  <span className="font-medium text-gray-900">
    ₵{selectedProposal?.pricing || 0}
  </span>
</div>

<div className="flex justify-between">
  <span className="text-gray-500">Timeline</span>
  <span className="font-medium text-gray-900">
    {selectedProposal?.timeline || "—"}
  </span>
</div>

</div>

{/* MESSAGE INPUT */}
<div className="mt-5">
<label className="text-xs text-gray-500 uppercase tracking-wide">
  Negotiation Message
</label>

<textarea
  value={negotiationMessage}
  onChange={(e) => setNegotiationMessage(e.target.value)}
  className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition bg-white"
  rows={4}
  placeholder="e.g. We can reduce scope to adjust pricing..."
/>
</div>

{/* ACTIONS */}
<div className="flex gap-3 mt-6">

{/* CANCEL */}
<Button
  variant="outlined"
  color="inherit"
  fullWidth
  startIcon={<X size={16} />}
  onClick={() => setIsNegotiateOpen(false)}
  sx={{
    borderRadius: "12px",
    textTransform: "none",
    borderColor: "#e5e7eb",
  }}
>
  Cancel
</Button>

{/* SEND */}
<Button
  variant="contained"
  color="error"
  fullWidth
  startIcon={<Send size={16} />}
  disabled={!negotiationMessage.trim()}



  onClick={async () => {


if(!selectedProposal) return

  const NegotiationMessage:NegotiationType = {
    clientId:selectedProposal?.raw.client_id,
    serviceId:selectedProposal.raw.service.id,
      client_request_id:selectedProposal?.raw.client_request_id,
      proposal_id:selectedProposal.id,
      NegotiatingText: negotiationMessage
  }



setSelectedProposal((prev) => (prev ? { ...prev, status: "NEGOTIATING" } : prev))
// await updateProposalStatus(selectedProposal.id, "NEGOTIATING")



await NegotiateProposals(NegotiationMessage)
console.log(NegotiationMessage)


    // console.log("NEGOTIATE MESSAGE:", {
    //   proposalId: selectedProposal?.id,
    //   message: negotiationMessage,
    // });

    setIsNegotiateOpen(false);
    setNegotiationMessage("");
  }}
  sx={{
    borderRadius: "12px",
    textTransform: "none",
  }}
>
  Send Message
</Button>

</div>

</div>
</SettingsModal>
</div>


{/* Negotiate modal */}

</main>
);
}
