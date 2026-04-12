import { create } from "zustand"
import { type ProposalCatalog } from "../../GlobalTypes"
import api from "../api"
import { toast } from "sonner"

type ProposalStoreType = {
  proposals: ProposalCatalog[]
  fetchProposals: () => Promise<void>
  addProposal: (proposal: ProposalCatalog) => Promise<void>
  updateProposal: (proposal: ProposalCatalog) => Promise<void>
  deleteProposal: (id: string) => Promise<void>
  ChangeStatus: (id:string, Proposalstatus: string) => Promise<void>

}

export const useProposalStore = create<ProposalStoreType>((set) => ({
  proposals: [],

  fetchProposals: async () => {
    try {
      const response = await api.get("/get-all-proposals")

      set({
        proposals: response.data.data,
      })

    } catch (error: any) {
      set({ proposals: [] })
      toast.error(error.message)
      console.error(error)
    }
  },

  addProposal: async (proposal) => {
    try {
      const response = await api.post("/create-proposal", proposal)

      set((state) => ({
        proposals: [...state.proposals, response.data],
      }))

      toast.success(response.data.message)

    } catch (error: any) {
      const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    console.log("ERROR MESSAGE:", message);

    toast.error(message)
    }
  },

  updateProposal: async (updatedProposal) => {
    try {
      const response = await api.put(
        `/update-proposal/${updatedProposal.id}`,
        updatedProposal
      )

      set((state) => ({
        proposals: state.proposals.map((proposal) =>
          proposal.id === updatedProposal.id ? response.data : proposal
        ),
      }))

      toast.success("Proposal updated successfully")

    } catch (error: any) {
      toast.error(error.message)
    }
  },

  deleteProposal: async (id) => {
    try {
      await api.delete(`/delete-proposal/${id}`)

      set((state) => ({
        proposals: state.proposals.filter((proposal) => proposal.id !== id),
      }))

      toast.success("Proposal deleted successfully")

    } catch (error: any) {
      toast.error(error.message)
    }
  },

  // Change status
 ChangeStatus: async (id: string, proposalStatus: string) => {
  try {
    const response = await api.patch(`/proposal/${id}/status`, {
        proposal_status: proposalStatus
    })

   set((state) => ({
  proposals: state.proposals.map((proposal) =>
    proposal.id === id
      ? {
          ...proposal, // ✅ keep old data
          proposal_status: response.data.data.proposal_status // ✅ update only this
        }
      : proposal
  ),
}))

    toast.success(response.data.message)

  } catch (error: any) {
 
    const message =
      error?.response?.data.error ||
      "Something went wrong";

    console.log("ERROR MESSAGE:", message);

    toast.error( error?.response?.data.message)
  }
}


}))
