export interface Product {
  _id: string;
 name: string,
  description: string,
  price: number,
  image: string[],
  category: string,
  subCategory: string,
  sizes: string[],
  bestseller: boolean,
  date: string,
}

export interface OrderItem {
  status?: string;
  payment?: boolean;
  paymentMethod?: string;
  date: string;
  image: string[];
  name: string;
  quantity: number;
  size: string;
  price: number
}

export interface Order {
    _id: string
  userId:string,
  items: OrderItem[],
  amount: number,
  address: {
    lastName: string, 
    firstName: string
    street: string
    city: string
    zipcode: string
    state: string
    country: string
    phone: string
},
  status: string,
  paymentMethod: string,
  payment: boolean,
  date: string,
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  session_url?: string;
}