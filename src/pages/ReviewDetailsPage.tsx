import { Link, useParams } from "react-router-dom";
import {  useState } from "react";
import { useClientsReviewStore } from "../ZustandShare/ClientsReviewZuts";
import {
CheckCircle,
Clock,
XCircle,
User,
Mail,
Globe,
FileText,
Calendar,
ArrowLeft,
Phone,
Package,  DollarSign, FileCheck,
ArrowRight
} from "lucide-react";



import { useForm } from "react-hook-form";
import type { ProjectProposal } from "../../GlobalTypes";
import { ProposalReviewSchema, type ReviewField } from "../Zod_Schema/schemaValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import SettingsModal from "./utils/Modal";
import { useProposalReviewStore } from "../ZustandShare/ProposalReviewZuts";

function ReviewDetailsPage() {
const { clientReviews } = useClientsReviewStore() as { clientReviews: any };
const { id } = useParams();

// Zustand API shared update (This is to send to client for review)

const { createProposalReview } = useProposalReviewStore()

// STATES 
const [pendingData, setPendingData] = useState<ReviewField | null>(null);

const [isConfirmProposal, setIsConfirmProposal] = useState<boolean>(false)


const [isLoading, setIsLoading] = useState(false);




// React hook form

const {handleSubmit, reset, register, formState:{errors, isSubmitting}} = useForm<ReviewField>({
  resolver:zodResolver(ProposalReviewSchema)
})

const matchingProposal = clientReviews.find((p: any) => p.id === id);

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


// Function to submit proposal


async function handleConfirm() {
  if (!pendingData) return;

  setIsLoading(true);

  try {
    const payload: ProjectProposal = {
      ...pendingData,
      status: "PENDING",
      service_id: matchingProposal.service.id,
      client_id: matchingProposal.client.id,
    };

    console.log(payload);
    await createProposalReview(payload)
  

  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
    setIsConfirmProposal(false);
    setPendingData(null);
    reset()
  }
}




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

<Link to = "/reviews">
<span className="flex items-center gap-2 text-blue-400 hover:text-blue-600 ">
<ArrowLeft />
Back to Review 
</span>
</Link>

  {/* HEADER */}
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold text-green-600">
        Projects Proposal Sent
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
  <div className="bg-white rounded-2xl shadow-sm border border-green-300 p-6 space-y-6">
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
              matchingProposal.client?.firstName,
              matchingProposal.client?.middleName,
              matchingProposal.client?.lastName,
            ]
              .filter(Boolean)
              .join(" ") || "N/A"}
          </span>
        </h3>

        {/* SCOPE OF WORK */}

      <form
  onSubmit={handleSubmit((data) => {
    setPendingData(data); // store data
    setIsConfirmProposal(true); // open modal
  })}
>


        <div className="space-y-2">

          <label className="text-xs text-slate-500">Scope of Work</label>
          <textarea
          {...register("scope")}
            placeholder="Describe what you will do for the client (e.g. Provide business advisory including analysis, strategy, and growth recommendations...)"
            className="mt-1 w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            rows={4}
          />

        {errors.scope && (
  <p className="text-red-500 text-xs">{errors.scope.message}</p>
)}
          
        </div>




        {/* DELIVERABLES */}
        <div className="space-y-2">
          <label className="text-xs text-slate-500">Deliverables</label>
          <textarea
          {...register("deliverables")}
            placeholder={`- Business analysis report\n- Market research insights\n- Strategy roadmap\n- Actionable recommendations`}
            className="mt-1 w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            rows={4}
          />
        </div>

{errors.deliverables && (
  <p className="text-red-500 text-xs">{errors.deliverables.message}</p>

)}
        {/* TIMELINE */}
        <div className="space-y-2">
          <label className="text-xs text-slate-500">Timeline</label>
          <input
          {...register("timeline")}
            placeholder="e.g. 2–4 weeks depending on project complexity"
            className="mt-1 w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
    
    
{errors.timeline && (
  <p className="text-red-500 text-xs">{errors.timeline.message}</p>

)}
    

        {/* PRICING */}
        <div className="space-y-2">
          <label className="text-xs text-slate-500">Pricing</label>
          <input
          {...register("pricing", {valueAsNumber:true})}
            placeholder="e.g. $500 one-time / $200 monthly retainer"
            className="mt-1 w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
      
