import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { Product } from '../types/types'

const currency = "$";
const delivery_fee = 10;
const backendUrl = import.meta.env.VITE_BACKEND_URL


interface ShopContextType {
  products: Product[];
  currency: string;
  search: string;
  delivery_fee: number;
  setSearch: Dispatch<SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  cartItems: CartItems;
  addToCart: (itemId: string, size: string) => Promise<void>;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => Promise<void>;
  getCartAmount: () => Promise<number>;
  navigate: NavigateFunction;
  backendUrl: string;
  setToken: (value: string) => void,
  token: string
  setCartItems: (value: CartItems) => void,
}

export const ShopContext = createContext<ShopContextType | null>(null);

interface ShopContextProviderProps {
  children: ReactNode;
}
type CartItems = Record<string, Record<string, number>>;
  

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const [ search, setSearch ] = useState<string>('');
  const [ showSearch, setShowSearch ] = useState<boolean>(false);
  const [ cartItems, setCartItems ] = useState<CartItems>({});
  const [ products, setProducts ] = useState<Product[]>([]);
  const [ token, setToken ] = useState<string>('');

  const navigate = useNavigate();

  const addToCart = async (itemId: string, size: string) => {
    if(!size) {
      toast.error('Select Product Size');
      return
    }

    const cartData = structuredClone(cartItems);

    if(cartData[itemId]) {
      if(cartData[itemId][size]){
        cartData[itemId][size] += 1
      } else  {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData)

    if(token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})
        toast.success('Added to Cart');
      } catch (error) {
        console.error(error)
      }
    }    
  }
  

  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems) {
      for(const item in cartItems[items]) {
        try {
          if(cartItems[items][item] > 0) {
            totalCount += cartItems[items][item]
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    return totalCount
  }

  const updateQuantity = async (itemId: string, size: string, quantity: number) => {
    const cartData = structuredClone(cartItems);

    if(size) {
        cartData[itemId][size] = quantity
    } 
    setCartItems(cartData)

        if(token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})
        toast.success('Cart Updated');
      } catch (error) {
        console.error(error)
      }
    }   
  }

  const getCartAmount = async ()=> {
    let totalAmount = 0;

    for(const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      for(const item in cartItems[items]) {
        try {
          if(cartItems[items][item] > 0 && itemInfo?.price) {
            totalAmount += itemInfo?.price * cartItems[items][item] 
          }
        } catch (error) {
          console.error(error)
        }
      }
    }

    return totalAmount
  }

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")
      if(response.data.success) {
        setProducts(response.data.collection)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getUserCart = async (token: string | null) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
      if(response.data.succes) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=> {
    getProductData()
  }, [])

    useEffect(()=> {
      if(!token) {
      const newToken = localStorage.getItem("token");
      if(newToken) setToken(newToken)
      }
      getUserCart(token ? token : localStorage.getItem("token"))

  }, [token])


    const value: ShopContextType = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
