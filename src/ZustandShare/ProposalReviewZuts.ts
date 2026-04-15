import { create } from "zustand"
import { type Negotiation, type ProjectProposal } from "../../GlobalTypes"
import api from "../api"
import { toast } from "sonner"





// Proposals array contain everything of client details


// functions to infer from type

type ProposalReviewZutsType = {
  proposalReviews: ProjectProposal[]
  fetchProposalReviews: () => Promise<void>
  createProposalReview: (proposal: ProjectProposal) => Promise<void>
  editProposalReview: (updatedProposal: ProjectProposal) => Promise<void>
  NegotiateProposals: (payload:Negotiation) => Promise<void>
}


//  Zustand Functions 

export const useProposalReviewStore = create<ProposalReviewZutsType>((set, get) => ({

  proposalReviews: [],

  fetchProposalReviews: async () => {
    try {
      const response = await api.get("/get-all-reviews")
      console.log(response.data.data)

      set({
        proposalReviews: response.data.data,
      })

      toast.success(response.data.message)

    } catch (error: any) {
      set({
        proposalReviews: [],
      })

      const response = await api.get("/get-all-reviews")
      toast.error(response.data.error.message)
      console.error(error)

    }
  },

  createProposalReview: async (proposal: ProjectProposal) => {
    try {
      const response = await api.post("/create-reviews", proposal)

      set((state) => ({
        proposalReviews: [...state.proposalReviews, response.data.data],
      }))

      toast.success(response.data.message)
      get().fetchProposalReviews()
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response.message ||
        "Something went wrong"

      console.log("ERROR MESSAGE:", message)
      toast.error(message)
    }
  },

  editProposalReview: async (updatedProposal: ProjectProposal) => {
    try {
      const response = await api.post("/update-reviews", updatedProposal)

      set((state) => ({
        proposalReviews: state.proposalReviews.map((payload: ProjectProposal) => {
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
  NegotiateProposals: async (payload:Negotiation) => {
    const response = await api.post("/client-negotiating")

  }













}))