{errors.pricing && (
  <p className="text-red-500 text-xs">{errors.pricing.message}</p>

)}

        {/* TERMS */}
        <div className="space-y-2">
          <label className="text-xs text-slate-500">Terms & Conditions</label>
          <textarea
          {...register("termsAndConditions")}
            placeholder={`- Advisory service only\n- No guaranteed results\n- Confidential information protected\n- Limited to agreed scope`}
            className="mt-1 w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            rows={4}
          />
        </div>

{errors.termsAndConditions && (
  <p className="text-red-500 text-xs">{errors.termsAndConditions.message}</p>

)}




<div className=" flex mt-2 gap-5 flex-col">

{errors.status && (
  <p className="text-red-500 text-xs">{errors.status.message}</p>

)}

  


<div className="flex gap-4 items-center justify-between">



          <select
          {...register("status")}
onChange={(e) => handleStatusChange(e.target.value)}
className="px-6 py-2 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
defaultValue=""
>

<option value="DRAFT">Draft</option>

</select>

<ArrowRight />

<button
type="submit"
disabled={isSubmitting}
className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold 
        hover:bg-blue-700 active:scale-95 transition duration-200 
        shadow-md hover:shadow-lg border border-blue-600 cursor-pointer"
>
Submit Proposal
</button>

</div>

</div>
        </form>



        
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

<div className="space-y-4">
  <h3 className="text-sm text-slate-500 uppercase tracking-wide">
    Proposal Details
  </h3>

  <div className="space-y-5">

    <div className="flex gap-3 items-start">
      <FileText size={18} className="text-slate-400 mt-1" />
      <div>
        <p className="text-sm font-semibold text-slate-800">Scope</p>
        <p className="text-sm text-slate-500">
          What will be done in this project.
        </p>
      </div>
    </div>

    <div className="flex gap-3 items-start">
      <Package size={18} className="text-slate-400 mt-1" />
      <div>
        <p className="text-sm font-semibold text-slate-800">Deliverables</p>
        <p className="text-sm text-slate-500">
          What the client will receive.
        </p>
      </div>
    </div>

    <div className="flex gap-3 items-start">
      <Clock size={18} className="text-slate-400 mt-1" />
      <div>
        <p className="text-sm font-semibold text-slate-800">Timeline</p>
        <p className="text-sm text-slate-500">
          Time required to complete the work.
        </p>
      </div>
    </div>

    <div className="flex gap-3 items-start">
      <DollarSign size={18} className="text-slate-400 mt-1" />
      <div>
        <p className="text-sm font-semibold text-slate-800">Pricing</p>
        <p className="text-sm text-slate-500">
          Cost of the service.
        </p>
      </div>
    </div>

    <div className="flex gap-3 items-start">
      <FileCheck size={18} className="text-slate-400 mt-1" />
      <div>
        <p className="text-sm font-semibold text-slate-800">Terms</p>
        <p className="text-sm text-slate-500">
          Agreement rules and conditions.
        </p>
      </div>
    </div>

  </div>
</div>

<hr />


      </div>



<div>
</div>


    </div>


    <div>
    </div>

      {/* ACTIONS */}
  {/* <div className="pt-4 border-t">
<select
onChange={(e) => handleStatusChange(e.target.value)}
className="px-4 py-2 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
defaultValue=""
>
<option value="" disabled>
Select status
</option>
<option value="Approved">Approve</option>
<option value="Pending">Pending</option>
<option value="Rejected">Reject</option>
</select>
</div> */}




    {/* FOOTER */}
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <Calendar size={14} />
      Created:{" "}
      {new Date(matchingProposal.createdAt).toLocaleDateString()}
    </div>
  </div>

  
