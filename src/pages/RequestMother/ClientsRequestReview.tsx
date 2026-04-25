import { useState } from "react";
import TabsUI, { type RequestReviewTab } from "./TabUI";
import ClientsReview from "./Reviews";
import { ProposalReviewList } from "./Proposals/Proposals";
import ProjectView from "./Projects/Project";

// Client requests board: services requested by clients and their review/status.




export default function ClientRequestReview() {
const [activeTab, setActiveTab] = useState<RequestReviewTab>("requests");

return (
<main className="min-h-screen">
<div className="w-full ">


<section>
<div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
  <div>
    <h2 className="text-xl font-semibold text-slate-900">All Requests</h2>
    <p className="text-sm text-slate-500">Sorted by newest first • Tap any card to review or adjust.</p>
  </div>
  <button className="text-sm font-semibold uppercase tracking-wider text-slate-800 hover:text-slate-900">
    Filter &amp; Sort
  </button>
</div>

<hr className="mb-3 text-green-200" />

<TabsUI activeTab={activeTab} onChange={setActiveTab} />

{activeTab === "requests" && <ClientsReview />}

{activeTab === "proposals" &&
<ProposalReviewList />
}


{activeTab === "approved" && (
  <div className="w-full p-4 pt-2">
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg text-slate-600">
      No approved items yet.
    </div>
  </div>
)}

{activeTab === "projects" && (
 <ProjectView />
)}
</section>
</div>
</main>
);
}
