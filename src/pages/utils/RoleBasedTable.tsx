import { Hourglass, Pencil, Loader2, Wrench, Flag, Circle, CheckCircle, RefreshCcw, RefreshCw } from "lucide-react";
import { status } from "nprogress";

type Props = {
currentUser: any;
currentItems: any[];
loadingId: string | null;
handleManageClick: (item: any) => void;
};

export default function RoleBasedTable({
currentUser,
currentItems,
loadingId,
handleManageClick,
}: Props) {
if (!currentUser) return null;

const isClient = currentUser.role === "Client";



return (
<table className="min-w-full text-sm">
{/* ================= HEADER ================= */}
<thead className="bg-slate-100 text-left text-slate-600">
<tr>
{isClient ? (
<>
<th className="px-4 py-3">My Details</th>
<th className="px-4 py-3 hidden md:table-cell">
Requested Service
</th>
<th className="px-4 py-3">Status</th>
{/* <th className="px-4 py-3 hidden md:table-cell">My Country</th> */}
<th className="px-4 py-3 hidden lg:table-cell">Created</th>
</>
) : (
<>
<th className="px-4 py-3">Client</th>
<th className="px-4 py-3 hidden md:table-cell">Service</th>
<th className="px-4 py-3">Status</th>
<th className="px-4 py-3 hidden md:table-cell">Country</th>
<th className="px-4 py-3 hidden lg:table-cell">Created</th>
<th className="px-4 py-3">Action</th>
</>
)}
</tr>
</thead>

{/* ================= BODY ================= */}
<tbody>
{currentItems.map((s) => {
const { id, service, client } = s;

const fullName =
[client.firstName, client.middleName, client.lastName]
.filter(Boolean)
.join(" ") ||
client.fullName ||
"N/A";

return (
<tr key={id} className="border-t border-gray-200 hover:bg-slate-50 transition">

{/* ========== CLIENT VIEW ========== */}
{isClient ? (
<>
<td className="px-4 py-3">
<p className="font-semibold text-slate-900">
    {fullName}
</p>
<p className="text-xs text-slate-500">
    {client.email}
</p>
</td>

<td className="px-4 py-3 hidden md:table-cell">
<p className="font-medium text-slate-800">
    {service.ServiceName}
</p>
<p className="text-xs text-slate-500">
    {service.Description?.substring(0, 30)}
</p>
</td>

<td className="px-4 py-3">

    {s.request_status === "PENDING" && (
      <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1">
        <Hourglass size={14} />
        Pending
      </span>
    )}

    {s.request_status === "DRAFT" && (
      <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full flex items-center gap-1">
        <Pencil size={14} />
        Draft
      </span>
    )}

    {s.request_status === "ONGOING" && (
      <span className="text-pink-600 bg-pink-50 px-2 py-1 rounded-full flex items-center gap-1">
        <Loader2 className="animate-spin" size={14} />
         ongoing
      </span>
    )} 

    {s.request_status === "COMPLETED" && (
  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
    <CheckCircle  size={14} />
    Completed
  </span>
)}


    {s.request_status === "CHANGES_REQUESTED" && (
  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
    <CheckCircle  size={14} />
    Changes
  </span>
)}
</td>

<td className="px-4 py-3 hidden md:table-cell">
{client.country}
</td>

<td className="px-4 py-3 hidden lg:table-cell">
{new Date(s.createdAt).toLocaleDateString()}
</td>
</>
) : (
<>
{/* ========== ADMIN / OTHER ROLE ========== */}
<td className="px-4 py-3">
<p className="font-semibold text-slate-900">
    {fullName}
</p>
<p className="text-xs text-slate-500">
    {client.email}
</p>
</td>

<td className="px-4 py-3 hidden md:table-cell">
<p className="font-medium text-slate-800">
    {service.ServiceName}
</p>
<p className="text-xs text-slate-500">
      {service.Description?.substring(0, 100) + " " + " ...."}

</p>
</td>

<td className="px-4 py-3">
  <span
    className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full`}
  >
{/* {s.request_status} */}

    {s.request_status === "PENDING" && (
      <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1">
        <Hourglass size={14} />
        Pending
      </span>
    )}

    {s.request_status === "DRAFT" && (
      <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full flex items-center gap-1">
        <Pencil size={14} />
        Draft
      </span>
    )}

    {s.request_status === "ONGOING" && (
      <span className="text-pink-600 bg-pink-50 px-2 py-1 rounded-full flex items-center gap-1">
        <Loader2 className="animate-spin" size={14} />
         ongoing
      </span>
    )} 

    {s.request_status === "COMPLETED" && (
  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
    <CheckCircle  size={14} />
    Completed
  </span>

  
)}


{s.request_status === "CHANGES_REQUESTED" && (
  <span className="text-purple-600 bg-purple-50 px-2 py-1 rounded-full flex items-center gap-1">
    <RefreshCw size={14} />
    Changes Requested
  </span>
)}
  </span>
</td>
<td className="px-4 py-3 hidden md:table-cell">
{client.country}
</td>

<td className="px-4 py-3 hidden lg:table-cell">
{new Date(s.createdAt).toLocaleDateString()}
</td>

<td className="px-4 py-3">
<button
  disabled={loadingId === id || s.request_status !== "DRAFT"}
  onClick={() => handleManageClick(s)}
  className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full border
  ${
    s.request_status === "DRAFT"
      ? "text-green-600 border-green-500 bg-white hover:bg-green-200 cursor-pointer"
      : "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed pointer-events-none"
  }
  ${loadingId === id ? "opacity-60" : ""}
  `}
>
  {loadingId === id ? (
    <>
      <Loader2 className="animate-spin" size={16} />
      Loading...
    </>
  ) : (
    <>
      <Wrench size={16} />
      {s.request_status === "DRAFT" ? "Manage" : "Locked"}
    </>
  )}
</button>
</td>
</>
)}
</tr>
);
})}
</tbody>
</table>
);
}