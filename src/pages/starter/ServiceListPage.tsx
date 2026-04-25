import { useEffect, useState } from "react";
import { useServiceStore } from "../../ZustandShare/serviceZuts";
import type { ServiceCatalog } from "../../../GlobalTypes";
import SettingsModal from "../utils/Modal";
import { Pencil,  Plus, Trash2, AlertTriangle, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const statusStyles: Record<string, string> = {
ACTIVE: "border-green-200 bg-green-50 text-green-700",
IN_PROGRESS: "border-amber-200 bg-amber-50 text-amber-700",
COMPLETED: "border-blue-200 bg-blue-50 text-blue-800",
CANCELLED: "border-red-200 bg-red-50 text-red-700",
REQUESTED: "border-slate-200 bg-slate-50 text-slate-800",
PENDING: "border-slate-200 bg-slate-50 text-slate-800",
};

const AdminServiceListPage = () => {
const { services, fetchServices, EditServices, DeleteServices } = useServiceStore();

const { reset, handleSubmit, register, formState:{isSubmitting} } = useForm<ServiceCatalog>();

const [IsopenModal, setOpenModal] = useState(false);

const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

const [isLoading, setIsLoading] = useState(true);


const [searchTerm, setSearchTerm] = useState("")

const [serviceToDelete, setServiceToDelete] = useState<ServiceCatalog | null>(null);


//  Filter Search Terms

const filteredServices = services?.filter((services)=>{
return (
services.ServiceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
services.Description?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
services.status?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
);
})






useEffect(() => {
let mounted = true;
setIsLoading(true);

fetchServices()
.catch(() => {
// swallow so finally still runs
})
.finally(() => {
if (mounted) {
  setIsLoading(false);
}
});

return () => {
mounted = false;
};
}, [fetchServices]);

// ✅ Click row → store in RHF
function ClickOnServiceRow(data: ServiceCatalog) {
reset(data); //  replaces selectedService state
setOpenModal(true);
console.log(data);
}

// ✅ Save changes
function clickOnSaveChanges(data: ServiceCatalog) {

const dataToSubmit:ServiceCatalog = {
  id:data.id,
ServiceName: data.ServiceName,
Description:data.Description,
status:data.status
}



console.log("SUBMITTED:", dataToSubmit);

// Example: send to backend/store
EditServices(dataToSubmit);

setOpenModal(false);
}


function handleDeleteClick(service: ServiceCatalog) {
setServiceToDelete(service);
setDeleteModalOpen(true);
}

return (
<main className="min-h-screen bg-white text-slate-900 p-6">
<div className="max-w-6xl space-y-6">

{/* Header */}
<header className="rounded-2xl border border-green-200 bg-green-50 px-6 py-5 shadow-sm">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
        Service Catalog
      </p>
      <h1 className="mt-2 text-2xl font-semibold">
        Service List
      </h1>
      <p className="mt-2 text-sm text-slate-600 max-w-xl">
        Manage and review all services in your catalog.
      </p>
    </div>

    <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-700">
      <Plus size={16} />
      Add Service
    </button>
  </div>
</header>

<div className="flex justify-between items-center">
  
  {/* Services Length display */}
<div className="flex items-center gap-2">
<span className="text-sm text-slate-500">
Services
</span>

<span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
{services?.length || 0}
</span>
</div>


<input
type="text"
placeholder="Search services..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
className="w-[250px] rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
/>
</div>

{/* Table */}
{isLoading ? (
  <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-white/80 p-10 text-center text-sm text-slate-600 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
      Loading Services
    </p>
    <p className="text-base font-semibold text-slate-800">
      Dancing data is on its way...
    </p>
    <div className="flex items-end gap-2">
      {["bg-emerald-500", "bg-amber-500", "bg-sky-500"].map(
        (color, index) => (
          <motion.span
            key={color}
            className={`block h-3 w-3 rounded-full ${color}`}
            animate={{ y: [0, -12, 0], scale: [1, 1.3, 1] }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              repeat: Infinity,
            }}
          />
        )
      )}
    </div>
    <p className="text-xs text-slate-500">
      Please hold tight while we gather your latest catalog.
    </p>
  </div>
) : (
  <div className="overflow-x-auto border border-slate-200 bg-white shadow-sm">
    <table className="min-w-full text-sm">
      <thead className="bg-slate-100 text-slate-600">
        <tr>
          <th className="px-4 py-3 text-left">Service Name</th>
          <th className="px-4 py-3 text-left">Description</th>
          <th className="px-4 py-3 text-left">Status</th>
          <th className="px-4 py-3 text-left">Created</th>
          <th className="px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-100">
        {filteredServices?.map((service: ServiceCatalog) => (
          <tr
            key={service.id}
            className="hover:bg-slate-50 cursor-pointer"
          >
            <td className="px-4 py-3 font-medium">
              {service.ServiceName}
            </td>

            <td className="px-4 py-3 text-slate-600">
              {service.Description}
            </td>

            <td className="px-4 py-3">
              <span
                className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
                  statusStyles[service.status!] || statusStyles.PENDING
                }`}
              >
                {service.status!.toLowerCase().replace("_", " ")}
              </span>
            </td>

            <td className="px-4 py-3 text-slate-500">
              {service.DateCreated
                ? new Date(service.DateCreated).toDateString()
                : "—"}
            </td>

            <td className="px-4 py-3 flex gap-2">
              <button
                title="Delete"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                    e.currentTarget.blur();
                  handleDeleteClick(service);
                }}
              >
                <Trash2 size={16} className="text-red-500" />
              </button>

              <button
                title="Edit"
                onClick={(e) => {
                  e.stopPropagation();
                  ClickOnServiceRow(service);
                }}
                className="p-2 rounded-md hover:bg-green-100 text-green-600 cursor-pointer"
              >
                <Pencil size={16} />
              </button>
            </td>
          </tr>
        ))}
        {!filteredServices?.length && (
          <tr>
            <td
              colSpan={5}
              className="px-4 py-4 text-center text-slate-500"
            >
              No data found. Possibly a network error
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)}

{/* MODAL */}
{IsopenModal && (
  <SettingsModal
    isOpen={IsopenModal}
    onClose={() => setOpenModal(false)}
  >
    <form
      onSubmit={handleSubmit(clickOnSaveChanges)}
      className="w-[300px] max-w-lg rounded-2xl bg-white shadow-xl"
    >
      {/* Header */}
      <div className="border-b px-6 py-4">
        <p className="text-xs uppercase tracking-widest text-green-600 font-semibold">
          Service Management
        </p>
        <p className="text-sm text-slate-500 mt-1">
          Update service details and status.
        </p>
      </div>

      {/* Body */}
      <div className="space-y-5 px-6 py-5">

        {/* Service Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Service Name
          </label>
          <input
            {...register("ServiceName")}
            className="w-full rounded-lg border px-3 py-2 text-sm border-gray-200 focus:ring-1 focus:ring-blue-200 "
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 border-gray-200">
            Description
          </label>
          <textarea
            {...register("Description")}
            className="w-full min-h-[120px] rounded-lg border px-3 py-2 text-sm border-gray-200 focus:ring-1 focus:ring-blue-200 "
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-200 outline-none"
          >
            <option value="ACTIVE">Active</option>
            <option value="REQUESTED">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center border-t px-6 py-4 gap-2">
        <button
          type="button"
          onClick={() => setOpenModal(false)}
          className="text-sm p-2 bg-red-500 text-white rounded"
        >
          Cancel
        </button>

      <button
  disabled={isSubmitting}
  type="submit"
  className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
>
  {isSubmitting ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      Saving...
    </>
  ) : (
    "Save Changes"
  )}
</button>


      </div>
    </form>
  </SettingsModal>
  
)}


{/* Delere Modal UI */}
{isDeleteModalOpen && serviceToDelete && (
<SettingsModal
isOpen={isDeleteModalOpen}
onClose={() => setDeleteModalOpen(false)}
>
<div className="w-[320px] rounded-2xl bg-white shadow-xl">

{/* Header */}
<div className="flex items-center justify-between border-b border-gray-300  px-5 py-4">
<div className="flex items-center gap-2 text-red-600">
  <AlertTriangle size={18} />
  <h2 className="text-sm font-semibold">Delete Service</h2>
</div>

<button
  onClick={() => setDeleteModalOpen(false)}
  className="p-1 rounded hover:bg-slate-100"
>
  <X size={16} />
</button>
</div>

{/* Body */}
<div className="px-5 py-4 space-y-3 text-center">
<div className="flex justify-center">
  <div className="bg-red-100 text-red-600 p-3 rounded-full">
    <Trash2 size={20} />
  </div>
</div>
  
<p className="text-sm text-slate-700">
  Are you sure you want to delete
</p>

<p className="text-sm font-semibold text-slate-900">
  {serviceToDelete.ServiceName}
</p>

<p className="text-xs text-slate-500">
  This action cannot be undone.
</p>
</div>

{/* Footer */}
<div className="flex justify-end gap-2 border-t  border-gray-300 px-5 py-4">
<button
  onClick={() => setDeleteModalOpen(false)}
  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-slate-50 cursor-pointer"
>
  <X size={14} />
  Cancel
</button>
      <button
  onClick={async () => {

if (!serviceToDelete?.id) return;
await DeleteServices(serviceToDelete.id)
    setDeleteModalOpen(false);
  }}
  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
>
  <Trash2 size={14}/>
  Delete
</button>


 


</div>

</div>
</SettingsModal>
)}

</div>
</main>
);
};

export default AdminServiceListPage;
