import {create} from "zustand"
import {type ServiceCatalog } from "../../GlobalTypes"
import axios from "axios"
import { toast } from "sonner"

type ServiceZutsType = {
    services: ServiceCatalog []
    fetchServices: () => Promise<void>,
    AddServices: (service:ServiceCatalog ) => Promise<void>
    EditServices: (service:ServiceCatalog ) => Promise<void>
    DeleteServices: (id:string) => Promise<void>
}

const BASE_URL = import.meta.env.VITE_API_URL






export const useServiceStore = create<ServiceZutsType>((set, get)=>({
    


    
services: [],

fetchServices: async () => {
try {

const response = await axios.get(`${BASE_URL}/get-all-services`)

// toast.success(response.data.message)

console.log(response.data.data)

set({
    services: response.data.data
})


} catch (error:any){
set({
    services: []
})

console.log("FULL ERROR:", error); 

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    console.log("ERROR MESSAGE:", message);

    toast.error(message);
}

},

AddServices: async (service:ServiceCatalog): Promise<void> => {
    try {
const response = await axios.post(`${BASE_URL}/create-services`, service)


// COME BACK LATER

set((state)=>({
    services: [...state.services, response.data]
}))

toast.success(response.data.message)
get().fetchServices()

    } catch (error:any){
console.log("FULL ERROR:", error); 

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    console.log("ERROR MESSAGE:", message);

    toast.error(message);
    }
// API CALL

},

EditServices: async (updatedservices:ServiceCatalog): Promise<void> => {
    try {
 const response = await axios.put(`${BASE_URL}/update-services/${updatedservices.id}`, updatedservices)


 set ((state) => ({
    services: state.services.map((service:ServiceCatalog)=>
    service.id === updatedservices.id ? response.data : service   
    )
 })) 

 toast.success(`service updated successfully`)
        
 get().fetchServices()

    } catch (error:any) {
     console.log("FULL ERROR:", error); 

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    console.log("ERROR MESSAGE:", message);

    toast.error(message);
    }
    
    },


DeleteServices: async (id:string): Promise<void> => {
    try {
    await axios.delete(`${BASE_URL}/delete-services/${id}`)

      set((state)=>({
        services: state.services.filter((service)=>service.id !== id)
      }))

      get().fetchServices()

      toast.success(`service deleted succesfully`)
    } catch (error:any) {
console.log("FULL ERROR:", error); 

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    console.log("ERROR MESSAGE:", message);

    toast.error(message);
    }
}

}))
 


