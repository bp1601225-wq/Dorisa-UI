import { useEffect, useState } from "react"
import { useProjectsStore } from "../ZustandShare/ProjectsZuts"

import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import { Button, Chip } from "@mui/material"
import {
  Briefcase,
  CheckCircle,
  FileText,
  LayoutDashboard,
  MessageSquareWarning,
  Notebook,
  Users2Icon,
} from "lucide-react"
import { useAuth } from "../context/AuthContext"
import SettingsModal from "./utils/Modal"

const ProjectList = () => {


  
  // Access shared project data and auth metadata
  const { projects, fetchProjects } = useProjectsStore()
  const { currentUser } = useAuth()

  // Local UI state for selection and modal control
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [openNegotiateModal, setOpenNegotiateModal] = useState(false)
  const [negotiationText, setNegotiationText] = useState("")
  const [openApproveModal, setOpenApproveModal] = useState(false)

  // Load reviews once on component mount
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Keep an eye on payload shape while the UI stabilizes
  useEffect(() => {
    console.log("All projects:", projects)
  }, [projects])

  // Transform the API data for the DataGrid and client display panel
  const rows = projects.map((project: any) => {
    const { id, scope, deliverables, pricing, timeline, status, service, client } = project

    const clientName = [
      client?.firstName,
      client?.middleName,
      client?.lastName,
    ]
      .filter(Boolean)
      .join(" ")

    // The client identifier can arrive under several keys depending on the endpoint,
    // so we try common variants before falling back to undefined.
    const clientId =
      client?.id ??
      client?._id ??
      client?.clientId ??
      client?.client_id ??
      project.clientId ??
      project.client_id ??
      undefined

    return {
      id,
      scope,
      pricing,
      timeline,
      deliverables,
      status,
      clientId,
      serviceName: service?.ServiceName,
      clientName,
      clientEmail: client?.email,
    }
  })

  // Define the columns that appear in the DataGrid
  const columns: GridColDef[] = [
    { field: "clientName", headerName: "Client", flex: 1 },
    { field: "serviceName", headerName: "Service", flex: 1 },
    { field: "pricing", headerName: "Price", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor:
              params.value === "APPROVED"
                ? "#dcfce7"
                : params.value === "PENDING"
                ? "#dbeafe"
                : "#fee2e2",
            color:
              params.value === "APPROVED"
                ? "#166534"
                : params.value === "PENDING"
                ? "#1e3a8a"
                : "#991b1b",
          }}
        />
      ),
    },
  ]

  // Compute top-level stats for the dashboard summary cards
  const total = rows.length
  const pending = rows.filter((r) => r.status === "PENDING").length
  const approved = rows.filter((r) => r.status === "APPROVED").length
  const rejected = rows.filter((r) => r.status === "REJECTED").length

  // Render the right-hand panel differently depending on the viewer role
  function DisplayPanelsForRoles() {
    if (!currentUser) return null

    const orderPanel = (
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            {selectedProject?.clientName}
          </h2>
          <p className="text-sm text-slate-500">
            {selectedProject?.clientEmail}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Service</p>
          <p className="text-slate-700">{selectedProject?.serviceName}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Scope</p>
          <p className="text-sm text-slate-600">{selectedProject?.scope}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Price</p>
          <p className="text-lg font-semibold text-slate-800">
            GHS {selectedProject?.pricing}
          </p>
        </div>

        <hr />

        <div className="flex gap-2 items-center text-sm">
          Status:
          <Chip
            label={selectedProject?.status ?? "�"}
            sx={{
              backgroundColor:
                selectedProject?.status === "APPROVED"
                  ? "#dcfce7"
                  : selectedProject?.status === "PENDING"
                  ? "#dbeafe"
                  : "#fee2e2",
              color:
                selectedProject?.status === "APPROVED"
                  ? "#166534"
                  : selectedProject?.status === "PENDING"
                  ? "#1e3a8a"
                  : "#991b1b",
            }}
          />
        </div>
      </div>
    )

    if (currentUser.role === "Client") {
      return (
        <div className="col-span-12 md:col-span-4 bg-white rounded-2xl shadow p-5 border border-slate-100">
          {!selectedProject ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 text-sm">
              <Briefcase className="text-green-300" />
              <p className="mb-2">Select a project</p>
              <p>to view details and take action</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orderPanel}
              <div className="flex flex-col gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex gap-2 items-center text-sm font-medium text-blue-700">
                  <Notebook size={16} />
                  Proposal actions
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: "#16a34a" }}
                    onClick={() => setOpenApproveModal(true)}
                    disabled={!selectedProject}
                  >
                    Approve
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => setOpenNegotiateModal(true)}
                    disabled={!selectedProject}
                  >
                    Negotiate
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="col-span-12 md:col-span-4 bg-white rounded-2xl shadow p-5 border border-slate-100">
        {!selectedProject ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 text-sm">
            <Briefcase className="text-green-300" />
            <p className="mb-2">Select a project</p>
            <p>to view details and take action</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orderPanel}
            <div className="flex flex-col gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
                <Notebook size={16} />
                Provider notes
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header summary */}
      <div className="flex items-start justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              Projects Dashboard
              <FileText size={16} className="text-slate-400" />
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage client proposals, approvals, and project progress
            </p>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl shadow bg-white border border-slate-100">
          <p className="text-xs text-slate-400">Total Projects</p>
          <p className="text-xl font-semibold text-slate-800">{total}</p>
        </div>
        <div className="p-4 rounded-2xl shadow bg-blue-50 border border-blue-100">
          <p className="text-xs text-blue-400">Pending Review</p>
          <p className="text-xl font-semibold text-blue-700">{pending}</p>
        </div>
        <div className="p-4 rounded-2xl shadow bg-green-50 border border-green-100">
          <p className="text-xs text-green-400">Approved</p>
          <p className="text-xl font-semibold text-green-700">{approved}</p>
        </div>
        <div className="p-4 rounded-2xl shadow bg-red-50 border border-red-100">
          <p className="text-xs text-red-400">Rejected</p>
          <p className="text-xl font-semibold text-red-700">{rejected}</p>
        </div>
      </div>

      {/* Informational callout */}
      <p className="flex items-center gap-2 text-sm text-slate-600">
        <Users2Icon size={16} className="text-blue-500" />
        Monitor pending requests and take action on client proposals
      </p>

      {/* Selected client identifier bar */}
      {selectedProject && (
        <div className="mb-3 flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <Users2Icon size={16} className="text-blue-500" />
            <span className="text-xs text-slate-400">Client ID</span>
          </div>
          <span className="text-xs font-mono text-slate-700">
            {selectedProject.clientId ?? "�"}
          </span>
        </div>
      )}

      {/* Table + Right panel grid */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8 bg-white rounded-2xl shadow p-4 border border-slate-100">
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={(params) => setSelectedProject(params.row)}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 8, page: 0 } },
            }}
            density="compact"
            showToolbar
          />
        </div>

        {DisplayPanelsForRoles()}
      </div>

      {/* Approval modal */}
      {openApproveModal && (
        <SettingsModal isOpen={openApproveModal} onClose={() => setOpenApproveModal(false)}>
          <div className="p-5 space-y-5 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <CheckCircle size={20} />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Approve Project</h2>
            </div>

            <p className="text-sm text-slate-600">
              You are about to approve this project. This action will confirm the proposal and move it forward.
            </p>

            {selectedProject && (
              <div className="bg-slate-50 border rounded-xl p-4 space-y-2 text-sm">
                <p>
                  <span className="text-slate-400">Client:</span> {selectedProject.clientName}
                </p>
                <p>
                  <span className="text-slate-400">Service:</span> {selectedProject.serviceName}
                </p>
                <p>
                  <span className="text-slate-400">Price:</span> GHS {selectedProject.pricing}
                </p>
                <p>
                  <span className="text-slate-400">Scope:</span> {selectedProject.scope}
                </p>
                <p>
                  <span className="text-slate-400">Deliverables:</span> {selectedProject.deliverables}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outlined" onClick={() => setOpenApproveModal(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#16a34a" }}
                startIcon={<CheckCircle size={16} />}
                onClick={() => {
                  console.log("Approved:", selectedProject)
                  setOpenApproveModal(false)
                }}
              >
                Confirm Approval
              </Button>
            </div>
          </div>
        </SettingsModal>
      )}

      {/* Negotiate modal */}
      {openNegotiateModal && (
        <SettingsModal
          isOpen={openNegotiateModal}
          onClose={() => setOpenNegotiateModal(false)}
        >
          <div className="p-6 bg-white space-y-6 w-full max-w-md">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-red-50 text-red-600">
                <MessageSquareWarning size={22} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Negotiate Project</h2>
                <p className="text-sm text-slate-500">
                  Propose changes to pricing, scope, or timeline.
                </p>
              </div>
            </div>

            {selectedProject && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <p className="text-sm font-medium text-slate-800">
                  {selectedProject.clientName}
                </p>
                <p className="text-xs text-slate-500">{selectedProject.serviceName}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Current Price</span>
                  <span className="text-sm font-semibold text-slate-700">
                    GHS {selectedProject.pricing}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Your Message</label>
              <textarea
                className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition resize-none"
                rows={4}
                placeholder="e.g. Can we adjust the price to GHS 5,000 or extend the timeline?"
                value={negotiationText}
                onChange={(e) => setNegotiationText(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button onClick={() => setOpenNegotiateModal(false)} className="!text-slate-600">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<MessageSquareWarning size={16} />}
                disabled={!negotiationText.trim()}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 500,
                  px: 3,
                }}
                onClick={() => {
                  console.log("Negotiation:", negotiationText)
                  console.log("Project:", selectedProject)
                  setOpenNegotiateModal(false)
                  setNegotiationText("")
                }}
              >
                Send Request
              </Button>
            </div>
          </div>
        </SettingsModal>
      )}
    </div>
  )
}

export default ProjectList
