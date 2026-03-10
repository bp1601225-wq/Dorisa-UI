import { create } from "zustand";
import type { RegistrationForm } from "../../GlobalTypes";
import axios from "axios";
import { toast } from "sonner";

interface ClientStoreTypes {
  clients: RegistrationForm[];
  fetchClients: () => Promise<void>;   //  function
  addClient: (client: RegistrationForm) => Promise<void>;
  removeClient: (id: string) => void;
}

const CLIENT_URL = import.meta.env.VITE_API_URL;

export const useClientStore = create<ClientStoreTypes>((set) => ({
  clients: [],

  //  FETCH (GET)
  fetchClients: async () => {
    try {
      const response = await axios.get(`${CLIENT_URL}/all-clients`);

      console.log(response)

    //   set({
    //     clients: response.data,
    //   });

    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  },

  // 🔹 CREATE (POST)
  addClient: async (client) => {
    try {
      const response = await axios.post(
        `${CLIENT_URL}/create-clients`,
        client
      );

      console.log(response)
      
      set((state) => ({
        clients: [...state.clients, response.data],
      }));


    } catch (error:any) {
      toast.error(error.message)
      console.error("Error creating client:", error);
    }
  },

  // 🔹 DELETE (local only for now)
  removeClient: (id: string) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    })),
}));