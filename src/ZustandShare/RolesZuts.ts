import {create} from "zustand"
import {type RoleType } from "../../GlobalTypes"
import axios from "axios"
import { toast } from "sonner"


type RolesZutstype = {
    roles: RoleType[],
    fetchRoles: () => Promise<void>,
    AddRoles: (role:RoleType) => Promise<void>
    EditRoles: (UpdatedRole:RoleType) => Promise<void>
    DeleteRoles: (id:string) => Promise<void>    
}


const BASE_URL = import.meta.env.VITE_API_URL

export const useRolesStore = create<RolesZutstype>((set, get)=>({

roles: [],

fetchRoles: async () => {
    try {
const response = await axios.get(`${BASE_URL}/get-all-roles`)
toast.success(response.data.message)
console.log(response.data.data)

set({
    roles: response.data.data
})
    } catch (err:any){
    toast.error(err)
console.error(err)
    }
},

AddRoles: async (role:RoleType): Promise<void> => {
    try {

const response = await axios.post(`${BASE_URL}/create-roles`, role)
toast.success(response.data.message)

console.log(response)
get().fetchRoles()


set((sate)=>({
    roles: [...sate.roles, response.data.data]
}))
    }
 catch (error:any){
    console.error(error)
    toast.error(error.message)
 }

},

EditRoles: async (UpdatedRole: RoleType): Promise<void> => {
    try {

  const response = await axios.put(
    `${BASE_URL}/update-roles/${UpdatedRole.id}`,
    UpdatedRole
  );

  set((state) => ({
    roles: state.roles.map((role: RoleType) =>
      role.id === UpdatedRole.id ? response.data : role 
    ),
  }));
    } catch (error:any) {
        toast.error

    }
},

DeleteRoles: async (id: string): Promise<void> => {
 await axios.delete(`${BASE_URL}/delete-roles/${id}`,);

  set((state) => ({
    roles: state.roles.filter((role) => role.id !== id), // filter out the deleted role
  }));
},



}))