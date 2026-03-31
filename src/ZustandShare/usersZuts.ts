import { create } from "zustand";
import type { UserType } from "../../GlobalTypes";
import axios from "axios";
import { toast } from "sonner";

type UsersZutstype = {
  users: UserType[];
  fetchUsers: () => Promise<void>;
  AddUsers: (user: UserType) => Promise<void>;
  EditUsers: (updatedUser: UserType) => Promise<void>;
  DeleteUsers: (id: string) => Promise<void>;
};

const BASE_URL = import.meta.env.VITE_API_URL;

export const useUsersStore = create<UsersZutstype>((set, get) => ({
  users: [],

  fetchUsers: async (page = 1, pageSize = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-all-user`, {
        params: {
          page,
          pageSize
        }
      });
      toast.success(response.data.message);

      set({
        users: response.data.data,
      });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      console.error(err);
      set({ users: [] });
    }
  },

  AddUsers: async (user: UserType): Promise<void> => {
    try {
      const response = await axios.post(`${BASE_URL}/create-users`, user);
      toast.success(response.data.message);
      set((state) => ({
        users: [...state.users, response.data.data],
      }));
    } catch (error: any) {
      console.error(`User Error is ${error.message}`);
      toast.error(error.message);
    }
  },

  EditUsers: async (updatedUser: UserType): Promise<void> => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update-users/${updatedUser.id}`,
        updatedUser
      );

      set((state) => ({
        users: state.users.map((user: UserType) =>
          user.id === updatedUser.id ? response.data : user
        ),
      }));
    } catch (error: any) {
      toast.error(error.message);
    }
  },

  DeleteUsers: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/delete-users/${id}`);

    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
}));
