import { useEffect, useState } from "react";
import { Briefcase, Hourglass, Loader2, Pencil, Wrench } from "lucide-react";
import { useClientsRequestStore } from "../../ZustandShare/ClientsRequestZuts";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";
import RoleBasedTable from "../utils/RoleBasedTable";

export default function Reviews(){


const navigate = useNavigate()
const {currentUser} = useAuth()

  // click on manage

const [loadingId, setLoadingId] = useState<string | null>(null);

const {fetchClientRequest, clientRequests} = useClientsRequestStore()

useEffect(() => {
fetchClientRequest();
}, [fetchClientRequest]);

// Paginated
const [page, setPage] = useState(1);
const itemsPerPage = 20;


// What user selects in dropdown (not yet applied)
const [selectedStatus, setSelectedStatus] = useState<string>("")

// What is actually applied (this triggers filtering)
const [appliedStatus, setAppliedStatus] = useState<string>("")

// Stores filtered data from backend
const [filteredRequests, setFilteredRequests] = useState<any[]>([])

// Loading state when filtering
const [filterLoading, setFilterLoading] = useState(false)

useEffect(() => {

  // If no filter selected → reset everything
  if (!appliedStatus) {
    setFilteredRequests([])     // clear filtered data
    setFilterLoading(false)     // stop loading
    setPage(1)                 // go back to page 1
    return
  }

  // Prevent updating state if component unmounts
  let cancelled = false

  // Start loading
  setFilterLoading(true)

  // Call backend API with status filter
  api.get('/requests', {
    params: {
      status: appliedStatus   // send selected status to backend
    }
  })

  .then((results) => {
    if (cancelled) return

    // Save filtered data from backend
    setFilteredRequests(results.data.data ?? [])

    // Reset page
    setPage(1)
  })

  .catch((error) => {
    console.error(error)

    if (cancelled) return

    // If error → empty list
    setFilteredRequests([])
    setPage(1)
  })

  .finally(() => {
    if (cancelled) return

    // Stop loading
    setFilterLoading(false)
  })

  // Cleanup if component unmounts
  return () => {
    cancelled = true
  }

}, [appliedStatus]) // Runs ONLY when appliedStatus changesppliedStatus])

const start = (page - 1) * itemsPerPage;

// Check if filter is active
const isFilterActive = Boolean(appliedStatus)

// Decide which data to use
const sourceData = isFilterActive 
  ? filteredRequests   // use filtered data
  : clientRequests;   // use all data

  
// Slice data for pagination
const currentItems = sourceData.slice(start, start + itemsPerPage);

const waitForNextFrame = () =>
  new Promise<void>((resolve) => {
// Check if we're in the browser and requestAnimationFrame exists
    if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
      
      // Wait until the browser is about to repaint the screen
      window.requestAnimationFrame(() => resolve());
    
    } else {
      // If requestAnimationFrame is not available (older environments)
      // just resolve immediately after a tiny delay
      setTimeout(resolve, 0);
    }
  });
const handleManageClick = async (request: any) => {
  const requestId = request?.id;
  if (!requestId) return;

  try {
    setLoadingId(requestId);
    NProgress.start();


    await waitForNextFrame();

    navigate(`/reviews/request-details/${requestId}`);

  } catch (error) {
    console.error(error);
  } finally {
    NProgress.done();
    setLoadingId(null);
  }
};



return (
<main className="min-h-screen  ">
<div className="max-w-6xl ml-4  mt-5 ">

  <section className=" border border-slate-200 bg-white p-6 shadow-sm mb-8">
      
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        
        {/* Left content */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2">
            <Briefcase className="w-5 h-5" />
            Client Service Desk
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Service Requests
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Track every client request in a single view, review the context, and manage approvals
            without leaving this board.
          </p>
        </div>

      </div>
    </section>



<section>
<hr className="mt-3 mb-2" />

{/* Search and Filter */}
<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-end mb-4">

  <div className="items-center gap-2 w-full flex justify-end mb-4">

<span className="text-lg">
Filter by

</span>

<div className="flex items-center gap-3 mb-4">

  <select
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    disabled={filterLoading}
    className={`border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white ${
      filterLoading ? "opacity-70 cursor-not-allowed" : ""
    }`}
  >
  <option value="">All</option>
  <option value="DRAFT">Draft</option>
  <option value="PENDING">Pending</option>
  </select>

  <button
    disabled={filterLoading}
    onClick={() => {
      if (filterLoading) return
      setAppliedStatus(selectedStatus)
    }}
    className={`bg-green-600 text-white px-4 py-2 rounded-lg ${
      filterLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"
    }`}
  >
    {filterLoading ? (
      <span className="inline-flex items-center gap-2">
        <Loader2 className="animate-spin" size={16} />
        Applying...
      </span>
    ) : (
      "Apply Filter"
    )}
  </button>

  {appliedStatus && (
    <button
      onClick={() => {
        setSelectedStatus("")
        setAppliedStatus("")
      }}
      className="border border-gray-300 text-slate-700 px-4 py-2 rounded-lg"
    >
      Clear
    </button>
  )}

</div>
    </div>

</div>

{filterLoading && (
  <div className="mb-3 flex items-center gap-2 text-sm text-slate-600">
    <Loader2 className="animate-spin" size={16} />
    Loading filtered requests...
  </div>
)}

{/* Proposal Display */}
<div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg">



<RoleBasedTable 
 currentUser={currentUser}
  currentItems={currentItems}
  loadingId={loadingId}
  handleManageClick={handleManageClick}/>


</div>


{/* Paginated buttons */}
<Stack spacing={2} className="mt-6 flex items-center">

<Pagination
  count={Math.max(1, Math.ceil(sourceData.length / itemsPerPage))}
  page={page}
  onChange={(_e, value) => setPage(value)}
  shape="rounded"
  color="primary"
/>


</Stack>


</section>
</div>
</main>
);

}
