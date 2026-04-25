import { useState } from "react";
import { Button } from "@mui/material";
import {
  Briefcase,
  User,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Business Consultancy",
    client: "John Doe",
    email: "john@email.com",
    status: "ACTIVE",
    budget: 123,
    progress: 70,
    start: "Apr 10, 2026",
    end: "May 05, 2026",
    deliverables: [
      "Business analysis report",
      "Process optimization plan",
      "Strategy document",
    ],
    scope:
      "Analyze workflows, identify inefficiencies, and implement structured improvements.",
  },
  {
    id: 2,
    name: "Website Redesign",
    client: "Sarah Smith",
    email: "sarah@email.com",
    status: "PENDING",
    budget: 300,
    progress: 20,
    start: "Apr 15, 2026",
    end: "May 20, 2026",
    deliverables: ["UI redesign", "UX improvements", "Responsive layout"],
    scope: "Modernize UI and improve user experience.",
  },
];

export default function ProjectDashboard() {
  const [selected, setSelected] = useState(projects[0]);

  return (
    <div className="h-screen bg-gray-50 flex">

      {/* LEFT - PROJECT LIST (WhatsApp style but richer) */}
      <div className="w-[360px] bg-white border-r border-gray-100 overflow-y-auto">

        <div className="p-4 border-b">
          <h1 className="text-sm font-semibold text-gray-900">
            Projects
          </h1>
          <p className="text-xs text-gray-500">
            {projects.length} active projects
          </p>
        </div>

        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelected(p)}
            className={`p-4 cursor-pointer border-b transition hover:bg-gray-50
              ${selected.id === p.id ? "bg-gray-100" : ""}`}
          >

            <div className="flex justify-between items-start">

              <div>
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-gray-500" />
                  <p className="text-sm font-medium text-gray-900">
                    {p.name}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <User size={12} />
                  {p.client}
                </div>

                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                  <DollarSign size={12} />
                  ${p.budget}
                </div>
              </div>

              <div className="text-right">

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full
                  ${p.status === "ACTIVE"
                    ? "bg-green-50 text-green-700"
                    : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {p.status}
                </span>

                <div className="mt-2 text-xs text-gray-500">
                  {p.progress}%
                </div>

                <div className="w-16 h-1 bg-gray-200 rounded mt-1">
                  <div
                    className="h-1 bg-black rounded"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>

      {/* RIGHT - DETAILED VIEW */}
      <div className="flex-1 p-6 overflow-y-auto">

        <div className="max-w-4xl bg-white rounded-2xl border border-gray-100 p-6">

          {/* HEADER */}
          <div className="flex justify-between items-start">

            <div>
              <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Briefcase size={18} />
                {selected.name}
              </h1>

              <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {selected.client}
                </span>

                <span>{selected.email}</span>
              </div>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
              {selected.status}
            </span>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3 mt-6">

            <div className="p-4 bg-gray-50 rounded-xl">
              <DollarSign size={14} className="text-gray-400" />
              <p className="text-xs text-gray-500 mt-1">Budget</p>
              <p className="font-semibold">${selected.budget}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <Clock size={14} className="text-gray-400" />
              <p className="text-xs text-gray-500 mt-1">Timeline</p>
              <p className="text-sm font-medium">
                {selected.start} → {selected.end}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <CheckCircle size={14} className="text-gray-400" />
              <p className="text-xs text-gray-500 mt-1">Progress</p>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-black rounded-full"
                  style={{ width: `${selected.progress}%` }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {selected.progress}% complete
              </p>
            </div>

          </div>

          {/* SCOPE */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FileText size={14} />
              <h2 className="text-sm font-medium">Scope</h2>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {selected.scope}
            </p>
          </div>

          {/* DELIVERABLES */}
          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2">
              Deliverables
            </h2>

            <div className="space-y-2">
              {selected.deliverables.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <CheckCircle size={14} className="text-gray-400" />
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-6">

            <Button variant="contained" color="success" fullWidth>
              Mark Complete
            </Button>

            <Button variant="outlined" fullWidth>
              Message Client
            </Button>

          </div>

        </div>

      </div>
    </div>
  );
}