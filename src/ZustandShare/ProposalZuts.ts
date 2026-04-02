import { create } from "zustand"
import { type ProposalCatalog } from "../../GlobalTypes"
import axios from "axios"
import { toast } from "sonner"

type ProposalStoreType = {
  proposals: ProposalCatalog[]
  fetchProposals: () => Promise<void>
  addProposal: (proposal: ProposalCatalog) => Promise<void>
  updateProposal: (proposal: ProposalCatalog) => Promise<void>
  deleteProposal: (id: string) => Promise<void>
}

const BASE_URL = import.meta.env.VITE_API_URL

export const useProposalStore = create<ProposalStoreType>((set) => ({
  proposals: [],

  fetchProposals: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-all-proposals`)

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
      const response = await axios.post(
        `${BASE_URL}/create-proposal`,
        proposal
      )

      set((state) => ({
        proposals: [...state.proposals, response.data],
      }))

      toast.success(response.data.message)

    } catch (error: any) {
      toast.error(error.message)
    }
  },

  updateProposal: async (updatedProposal) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update-proposal/${updatedProposal.id}`,
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
      await axios.delete(`${BASE_URL}/delete-proposal/${id}`)

      set((state) => ({
        proposals: state.proposals.filter((proposal) => proposal.id !== id),
      }))

      toast.success("Proposal deleted successfully")

    } catch (error: any) {
      toast.error(error.message)
    }
  },
}))
