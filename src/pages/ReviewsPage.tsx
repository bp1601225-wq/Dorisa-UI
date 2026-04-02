import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Search, Sparkles, Wrench } from "lucide-react";
import { useProposalStore } from "../ZustandShare/ProposalZuts";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const statusStyles = {
Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
Approved: "bg-green-100 text-green-700 border-green-200",
Rejected: "bg-red-100 text-red-700 border-red-200",
} as const;




const stats = [
{ label: "Open Requests", value: "24" },
{ label: "Approved", value: "13" },
{ label: "Pending", value: "8" },
{ label: "Rejected", value: "3" },
];

export default function ReviewsPage() {

const {fetchProposals, proposals} = useProposalStore()

useEffect(() => {
fetchProposals();
}, [fetchProposals]);

useEffect(() => {
console.log("All proposals:", proposals);
}, [proposals]);

// Paginated
const [page, setPage] = useState(1);
const itemsPerPage = 5;

const start = (page - 1) * itemsPerPage;
const currentItems = proposals.slice(start, start + itemsPerPage);

return (
  <main className="min-h-screen bg-slate-50 ">
    <div className="max-w-6xl mx-auto px-4">
      <section className="rounded-[28px] border border-slate-200 bg-gradient-to-b from-white/90 via-white to-slate-50 p-6 shadow-lg mb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
              <Briefcase className="w-5 h-5" />
              
              Client Service Desk
            </div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Service Requests
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Track every client request in a single view, review the context, and manage approvals without leaving this board.
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <button className="rounded-full border border-black bg-black px-5 py-2 text-white transition hover:opacity-90">
              + New Request
            </button>
            <button className="rounded-full border border-slate-300 bg-white px-5 py-2 text-slate-800 shadow-sm transition hover:shadow-md">
              Settings
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
          >
            <p className="text-sm uppercase tracking-wide text-slate-500">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">All Requests</h2>
            <p className="text-sm text-slate-500">
              Sorted by newest first • Tap any card to review or adjust the status.
            </p>
          </div>
          <button className="text-sm font-semibold uppercase tracking-wider text-slate-800 hover:text-slate-900">
            Filter &amp; Sort
          </button>
        </div>

        <hr className="mb-3 text-green-200"/>

        {/* Search and Filter */}
<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-end mb-4">

{/* Service */}
<div className="flex flex-col w-full md:w-48">
  <label className="text-xs font-medium text-slate-500 mb-1">
    Service
  </label>
  <input
    type="text"
    placeholder="Search service..."
    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
  />
</div>

{/* Country */}
<div className="flex flex-col w-full md:w-48">
  <label className="text-xs font-medium text-slate-500 mb-1">
    Country
  </label>
  <input
    type="text"
    placeholder="Search country..."
    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
  />
</div>

{/* Client */}
<div className="flex flex-col w-full md:w-48">
  <label className="text-xs font-medium text-slate-500 mb-1">
    Client
  </label>
  <input
    type="text"
    placeholder="Search client..."
    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
  />
</div>

{/* Button */}
<button className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 hover:scale-[1.02] active:scale-95">
  <Search size={16} />
  Search
</button>

</div>
        {/* Proposal Display */}
<div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg">
<table className="min-w-full text-sm">
  <thead className="bg-slate-100 text-left text-slate-600">
<tr>
  <th className="px-4 py-3">Client</th>

  {/* Hide on small screens */}
  <th className="px-4 py-3 hidden md:table-cell">Service</th>

  <th className="px-4 py-3">Status</th>

  {/* Hide on small screens */}
  <th className="px-4 py-3 hidden md:table-cell">Country</th>

  {/* Hide on small screens */}
  <th className="px-4 py-3 hidden lg:table-cell">Created</th>

  <th className="px-4 py-3">Action</th>
</tr>
</thead>

  <tbody>
    {currentItems.map((s: any) => {
      const { id, service, client } = s;

  const fullName =

[client.firstName, client.middleName, client.lastName]
  .filter(Boolean)
  .join(" ") || "N/A";

      return (
        <tr
          key={id}
          className="border-t hover:bg-slate-50 transition"
        >
          {/* Client */}
          <td className="px-4 py-3">
            <p className="font-semibold text-slate-900">{fullName}</p>
            <p className="text-xs text-slate-500">{client.email}</p>
          </td>

          {/* Service */}
          <td className="px-4 py-3">
            <p className="font-medium text-slate-800">
              {service.ServiceName}
            </p>
            <p className="text-xs text-slate-500">
              {service.Description}
            </p>
          </td>

          {/* Status */}
          <td className="px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-wide rounded-full border px-3 py-1 bg-slate-100 text-slate-700 border-slate-200">
              {s.proposal_status}
            </span>
          </td>

          {/* Country */}
          <td className="px-4 py-3 text-slate-700">
            {client.country}
          </td>

          {/* Date */}
          <td className="px-4 py-3 text-slate-600">
            {new Date(s.createdAt).toLocaleDateString()}
          </td>

          {/* Actions */}
          <td className="px-4 py-3">
            <div className="flex gap-2">
              {/* <button className="text-xs font-medium text-slate-600 hover:text-black">
                View
              </button> */}


              {/* Access url Parameters */}
<Link to={`/reviews/${id}`}>

              <button className="flex gap-2 items-center text-xs 
              font-semibold text-white bg-black px-3 py-2 rounded-full
              active:scale-105 cursor-pointer hover:bg-black/80 transition-all">
               <Wrench size={18} 
               />
                Manage
              </button>
</Link>


            </div>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
</div>
        

        {/* Paginated buttons */}
        <Stack spacing={2} className="mt-6 flex items-center">
<Pagination
count={Math.ceil(proposals.length / itemsPerPage)}
page={page}
onChange={(e, value) => setPage(value)}
shape="rounded"
color="primary"
/>
</Stack>


      </section>
    </div>
  </main>
);
}
