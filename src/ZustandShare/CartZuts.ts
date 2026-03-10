import {create} from "zustand"

const useCartStore = create((set:any)=> ({
    cart: [],
    
    addToCart: (product:any) => set ((state:any) => ({
        cart:[...state.cart, product]
    })),
   removeFromCart: (productId:any) => set((state:any)=>({
    cart: state.cart.filter((product:any) => product.id !== productId)
   })),
    clearCart: () => set({cart:[]})
}))