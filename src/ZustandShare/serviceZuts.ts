import {create} from "zustand"
import {type ServiceType } from "../../GlobalTypes"
import axios from "axios"
import { toast } from "sonner"


type ServiceZutsType = {
    services: ServiceType[]
    fetchServices: () => Promise<void>,
    AddServices: (service:ServiceType) => Promise<void>
    EditServices: (service:ServiceType) => Promise<void>
    DeleteServices: (id:string) => Promise<void>
}

const BASE_URL = import.meta.env.VITE_API_URL




export const useServiceStore = create<ServiceZutsType>((set, get)=>({
    
services: [],

fetchServices: async () => {
try {
const response = await axios.get(`${BASE_URL}/get-all-services`)
toast.success(response.data.message)
console.log(response.data)
} catch (error:any){
set({
    services: []
})

toast.error(error.message)
console.error(error)
}

},

AddServices: async (service:ServiceType): Promise<void> => {
// API CALL
const response = await axios.post(`${BASE_URL}/create-services`, service)






// COME BACK LATER

set((state)=>({
    services: [...state.services, response.data]
}))
},

EditServices: async (updatedservices:ServiceType): Promise<void> => {
    try {
 const response = await axios.put(`${BASE_URL}/update-services/${updatedservices.id}`, updatedservices)


 set ((state) => ({
    services: state.services.map((service:ServiceType)=>
    service.id === updatedservices.id ? response.data : service   
    )
 })) 
        

    } catch (error:any) {
        toast.error(error)
        console.error(error)
    }
    
    },


DeleteServices: async (id:string): Promise<void> => {

    try {

    await axios.delete(`${BASE_URL}/delete-services/ ${id}`)

      set((state)=>({
        services: state.services.filter((service)=>service.id !== id)
      }))

    } catch (error:any) {

        toast.error(error.message)
        console.error(error)
    }
}

}))
 


