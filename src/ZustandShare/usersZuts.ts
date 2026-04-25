import { create } from "zustand";
import type { UserType } from "../../GlobalTypes";
import api from "../api";
import { toast } from "sonner";

type UsersZutstype = {
  users: UserType[];
  fetchUsers: () => Promise<void>;
  AddUsers: (user: UserType) => Promise<void>;
  EditUsers: (updatedUser: UserType) => Promise<void>;
  DeleteUsers: (id: string) => Promise<void>;
};

export const useUsersStore = create<UsersZutstype>((set, get) => ({
  users: [],

  fetchUsers: async (page = 1, pageSize = 10) => {
    try {
      const response = await api.get("/get-all-users", {
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
    const response = await api.post("/create-users", user);

    toast.success(response.data.message);

    set((state) => ({
      users: [...state.users, response.data.data],
    }));

  } catch (error: any) {
    console.log("FULL ERROR:", error); 

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    console.log("ERROR MESSAGE:", message);

    toast.error(message);
  }
},

  EditUsers: async (updatedUser: UserType): Promise<void> => {
    try {
      const response = await api.put(
        `/update-users/${updatedUser.id}`,
        updatedUser
      );

      const returnedUser = response.data?.data ?? response.data;


      set((state) => ({
        users: state.users.map((user: UserType) =>
          user.id === updatedUser.id ? returnedUser : user
        ),


      })
    
    );

    toast.success("user edited succesfully")
    // get().fetchUsers()


    } catch (error: any) {
      toast.error(error.message);

      const message = error.resposne.data.message
      console.log(message)
    }
  },

  DeleteUsers: async (id: string): Promise<void> => {
    await api.delete(`/delete-users/${id}`);

    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
}));
