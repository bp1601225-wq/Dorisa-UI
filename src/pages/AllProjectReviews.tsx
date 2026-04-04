import { useEffect } from "react"
import { useProjectsStore } from "../ZustandShare/ProjectsZuts"

import { DataGrid } from "@mui/x-data-grid"
import type { GridColDef } from "@mui/x-data-grid"
import { Chip } from "@mui/material"

const ProjectList = () => {
  const { projects, fetchProjects } = useProjectsStore()

  useEffect(() => {
    fetchProjects()
  }, [])

  // Transform data for DataGrid
  const rows = projects.map((project: any) => {
    const { id, scope, pricing, timeline, status, service, client } = project

    const fullName = [
      client?.firstName,
      client?.middleName,
      client?.lastName,
    ]
      .filter(Boolean)
      .join(" ")

    return {
      id,
      scope,
      pricing,
      timeline,
      status,
      serviceName: service?.ServiceName,
      clientName: fullName,
      clientEmail: client?.email,
    }
  })

  // Columns
  const columns: GridColDef[] = [
    { field: "clientName", headerName: "Client", flex: 1 },
    { field: "clientEmail", headerName: "Email", flex: 1 },
    { field: "serviceName", headerName: "Service", flex: 1 },
    { field: "scope", headerName: "Scope", flex: 1 },
    { field: "pricing", headerName: "Pricing", width: 120 },
    { field: "timeline", headerName: "Timeline", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === "APPROVED"
              ? "success"
              : params.value === "PENDING"
              ? "warning"
              : "error"
          }
        />
      ),
    },
  ]

  return (
    <div style={{ height: 500, width: "100%" }}>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        disableRowSelectionOnClick
        density="compact"
        showToolbar
      />

    </div>
  )
}

export default ProjectList