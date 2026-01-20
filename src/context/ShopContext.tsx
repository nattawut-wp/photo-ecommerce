"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "sonner"; 
import { CartItem, Product } from "@/types";

interface ShopContextType {
  cartItems: CartItem[];
  addToCart: (itemId: string, size: string) => Promise<void>;
  updateQuantity: (itemId: string, size: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string, size: string) => Promise<void>;
  getCartCount: () => number;
  fetchCart: () => Promise<void>;
  products: Product[];
}

const ShopContext = createContext<ShopContextType | null>(null);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // โหลดข้อมูลสินค้าทั้งหมดเก็บไว้เพื่อเทียบข้อมูล
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get('/product/list');
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadProducts();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      // Backend ส่งกลับมาเป็น Object: { "productId": { "S": 1, "M": 2 } }
      const res = await api.get('/cart/get-cart');
      const cartData = res.data;
      
      // แปลง Object เป็น Array เพื่อแสดงผล
      const items: CartItem[] = [];
      for (const itemId in cartData) {
        for (const size in cartData[itemId]) {
          if (cartData[itemId][size] > 0) {
            // หาข้อมูลสินค้าจาก state products
            const product = products.find(p => p._id === itemId);
            if (product) {
                items.push({
                    _id: itemId,
                    size: size,
                    quantity: cartData[itemId][size],
                    productData: product
                });
            }
          }
        }
      }
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  useEffect(() => {
    if (products.length > 0) fetchCart();
  }, [products]);

  const addToCart = async (itemId: string, size: string) => {
    try {
      await api.post('/cart/add-cart', { itemId, size });
      toast.success("add to cart");
      await fetchCart();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "error");
    }
  };

  const updateQuantity = async (itemId: string, size: string, quantity: number) => {
    try {
      await api.post('/cart/update-cart', { itemId, size, quantity });
      await fetchCart();
    } catch (error) {
        console.error(error);
    }
  };
  
  const removeFromCart = async (itemId: string, size: string) => {
     try {
       // Backend logic uses update with 0 or delete endpoint (backend delete logic might be tricky per file provided)
       // Let's use the provided delete endpoint
       await api.delete('/cart/delete-cart', { data: { itemId, size } });
       toast.success("remove from cart");
       await fetchCart();
     } catch (error) {
        console.error(error);
     }
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <ShopContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, getCartCount, fetchCart, products }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext)!;