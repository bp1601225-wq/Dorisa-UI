// ClientRequestDetails.tsx

// This page builds the proposals to be sent to client

import {  Link } from "react-router-dom";
import {
User,
Mail,
Globe,
FileText,
Loader2,
Phone,
FileClock,
ArrowLeft,
} from "lucide-react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

import { useForm } from "react-hook-form";
import { type ProposalZodField, ProposalReviewSchema } from "../../Zod_Schema/schemaValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Proposal } from "../../../GlobalTypes";
import SettingsModal from "../utils/Modal";
import { useProposalStore } from "../../ZustandShare/ProposalZuts";

function ClientRequestDetailsId() {

const {id} = useParams()


const [details, setDetails] = useState<any>(null);

const [pendingData, setPendingData] = useState<Proposal | null>(null)

const [isOpen, setIsOpen] = useState<boolean>(false)

// RHF
const { register, handleSubmit, formState:{errors} } = useForm<ProposalZodField>({
resolver: zodResolver(ProposalReviewSchema),
});

// make an API call here to fetch the detailed request
useEffect(() => {
if (!id) return;

const fetchDetails = async () => {
const res = await api.get(`/get-all-client-requests-id/${id}`);

const Data = res.data.data
setDetails(Data)
};

fetchDetails();
}, [id]);


// extract create proposal

const {createProposal} = useProposalStore()

useEffect(() => {
console.log("UPDATED DETAILS:", details);
}, [details]);



//  guard the data
if (!details) {
return <div className="p-6 text-slate-500">
Loading...
<Loader2 className="animate-spin"/>
</div>;
}




//  Compute the clients fullName
const fullName = [
details?.client?.firstName,
details?.client?.middleName,
details?.client?.lastName
] 
.filter(Boolean)
.join(" ") || details.clients.fullName;





return (
  <div className="min-h-screen p-3 ml-10">
    <span className="text-red-500">This is the Client Request table id 
      
      {id}</span>

    <div className="max-w-5xl space-y-6">

      {/* BACK */}
      <Link to="/reviews">
        <span className="flex items-center gap-2 text-blue-400 hover:text-blue-600">
          <ArrowLeft />
          Back to Review
        </span>
      </Link>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Proposal Builder
          </h1>
          <p className="text-sm text-slate-500">
            Customize your offer, define deliverables, and send it for client review.
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-green-300 p-6 space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* LEFT FORM */}
         <form
  onSubmit={handleSubmit((data) => {

    const finalData = {
      ...data,
      client_request_id: details.id,
     service_id: details.service.id,
     client_id: details.client.id
    }

    console.log(finalData)


    setPendingData(finalData);

    setIsOpen(true); // ✅ open AFTER valid


  }, 

(errors) => {
console.log(errors)
}

)}
            className="lg:w-[500px] space-y-6 border-t pt-6 lg:border-t-0 lg:border-r lg:pr-6 lg:pt-0 lg:order-first"
          >

            {/* TITLE */}
            <h3 className="text-sm font-semibold text-slate-700 flex flex-col gap-1">
              <span className="flex items-center gap-2">
                <FileText size={16} className="text-green-600" />
                Tailor builder
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-[0.4em]"></span>
            </h3>

            {/* SCOPE */}
            <div className="space-y-2">
              <label className="text-xs text-slate-500">Scope of Work</label>
              <textarea
                className="w-full border border-gray-300 rounded-xl p-3 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                rows={4}
                {...register("scope")}
              />

                 {errors.scope && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.scope.message}
                </p>
              )}
            </div>


            {/* DELIVERABLES */}
            <div className="space-y-2">
              <label className="text-xs text-slate-500">Deliverables</label>
              <textarea
                className="w-full border border-gray-300 rounded-xl p-3 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                rows={4}
                {...register("deliverables")}
              />
              {errors.deliverables && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.deliverables.message}
                </p>
              )}
            </div>

            {/* TIMELINE + PRICING */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Timeline */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500">Timeline</label>
                <input
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                  {...register("timeline")}
                />
                {errors.timeline && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.timeline.message}
                  </p>
                )}
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500">Pricing</label>
                <input
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                  {...register("pricing", { valueAsNumber: true })}
                />
                {errors.pricing && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.pricing.message}
                  </p>
                )}
              </div>

            </div>

            {/* TERMS */}
            <div className="space-y-2 ">
              <label className="text-xs text-slate-500">Terms & Conditions</label>
              <textarea
                className="w-full border border-gray-300 rounded-xl p-3 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-100 transition
                "
                rows={4}
                {...register("termsAndConditions")}
              />
              {errors.termsAndConditions && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.termsAndConditions.message}
                </p>
              )}
            </div>

            {/* ACTION */}
            <div className="mt-3 flex gap-4 items-center justify-end">
           
           <select className="border p-1 w-24"
            {...register("status")}
           >
            <option value="PENDING">Pending</option>
           </select>

              <Button type="submit" variant="contained" color="secondary" 
              >
                Submit Proposal
              </Button>
            </div>

          </form>

          {/* RIGHT SIDE (UNCHANGED) */}
          <div className="space-y-6 lg:flex-1">

            {/* CLIENT */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-sm text-slate-500 flex items-center gap-2">
                  <User size={16} /> Client
                </h3>

                {fullName}

                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Mail size={14} /> 
                  {details.client.email}
                </p>

                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Globe size={14} />
                  {details.client.country}
                </p>

                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Phone size={14} />
                  {details.client.phone}
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold bg-gray-100 text-amber-700">
                <FileClock size={16} />
                {details.request_status}
              </div>
            </div>

            {/* SERVICE */}
            <div>
              <h3 className="text-sm text-slate-500 flex items-center gap-2 mb-1">
                <FileText size={16} /> Service
              </h3>

              <p className="text-lg font-semibold">
                {details.service.ServiceName}
              </p>

              <p className="text-sm text-slate-600">
                {details.service.Description}
              </p>
            </div>

<div className="space-y-4">
  <h3 className="text-sm font-semibold text-slate-700">
    Proposal Overview
  </h3>

  <div className="space-y-3 text-sm text-slate-600">

    <div>
      <p className="font-medium text-slate-800">Scope of Work</p>
      <p>What will be done in this project.</p>
    </div>

    <div>
      <p className="font-medium text-slate-800">Deliverables</p>
      <p>What you will receive after completion.</p>
    </div>

    <div>
      <p className="font-medium text-slate-800">Timeline</p>
      <p>How long the project will take.</p>
    </div>

    <div>
      <p className="font-medium text-slate-800">Pricing</p>
      <p>Total cost of the project.</p>
    </div>

    <div>
      <p className="font-medium text-slate-800">Terms & Conditions</p>
      <p>Rules and agreements for the project.</p>
    </div>

  </div>
</div>





          </div>
        </div>
      </div>
    </div>

    {/* Modal openuing */}

{pendingData && (
  <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
    <div className="bg-white p-6 rounded-2xl  max-w-4xl overflow-y-scroll h-[400px] max-h-[500px]">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Proposal Preview
        </h2>

        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 flex">
          <FileClock size={15} />
          {details.request_status}
        </span>
      </div>

      {/* BODY */}
      <div className="space-y-5 text-sm">

        {/* Scope */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Scope of Work
          </p>
          <p className="text-slate-700 mt-1 leading-relaxed">
            {pendingData.scope}
          </p>
        </div>

        {/* Deliverables */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Deliverables
          </p>
          <p className="text-slate-700 mt-1 leading-relaxed">
            {pendingData.deliverables}
          </p>
        </div>

        {/* Timeline + Pricing (SIDE BY SIDE) */}
        <div className="grid grid-cols-2 gap-4">

          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-xs text-slate-500">Timeline</p>
            <p className="text-slate-800 font-medium mt-1">
              {pendingData.timeline}
            </p>
          </div>

          <div className="bg-green-50 p-3 rounded-xl">
            <p className="text-xs text-slate-500">Pricing</p>
            <p className="text-green-700 font-semibold text-lg mt-1">
               ₵{pendingData.pricing}
            </p>
          </div>

        </div>

        {/* Terms */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest">
            Terms & Conditions
          </p>
          <p className="text-slate-700 mt-1 leading-relaxed h-[100px] max-h-[200px] bg-gray-100 mt-2 p-1 overflow-y-scroll ">
            {pendingData.termsAndConditions}
          </p>
        </div>

      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 border-t">

        <Button
          variant="outlined"
          onClick={() => setIsOpen(false)}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={ async () => {
            console.log("FINAL SUBMIT:", pendingData);


            // make an API call
          await createProposal(pendingData)

          setIsOpen(false)
          }}
        >
          Confirm & Send
        </Button>

      </div>

    </div>
  </SettingsModal>
)}
  </div>
);
}

export default ClientRequestDetailsId;