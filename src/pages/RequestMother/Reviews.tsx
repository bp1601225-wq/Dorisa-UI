import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import { useClientsRequestStore } from "../../ZustandShare/ClientsRequestZuts";
import { useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useAuth } from "../../context/AuthContext";
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

const currentItems = clientRequests;

// pagination and sorting starts here

 

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

{/* Proposal Display */}
<div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg">



<RoleBasedTable 
 currentUser={currentUser}
  currentItems={currentItems}
  loadingId={loadingId}
  handleManageClick={handleManageClick}/>


</div>

</section>
</div>
</main>
);

}
