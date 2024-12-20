import {create} from "zustand"
export const useProductStore = create((set)=> ({
    products:[],
    setProducts:(products) => set({products}),
    createProduct: async (newProduct)=>{
        try {
            if(!newProduct.name || !newProduct.price || !newProduct.image){
                throw new Error("Please fill all the required fields")
            }
            const res = await fetch("https://storefrontng.onrender.com/api/products",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(newProduct)
            })

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || "Failed to create product");
            }

            set((state)=> ({products:[...state.products,data.product]}))
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    updateProduct: async (id, updateData) => {
        try {
            // Filter out empty fields
            const filteredData = Object.fromEntries(
                Object.entries(updateData).filter(([_, value]) => value !== '')
            );
            
            const res = await fetch(`https://storefrontng.onrender.com/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filteredData)
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || "Failed to update product");
            }

            set((state) => ({
                products: state.products.map(p => 
                    p._id === id ? data.product : p
                )
            }));
            
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    deleteProduct: async (id) => {
        try {
            const res = await fetch(`https://storefrontng.onrender.com/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || "Failed to delete product");
            }

            set((state) => ({
                products: state.products.filter(p => p._id !== id)
            }));
            
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    fetchProducts: async () => {
        try {
            const res = await fetch("https://storefrontng.onrender.com/api/products");
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch products");
            }

            set({ products: data.product });
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
}))
