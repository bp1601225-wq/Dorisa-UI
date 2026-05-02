import { useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import {
  Briefcase,
  User,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
} from "lucide-react";






import { useProjectStore } from "../../../ZustandShare/ProjectZuts";
import SettingsModal from "../../utils/Modal";
import { toast } from "sonner";
import type { ProjectType, UserType } from "../../../../GlobalTypes";

export default function Projects() {
  const { fetchProjects, projects } = useProjectStore();

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const [selectedValue, setSelectedValue] = useState<number | null>(null);


const {updateProjectProgressAPI} = useProjectStore()

  const selected: ProjectType | null = useMemo(() => {
    if (!selectedProjectId) return null;
    return projects.find((p) => p.id === selectedProjectId) ?? null;
  }, [projects, selectedProjectId]);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    fetchProjects()
      .catch(() => {
        // store already handles toast/errors; keep UI flow consistent
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [fetchProjects]);

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProjectId((prev) => {
        if (prev && projects.some((p) => p.id === prev)) return prev;
        return projects[0].id!;
      });
    } else {
      setSelectedProjectId(null);
    }
  }, [projects]);


const progressOptions = [0, 20, 40, 60, 80, 100]

function getClientDisplayName(client?: UserType) {
  if (!client) return "—";

  if ("fullName" in client && client.fullName) return client.fullName;

  if ("firstName" in client || "lastName" in client || "middleName" in client) {
    const nameParts = [
      "firstName" in client ? client.firstName : undefined,
      "middleName" in client ? client.middleName : undefined,
      "lastName" in client ? client.lastName : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    if (nameParts) return nameParts;
  }

  if ("companyName" in client && client.companyName) return client.companyName;
  if ("contactPerson" in client && client.contactPerson) return client.contactPerson;

  return client.email ?? "—";
}


function updateProjectProgress(projectId: string, progress: number | null) {
  if (progress === null || progress === undefined) {
    toast.error("Please select a progress value first");
    return;
  }

  switch (progress) {
    case 0:
      toast.message("Progress set to 0% — not started yet");
      break;
    case 20:
      toast.message("Progress is at 20% — just started");
      break;
    case 40:
      toast.message("Progress is 40% — getting there");
      break;
    case 60:
      toast.message("Progress is 60% — halfway done");
      break;
    case 80:
      toast.message("Progress is 80% — almost complete");
      break;
    case 100:
      toast.success("Project completed 🎉");
      break;
  }

  updateProjectProgressAPI(projectId, progress);
}

function getProgressColor(progress: number) {
  if (progress <= 0) return "bg-gray-400";
  if (progress <= 20) return "bg-red-500";
  if (progress <= 40) return "bg-orange-500";
  if (progress <= 60) return "bg-yellow-500";
  if (progress <= 80) return "bg-blue-500";
  return "bg-green-500";
}

function formatStatus(status: string) {
  switch (status) {
    case "PLANNING":
      return "Planning";

    case "IN_PROGRESS":
      return "In Progress";

    case "ON_HOLD":
      return "On Hold";

    case "COMPLETED":
      return "Completed";

    case "CANCELLED":
      return "Cancelled";

    default:
      return status;
  }
}


function getStatusColor(status: string) {
  if (!status) return



  switch (status) {


    case "PLANNING":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "IN_PROGRESS":
      return "bg-green-50 text-green-700 border-green-200";

    case "ON_HOLD":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "COMPLETED":
      return "bg-green-50 text-green-700 border-green-200";

    case "CANCELLED":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}


  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              Welcome back 
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Here’s an overview of your projects and ongoing work
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              {projects.length} Projects
            </span>

            <span className="text-[10px] px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
              System Online
            </span>
          </div>

        </div>
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="h-screen bg-gray-50 flex">

        {/* ========== LEFT PANEL ========== */}
        <div className="w-[360px] bg-white border-r border-gray-100 overflow-y-auto">

          {/* LEFT HEADER */}
          <div className="p-4 border-b bg-white">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-gray-700" />
              <h1 className="text-sm font-semibold text-gray-900">
                Projects
              </h1>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Track, manage and deliver client projects
            </p>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                Total: {projects.length}
              </span>

              <span className="text-[10px] px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-100">
                Active workspace
              </span>
            </div>
          </div>

          {/* PROJECT LIST */}
          {isLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-xl p-4 bg-white animate-pulse"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="h-3 w-44 bg-gray-200 rounded" />
                      <div className="mt-3 h-2.5 w-28 bg-gray-200 rounded" />
                      <div className="mt-2 h-2.5 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="h-5 w-16 bg-gray-200 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            projects.map((p) => (
              <div
                key={p.id}
              onClick={() => {
  if (!p.id) return;
  setSelectedProjectId(p.id);
}}
                className={`p-4 cursor-pointer border-gray-200 border-b transition hover:bg-gray-50 ${
                  selected?.id === p.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-gray-500" />
                      <p className="text-sm font-medium text-gray-900">
                        {p.service?.ServiceName || "Untitled Project"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <User size={12} />
                      {getClientDisplayName(p.client)}
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <DollarSign size={12} />
                      {p.proposal?.pricing}
                    </div>
                  </div>

                <span
  className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(p.projectStatus)}`}
>
  {formatStatus(p.projectStatus)}
</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ========== RIGHT PANEL ========== */}
        <div className="flex-1 p-6 overflow-y-auto">

          {/* HEADER CARD */}
    <div className="mb-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

  <h1 className="text-base font-semibold text-gray-900">
    Project Workspace
  </h1>

  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
    This workspace gives you a complete view of your selected project, including its scope, pricing, timeline, and overall progress. 
    You can monitor how the project is moving forward, review agreed deliverables, and stay aligned with the client requirements.
  </p>

  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
    Each project here is created from an approved proposal, meaning all details you see are already confirmed and ready for execution. 
    Use this space to track milestones, ensure timely delivery, and maintain transparency between you and your client.
  </p>

  <div className="mt-4 text-xs text-gray-500">
    Select a project from the left panel to view its full details and begin managing its workflow.
  </div>

</div>

          {/* EMPTY STATE */}
          {!selected && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <Briefcase size={40} className="mb-3 text-gray-300" />

              <h2 className="text-sm font-medium text-gray-700">
                No Projects Yet
              </h2>

              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                Approved proposals will automatically appear here as projects so you can track progress and manage delivery.
              </p>
            </div>
          )}

          {/* LOADING STATE */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
              <div className="h-6 w-6 rounded-full border-2 border-gray-200 border-t-gray-600 animate-spin" />
              <p className="text-xs text-gray-500 mt-3">Fetching your projects…</p>
            </div>
          )}

          {/* PROJECT DETAILS */}
          {selected && (
            <div className="max-w-4xl bg-white rounded-2xl border border-gray-100 p-6">

              {/* HEADER */}
              <div className="flex justify-between items-start">

                <div>
                  <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Briefcase size={18} />
                    {selected.service?.ServiceName}
                  </h1>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {getClientDisplayName(selected.client)}
                    </span>

                    <span>{selected.client?.email}</span>
                  </div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-100">
                  {selected.projectStatus}
                </span>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-3 mt-6">

                <div className="p-4 bg-gray-50 rounded-xl">
                  <DollarSign size={14} className="text-gray-400" />
                  <p className="text-xs text-gray-500 mt-1">Budget</p>
                  <p className="font-semibold">
                    ${selected.proposal?.pricing || 0}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <Clock size={14} className="text-gray-400" />
                  <p className="text-xs text-gray-500 mt-1">Timeline</p>
                  <p className="text-sm font-medium">
                    {selected.proposal?.timeline || "Not set"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <CheckCircle size={14} className="text-gray-400" />
                  <p className="text-xs text-gray-500 mt-1">Progress</p>

               <div className="h-2 bg-gray-200 rounded-full mt-2">
  <div
    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(
      selected?.progress || 0
    )}`}
    style={{ width: `${selected?.progress || 0}%` }}
  />
</div>

                  <p className="text-xs text-gray-500 mt-1">
                    {selected.progress || 0}% complete
                  </p>
                </div>

              </div>

              {/* SCOPE */}
              <div className="mt-6">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FileText size={14} />
                  <h2 className="text-sm font-medium">Scope</h2>
                </div>

                <p className="text-sm text-gray-600">
                  {selected.proposal?.scope || "No scope defined for this project yet."}
                </p>
              </div>

              {/* DELIVERABLES */}
              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-700 mb-2">
                  Deliverables
                </h2>

                <div className="space-y-2">
                  {selected.proposal?.deliverables
                    ?.split("+")
                    .filter(Boolean)
                    .map((d: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={14} className="text-gray-400" />
                        {d.trim()}
                      </div>
                    ))}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-6">

            <Button variant="contained" color="primary" fullWidth onClick={async ()=>{
setSelectedValue(selected?.progress ?? null)
setIsOpenModal(true)
            }}>
                  Update Progress
                </Button>

                <Button variant="contained" color="success" fullWidth>
                  Mark Complete
                </Button>

                <Button variant="outlined" fullWidth>
                  Message Client
                </Button>

              </div>

            </div>
          )}

        </div>

<SettingsModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
  <div className="bg-white w-full max-w-md rounded-2xl p-6">

    {/* HEADER */}
    <div className="mb-4">
      <h2 className="text-sm font-semibold text-gray-900">
        Update Project Progress
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        Adjust the progress of this project. This will reflect in real-time for tracking.
      </p>
    </div>

    {/* CURRENT PROGRESS */}
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Current Progress</span>
        <span className="font-medium text-gray-700">
          {selected?.progress || "N/A"}</span>
      </div>

   <div className="h-2 bg-gray-200 rounded-full mt-2">
  <div
    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(
      selected?.progress || 0
    )}`}
    style={{ width: `${selected?.progress || 0}%` }}
  />
</div>
    </div>

    {/* INPUT */}
    <div className="mb-5">

      <div className="flex gap-2">

      <label className="flex text-xs text-blue-600 font-bold  mb-1 block">
        New Progress (%) -
      </label>
{selectedValue}
      </div>


      {/* <input
        type="number"
        placeholder="Enter progress e.g 50"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
      /> */}

<hr className="m-3 border-gray-200"/>

<div className="flex flex-wrap gap-2">
  {progressOptions.map((value) => (
    <div
      key={value}
      onClick={() => setSelectedValue(value)}
      className={`cursor-pointer px-3 py-1 text-xs font-medium rounded-full border transition
        ${
          selectedValue === value
            ? "bg-black text-white border-black shadow-md scale-105"
            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
        }
      `}
    >
      {value}%
    </div>
  ))}
</div>
     

    </div>

    {/* ACTION BUTTONS */}
    <div className="flex gap-2">

   <Button
  variant="contained"
  color="primary"

  
onClick={() => {
  if (!selected?.id) return;

  if (selectedValue === null) {
    toast.error("Select a progress value first");
    return;
  }

  updateProjectProgress(selected.id, selectedValue);
  setIsOpenModal(false);
  setSelectedValue(null);
}}
>
 Proceed
</Button>

      <button
        onClick={() => setIsOpenModal(false)
          
        }
        className="flex-1 border border-gray-200 text-sm py-2 rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>

    </div>

  </div>
</SettingsModal>

      </div>
    </>
  );
}
