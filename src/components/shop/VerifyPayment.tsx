"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useShop } from "@/context/ShopContext";

export default function VerifyPayment() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { fetchCart } = useShop();
  
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!success || !orderId) {
        return;
    }

    const verify = async () => {
        try {
            const res = await api.post("/order/verify-stripe", { success, orderId });
            if (res.data.success) {
                toast.success("Payment Successful!");
                await fetchCart(); // Refresh Cart
                router.replace("/orders");
            } else {
                toast.error("Payment Failed");
                router.replace("/cart");
            }
        } catch (error) {
            console.error(error);
            router.replace("/");
        }
    };

    verify();
  }, [success, orderId, router, fetchCart]);

  return (
    <div className="text-center animate-pulse">
        <h2 className="text-2xl font-bold">Verifying your payment...</h2>
        <p className="text-gray-500">Please wait a moment.</p>
    </div>
  );
}