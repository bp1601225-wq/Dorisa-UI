import { create } from "zustand"
import { type ProposalCatalog } from "../../GlobalTypes"
import api from "../api"
import { toast } from "sonner"

// Client review/request store:
// Tracks services clients requested and the review/status lifecycle before it becomes a real proposal/project.

type ClientsReviewStoreType = {
  clientReviews: ProposalCatalog[]
  fetchClientReviews: () => Promise<void>
  addClientReview: (review: ProposalCatalog) => Promise<void>
  updateClientReview: (review: ProposalCatalog) => Promise<void>
  deleteClientReview: (id: string) => Promise<void>
  changeReviewStatus: (id: string, status: string) => Promise<void>

}

export const useClientsReviewStore = create<ClientsReviewStoreType>((set) => ({
  clientReviews: [],

  fetchClientReviews: async () => {
    try {
      const response = await api.get("/get-all-proposals")

      set({
        clientReviews: response.data.data,
      })

    } catch (error: any) {
      set({ clientReviews: [] })
      toast.error(error.message)
      console.error(error)
    }
  },

  addClientReview: async (review) => {
    try {
      const response = await api.post("/create-proposal", review)

      set((state) => ({
        clientReviews: [...state.clientReviews, response.data],
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

  updateClientReview: async (updatedReview) => {
    try {
      const response = await api.put(
        `/update-proposal/${updatedReview.id}`,
        updatedReview
      )

      set((state) => ({
        clientReviews: state.clientReviews.map((review) =>
          review.id === updatedReview.id ? response.data : review
        ),
      }))

      toast.success("Proposal updated successfully")

    } catch (error: any) {
      toast.error(error.message)
    }
  },

  deleteClientReview: async (id) => {
    try {
      await api.delete(`/delete-proposal/${id}`)

      set((state) => ({
        clientReviews: state.clientReviews.filter((review) => review.id !== id),
      }))

      toast.success("Proposal deleted successfully")

    } catch (error: any) {
      toast.error(error.message)
    }
  },

  // Change status
 changeReviewStatus: async (id: string, status: string) => {
  try {
    const response = await api.patch(`/proposal/${id}/status`, {
        proposal_status: status
    })

   set((state) => ({
  clientReviews: state.clientReviews.map((review) =>
    review.id === id
      ? {
          ...review, // keep old data
          proposal_status: response.data.data.proposal_status // ✅ update only this
        }
      : review
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
