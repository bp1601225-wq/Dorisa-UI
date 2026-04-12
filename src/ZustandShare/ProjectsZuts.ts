import {create} from "zustand"
import { type ProjectProposal } from "../../GlobalTypes"
import api from "../api"
import { toast } from "sonner"



//  Admin will create a proposal and then send to
//  the client for the client to approve or reject
// the proposal


// Projects array contain everything of client details


// functions to infer from type

type ProjectProposalZutsType = {
    projects: ProjectProposal[],
    fetchProjects: () =>Promise<void>
    createProjects: (proposals:ProjectProposal) => Promise<void>
    EditProjects: (Updateproposals:ProjectProposal) => Promise<void>
}


//  Zustand Functions 




export const useProjectsStore = create<ProjectProposalZutsType>((set, get)=>({

projects: [],

fetchProjects: async () => {
try {
    const response = await api.get("/get-all-reviews")
    console.log(response.data.data)

set({
    projects: response.data.data
})

toast.success(response.data.message);


} catch (error:any){

set ({
projects: []
})
    const response = await api.get("/get-all-reviews")
    toast.error(response.data.error.message)
console.error(error)


}



},

createProjects: async (proposals:ProjectProposal) => {

    try {
 const response = await api.post("/create-reviews", proposals)


    set ((state)=>({
        projects: [...state.projects, response.data.data]
    }))

    toast.success(response.data.message)

    get().fetchProjects()


    } catch (error:any) {
 const message =
      error?.response?.data?.message ||
      error?.response.message ||
      "Something went wrong";

    console.log("ERROR MESSAGE:", message);

    toast.error(message)
        
    }

   


},

EditProjects: async (Updateproposals:ProjectProposal) => {

try {
 const response = await api.post("/update-reviews", Updateproposals)

set ((state)=>({
    projects: state.projects.map((payload:ProjectProposal)=>{
        return payload.id === Updateproposals.id ? response.data : Updateproposals

    })
}))
 


} catch (error:any) {
 const response = await api.post("/update-reviews", Updateproposals)

 toast.error(response.data.error)

console.error(error)
}


}













}))
