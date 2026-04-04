import {create} from "zustand"
import { type ProjectProposal } from "../../GlobalTypes"
import { axisDeltaEquals } from "framer-motion"
import axios from "axios"
import { toast } from "sonner"


// This File is there to send to the client after admin revies
// The client sees what is going on
// A review just to be sent different from creating a proposal



// functions to infer from type

type ProjectProposalZutsType = {
    projects: ProjectProposal[],
    fetchProjects: () =>Promise<void>
    createProjects: (proposals:ProjectProposal) => Promise<void>
    EditProjects: (Updateproposals:ProjectProposal) => Promise<void>
}

const BASE_URL = import.meta.env.VITE_API_URL
//  Zustand Functions 




export const useProjectsStore = create<ProjectProposalZutsType>((set, get)=>({

projects: [],

fetchProjects: async () => {
try {
    const response = await axios.get(`${BASE_URL}/get-all-reviews`)
    console.log(response.data.data)

set({
    projects: response.data.data
})

toast.success(response.data.message);


} catch (error:any){

set ({
projects: []
})
    const response = await axios.get(`${BASE_URL}/get-all-reviews`)
    toast.error(response.data.error.message)
console.error(error)


}



},

createProjects: async (proposals:ProjectProposal) => {

    try {
 const response = await axios.post(`${BASE_URL}/create-reviews`, proposals)


    set ((state)=>({
        projects: [...state.projects, response.data.data]
    }))

    toast.success(response.data.message)


    } catch (error:any) {
 const response = await axios.post(`${BASE_URL}/create-reviews`, proposals)


 toast.error(response.data.error.message)

        console.log(error)

        
    }

   


},

EditProjects: async (Updateproposals:ProjectProposal) => {

try {
 const response = await axios.post(`${BASE_URL}/update-reviews`, Updateproposals)

set ((state)=>({
    projects: state.projects.map((payload:ProjectProposal)=>{
        return payload.id === Updateproposals.id ? response.data : Updateproposals

    })
}))
 


} catch (error:any) {
 const response = await axios.post(`${BASE_URL}/update-reviews`, Updateproposals)

 toast.error(response.data.error)

console.error(error)
}


}













}))