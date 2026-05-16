import { useParams } from "react-router-dom";
import api from "../../api";
import { useEffect, useState } from "react";
import { Button, Divider,  } from "@mui/material";
import {
FileText,
ListCheck,
Briefcase,
Mail,
Phone,
BadgeDollarSign,
MessageSquare,
X,
RefreshCcw,
Banknote,
ArrowRight,
} from "lucide-react";
import SettingsModal from "../utils/Modal";
import {ProposalVersionSchema,  } from "../../Zod_Schema/schemaValidations";
import {useForm,} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useProposalStore } from "../../ZustandShare/ProposalZuts";
import { useLoadingStore } from "../../ZustandShare/LoadingZuts";
import { useAuth } from "../../context/AuthContext";
import type { ProjectType } from "../../../GlobalTypes";
import { useProjectStore } from "../../ZustandShare/ProjectZuts";


function ProposalNegotiation() {
const { id } = useParams();
const [proposal, setProposal] = useState<any>(null);
const [isModalOpen, setIsOpenModal] = useState<boolean>(false)

const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)

const [isVersionModal, setIsVersionModal] = useState<boolean>(false)



const {currentUser} = useAuth()
//  Open Modal

const { createNewProposalsVersion} = useProposalStore()
// React hook form


// loader states
const { startLoading, stopLoading } = useLoadingStore();

const [loadingVersions, setLoadingVersions] = useState(false);

console.log(proposal)



const {createProjects} = useProjectStore()

const {register, handleSubmit, watch, reset, formState:{errors, isSubmitting} } = useForm({
resolver: zodResolver(ProposalVersionSchema)
})

const watchedAmount = watch("amount");
useEffect(() => {
if (!id) return;
const fetchProposal = async () => {
try {
startLoading("Fetching proposal...");

const res = await api.get(`/get-proposals-by-id/${id}`)
console.log(res.data.data)
setProposal(res.data.data);

} catch (err) {
console.log(err);
} finally {
stopLoading();
}
};

fetchProposal();
}, [id]);

if (!proposal) {
return <div className="p-6 text-gray-500">Loading...</div>;
}




type FormData = {
amount:number,
message:string
}


async function CreateProposalVersion(data: FormData) {
if (!proposal) return;

const newVersion = {
proposalId: proposal.id,
clientId: proposal.client.id,
serviceId: proposal.service.id,
amount: data.amount,
message: data.message,
version: 0, // keep as number (simpler)
};

try { 

console.log("Version created", newVersion);


startLoading("Creating proposal version...");



// create a new version
await createNewProposalsVersion(newVersion)



// make another API call
const res = await api.get(`/get-proposals-by-id/${proposal.id}`);
setProposal(res.data.data);


setIsOpenUpdateModal(false);

reset()
} catch (err) {
console.log(err);
} finally{
stopLoading()
}
}

//  when approved a project is created
async function ApproveProposal(){
if (!proposal) return

if (!currentUser?.id) return


// let client_request_id = proposal.client_request_id.id

const project:ProjectType = {
service_id:proposal.service.id,
proposal_id:proposal.id,
client_request_id:proposal.clientRequest.id,
client_id:currentUser.id,
projectStatus: "PLANNING"


}

console.log(project)
await createProjects(project)
}


