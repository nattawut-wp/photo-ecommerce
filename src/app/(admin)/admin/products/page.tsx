import AdminProductList from "@/components/admin/AdminProductList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products List</h1>
            <Link href="/admin/products/add">
                <Button className="gap-2"><Plus className="w-4 h-4"/> Add Product</Button>
            </Link>
        </div>
        <AdminProductList />
    </div>
  );
}