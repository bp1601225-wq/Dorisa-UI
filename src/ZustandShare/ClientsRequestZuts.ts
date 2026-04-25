import { create } from "zustand"
import { type ClientServiceRequest } from "../../GlobalTypes"
import api from "../api"
import { toast } from "sonner"

// Client review/request store:
// Tracks services clients requested and the review/status lifecycle before it becomes a real proposal/project.

type ClientsRequestStoreType = {
  clientRequests: ClientServiceRequest[]
  fetchClientRequest: () => Promise<void>
  addClientRequest: (review: ClientServiceRequest) => Promise<void>
  updateClientRequest: (review: ClientServiceRequest) => Promise<void>
  deleteClientRequest: (id: string) => Promise<void>
  changeRequestStatus: (id: string, status: string) => Promise<void>

}



export const useClientsRequestStore = create<ClientsRequestStoreType>((set, get) => ({
  clientRequests: [],

  fetchClientRequest: async () => {
    try {
      const response = await api.get("/get-all-client-requests")

      set({
        clientRequests: response.data.data,
      })

    } catch (error: any) {
      set({ clientRequests: [] })
      toast.error(error.message)
      console.error(error)
    }
  },

  addClientRequest: async (review) => {
    try {
      const response =
       await api.post("/create-client-request", review)

      set((state) => ({
        clientRequests: [...state.clientRequests, response.data],
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

  updateClientRequest: async (updatedRequest) => {
    try {
      const response = await api.put(
        `/update-proposal/${updatedRequest.id}`,
        updatedRequest
      )

      set((state) => ({
        clientRequests: state.clientRequests.map((review) =>
          review.id === updatedRequest.id ? response.data : review
        ),
      }))

      toast.success("Proposal updated successfully")

    } catch (error: any) {
      toast.error(error.message)
    }
  },

  deleteClientRequest: async (id) => {
    try {
      await api.delete(`/delete-proposal/${id}`)

      set((state) => ({
        clientRequests: state.clientRequests.filter((review) => review.id !== id),
      }))

      toast.success("Proposal deleted successfully")

    } catch (error: any) {
      toast.error(error.message)
    }
  },



  
  // This will change proposal status with the id and status name ( from draft to pending)
 changeRequestStatus: async (id: string, status: string) => {
  try {
    const response = await api.patch(`/proposal/${id}/status`, {
        proposal_status: status
    })

   set((state) => ({
  clientRequests: state.clientRequests.map((review) =>
    review.id === id
      ? {
          ...review, // keep old data
          proposal_status: response.data.data.proposal_status // ✅ update only this
        }
      : review
  ),
}))

    toast.success(response.data.message)

    get().fetchClientRequest()

  } catch (error: any) {
 
    const message =
      error?.response?.data.error ||
      "Something went wrong";

    console.log("ERROR MESSAGE:", message);

    toast.error( error?.response?.data.message)
  }
}


}))
