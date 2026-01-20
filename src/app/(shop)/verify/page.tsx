import VerifyPayment from "@/components/shop/VerifyPayment";
import { Suspense } from "react";

export default function VerifyPage() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
        {/* Suspense จำเป็นเมื่อใช้ useSearchParams ใน Next.js */}
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyPayment />
        </Suspense>
    </div>
  );
}