</div>
{isConfirmProposal && (
  <SettingsModal
    isOpen={isConfirmProposal}
    onClose={() => setIsConfirmProposal(false)}
  >
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
        <CheckCircle size={20} className="text-emerald-500" />
        Confirm Submission
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-slate-500">
        Review your proposal and client details before submitting.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT - PROPOSAL */}
        <div className="space-y-4">

          <p className="text-xs text-slate-400 uppercase">Proposal</p>

          {[
            { label: "Scope", value: pendingData?.scope, current: matchingProposal.scope },
            { label: "Deliverables", value: pendingData?.deliverables, current: matchingProposal.deliverables },
            { label: "Timeline", value: pendingData?.timeline, current: matchingProposal.timeline },
            { label: "Pricing", value: pendingData?.pricing, current: matchingProposal.pricing },
            { label: "Status", value: pendingData?.status, current: matchingProposal.proposal_status },
            { label: "Terms and Condition", value: pendingData?.termsAndConditions, current: matchingProposal.timeline },
            
          ].map((item) => (
            <div key={item.label} className="space-y-1">

              <p className="text-sm font-medium text-slate-800">
                {item.label}
              </p>

              <div className="text-xs space-y-1">
                <p className="text-slate-400">
                  Current: {item.current || "—"}
                </p>
                <p className="text-blue-600">
                  New: {item.value}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* RIGHT - CLIENT */}
       <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm">

  {/* HEADER */}
  <div className="flex items-center justify-between">
    <p className="text-xs text-slate-400 uppercase tracking-wider">
      Client Details
    </p>

    <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
      Active
    </span>
  </div>

  {/* NAME */}
  <div>
    <p className="text-base font-semibold text-slate-900 leading-tight">
      {matchingProposal.client.fullName ||
        `${matchingProposal.client.firstName} ${
          matchingProposal.client.middleName || ""
        } ${matchingProposal.client.lastName}`}
    </p>

    <p className="text-xs text-slate-400">
      Client of your service
    </p>
  </div>

  {/* CONTACT INFO */}
  <div className="space-y-3">

    {/* PHONE */}
    <div className="flex items-center gap-3 text-sm">
      <div className="p-2 bg-slate-100 rounded-lg">
        <Phone size={14} className="text-slate-600" />
      </div>
      <div>
        <p className="text-[11px] text-slate-400">Phone</p>
        <p className="text-slate-700 font-medium">
          {matchingProposal.client.phone}
        </p>
      </div>
    </div>

    {/* EMAIL */}
    <div className="flex items-center gap-3 text-sm">
      <div className="p-2 bg-slate-100 rounded-lg">
        <Mail size={14} className="text-slate-600" />
      </div>
      <div>
        <p className="text-[11px] text-slate-400">Email</p>
        <p className="text-slate-700 font-medium break-all">
          {matchingProposal.client.email}
        </p>
      </div>
    </div>

  </div>

  {/* EXTRA "WOW" INFO */}
  <div className="pt-3 border-t border-slate-100">

    <p className="text-[11px] text-slate-400 uppercase">
      Quick Summary
    </p>

    <div className="flex justify-between text-xs mt-2">
      <span className="text-slate-500">Status</span>
      <span className="text-emerald-600 font-medium">
        Connected
      </span>
    </div>

    <div className="flex justify-between text-xs mt-1">
      <span className="text-slate-500">Last Contact</span>
      <span className="text-slate-700">
        Recently
      </span>
    </div>

  </div>

</div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-2 border-t pt-4">

        <button
          onClick={() => setIsConfirmProposal(false)}
          className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg 
                     hover:bg-black transition disabled:opacity-50 
                     flex items-center gap-2"
        >
          <CheckCircle size={16} />
          {isLoading ? "Submitting..." : "Confirm"}
        </button>

      </div>

    </div>
  </SettingsModal>
)}
</div>
);
}

export default ReviewDetailsPage;
