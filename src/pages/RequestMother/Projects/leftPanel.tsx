import {
  Briefcase,
  Layers,
  Package,
  Clock,
  DollarSign,
  FileText,
} from "lucide-react";

export default function ProjectlLeftPanel({ selected }:any) {
  return (
    <div className="w-full space-y-4 border-r border-gray-200 pr-4">

      {/* HEADER */}
      <div className="bg-white shadow-sm border rounded-xl p-4 border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Briefcase size={16} />
          Service Requested
        </div>

        <h1 className="text-lg font-semibold text-gray-800 mt-1">
          {selected?.service?.ServiceName}
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          Proposal Overview • Version Comparison Ready
        </p>
      </div>

      {/* SCOPE */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-4">
        <div className="flex items-center gap-2 text-blue-700 font-medium">
          <Layers size={16} />
          Scope of Work
        </div>

        <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
          {selected?.proposal?.scope}
        </p>
      </div>

      {/* DELIVERABLES */}
      <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-4">
        <div className="flex items-center gap-2 text-green-700 font-medium">
          <Package size={16} />
          Deliverables
        </div>

        <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
          {selected?.proposal?.deliverables}
        </p>
      </div>

      {/* TIMELINE */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-4">
        <div className="flex items-center gap-2 text-yellow-700 font-medium">
          <Clock size={16} />
          Timeline
        </div>

        <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
          {selected?.proposal?.timeline}
        </p>
      </div>

      {/* PRICING */}
      <div className="bg-purple-50 border-l-4 border-purple-500 rounded-xl p-4">
        <div className="flex items-center gap-2 text-purple-700 font-medium">
          <DollarSign size={16} />
          Pricing
        </div>

        <h2 className="text-xl font-bold text-gray-800 mt-2">
          ${selected?.proposal?.pricing}
        </h2>
      </div>

      {/* TERMS */}
      <div className="bg-gray-50 border-l-4 border-gray-400 rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <FileText size={16} />
          Terms & Conditions
        </div>

        <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
          {selected?.proposal?.termsAndConditions}
        </p>
      </div>

    </div>
  );
}