return (
<div className="w-full p-6">


<p>Client has send a negotiation</p>

<div className="rounded-xl p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm mb-4">
<div className="flex flex-col gap-1">
<h1 className="text-xl font-semibold">
Negotiation Overview
</h1>

<p className="text-sm opacity-90">
Proposal ID: {id}
</p>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 max-w-6xl ">

{/* LEFT SIDE */}
<div className="space-y-6">

{/* HEADER */}
<div className="bg-white border border-gray-200 rounded-xl p-5">
<h1 className="text-xl font-semibold text-gray-900">
Negotiation Overview
</h1>

<p className="text-sm text-gray-500 mt-1">
Proposal ID: {id}
</p>

<div className="mt-3 flex items-center gap-4 text-sm text-gray-700">
<div className="flex items-center gap-2">
  <BadgeDollarSign size={16} />
  ₵{proposal.pricing}
</div>

<div className="text-yellow-600 font-medium">
  {proposal.status}
</div>
</div>
</div>

{/* PROPOSAL DETAILS */}
<div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
<h2 className="text-md font-medium text-gray-800">
Proposal Details
</h2>

<Divider />

<div className="space-y-4 text-sm text-gray-700">

<div className="flex items-start gap-3">
  <Briefcase size={16} className="mt-1 text-gray-400" />
  <div>
    <p className="text-gray-500 text-xs">Service</p>
    <p className="font-medium text-gray-900">
      {proposal.service?.ServiceName}
    </p>
  </div>
</div>

<div className="flex items-start gap-3">
  <ListCheck size={16} className="mt-1 text-gray-400" />
  <div>
    <p className="text-gray-500 text-xs">Deliverables</p>
    <p className=" text-gray-900">
      {proposal.deliverables}
    </p>
  </div>
</div>

<div className="flex items-start gap-3">
  <FileText size={16} className="mt-1 text-gray-400" />
  <div>
    <p className="text-gray-500 text-xs">Scope</p>
    <p className=" text-gray-900">
      {proposal.scope}
    </p>
  </div>
</div>

</div>
</div>

{/* NEGOTIATION HISTORY */}
<div className="bg-white border border-gray-200 rounded-xl p-5">
<h2 className="text-md font-medium text-gray-800 mb-4">
Reasons for Negotiating
</h2>

{proposal.Negotiate?.length > 0 ? (
<div className="space-y-3">
  {proposal.Negotiate.map((item: any, index: number) => (
    <div
      key={index}
      className="border border-gray-100 rounded-lg p-3 bg-gray-50"
    >
      <p className="text-sm text-gray-700">
        {item.NegotiatingText}
      </p>
    </div>
  ))}

  
</div>
) : (
<p className="text-sm text-gray-500">
  No negotiation activity yet.
</p>
)}
</div>

</div>

{/* RIGHT SIDE (CLIENT DETAILS) */}
<aside className="lg:sticky lg:top-6 h-fit">
<div className="bg-white border border-green-300 rounded-xl p-5 space-y-4">

<h2 className="text-md font-medium text-gray-800">
Client Details
</h2>

<Divider />

<div className="space-y-4 text-sm">

<div className="flex items-center gap-3">
  <Mail size={16} className="text-gray-400" />
  <div>
    <p className="text-gray-500 text-xs">Email</p>
    <a
      href={`mailto:${proposal.client?.email}`}
      className="font-medium text-blue-600"
    >
      {proposal.client?.email || "—"}
    </a>
  </div>
</div>

<div className="flex items-center gap-3">
  <Phone size={16} className="text-gray-400" />
  <div>
    <p className="text-gray-500 text-xs">Phone</p>
    <a
      href={`tel:${proposal.client?.phone}`}
      className="font-medium text-blue-600"
    >
      {proposal.client?.phone || "—"}
    </a>
  </div>
</div>

</div>

</div>


<Divider className=""/>
<div className="flex flex-col sm:flex-row gap-3 mt-8 flex-wrap">
<div className="flex flex-col sm:flex-row gap-3 mt-8">

{/* PRIMARY ACTION */}
<Button
variant="contained"
color="success"
fullWidth
sx={{ textTransform: "none" }}
onClick={() => setIsOpenModal(true)}
>
Approve
</Button>

{/* SECONDARY */}
<Button
variant="outlined"
fullWidth
sx={{ textTransform: "none" }}
onClick={()=>setIsOpenUpdateModal(true)}
>
Update
</Button>

{/* DANGER */}
{/* <Button
variant="outlined"
color="error"
fullWidth
sx={{ textTransform: "none" }}
>
Reject
</Button> */}

{/* NEUTRAL ACTION */}
<Button
variant="text"
color="primary"
fullWidth
href={`tel:${proposal.client?.phone}`}
sx={{ textTransform: "none" }}
>
Call Client
</Button>


</div>

</div>

<div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm flex items-start gap-4">

{/* ICON */}
<div className="p-3 bg-white rounded-xl shadow-sm">
<RefreshCcw className="w-5 h-5 text-blue-600" />
</div> 

{/* CONTENT */}
<div className="flex-1">
<p className="text-sm text-gray-700 leading-relaxed">
An updated version of the proposal has been submitted for your review.
</p>

<Button
variant="contained"
color="primary"
endIcon={<ArrowRight size={16} />}

onClick={async () => {
if (!proposal) return;

try {
setLoadingVersions(true);
startLoading("Loading versions...");

const res = await api.get(`/get-proposals-by-id/${proposal.id}`);
setProposal(res.data.data);

setIsVersionModal(true);
} catch (err) {
console.log(err);
} finally {
setLoadingVersions(false);
stopLoading();
}
}}
sx={{
textTransform: "none",
marginTop: "12px",
borderRadius: "10px",
}}
>
View New Version
</Button>
</div>

</div>


</aside>


{/*  Approved Modal */}
{isModalOpen && <>


{isModalOpen && (
<SettingsModal isOpen={isModalOpen} onClose={() => setIsOpenModal(false)}>
<div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 space-y-5">

{/* HEADER */}
<div>
<h2 className="text-lg font-semibold text-gray-900">
Approve Negotiation
</h2>
<p className="text-sm text-gray-500 mt-1">
You are about to approve the latest negotiated offer.
</p>
</div>

{/* OFFER SUMMARY */}
<div className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-3 text-sm">

<div className="flex justify-between">
<span className="text-gray-500">Service</span>
<span className="font-medium text-gray-900">
{proposal.service?.ServiceName}
</span>
</div>

<div className="flex justify-between">
<span className="text-gray-500">Current Price</span>
<span className="font-semibold text-green-600">
₵{proposal.pricing}
</span>
</div>

<div className="flex justify-between">
<span className="text-gray-500">Status</span>
<span className="text-gray-900">
{proposal.status}
</span>
</div>

</div>

{/* WARNING */}
<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-700">
This action will finalize the agreement and start the project.
</div>

{/* ACTIONS */}
<div className="flex gap-3 pt-2">

<button
onClick={() => setIsOpenModal(false)}
className="w-full px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100"
>
Cancel
</button>

<button
onClick={() => {
// 👉 call your approve function here
console.log("APPROVED");
setIsOpenModal(false);
}}
className="w-full px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
>
Approve Offer
</button>

</div>

</div>
</SettingsModal>
)}
</>}



{/* Update Modal */}
<SettingsModal
isOpen={isOpenUpdateModal}
onClose={() => setIsOpenUpdateModal(false)}
>
<form
onSubmit={handleSubmit(CreateProposalVersion)}
className="relative w-[900px] bg-white max-w-xl rounded-2xl shadow-2xl  animate-in fade-in zoom-in duration-200"
>

{/* HEADER */}
<div className="p-6 pb-0 flex items-start justify-between">
<div className="flex gap-4">
<div className="p-3 bg-blue-50 rounded-xl">
<RefreshCcw className="w-6 h-6 text-blue-600" />
</div>
<div>
<h2 className="text-xl font-bold text-gray-900">
Create a new proposal version
</h2>
<p className="text-sm text-gray-500">
Refine your terms and notify the client.
</p>
</div>
</div>

<button
type="button"
onClick={() => setIsOpenUpdateModal(false)}
className="p-1 hover:bg-gray-100 rounded-full"
>
<X className="w-5 h-5 text-gray-400" />
</button>
</div>

<div className="p-6 space-y-6">

{/* PRICE PREVIEW */}
<div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
<div className="flex justify-between text-sm">
<div>
<p className="text-gray-400 text-xs">Current</p>
<p className="font-semibold">₵{proposal.pricing}</p>
</div>

<div className="text-right">
<p className="text-blue-500 text-xs">New</p>
<p>
</p>
<p className="font-bold text-blue-600">
{watchedAmount ? `₵${watchedAmount}` : "—"}
</p>
</div>
</div>
</div>

{/* INPUTS */}
<div className="space-y-4">

{/* PRICE */}
<div>
<label className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-2">
<Banknote size={16} /> Amount
</label>

<input
type="number"
placeholder="Enter new price"
{...register("amount")}
className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-200 outline-none"
/>

{errors.amount && (
<p className="text-red-500 text-xs mt-1">
{errors.amount.message}
</p>
)}
</div>

{/* MESSAGE */}
<div>
<label className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-2">
<MessageSquare size={16} /> Message
</label>

<textarea
rows={3}
placeholder="Explain the change..."
{...register("message")}
className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-200 outline-none "
/>

{errors.message && (
<p className="text-red-500 text-xs mt-1">
{errors.message.message}
</p>
)}
</div>

</div>

{/* ACTIONS */}
<div className="flex pt-2 justify-end gap-3">
<div className="flex pt-2 justify-end gap-3">

<Button
type="button"
variant="outlined"
color="inherit"
onClick={() => setIsOpenUpdateModal(false)}
sx={{
textTransform: "none",
px: 2,
py: 0.8,
// fontSize: "13px",
// borderRadius: "10px",
}}
>
Cancel
</Button>

<Button
type="submit"
variant="contained"
color="primary"
sx={{
textTransform: "none",
px: 2,
py: 0.8,
// fontSize: "13px",
// borderRadius: "10px",
}}
>
Submit
</Button>

</div>

</div>

</div>
</form>
</SettingsModal>



{/* Update Modal */}
</div>



{/*  Version Modal */}
<SettingsModal isOpen={isVersionModal} onClose={() => setIsVersionModal(false)}>
<div className="bg-white w-full max-w-3xl rounded-2xl p-5">

{/* HEADER */}
<div className="flex items-center justify-between mb-4">
<h2 className="text-lg font-semibold text-gray-800">
Proposal Versions
</h2>

<span className="text-sm text-gray-500">
Total: {proposal.versions?.length ?? 0}
</span>
</div>

{/* EMPTY STATE */}

{loadingVersions ? (
<div className="flex justify-center py-10">
<p>Loading versions...</p>
</div>
) : !proposal.versions || proposal.versions.length === 0 ? (
<div className="flex flex-col items-center justify-center py-12 text-center">

{/* ICON */}
<div className="bg-gray-100 p-4 rounded-full mb-4">
<FileText className="w-6 h-6 text-gray-400" />
</div>

{/* TITLE */}
<h3 className="text-md font-semibold text-gray-700">
No Proposal Versions Yet
</h3>

{/* DESCRIPTION */}
<p className="text-sm text-gray-500 mt-1 max-w-xs">
No revisions have been made to this proposal. 
When updates are created, they will appear here.
</p>

{/* OPTIONAL ACTION */}
{/* <button
onClick={() => setIsOpenUpdateModal(true)}
className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
>
Create First Version
</button> */}

</div>
) : (
<div className="space-y-3 max-h-[400px] overflow-y-auto">

{proposal.versions
.slice()
.sort((a: any, b: any) => b.version - a.version)
.map((v: any) => (
<div
key={v.id}
className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
>

{/* TOP ROW */}
<div className="flex items-center justify-between">
  <h3 className="font-semibold text-gray-800">
    Version {v.version}
  </h3>

  <span
    className={`text-xs px-2 py-1 rounded-full ${
      v.status === "NEGOTIATING"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {v.status}
  </span>
</div>

{/* MESSAGE */}
<p className="text-sm text-gray-600 mt-2">
  {v.message}
</p>

{/* AMOUNT */}
<div className="mt-3 flex items-center justify-between text-sm">
  <span className="text-gray-500">Amount</span>
  <span className="font-semibold text-gray-900">
    ₵{v.amount}
  </span>
</div>

{/* DATE */}
<p className="text-xs text-gray-400 mt-2">
  {new Date(v.createdAt).toLocaleString()}
</p>


<div className="flex gap-3 mt-2">

<Button
onClick={ApproveProposal}
variant="contained"
color="secondary"
sx={{ textTransform: "none" }}
>
Approve
</Button>


{/* Email to Admin to discuss changes */}

<Button
variant="outlined"
color="primary"
sx={{ textTransform: "none" }}
>
Discuss changes
</Button>
</div>


</div>
))}
</div>
)}
</div>
</SettingsModal>

</div>
);
}

export default ProposalNegotiation;
