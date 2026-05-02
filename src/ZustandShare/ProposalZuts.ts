import { create } from "zustand"
import { type NegotiationType, type Proposal } from "../../GlobalTypes"
import api from "../api"
import { toast } from "sonner"





// Proposals array contain everything of client details


// functions to infer from type

type ProposalZutsType = {
  proposalReviews: Proposal[]
  fetchProposals: () => Promise<void>
  createProposal: (proposal: Proposal) => Promise<void>
  editProposal: (updatedProposal: Proposal) => Promise<void>
  updateProposalStatus: (id:string, status:string) => Promise<void>


  // Negotiatiating array
  Negotiaton:NegotiationType[],

  NegotiateProposals: (payload:NegotiationType) => Promise<void>

  fetchNegotiation: () => Promise<void>

  
}


//  Zustand Functions 

export const useProposalStore = create<ProposalZutsType>((set, get) => ({

  proposalReviews: [],

  fetchProposals: async () => {
    try {
      const response = await api.get("/get-all-proposals")
      console.log(response.data.data)

      set({
        proposalReviews: response.data.data,
      })

      toast.success(response.data.message)

    } catch (error: any) {
      set({
        proposalReviews: [],
      })

    const message = error.response.data.message ||
        "Something went wrong"

    toast.error(message) 

    console.log(error.response.data)

    }
  },

  createProposal: async (proposal: Proposal) => {
    try {
      const response = await api.post("/create-new-proposals", proposal)

      set((state) => ({
        proposalReviews: [...state.proposalReviews, response.data.data],
      }))

      toast.success(response.data.message)
      toast.success("OKA")

      // get().fetchProposals()
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response.message ||
        "Something went wrong"

      console.log("ERROR MESSAGE:", message)
      toast.error(message)
    }
  },

  editProposal: async (updatedProposal: Proposal) => {
    try {
      const response = await api.post("/update-proposal", updatedProposal)

      set((state) => ({
        proposalReviews: state.proposalReviews.map((payload: Proposal) => {
          return payload.id === updatedProposal.id ? response.data : updatedProposal
        }),
      }))
    } catch (error: any) {
      const response = await api.post("/update-reviews", updatedProposal)
      toast.error(response.data.error)
      console.error(error)
    }
  },


  // Negotiate Proposals
Negotiaton: [],

fetchNegotiation: async () => {


  const response = await api.get("/get-all-negotiation")

set({
  Negotiaton: [response.data.data]
})


try {

} catch(error:any){
  console.error(error.response.data.message)
}

},


//  who is negotiating
NegotiateProposals:async (payload:NegotiationType) => {
  
  try {
  const response = await api.post("/create-negotiation", payload )

  set ((state)=>({
    Negotiaton: [...state.Negotiaton, response.data]
  }))

  toast.success(response.data.message)

  } catch (error:any){
    const message = error.response.data.error
    toast.error(message)
  }

},

updateProposalStatus: async (id: string, status: string) => {
  try {
    // CHANGE: Send `{ status }` body and update local state safely (support `id` and `_id`).
    const response = await api.patch(`/update-pending-reviews/${id}/status`, { status })

    const nextStatus = response?.data?.data?.status ?? status

    set((state) => ({
      proposalReviews: state.proposalReviews.map((review: any) => {
        const reviewId = review?.id ?? review?._id
        return reviewId === id ? { ...review, status: nextStatus } : review
      }),
    }))

    // CHANGE: If the backend returns a minimal payload, re-fetch to keep the grid consistent.
    await get().fetchProposals()
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Failed to update proposal status"

    toast.error(message)
    console.error(error)
    throw error
  }
}

  }




))
