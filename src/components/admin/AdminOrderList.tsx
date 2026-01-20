"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { Package } from "lucide-react";
import { Order, OrderItem } from "@/types";

export default function AdminOrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
        const res = await api.get('/order/all-orders');
        if (res.data.success) {
            setOrders(res.data.orders.reverse());
        }
    } catch (error) {
        toast.error("Failed to fetch orders");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
      try {
          const res = await api.post('/order/update-status', { orderId, status: newStatus });
          if(res.data.success) {
              toast.success("Status updated");
              fetchOrders();
          }
      } catch (error) {
          toast.error("Update failed");
      }
  }

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="space-y-4">
        {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow border grid md:grid-cols-[2fr_1fr_1fr] gap-6 items-start">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-gray-400" />
                        <span className="font-bold text-lg">#{order._id.slice(-6)}</span> 
                        <span className="text-xs text-gray-400">({order._id})</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                        <p>Date: {new Date(order.date).toLocaleString()}</p>
                        <p>Customer ID: {order.userId}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                        {order.items.map((item: OrderItem, idx: number) => (
                            <div key={idx} className="flex justify-between">
                                <span>{item.name} x {item.quantity} ({item.size})</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 text-sm">
                        <span className="font-semibold">Address: </span>
                        {order.address.street}, {order.address.city}, {order.address.zipcode}
                    </div>
                </div>
                
                <div className="text-center border-l border-r px-4 border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                    <p className="font-bold text-xl text-primary">{formatPrice(order.amount)}</p>
                    
                    <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                            {order.paymentMethod}
                        </span>
                        <p className={`text-xs font-bold mt-2 ${order.payment ? 'text-green-600':'text-red-500'}`}>
                            {order.payment ? 'PAID' : 'PENDING'}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium uppercase text-gray-400">Update Status</label>
                    <Select defaultValue={order.status} onValueChange={(val) => handleStatusChange(order._id, val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Order Placed">Order Placed</SelectItem>
                            <SelectItem value="Packing">Packing</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Out for delivery">Out for delivery</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        ))}
    </div>
  );
}