// src/types/index.ts
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[]; // หรือ Resolution สำหรับภาพ
  bestseller: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  cartData: Record<string, Record<string, number>>;
}

export interface CartItem {
  _id: string;
  size: string;
  quantity: number;
  productData: Product;
}

export interface Address {
  firstName: string;
  lastName?: string;
  street: string;
  city: string;
  state?: string;
  zipcode: string;
  country: string;
  phone?: string;
}

export interface OrderItem {
  itemId: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: Address;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: string;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  subCategory: string;
  bestseller?: boolean;
  sizes: string[];
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}