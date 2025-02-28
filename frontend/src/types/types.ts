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
  userId:string,
  items: OrderItem[],
  amount: number,
  address: string,
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