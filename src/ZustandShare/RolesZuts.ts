import {create} from "zustand"
import {type RoleType } from "../../GlobalTypes"
import api from "../api"
import { toast } from "sonner"


type RolesZutstype = {
    roles: RoleType[],
    fetchRoles: () => Promise<void>,
    AddRoles: (role:RoleType) => Promise<void>
    EditRoles: (UpdatedRole:RoleType) => Promise<void>
    DeleteRoles: (id:string) => Promise<void>    
}


export const useRolesStore = create<RolesZutstype>((set)=>({

roles: [],

fetchRoles: async () => {
    try {
const response = await api.get("/get-all-roles")
toast.success(response.data.message)
console.log(response.data.data)

set({
    roles: response.data.data
})
    } catch (err:any){
        set({
    roles: []
})
    toast.error(err.message)
console.error(err)

    }
},

AddRoles: async (role:RoleType): Promise<void> => {
    try {

const response = await api.post("/create-roles", role)
toast.success(response.data.message)

console.log(response)


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

  const response = await api.put(
    `/update-roles/${UpdatedRole.id}`,
    UpdatedRole
  );

  set((state) => ({
    roles: state.roles.map((role: RoleType) =>
      role.id === UpdatedRole.id ? response.data.data : role 
    ),
  }));



    } catch (error:any) {
        toast.error(`failed to update role`)
        console.error(error)
    }
},

DeleteRoles: async (id: string): Promise<void> => {
    try {
 await api.delete(`/delete-roles/${id}`);

  set((state) => ({
    roles: state.roles.filter((role) => role.id !== id), // filter out the deleted role
  }));

    } catch (error:any) {
        toast.error(error.message)
        console.error(error)
    }

},



}))
