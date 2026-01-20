"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { formatPrice } from "@/lib/utils";
import { Order, OrderItem } from "@/types";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const res = await api.get('/order/user-orders');
            if (res.data.success) {
                setOrders(res.data.orders.reverse());
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="space-y-4">
        {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow transition">
                <div className="flex flex-col md:flex-row justify-between mb-4 border-b pb-4 gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-500">Order ID</p>
                        <p className="font-mono text-sm">{order._id}</p>
                        <p className="text-sm text-gray-500 mt-1">{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</p>
                    </div>
                    <div className="md:text-right">
                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                            order.payment ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                         }`}>
                             {order.status}
                         </span>
                         <p className="text-sm mt-2">Via {order.paymentMethod}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    {order.items.map((item: OrderItem, idx: number) => (
                         <div key={idx} className="flex justify-between items-center text-sm">
                             <div className="flex items-center gap-2">
                                <div className="font-medium">{item.name}</div>
                                <span className="text-gray-400">x{item.quantity}</span>
                                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{item.size}</span>
                             </div>
                             <div>{formatPrice(item.price)}</div>
                         </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(order.amount)}</span>
                </div>
            </div>
        ))}
    </div>
  );
}