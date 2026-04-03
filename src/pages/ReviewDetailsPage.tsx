import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProposalStore } from "../ZustandShare/ProposalZuts";
import {
  CheckCircle,
  Clock,
  XCircle,
  User,
  Mail,
  Globe,
  FileText,
  Calendar,
} from "lucide-react";

function ReviewDetailsPage() {
  const { proposals } = useProposalStore() as { proposals: any };
  const { id } = useParams();

  const matchingProposal = proposals.find((p: any) => p.id === id);

  const [status, setStatus] = useState(
    matchingProposal?.proposal_status || "Pending"
  );

  if (!matchingProposal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        No Proposal found
      </div>
    );
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const statusConfig: Record<
    string,
    { icon: any; color: string }
  > = {
    Approved: {
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-700",
    },
    Pending: {
      icon: Clock,
      color: "bg-amber-100 text-amber-700",
    },
    Rejected: {
      icon: XCircle,
      color: "bg-rose-100 text-rose-700",
    },
  };

  const currentStatusConfig = statusConfig[status] ?? statusConfig.Pending;
  const StatusIcon = currentStatusConfig.icon || Clock;

  return (
    <div className="min-h-screen p-3">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-600">
              Proposal Review
            </h1>
            <p className="text-sm text-slate-500">
              Manage and review proposal details
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full border border-green-300 bg-white text-slate-600">
            ID: {matchingProposal.id}
          </span>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-greegitrn-300 p-6 space-y-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">



            {/* Swapped builder to the left so inputs appear before the descriptive text on large screens */}




            <div className="lg:w-[500px] space-y-6 border-t pt-6 lg:border-t-0 lg:border-r lg:pr-6 lg:pt-0 lg:order-first">

              <h3 className="text-sm font-semibold text-slate-700 flex flex-col gap-1">
                <span className="flex items-center gap-2">
                  <FileText size={16} className="text-green-600" />
                  Tailor builder
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-[0.4em]">
                  {[
                    matchingProposal.client.firstName,
                    matchingProposal.client.middleName,
                    matchingProposal.client.lastName,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </span>
              </h3>

              {/* SCOPE OF WORK */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500">Scope of Work</label>
                <textarea
                  placeholder="Describe what you will do for the client (e.g. Provide business advisory including analysis, strategy, and growth recommendations...)"
                  className="mt-1 w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                  rows={4}
                />
              </div>

              {/* DELIVERABLES */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500">Deliverables</label>
                <textarea
                  placeholder={`- Business analysis report\n- Market research insights\n- Strategy roadmap\n- Actionable recommendations`}
                  className="mt-1 w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                  rows={4}
                />
              </div>

              {/* TIMELINE */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500">Timeline</label>
                <input
                  placeholder="e.g. 2–4 weeks depending on project complexity"
                  className="mt-1 w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* PRICING */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500">Pricing</label>
                <input
                  placeholder="e.g. $500 one-time / $200 monthly retainer"
                  className="mt-1 w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* TERMS */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500">Terms & Conditions</label>
                <textarea
                  placeholder={`- Advisory service only\n- No guaranteed results\n- Confidential information protected\n- Limited to agreed scope`}
                  className="mt-1 w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                  rows={4}
                />
              </div>
            </div>

            <div className="space-y-6 lg:flex-1">
              {/* CLIENT */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-sm text-slate-500 flex items-center gap-2">
                    <User size={16} /> Client
                  </h3>

                  <p className="text-lg font-semibold text-slate-900">
                    {[
                      matchingProposal.client.firstName,
                      matchingProposal.client.middleName,
                      matchingProposal.client.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  </p>

                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Mail size={14} /> {matchingProposal.client.email}
                  </p>

                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Globe size={14} /> {matchingProposal.client.country}
                  </p>
                </div>

                {/* STATUS */}
                <div
                  className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold ${currentStatusConfig.color}`}
                >
                  <StatusIcon size={16} />
                  {status}
                </div>
              </div>

              {/* SERVICE */}
              <div>
                <h3 className="text-sm text-slate-500 flex items-center gap-2 mb-1">
                  <FileText size={16} /> Service
                </h3>

                <p className="text-lg font-semibold text-slate-900">
                  {matchingProposal.service.ServiceName}
                </p>

                <p className="text-sm text-slate-600">
                  {matchingProposal.service.Description}
                </p>
              </div>

              {/* DETAILS */}
              <div>
                <h3 className="text-sm text-slate-500 mb-2">
                  Proposal Details
                </h3>

                <ul className="grid gap-2 text-sm text-slate-700 list-disc pl-5">
                  <li>Scope of work defined based on client needs</li>
                  <li>Deliverables clearly outlined</li>
                  <li>Timeline structured and agreed</li>
                  <li>Pricing calculated and transparent</li>
                  <li>Terms & conditions included</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <button
              onClick={() => handleStatusChange("Approved")}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
            >
              <CheckCircle size={16} /> Approve
            </button>

            <button
              onClick={() => handleStatusChange("Pending")}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition"
            >
              <Clock size={16} /> Pending
            </button>

            <button
              onClick={() => handleStatusChange("Rejected")}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition"
            >
              <XCircle size={16} /> Reject
            </button>
          </div>

          {/* FOOTER */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar size={14} />
            Created:{" "}
            {new Date(matchingProposal.createdAt).toLocaleDateString()}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default ReviewDetailsPage;
