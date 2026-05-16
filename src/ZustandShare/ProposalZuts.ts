import { create } from "zustand";
import {
  type NegotiationType,
  type Proposal,
  type ProposalVersionType,
} from "../../GlobalTypes";
import api from "../api";
import { toast } from "sonner";

type ProposalZutsType = {
  proposalReviews: Proposal[];
  proposalVersion: ProposalVersionType[];

  fetchProposals: () => Promise<void>;
  createProposal: (proposal: Proposal) => Promise<void>;
  editProposal: (updatedProposal: Proposal) => Promise<void>;
  updateProposalStatus: (id: string, status: string) => Promise<void>;

  // Negotiation
  Negotiaton: NegotiationType[];
  NegotiateProposals: (payload: NegotiationType) => Promise<void>;
  fetchNegotiation: () => Promise<void>;

  createNewProposalsVersion: (
    version: ProposalVersionType
  ) => Promise<void>;
};

export const useProposalStore = create<ProposalZutsType>((set, get) => ({
  // =========================
  // PROPOSALS
  // =========================
  proposalReviews: [],
  proposalVersion: [],

  fetchProposals: async () => {
    try {
      const response = await api.get("/get-all-proposals");

      set({
        proposalReviews: response.data.data,
      });

      toast.success(response.data.message);
    } catch (error: any) {
      set({ proposalReviews: [] });

      const message =
        error?.response?.data?.message || "Something went wrong";

      toast.error(message);
      console.log(error?.response?.data);
    }
  },

  createProposal: async (proposal: Proposal) => {
    try {
      const response = await api.post(
        "/create-new-proposals",
        proposal
      );

      set((state) => ({
        proposalReviews: [
          ...state.proposalReviews,
          response.data.data,
        ],
      }));

      toast.success(response.data.message);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Something went wrong";

      console.log("ERROR MESSAGE:", message);
      toast.error(message);
    }
  },

  editProposal: async (updatedProposal: Proposal) => {
    try {
      const response = await api.post(
        "/update-proposal",
        updatedProposal
      );

      set((state) => ({
        proposalReviews: state.proposalReviews.map((p) =>
          p.id === updatedProposal.id
            ? response.data
            : p
        ),
      }));
    } catch (error: any) {
      const response = await api.post(
        "/update-reviews",
        updatedProposal
      );

      toast.error(response?.data?.error);
      console.error(error);
    }
  },

  updateProposalStatus: async (id: string, status: string) => {
    try {
      const response = await api.patch(
        `/update-pending-reviews/${id}/status`,
        { status }
      );

      const updatedStatus =
        response.data.data ?? response.data;

      set((state) => ({
        proposalReviews: state.proposalReviews.map((r) =>
          r.id === id ? { ...r, ...updatedStatus } : r
        ),
      }));

      await get().fetchProposals();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to update proposal status";

      toast.error(message);
      console.error(error);
      throw error;
    }
  },

  // =========================
  // NEGOTIATION
  // =========================
  Negotiaton: [],

  fetchNegotiation: async () => {
    try {
      const response = await api.get("/get-all-negotiation");

      set({
        Negotiaton: response.data.data,
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message);
    }
  },

  NegotiateProposals: async (payload: NegotiationType) => {
    try {
      const response = await api.post(
        "/create-negotiation",
        payload
      );

      set((state) => ({
        Negotiaton: [...state.Negotiaton, response.data],
      }));

      toast.success(response.data.message);
    } catch (error: any) {
      const message = error?.response?.data?.error;
      toast.error(message);
    }
  },

  // =========================
  // PROPOSAL VERSION
  // =========================
  createNewProposalsVersion: async (
    version: ProposalVersionType
  ) => {
    try {
      const response = await api.post(
        "/create-proposal-version",
        version
      );

      const newVersion =
        response.data.data ?? response.data;

      set((state) => ({
        proposalVersion: [
          ...state.proposalVersion,
          newVersion,
        ],
      }));

      toast.success(
        response.data.message || "Version created"
      );


    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to create proposal version";

      toast.error(message);
      console.error(error);
    }
  },
}));