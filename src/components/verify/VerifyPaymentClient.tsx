
"use client";

import { useEffect, useRef } from "react"; // เพิ่ม useRef เพื่อกันยิง API ซ้ำ
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useShop } from "@/context/ShopContext";

export default function VerifyPaymentClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { fetchCart } = useShop();
  
  // ใช้ useRef เพื่อป้องกัน React 18 Effect ยิง 2 รอบ (ใน Dev mode)
  const isVerifying = useRef(false);

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
        // ถ้าไม่มี params หรือกำลัง verify อยู่ ให้หยุด
        if (!success || !orderId || isVerifying.current) {
            if (!success && !orderId) router.push("/cart");
            return;
        }

        isVerifying.current = true; // ล็อคไม่ให้ทำซ้ำ

        try {
            const res = await api.post("/order/verify-stripe", { success, orderId });
            
            if (res.data.success) {
                toast.success("Payment Successful!");
                await fetchCart(); // อัปเดตตะกร้าให้ว่าง
                router.push("/orders");
            } else {
                toast.error("Payment Failed");
                router.push("/cart");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error verifying payment");
            router.push("/");
        }
    };

    verifyPayment();
  }, [success, orderId, fetchCart, router]);

  return (
    <div className="text-2xl font-bold animate-pulse text-primary">
        Verifying Payment...
    </div>
  );
}