
import { Clock, Loader2, CheckCircle, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import SettingsModal from "./Modal";
import { useProjectStore } from "../../ZustandShare/ProjectZuts";
import { toast } from "sonner";
import { Button } from "@mui/material";




// BUTTONS
type updateStatus = {
  milestoneId:string
  status:string
}

export function StatusBadge({ status }: { status: string }) {
const s = status.toLowerCase();

if (s === "pending") {
return (
<span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium">
  <Clock size={14} />
  Pending
</span>
);
}

if (s === "in_progress") {
return (
<span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs font-medium">
  <Loader2 size={14} className="animate-spin" />
  In Progress
</span>
);
}

if (s === "completed") {
return (
<span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
  <CheckCircle size={14} />
  Completed
</span>
);
}

return (
<span className= "text-gray-500 text-xs px-2 py-1 bg-gray-100 rounded-full">
{status}
</span>
);
}

// QUICK ACTIONS
export function QuickActions({milestoneId, status }:updateStatus){

const [selectedAction, setSelectedAction] = useState<string | null>(null)

const {updateMileStoneStatus} = useProjectStore()

// Loader

const [isLoading, setIsLoading] = useState<boolean>(false)



return (
  <>
  {/*  QUICK ACTIONS TO CHANGE THE  */}
  <div className="flex items-center gap-2 border border-gray-300 rounded-full bg-white p-1 pl-2">
<span className="text-sm  text-gray-400">Quick Actions:</span>


{[
"In Progress",
"completed",
].map((btn)=>{
return <>
<button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 cursor-pointer"

onClick={()=>setSelectedAction(btn)}
>
{btn}
</button>
</>
})}

{/* Modal */}
<SettingsModal
  isOpen={Boolean(selectedAction)}
  onClose={() => setSelectedAction(null)}
  className="bg-white w-[340px] rounded-2xl shadow-xl p-5"
>
  <div className="flex flex-col gap-4">
    
    {/* HEADER */}
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        
        <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
          <CheckCircle size={22} />
        </div>

        <div>
          <h1 className="font-semibold text-gray-800 text-lg">
            Update Status
          </h1>

          <p className="text-sm text-gray-500">
            Confirm this quick action
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedAction(null)}
        className="text-gray-400 hover:text-gray-600"
      >
        <X size={18} />
      </button>
    </div>

    {/* BODY */}
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-start gap-3">
      
      <AlertCircle
        size={20}
        className="text-yellow-500 mt-0.5"
      />

      <p className="text-sm text-gray-600 leading-relaxed">
        Are you sure you want to change the
        project status to{" "}
        <span className="font-semibold text-gray-800">
          {selectedAction}
        </span>
        ?
      </p>
    </div>

    {/* ACTION BUTTONS */}
    <div className="flex justify-end gap-2 pt-2">
      
      <button
        onClick={() => setSelectedAction(null)}
        className="px-4 py-2 text-sm rounded-xl border border-gray-300 hover:bg-gray-50 transition"
      >
        Cancel
      </button>

      <button
        onClick={ async () => {

          try {

          console.log(selectedAction);

          setIsLoading(true)

          await updateMileStoneStatus(milestoneId, selectedAction!.toUpperCase())
          // update logic here
          console.log({
            milestoneId:milestoneId,
            status:selectedAction!.toUpperCase()
          })
          } catch (error:any){
            // toast.error(error.message)
            console.log(error)
          } finally {
            setIsLoading(false)
          setSelectedAction(null);

          }

        }}
        className="px-4 py-2 text-sm rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {isLoading ? <>
        <Loader2 className="animate-spin"/>
        updating progress ...
        </> : <>
        Confirm update
        </>}
      </button>


    </div>
    
  </div>

</SettingsModal>
{/* Text */}


{status === "COMPLETED" && 
<>

<Button variant="outlined"
color="secondary"
sx={{
  textTransform: "uppercase"
}}
>
View Invoice billing
</Button>

</>
}



</div>
</>
)

}


// import React from "react";

// export default function InvoicePage() {
//   const invoice = {
//     invoiceNumber: "INV-2026-001",
//     status: "SENT",
//     issueDate: "16 May 2026",
//     dueDate: "30 May 2026",

//     client: {
//       name: "ABC Company Ltd",
//       email: "info@abc.com",
//       phone: "+233 20 000 0000",
//     },

//     project: {
//       title: "Business Transformation Project",
//     },

//     items: [
//       {
//         description: "Business Advisory",
//         qty: 1,
//         rate: 5000,
//       },
//       {
//         description: "Staff Training",
//         qty: 2,
//         rate: 1500,
//       },
//     ],

//     tax: 500,
//   };

//   const subtotal = invoice.items.reduce(
//     (sum, item) => sum + item.qty * item.rate,
//     0
//   );

//   const total = subtotal + invoice.tax;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">

//         {/* Header */}
//         <div className="flex justify-between items-start border-b pb-6">
//           <div>
//             <h1 className="text-2xl font-bold">INVOICE</h1>
//             <p className="text-gray-500">{invoice.invoiceNumber}</p>
//           </div>

//           <div className="text-right">
//             <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
//               {invoice.status}
//             </span>
//             <p className="text-sm text-gray-500 mt-2">
//               Issue: {invoice.issueDate}
//             </p>
//             <p className="text-sm text-gray-500">
//               Due: {invoice.dueDate}
//             </p>
//           </div>
//         </div>

//         {/* Client + Project */}
//         <div className="grid grid-cols-2 gap-6 mt-6">
//           <div>
//             <h2 className="text-gray-500 text-sm">Billed To</h2>
//             <p className="font-semibold">{invoice.client.name}</p>
//             <p className="text-sm text-gray-500">{invoice.client.email}</p>
//             <p className="text-sm text-gray-500">{invoice.client.phone}</p>
//           </div>

//           <div>
//             <h2 className="text-gray-500 text-sm">Project</h2>
//             <p className="font-semibold">{invoice.project.title}</p>
//           </div>
//         </div>

//         {/* Items */}
//         <div className="mt-8">
//           <table className="w-full text-left border-t">
//             <thead>
//               <tr className="text-gray-500 text-sm">
//                 <th className="py-3">Description</th>
//                 <th>Qty</th>
//                 <th>Rate</th>
//                 <th className="text-right">Amount</th>
//               </tr>
//             </thead>

//             <tbody>
//               {invoice.items.map((item, i) => (
//                 <tr key={i} className="border-t">
//                   <td className="py-3">{item.description}</td>
//                   <td>{item.qty}</td>
//                   <td>GHS {item.rate}</td>
//                   <td className="text-right">
//                     GHS {item.qty * item.rate}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Totals */}
//         <div className="mt-8 flex justify-end">
//           <div className="w-1/2 space-y-2">

//             <div className="flex justify-between text-gray-600">
//               <span>Subtotal</span>
//               <span>GHS {subtotal}</span>
//             </div>

//             <div className="flex justify-between text-gray-600">
//               <span>Tax</span>
//               <span>GHS {invoice.tax}</span>
//             </div>

//             <div className="flex justify-between text-lg font-bold border-t pt-2">
//               <span>Total</span>
//               <span>GHS {total}</span>
//             </div>

//           </div>
//         </div>

//         {/* Actions */}
//         <div className="mt-10 flex gap-3 justify-end">
//           <button className="px-4 py-2 rounded-lg bg-gray-200">
//             Download PDF
//           </button>

//           <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
//             Send Invoice
//           </button>

//           <button className="px-4 py-2 rounded-lg bg-green-600 text-white">
//             Mark as Paid
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }