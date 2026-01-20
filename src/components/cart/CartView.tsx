"use client";

import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Trash2, ShoppingCart, Package, CreditCard, ArrowRight, Sparkles, Minus, Plus } from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function CartView() {
  const { cartItems, updateQuantity, removeFromCart } = useShop();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.productData.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryFee = 0;

  const handleCheckout = async () => {
    setLoading(true);
    try {
        const orderItems = cartItems.map(item => ({
            itemId: item._id,
            size: item.size,
            quantity: item.quantity,
            price: item.productData.price,
            name: item.productData.name
        }));

        const address = {
            firstName: user?.name || "Customer",
            street: "Digital Download",
            city: "Bangkok",
            zipcode: "10000",
            country: "Thailand"
        };

        const res = await api.post('/order/place-order-stripe', {
            items: orderItems,
            amount: totalAmount + deliveryFee,
            address: address
        });

        if (res.data.success && res.data.session_url) {
            window.location.href = res.data.session_url;
        } else {
            toast.error("error creating order");
        }
    } catch (error) {
        console.error(error);
        toast.error("error connecting to server");
    } finally {
        setLoading(false);
    }
  };

  // Empty cart state with beautiful design
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6 p-12 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl max-w-md mx-auto">
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full animate-pulse" />
            <div className="absolute inset-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-indigo-500" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 mt-2">Looks like you haven&apos;t added anything yet</p>
          </div>
          <Link href="/">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-gray-500">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, idx) => (
            <div 
              key={`${item._id}-${item.size}`} 
              className="group relative bg-white/80 backdrop-blur-sm border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:border-indigo-200/50"
            >
              {/* Item number badge */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {idx + 1}
              </div>
              
              <div className="flex gap-5 items-center">
                {/* Product Image */}
                <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.productData.image?.[0] && (
                    <Image 
                      src={item.productData.image[0]} 
                      alt={item.productData.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {item.productData.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Size: <span className="font-medium text-gray-700">{item.size}</span></span>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-sm text-gray-500">Qty:</span>
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)} 
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="text-right space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {formatPrice(item.productData.price * item.quantity)}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="p-2 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-xl border border-gray-100 p-6 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {formatPrice(totalAmount + deliveryFee)}
                </span>
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-70 disabled:pointer-events-none group" 
              size="lg" 
              onClick={handleCheckout} 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Checkout with Stripe
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>

            <p className="text-center text-xs text-gray-400 mt-4">
              🔒 Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}