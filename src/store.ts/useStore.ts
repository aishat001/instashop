import { getCombinations } from '../utils/utils';
import { create } from 'zustand';

export interface User {
    id?: string;
    fullName: string;
    username: string;
    phoneNumber: string;
    email: string;
}

export interface Store {
    id?: string;
    storeName: string;
    storeTagName: string;
    storePhoneNumber: string;
    storeEmail: string;
    category: string;
    logo: any;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number | null;
    oldPrice: number | null;
    collections: string[];
    inventoryStocks: number | null;
    variations: any[];
    variantDetails: any;
    images: { url: string; toggle: boolean }[];
    shipping: 'self' | 'instashop';
}

interface AppState {
    user: User;
    store: Store;
    product: Product;
    products: Product[];
    setUser: (user: User) => void;
    setStore: (store: Store) => void;
    addProduct: (product: Product) => void;
    setProduct: (product: Product) => void;
    initializeVariantDetails: () => void; 
    updateVariantDetails: (index: number, field: string, value: any) => void; 

}

// Zustand store for managing state
export const useAppStore = create<AppState>((set) => ({
    user: { fullName: '', username: '', phoneNumber: '', email: '' },
    store: { storeName: '', storeTagName: '', storePhoneNumber: '', storeEmail: '', category: '', logo: '/images/upload.svg' },
    products: [],
    product: {
        id: '',
        title: '', 
        description: '', 
        price: null, 
        oldPrice: null, collections: [], inventoryStocks: null, images: [], shipping: 'self',
        variations: [
            { option: "Option 1", name: "Color", values: ["Red", "White", "Black"] },
            { option: "Option 2", name: "Size", values: ["Large", "Small", "XL"] }
        ],
        variantDetails: [], 
    
    },
    initializeVariantDetails: () => set((state) => {
        const combinations = getCombinations(state.product.variations);
        const newVariantDetails = combinations.map((combination: string[]) => ({
          combination: combination.join('-'), 
          price: null,
          stock: null
        }));
        return { product: { ...state.product, variantDetails: newVariantDetails } };
      }),
    
      updateVariantDetails: (index: number, field: string, value: any) => set((state) => {
        const updatedVariantDetails = state.product.variantDetails.map((details: any, idx: number) => {
          if (idx === index) {
            return { ...details, [field]: value };
          }
          return details;
        });
        return { product: { ...state.product, variantDetails: updatedVariantDetails } };
      }),

    setUser: (user: User) => set({ user }),
    setStore: (store: Store) => set({ store }),
    addProduct: (product: Product) => set((state) => ({ products: [...state.products, product] })), 
    setProduct: (updatedProduct: Product) => set((state) => ({ product: { ...state.product, ...updatedProduct } }))
}));
